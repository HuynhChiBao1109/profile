# CI/CD cho baohc-profile bằng Jenkins

Pipeline trong `Jenkinsfile` thực hiện:

1. Checkout source từ GitHub.
2. Kiểm tra Docker và Docker Compose trên Jenkins agent.
3. Build stage `builder` và chạy ESLint.
4. Build image production.
5. Chạy container tạm và đợi health check thành công.
6. Chỉ với nhánh `master` hoặc `main`: gắn tag `baohc-profile:latest`, đồng bộ file deploy và chạy Docker Compose.
7. Kiểm tra health của container đã deploy.

Pull request/nhánh khác chỉ chạy CI, không deploy. Pipeline hiện được thiết kế cho Jenkins và ứng dụng chạy trên cùng một Linux server.

## 1. Chuẩn bị server

Yêu cầu:

- Một Linux server có Docker Engine và Docker Compose plugin.
- DNS `profile.b4f.site` trỏ về server.
- DNS `jenkins.b4f.site` trỏ về server.
- Cổng 80/443 mở; cổng 8080 chỉ nên cho localhost hoặc firewall nội bộ nếu dùng Nginx.

Kiểm tra:

```bash
docker --version
docker compose version
git --version
```

## 2. Cài Jenkins từ repository `jenkins`

```bash
git clone https://github.com/HuynhChiBao1109/jenkins.git
cd jenkins
docker compose up -d --build
docker compose ps
```

Image Jenkins đã cài Docker CLI, Compose plugin, `rsync` và các Jenkins plugin cần cho GitHub/Pipeline. Docker socket của host được mount vào container để pipeline có thể build/deploy image.

> Cảnh báo: quyền truy cập `/var/run/docker.sock` tương đương quyền quản trị host. Không cấp tài khoản Jenkins cho người không tin cậy và không chạy Jenkinsfile từ repository không kiểm soát.

Lấy mật khẩu khởi tạo:

```bash
docker compose exec jenkins \
  cat /var/jenkins_home/secrets/initialAdminPassword
```

Mở `http://SERVER_IP:8080`, nhập mật khẩu, chọn **Install suggested plugins**, sau đó tạo tài khoản admin. URL Jenkins sẽ được cấu hình từ `JENKINS_URL=http://jenkins.b4f.site/` trong `docker-compose.yml`.

Kiểm tra tool bên trong Jenkins:

```bash
docker compose exec jenkins docker version
docker compose exec jenkins docker compose version
docker compose exec jenkins rsync --version
```

## 3. Cấu hình Nginx và HTTPS

File mẫu nằm tại `jenkins/nginx/profile-project-jenkins.conf.example`. Thêm server block này vào Nginx đang phục vụ các domain của bạn, rồi kiểm tra và reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Sau khi HTTP hoạt động, cấp SSL (ví dụ với Certbot):

```bash
sudo certbot --nginx \
  -d jenkins.b4f.site \
  -d profile.b4f.site
```

Khi đã dùng HTTPS, đổi trong `jenkins/docker-compose.yml`:

```yaml
JENKINS_URL: "https://jenkins.b4f.site/"
```

Sau đó áp dụng lại:

```bash
docker compose up -d --build
```

Trong **Manage Jenkins → System → Jenkins Location**, xác nhận Jenkins URL là `https://jenkins.b4f.site/`.

## 4. Tạo Jenkins Pipeline

Trong Jenkins:

1. Chọn **New Item**.
2. Đặt tên `baohc-profile`.
3. Chọn **Pipeline** rồi **OK**.
4. Ở **Build Triggers**, chọn **GitHub hook trigger for GITScm polling**.
5. Ở **Pipeline**, chọn **Pipeline script from SCM**.
6. SCM: **Git**.
7. Repository URL: `https://github.com/HuynhChiBao1109/baohc-profile.git`.
8. Branch Specifier: `*/master` (đổi thành `*/main` nếu repository đổi nhánh mặc định).
9. Script Path: `Jenkinsfile`.
10. Chọn **Save**, sau đó **Build Now** để chạy lần đầu.

Repository public không cần credential. Nếu chuyển sang private, tạo GitHub Personal Access Token, thêm nó tại **Manage Jenkins → Credentials**, rồi chọn credential đó trong cấu hình SCM.

## 5. Thêm GitHub webhook

Trong GitHub repository `baohc-profile`:

1. Vào **Settings → Webhooks → Add webhook**.
2. Payload URL: `https://jenkins.b4f.site/github-webhook/` (cần dấu `/` cuối).
3. Content type: `application/json`.
4. Chọn **Just the push event**.
5. Bật **Active** và lưu.
6. Trong trang webhook, kiểm tra lần giao gần nhất trả HTTP 200.

Từ đây, mỗi lần push sẽ kích hoạt CI; chỉ push/merge vào `master` hoặc `main` mới deploy.

## 6. Kiểm tra lần deploy đầu tiên

Trên server:

```bash
docker ps --filter name=baohc-profile
docker inspect --format '{{.State.Health.Status}}' baohc-profile
curl -I http://127.0.0.1:1109/
curl -I https://profile.b4f.site/
```

Kết quả mong đợi: container `baohc-profile` ở trạng thái `healthy`, endpoint local port 1109 và domain đều phản hồi thành công.

## 7. Vận hành và xử lý lỗi

Xem log Jenkins:

```bash
cd jenkins
docker compose logs -f --tail=200 jenkins
```

Xem log ứng dụng:

```bash
docker logs --tail=200 baohc-profile
```

Các lỗi thường gặp:

- `docker: permission denied`: xác nhận socket đã được mount và container Jenkins đang chạy với cấu hình mới bằng `docker compose up -d --build`.
- `docker compose: command not found`: rebuild image Jenkins; Dockerfile mới đã cài Compose plugin.
- Webhook trả lỗi: kiểm tra HTTPS, reverse proxy, Jenkins URL và đường dẫn `/github-webhook/`.
- Pipeline chạy CI nhưng bỏ qua Deploy: kiểm tra job đang checkout `master`/`main` và giá trị branch trong log.
- Port 1109 đã được dùng: dừng service cũ hoặc đổi port ở `baohc-profile/docker-compose.yml` và cấu hình Nginx tương ứng.

Rollback thủ công về commit trước:

```bash
git checkout <commit-tot>
docker build -t baohc-profile:latest .
docker compose up -d --no-build --force-recreate
```

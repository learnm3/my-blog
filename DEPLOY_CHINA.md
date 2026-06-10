# 国内部署与备案指南

本文档指导如何将博客部署到阿里云 ECS，并完成 ICP 备案。

---

## 一、购买阿里云 ECS

1. 前往 [阿里云 ECS 控制台](https://ecs.console.aliyun.com/)
2. 点击「创建实例」，推荐配置：
   - **地域：** 选择离你最近的区域（如华东1-杭州、华南1-深圳）
   - **实例规格：** 共享型 s6（2核 2GB 起步）
   - **镜像：** Ubuntu 22.04 LTS 或 CentOS 7.9
   - **系统盘：** 40GB ESSD
   - **公网带宽：** 按使用流量计费（约 10 元/月足够博客使用）
3. 安全组放行以下端口：
   - `22`（SSH）
   - `80`（HTTP）
   - `443`（HTTPS）
4. 绑定弹性公网 IP（EIP）

---

## 二、服务器环境配置

### 安装 Node.js (LTS)

```bash
# 使用 NodeSource 安装 Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证
node -v   # v22.x.x
npm -v    # 10.x.x
```

### 安装 PM2（进程管理）

```bash
npm install -g pm2
```

### 安装 Nginx

```bash
sudo apt-get update
sudo apt-get install -y nginx
```

---

## 三、部署博客

### 上传代码

方式一：从 GitHub 拉取

```bash
cd /var/www
sudo git clone https://github.com/你的用户名/my-blog.git
sudo chown -R $USER:$USER my-blog
cd my-blog
```

方式二：使用 `scp` 本地上传

```bash
# 在你的本地电脑执行
scp -r ./my-blog root@你的服务器IP:/var/www/
```

### 构建项目

```bash
cd /var/www/my-blog
npm install
npm run build
```

### 使用 PM2 启动

```bash
pm2 start npm --name "my-blog" -- start
pm2 save
pm2 startup   # 设置开机自启
```

---

## 四、Nginx 配置

创建 `/etc/nginx/sites-available/my-blog`：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /images {
        alias /var/www/my-blog/public/images;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/my-blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 五、域名与 HTTPS

### 购买域名

推荐在以下平台购买：
- 阿里云万网（与 ECS 同一生态，备案方便）
- 腾讯云 DNSPod

### 配置 DNS

在域名管理控制台添加 A 记录：

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|-------|
| A | @ | 你的服务器公网 IP |
| A | www | 你的服务器公网 IP |

### 申请 SSL 证书（免费）

使用阿里云免费 SSL 证书或 Let's Encrypt：

```bash
# 使用 certbot（Let's Encrypt）
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

certbot 会自动修改 Nginx 配置并添加 HTTPS 重定向。

---

## 六、ICP 备案流程

> **前提：** 服务器必须购买 ≥ 3 个月，域名实名认证通过。

### 步骤 1：工信部备案

1. 登录 [阿里云 ICP 备案系统](https://beian.aliyun.com/)
2. 点击「开始备案」
3. 填写主体信息：
   - 主办单位性质：个人
   - 证件类型：身份证
   - 填写你的真实姓名和身份证号
4. 填写网站信息：
   - 网站名称：如「NoFinalLevel 的个人博客」
   - 网站域名：your-domain.com
   - 服务器 IP：选择你的 ECS IP
   - 服务类型：网站应用服务
5. 上传资料：
   - 身份证正反面照片
   - 域名证书（在域名控制台下载）
   - 《网站备案信息真实性核验单》（系统生成后打印签字拍照上传）
6. 提交审核
7. 阿里云初审 → 短信核验 → 提交管局审核
8. 管局审核周期：**一般为 5–20 个工作日**

### 步骤 2：公安备案

工信部备案通过后，需要进行公安备案：

1. 访问 [全国互联网安全管理平台](http://www.beian.gov.cn/)
2. 注册账号并登录
3. 点击「互联网站安全服务」→「网站备案」
4. 填写网站信息（复制工信部备案信息）
5. 提交后一般在 3–7 个工作日审核通过

### 备案成功后的操作

在网站底部添加备案号：

```html
<!-- 在 src/components/site-footer.tsx 中修改 -->
<a href="https://beian.miit.gov.cn/" target="_blank">
  京ICP备XXXXXXXX号-1
</a>
```

同时链接到公安部备案号（如需）。

---

## 七、后续维护

### 更新博客

```bash
cd /var/www/my-blog
git pull
npm install
npm run build
pm2 restart my-blog
```

### 查看日志

```bash
pm2 logs my-blog
journalctl -u nginx -f
```

### 监控

```bash
pm2 monit          # PM2 进程监控
htop               # 系统资源
```

### 自动部署建议

配置 GitHub Actions 实现 `git push` 自动部署：

1. 在 GitHub 仓库设置 SSH 免密登录到服务器
2. 创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          ssh user@你的服务器IP "
            cd /var/www/my-blog &&
            git pull &&
            npm install &&
            npm run build &&
            pm2 restart my-blog
          "
```

---

## 常见问题

**Q: 为什么备案审核这么久？**
A: 管局审核周期通常为 5–20 个工作日，各省时间不同。建议提前备案。

**Q: 可以使用其他云厂商吗？**
A: 可以。腾讯云、华为云流程类似，备案也需要在对应的云服务商完成。

**Q: 不想备案怎么办？**
A: 可以使用海外服务器（如 Vercel、AWS、搬瓦工）免备案，但国内访问速度较慢且可能被阻断。

**Q: 备案期间网站能访问吗？**
A: 备案期间域名不能绑定国内服务器。可以先在海外服务器部署，或通过 IP 直接访问测试。

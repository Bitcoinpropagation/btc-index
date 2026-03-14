# BTC Index API 部署指南

## Vercel 部署

### 1. 安装 Vercel CLI
```bash
npm i -g vercel
```

### 2. 创建 vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/server.js"
    }
  ]
}
```

### 3. 部署
```bash
vercel --prod
```

## Cloudflare Workers 部署

### 1. 安装 Wrangler
```bash
npm i -g wrangler
```

### 2. 创建 worker.js
见 `api/worker.js`

### 3. 部署
```bash
wrangler deploy
```

## 本地开发

```bash
npm install
npm run dev
```

## API 端点

- `GET /api/ads` - 获取所有广告配置
- `POST /api/ads` - 更新所有广告配置
- `GET /api/ads/:id` - 获取单个广告
- `PUT /api/ads/:id` - 更新单个广告
- `GET /api/health` - 健康检查

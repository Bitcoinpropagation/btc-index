const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 广告配置文件路径
const ADS_FILE = path.join(__dirname, 'ads.json');

// 获取广告配置
app.get('/api/ads', (req, res) => {
    try {
        const data = fs.readFileSync(ADS_FILE, 'utf8');
        const ads = JSON.parse(data);
        res.json(ads);
    } catch (error) {
        console.error('读取广告配置失败:', error);
        res.status(500).json({ error: '无法读取广告配置' });
    }
});

// 更新广告配置
app.post('/api/ads', (req, res) => {
    try {
        const newAds = req.body;
        
        // 验证数据格式
        if (!newAds || typeof newAds !== 'object') {
            return res.status(400).json({ error: '无效的广告数据格式' });
        }
        
        // 验证必需的字段
        const requiredFields = ['name', 'url', 'logo', 'description'];
        for (const [key, ad] of Object.entries(newAds)) {
            for (const field of requiredFields) {
                if (!ad[field]) {
                    return res.status(400).json({ 
                        error: `广告 "${key}" 缺少必需字段: ${field}` 
                    });
                }
            }
        }
        
        // 写入文件
        fs.writeFileSync(ADS_FILE, JSON.stringify(newAds, null, 2), 'utf8');
        res.json({ success: true, message: '广告配置已更新', ads: newAds });
    } catch (error) {
        console.error('保存广告配置失败:', error);
        res.status(500).json({ error: '无法保存广告配置' });
    }
});

// 获取单个广告
app.get('/api/ads/:id', (req, res) => {
    try {
        const data = fs.readFileSync(ADS_FILE, 'utf8');
        const ads = JSON.parse(data);
        const ad = ads[req.params.id];
        
        if (!ad) {
            return res.status(404).json({ error: '广告不存在' });
        }
        
        res.json(ad);
    } catch (error) {
        console.error('读取广告配置失败:', error);
        res.status(500).json({ error: '无法读取广告配置' });
    }
});

// 更新单个广告
app.put('/api/ads/:id', (req, res) => {
    try {
        const data = fs.readFileSync(ADS_FILE, 'utf8');
        const ads = JSON.parse(data);
        
        if (!ads[req.params.id]) {
            return res.status(404).json({ error: '广告不存在' });
        }
        
        ads[req.params.id] = { ...ads[req.params.id], ...req.body };
        fs.writeFileSync(ADS_FILE, JSON.stringify(ads, null, 2), 'utf8');
        
        res.json({ success: true, message: '广告已更新', ad: ads[req.params.id] });
    } catch (error) {
        console.error('更新广告失败:', error);
        res.status(500).json({ error: '无法更新广告' });
    }
});

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`BTC Index API 服务器运行在端口 ${PORT}`);
    console.log(`API 地址: http://localhost:${PORT}/api/ads`);
});

module.exports = app;

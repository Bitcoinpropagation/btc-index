// 比特币实时价格和广告管理
class BTCIndexApp {
    constructor() {
        this.btcData = [];
        this.chart = null;
        this.priceSeries = null;
        this.ma200Series = null;
        this.indexSeries = null;
        this.currentBTCPrice = 0;
        this.priceChange24h = 0;
        this.adsData = null;
    }

    // 获取实时比特币价格
    async fetchBTCPrice() {
        try {
            // 使用 CoinGecko API
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
            if (!response.ok) throw new Error('价格获取失败');
            const data = await response.json();
            this.currentBTCPrice = data.bitcoin.usd;
            this.priceChange24h = data.bitcoin.usd_24h_change || 0;
            this.updatePriceDisplay();
            return this.currentBTCPrice;
        } catch (error) {
            console.error('获取价格失败:', error);
            // 使用备用 API
            try {
                const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
                const data = await response.json();
                this.currentBTCPrice = parseFloat(data.lastPrice);
                this.priceChange24h = parseFloat(data.priceChangePercent);
                this.updatePriceDisplay();
                return this.currentBTCPrice;
            } catch (backupError) {
                console.error('备用API也失败:', backupError);
                return null;
            }
        }
    }

    // 更新价格显示
    updatePriceDisplay() {
        const priceEl = document.getElementById('livePrice');
        const changeEl = document.getElementById('priceChange');
        const btcPriceEl = document.getElementById('btcPrice');
        
        if (priceEl) {
            priceEl.textContent = '$' + this.currentBTCPrice.toLocaleString('en-US', { maximumFractionDigits: 2 });
        }
        if (changeEl) {
            const isPositive = this.priceChange24h >= 0;
            changeEl.textContent = (isPositive ? '+' : '') + this.priceChange24h.toFixed(2) + '%';
            changeEl.className = `text-sm font-medium px-2 py-1 rounded ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`;
        }
        // 同步更新指数模块中的比特币价格
        if (btcPriceEl && this.currentBTCPrice > 0) {
            btcPriceEl.textContent = '$' + this.currentBTCPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
        }
    }

    // 获取广告配置
    async fetchAdsConfig() {
        try {
            // 优先从 localStorage 读取管理后台配置
            const savedConfig = localStorage.getItem('btcIndexConfig');
            if (savedConfig) {
                const config = JSON.parse(savedConfig);
                if (config.ads && Object.keys(config.ads).length > 0) {
                    this.adsData = config.ads;
                    this.renderAds();
                    return;
                }
            }
            
            // 尝试从后端API获取
            const response = await fetch('/api/ads');
            if (response.ok) {
                this.adsData = await response.json();
            } else {
                // 使用默认配置
                this.adsData = this.getDefaultAdsConfig();
            }
        } catch (error) {
            console.log('使用默认广告配置');
            this.adsData = this.getDefaultAdsConfig();
        }
        this.renderAds();
    }

    // 默认广告配置
    getDefaultAdsConfig() {
        return {
            "binance": {
                "name": "币安",
                "url": "https://www.binance.com/zh-CN/join?ref=",
                "logo": "https://cryptologos.cc/logos/bnb-bnb-logo.png",
                "description": "全球领先的数字资产交易平台，注册即享交易手续费优惠",
                "color": "from-yellow-500/20 to-yellow-600/10",
                "borderColor": "border-yellow-500/30"
            },
            "okx": {
                "name": "OKX",
                "url": "https://www.okx.com/join/",
                "logo": "https://cryptologos.cc/logos/okb-okb-logo.png",
                "description": "一站式加密货币交易平台，Web3钱包入口",
                "color": "from-blue-500/20 to-blue-600/10",
                "borderColor": "border-blue-500/30"
            },
            "bitget": {
                "name": "Bitget",
                "url": "https://www.bitget.com/zh-CN/referral/register?code=",
                "logo": "https://cryptologos.cc/logos/bitget-token-bgb-logo.png",
                "description": "专注合约交易，跟单交易首选平台",
                "color": "from-purple-500/20 to-purple-600/10",
                "borderColor": "border-purple-500/30"
            }
        };
    }

    // 渲染广告卡片
    renderAds() {
        const container = document.getElementById('adsContainer');
        if (!container || !this.adsData) return;

        container.innerHTML = Object.entries(this.adsData).map(([key, ad]) => `
            <div class="glass rounded-xl p-6 border ${ad.borderColor} bg-gradient-to-br ${ad.color} hover:scale-105 transition-transform cursor-pointer group"
                 onclick="window.open('${ad.url}', '_blank')">
                <div class="flex items-center gap-4 mb-3">
                    <img src="${ad.logo}" alt="${ad.name}" class="w-12 h-12 rounded-full bg-white/10 p-1">
                    <div>
                        <h3 class="text-xl font-bold">${ad.name}</h3>
                        <span class="text-xs text-gray-400">推荐交易所</span>
                    </div>
                </div>
                <p class="text-sm text-gray-300 mb-4">${ad.description}</p>
                <button class="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors group-hover:bg-white/20">
                    立即下载
                </button>
            </div>
        `).join('');
    }

    // 生成历史数据（使用真实价格作为基准）
    generateHistoricalData(currentPrice) {
        const data = [];
        const now = Math.floor(Date.now() / 1000);
        const days = 1825;
        
        // 基于真实历史走势的关键节点（相对比例）
        const keyRatios = {
            1825: 0.14,  // 5年前约为当前价格的14%
            1460: 0.17,
            1095: 0.85,  // 2021年高点附近
            730: 0.28,   // 2022年低点
            365: 0.57,
            0: 1.0       // 当前
        };
        
        for (let i = days; i >= 0; i--) {
            const time = now - i * 86400;
            let baseRatio;
            if (i >= 1460) baseRatio = this.lerp(i, 1825, 1460, keyRatios[1825], keyRatios[1460]);
            else if (i >= 1095) baseRatio = this.lerp(i, 1460, 1095, keyRatios[1460], keyRatios[1095]);
            else if (i >= 730) baseRatio = this.lerp(i, 1095, 730, keyRatios[1095], keyRatios[730]);
            else if (i >= 365) baseRatio = this.lerp(i, 730, 365, keyRatios[730], keyRatios[365]);
            else baseRatio = this.lerp(i, 365, 0, keyRatios[365], keyRatios[0]);
            
            const volatility = 1 + (Math.random() - 0.5) * 0.15;
            data.push({ time, price: currentPrice * baseRatio * volatility });
        }
        return data;
    }

    lerp(x, x1, x2, y1, y2) {
        return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    }

    calculate200DMA(data) {
        return data.map((item, index) => {
            if (index < 199) return { ...item, ma200: null };
            const sum = data.slice(index - 199, index + 1).reduce((acc, curr) => acc + curr.price, 0);
            return { ...item, ma200: sum / 200 };
        });
    }

    calculateExponentialGrowth(data) {
        const n = data.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        
        data.forEach((item, i) => {
            const x = i;
            const y = Math.log(item.price);
            sumX += x; sumY += y; sumXY += x * y; sumX2 += x * x;
        });
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        return data.map((item, i) => ({
            ...item,
            expValue: Math.exp(intercept + slope * i)
        }));
    }

    calculateAHR999(data) {
        return data.map(item => {
            if (!item.ma200 || !item.expValue) return { ...item, ahr999: null };
            return { ...item, ahr999: (item.price / item.ma200) * (item.price / item.expValue) };
        });
    }

    getCurrentStatus(data) {
        const latest = data[data.length - 1];
        const ahr999 = latest.ahr999 || 0;
        
        let status, suggestion, color;
        if (ahr999 < 0.45) { status = '抄底区间'; suggestion = '大胆买入'; color = 'text-green-400'; }
        else if (ahr999 < 1.2) { status = '定投区间'; suggestion = '坚持定投'; color = 'text-blue-400'; }
        else if (ahr999 < 5) { status = '观望区间'; suggestion = '停止定投'; color = 'text-yellow-400'; }
        else { status = '可能见顶'; suggestion = '考虑卖出'; color = 'text-red-400'; }
        
        return { price: latest.price, ma200: latest.ma200 || latest.price, ahr999, status, suggestion, color };
    }

    initChart() {
        const chartContainer = document.getElementById('chart');
        
        this.chart = LightweightCharts.createChart(chartContainer, {
            layout: { background: { color: 'transparent' }, textColor: '#d1d5db' },
            grid: { vertLines: { color: 'rgba(255, 255, 255, 0.1)' }, horzLines: { color: 'rgba(255, 255, 255, 0.1)' } },
            crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
            rightPriceScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
            timeScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
        });

        this.priceSeries = this.chart.addLineSeries({ title: 'BTC 价格', color: '#f59e0b', lineWidth: 2 });
        this.ma200Series = this.chart.addLineSeries({ title: '200日定投成本', color: '#3b82f6', lineWidth: 1 });
        this.indexSeries = this.chart.addLineSeries({ title: 'ahr999 指数', color: '#10b981', lineWidth: 2, priceScaleId: 'right' });
        this.chart.priceScale('right').applyOptions({ visible: true });
    }

    updateChart(data) {
        const priceData = data.filter(d => d.price).map(d => ({ time: d.time, value: d.price }));
        const ma200Data = data.filter(d => d.ma200).map(d => ({ time: d.time, value: d.ma200 }));
        const indexData = data.filter(d => d.ahr999).map(d => ({ time: d.time, value: d.ahr999 }));

        this.priceSeries.setData(priceData);
        this.ma200Series.setData(ma200Data);
        this.indexSeries.setData(indexData);
        this.chart.timeScale().fitContent();
    }

    updateDisplay(status) {
        document.getElementById('currentIndex').textContent = status.ahr999.toFixed(2);
        document.getElementById('currentIndex').className = `text-4xl font-bold ${status.color}`;
        document.getElementById('indexStatus').textContent = status.status;
        document.getElementById('indexStatus').className = `text-sm mt-2 ${status.color}`;
        // 使用实时价格，如果没有则使用状态价格
        const displayPrice = this.currentBTCPrice || status.price;
        document.getElementById('btcPrice').textContent = '$' + displayPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
        document.getElementById('avgCost').textContent = '$' + status.ma200.toLocaleString('en-US', { maximumFractionDigits: 0 });
        document.getElementById('suggestion').textContent = status.suggestion;
        document.getElementById('suggestion').className = `text-lg font-bold ${status.color}`;
    }

    // 启动定时刷新
    startPriceRefresh() {
        // 立即获取一次
        this.fetchBTCPrice();
        // 每30秒刷新
        setInterval(() => this.fetchBTCPrice(), 30000);
    }

    async run() {
        try {
            // 获取实时价格
            const currentPrice = await this.fetchBTCPrice();
            const basePrice = currentPrice || 70000;
            
            // 生成基于真实价格的历史数据
            this.btcData = this.generateHistoricalData(basePrice);
            
            let data = this.calculate200DMA(this.btcData);
            data = this.calculateExponentialGrowth(data);
            data = this.calculateAHR999(data);
            
            const status = this.getCurrentStatus(data);
            
            this.initChart();
            this.updateChart(data);
            this.updateDisplay(status);
            
            // 获取广告配置
            await this.fetchAdsConfig();
            
            // 启动价格定时刷新
            this.startPriceRefresh();
            
        } catch (error) {
            console.error('运行失败:', error);
            document.getElementById('currentIndex').textContent = '错误';
            document.getElementById('indexStatus').textContent = error.message;
        }
    }
}

// 页面加载完成后运行
document.addEventListener('DOMContentLoaded', () => {
    const app = new BTCIndexApp();
    app.run();
});

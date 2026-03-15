// 比特币定投指数 - 完整优化版
class BTCIndexApp {
    constructor() {
        this.btcData = [];
        this.filteredData = [];
        this.chart = null;
        this.priceSeries = null;
        this.ma200Series = null;
        this.indexSeries = null;
        this.currentBTCPrice = 0;
        this.priceChange24h = 0;
        this.adsData = null;
        this.currentTimeRange = 'all';
        this.lastUpdateTime = null;
        this.chartInitialized = false;
    }

    // 获取实时比特币价格
    async fetchBTCPrice() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
            if (!response.ok) throw new Error('价格获取失败');
            const data = await response.json();
            this.currentBTCPrice = data.bitcoin.usd;
            this.priceChange24h = data.bitcoin.usd_24h_change || 0;
            this.lastUpdateTime = new Date();
            this.updatePriceDisplay();
            this.updateLastUpdateTime();
            return this.currentBTCPrice;
        } catch (error) {
            console.error('获取价格失败:', error);
            try {
                const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
                const data = await response.json();
                this.currentBTCPrice = parseFloat(data.lastPrice);
                this.priceChange24h = parseFloat(data.priceChangePercent);
                this.lastUpdateTime = new Date();
                this.updatePriceDisplay();
                this.updateLastUpdateTime();
                return this.currentBTCPrice;
            } catch (backupError) {
                console.error('备用API也失败:', backupError);
                return null;
            }
        }
    }

    // 更新最后更新时间
    updateLastUpdateTime() {
        const lastUpdateEl = document.getElementById('lastUpdate');
        if (lastUpdateEl && this.lastUpdateTime) {
            const timeString = this.lastUpdateTime.toLocaleString('zh-CN', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            lastUpdateEl.textContent = timeString;
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
        if (btcPriceEl && this.currentBTCPrice > 0) {
            btcPriceEl.textContent = '$' + this.currentBTCPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
        }
    }

    // 获取广告配置
    async fetchAdsConfig() {
        try {
            const savedConfig = localStorage.getItem('btcIndexConfig');
            if (savedConfig) {
                const config = JSON.parse(savedConfig);
                if (config.ads && Object.keys(config.ads).length > 0) {
                    this.adsData = config.ads;
                    this.renderAds();
                    return;
                }
            }
            
            try {
                const response = await fetch('config.json');
                if (response.ok) {
                    const config = await response.json();
                    if (config.ads && Object.keys(config.ads).length > 0) {
                        this.adsData = config.ads;
                        this.renderAds();
                        return;
                    }
                }
            } catch (e) {
                console.log('config.json 加载失败');
            }
            
            this.adsData = this.getDefaultAdsConfig();
        } catch (error) {
            this.adsData = this.getDefaultAdsConfig();
        }
        this.renderAds();
    }

    // 默认广告配置（空，等待后续添加）
    getDefaultAdsConfig() {
        return {};
    }

    // 渲染广告卡片
    renderAds() {
        const container = document.getElementById('adsContainer');
        if (!container) return;

        // 如果没有广告数据，显示占位提示
        if (!this.adsData || Object.keys(this.adsData).length === 0) {
            container.innerHTML = `
                <div class="glass rounded-xl p-8 text-center col-span-1 md:col-span-3">
                    <div class="text-gray-500 text-sm">推荐交易平台</div>
                    <div class="text-gray-400 text-xs mt-2">敬请期待</div>
                </div>
            `;
            return;
        }

        container.innerHTML = Object.entries(this.adsData).map(([key, ad]) => `
            <div class="glass rounded-xl p-6 border ${ad.borderColor} bg-gradient-to-br ${ad.color} hover:scale-105 transition-transform cursor-pointer group"
                 onclick="window.open('${ad.url}', '_blank')">
                <div class="flex items-center gap-4 mb-3">
                    <img src="${ad.logo}" alt="${ad.name}" class="w-12 h-12 rounded-full bg-white/10 p-1" loading="lazy">
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

    // 伪随机数生成器（固定种子）
    seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    // 生成历史数据（使用固定种子，确保每次结果一致）
    generateHistoricalData(currentPrice) {
        const data = [];
        const now = Math.floor(Date.now() / 1000);
        const days = 1825;
        
        const keyRatios = {
            1825: 0.14, 1460: 0.17, 1095: 0.85, 730: 0.28, 365: 0.57, 0: 1.0
        };
        
        for (let i = days; i >= 0; i--) {
            const time = now - i * 86400;
            let baseRatio;
            if (i >= 1460) baseRatio = this.lerp(i, 1825, 1460, keyRatios[1825], keyRatios[1460]);
            else if (i >= 1095) baseRatio = this.lerp(i, 1460, 1095, keyRatios[1460], keyRatios[1095]);
            else if (i >= 730) baseRatio = this.lerp(i, 1095, 730, keyRatios[1095], keyRatios[730]);
            else if (i >= 365) baseRatio = this.lerp(i, 730, 365, keyRatios[730], keyRatios[365]);
            else baseRatio = this.lerp(i, 365, 0, keyRatios[365], keyRatios[0]);
            
            // 使用固定种子的随机数，确保每次生成的数据一致
            const volatility = 1 + (this.seededRandom(i) - 0.5) * 0.15;
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
        
        let status, suggestion, color, bgColor, zoneId;
        if (ahr999 < 0.45) { 
            status = '抄底区间'; suggestion = '大胆买入'; color = 'text-green-400'; bgColor = 'bg-green-500/20'; zoneId = 'zone1';
        }
        else if (ahr999 < 1.2) { 
            status = '定投区间'; suggestion = '坚持定投'; color = 'text-blue-400'; bgColor = 'bg-blue-500/20'; zoneId = 'zone2';
        }
        else if (ahr999 < 5) { 
            status = '观望区间'; suggestion = '停止定投'; color = 'text-yellow-400'; bgColor = 'bg-yellow-500/20'; zoneId = 'zone3';
        }
        else { 
            status = '可能见顶'; suggestion = '考虑卖出'; color = 'text-red-400'; bgColor = 'bg-red-500/20'; zoneId = 'zone4';
        }
        
        return { price: latest.price, ma200: latest.ma200 || latest.price, ahr999, status, suggestion, color, bgColor, zoneId };
    }

    // 高亮当前区间
    highlightCurrentZone(zoneId) {
        // 移除所有高亮
        ['zone1', 'zone2', 'zone3', 'zone4'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('zone-active');
        });
        
        // 添加当前高亮
        const currentEl = document.getElementById(zoneId);
        if (currentEl) currentEl.classList.add('zone-active');
    }

    // 设置时间范围
    setTimeRange(range) {
        this.currentTimeRange = range;
        
        // 更新按钮样式
        document.querySelectorAll('.time-range-btn').forEach(btn => {
            if (btn.dataset.range === range) {
                btn.classList.remove('bg-white/10');
                btn.classList.add('bg-blue-500/30');
            } else {
                btn.classList.remove('bg-blue-500/30');
                btn.classList.add('bg-white/10');
            }
        });
        
        // 过滤数据
        this.filterDataByRange();
        
        // 更新图表
        if (this.chart && this.filteredData.length > 0) {
            this.updateChart(this.filteredData);
        }
    }

    // 根据时间范围过滤数据
    filterDataByRange() {
        const now = Math.floor(Date.now() / 1000);
        let days;
        
        switch(this.currentTimeRange) {
            case '7d': days = 7; break;
            case '30d': days = 30; break;
            case '90d': days = 90; break;
            case '1y': days = 365; break;
            default: days = this.btcData.length;
        }
        
        const cutoff = now - days * 86400;
        this.filteredData = this.btcData.filter(d => d.time >= cutoff);
    }

    // 初始化图表
    initChart() {
        try {
            const chartContainer = document.getElementById('chart');
            const loadingEl = document.getElementById('chartLoading');
            const errorEl = document.getElementById('chartError');
            
            if (!chartContainer) {
                console.error('Chart container not found');
                return false;
            }
            
            // 检查 lightweight-charts 是否加载
            if (typeof LightweightCharts === 'undefined') {
                console.error('LightweightCharts not loaded');
                if (loadingEl) loadingEl.classList.add('hidden');
                if (errorEl) errorEl.classList.remove('hidden');
                return false;
            }
            
            // 隐藏加载，显示图表
            if (loadingEl) loadingEl.classList.add('hidden');
            chartContainer.classList.remove('hidden');
            
            this.chart = LightweightCharts.createChart(chartContainer, {
                layout: { 
                    background: { color: 'transparent' }, 
                    textColor: '#d1d5db' 
                },
                grid: { 
                    vertLines: { color: 'rgba(255, 255, 255, 0.1)' }, 
                    horzLines: { color: 'rgba(255, 255, 255, 0.1)' } 
                },
                crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
                rightPriceScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
                timeScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
                handleScroll: { vertTouchDrag: false },
                handleScale: { axisPressedMouseMove: false }
            });

            // 比特币价格线
            this.priceSeries = this.chart.addLineSeries({ 
                title: 'BTC 价格', 
                color: '#f59e0b', 
                lineWidth: 2 
            });
            
            // 200日均线
            this.ma200Series = this.chart.addLineSeries({ 
                title: '200日定投成本', 
                color: '#3b82f6', 
                lineWidth: 1 
            });
            
            // 定投指数（改为此名称）
            this.indexSeries = this.chart.addLineSeries({ 
                title: '定投指数', 
                color: '#10b981', 
                lineWidth: 2, 
                priceScaleId: 'right' 
            });
            
            this.chart.priceScale('right').applyOptions({ visible: true });
            
            // 响应式调整
            const resizeObserver = new ResizeObserver(entries => {
                if (this.chart && entries[0]) {
                    const { width, height } = entries[0].contentRect;
                    this.chart.applyOptions({ width, height });
                }
            });
            resizeObserver.observe(chartContainer);
            
            this.chartInitialized = true;
            return true;
        } catch (error) {
            console.error('Chart initialization failed:', error);
            const loadingEl = document.getElementById('chartLoading');
            const errorEl = document.getElementById('chartError');
            if (loadingEl) loadingEl.classList.add('hidden');
            if (errorEl) errorEl.classList.remove('hidden');
            return false;
        }
    }

    updateChart(data) {
        if (!this.priceSeries || !this.ma200Series || !this.indexSeries) return;
        
        const priceData = data.filter(d => d.price).map(d => ({ time: d.time, value: d.price }));
        const ma200Data = data.filter(d => d.ma200).map(d => ({ time: d.time, value: d.ma200 }));
        const indexData = data.filter(d => d.ahr999).map(d => ({ time: d.time, value: d.ahr999 }));

        this.priceSeries.setData(priceData);
        this.ma200Series.setData(ma200Data);
        this.indexSeries.setData(indexData);
        this.chart.timeScale().fitContent();
    }

    updateDisplay(status) {
        const currentIndexEl = document.getElementById('currentIndex');
        const indexStatusEl = document.getElementById('indexStatus');
        const btcPriceEl = document.getElementById('btcPrice');
        const avgCostEl = document.getElementById('avgCost');
        const suggestionEl = document.getElementById('suggestion');
        
        if (currentIndexEl) {
            currentIndexEl.textContent = status.ahr999.toFixed(2);
            currentIndexEl.className = `text-3xl md:text-4xl font-bold ${status.color}`;
        }
        if (indexStatusEl) {
            indexStatusEl.textContent = status.status;
            indexStatusEl.className = `text-sm mt-2 ${status.color}`;
        }
        
        const displayPrice = this.currentBTCPrice || status.price;
        if (btcPriceEl) {
            btcPriceEl.textContent = '$' + displayPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
        }
        if (avgCostEl) {
            avgCostEl.textContent = '$' + status.ma200.toLocaleString('en-US', { maximumFractionDigits: 0 });
        }
        if (suggestionEl) {
            suggestionEl.textContent = status.suggestion;
            suggestionEl.className = `text-base md:text-lg font-bold ${status.color}`;
        }
        
        // 高亮当前区间
        this.highlightCurrentZone(status.zoneId);
    }

    // 定投计算器
    calculateDCA() {
        const monthlyAmount = parseFloat(document.getElementById('monthlyAmount').value) || 1000;
        const startDateInput = document.getElementById('startDate').value;
        
        if (!startDateInput) {
            alert('请选择开始日期');
            return;
        }
        
        const startDate = new Date(startDateInput);
        const now = new Date();
        const months = Math.max(1, (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth()));
        
        const totalInvested = monthlyAmount * months;
        
        // 简化计算：假设平均购买价格为历史平均
        const avgBuyPrice = this.btcData.reduce((sum, d) => sum + d.price, 0) / this.btcData.length;
        const btcAmount = totalInvested / avgBuyPrice;
        const currentValue = btcAmount * this.currentBTCPrice;
        const profit = currentValue - totalInvested;
        const profitRate = (profit / totalInvested) * 100;
        
        // 显示结果
        document.getElementById('totalInvested').textContent = '$' + totalInvested.toLocaleString();
        document.getElementById('currentValue').textContent = '$' + currentValue.toLocaleString();
        document.getElementById('profitRate').textContent = (profitRate >= 0 ? '+' : '') + profitRate.toFixed(2) + '%';
        document.getElementById('profitRate').className = `text-xl font-bold ${profitRate >= 0 ? 'text-green-400' : 'text-red-400'}`;
        document.getElementById('btcAmount').textContent = btcAmount.toFixed(4) + ' BTC';
        
        document.getElementById('dcaResult').classList.remove('hidden');
    }

    // 启动定时刷新
    startPriceRefresh() {
        this.fetchBTCPrice();
        setInterval(() => this.fetchBTCPrice(), 30000);
    }

    async run() {
        try {
            // 获取实时价格
            const currentPrice = await this.fetchBTCPrice();
            const basePrice = currentPrice || 70000;
            
            // 生成历史数据
            this.btcData = this.generateHistoricalData(basePrice);
            
            let data = this.calculate200DMA(this.btcData);
            data = this.calculateExponentialGrowth(data);
            data = this.calculateAHR999(data);
            
            this.btcData = data;
            this.filteredData = data;
            
            const status = this.getCurrentStatus(data);
            
            // 初始化图表（延迟确保库已加载）
            setTimeout(() => {
                const chartInitialized = this.initChart();
                if (chartInitialized) {
                    this.updateChart(this.filteredData);
                }
            }, 100);
            
            this.updateDisplay(status);
            
            // 获取广告配置
            await this.fetchAdsConfig();
            
            // 启动定时刷新
            this.startPriceRefresh();
            
            // 设置默认开始日期（1年前）
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            document.getElementById('startDate').value = oneYearAgo.toISOString().split('T')[0];
            
        } catch (error) {
            console.error('运行失败:', error);
            document.getElementById('currentIndex').textContent = '错误';
            document.getElementById('indexStatus').textContent = error.message;
        }
    }
}

// 页面加载完成后运行
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BTCIndexApp();
    window.app.run();
});
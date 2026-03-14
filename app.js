// ahr999 指数计算和图表展示

class AHR999Index {
    constructor() {
        this.btcData = [];
        this.chart = null;
        this.priceSeries = null;
        this.ma200Series = null;
        this.indexSeries = null;
    }

    // 获取 OKX 实时行情
    async fetchOKXTicker() {
        console.log('开始获取 OKX 行情...');
        
        // 尝试直接请求 OKX
        try {
            const response = await fetch('https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });
            console.log('OKX 响应状态:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('OKX 数据:', data);
                
                if (data.data && data.data[0]) {
                    const ticker = data.data[0];
                    return {
                        last: parseFloat(ticker.last),
                        bidPx: parseFloat(ticker.bidPx),
                        askPx: parseFloat(ticker.askPx),
                        bidSz: parseFloat(ticker.bidSz),
                        askSz: parseFloat(ticker.askSz),
                        high24h: parseFloat(ticker.high24h),
                        low24h: parseFloat(ticker.low24h),
                        vol24h: parseFloat(ticker.vol24h),
                        ts: parseInt(ticker.ts)
                    };
                }
            } else {
                console.error('OKX API 错误:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('OKX 行情获取失败:', error.message);
        }
        
        // 使用模拟数据作为备选
        console.log('使用模拟行情数据');
        return {
            last: 70576,
            bidPx: 70575,
            askPx: 70576,
            bidSz: 0.5,
            askSz: 0.3,
            high24h: 71200,
            low24h: 69800,
            vol24h: 12500,
            ts: Date.now(),
            isMock: true
        };
    }

    // 更新 OKX 行情显示
    updateOKXDisplay(ticker) {
        if (!ticker) {
            console.log('没有行情数据可显示');
            return;
        }
        
        console.log('更新行情显示:', ticker);
        
        const mockBadge = ticker.isMock ? '<span class="text-xs text-yellow-500 ml-2">(模拟数据)</span>' : '';
        
        const okxHtml = `
            <div class="glass rounded-xl p-4 mb-4">
                <h3 class="text-lg font-bold mb-3 text-gray-300">OKX 实时行情 (BTC-USDT)${mockBadge}</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="text-gray-400 text-xs">最新价格</div>
                        <div class="text-xl font-bold text-yellow-400">$${ticker.last.toLocaleString()}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400 text-xs">买一 / 卖一</div>
                        <div class="text-sm font-bold">$${ticker.bidPx.toLocaleString()} / $${ticker.askPx.toLocaleString()}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400 text-xs">24h 最高 / 最低</div>
                        <div class="text-sm font-bold text-green-400">$${ticker.high24h ? ticker.high24h.toLocaleString() : '--'} <span class="text-gray-500">/</span> <span class="text-red-400">$${ticker.low24h ? ticker.low24h.toLocaleString() : '--'}</span></div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400 text-xs">24h 成交量</div>
                        <div class="text-sm font-bold">${ticker.vol24h ? ticker.vol24h.toFixed(2) : '--'} BTC</div>
                    </div>
                </div>
            </div>
        `;
        
        const existingOkx = document.getElementById('okx-ticker');
        if (existingOkx) {
            existingOkx.innerHTML = okxHtml;
        } else {
            const container = document.createElement('div');
            container.id = 'okx-ticker';
            container.innerHTML = okxHtml;
            const chartDiv = document.getElementById('chart');
            chartDiv.parentNode.insertBefore(container, chartDiv);
        }
    }

    // 尝试多个数据源获取比特币历史价格
    async fetchBTCData() {
        // 同时获取 OKX 实时行情
        this.okxTicker = await this.fetchOKXTicker();
        if (this.okxTicker) {
            this.updateOKXDisplay(this.okxTicker);
        }

        // 尝试 CoinGecko
        try {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1825',
                { timeout: 10000 }
            );
            if (response.ok) {
                const data = await response.json();
                this.btcData = data.prices.map(([timestamp, price]) => ({
                    time: Math.floor(timestamp / 1000),
                    price: price
                }));
                console.log('CoinGecko 数据获取成功');
                return this.btcData;
            }
        } catch (error) {
            console.log('CoinGecko 失败:', error);
        }

        // 尝试 Binance API
        try {
            const response = await fetch(
                'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=1825'
            );
            if (response.ok) {
                const data = await response.json();
                this.btcData = data.map(item => ({
                    time: Math.floor(item[0] / 1000),
                    price: parseFloat(item[4]) // 收盘价
                }));
                console.log('Binance 数据获取成功');
                return this.btcData;
            }
        } catch (error) {
            console.log('Binance 失败:', error);
        }

        // 使用模拟数据作为最后备选
        console.log('使用模拟数据');
        return this.generateMockData();
    }

    // 生成模拟数据（基于真实历史走势）
    generateMockData() {
        const data = [];
        const now = Math.floor(Date.now() / 1000);
        const days = 1825; // 5年
        
        // 基于比特币历史走势的关键节点
        const keyPrices = {
            1825: 10000,    // 5年前
            1460: 12000,    // 4年前
            1095: 60000,    // 3年前 (2021高点)
            730: 20000,     // 2年前 (2022低点)
            365: 40000,     // 1年前
            0: 70000        // 现在
        };
        
        for (let i = days; i >= 0; i--) {
            const time = now - i * 86400;
            
            // 线性插值计算基础价格
            let basePrice;
            if (i >= 1460) {
                basePrice = this.lerp(i, 1825, 1460, keyPrices[1825], keyPrices[1460]);
            } else if (i >= 1095) {
                basePrice = this.lerp(i, 1460, 1095, keyPrices[1460], keyPrices[1095]);
            } else if (i >= 730) {
                basePrice = this.lerp(i, 1095, 730, keyPrices[1095], keyPrices[730]);
            } else if (i >= 365) {
                basePrice = this.lerp(i, 730, 365, keyPrices[730], keyPrices[365]);
            } else {
                basePrice = this.lerp(i, 365, 0, keyPrices[365], keyPrices[0]);
            }
            
            // 添加波动
            const volatility = 1 + (Math.random() - 0.5) * 0.15;
            const price = basePrice * volatility;
            
            data.push({ time, price });
        }
        
        return data;
    }

    // 线性插值
    lerp(x, x1, x2, y1, y2) {
        return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    }

    // 计算 200 日移动平均
    calculate200DMA(data) {
        return data.map((item, index) => {
            if (index < 199) return { ...item, ma200: null };
            
            const sum = data
                .slice(index - 199, index + 1)
                .reduce((acc, curr) => acc + curr.price, 0);
            
            return { ...item, ma200: sum / 200 };
        });
    }

    // 计算指数增长估值
    calculateExponentialGrowth(data) {
        const n = data.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        
        data.forEach((item, i) => {
            const x = i;
            const y = Math.log(item.price);
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumX2 += x * x;
        });
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        return data.map((item, i) => ({
            ...item,
            expValue: Math.exp(intercept + slope * i)
        }));
    }

    // 计算 ahr999 指数
    calculateAHR999(data) {
        return data.map(item => {
            if (!item.ma200 || !item.expValue) return { ...item, ahr999: null };
            
            const ahr999 = (item.price / item.ma200) * (item.price / item.expValue);
            return { ...item, ahr999 };
        });
    }

    // 获取当前状态和建议
    getCurrentStatus(data) {
        // 优先使用 OKX 实时价格
        const latest = data[data.length - 1];
        const price = this.okxTicker ? this.okxTicker.last : latest.price;
        const ahr999 = latest.ahr999 || 0;
        
        let status, suggestion, color;
        
        if (ahr999 < 0.45) {
            status = '抄底区间';
            suggestion = '大胆买入';
            color = 'text-green-400';
        } else if (ahr999 < 1.2) {
            status = '定投区间';
            suggestion = '坚持定投';
            color = 'text-blue-400';
        } else if (ahr999 < 5) {
            status = '观望区间';
            suggestion = '停止定投';
            color = 'text-yellow-400';
        } else {
            status = '可能见顶';
            suggestion = '考虑卖出';
            color = 'text-red-400';
        }
        
        return {
            price: price,
            ma200: latest.ma200 || price,
            ahr999: ahr999,
            status,
            suggestion,
            color
        };
    }

    // 初始化图表
    initChart() {
        const chartContainer = document.getElementById('chart');
        
        this.chart = LightweightCharts.createChart(chartContainer, {
            layout: {
                background: { color: 'transparent' },
                textColor: '#d1d5db',
            },
            grid: {
                vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
                horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            timeScale: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
            },
        });

        // 比特币价格线
        this.priceSeries = this.chart.addLineSeries({
            title: 'BTC 价格',
            color: '#f59e0b',
            lineWidth: 2,
        });

        // 200日均线
        this.ma200Series = this.chart.addLineSeries({
            title: '200日定投成本',
            color: '#3b82f6',
            lineWidth: 1,
        });

        // ahr999 指数（右侧坐标）
        this.indexSeries = this.chart.addLineSeries({
            title: 'ahr999 指数',
            color: '#10b981',
            lineWidth: 2,
            priceScaleId: 'right',
        });

        this.chart.priceScale('right').applyOptions({
            visible: true,
        });
    }

    // 更新图表
    updateChart(data) {
        const priceData = data
            .filter(d => d.price)
            .map(d => ({
                time: d.time,
                value: d.price
            }));

        const ma200Data = data
            .filter(d => d.ma200)
            .map(d => ({
                time: d.time,
                value: d.ma200
            }));

        const indexData = data
            .filter(d => d.ahr999)
            .map(d => ({
                time: d.time,
                value: d.ahr999
            }));

        this.priceSeries.setData(priceData);
        this.ma200Series.setData(ma200Data);
        this.indexSeries.setData(indexData);
        
        this.chart.timeScale().fitContent();
    }

    // 更新显示
    updateDisplay(status) {
        document.getElementById('currentIndex').textContent = status.ahr999.toFixed(2);
        document.getElementById('currentIndex').className = `text-4xl font-bold ${status.color}`;
        
        document.getElementById('indexStatus').textContent = status.status;
        document.getElementById('indexStatus').className = `text-sm mt-2 ${status.color}`;
        
        document.getElementById('btcPrice').textContent = '$' + status.price.toLocaleString('en-US', { maximumFractionDigits: 0 });
        document.getElementById('avgCost').textContent = '$' + status.ma200.toLocaleString('en-US', { maximumFractionDigits: 0 });
        
        document.getElementById('suggestion').textContent = status.suggestion;
        document.getElementById('suggestion').className = `text-lg font-bold ${status.color}`;
    }

    // 主运行函数
    async run() {
        console.log('开始运行 ahr999 指数...');
        try {
            // 获取数据
            await this.fetchBTCData();
            
            if (!this.btcData || this.btcData.length === 0) {
                throw new Error('没有获取到数据');
            }
            
            console.log('获取到数据点数:', this.btcData.length);
            
            // 计算指标
            let data = this.calculate200DMA(this.btcData);
            data = this.calculateExponentialGrowth(data);
            data = this.calculateAHR999(data);
            
            // 获取当前状态
            const status = this.getCurrentStatus(data);
            console.log('当前状态:', status);
            
            // 初始化并更新图表
            this.initChart();
            this.updateChart(data);
            this.updateDisplay(status);
            
            console.log('运行完成');
        } catch (error) {
            console.error('运行失败:', error);
            document.getElementById('currentIndex').textContent = '错误';
            document.getElementById('indexStatus').textContent = '数据加载失败: ' + error.message;
        }
    }
}

// 页面加载完成后运行
document.addEventListener('DOMContentLoaded', () => {
    const app = new AHR999Index();
    app.run();
});

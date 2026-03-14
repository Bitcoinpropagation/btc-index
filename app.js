// ahr999 指数计算和图表展示

class AHR999Index {
    constructor() {
        this.btcData = [];
        this.chart = null;
        this.priceSeries = null;
        this.indexSeries = null;
    }

    // 从 CoinGecko 获取比特币历史价格
    async fetchBTCData() {
        try {
            // 获取 5 年数据，按天
            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1825'
            );
            const data = await response.json();
            
            // 处理数据
            this.btcData = data.prices.map(([timestamp, price]) => ({
                time: Math.floor(timestamp / 1000),
                price: price
            }));
            
            return this.btcData;
        } catch (error) {
            console.error('获取数据失败:', error);
            // 使用模拟数据
            return this.generateMockData();
        }
    }

    // 生成模拟数据（用于测试）
    generateMockData() {
        const data = [];
        const startPrice = 10000;
        const now = Math.floor(Date.now() / 1000);
        const days = 1825; // 5年
        
        for (let i = days; i >= 0; i--) {
            const time = now - i * 86400;
            // 模拟比特币价格增长趋势
            const growth = Math.pow(1.0003, days - i);
            const volatility = 1 + (Math.random() - 0.5) * 0.1;
            const price = startPrice * growth * volatility;
            data.push({ time, price });
        }
        
        return data;
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
    // 基于历史数据拟合指数增长曲线
    calculateExponentialGrowth(data) {
        // 使用对数线性回归计算增长趋势
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
        const latest = data[data.length - 1];
        const ahr999 = latest.ahr999;
        
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
            price: latest.price,
            ma200: latest.ma200,
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
        // 获取数据
        await this.fetchBTCData();
        
        // 计算指标
        let data = this.calculate200DMA(this.btcData);
        data = this.calculateExponentialGrowth(data);
        data = this.calculateAHR999(data);
        
        // 获取当前状态
        const status = this.getCurrentStatus(data);
        
        // 初始化并更新图表
        this.initChart();
        this.updateChart(data);
        this.updateDisplay(status);
    }
}

// 页面加载完成后运行
document.addEventListener('DOMContentLoaded', () => {
    const app = new AHR999Index();
    app.run();
});

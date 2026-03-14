// ahr999 指数计算和图表展示 - 简化版

class AHR999Index {
    constructor() {
        this.btcData = [];
        this.chart = null;
        this.priceSeries = null;
        this.ma200Series = null;
        this.indexSeries = null;
    }

    // 生成模拟数据
    generateMockData() {
        const data = [];
        const now = Math.floor(Date.now() / 1000);
        const days = 1825;
        
        // 基于真实历史走势的关键节点
        const keyPrices = {
            1825: 10000, 1460: 12000, 1095: 60000, 730: 20000, 365: 40000, 0: 70576
        };
        
        for (let i = days; i >= 0; i--) {
            const time = now - i * 86400;
            let basePrice;
            if (i >= 1460) basePrice = this.lerp(i, 1825, 1460, keyPrices[1825], keyPrices[1460]);
            else if (i >= 1095) basePrice = this.lerp(i, 1460, 1095, keyPrices[1460], keyPrices[1095]);
            else if (i >= 730) basePrice = this.lerp(i, 1095, 730, keyPrices[1095], keyPrices[730]);
            else if (i >= 365) basePrice = this.lerp(i, 730, 365, keyPrices[730], keyPrices[365]);
            else basePrice = this.lerp(i, 365, 0, keyPrices[365], keyPrices[0]);
            
            const volatility = 1 + (Math.random() - 0.5) * 0.15;
            data.push({ time, price: basePrice * volatility });
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
        document.getElementById('btcPrice').textContent = '$' + status.price.toLocaleString('en-US', { maximumFractionDigits: 0 });
        document.getElementById('avgCost').textContent = '$' + status.ma200.toLocaleString('en-US', { maximumFractionDigits: 0 });
        document.getElementById('suggestion').textContent = status.suggestion;
        document.getElementById('suggestion').className = `text-lg font-bold ${status.color}`;
    }

    async run() {
        try {
            // 使用模拟数据
            this.btcData = this.generateMockData();
            
            let data = this.calculate200DMA(this.btcData);
            data = this.calculateExponentialGrowth(data);
            data = this.calculateAHR999(data);
            
            const status = this.getCurrentStatus(data);
            
            this.initChart();
            this.updateChart(data);
            this.updateDisplay(status);
        } catch (error) {
            console.error('运行失败:', error);
            document.getElementById('currentIndex').textContent = '错误';
            document.getElementById('indexStatus').textContent = error.message;
        }
    }
}

// 页面加载完成后运行
document.addEventListener('DOMContentLoaded', () => {
    const app = new AHR999Index();
    app.run();
});

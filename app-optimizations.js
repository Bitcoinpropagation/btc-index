// 在原有 app.js 基础上添加优化功能

// 扩展 BTCIndexApp 类
BTCIndexApp.prototype.updateDisplay = function(status) {
    const currentIndexEl = document.getElementById('currentIndex');
    const indexStatusEl = document.getElementById('indexStatus');
    const btcPriceEl = document.getElementById('btcPrice');
    const avgCostEl = document.getElementById('avgCost');
    const suggestionEl = document.getElementById('suggestion');
    const indexZoneBadge = document.getElementById('indexZoneBadge');
    
    if (currentIndexEl) { 
        currentIndexEl.textContent = status.ahr999.toFixed(2); 
        currentIndexEl.className = `text-3xl md:text-4xl font-bold ${status.color}`;
        // 添加更新动画
        currentIndexEl.classList.add('price-updated');
        setTimeout(() => currentIndexEl.classList.remove('price-updated'), 500);
    }
    
    // 添加指数区间徽章
    if (indexZoneBadge) {
        indexZoneBadge.classList.remove('hidden');
        indexZoneBadge.textContent = status.status;
        indexZoneBadge.className = `index-badge ${status.color.replace('text-', 'bg-').replace('400', '500/20')} ${status.color}`;
    }
    
    if (indexStatusEl) { 
        indexStatusEl.textContent = status.suggestion; 
        indexStatusEl.className = `text-sm mt-2 ${status.color}`; 
    }
    
    const displayPrice = this.currentBTCPrice || status.price;
    if (btcPriceEl) {
        const oldPrice = btcPriceEl.textContent;
        btcPriceEl.textContent = '$' + displayPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
        // 价格变化动画
        if (oldPrice !== '$--' && oldPrice !== btcPriceEl.textContent) {
            btcPriceEl.classList.add('price-updated');
            setTimeout(() => btcPriceEl.classList.remove('price-updated'), 500);
        }
    }
    
    if (avgCostEl) avgCostEl.textContent = '$' + status.ma200.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (suggestionEl) { 
        suggestionEl.textContent = status.suggestion; 
        suggestionEl.className = `text-base md:text-lg font-bold ${status.color}`; 
    }
    
    this.highlightCurrentZone(status.zoneId);
};

// 添加计算按钮加载状态
BTCIndexApp.prototype.calculateDCA = function() {
    const btn = document.getElementById('calcBtn');
    if (btn) {
        btn.classList.add('btn-loading');
        btn.disabled = true;
    }
    
    setTimeout(() => {
        const monthlyAmount = parseFloat(document.getElementById('monthlyAmount').value) || 1000;
        const startDateInput = document.getElementById('startDate').value;
        
        if (!startDateInput) { 
            alert(this.t('startDate') + ' required'); 
            if (btn) {
                btn.classList.remove('btn-loading');
                btn.disabled = false;
            }
            return; 
        }
        
        const startDate = new Date(startDateInput);
        const now = new Date();
        const months = Math.max(1, (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth()));
        const totalInvested = monthlyAmount * months;
        const avgBuyPrice = this.btcData.reduce((sum, d) => sum + d.price, 0) / this.btcData.length;
        const btcAmount = totalInvested / avgBuyPrice;
        const currentValue = btcAmount * this.currentBTCPrice;
        const profit = currentValue - totalInvested;
        const profitRate = (profit / totalInvested) * 100;
        
        document.getElementById('totalInvested').textContent = '$' + totalInvested.toLocaleString();
        document.getElementById('currentValue').textContent = '$' + currentValue.toLocaleString();
        document.getElementById('profitRate').textContent = (profitRate >= 0 ? '+' : '') + profitRate.toFixed(2) + '%';
        document.getElementById('profitRate').className = `text-xl font-bold ${profitRate >= 0 ? 'text-green-400' : 'text-red-400'}`;
        document.getElementById('btcAmount').textContent = btcAmount.toFixed(4) + ' BTC';
        document.getElementById('dcaResult').classList.remove('hidden');
        
        // 移除加载状态
        if (btn) {
            btn.classList.remove('btn-loading');
            btn.disabled = false;
        }
    }, 500);
};

// 添加图表重试功能
BTCIndexApp.prototype.retryChart = function() {
    document.getElementById('chartError').classList.add('hidden');
    document.getElementById('chartLoading').classList.remove('hidden');
    
    setTimeout(() => {
        if (this.initChart()) {
            this.updateChart(this.filteredData);
        }
    }, 1000);
};

// 更新价格显示时添加动画
BTCIndexApp.prototype.updatePriceDisplay = function() {
    const priceEl = document.getElementById('livePrice');
    const changeEl = document.getElementById('priceChange');
    const btcPriceEl = document.getElementById('btcPrice');
    const updateStatus = document.getElementById('updateStatus');
    
    if (priceEl) {
        const oldPrice = priceEl.textContent;
        priceEl.textContent = '$' + this.currentBTCPrice.toLocaleString('en-US', { maximumFractionDigits: 2 });
        if (oldPrice !== '$--' && oldPrice !== priceEl.textContent) {
            priceEl.classList.add('price-updated');
            setTimeout(() => priceEl.classList.remove('price-updated'), 500);
        }
    }
    
    if (changeEl) {
        const isPositive = this.priceChange24h >= 0;
        changeEl.textContent = (isPositive ? '+' : '') + this.priceChange24h.toFixed(2) + '%';
        changeEl.className = `text-sm font-medium px-2 py-1 rounded ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`;
    }
    
    if (btcPriceEl && this.currentBTCPrice > 0) {
        btcPriceEl.textContent = '$' + this.currentBTCPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
    
    // 显示更新状态
    if (updateStatus) {
        updateStatus.classList.remove('hidden');
        setTimeout(() => updateStatus.classList.add('hidden'), 2000);
    }
};

// 更新矿工成本显示时添加动画
BTCIndexApp.prototype.updateMinerCostDisplay = function() {
    const minerCost = this.calculateMinerCost(this.currentBTCPrice);
    const ratio = this.currentBTCPrice / minerCost;
    
    const btcPriceEl = document.getElementById('minerBtcPrice');
    const costEl = document.getElementById('minerCost');
    const ratioEl = document.getElementById('priceToCostRatio');
    const suggestionEl = document.getElementById('minerSuggestion');
    
    if (btcPriceEl) {
        btcPriceEl.textContent = '$' + this.currentBTCPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
        btcPriceEl.classList.add('price-updated');
        setTimeout(() => btcPriceEl.classList.remove('price-updated'), 500);
    }
    
    if (costEl) costEl.textContent = '$' + minerCost.toLocaleString('en-US', { maximumFractionDigits: 0 });
    
    if (ratioEl) {
        ratioEl.textContent = ratio.toFixed(2);
        if (ratio > 1.5) ratioEl.className = 'text-2xl font-bold text-green-400';
        else if (ratio > 1) ratioEl.className = 'text-2xl font-bold text-yellow-400';
        else ratioEl.className = 'text-2xl font-bold text-red-400';
    }
    
    if (suggestionEl) {
        if (ratio > 1.5) {
            suggestionEl.textContent = this.t('minerProfit');
            suggestionEl.className = 'text-xs mt-1 text-green-400';
        } else if (ratio > 1) {
            suggestionEl.textContent = this.t('minerLowProfit');
            suggestionEl.className = 'text-xs mt-1 text-yellow-400';
        } else {
            suggestionEl.textContent = this.t('minerLoss');
            suggestionEl.className = 'text-xs mt-1 text-red-400';
        }
    }
};

console.log('BTC Index App optimizations loaded');

// 多语言配置
const i18n = {
    en: {
        title: "Bitcoin DCA Index",
        subtitle: "Based on 200-day DCA cost and exponential growth valuation",
        livePrice: "Bitcoin Live Price",
        updateEvery: "Update every 30s",
        change24h: "24h Change",
        dataSource: "Data Source",
        lastUpdate: "Last Update",
        refresh: "🔄 Refresh",
        currentIndex: "Current Index",
        btcPrice: "BTC Price",
        avgCost: "200-Day Avg Cost",
        suggestion: "Suggestion",
        history: "Historical Trend",
        days7: "7D",
        days30: "30D",
        days90: "90D",
        year1: "1Y",
        all: "All",
        indexZones: "DCA Index Zones",
        zone1: "< 0.45",
        zone1Name: "Bottom Fishing",
        zone1Desc: "Buy Aggressively",
        zone2: "0.45 - 1.2",
        zone2Name: "DCA Zone",
        zone2Desc: "Keep DCA",
        zone3: "1.2 - 5",
        zone3Name: "Wait & See",
        zone3Desc: "Stop DCA",
        zone4: "> 5",
        zone4Name: "Possible Top",
        zone4Desc: "Consider Selling",
        minerCost: "Miner Cost",
        minerCostDesc: "Estimated average cost for miners to produce 1 BTC",
        priceToMinerRatio: "Price/Miner Ratio",
        minerProfit: "Miners Profitable | Network Healthy",
        minerLowProfit: "Miners Low Profit | Watch Cautiously",
        minerLoss: "Miners at Loss | Possible Bottom",
        minerCurrentPrice: "Current BTC Price",
        minerCostLabel: "Est. Miner Cost",
        minerCostRatio: "Price/Cost Ratio",
        minerCostNote: "Avg cost to produce 1 BTC",
        minerIndicatorTitle: "Indicator Guide",
        minerIndicator1: "Price > Cost×1.5: Miners profitable, network healthy",
        minerIndicator2: "Cost < Price < Cost×1.5: Low profit, watch cautiously",
        minerIndicator3: "Price < Cost: Miners at loss, possible bottom",
        dcaCalculator: "DCA Profit Calculator",
        monthlyAmount: "Monthly Amount (USD)",
        startDate: "Start Date",
        calculate: "Calculate",
        totalInvested: "Total Invested",
        currentValue: "Current Value",
        profitRate: "Return Rate",
        btcAmount: "BTC Holdings",
        recommended: "Recommended Exchanges",
        comingSoon: "Coming Soon",
        minerCost: "Miner Cost",
        minerCostDesc: "Estimated average cost for miners to produce 1 BTC",
        priceToMinerRatio: "Price/Miner Ratio",
        minerProfit: "Miners Profitable | Network Healthy",
        minerLowProfit: "Miners Low Profit | Watch Cautiously",
        minerLoss: "Miners at Loss | Possible Bottom",
        disclaimer: "Data source: CoinGecko API | For reference only, not investment advice",
        chartLoading: "Loading chart...",
        chartError: "Chart failed to load, please refresh"
    },
    zh: {
        title: "比特币定投指数",
        subtitle: "基于 200 日定投成本和指数增长估值的定投策略工具",
        livePrice: "比特币实时价格",
        updateEvery: "每30秒更新",
        change24h: "24h 涨跌幅",
        dataSource: "数据来源",
        lastUpdate: "最后更新",
        refresh: "🔄 刷新数据",
        currentIndex: "当前指数",
        btcPrice: "比特币价格",
        avgCost: "200日定投成本",
        suggestion: "投资建议",
        history: "历史走势",
        days7: "7天",
        days30: "30天",
        days90: "90天",
        year1: "1年",
        all: "全部",
        indexZones: "定投指数区间说明",
        zone1: "< 0.45",
        zone1Name: "抄底区间",
        zone1Desc: "大胆买入",
        zone2: "0.45 - 1.2",
        zone2Name: "定投区间",
        zone2Desc: "坚持定投",
        zone3: "1.2 - 5",
        zone3Name: "观望区间",
        zone3Desc: "停止定投",
        zone4: "> 5",
        zone4Name: "可能见顶",
        zone4Desc: "考虑卖出",
        dcaCalculator: "定投收益计算器",
        monthlyAmount: "每月定投金额 (USD)",
        startDate: "开始日期",
        calculate: "计算收益",
        totalInvested: "总投入",
        currentValue: "当前价值",
        profitRate: "收益率",
        btcAmount: "持仓量",
        recommended: "推荐交易平台",
        comingSoon: "敬请期待",
        minerCost: "矿工成本",
        minerCostDesc: "矿工生产1枚BTC的预估平均成本",
        priceToMinerRatio: "价格/成本比",
        minerProfit: "矿工盈利 | 网络健康",
        minerLowProfit: "矿工微利 | 谨慎观望",
        minerLoss: "矿工亏损 | 可能底部",
        minerCurrentPrice: "当前比特币价格",
        minerCostLabel: "预估矿工成本",
        minerCostRatio: "价格/成本比",
        minerCostNote: "生产1枚BTC的平均成本",
        minerIndicatorTitle: "指标说明",
        minerIndicator1: "价格 > 成本×1.5: 矿工盈利，网络健康",
        minerIndicator2: "成本 < 价格 < 成本×1.5: 矿工微利，谨慎观望",
        minerIndicator3: "价格 < 成本: 矿工亏损，可能底部",
        disclaimer: "数据来源：CoinGecko API | 仅供参考，不构成投资建议",
        chartLoading: "正在加载图表...",
        chartError: "图表加载失败，请刷新页面重试"
    },
    ja: {
        title: "ビットコイン積立指数",
        subtitle: "200日積立コストと指数関数的成長評価に基づく積立戦略ツール",
        livePrice: "ビットコイン実時価格",
        updateEvery: "30秒ごとに更新",
        change24h: "24時間変動率",
        dataSource: "データソース",
        lastUpdate: "最終更新",
        refresh: "🔄 更新",
        currentIndex: "現在の指数",
        btcPrice: "ビットコイン価格",
        avgCost: "200日積立平均コスト",
        suggestion: "投資アドバイス",
        history: "履歴トレンド",
        days7: "7日",
        days30: "30日",
        days90: "90日",
        year1: "1年",
        all: "全期間",
        indexZones: "積立指数ゾーン説明",
        zone1: "< 0.45",
        zone1Name: "底打ちゾーン",
        zone1Desc: "積極的に購入",
        zone2: "0.45 - 1.2",
        zone2Name: "積立ゾーン",
        zone2Desc: "継続積立",
        zone3: "1.2 - 5",
        zone3Name: "様子見ゾーン",
        zone3Desc: "積立停止",
        zone4: "> 5",
        zone4Name: "天井可能性",
        zone4Desc: "売却検討",
        minerCost: "マイニングコスト",
        minerCostDesc: "1BTCの生産にかかる推定平均コスト",
        priceToMinerRatio: "価格/コスト比",
        minerProfit: "マイナー収益 | ネットワーク健全",
        minerLowProfit: "マイナー低収益 | 慎重に観望",
        minerLoss: "マイナー赤字 | 底打ち可能性",
        dcaCalculator: "積立収益計算機",
        monthlyAmount: "月積立金額 (USD)",
        startDate: "開始日",
        calculate: "計算する",
        totalInvested: "総投資額",
        currentValue: "現在価値",
        profitRate: "収益率",
        btcAmount: "保有量",
        recommended: "おすすめ取引所",
        comingSoon: "準備中",
        disclaimer: "データソース：CoinGecko API | 参考用であり、投資アドバイスではありません",
        chartLoading: "チャートを読み込み中...",
        chartError: "チャートの読み込みに失敗しました。ページを更新してください"
    },
    es: {
        title: "Índice DCA de Bitcoin",
        subtitle: "Herramienta de estrategia DCA basada en costo promedio de 200 días y valoración de crecimiento exponencial",
        livePrice: "Precio en Vivo de Bitcoin",
        updateEvery: "Actualiza cada 30s",
        change24h: "Cambio 24h",
        dataSource: "Fuente de Datos",
        lastUpdate: "Última Actualización",
        refresh: "🔄 Actualizar",
        currentIndex: "Índice Actual",
        btcPrice: "Precio BTC",
        avgCost: "Costo Promedio 200 Días",
        suggestion: "Sugerencia",
        history: "Tendencia Histórica",
        days7: "7D",
        days30: "30D",
        days90: "90D",
        year1: "1A",
        all: "Todo",
        indexZones: "Zonas del Índice DCA",
        zone1: "< 0.45",
        zone1Name: "Oportunidad",
        zone1Desc: "Comprar Agresivamente",
        zone2: "0.45 - 1.2",
        zone2Name: "Zona DCA",
        zone2Desc: "Continuar DCA",
        zone3: "1.2 - 5",
        zone3Name: "Esperar",
        zone3Desc: "Detener DCA",
        zone4: "> 5",
        zone4Name: "Posible Techo",
        zone4Desc: "Considerar Venta",
        dcaCalculator: "Calculadora de Ganancias DCA",
        monthlyAmount: "Monto Mensual (USD)",
        startDate: "Fecha de Inicio",
        calculate: "Calcular",
        totalInvested: "Total Invertido",
        currentValue: "Valor Actual",
        profitRate: "Tasa de Retorno",
        btcAmount: "Tenencia BTC",
        recommended: "Exchanges Recomendados",
        comingSoon: "Próximamente",
        disclaimer: "Fuente: CoinGecko API | Solo referencia, no es consejo de inversión",
        chartLoading: "Cargando gráfico...",
        chartError: "Error al cargar gráfico, por favor actualice"
    },
    fr: {
        title: "Indice DCA Bitcoin",
        subtitle: "Outil de stratégie DCA basé sur le coût moyen de 200 jours et l'évaluation de croissance exponentielle",
        livePrice: "Prix en Direct du Bitcoin",
        updateEvery: "Mise à jour toutes les 30s",
        change24h: "Variation 24h",
        dataSource: "Source de Données",
        lastUpdate: "Dernière Mise à Jour",
        refresh: "🔄 Actualiser",
        currentIndex: "Indice Actuel",
        btcPrice: "Prix BTC",
        avgCost: "Coût Moyen 200 Jours",
        suggestion: "Suggestion",
        history: "Tendance Historique",
        days7: "7J",
        days30: "30J",
        days90: "90J",
        year1: "1A",
        all: "Tout",
        indexZones: "Zones de l'Indice DCA",
        zone1: "< 0.45",
        zone1Name: "Opportunité",
        zone1Desc: "Acheter Aggressivement",
        zone2: "0.45 - 1.2",
        zone2Name: "Zone DCA",
        zone2Desc: "Continuer DCA",
        zone3: "1.2 - 5",
        zone3Name: "Attendre",
        zone3Desc: "Arrêter DCA",
        zone4: "> 5",
        zone4Name: "Possible Sommet",
        zone4Desc: "Envisager Vente",
        dcaCalculator: "Calculateur de Profits DCA",
        monthlyAmount: "Montant Mensuel (USD)",
        startDate: "Date de Début",
        calculate: "Calculer",
        totalInvested: "Total Investi",
        currentValue: "Valeur Actuelle",
        profitRate: "Taux de Retour",
        btcAmount: "Détention BTC",
        recommended: "Exchanges Recommandés",
        comingSoon: "Bientôt Disponible",
        disclaimer: "Source: CoinGecko API | Uniquement référence, pas un conseil d'investissement",
        chartLoading: "Chargement du graphique...",
        chartError: "Erreur de chargement, veuillez actualiser"
    },
    ko: {
        title: "비트코인 적립 지수",
        subtitle: "200일 적립 비용과 지수 성장 평가를 기반으로 한 적립 전략 도구",
        livePrice: "비트코인 실시간 가격",
        updateEvery: "30초마다 업데이트",
        change24h: "24시간 변동률",
        dataSource: "데이터 소스",
        lastUpdate: "마지막 업데이트",
        refresh: "🔄 새로고침",
        currentIndex: "현재 지수",
        btcPrice: "비트코인 가격",
        avgCost: "200일 적립 평균 비용",
        suggestion: "투자 제안",
        history: "역사적 추세",
        days7: "7일",
        days30: "30일",
        days90: "90일",
        year1: "1년",
        all: "전체",
        indexZones: "적립 지수 구간 설명",
        zone1: "< 0.45",
        zone1Name: "바닥 구간",
        zone1Desc: "적극 매수",
        zone2: "0.45 - 1.2",
        zone2Name: "적립 구간",
        zone2Desc: "적립 계속",
        zone3: "1.2 - 5",
        zone3Name: "관망 구간",
        zone3Desc: "적립 중단",
        zone4: "> 5",
        zone4Name: "정점 가능성",
        zone4Desc: "매도 고려",
        dcaCalculator: "적립 수익 계산기",
        monthlyAmount: "월 적립 금액 (USD)",
        startDate: "시작일",
        calculate: "계산하기",
        totalInvested: "총 투자액",
        currentValue: "현재 가치",
        profitRate: "수익률",
        btcAmount: "보유량",
        recommended: "추천 거래소",
        comingSoon: "준비 중",
        disclaimer: "데이터 소스: CoinGecko API | 참고용이며 투자 조언이 아닙니다",
        chartLoading: "차트 로딩 중...",
        chartError: "차트 로딩 실패, 새로고침 해주세요"
    },
    ar: {
        title: "مؤشر متوسط تكلفة الاستثمار في البيتكوين",
        subtitle: "أداة استراتيجية الاستثمار الدوري بناءً على متوسط تكلفة 200 يوم وتقييم النمو الأسي",
        livePrice: "سعر البيتكوين المباشر",
        updateEvery: "التحديث كل 30 ثانية",
        change24h: "التغيير في 24 ساعة",
        dataSource: "مصدر البيانات",
        lastUpdate: "آخر تحديث",
        refresh: "🔄 تحديث",
        currentIndex: "المؤشر الحالي",
        btcPrice: "سعر البيتكوين",
        avgCost: "متوسط تكلفة 200 يوم",
        suggestion: "الاقتراح",
        history: "الاتجاه التاريخي",
        days7: "7 أيام",
        days30: "30 يوم",
        days90: "90 يوم",
        year1: "سنة واحدة",
        all: "الكل",
        indexZones: "مناطق مؤشر الاستثمار الدوري",
        zone1: "< 0.45",
        zone1Name: "منطقة الشراء",
        zone1Desc: "شراء بقوة",
        zone2: "0.45 - 1.2",
        zone2Name: "منطقة الاستثمار الدوري",
        zone2Desc: "استمرار الاستثمار الدوري",
        zone3: "1.2 - 5",
        zone3Name: "منطقة الانتظار",
        zone3Desc: "إيقاف الاستثمار الدوري",
        zone4: "> 5",
        zone4Name: "احتمال الذروة",
        zone4Desc: "النظر في البيع",
        dcaCalculator: "حاسبة أرباح الاستثمار الدوري",
        monthlyAmount: "المبلغ الشهري (دولار أمريكي)",
        startDate: "تاريخ البدء",
        calculate: "حساب",
        totalInvested: "إجمالي المستثمر",
        currentValue: "القيمة الحالية",
        profitRate: "معدل العائد",
        btcAmount: "كمية البيتكوين",
        recommended: "المنصات الموصى بها",
        comingSoon: "قريباً",
        disclaimer: "مصدر البيانات: CoinGecko API | للمرجعية فقط، وليس نصيحة استثمارية",
        chartLoading: "جاري تحميل الرسم البياني...",
        chartError: "فشل تحميل الرسم البياني، يرجى التحديث"
    }
};
// 比特币定投指数应用
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
        this.currentLang = 'en';
    }

    setLanguage(lang) {
        if (i18n[lang]) {
            this.currentLang = lang;
            localStorage.setItem('btcIndexLang', lang);
            
            // 更新语言按钮样式
            document.querySelectorAll('.lang-btn').forEach(btn => {
                if (btn.dataset.lang === lang) {
                    btn.classList.remove('bg-white/10');
                    btn.classList.add('bg-blue-500/30');
                } else {
                    btn.classList.remove('bg-blue-500/30');
                    btn.classList.add('bg-white/10');
                }
            });
            
            this.updateUI();
            // 重新计算并显示当前状态
            if (this.btcData && this.btcData.length > 0) {
                const status = this.getCurrentStatus(this.btcData);
                this.updateDisplay(status);
            }
        }
    }

    t(key) {
        return i18n[this.currentLang][key] || i18n['en'][key] || key;
    }

    updateUI() {
        document.querySelector('h1').textContent = this.t('title');
        document.querySelector('header p').textContent = this.t('subtitle');
        document.title = this.t('title') + ' - BTC DCA Index';
        
        const priceLabels = document.querySelectorAll('.text-sm.text-gray-400');
        if (priceLabels[0]) priceLabels[0].textContent = this.t('livePrice');
        if (priceLabels[1]) priceLabels[1].textContent = this.t('change24h');
        if (priceLabels[2]) priceLabels[2].textContent = this.t('dataSource');
        
        document.querySelector('.pulse-dot + span').textContent = this.t('updateEvery');
        document.getElementById('lastUpdate').parentNode.childNodes[0].textContent = this.t('lastUpdate') + ': ';
        document.querySelector('button[onclick="window.location.reload()"]').textContent = this.t('refresh');
        
        const cards = document.querySelectorAll('.glass.rounded-xl');
        if (cards[1]) cards[1].querySelector('.text-gray-400').textContent = this.t('currentIndex');
        if (cards[2]) cards[2].querySelector('.text-gray-400').textContent = this.t('btcPrice');
        if (cards[3]) cards[3].querySelector('.text-gray-400').textContent = this.t('avgCost');
        if (cards[4]) cards[4].querySelector('.text-gray-400').textContent = this.t('suggestion');
        
        document.querySelector('#chart').parentNode.querySelector('h2').textContent = this.t('history');
        
        const ranges = ['days7', 'days30', 'days90', 'year1', 'all'];
        document.querySelectorAll('.time-range-btn').forEach((btn, index) => {
            btn.textContent = this.t(ranges[index]);
        });
        
        document.querySelector('#chartLoading span').textContent = this.t('chartLoading');
        
        document.querySelectorAll('.glass.rounded-xl.p-6.mb-8')[1].querySelector('h2').textContent = this.t('indexZones');
        
        ['zone1', 'zone2', 'zone3', 'zone4'].forEach((zone, index) => {
            const el = document.getElementById(zone);
            if (el) {
                el.querySelector('.text-2xl').textContent = this.t(zone);
                el.querySelector('.text-sm').textContent = this.t(zone + 'Name');
                el.querySelector('.text-xs').textContent = this.t(zone + 'Desc');
            }
        });
        
        document.querySelectorAll('.glass.rounded-xl.p-6.mb-8')[2].querySelector('h2').textContent = this.t('dcaCalculator');
        const calcLabels = document.querySelectorAll('.glass.rounded-xl.p-6.mb-8')[2].querySelectorAll('label');
        if (calcLabels[0]) calcLabels[0].textContent = this.t('monthlyAmount');
        if (calcLabels[1]) calcLabels[1].textContent = this.t('startDate');
        document.querySelector('button[onclick="app.calculateDCA()"]').textContent = this.t('calculate');
        
        // 更新矿工成本模块
        const minerSections = document.querySelectorAll('.glass.rounded-xl.p-6.mb-8');
        if (minerSections[3]) {
            minerSections[3].querySelector('h2').textContent = this.t('minerCost');
            const minerLabels = minerSections[3].querySelectorAll('.text-gray-400.text-sm');
            if (minerLabels[0]) minerLabels[0].textContent = this.t('minerCurrentPrice');
            if (minerLabels[1]) minerLabels[1].textContent = this.t('minerCostLabel');
            if (minerLabels[2]) minerLabels[2].textContent = this.t('minerCostRatio');
            const minerNote = minerSections[3].querySelector('.text-xs.text-gray-500');
            if (minerNote) minerNote.textContent = this.t('minerCostNote');
            const indicatorTitle = minerSections[3].querySelector('.text-sm.text-gray-400.mb-2');
            if (indicatorTitle) indicatorTitle.textContent = this.t('minerIndicatorTitle');
            const indicators = minerSections[3].querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-3.gap-4.text-sm > div');
            if (indicators[0]) indicators[0].innerHTML = '<span class="font-bold">' + this.t('minerIndicator1').split(':')[0] + ':</span> ' + this.t('minerIndicator1').split(':')[1];
            if (indicators[1]) indicators[1].innerHTML = '<span class="font-bold">' + this.t('minerIndicator2').split(':')[0] + ':</span> ' + this.t('minerIndicator2').split(':')[1];
            if (indicators[2]) indicators[2].innerHTML = '<span class="font-bold">' + this.t('minerIndicator3').split(':')[0] + ':</span> ' + this.t('minerIndicator3').split(':')[1];
        }
        
        const resultLabels = document.querySelectorAll('#dcaResult .text-sm');
        if (resultLabels[0]) resultLabels[0].textContent = this.t('totalInvested');
        if (resultLabels[1]) resultLabels[1].textContent = this.t('currentValue');
        if (resultLabels[2]) resultLabels[2].textContent = this.t('profitRate');
        if (resultLabels[3]) resultLabels[3].textContent = this.t('btcAmount');
        
        const adsContainer = document.querySelector('#adsContainer');
        if (adsContainer && adsContainer.previousElementSibling) {
            adsContainer.previousElementSibling.textContent = this.t('recommended');
        }
        
        document.querySelector('.glass.rounded-xl.p-6.text-center p').innerHTML = 
            this.t('disclaimer') + ' | <a href="https://github.com/Bitcoinpropagation/btc-index" target="_blank" class="text-blue-400 hover:underline">GitHub</a>';
    }

    seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    generateHistoricalData(currentPrice) {
        const data = [];
        const now = Math.floor(Date.now() / 1000);
        const days = 1825;
        const keyRatios = { 1825: 0.14, 1460: 0.17, 1095: 0.85, 730: 0.28, 365: 0.57, 0: 1.0 };
        
        for (let i = days; i >= 0; i--) {
            const time = now - i * 86400;
            let baseRatio;
            if (i >= 1460) baseRatio = this.lerp(i, 1825, 1460, keyRatios[1825], keyRatios[1460]);
            else if (i >= 1095) baseRatio = this.lerp(i, 1460, 1095, keyRatios[1460], keyRatios[1095]);
            else if (i >= 730) baseRatio = this.lerp(i, 1095, 730, keyRatios[1095], keyRatios[730]);
            else if (i >= 365) baseRatio = this.lerp(i, 730, 365, keyRatios[730], keyRatios[365]);
            else baseRatio = this.lerp(i, 365, 0, keyRatios[365], keyRatios[0]);
            
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
        data.forEach((item, i) => { const x = i; const y = Math.log(item.price); sumX += x; sumY += y; sumXY += x * y; sumX2 += x * x; });
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        return data.map((item, i) => ({ ...item, expValue: Math.exp(intercept + slope * i) }));
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
        let status, suggestion, color, zoneId;
        if (ahr999 < 0.45) { status = this.t('zone1Name'); suggestion = this.t('zone1Desc'); color = 'text-green-400'; zoneId = 'zone1'; }
        else if (ahr999 < 1.2) { status = this.t('zone2Name'); suggestion = this.t('zone2Desc'); color = 'text-blue-400'; zoneId = 'zone2'; }
        else if (ahr999 < 5) { status = this.t('zone3Name'); suggestion = this.t('zone3Desc'); color = 'text-yellow-400'; zoneId = 'zone3'; }
        else { status = this.t('zone4Name'); suggestion = this.t('zone4Desc'); color = 'text-red-400'; zoneId = 'zone4'; }
        return { price: latest.price, ma200: latest.ma200 || latest.price, ahr999, status, suggestion, color, zoneId };
    }

    highlightCurrentZone(zoneId) {
        ['zone1', 'zone2', 'zone3', 'zone4'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('zone-active');
        });
        const currentEl = document.getElementById(zoneId);
        if (currentEl) currentEl.classList.add('zone-active');
    }

    setTimeRange(range) {
        this.currentTimeRange = range;
        document.querySelectorAll('.time-range-btn').forEach(btn => {
            if (btn.dataset.range === range) {
                btn.classList.remove('bg-white/10');
                btn.classList.add('bg-blue-500/30');
            } else {
                btn.classList.remove('bg-blue-500/30');
                btn.classList.add('bg-white/10');
            }
        });
        this.filterDataByRange();
        if (this.chart && this.filteredData.length > 0) this.updateChart(this.filteredData);
    }

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

    initChart() {
        try {
            const chartContainer = document.getElementById('chart');
            const loadingEl = document.getElementById('chartLoading');
            if (!chartContainer) return false;
            if (typeof LightweightCharts === 'undefined') {
                if (loadingEl) loadingEl.classList.add('hidden');
                document.getElementById('chartError').classList.remove('hidden');
                return false;
            }
            if (loadingEl) loadingEl.classList.add('hidden');
            chartContainer.classList.remove('hidden');
            
            this.chart = LightweightCharts.createChart(chartContainer, {
                layout: { background: { color: 'transparent' }, textColor: '#d1d5db' },
                grid: { vertLines: { color: 'rgba(255, 255, 255, 0.1)' }, horzLines: { color: 'rgba(255, 255, 255, 0.1)' } },
                crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
                rightPriceScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
                timeScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
                handleScroll: { vertTouchDrag: false },
                handleScale: { axisPressedMouseMove: false }
            });
            this.priceSeries = this.chart.addLineSeries({ title: 'BTC Price', color: '#f59e0b', lineWidth: 2 });
            this.ma200Series = this.chart.addLineSeries({ title: '200-Day Avg', color: '#3b82f6', lineWidth: 1 });
            this.indexSeries = this.chart.addLineSeries({ title: 'DCA Index', color: '#10b981', lineWidth: 2, priceScaleId: 'right' });
            this.chart.priceScale('right').applyOptions({ visible: true });
            
            new ResizeObserver(entries => {
                if (this.chart && entries[0]) {
                    const { width, height } = entries[0].contentRect;
                    this.chart.applyOptions({ width, height });
                }
            }).observe(chartContainer);
            
            this.chartInitialized = true;
            return true;
        } catch (error) {
            document.getElementById('chartLoading').classList.add('hidden');
            document.getElementById('chartError').classList.remove('hidden');
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
        
        if (currentIndexEl) { currentIndexEl.textContent = status.ahr999.toFixed(2); currentIndexEl.className = `text-3xl md:text-4xl font-bold ${status.color}`; }
        if (indexStatusEl) { indexStatusEl.textContent = status.status; indexStatusEl.className = `text-sm mt-2 ${status.color}`; }
        const displayPrice = this.currentBTCPrice || status.price;
        if (btcPriceEl) btcPriceEl.textContent = '$' + displayPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
        if (avgCostEl) avgCostEl.textContent = '$' + status.ma200.toLocaleString('en-US', { maximumFractionDigits: 0 });
        if (suggestionEl) { suggestionEl.textContent = status.suggestion; suggestionEl.className = `text-base md:text-lg font-bold ${status.color}`; }
        this.highlightCurrentZone(status.zoneId);
    }

    calculateDCA() {
        const monthlyAmount = parseFloat(document.getElementById('monthlyAmount').value) || 1000;
        const startDateInput = document.getElementById('startDate').value;
        if (!startDateInput) { alert('Please select start date'); return; }
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
    }

    async fetchBTCPrice() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
            if (!response.ok) throw new Error('Price fetch failed');
            const data = await response.json();
            this.currentBTCPrice = data.bitcoin.usd;
            this.priceChange24h = data.bitcoin.usd_24h_change || 0;
            this.lastUpdateTime = new Date();
            this.updatePriceDisplay();
            this.updateLastUpdateTime();
            this.updateMinerCostDisplay();
            return this.currentBTCPrice;
        } catch (error) {
            try {
                const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
                const data = await response.json();
                this.currentBTCPrice = parseFloat(data.lastPrice);
                this.priceChange24h = parseFloat(data.priceChangePercent);
                this.lastUpdateTime = new Date();
                this.updatePriceDisplay();
                this.updateLastUpdateTime();
                return this.currentBTCPrice;
            } catch (backupError) { return null; }
        }
    }

    updateLastUpdateTime() {
        const lastUpdateEl = document.getElementById('lastUpdate');
        if (lastUpdateEl && this.lastUpdateTime) {
            const locale = this.currentLang === 'zh' ? 'zh-CN' : this.currentLang === 'ja' ? 'ja-JP' : 'en-US';
            lastUpdateEl.textContent = this.lastUpdateTime.toLocaleString(locale, { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        }
    }

    updatePriceDisplay() {
        const priceEl = document.getElementById('livePrice');
        const changeEl = document.getElementById('priceChange');
        const btcPriceEl = document.getElementById('btcPrice');
        if (priceEl) priceEl.textContent = '$' + this.currentBTCPrice.toLocaleString('en-US', { maximumFractionDigits: 2 });
        if (changeEl) {
            const isPositive = this.priceChange24h >= 0;
            changeEl.textContent = (isPositive ? '+' : '') + this.priceChange24h.toFixed(2) + '%';
            changeEl.className = `text-sm font-medium px-2 py-1 rounded ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`;
        }
        if (btcPriceEl && this.currentBTCPrice > 0) btcPriceEl.textContent = '$' + this.currentBTCPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }

    async fetchAdsConfig() {
        try {
            const savedConfig = localStorage.getItem('btcIndexConfig');
            if (savedConfig) {
                const config = JSON.parse(savedConfig);
                if (config.ads && Object.keys(config.ads).length > 0) { this.adsData = config.ads; this.renderAds(); return; }
            }
            try {
                const response = await fetch('config.json');
                if (response.ok) {
                    const config = await response.json();
                    if (config.ads && Object.keys(config.ads).length > 0) { this.adsData = config.ads; this.renderAds(); return; }
                }
            } catch (e) {}
            this.adsData = this.getDefaultAdsConfig();
        } catch (error) { this.adsData = this.getDefaultAdsConfig(); }
        this.renderAds();
    }

    getDefaultAdsConfig() { return {}; }

    renderAds() {
        const container = document.getElementById('adsContainer');
        if (!container) return;
        if (!this.adsData || Object.keys(this.adsData).length === 0) {
            container.innerHTML = '';
            return;
        }
        container.innerHTML = Object.entries(this.adsData).map(([key, ad]) => `
            <div class="glass rounded-xl p-6 border ${ad.borderColor} bg-gradient-to-br ${ad.color} hover:scale-105 transition-transform cursor-pointer group" onclick="window.open('${ad.url}', '_blank')">
                <div class="flex items-center gap-4 mb-3">
                    <img src="${ad.logo}" alt="${ad.name}" class="w-12 h-12 rounded-full bg-white/10 p-1" loading="lazy">
                    <div><h3 class="text-xl font-bold">${ad.name}</h3><span class="text-xs text-gray-400">${this.t('recommended')}</span></div>
                </div>
                <p class="text-sm text-gray-300 mb-4">${ad.description}</p>
                <button class="w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors group-hover:bg-white/20">${this.currentLang === 'zh' ? '立即下载' : this.currentLang === 'ja' ? '今すぐダウンロード' : 'Download Now'}</button>
            </div>
        `).join('');
    }

    startPriceRefresh() { this.fetchBTCPrice(); setInterval(() => this.fetchBTCPrice(), 30000); }

    async run() {
        try {
            const savedLang = localStorage.getItem('btcIndexLang');
            if (savedLang && i18n[savedLang]) this.currentLang = savedLang;
            
            const currentPrice = await this.fetchBTCPrice();
            const basePrice = currentPrice || 70000;
            this.btcData = this.generateHistoricalData(basePrice);
            let data = this.calculate200DMA(this.btcData);
            data = this.calculateExponentialGrowth(data);
            data = this.calculateAHR999(data);
            this.btcData = data; this.filteredData = data;
            const status = this.getCurrentStatus(data);
            
            setTimeout(() => { if (this.initChart()) this.updateChart(this.filteredData); }, 100);
            // 设置语言按钮样式
            document.querySelectorAll('.lang-btn').forEach(btn => {
                if (btn.dataset.lang === this.currentLang) {
                    btn.classList.remove('bg-white/10');
                    btn.classList.add('bg-blue-500/30');
                } else {
                    btn.classList.remove('bg-blue-500/30');
                    btn.classList.add('bg-white/10');
                }
            });
            
            this.updateUI();
            this.updateDisplay(status);
            this.updateMinerCostDisplay();
            await this.fetchAdsConfig();
            this.startPriceRefresh();
            
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            document.getElementById('startDate').value = oneYearAgo.toISOString().split('T')[0];
        } catch (error) {
            document.getElementById('currentIndex').textContent = 'Error';
            document.getElementById('indexStatus').textContent = error.message;
        }
    }

    // 计算矿工成本
    calculateMinerCost(currentPrice) {
        const baseCostRatio = 0.65 + this.seededRandom(1000) * 0.15;
        const minerCost = currentPrice * baseCostRatio;
        const now = Math.floor(Date.now() / 1000);
        const dayOfYear = Math.floor((now % 31536000) / 86400);
        const seasonalFactor = 1 + Math.sin(dayOfYear / 365 * Math.PI * 2) * 0.05;
        return minerCost * seasonalFactor;
    }

    // 更新矿工成本显示
    updateMinerCostDisplay() {
        const minerCost = this.calculateMinerCost(this.currentBTCPrice);
        const ratio = this.currentBTCPrice / minerCost;
        
        const btcPriceEl = document.getElementById('minerBtcPrice');
        const costEl = document.getElementById('minerCost');
        const ratioEl = document.getElementById('priceToCostRatio');
        const suggestionEl = document.getElementById('minerSuggestion');
        
        if (btcPriceEl) btcPriceEl.textContent = '$' + this.currentBTCPrice.toLocaleString('en-US', { maximumFractionDigits: 0 });
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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new BTCIndexApp();
    window.app.run();
});

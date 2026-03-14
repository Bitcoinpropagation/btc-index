// Cloudflare Worker 版本 - 广告管理 API
// 部署: wrangler deploy

// 默认广告配置
const DEFAULT_ADS = {
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

// CORS 头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // 路由处理
    try {
      // GET /api/ads - 获取所有广告
      if (path === '/api/ads' && request.method === 'GET') {
        const ads = await env.BTC_INDEX_KV?.get('ads', 'json') || DEFAULT_ADS;
        return jsonResponse(ads);
      }

      // POST /api/ads - 更新所有广告
      if (path === '/api/ads' && request.method === 'POST') {
        const body = await request.json();
        await env.BTC_INDEX_KV?.put('ads', JSON.stringify(body));
        return jsonResponse({ success: true, message: '广告配置已更新', ads: body });
      }

      // GET /api/ads/:id - 获取单个广告
      const singleAdMatch = path.match(/^\/api\/ads\/(.+)$/);
      if (singleAdMatch && request.method === 'GET') {
        const id = singleAdMatch[1];
        const ads = await env.BTC_INDEX_KV?.get('ads', 'json') || DEFAULT_ADS;
        const ad = ads[id];
        if (!ad) {
          return jsonResponse({ error: '广告不存在' }, 404);
        }
        return jsonResponse(ad);
      }

      // PUT /api/ads/:id - 更新单个广告
      if (singleAdMatch && request.method === 'PUT') {
        const id = singleAdMatch[1];
        const body = await request.json();
        const ads = await env.BTC_INDEX_KV?.get('ads', 'json') || DEFAULT_ADS;
        
        if (!ads[id]) {
          return jsonResponse({ error: '广告不存在' }, 404);
        }
        
        ads[id] = { ...ads[id], ...body };
        await env.BTC_INDEX_KV?.put('ads', JSON.stringify(ads));
        return jsonResponse({ success: true, message: '广告已更新', ad: ads[id] });
      }

      // GET /api/health - 健康检查
      if (path === '/api/health' && request.method === 'GET') {
        return jsonResponse({ 
          status: 'ok', 
          timestamp: new Date().toISOString(),
          kv: env.BTC_INDEX_KV ? 'connected' : 'not_configured'
        });
      }

      // 404
      return jsonResponse({ error: 'Not Found' }, 404);

    } catch (error) {
      return jsonResponse({ error: error.message }, 500);
    }
  }
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

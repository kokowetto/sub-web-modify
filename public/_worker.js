export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 如果请求路径以 /sub 开头，说明是转换后端的请求
    if (url.pathname.startsWith('/sub')) {
      // 我们把请求悄悄转发给真正稳定的后端 (这里借用 cmliu 的纯后端或 xeton)
      const targetUrl = new URL(request.url);
      targetUrl.hostname = 'subapi.cmliussss.net'; // 你也可以换成 sub.xeton.dev
      
      // 发起请求并允许跨域，防止 edgetunnel 网页报错
      const response = await fetch(new Request(targetUrl.toString(), request));
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      return newResponse;
    }
    
    // 如果不是 /sub，就正常展示你的网页前端
    return env.ASSETS.fetch(request);
  }
};

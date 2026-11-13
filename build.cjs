const fs=require('fs');
const crypto=require('crypto');
const assets={};
for(const [file,type] of [['index.html','text/html; charset=utf-8'],['events.json','application/json; charset=utf-8'],['uae-holidays-zh-2026-2030.ics','text/calendar; charset=utf-8']]){
 const body=fs.readFileSync('public/'+file,'utf8');
 assets['/'+file]={body,type,etag:'"'+crypto.createHash('sha256').update(body).digest('hex')+'"'};
}
const code='const assets='+JSON.stringify(assets)+';\n'+`
export default {
 async fetch(request) {
  const url=new URL(request.url);
  const pathname=url.pathname==='/'?'/index.html':url.pathname;
  const asset=assets[pathname];
  if(!asset)return new Response('未找到此文件',{status:404,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  const headers={'Content-Type':asset.type,'Cache-Control':'public, max-age=3600','ETag':asset.etag,'Access-Control-Allow-Origin':'*','X-Content-Type-Options':'nosniff'};
  if(pathname.endsWith('.ics'))headers['Content-Disposition']='inline; filename="uae-holidays-zh-2026-2030.ics"';
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'GET, HEAD, OPTIONS'}});
  if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD, OPTIONS'}});
  if(request.headers.get('If-None-Match')===asset.etag)return new Response(null,{status:304,headers});
  return new Response(request.method==='HEAD'?null:asset.body,{headers});
 }
};\n`;
for(const dir of ['worker','dist/server','dist/.openai'])fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync('worker/index.js',code);
fs.writeFileSync('dist/server/index.js',code);
fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
(async()=>{
 const w=(await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'))).default;
 const r=await w.fetch(new Request('https://example.test/uae-holidays-zh-2026-2030.ics'));
 const body=await r.text();
 if(r.status!==200||r.headers.get('content-type')!=='text/calendar; charset=utf-8'||!body.startsWith('BEGIN:VCALENDAR'))throw Error('calendar endpoint validation failed');
 const homepage=await w.fetch(new Request('https://example.test/'));
 if(homepage.status!==200||!(await homepage.text()).includes('订阅到 iPhone 日历'))throw Error('homepage validation failed');
 console.log('Worker ESM validated: calendar MIME, 94 events, homepage, exact source files.');
})().catch(e=>{console.error(e);process.exitCode=1});

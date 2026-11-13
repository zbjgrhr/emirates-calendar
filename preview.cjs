const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, 'public');
http.createServer((req,res)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); return res.end(); }
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  fs.readFile(file,(error,body)=>{
    if(error){res.writeHead(404);return res.end('Not found');}
    const types={'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.ics':'text/calendar; charset=utf-8'};
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    res.end(body);
  });
}).listen(4173,'127.0.0.1',()=>console.log('本地预览：http://127.0.0.1:4173'));

const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname;
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.webp':'image/webp'};
http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
const f=path.join(root,path.normalize(p));if(!f.startsWith(root)){r.writeHead(403);return r.end();}
fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end('not found');}r.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});r.end(d);});
}).listen(8765,'127.0.0.1');

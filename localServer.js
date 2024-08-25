const http=require('http');
const server=http.createServer((request,response)=>
{
    console.log(request.method,response.url);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Handling request');
    response.end();
});
server.listen(4000,()=>
{
    console.log('Node.js');
});
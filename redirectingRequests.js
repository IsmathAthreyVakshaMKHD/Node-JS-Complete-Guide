const http=require('http');
const fs=require('fs');
const server=http.createServer((request,response)=>
{
    const url=request.url;
    const method=request.method;
    if(url==='/')
    {
        response.write('<html>');
        response.write('<head><title>Node.Js page</title></head>');
        response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></input></form></body>');
        response.write('</html>');
        return response.end();
    }
    if(url==='/message'&&method==='POST')
    {
        fs.writeFileSync('message.txt','sampleInputText');
        response.statusCode=302;
        response.setHeader('Location','/');
        return response.end();
    }
    response.setHeader('Content-Type','text/html');
    response.write('<html>');
    response.write('<head><title>Node.js page</title></head>');
    response.write('<body><h1>Welcome to my Node Js project</h1></body>');
    response.write('</html>');
    response.end();
})
server.listen(3000);
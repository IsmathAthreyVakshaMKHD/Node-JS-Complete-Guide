const http=require('http');
const server=http.createServer((request,response)=>
{
    console.log(request.url,request.method,request.headers);
    response.setHeader('Content-Type','text/html');
    response.write('<html>');
    response.write('<head><title>Node.js page</title></head>');
    response.write('<body>');
    const url=request.url;
    if(url==='/home')
    {
        response.write('<h1>Welcome home</h1>');
    }
    else if(url==='/about')
    {
        response.write('<h1>Welcome to About Us page</h1>');
    }
    else if(url==='/node')
    {
        response.write('<h1>Welcome to my Node Js project</h1>');
    }
    response.write('</body>');
    response.write('</html>');
    response.end();
    //To hard exit the event loop
    //process.exit();
})
server.listen(4000);
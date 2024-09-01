const fs=require('fs');

const requestHandler=(request,response)=> {
    const url=request.url;
    const method=request.method;
    if(url==='/')
    {
        let chatMessage='undefined';
        if(fs.existsSync('message.txt'))
        {
            chatMessage=fs.readFileSync('message.txt','utf8');
        }
        response.write('<html>');
        response.write('<head><title>Node.Js page</title></head>');
        response.write(`<body><p>${chatMessage}</p><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></input></form></body>`);
        response.write('</html>');
        return response.end();
    }
    if(url==='/message'&&method==='POST')
    {
        const body=[];
        request.on('data',(chunk)=>
        {
            body.push(chunk);
        });
        request.on('end',()=>
        {
            const parsedBody=Buffer.concat(body).toString();
            const inputMessage=parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',inputMessage);
            
        });
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
}

module.exports=requestHandler;

// module.exports={
//     handler:requestHandler,
//     someText:'Some Hard Coded Text'
// };

// module.exports.handler=requestHandler;
// module.exports.someText="Some Hard Coded Text";

// exports.handler=requestHandler;
// exports.someText="Some Hard Coded Text";
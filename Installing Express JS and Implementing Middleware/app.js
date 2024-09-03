const express= require('express');

const app= express();

app.use((request,response,next)=>
{
    console.log("1'st Middleware",request.url);
    next();
})

app.use((request,response,next)=>
{
    console.log("2'nd Middleware",request.url);
    response.send('<h1>Response from Express JS</h1>');
})

app.listen(3000);

// Using express in http

// const http= require('http');

// const express=require('express');

// const appFunc=express();

// appFunc.use((request,response,next)=>
// {
//     console.log("1'st Middleware",request.url);
//     next();
// })

// appFunc.use((request,response,next)=>
// {
//     console.log("2'nd Middleware",request.url);
//     response.send('<h1>Response from Express JS</h1>');
// })

// const server=http.createServer(appFunc);

// server.listen(3000);
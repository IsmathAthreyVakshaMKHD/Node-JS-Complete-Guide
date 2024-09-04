const express= require('express');

const bodyParser= require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use('/add-product',(request,response,next)=>
{
    response.send('<form action="/product" method="POST"><input type="text" name="product Title"/><input type="number" name="product Size"/><button type="submit">Add product</button></form>');
});
app.use('/product',(request,response,next)=>
{
    console.log(request.body);
    response.redirect('/');
});
app.use('/',(request,response,next)=>
{
    response.send('<h1>Middlewares tunneling</h1>');
});
app.listen(3000);
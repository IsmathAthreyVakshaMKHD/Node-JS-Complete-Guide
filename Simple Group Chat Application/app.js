const express=require('express');
const app=express();
const fs=require('fs');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
//Step 1 Login form
app.use('/login',(request,response,next)=>
{
    //response.send('<form action="/" method="POST"><input type="text" id="userName" name ="userName" placeHolder="username"><br><button type="submit">Login</button></input></form>');
    response.send(`
        <form action="/" method="POST" onsubmit="saveUserName()">
            <input type="text" id="userName" name ="userName" placeHolder="username"><br>
            <button type="submit">Login</button></input>
        </form>
        <script>
            function saveUserName()
            {
                const loginName=document.getElementById('userName').value;
                localStorage.setItem('username',loginName);
            }
        </script>
        `);
})
app.post('/',(request,response,next)=>
{
    //console.log(request.body);
    const chatMessage=request.body.userMessage|| '';
    const user=request.body.userName;
    console.log(user);
    // Step 2 Creating a file for the first time if there is no previous chat
    if(fs.stat('chatApplicationData.txt', (err)=>
    {
        if(err && err.code=='ENOENT')
        {
            fs.writeFile('chatApplicationData.txt','',(writeErr)=>
            {
                if(writeErr) throw writeErr;

                //chatMessage=fs.readFile(user,'utf8');
                response.send(`<body><p>"No chats exists"</p><form action="/" method="POST"><input type="hidden" id="userName" name="userName" value=${user} /><input type="text" id="userMessage" name="userMessage"><br><button type="submit">send</button></input></form>`);
            });
        } 
        else
        {
            //Step 4 Adding the message to the file data
            if(chatMessage)
            {
                fs.appendFile('chatApplicationData.txt',`${user}: ${chatMessage}`,appendErr=>
                {
                    if(appendErr) throw appendErr;

                    fs.readFile('chatApplicationData.txt','utf8',(readErr,data)=>
                    {
                        if(readErr) throw readErr;
                        
                        response.send(`<body><p>${data}</p><form action="/" method="POST"><input type="hidden" id="userName" name="userName" value=${user} /><input type="text" id="userMessage" name="userMessage"><br><button type="submit">send</button></input></form>`);
                    })
                })
            }
            //Step 3 Entering message using form
            else
            {
                fs.readFile('chatApplicationData.txt','utf8',(readErr,data)=>
                {
                    if(readErr) throw readErr;
                    
                    response.send(`<body><p>${data}</p><form action="/" method="POST"><input type="hidden" id="userName" name="userName" value=${user} /><input type="text" id="userMessage" name="userMessage"><br><button type="submit">send</button></input></form>`);
                }
            )}
        }
    }
    ))
    response.send('<h1>Parsed</h1>');
})

app.listen(3000);
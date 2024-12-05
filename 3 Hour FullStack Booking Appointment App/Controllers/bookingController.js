const path=require('path');
const rootDir=require('../utilPath/pathFile');
const fs=require('fs');
const bookingClass=require('../Model/bookingModel');
exports.getUser= async (request,response,next)=>{
    try{
        const fetchedUsers= await bookingClass.findAll();
        const templete= await fs.promises.readFile(path.join(rootDir,'Views','booking.html'),'utf-8');
        let userHtml='';
            fetchedUsers.forEach(currentUser=>{
                userHtml+=`
                <li>
                    ${currentUser.username} - ${currentUser.emailid}
                        <form action="/admin/edit-user/${currentUser.id}" method="GET" style="display:inline">
                            <input type="hidden" name="edit" value="true">
                            <button type="submit" class="btn">edit</button>
                        </form>
                        <form action="/admin/delete-user" method="POST" style="display:inline">
                            <input type="hidden" name="deleteId" value="${currentUser.id}">
                            <button type="submit" class="btn">delete</button>
                        </form>
                </li>
                `;
            });
        const fullUserHtml=templete.replace('<!--USERS PLACEHOLDER-->',userHtml);
        response.send(fullUserHtml);
    }
    catch(err){
        console.log("getUser findAll err=>",err);
        response.status(500).send("Server Error");
    }
};
exports.postUser= async (request,response,next)=>{
    const{username,phonenumber,emailid}=request.body;
    try{
        await bookingClass.create({
            username:username,
            phonenumber:phonenumber,
            emailid:emailid
        })
        console.log("Appointment Booked successfully");
        response.redirect('/admin/book-appointment');
    }
    catch(err){
        console.log("postUser err=>",err);
        response.status(500).send('Server Error')
    }
}
exports.postDeleteUser= async (request,response,next)=>{
    const bookingId=request.body.deleteId;
    try{
        const fetchedAppointment= await bookingClass.findByPk(bookingId);
        if(fetchedAppointment){
            fetchedAppointment.destroy();
            console.log('Appointment destroyed successfully');
        }
        else{
            console.log('Appointment not found');
        }
        response.redirect('/admin/book-appointment');
    }
    catch(err){
        console.log('postDeleteAppointment err=>',err);
        response.status(500).send('Server error');
    }
}
exports.editUser= async (request,response,next)=>{
    const editMode=request.query.edit;
    if(!editMode){
        console.log('editMode =>',editMode);
        return response.redirect('/admin/book-appointment');
    }
    const fetchedId=request.params.userId;
    try{
        const currentUser= await bookingClass.findByPk(fetchedId);
        if(!currentUser){
            console.log('User not found');
            return response.redirect('/admin/book-appointment');
        }
        const templete= await fs.promises.readFile(path.join(rootDir,'Views','booking.html'),'utf-8');
        let modifiedUserHtml=templete
            .replace('<form action="/admin/book-appointment" method="POST">',
            `<form action="/admin/edit-user/${currentUser.id}"  method="POST">`)
            .replace('<input type="text" name="username" id="username">',
            `<input type="text" name="username" id="username" value="${currentUser.username}">`)
            .replace('<input type="number" name="phonenumber" id="phonenumber">',
            `<input type="number" name="phonenumber" id="phonenumber" value="${currentUser.phonenumber}">`)
            .replace('<input type="email" name="emailid" id="emailid">',
                `<input type="email" name="emailid" id="emailid" value="${currentUser.emailid}">`)
        response.send(modifiedUserHtml);
    }
    catch(err){
        console.log('editUser findByPk error=>',err);
        response.status(500).send("Server error");
    }
}
exports.postEditUser= async (request,response,next)=>{
    try{
        const updating= await bookingClass.findByPk(request.params.userId);
        if(updating){
            updating.username=request.body.username;
            updating.phonenumber=request.body.phonenumber;
            updating.emailid=request.body.emailid;
            await updating.save();
            console.log('User updated successfully');
        }
        else{
            console.log('User not found');
        }
        response.redirect('/admin/book-appointment');
    }
    catch(err){
        console.log('postEditUser err=>',err);
        response.status(500).send('Server error');
    }
}
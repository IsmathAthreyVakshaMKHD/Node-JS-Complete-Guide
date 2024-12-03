const path=require('path');
const rootDir=require('../utilPath/pathFile');
const fs=require('fs');
const bookingClass=require('../Model/bookingModel');
exports.getUser=((request,response,next)=>{
    //response.sendFile(path.join(rootDir,'Views','booking.html'));
    bookingClass.findAll()
    .then((fetchedUsers)=>{
        fs.readFile(path.join(rootDir,'Views','booking.html'),'utf-8',(error,templete)=>{
            if(error){
                console.log("error reading booking.html templete from bookingController getUser =>",error);
                return response.status(500).send("Server Error");
            }
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
        });
    })
    .catch(err=>{
        console.log("getUser findAll err=>",err);
        response.status(500).send("Server Error");
    });
});
exports.postUser=(request,response,next)=>{
    const{username,phonenumber,emailid}=request.body;
    bookingClass.create({
        username:username,
        phonenumber:phonenumber,
        emailid:emailid
    })
    .then(()=>{
        console.log("Appointment Booked successfully");
        response.redirect('/admin/book-appointment');
    })
    .catch(err=>{
        console.log("PostAppointment err=>",err);
    });
}
exports.postDeleteUser=(request,response,next)=>{
    const bookingId=request.body.deleteId;
    // console.log('Booking Id =>',bookingId);
    bookingClass.findByPk(bookingId)
    .then(fetchedAppointment=>{
        return fetchedAppointment.destroy();
    })
    .then(()=>{
        console.log('Appointment destroyed successfully');
        response.redirect('/admin/book-appointment');
    })
    .catch(err=>{
        console.log('postDeleteAppointment err=>',err);
    })
}
exports.editUser=(request,response,next)=>{
    // console.log('Here in editUser method');
    const editMode=request.query.edit;
    if(!editMode){
        console.log('editMode =>',editMode);
        return response.redirect('/admin/book-appointment');
    }
    const fetchedId=request.params.userId;
    bookingClass.findByPk(fetchedId)
    .then(currentUser=>{
        if(!currentUser){
            console.log('User not found');
            return response.redirect('/admin/book-appointment');
        }
        fs.readFile(path.join(rootDir,'Views','booking.html'),'utf-8',(error,templete)=>{
            if(error){
                console.log('error reading booking.html file templete',error);
                return response.status(500).send('Server error');
            }
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
        });
    })
    .catch(err=>{
        console.log('editUser  findByPk error=>',err);
        response.status(500).send("Server error");
    });
}
exports.postEditUser=(request,response,next)=>{
    // console.log('postEditUser id=>',request.params.userId);
    // console.log('username',request.body.username);
    // console.log('phonenumber',request.body.phonenumber);
    // console.log('emailid',request.body.emailid);
    bookingClass.findByPk(request.params.userId)
    .then(updating=>{
        updating.username=request.body.username;
        updating.phonenumber=request.body.phonenumber;
        updating.emailid=request.body.emailid;
        return updating.save();
    })
    .then(()=>{
        console.log('User updated successfully');
        response.redirect('/admin/book-appointment');
    })
    .catch(err=>{
        console.log('postEditUser err=>',err);
    })
   
}
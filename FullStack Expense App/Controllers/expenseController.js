const path=require("path");
const rootDir=require("../utilPath/pathFile");
const expenseClass=require("../Models/expenseModel");
const fs=require("fs");
exports.getExpense= async (request,response,next) => {
    try{
        const fetchedExpense=await expenseClass.findAll();
        const templete=await fs.promises.readFile(path.join(rootDir,'Views','expenseTracker.html'),'utf-8');
        let expenseHtml='';
        fetchedExpense.forEach(currentExpense=>
        {
            expenseHtml+=`
            <li>
                ${currentExpense.chooseExpenseAmount} - ${currentExpense.chooseACategory} - ${currentExpense.chooseDescription}
                    <form action="/admin/edit-expense/${currentExpense.id}" method="GET" style="display:inline">
                        <input type="hidden" name="edit" value="true">
                        <button type="submit" class="btn">edit</button>
                    </form>
                    <form action="/admin/delete-expense" method="POST" style="display:inline">
                        <input type="hidden" name="deleteId" value="${currentExpense.id}">
                        <button type="submit" class="btn">delete</button>
                    </form>
            </li>
            `;
        });
        const fullExpenseHtml=templete.replace('<!--EXPENSE PLACEHOLDER-->',expenseHtml);
        response.send(fullExpenseHtml);
    }
    catch(err){
        console.log("getExpense findAll err=>",err);
        response.status(500).send('Server Error');
    }
}
exports.postExpense= async (request,response,next) =>{
    const{chooseExpenseAmount,chooseDescription,chooseACategory}=request.body;
    try{
        await expenseClass.create({
            chooseExpenseAmount:chooseExpenseAmount,
            chooseDescription:chooseDescription,
            chooseACategory:chooseACategory
        })
        console.log("expense posted successfully");
        response.redirect("/admin/expense-tracker");
    }
    catch(err){
        console.log("postExpense err=>",err);
        response.status(500).send("Server error");
    }
}
exports.postDeleteExpense= async (request,response,next)=>{
    const fetchedId=request.body.deleteId;
    try{
        const currentExpense=await expenseClass.findByPk(fetchedId);
        if(currentExpense){
            await currentExpense.destroy();
            console.log("expense destroyed successfully");
        }
        else{
            console.log("expense not found");
        }
        response.redirect("/admin/expense-tracker");
    }
    catch(err){
        console.log("postDeleteExpense error=>",err);
        response.status(500).send("Server Error");
    }
}
exports.editExpense= async (request,response,next)=>{
    const editMode=request.query.edit;
    if(!editMode){
        console.log("editMode=>",editMode);
        return response.redirect("/admin/expense-tracker");
    }
    const fetchedId=request.params.editId;
    try{
        const currentExpense=await expenseClass.findByPk(fetchedId);
        if(!currentExpense){
            console.log('expense not found');
            return response.redirect("/admin/expense-tracker");
        }
        const templete=await fs.promises.readFile(path.join(rootDir,"Views","expenseTracker.html"),'utf-8');
        let modifiedExpenseHtml=templete
        .replace('<form action="/admin/expense-tracker" method="POST">',
        `<form action="/admin/edit-expense/${currentExpense.id}" method="POST">`)
        .replace('<input type="text" id="chooseExpenseAmount" name="chooseExpenseAmount">',
        `<input type="text" id="chooseExpenseAmount" name="chooseExpenseAmount" value="${currentExpense.chooseExpenseAmount}">`)
        .replace('<input type="text" id="chooseDescription" name="chooseDescription">',
        `<input type="text" id="chooseDescription" name="chooseDescription" value="${currentExpense.chooseDescription}">`)
        .replace(`<select id="chooseACategory" name="chooseACategory">
            <option value="food">Food</option>
            <option value="fuel">Fuel</option>
            <option value="electricity">Electricity</option>
            <option value="movie">Movie</option>
            </select>`,
            `<select id="chooseACategory" name="chooseACategory">
            <option value="food" ${currentExpense.chooseACategory==="food"?"selected":""}>Food</option>
            <option value="fuel" ${currentExpense.chooseACategory==="fuel"?"selected":""}>Fuel</option>
            <option value="electricity" ${currentExpense.chooseACategory==="electricity"?"selected":""}>Electricity</option>
            <option value="movie" ${currentExpense.chooseACategory==="movie"?"selected":""}>Movie</option>
            </select>`)
            response.send(modifiedExpenseHtml);
    }
    catch(err){
        console.log("editExpense findByPk error =>",err);
        response.status(500).send("Server Error");
    }
}
exports.postEditExpense= async (request, response,next)=> {
    const fetchedId=request.params.editId;
    try{
        const updating=await expenseClass.findByPk(fetchedId);
        if(updating){
            updating.chooseExpenseAmount=request.body.chooseExpenseAmount;
            updating.chooseDescription=request.body.chooseDescription;
            updating.chooseACategory=request.body.chooseACategory;
            await updating.save();
            console.log('expense edited successfully');
        }
        else{
            console.log('expense not found');
        }
        response.redirect('/admin/expense-tracker');
    }
    catch(err){
        console.log("postEditExpense err=>",err);
        response.status(500).send('Server Error');
    }
}
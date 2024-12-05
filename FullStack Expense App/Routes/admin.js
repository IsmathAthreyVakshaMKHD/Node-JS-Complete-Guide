const express=require('express');
const router=express.Router();
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const expenseController=require("../Controllers/expenseController");
router.get('/expense-tracker',expenseController.getExpense);
router.post('/expense-tracker',expenseController.postExpense);
router.get('/edit-expense/:editId',expenseController.editExpense);
router.post('/edit-expense/:editId',expenseController.postEditExpense);
router.post('/delete-expense',expenseController.postDeleteExpense);
module.exports=router;


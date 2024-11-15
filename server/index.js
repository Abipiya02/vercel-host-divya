const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const empModel=require('./model/employeeModel')
const employeeModel = require('./model/employeeModel')

const app=express()

app.use(express.json())



const allowedOrigins = ['https://front-end-hosting-wine.vercel.app/']; // Add the exact origin here

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
mongoose.connect('mongodb+srv://atchayaangusamy:dI6fmH3nNhpd5C0a@project.t2opm.mongodb.net/mydb')
app.get('/',(req,res)=>{
    res.send('hello')
})
app.get('/login',(req,res)=>{
    res.send('login')
})
app.post('/register',(req,res)=>{
    empModel.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err=>console.log(err))

})

app.post('/login',(req,res)=>{
    const{email,password}=req.body;
    employeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json('success')
            }
            else{
                res.json('password is incorrect')
            }
        }
        else{
            res.json('no records')
        }
    })
})

app.listen(process.env.PORT || 3001,()=>{
    console.log('server is running');
    
})
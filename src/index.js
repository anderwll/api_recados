import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

let users = []
let messages = []

let nextUserId = 1 

let nextMessageId = 1 

//------- TEST----

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to this application');
})

//------- SIGNUP----

app.post('/signup',(req,res)=>{
    const {name, email , password} = req.body

    
    if(!name){
        res.status(400).json({
            message: 'Please verify if you pass a valid name'
        })
    }

    if(!email){
        res.status(400).json({
            message: 'Please verify if you pass a valid  email adress'
        })
    }

    if(!password){
        res.status(400).json({
            message: 'Please verify if you pass a valid  password'
        })
    }
 
    const newUser = {
        id: nextUserId, 
        name: name,
        email: email,
        password: password
    }

    users.push(newUser)

    nextUserId ++

    res.status(201).json({
        sucess: true,
        message: ' User registered successfully'
    })
    
}) 

//--------- LOGIN -------- 

app.post('/login',(req,res)=>{
    const{email, password} = req.body 

    if(!email){
        return res.status(400).json({
            message: 'Send a valid email'
        })
    }

    if(!password){
        return res.status(400).json({
            message: 'Send a valid password'
        })
    }


    const userVerify = users.find(user => user.email === email) 

    if(!userVerify){
        return res.status(400).json({
            message: 'This email does not exist in database'
        })
    }

    res.status(200).json({
        message: "Welcome! You have successfully in tour login",
        email
    })

})

//--------- GET USERS -------- 

app.get('/users',(req,res)=>{
    res.status(200).json({
        sucess: true,
        users
    })
})

//---------- CREATE MASSAGE ----- 

app.post('/massage',(req,res)=>{
    const {email,title,description} = req.body
    
    const userVerify = users.find(user => user.email === email) 

    if(!userVerify){
        res.status(404).json({
            sucess: false,
            message: "Please enter a valid email to send a message"
        })
    }

    const newMesage ={
        id: nextMessageId ,
        title: title,
        description: description
    }

    nextMessageId++

    messages.push(newMesage)
    
    res.status(201).json({
        sucess: true,
        message: ' Message registered successfully'
    })

})

//------------- READ MASSAGE -------

app.get ('/massage/:email',(req, res) => {
    const email= req.params.email

    const userVerify = users.find(user => user.email === email ) 

    if(!userVerify){
        res.status(404).json({
            sucess: false,
            message: "Please enter a valid email to send a message"
        })
    }

    res.status(201).json({
        sucess: true,
        data: messages
    })

})

//------------- UPDATE MESSAGE -------

app.put('/massage/:id',(req,res)=>{
    const{title,description} = req.body
    const id = Number(req.params.id)

    const verifyMessageId = messages.find(message => message.id === id)

    if(!verifyMessageId){
        res.status(404).json({
            sucess: false,
            message: "Please enter a valid message id to send a message"
        })
    }

    const verifyMessageIndex = messages.findIndex((message)=> message.id === id)

    if(verifyMessageIndex !== -1){
        const message = messages[verifyMessageIndex]
        message.title = title
        message.description = description

        res.status(200).json({
            sucess:true,
            message: "Message update sucessfuly"
        })
        
    }else{
        return res.status(404).json({
            message: "Message not find"
        })
    }

})

//---------- DELETE MESSAGE ---------

app.delete('/massage/:id',(req,res)=>{
    const id = Number(req.params.id)

    const messageIndex = messages.findIndex((message) => message.id === id)

    if(messageIndex !== -1){
        const deletedMessage = messages.splice(messageIndex, 1)

        res.status(200).json({
            message: "Product deleted sucessfuly!",
            deletedMessage
        })
    }

    
})

//------- VERIFY----

app.listen(3333, ()=>{
    console.log("Server is running in http://localhost:3333")
})
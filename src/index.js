import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

let users = []
let recados = []

let nextUserId = 1

let nextMessageId = 1


//------- SIGNUP----

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body


    if (!name) {
        res.status(400).json({
            message: 'Por favor, insira um nome válido.'
        })
    }

    if (!email) {
        res.status(400).json({
            message: 'Por favor, insira um email válido.'
        })
    }

    if (!password) {
        res.status(400).json({
            message: 'Por favor, insira uma senha válida.'
        })
    }

    const newUser = {
        id: nextUserId,
        name: name,
        email: email,
        password: password
    }

    users.push(newUser)

    nextUserId++

    res.status(201).json({
        sucess: true,
        message: 'Usuário criado com sucesso!'
    })

})

//--------- LOGIN -------- 

app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({
            message: 'Envie um email válido.'
        })
    }

    if (!password) {
        return res.status(400).json({
            message: 'Envie uma senha válida.'
        })
    }


    const userVerify = users.find(user => user.email === email)

    if (!userVerify) {
        return res.status(400).json({
            message: 'Usuário não encontrado.'
        })
    }

    res.status(200).json({
        message: "Usuário logado com sucesso!",
        data: email
    })

})

//--------- GET USERS -------- 

app.get('/users', (req, res) => {
    res.status(200).json({
        sucess: true,
        users
    })
})

//---------- CREATE ERRAND ----- 

app.post('/recados', (req, res) => {
    const { title, description } = req.body

    const newMesage = {
        id: nextMessageId,
        title: title,
        description: description
    }

    nextMessageId++

    recados.push(newMesage)

    res.status(201).json({
        sucess: true,
        message: 'Recado criado com sucesso!'
    })

})

//------------- READ ERRAND -------

app.get('/recados', (req, res) => {
    res.status(201).json({
        sucess: true,
        message: 'Recado buscado com sucesso!',
        data: recados
    })

})

//------------- UPDATE ERRAND -------

app.put('/recados/:id', (req, res) => {
    const { title, description } = req.body
    const id = Number(req.params.id)

    const verifyMessageId = recados.find(message => message.id === id)

    if (!verifyMessageId) {
        res.status(404).json({
            sucess: false,
            message: "Recado não encontrado!"
        })
    }

    const verifyMessageIndex = recados.findIndex((message) => message.id === id)

    if (verifyMessageIndex !== -1) {
        const message = recados[verifyMessageIndex]
        message.title = title
        message.description = description

        res.status(200).json({
            sucess: true,
            message: "Recado atualizado com sucesso!"
        })

    } else {
        return res.status(404).json({
            message: "Recado não encontrado!"
        })
    }

})

//---------- DELETE ERRAND ---------

app.delete('/recados/:id', (req, res) => {
    const id = Number(req.params.id)

    const messageIndex = recados.findIndex((message) => message.id === id)

    if (messageIndex !== -1) {
        const deletedMessage = recados.splice(messageIndex, 1)

        res.status(200).json({
            message: "Recado deletado com sucesso!",
            deletedMessage
        })
    }


})

//------- DEFAULT PATH ----

app.get('/', (req, res) => {
    res.status(200).send('Bem vindo a API de recados!');
})


//------- VERIFY----

app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333")
})
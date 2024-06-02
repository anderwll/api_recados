import express from 'express';
import cors from 'cors';

import { recados, users } from './database/db.js';
import { authMiddleware } from './middlewares/auth.middleware.js';


const app = express();
app.use(express.json());
app.use(cors());


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
        id: new Date().getTime(),
        name: name,
        email: email,
        password: password
    }

    users.push(newUser)

    res.status(201).json({
        success: true,
        message: 'Usuário criado com successo!',
        data: newUser
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


    const userVerify = users.find(user => user.email === email && user.password === password)

    if (!userVerify) {
        return res.status(400).json({
            message: 'E-mail ou senha inválidos.'
        })
    }

    const data = {
        id: userVerify.id,
        name: userVerify.name,
        email: userVerify.email
    }

    res.status(200).json({
        success: true,
        message: "Usuário logado com successo!",
        data
    })

})

//--------- GET USERS -------- 

app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Usuários buscados com successo!',
        data: users
    })
})

//---------- CREATE ERRAND ----- 

app.post('/recados', authMiddleware, (req, res) => {
    const userId = Number(req.headers.authorization)
    const { title, description } = req.body

    if (!title || title.length < 2) {
        res.status(400).json({
            success: false,
            message: 'Por favor, insira um título válido.'
        })
    }

    if (!description || description.length < 2) {
        res.status(400).json({
            success: false,
            message: 'Por favor, insira uma descrição válida.'
        })
    }

    const verifyUser = users.find(user => user.id === userId)

    if (!verifyUser) {
        res.status(400).json({
            success: false,
            message: 'Usuário não encontrado.'
        })
    }

    const newErrand = {
        id: new Date().getTime(),
        title: title,
        description: description,
        userId
    }

    recados.push(newErrand)

    res.status(201).json({
        success: true,
        message: 'Recado criado com successo!',
        data: newErrand
    })

})

//------------- READ ERRAND -------

app.get('/recados', authMiddleware, (req, res) => {
    const userId = Number(req.headers.authorization)

    const recadosUser = recados.filter(recado => recado.userId === userId)

    res.status(201).json({
        success: true,
        message: 'Recado buscado com successo!',
        data: recadosUser
    })

})

//------------- UPDATE ERRAND -------

app.put('/recados/:id', authMiddleware, (req, res) => {
    const id = Number(req.params.id)
    const { title, description } = req.body

    const verifyMessageId = recados.find(r => r.id === id)

    if (!verifyMessageId) {
        res.status(404).json({
            success: false,
            message: "Recado não encontrado!"
        })
    }

    const verifyIndex = recados.findIndex((r) => r.id === id)

    if (verifyIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Recado não encontrado!"
        })
    }

    const attErrand = recados[verifyIndex]
    attErrand.title = title
    attErrand.description = description

    res.status(200).json({
        success: true,
        message: "Recado atualizado com successo!",
        data: attErrand
    })
})

//---------- DELETE ERRAND ---------

app.delete('/recados/:id', authMiddleware, (req, res) => {
    const id = Number(req.params.id)

    const verifyIndex = recados.findIndex((r) => r.id === id)

    if (verifyIndex === -1) {
        res.status(404).json({
            success: false,
            message: "Recado não encontrado!"
        })
    }

    const deletedErrand = recados.splice(verifyIndex, 1)

    res.status(200).json({
        success: true,
        message: "Recado deletado com successo!",
        data: deletedErrand
    })
})

//------- DEFAULT PATH ----

app.get('/', (req, res) => {
    res.status(200).send('Bem vindo a API de recados!');
})


//------- VERIFY----

app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333")
})
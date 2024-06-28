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
            success: false,
            message: 'Por favor, insira um nome válido.'
        })
    }

    if (!email) {
        res.status(400).json({
            success: false,
            message: 'Por favor, insira um email válido.'
        })
    }

    if (!password) {
        res.status(400).json({
            success: false,
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

    // Remove password with return
    const userReturn = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
    }

    res.status(201).json({
        success: true,
        message: 'Usuário criado com successo!',
        data: userReturn
    })

})

//--------- LOGIN -------- 

app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Envie um email válido.'
        })
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'Envie uma senha válida.'
        })
    }


    const userVerify = users.find(user => user.email === email && user.password === password)

    if (!userVerify) {
        return res.status(400).json({
            success: false,
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
    // Remove password with return
    const usersReturn = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
    }))

    res.status(200).json({
        success: true,
        message: 'Usuários buscados com successo!',
        data: usersReturn
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

    const newErrand = {
        id: new Date().getTime(),
        title: title,
        description: description,
        userId: userId
    }

    recados.push(newErrand)

    res.status(201).json({
        success: true,
        message: 'Recado criado com successo!',
        data: newErrand
    })

})

//------------- READ ERRAND -------

// localhost:3333/recados?page=1&limit=5

// localhost:3333/recados?page=8&limit=5

app.get('/recados', authMiddleware, (req, res) => {
    const userId = Number(req.headers.authorization)

    // const { page, } = req.query // = "1"
    const page = Number(req.query.page) || 1 // = 1, 2, 3, 4, 5, 6, 7, 8
    const limit = Number(req.query.limit) || 5

    const recadosFound = recados.filter(recado => recado.userId === userId)

    // recadosFound = [ recado1, recado2, recado3, recado4, recado 5 ]

    const startIndex = (page - 1) * limit // 1 - 1 = 0 * 5 = 0 || 2 - 1 = 1 * 5 = 5 
    const endIndex = page * limit  //  1 * 5 = 5 || 2 * 5 = 10  

    //    0    2 == [  0 , 1  ] // Não conta o fim 
    // slice(inicio, fim)

    const recadosPaginacao = recadosFound.slice(startIndex, endIndex)

    res.status(200).json({
        success: true,
        message: 'Recados buscado com successo!',
        data: {
            recados: recadosPaginacao,
            total: recadosFound.length
        }
    })

})

app.get('/recados/:id', authMiddleware, (req, res) => {
    const userId = Number(req.headers.authorization)
    const id = Number(req.params.id)

    const recado = recados.find(recado => recado.id === id && recado.userId === userId)

    if (!recado) {
        res.status(404).json({
            success: false,
            message: 'Recado não encontrado!'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Recado buscado com successo!',
        data: recado
    })

});

//------------- UPDATE ERRAND -------

app.put('/recados/:id', authMiddleware, (req, res) => {
    const userId = Number(req.headers.authorization)
    const id = Number(req.params.id)
    const { title, description } = req.body

    const verifyIndex = recados.findIndex((r) => r.id === id && r.userId === userId)

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
    res.status(200).send('Bem vindo a API de recados! 🚀');
})


//------- VERIFY----

app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333")
})
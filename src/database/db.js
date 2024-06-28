export let users = [{
    id: 123456789,
    name: 'Usuário Growdev',
    email: 'growdev@email.com',
    password: 'senha123'
}]

export let recadosArrayFrom = Array.from({ length: 50 }, (_, index) => {
    return {
        id: new Date().getTime(),
        title: `Recado ${index + 1}`,
        description: `${index + 1} - Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado.`,
        userId: 123456789
    }
})

export let recados = [
    {
        id: new Date().getTime(),
        title: 'Recado diferente',
        description: 'Descrição do recado diferente.',
        userId: 123456789
    },
    ...recadosArrayFrom
]

let listaDeUsuarios = []

let usuario = {
    nome: '',
    email: '',
    senha: '',
    celular: '',
    endereco: '',
}

function novoUsuario() {
    let usuario = {
        nome: document.getElementById('nomeCadastrado').value,
        email: document.getElementById('emailCadastrado').value,
        senha: document.getElementById('senhaCadastrado').value,
        endereco:document.getElementById('enderecoCadastrado').value
    }

    listaDeUsuarios.push(usuario)
    localStorage.setItem('listaDeUsuarios', listaDeUsuarios)
}

function showUsuarios() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios"))
    console.log(listaDeUsuarios)
    
}


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
        celular: document.getElementById('celularCadastrado').value
    }

    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios"))

    if (listaDeUsuarios == null) {
        listaDeUsuarios = []
        listaDeUsuarios.push(usuario)

        localStorage.setItem("listaDeUsuarios", JSON.stringify(listaDeUsuarios))
    } else {
        listaDeUsuarios.push(usuario)
        
        localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
    }

    alert('dados salvos')
}


function showUsuarios() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("listaDeUsuarios"))
    console.log(listaDeUsuarios)
    
}


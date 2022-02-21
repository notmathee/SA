let listaDeUsuarios = []
let usuarioLogado

let nomeCadastroMostrar = document.getElementById('nomeCadastroMostrar').value
let emailCadastroMostrar = document.getElementById('emailCadastroMostrar').value
let celularCadastroMostrar = document.getElementById('celularCadastroMostrar').value

let usuario = {
    nome: '',
    email: '',
    senha: '',
    celular: '',
}

let adicionarUsuario = () => {
    let usuario = {
        nome: document.getElementById('nomeCadastro').value,
        email: document.getElementById('emailCadastro').value,
        senha: document.getElementById('senhaCadastro').value,
        celular: document.getElementById('celularCadastro').value,
    }

    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))

    if (listaDeUsuarios == null) {
        listaDeUsuarios = []
    }
    if (usuario.nome == '' || usuario.email == '' || usuario.senha == '' || usuario.celular == '') {
        return alert('Todos os campos precisam ser preenchidos!')
    } else {
        emailInvalido = true
        listaDeUsuarios.forEach(usuarioCadastro => {
            if (usuarioCadastro.email == usuario.email) {
                emailInvalido = false
                alert('Este E-mail existe no cadastro.')
            }
        });
        if (emailInvalido) {
            listaDeUsuarios.push(usuario)
            localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
            alert('Dados salvos.')
        }
    }
}

let excluirUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    listaDeUsuarios.forEach(usuarioExcluir => {
        if (usuarioLogado == null) {
            return alert('Faça o login primeiro.')
        }
        if (usuarioExcluir.email == usuarioLogado) {
            indexArrayUsuario = listaDeUsuarios.indexOf(usuarioExcluir)

            listaDeUsuarios.splice(indexArrayUsuario, 1)
            usuarioLogado = null
            localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
        } else {
            alert('Faça o login primeiro.')
        }
    })
}

let logarUsuario = () => {
    let emailLogin = document.getElementById('emailLogin').value
    let senhaLogin = document.getElementById('senhaLogin').value

    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if (emailLogin == '' || senhaLogin == '') {
        return alert('Todos os campos precisam ser preenchidos!')
    }
    loginInvalido = true
    listaDeUsuarios.forEach(usuarioLogin => {
        if (usuarioLogado != null) {
            usuarioLogado = null
        }
        if (usuarioLogin.email == emailLogin && usuarioLogin.senha == senhaLogin) {
            loginInvalido = false
            usuarioLogado = emailLogin
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
            alert('Login efetuado.')
        }
    });
    if (loginInvalido) {
        alert('E-mail ou senha inválidos.')
    }
}

let logoutUsuario = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if (usuarioLogado != null) {
        usuarioLogado = null
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
        alert('Logout efetuado.')
    } else {
        alert('Você não está logado.')
    }

}

let listarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    listaDeUsuarios.forEach(listarDadosUsuario => {
        if (usuarioLogado == listarDadosUsuario.email) {
            nomeCadastroMostrar.innerText = listarDadosUsuario.nome
            emailCadastroMostrar.innerText = listarDadosUsuario.email
            celularCadastroMostrar.innerText = listarDadosUsuario.celular
        } else {
            alert('Primeiro, faça o login.')
        }
    })
}

function atualizarUsuario() {
    window.location.href = 'paginaAtualizar.html'
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    listaDeUsuarios.forEach(editarDadosUsuario => {
        if (usuarioLogado == editarDadosUsuario.email) {
            nomeCadastroMostrar = editarDadosUsuario.nome
            emailCadastroMostrar = editarDadosUsuario.email
            celularCadastroMostrar = editarDadosUsuario.celular
        }
    })
}
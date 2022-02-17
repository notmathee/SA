let listaDeUsuarios = []
let usuarioLogado = []

let nomeCadastroMostrar = JSON.parse(localStorage.getItem('usuarioLogado'))
let emailCadastroMostrar = JSON.parse(localStorage.getItem('usuarioLogado'))
let celularCadastroMostrar = JSON.parse(localStorage.getItem('usuarioLogado'))

let usuario = {
    nome: '',
    email: '',
    senha: '',
    celular: '',
    login: false,
}

let adicionarUsuario = () => {
    let usuario = {
        nome: document.getElementById('nomeCadastro').value,
        email: document.getElementById('emailCadastro').value,
        senha: document.getElementById('senhaCadastro').value,
        celular: document.getElementById('celularCadastro').value,
        login: false,
    }

    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))

    if (listaDeUsuarios == null) {
        listaDeUsuarios = []
    }
    if (usuario.nome == '' || usuario.email == '' || usuario.senha == '' || usuario.celular == '') {
        alert('Todos os campos precisam ser preenchidos!')
        return;
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
            alert('dados salvos')
        }
    }
}

let logarUsuario = () => {
    var emailLogin = document.getElementById('emailLogin').value
    var senhaLogin = document.getElementById('senhaLogin').value
    login = false

    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if (usuarioLogado == null) {
        usuarioLogado = []
    }
    if (emailLogin == '' || senhaLogin == '') {
        alert('Todos os campos precisam ser preenchidos!')
        return;
    }

    loginInvalido = true
    listaDeUsuarios.forEach(usuarioLogin => {
        if (usuarioLogado != []) {
            for (i = usuarioLogado.length; i > -1; i--) {
                usuarioLogado.pop()
            }
        }
        if (usuarioLogin.email == emailLogin && usuarioLogin.senha == senhaLogin) {
            loginInvalido = false
            usuarioLogin.login = true
            usuarioLogado.push(usuarioLogin.nome, emailLogin, senhaLogin, usuarioLogin.celular, usuarioLogin.login)
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
            alert('logado')
        }
    });
    if (loginInvalido) {
        alert('E-mail ou senha inválidos.')
    }
}

let logoutUsuario = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    for (let i = 0; i < usuarioLogado.length; i++) {
        if (usuarioLogado[i] === true) {
            usuarioLogado.splice([i], 1, false)
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
            alert('logout feito')
        }
    }
}

let listarUsuario = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    for (let i = 0; i < usuarioLogado.length; i++) {
        if (usuarioLogado[i] === true) {
            document.getElementById('nomeCadastroMostrar').innerText = usuarioLogado[0]
            document.getElementById('emailCadastroMostrar').innerText = usuarioLogado[1]
            document.getElementById('celularCadastroMostrar').innerText = usuarioLogado[3]
        }
    }
}

let excluirUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    listaDeUsuarios.forEach(usuarioExcluir => {
        if (usuarioExcluir.email == usuarioLogado[1]) {
            alert('oi')
            listaDeUsuarios.splice(usuarioExcluir, 1)
            usuarioLogado.splice(usuarioLogado[0], usuarioLogado.length)

            localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
        }
    })
}
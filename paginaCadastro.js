let listaDeUsuarios = []
let usuarioLogado = []

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
    let email = document.getElementById('emailLogin').value
    let senha = document.getElementById('senhaLogin').value
    login = false

    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if (usuarioLogado == null) {
        usuarioLogado = []
    }
    if (email == '' || senha == '') {
        alert('Todos os campos precisam ser preenchidos!')
        return;
    }

    loginInvalido = true
    listaDeUsuarios.forEach(usuarioLogin => {
        if (usuarioLogin.email == email && usuarioLogin.senha == senha) {
            loginInvalido = false
            usuarioLogin.login = true
            usuarioLogado.splice(0, 1, [usuarioLogin.nome, email, senha, usuarioLogin.celular, usuarioLogin.login])
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
        if ([i] == 'true') {
            usuarioLogado[i] = false
        }   
    }
}

let excluirUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))

    if (usuario.nome == '' || usuario.email == '' || usuario.senha == '' || usuario.celular == '') {
        alert('Todos os campos precisam ser preenchidos!')
        return;
    } else {
        for (let i = 0; i < listaDeUsuarios.length; i++) {
        }
    }
}



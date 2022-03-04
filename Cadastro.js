let listaDeUsuarios = []
let usuarioLogado

let usuario = {
    nome: '',
    email: '',
    senha: '',
    celular: '',
}

let cpfCnpj = {
    cpf: '',
    cnpj: '',
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
        })
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
    loginInvalido = true

    listaDeUsuarios.forEach(usuarioExcluir => {
        if (usuarioExcluir.email == usuarioLogado) {
            indexArrayUsuario = listaDeUsuarios.indexOf(usuarioExcluir)

            listaDeUsuarios.splice(indexArrayUsuario, 1)
            usuarioLogado = null
            loginInvalido = false
            localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
        }
    })
    if (loginInvalido) alert('Faça o login primeiro.')
}

let logarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let emailLogin = document.getElementById('emailLogin').value
    let senhaLogin = document.getElementById('senhaLogin').value
    loginInvalido = true

    if (emailLogin == '' || senhaLogin == '') return alert('Todos os campos precisam ser preenchidos!')

    listaDeUsuarios.forEach(usuarioLogin => {
        if (usuarioLogin.email == emailLogin && usuarioLogin.senha == senhaLogin) {
            usuarioLogado = emailLogin
            loginInvalido = false
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
            alert('Login efetuado.')
        }
    })
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

    let nomeCadastroMostrar = document.getElementById('nomeCadastroMostrar')
    let emailCadastroMostrar = document.getElementById('emailCadastroMostrar')
    let celularCadastroMostrar = document.getElementById('celularCadastroMostrar')
    loginInvalido = true

    listaDeUsuarios.forEach(listarDadosUsuario => {
        if (usuarioLogado == listarDadosUsuario.email) {
            nomeCadastroMostrar.innerText = listarDadosUsuario.nome
            emailCadastroMostrar.innerText = listarDadosUsuario.email
            celularCadastroMostrar.innerText = listarDadosUsuario.celular
            return loginInvalido = false
        }
    })
    if (loginInvalido) alert('Primeiro, faça login.')
}

let atualizarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let nomeCadastroEditar = document.getElementById('nomeCadastroEditar')
    let emailCadastroEditar = document.getElementById('emailCadastroEditar')
    let celularCadastroEditar = document.getElementById('celularCadastroEditar')

    listaDeUsuarios.forEach(editarDadosUsuario => {
        if (usuarioLogado == editarDadosUsuario.email) {
            nomeCadastroEditar.value = editarDadosUsuario.nome
            celularCadastroEditar.value = editarDadosUsuario.celular
        }
    })
}

let editarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let arrayCadastroEditar = [
        document.getElementById('nomeCadastroEditar').value,
        document.getElementById('celularCadastroEditar').value,
    ]

    for (i = 0; i < arrayCadastroEditar.length; i++) {
        if (arrayCadastroEditar[i] == '') return alert('Todos os campos precisam ser preenchidos.')
    }
    
    listaDeUsuarios.forEach(editarDadosUsuario => {
        if (editarDadosUsuario.email == usuarioLogado) {
            editarDadosUsuario.nome = document.getElementById('nomeCadastroEditar').value
            editarDadosUsuario.celular = document.getElementById('celularCadastroEditar').value
        }
    })
    localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
    alert('Dados atualizados.')

    window.location.href = 'paginaAtualizar.html'
}

let redefinirSenha = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let novaSenha = document.getElementById('novaSenha')
    let repetirNovaSenha = document.getElementById('repetirNovaSenha')
    let emailRedefinirSenha = document.getElementById('emailRedefinirSenha')

    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (novaSenha.value == repetirNovaSenha.value && listaDeUsuarios[i].email == emailRedefinirSenha.value) {
            listaDeUsuarios[i].senha = novaSenha.value
            localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
            return alert('Senha redefinida.')
        }
    }
    if (novaSenha.value != repetirNovaSenha.value) alert('As senhas não são iguais.')
    else alert('Este E-mail não está cadastrado.')
}

let showListarUsuario = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    if (usuarioLogado == null) return alert('primeiro, crie uma conta ou faça login.')
    window.location.href = "paginaListar.html"
}

let showAtualizarUsuario = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    if (usuarioLogado == null) return alert('primeiro, crie uma conta ou faça login.')
    window.location.href = "paginaAtualizar.html"
}

let showRedefinirSenha = () => window.location.href = 'redefinirSenha.html'
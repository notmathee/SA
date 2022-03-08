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
        return Swal.fire({
            icon: 'error',
            title: 'Todos os campos precisam ser preenchidos!'
        })
    } else {
        emailValido = true
        listaDeUsuarios.forEach(usuarioCadastro => {
            if (usuarioCadastro.email == usuario.email) {
                emailValido = false
                Swal.fire({
                    icon: 'error',
                    title: 'Este email já está cadastrado.'
                })
            }
        })
        if (emailValido) {
            listaDeUsuarios.push(usuario)
            localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
            Swal.fire('Dados salvos.')
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
            window.location.href = "paginaIndex.html"
        }
    })
    if (loginInvalido) Swal.fire({
        icon: 'error',
        title: 'Faça o login primeiro.'
    })
}

let logarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let emailLogin = document.getElementById('emailLogin').value
    let senhaLogin = document.getElementById('senhaLogin').value
    loginInvalido = true

    if (emailLogin == '' || senhaLogin == '') return Swal.fire({
        icon: 'error',
        title: 'Todos os campos precisam ser preenchidos!'
    })
    if (emailLogin == usuarioLogado) return Swal.fire({
        icon: 'error',
        title: 'Você já está logado.',
    })

    listaDeUsuarios.forEach(usuarioLogin => {
        if (usuarioLogin.email == emailLogin && usuarioLogin.senha == senhaLogin) {
            usuarioLogado = emailLogin
            loginInvalido = false
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
            return Swal.fire('Login efetuado.')
        }
    })
    if (loginInvalido) {
        return Swal.fire({
            icon: 'error',
            title: 'Email ou senha incorretos.'
        })
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
    if (loginInvalido) return Swal.fire({
        icon: 'error',
        title: 'Primeiro, faça login.'
    })
}


let atualizarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    
    let nomeCadastroEditar = document.getElementById('nomeCadastroEditar')
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
        if (arrayCadastroEditar[i] == '') return Swal.fire({
            icon: 'error',
            title: 'Todos os campos precisam ser preenchidos.'
        })
    }
    
    listaDeUsuarios.forEach(editarDadosUsuario => {
        if (editarDadosUsuario.email == usuarioLogado) {
            editarDadosUsuario.nome = document.getElementById('nomeCadastroEditar').value
            editarDadosUsuario.celular = document.getElementById('celularCadastroEditar').value
        }
    })
    localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
    Swal.fire('Dados atualizados.')

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
            return Swal.fire('Senha redefinida.')
        }
    }
    if (novaSenha.value != repetirNovaSenha.value) Swal.fire({
        icon: 'error',
        title: 'As senhas não são iguais.'
    })
    else Swal.fire({
        icon: 'error',
        title: 'Este email não está cadastrado.'
    })
}

let showListarUsuario = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    if (usuarioLogado == null) return Swal.fire({
        icon: 'error',
        title: 'Primeiro, crie uma conta ou faça login.'
    })
    window.location.href = "paginaListar.html"
}

let showAtualizarUsuario = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    if (usuarioLogado == null) return Swal.fire({
        icon: 'error',
        title: 'Primeiro, crie uma conta ou faça login',
    })
    window.location.href = "paginaAtualizar.html"
}

let showRedefinirSenha = () => window.location.href = 'redefinirSenha.html'

document.getElementById('swalSair').addEventListener('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if (usuarioLogado != null) {
        usuarioLogado = null
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
        return Swal.fire('Você saiu da sua conta.')
    }
    return Swal.fire({
        icon: 'error',
        title: 'Você não está logado.'
    })
})

document.getElementById('swalPerfil').addEventListener('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    if (usuarioLogado == null) return Swal.fire({
        icon: 'error',
        title: 'Primeiro, faça o login ou cadastre uma conta.',
    })
    window.location.href = "paginaListar.html"
})
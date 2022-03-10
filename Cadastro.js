let listaDeUsuarios = []
let usuarioLogado

let empresa = {
    nomeEmpresa: '',
    senhaEmpresa: '',
    municipio: '',
    dataAbertura: '',
    numeroInscricao: '',
}

let usuario = {
    nome: '',
    email: '',
    senha: '',
    celular: '',
    cpf: '',
    dataNascimento: '',
}

let adicionarUsuario = () => {
    let usuario = {
        nome: document.getElementById('nomeCadastro').value,
        email: document.getElementById('emailCadastro').value,
        senha: document.getElementById('senhaCadastro').value,
        celular: document.getElementById('celularCadastro').value,
        cpf: document.getElementById('cpfCadastro').value,
        dataNascimento: document.getElementById('nascimentoCadastro').value
    }

    let empresa = {
        nomeEmpresa: document.getElementById('nomeEmpresa').value,
        senhaEmpresa: document.getElementById('senhaEmpresa').value,
        municipio: document.getElementById('municipio').value,
        dataAbertura: document.getElementById('dataAbertura').value,
        numeroInscricao: document.getElementById('numeroInscricao').value
    }

    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))

    verificarUsuarioPreencher = [
        nome,
        email,
        senha,
        celular,
        cpf,
        dataNascimento,
    ]
    verificarEmpresaPreencher = [
        nomeEmpresa,
        senhaEmpresa,
        municipio,
        dataAbertura,
        numeroInscricao,
    ]

    if (listaDeUsuarios == null) {
        listaDeUsuarios = []
    }
    if (listaDeEmpresas == null) {
        listaDeEmpresas = []
    }

    for (let i = 0; i < verificarUsuarioPreencher.length; i++) {
        if (verificarUsuarioPreencher[i] == '') {
            return Swal.fire({
                icon: 'error',
                title: 'Todos os campos precisam ser preenchidos!'
            })
        }
    }
    for (let i = 0; i < verificarEmpresaPreencher.length; i++) {
        if (verificarEmpresaPreencher[i] == '') {
            return Swal.fire({
                icon: 'error',
                title: 'Todos os campos precisam ser preenchidos!'
            })
        }
    }

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
    inscricaoValida = true
    listaDeEmpresas.forEach(empresaCadastro => {
        if (empresaCadastro.numeroInscricao == empresa.numeroInscricao) {
            emailValido = false
            Swal.fire({
                icon: 'error',
                title: 'Este número de inscrição já está cadastrado.'
            })
        }
    })

    if (emailValido) {
        listaDeUsuarios.push(usuario)
        localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
        Swal.fire('Dados salvos.')
    }
    if (inscricaoValida) {
        listaDeEmpresas.push(empresa)
        localStorage.setItem('listaDeEmpresas', JSON.stringify(listaDeEmpresas))
        Swal.fire('Dados salvos.')
    }
}


let excluirUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    loginInvalido = true
    Swal.fire({
        title: 'Tem certeza?',
        text: "Sua conta e todos os dados dela ser~~ao exclu´´idos.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Deletar'
    }).then((result) => {
        if (result.isConfirmed) {
            listaDeUsuarios.forEach(usuarioExcluir => {
                if (usuarioExcluir.email == usuarioLogado) {
                    indexArrayUsuario = listaDeUsuarios.indexOf(usuarioExcluir)
                    usuarioLogado = null
                    listaDeUsuarios.splice(indexArrayUsuario, 1)
                    localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'index.html'
                        }
                    })
                }
            })
        }
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

    nomeListado = document.getElementById('nomeCadastroEditar')
    celularListado = document.getElementById('celularCadastroEditar')

    listaDeUsuarios.forEach(listarDadosUsuario => {
        if (usuarioLogado == listarDadosUsuario.email) {
            nomeListado.value = listarDadosUsuario.nome
            celularListado.value = listarDadosUsuario.celular
        }
    })
}

let editarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let nomeCadastroEditar = document.getElementById('nomeCadastroEditar')
    let celularCadastroEditar = document.getElementById('celularCadastroEditar')

    let arrayCadastroEditar = [
        nomeCadastroEditar.value,
        celularCadastroEditar.value,
    ]

    for (i = 0; i < arrayCadastroEditar.length; i++) {
        if (arrayCadastroEditar[i] == '') return Swal.fire({
            icon: 'error',
            title: 'Todos os campos precisam ser preenchidos.'
        })
    }

    listaDeUsuarios.forEach(editarDadosUsuario => {
        if (editarDadosUsuario.email == usuarioLogado) {
            editarDadosUsuario.nome = nomeCadastroEditar.value
            editarDadosUsuario.celular = celularCadastroEditar.value
        }
    })
    localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
    Swal.fire('Dados atualizados.').then((result => {
        if (result.isConfirmed) {
            window.location.href = 'paginaListar.html'
        }
    }))
}

let redefinirSenha = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let novaSenha = document.getElementById('redefinirSenha')
    let repetirNovaSenha = document.getElementById('confirmarSenha')
    let emailRedefinirSenha = document.getElementById('confirmarEmail')

    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (novaSenha.value == listaDeUsuarios[i].senha) {
            return Swal.fire({
                icon: 'error',
                title: 'Esta senha ´´e do cadastro'
            })
        }
    }

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

let showEditarUsuario = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    if (usuarioLogado == null) return Swal.fire({
        icon: 'error',
        title: 'Primeiro, crie uma conta ou faça login',
    })
    window.location.href = "paginaAtualizar.html"
}

let showRedefinirSenha = () => window.location.href = 'redefinirSenha.html'

let atualizarListarUsuarios = () => {
    atualizarUsuario()
    listarUsuario()
}

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
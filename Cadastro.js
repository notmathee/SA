let listaDeUsuarios = []
let usuarioLogado

let empresa = {
    nomeEmpresa: '',
    senhaEmpresa: '',
    municipioEmpresa: '',
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
        dataNascimento: document.getElementById('nascimentoCadastro').value,
    }

    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))

    verificarUsuarioPreencher = [
        usuario.nome,
        usuario.email,
        usuario.senha,
        usuario.celular,
        usuario.cpf,
        usuario.dataNascimento,
    ]

    if (listaDeUsuarios == null) {
        listaDeUsuarios = []
    }

    for (let i = 0; i < verificarUsuarioPreencher.length; i++) {
        if (verificarUsuarioPreencher[i] == '') {
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

    if (emailValido) {
        listaDeUsuarios.push(usuario)
        localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
        Swal.fire('Dados salvos.')
    }
}

let adicionarEmpresa = () => {
    let empresa = {
        nomeEmpresa: document.getElementById('nomeEmpresa').value,
        senhaEmpresa: document.getElementById('senhaEmpresa').value,
        municipioEmpresa: document.getElementById('municipioEmpresa').value,
        dataAbertura: document.getElementById('dataAbertura').value,
        numeroInscricao: document.getElementById('numeroInscricao').value,
    }

    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))

    verificarEmpresaPreencher = [
        empresa.nomeEmpresa,
        empresa.senhaEmpresa,
        empresa.municipioEmpresa,
        empresa.dataAbertura,
        empresa.numeroInscricao,
    ]

    if (listaDeEmpresas == null) listaDeEmpresas = []

    for (let i = 0; i < verificarEmpresaPreencher.length; i++) {
        if (verificarEmpresaPreencher[i] == '') {
            return Swal.fire({
                icon: 'error',
                allowOutsideClick: false,
                title: 'Todos os campos precisam ser preenchidos!',
            })
        }
    }

    inscricaoValida = true
    listaDeEmpresas.forEach(empresaCadastro => {
        if (empresaCadastro.numeroInscricao == empresa.numeroInscricao) {
            inscricaoValida = false
            Swal.fire({
                icon: 'error',
                title: 'Este número de inscrição já está cadastrado.'
            })
        }
    })

    if (inscricaoValida) {
        listaDeEmpresas.push(empresa)
        localStorage.setItem('listaDeEmpresas', JSON.stringify(listaDeEmpresas))
        Swal.fire('Dados salvos.')
    }
}


let excluirUsuario = () => {
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    loginInvalido = true

    Swal.fire({
        title: 'Tem certeza?',
        text: "Sua conta e todos os dados dela serão excluídos.",
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

                    Swal.fire({
                        title: 'Sua conta foi deletada.',
                        icon: 'success',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = './index.html'
                        }
                    })
                }
            })
            listaDeEmpresas.forEach(empresaExcluir => {
                if (empresaExcluir.numeroInscricao == usuarioLogado) {
                    indexArrayEmpresa = listaDeEmpresas.indexOf(empresaExcluir)
                    usuarioLogado = null
                    listaDeEmpresas.splice(indexArrayEmpresa, 1)

                    localStorage.setItem('listaDeEmpresas', JSON.stringify(listaDeEmpresas))
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

                    Swal.fire({
                        title: 'Sua conta foi deletada.',
                        icon: 'success',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = './index.html'
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

let logarEmpresa = () => {
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let numeroInscricaoLogin = document.getElementById('numeroInscricaoLogin').value
    let senhaEmpresaLogin = document.getElementById('senhaEmpresaLogin').value
    loginInvalido = true

    if (numeroInscricaoLogin == '' || senhaEmpresaLogin == '') return Swal.fire({
        icon: 'error',
        title: 'Todos os campos precisam ser preenchidos!'
    })
    if (numeroInscricaoLogin == usuarioLogado) return Swal.fire({
        icon: 'error',
        title: 'Você já está logado.',
    })

    listaDeEmpresas.forEach(empresaLogin => {
        if (empresaLogin.numeroInscricao == numeroInscricaoLogin &&
            empresaLogin.senhaEmpresa == senhaEmpresaLogin) {
            usuarioLogado = numeroInscricaoLogin
            loginInvalido = false
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
            return Swal.fire('Login efetuado.')
        }
    })

    if (loginInvalido) {
        return Swal.fire({
            icon: 'error',
            title: 'Número de inscrição ou senha incorretos.'
        })
    }
}

$('#swalLogin').on('click', function() {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if (usuarioLogado == null) {
        return $('#exampleModalLogin').modal("toggle")
    }
    Swal.fire({
        icon: 'error',
        title: 'Você já está logado.',
    })

})

$('#cadastrar-empresa-btn').on('click', function() {
    $('#exampleModalCadastroEmpresa').modal('toggle')
})
$('#cadastrar-usuario-btn').on('click', function() {
    $('#exampleModalCadastro').modal('toggle')
})
$('#login-empresa-btn').on('click', function() {
    $('#exampleModalLoginEmpresa').modal('toggle')
})
$('#login-usuario-btn').on('click', function() {
    $('#exampleModalLogin').modal('toggle')
})
$('#redefinir-empresa-btn').on('click', function() {
    $('#exampleModalRedefinirEmpresa').modal('toggle')
})
$('#redefinir-usuario-btn').on('click', function() {
    $('#exampleModalRedefinir').modal('toggle')
})
$('#empresa-redefinir-senha-btn').on('click', function() {
    $('#exampleModalRedefinir').modal('toggle')
})
$('#usuario-redefinir-senha-btn').on('click', function() {
    $('#exampleModalRedefinir').modal('toggle')
})

let listarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    loginInvalido = true

    listaDeUsuarios.forEach(listarDadosUsuario => {
        if (usuarioLogado == listarDadosUsuario.email) {
            document.getElementById('nomeCadastroMostrar').innerText = listarDadosUsuario.nome
            document.getElementById('emailCadastroMostrar').innerText = listarDadosUsuario.email
            document.getElementById('celularCadastroMostrar').innerText = listarDadosUsuario.celular
            document.getElementById('cpfCadastroMostrar').innerText = listarDadosUsuario.cpf
            document.getElementById('dataNascimentoMostrar').innerText = listarDadosUsuario.dataNascimento
            return loginInvalido = false
        }
    })
    listaDeEmpresas.forEach(listarDadosEmpresa => {
        if (usuarioLogado == listarDadosEmpresa.numeroInscricao) {
            document.getElementById('nomeEmpresaMostrar').innerText = listarDadosEmpresa.nomeEmpresa
            document.getElementById('municipioEmpresaMostrar').innerText = listarDadosEmpresa.municipioEmpresa
            document.getElementById('dataAberturaMostrar').innerText = listarDadosEmpresa.dataAbertura
            document.getElementById('numeroInscricaoMostrar').innerText = listarDadosEmpresa.numeroInscricao
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

    listaDeUsuarios.forEach(listarDadosUsuario => {
        if (usuarioLogado == listarDadosUsuario.email) {
            document.getElementById('nomeCadastroEditar').value = listarDadosUsuario.nome
            document.getElementById('celularCadastroEditar').value = listarDadosUsuario.celular
            document.getElementById('dataNascimentoEditar').value = listarDadosUsuario.dataNascimento
        }
    })
}

let editarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let arrayCadastroEditar = [
        document.getElementById('nomeCadastroEditar').value,
        document.getElementById('celularCadastroEditar').value,
        document.getElementById('dataNascimentoEditar').value,
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
            editarDadosUsuario.dataNascimento = document.getElementById('dataNascimentoEditar').value
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
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    let novaSenha = document.getElementById('redefinirSenha')
    let confirmarNovaSenha = document.getElementById('confirmarSenha')
    let emailRedefinirSenha = document.getElementById('confirmarEmail')

    let numeroInscricaoRedefinirSenha = document.getElementById('numeroInscricaoRedefinirSenha')
    let novaSenhaEmpresa = document.getElementById('redefinirSenhaEmpresa')
    let confirmarNovaSenhaEmpresa = document.getElementById('confirmarSenhaEmpresa')

    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (novaSenha.value == listaDeUsuarios[i].senha) {
            return Swal.fire({
                icon: 'error',
                title: 'Essa é a sua senha atual.'
            })
        }
    }
    for (let i = 0; i < listaDeEmpresas.length; i++) {
        if (novaSenha.value == listaDeEmpresas[i].senha) {
            return Swal.fire({
                icon: 'error',
                title: 'Essa é a sua senha atual.'
            })
        }
    }

    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (novaSenha.value == confirmarNovaSenha.value && listaDeUsuarios[i].email == emailRedefinirSenha.value) {
            listaDeUsuarios[i].senha = novaSenha.value
            localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
            return Swal.fire('Senha redefinida.')
        }
    }
    for (let i = 0; i < listaDeEmpresas.length; i++) {
        if (novaSenhaEmpresa.value == confirmarNovaSenhaEmpresa.value &&
            listaDeEmpresas[i].numeroInscricao == numeroInscricaoRedefinirSenha.value) {
            listaDeEmpresas[i].senha = novaSenhaEmpresa.value
            localStorage.setItem('listaDeEmpresas', JSON.stringify(listaDeEmpresas))
            return Swal.fire('Senha redefinida.')
        }
    }
    if (novaSenha.value != confirmarNovaSenha.value) Swal.fire({
        icon: 'error',
        title: 'As senhas não são iguais.'
    })
    else Swal.fire({
        icon: 'error',
        title: 'Este email não está cadastrado.'
    })
    if (novaSenhaEmpresa.value != confirmarNovaSenhaEmpresa.value) Swal.fire({
        icon: 'error',
        title: 'As senhas não são iguais.'
    })
    else Swal.fire({
        icon: 'error',
        title: 'Este CNPJ não está cadastrado.'
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
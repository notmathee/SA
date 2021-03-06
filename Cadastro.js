let listaDeUsuarios = []
let listaDeEmpresas = []
let usuarioLogado
let empresaLogado
let adminLogado
let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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

    if (listaDeUsuarios == null) listaDeUsuarios = []

    for (let i = 0; i < verificarUsuarioPreencher.length; i++) {
        if (verificarUsuarioPreencher[i] == '') {
            return Swal.fire({
                icon: 'warning',
                title: 'Todos os campos precisam ser preenchidos!'
            })
        }
    }
    if (document.getElementById('senhaCadastro').value.length < 8) return Swal.fire({
        icon: 'warning',
        title: 'A senha precisa ter no mínimo 8 caracteres.'
    })
    if (document.getElementById('senhaCadastro').value.length > 15) return Swal.fire({
        icon: 'warning',
        title: 'A senha deve ter no máximo 15 caracteres.'
    })
    if (document.getElementById('cpfCadastro').value.length != 11) return Swal.fire({
        icon: 'warning',
        title: 'O CPF deve conter 11 dígitos.'
    })
    if (!document.getElementById('emailCadastro').value.match(validRegex)) return Swal.fire({
        icon: 'warning',
        title: 'Email inválido.'
    })

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
        Swal.fire('Dados salvos.').then((result) => {
            if (result.isConfirmed) $("#exampleModalCadastro").modal('toggle')
        })
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
                icon: 'warning',
                allowOutsideClick: false,
                title: 'Todos os campos precisam ser preenchidos!',
            })
        }
    }
    if (document.getElementById('numeroInscricao').value.length != 14) Swal.fire({
        icon: 'warning',
        title: 'O número de inscrição deve ter 14 dígitos.'
    })
    if (document.getElementById('senhaEmpresa').value.length < 8) return Swal.fire({
        icon: 'warning',
        title: 'A senha precisa ter no mínimo 8 caracteres.'
    })
    if (document.getElementById('senhaEmpresa').value.length > 15) return Swal.fire({
        icon: 'warning',
        title: 'A senha deve ter no máximo 15 caracteres.'
    })

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

$('#swalCadastro').on('click', function () {
    $('#exampleModalCadastro').modal("toggle")
})

let excluirUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))
    loginInvalido = true

    if (listaDeUsuarios == null) listaDeUsuarios = []
    if (listaDeEmpresas == null) listaDeEmpresas = []

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
                if (empresaExcluir.numeroInscricao == empresaLogado) {
                    indexArrayEmpresa = listaDeEmpresas.indexOf(empresaExcluir)
                    empresaLogado = null
                    listaDeEmpresas.splice(indexArrayEmpresa, 1)

                    localStorage.setItem('listaDeEmpresas', JSON.stringify(listaDeEmpresas))
                    localStorage.setItem('empresaLogado', JSON.stringify(empresaLogado))

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
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    let emailLogin = document.getElementById('emailLogin').value
    let senhaLogin = document.getElementById('senhaLogin').value
    loginInvalido = true

    if (emailLogin == '' || senhaLogin == '') return Swal.fire({
        icon: 'warning',
        title: 'Todos os campos precisam ser preenchidos!'
    })
    if (emailLogin == usuarioLogado || empresaLogado != null) return Swal.fire({
        icon: 'warning',
        title: 'Você já está logado.',
    })

    listaDeUsuarios.forEach(usuarioLogin => {
        if (usuarioLogin.email === emailLogin && usuarioLogin.senha === senhaLogin) {
            usuarioLogado = emailLogin
            loginInvalido = false
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
            return Swal.fire('Login efetuado.').then((result) => {
                if (result.isConfirmed) {
                    window.location.href = './index.html'
                }
            })
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
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    let numeroInscricaoLogin = document.getElementById('numeroInscricaoLogin').value
    let senhaEmpresaLogin = document.getElementById('senhaEmpresaLogin').value
    loginInvalido = true

    if (numeroInscricaoLogin == '' || senhaEmpresaLogin == '') return Swal.fire({
        icon: 'warning',
        title: 'Todos os campos precisam ser preenchidos!'
    })
    if (numeroInscricaoLogin == empresaLogado || usuarioLogado != null) return Swal.fire({
        icon: 'error',
        title: 'Você já está logado.',
    })

    listaDeEmpresas.forEach(empresaLogin => {
        if (empresaLogin.numeroInscricao === numeroInscricaoLogin &&
            empresaLogin.senhaEmpresa === senhaEmpresaLogin) {
            empresaLogado = numeroInscricaoLogin
            loginInvalido = false
            localStorage.setItem('empresaLogado', JSON.stringify(empresaLogado))
            return Swal.fire('Login efetuado.').then((result) => {
                if (result.isConfirmed) {
                    window.location.href = './index.html'
                }
            })
        }
    })

    if (loginInvalido) {
        return Swal.fire({
            icon: 'error',
            title: 'Número de inscrição ou senha incorretos.'
        })
    }
}

$('#swalLogin').on('click', function () {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))
    
    if (listaDeUsuarios == null) listaDeUsuarios = []
    if (listaDeEmpresas == null) listaDeEmpresas = []

    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (usuarioLogado == listaDeUsuarios[i].email) return Swal.fire({
            icon: 'warning',
            title: `Você está logado(a), ${listaDeUsuarios[i].nome}. Veja seu perfil para mais informações.`,
        })
    }
    for (let i = 0; i < listaDeEmpresas.length; i++) {
        if (empresaLogado == listaDeEmpresas[i].numeroInscricao) return Swal.fire({
            icon: 'warning',
            title: `Você está logado(a) com a instituição "${listaDeEmpresas[i].nomeEmpresa}". Veja seu perfil para mais informações.`,
        })
    }

    $('#exampleModalLogin').modal("toggle")
})

$('.buttonSolicitar').on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (empresaLogado != null) return $('#exampleModalSolicitar').modal('toggle')
    if (empresaLogado == null && usuarioLogado != null) return Swal.fire({
        icon: 'warning',
        title: 'Só é possível solicitar doações como instituição.'
    })

    Swal.fire({
        icon: 'warning',
        title: 'Primeiro, faça login com uma instituição ou crie uma conta.'
    })

})

$('#swalPerfil').on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado != null && empresaLogado == null) return window.location.href = "paginaListar.html"
    if (empresaLogado != null && usuarioLogado == null) return window.location.href = "paginaListarEmpresa.html"

    Swal.fire({
        icon: 'warning',
        title: 'Primeiro, faça login ou cadastre uma conta.',
    })
})

$("#swalSair").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado != null || empresaLogado != null) {
        usuarioLogado = null
        empresaLogado = null
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
        localStorage.setItem('empresaLogado', JSON.stringify(empresaLogado))
        return Swal.fire('Você saiu da sua conta.').then((result) => {
            if (result.isConfirmed) {
                window.location.href = './index.html'
            }
        })
    }

    Swal.fire({
        icon: 'warning',
        title: 'Você não está logado.'
    })
})

$('#cadastrar-empresa-btn').on('click', function () {
    $('#exampleModalCadastroEmpresa').modal('toggle')
})
$('#cadastrar-usuario-btn').on('click', function () {
    $('#exampleModalCadastro').modal('toggle')
})
$('#login-empresa-btn').on('click', function () {
    $('#exampleModalLoginEmpresa').modal('toggle')
})
$('#login-usuario-btn').on('click', function () {
    $('#exampleModalLogin').modal('toggle')
})
$('#redefinir-empresa-btn').on('click', function () {
    $('#exampleModalRedefinirEmpresa').modal('toggle')
})
$('#redefinir-usuario-btn').on('click', function () {
    $('#exampleModalRedefinir').modal('toggle')
})
$('#empresa-redefinir-senha-btn').on('click', function () {
    $('#exampleModalRedefinir').modal('toggle')
})
$('#usuario-redefinir-senha-btn').on('click', function () {
    $('#exampleModalRedefinir').modal('toggle')
})

$("#buttonSolicitarAlimento").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (empresaLogado != null) return $("#exampleModalSolicitarAlimento").modal('toggle')

    Swal.fire({
        icon: 'warning',
        title: 'Apenas instituições podem solicitar doações. Tenha certeza de estar logado.'
    })
})
$("#buttonSolicitarVestimenta").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (empresaLogado != null) return $("#exampleModalSolicitarVestimenta").modal('toggle')

    Swal.fire({
        icon: 'warning',
        title: 'Apenas instituições podem solicitar doações. Tenha certeza de estar logado.'
    })
})
$("#buttonSolicitarDinheiro").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (empresaLogado != null) return $("#exampleModalSolicitarDinheiro").modal('toggle')

    Swal.fire({
        icon: 'warning',
        title: 'Apenas instituições podem solicitar doações. Tenha certeza de estar logado.'
    })
})

$("#buttonDoarDinheiro1").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado == null && empresaLogado == null) return Swal.fire({
        icon: 'warning',
        title: 'Primeiro faça login ou crie uma conta.'
    })
    $("#exampleModalDoarDinheiro1").modal('toggle')
})
$("#buttonDoarDinheiro2").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado == null && empresaLogado == null) return Swal.fire({
        icon: 'warning',
        title: 'Primeiro faça login ou crie uma conta.'
    })
    $("#exampleModalDoarDinheiro2").modal('toggle')
})
$("#buttonDoarDinheiro3").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado == null && empresaLogado == null) return Swal.fire({
        icon: 'warning',
        title: 'Primeiro faça login ou crie uma conta.'
    })
    $("#exampleModalDoarDinheiro3").modal('toggle')
})

$("#buttonDoarVestimenta1").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado == null && empresaLogado == null) return Swal.fire({
        icon: 'warning',
        title: 'Primeiro faça login ou crie uma conta.'
    })
    $("#exampleModalDoarVestimenta1").modal('toggle')
})
$("#buttonDoarVestimenta2").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado == null && empresaLogado == null) return Swal.fire({
        icon: 'warning',
        title: 'Primeiro faça login ou crie uma conta.'
    })
    $("#exampleModalDoarVestimenta2").modal('toggle')
})
$("#buttonDoarVestimenta3").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado == null && empresaLogado == null) return Swal.fire({
        icon: 'warning',
        title: 'Primeiro faça login ou crie uma conta.'
    })
    $("#exampleModalDoarVestimenta3").modal('toggle')
})

$("#buttonDoarAlimento1").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado == null && empresaLogado == null) return Swal.fire({
        icon: 'warning',
        title: 'Primeiro faça login ou crie uma conta.'
    })
    $("#exampleModalDoarAlimento1").modal('toggle')
})
$("#buttonDoarAlimento2").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado == null && empresaLogado == null) return Swal.fire({
        icon: 'warning',
        title: 'Primeiro faça login ou crie uma conta.'
    })
    $("#exampleModalDoarAlimento2").modal('toggle')
})
$("#buttonDoarAlimento3").on('click', function () {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado == null && empresaLogado == null) return Swal.fire({
        icon: 'warning',
        title: 'Primeiro faça login ou crie uma conta.'
    })
    $("#exampleModalDoarAlimento3").modal('toggle')
})

let listarUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
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

    if (loginInvalido) return Swal.fire({
        icon: 'error',
        title: 'Primeiro, faça login.'
    })
}

let listarEmpresa = () => {
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))
    loginInvalido = true

    listaDeEmpresas.forEach(listarDadosEmpresa => {
        if (empresaLogado == listarDadosEmpresa.numeroInscricao) {
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
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    let arrayCadastroEditarUsuario = [
        document.getElementById('nomeCadastroEditar').value,
        document.getElementById('celularCadastroEditar').value,
        document.getElementById('dataNascimentoEditar').value,
    ]

    for (i = 0; i < arrayCadastroEditarUsuario.length; i++) {
        if (arrayCadastroEditarUsuario[i] == '') return Swal.fire({
            icon: 'warning',
            title: 'Preencha todos os campos.'
        })
    }
    for (let i = 0; i < arrayCadastroEditarEmpresa.length; i++) {
        if (arrayCadastroEditarEmpresa[i] == '') return Swal.fire({
            icon: 'warning',
            title: 'Preencha todos os campos.'
        })
    }

    if (usuarioLogado != null) {
        listaDeUsuarios.forEach(editarDadosUsuario => {
            if (editarDadosUsuario.email === usuarioLogado) {
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
}

let redefinirSenha = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))

    let novaSenha = document.getElementById('redefinirSenha')
    let confirmarNovaSenha = document.getElementById('confirmarSenha')
    let emailRedefinirSenha = document.getElementById('confirmarEmail')

    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (novaSenha.value == listaDeUsuarios[i].senha) {
            return Swal.fire({
                icon: 'error',
                title: 'Essa é a sua senha atual.'
            })
        }
    }
    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (novaSenha.value === confirmarNovaSenha.value && listaDeUsuarios[i].email === emailRedefinirSenha.value) {
            listaDeUsuarios[i].senha = novaSenha.value
            localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))
            return Swal.fire('Senha redefinida.')
        }
    }
    if (novaSenha.value !== confirmarNovaSenha.value) Swal.fire({
        icon: 'error',
        title: 'As senhas não são iguais.'
    })
    else Swal.fire({
        icon: 'error',
        title: 'Este email não está cadastrado.'
    })
}

let redefinirSenhaEmpresa = () => {
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))
    listaDeEmpresas = JSON.parse(localStorage.getItem('listaDeEmpresas'))

    let numeroInscricaoRedefinirSenha = document.getElementById('numeroInscricaoRedefinirSenha')
    let novaSenhaEmpresa = document.getElementById('redefinirSenhaEmpresa')
    let confirmarNovaSenhaEmpresa = document.getElementById('confirmarSenhaEmpresa')

    for (let i = 0; i < listaDeEmpresas.length; i++) {
        if (novaSenhaEmpresa.value === listaDeEmpresas[i].senhaEmpresa) {
            return Swal.fire({
                icon: 'error',
                title: 'Essa é a sua senha atual.'
            })
        }
    }
    for (let i = 0; i < listaDeEmpresas.length; i++) {
        if (novaSenhaEmpresa.value === confirmarNovaSenhaEmpresa.value &&
            listaDeEmpresas[i].numeroInscricao === numeroInscricaoRedefinirSenha.value) {
            listaDeEmpresas[i].senhaEmpresa = novaSenhaEmpresa.value
            localStorage.setItem('listaDeEmpresas', JSON.stringify(listaDeEmpresas))
            return Swal.fire('Senha redefinida.')
        }
    }
    if (novaSenhaEmpresa.value != confirmarNovaSenhaEmpresa.value) Swal.fire({
        icon: 'error',
        title: 'As senhas não são iguais.'
    })
    else Swal.fire({
        icon: 'error',
        title: 'Este CNPJ não está cadastrado.'
    })
}

let solicitarDinheiro = () => {
    let arraySolicitarEmpresa = [
        document.getElementById('descricaoInstituicaoDinheiro').value,
        document.getElementById('enderecoDinheiro').value,
    ]

    for (let i = 0; i < arraySolicitarEmpresa.length; i++) {
        if (arraySolicitarEmpresa[i] == '') return Swal.fire({
            icon: 'warning',
            title: 'Todos os campos precisam ser preenchidos!'
        })
    }

    Swal.fire('Seu pedido de doação foi postado!').then((result) => {
        if (result.isConfirmed) {
            $("#exampleModalSolicitarDinheiro").modal('toggle')
        }
    })
}

let solicitarVestimenta = () => {
    let arraySolicitarEmpresa = [
        document.getElementById('descricaoInstituicaoVestimenta').value,
        document.getElementById('enderecoVestimenta').value,
    ]

    for (let i = 0; i < arraySolicitarEmpresa.length; i++) {
        if (arraySolicitarEmpresa[i] == '') return Swal.fire({
            icon: 'warning',
            title: 'Todos os campos precisam ser preenchidos!'
        })
    }

    Swal.fire('Seu pedido de doação foi postado!').then((result) => {
        if (result.isConfirmed) {
            $("#exampleModalSolicitarVestimenta").modal('toggle')
        }
    })
}

let solicitarAlimento = () => {
    let arraySolicitarEmpresa = [
        document.getElementById('descricaoInstituicaoAlimento').value,
        document.getElementById('enderecoAlimento').value,
    ]

    for (let i = 0; i < arraySolicitarEmpresa.length; i++) {
        if (arraySolicitarEmpresa[i] == '') return Swal.fire({
            icon: 'warning',
            title: 'Todos os campos precisam ser preenchidos!'
        })
    }

    Swal.fire('Seu pedido de doação foi postado!').then((result) => {
        if (result.isConfirmed) {
            $("#exampleModalSolicitarAlimento").modal('toggle')
        }
    })
}

$('#valorDoar1, #valorDoar2, #valorDoar3').on('click', function () {
    $('input[name="doarRadio"]').prop("checked", false);
})

$("#radio1-5, #radio1-10, #radio1-20, #radio1-40").on('click', function () {
    document.getElementById('valorDoar1').value = null
})

$("#radio2-5, #radio2-10, #radio2-20, #radio2-40").on('click', function () {
    document.getElementById('valorDoar2').value = null
})

$("#radio3-5, #radio3-10, #radio3-20, #radio3-40").on('click', function () {
    document.getElementById('valorDoar3').value = null
})

let informacaoDoacoes = []

let doarDinheiroEmpresa1 = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    informacaoDoacoes = JSON.parse(localStorage.getItem('informacaoDoacoes'))

    arrayRadios = [
        radio1 = document.getElementById('radio1-5'),
        radio2 = document.getElementById('radio1-10'),
        radio3 = document.getElementById('radio1-20'),
        radio4 = document.getElementById('radio1-40'),
    ]
    valorDoar1 = document.getElementById('valorDoar1').value
    infoEmpresa11 = document.getElementById('infoEmpresa11').innerText
    doarTrue = false

    if (informacaoDoacoes == null) informacaoDoacoes = []

    for (let i = 0; i < arrayRadios.length; i++) {
        if (arrayRadios[i].checked) {
            valor = arrayRadios[i].value
            doarTrue = true
        }
        if (valorDoar1 != '') {
            valor = valorDoar1
            doarTrue = true
        }

        if (doarTrue) return Swal.fire({
            title: `Confirmação para doar R$ ${valor},00.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Doar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) Swal.fire({
                icon: 'success',
                title: `Você doou R$ ${valor},00 para Casa Cor. Todos nós somos gratos!`,
            }).then((result) => {
                if (result.isConfirmed) $("#exampleModalDoarDinheiro1").modal('toggle')
            })
            if (usuarioLogado != null) usuarioDoacoes = {
                usuarioDoador: usuarioLogado,
                valorDoado: valor,
                informacoes: infoEmpresa11,
            }
            if (empresaLogado != null) usuarioDoacoes = {
                usuarioDoador: empresaLogado,
                valorDoado: valor,
                informacoes: infoEmpresa11,
            }

            informacaoDoacoes.push(usuarioDoacoes)
            localStorage.setItem('informacaoDoacoes', JSON.stringify(informacaoDoacoes))
        })

        Swal.fire({
            icon: 'warning',
            title: 'Selecione ao menos um valor.'
        })
    }
}

let doarDinheiroEmpresa2 = () => {
    arrayRadios = [
        radio1 = document.getElementById('radio2-5'),
        radio2 = document.getElementById('radio2-10'),
        radio3 = document.getElementById('radio2-20'),
        radio4 = document.getElementById('radio2-40'),
    ]
    valorDoar2 = document.getElementById('valorDoar2').value
    infoEmpresa12 = document.getElementById('infoEmpresa12').innerText
    doarTrue = false

    if (informacaoDoacoes == null) informacaoDoacoes = []

    for (let i = 0; i < arrayRadios.length; i++) {
        if (arrayRadios[i].checked) {
            valor = arrayRadios[i].value
            doarTrue = true
        }
        if (valorDoar2 != '') {
            valor = valorDoar2
            doarTrue = true
        }

        if (doarTrue) return Swal.fire({
            title: `Confirmação para doar R$ ${valor},00.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Doar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) Swal.fire({
                icon: 'success',
                title: `Você doou R$ ${valor},00 para Orfanato Raio de Luz. Todos nós somos gratos!`,
            }).then((result) => {
                if (result.isConfirmed) $("#exampleModalDoarDinheiro2").modal('toggle')
            })
            if (usuarioLogado != null) usuarioDoacoes = {
                usuarioDoador: usuarioLogado,
                valorDoado: valor,
                informacoes: infoEmpresa12,
            }
            if (empresaLogado != null) usuarioDoacoes = {
                usuarioDoador: empresaLogado,
                valorDoado: valor,
                informacoes: infoEmpresa12,
            }

            informacaoDoacoes.push(usuarioDoacoes)
            localStorage.setItem('informacaoDoacoes', JSON.stringify(informacaoDoacoes))
        })

        Swal.fire({
            icon: 'warning',
            title: 'Selecione ao menos um valor.'
        })
    }
}

let doarDinheiroEmpresa3 = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    arrayRadios = [
        radio1 = document.getElementById('radio3-5'),
        radio2 = document.getElementById('radio3-10'),
        radio3 = document.getElementById('radio3-20'),
        radio4 = document.getElementById('radio3-40'),
    ]
    valorDoar3 = document.getElementById('valorDoar3').value
    infoEmpresa13 = document.getElementById('infoEmpresa13').innerText
    doarTrue = false

    if (informacaoDoacoes == null) informacaoDoacoes = []

    for (let i = 0; i < arrayRadios.length; i++) {
        if (arrayRadios[i].checked) {
            valor = arrayRadios[i].value
            doarTrue = true
        }
        if (valorDoar3 != '') {
            valor = valorDoar3
            doarTrue = true
        }

        if (doarTrue) return Swal.fire({
            title: `Confirmação para doar R$ ${valor},00.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Doar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) Swal.fire({
                icon: 'success',
                title: `Você doou R$ ${valor},00 para a Abrigo Esperança. Todos nós somos gratos!`,
            }).then((result) => {
                if (result.isConfirmed) $("#exampleModalDoarDinheiro3").modal('toggle')
            })
            if (usuarioLogado != null) usuarioDoacoes = {
                usuarioDoador: usuarioLogado,
                valorDoado: valor,
                informacoes: infoEmpresa13,
            }
            if (empresaLogado != null) usuarioDoacoes = {
                usuarioDoador: empresaLogado,
                valorDoado: valor,
                informacoes: infoEmpresa13,
            }

            informacaoDoacoes.push(usuarioDoacoes)
            localStorage.setItem('informacaoDoacoes', JSON.stringify(informacaoDoacoes))
        })
    }

    Swal.fire({
        icon: 'warning',
        title: 'Selecione ao menos um valor.'
    })
}

let doarVestimentaEmpresa1 = () => {
    let selectV = document.getElementById('opcoesVestimentas1')
    let data = document.getElementById('dataDeEntregaVestimenta1').value

    if (data == '') return Swal.fire({
        icon: 'warning',
        title: 'Insira uma data.'
    })

    switch (selectV.value) {
        case 'peça superior':
            Swal.fire({
                title: `Confirmação para doar ${selectV.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos por escolher doar ${selectV.value}!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarVestimenta1").modal('toggle')
                })
            })
            break

        case 'peça inferior':
            Swal.fire({
                title: `Confirmação para doar ${selectV.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos por escolher doar ${selectV.value}!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarVestimenta1").modal('toggle')
                })
            })
            break

        case 'calçado':
            Swal.fire({
                title: `Confirmação para doar ${selectV.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos por escolher doar ${selectV.value}!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarVestimenta1").modal('toggle')
                })
            })
            break
    }
}

let doarVestimentaEmpresa2 = () => {
    let selectV = document.getElementById('opcoesVestimentas2')
    let data = document.getElementById('dataDeEntregaVestimenta2').value

    if (data == '') return Swal.fire({
        icon: 'warning',
        title: 'Insira uma data.'
    })

    switch (selectV.value) {
        case 'peça superior':
            Swal.fire({
                title: `Confirmação para doar ${selectV.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos por escolher doar ${selectV.value}!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarVestimenta2").modal('toggle')
                })
            })
            break

        case 'peça inferior':
            Swal.fire({
                title: `Confirmação para doar ${selectV.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos por escolher doar ${selectV.value}!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarVestimenta2").modal('toggle')
                })
            })
            break

        case 'calçado':
            Swal.fire({
                title: `Confirmação para doar ${selectV.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos por escolher doar ${selectV.value}!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarVestimenta2").modal('toggle')
                })
            })
            break
    }
}

let doarVestimentaEmpresa3 = () => {
    let selectV = document.getElementById('opcoesVestimentas3')
    let data = document.getElementById('dataDeEntregaVestimenta3').value

    if (data == '') return Swal.fire({
        icon: 'warning',
        title: 'Insira uma data.'
    })

    switch (selectV.value) {
        case 'peça superior':
            Swal.fire({
                title: `Confirmação para doar ${selectV.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos por escolher doar ${selectV.value}!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarVestimenta3").modal('toggle')
                })
            })
            break

        case 'peça inferior':
            Swal.fire({
                title: `Confirmação para doar ${selectV.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos por escolher doar ${selectV.value}!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarVestimenta3").modal('toggle')
                })
            })
            break

        case 'calçado':
            Swal.fire({
                title: `Confirmação para doar ${selectV.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos por escolher doar ${selectV.value}!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarVestimenta3").modal('toggle')
                })
            })
            break
    }
}

let doarAlimentoEmpresa1 = () => {
    let selectA = document.getElementById('opcoesAlimentos1')
    let data = document.getElementById('dataDeEntregaAlimento1').value

    if (data == '') return Swal.fire({
        icon: 'warning',
        title: 'Insira uma data.'
    })

    switch (selectA.value) {
        case 'arroz':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento1").modal('toggle')
                })
            })
            break

        case 'feijão':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento1").modal('toggle')
                })
            })
            break

        case 'macarrão':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento1").modal('toggle')
                })
            })
            break

        case 'soja':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento1").modal('toggle')
                })
            })
            break
    }
}

let doarAlimentoEmpresa2 = () => {
    let selectA = document.getElementById('opcoesAlimentos2')
    let data = document.getElementById('dataDeEntregaAlimento2').value

    if (data == '') return Swal.fire({
        icon: 'warning',
        title: 'Insira uma data.'
    })

    switch (selectA.value) {
        case 'leite em pó':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento2").modal('toggle')
                })
            })
            break

        case 'café':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento2").modal('toggle')
                })
            })
            break

        case 'açúcar':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento2").modal('toggle')
                })
            })
            break

        case 'sal':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento2").modal('toggle')
                })
            })
            break
    }
}

let doarAlimentoEmpresa3 = () => {
    let selectA = document.getElementById('opcoesAlimentos3')
    let data = document.getElementById('dataDeEntregaAlimento3').value

    if (data == '') return Swal.fire({
        icon: 'warning',
        title: 'Insira uma data.'
    })

    switch (selectA.value) {
        case 'polvilho':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento3").modal('toggle')
                })
            })
            break

        case 'fubá':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento3").modal('toggle')
                })
            })
            break

        case 'farinha de trigo':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento3").modal('toggle')
                })
            })
            break

        case 'óleo':
            Swal.fire({
                title: `Confirmação para doar ${selectA.value}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Doar!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) Swal.fire({
                    icon: 'success',
                    title: `Agradecemos pela sua escolha!`,
                }).then((result) => {
                    if (result.isConfirmed) $("#exampleModalDoarAlimento3").modal('toggle')
                })
            })
            break
    }
}

let mostrarLogin = () => {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    empresaLogado = JSON.parse(localStorage.getItem('empresaLogado'))

    if (usuarioLogado != null) return $("#faJavascript").addClass('fa fa-solid fa-heart-circle-check')
    if (empresaLogado != null) return $("#faJavascript").addClass('fa fa-solid fa-house-circle-check')
}

let listarAtualizarUsuario = () => {
    listarUsuario()
    atualizarUsuario()
}

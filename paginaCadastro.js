let listaDeUsuarios = []

let usuario = {
    nome: '',
    email: '',
    senha: '',
    celular: '',
}

function adicionarUsuario() {
    let usuario = {
        nome: document.getElementById('nomeCadastrado').value,
        email: document.getElementById('emailCadastrado').value,
        senha: document.getElementById('senhaCadastrado').value,
        celular: document.getElementById('celularCadastrado').value
    }

    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))

    if (listaDeUsuarios == null) {
        listaDeUsuarios = []
    }
    if (usuario.nome == '' || usuario.email == '' || usuario.senha == '' || usuario.celular == '') {
        alert('Todos os campos precisam ser preenchidos!')
        return;
    } else {
        emailInvalido = false
        listaDeUsuarios.forEach(usuarioJSON => {
            if (usuarioJSON.email == usuario.email) {
                emailInvalido = true
            }
        }); 
        if(emailInvalido){
            alert('Este E-mail existe no cadastro.')
            return;
        }
    }
    listaDeUsuarios.push(usuario)
    localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios))

    alert('dados salvos')
}

let excluirUsuario = () => {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    
    if (usuario.nome == '' || usuario.email == '' || usuario.senha == '' || usuario.celular == '') {
        alert('Todos os campos precisam ser preenchidos!')
        return;
    } else {
        for (let i = 0; i < listaDeUsuarios.length; i++) {
            i
            
        }
    }
}

function listarUsuario() {
    listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'))
    console.log(listaDeUsuarios)

}


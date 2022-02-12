let email = document.getElementById("email")
let senha = document.getElementById("senha")

function cadastrar() {
    localStorage.setItem("email", email.value)
    localStorage.setItem("senha", senha.value)

    window.location.href = "paginaEntrar.html"
}

function entrar(){
    let emailCadastrado = localStorage.getItem("email")
    let senhaCadastrada = localStorage.getItem("senha")

    let emailEntrar = document.getElementById("emailEntrar")
    let senhaEntrar = document.getElementById("senhaEntrar")

    if (emailEntrar.value == emailCadastrado && senhaEntrar.value == senhaCadastrada) {
        alert(`Você entrou na sua conta`)
    } else {
        alert("erro")
    }
}
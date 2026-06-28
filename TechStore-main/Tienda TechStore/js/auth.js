document.addEventListener("DOMContentLoaded", () => {

    verificarSesion();

    // 2. Escuchar cuando el usuario intente iniciar sesión
    const formLogin = document.getElementById("formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita que la página se recargue
            
            const email = document.getElementById("loginEmail").value;
            const pass = document.getElementById("loginPassword").value;
            
            loginUsuario(email, pass);
        });
    }
});

// Función para verificar y cambiar los botones del navbar
function verificarSesion() {
    const usuario = localStorage.getItem("usuarioLogueado");
    
    const navLogin = document.getElementById("navLogin");
    const navRegistro = document.getElementById("navRegistro");
    const navUsuario = document.getElementById("navUsuario");
    const nombreUsuarioHeader = document.getElementById("nombreUsuarioHeader");

    if (usuario) {
        if (nombreUsuarioHeader) nombreUsuarioHeader.textContent = usuario;
        
        // Ocultamos los botones de Login y Registro, mostramos el usuario
        if (navLogin) navLogin.classList.add("d-none");
        if (navRegistro) navRegistro.classList.add("d-none");
        if (navUsuario) navUsuario.classList.remove("d-none");
    } else {
        // Mostramos los botones de Login y Registro, ocultamos el usuario
        if (navLogin) navLogin.classList.remove("d-none");
        if (navRegistro) navRegistro.classList.remove("d-none");
        if (navUsuario) navUsuario.classList.add("d-none");
    }
}

// Función para procesar los datos del formulario de Login
function loginUsuario(emailIngresado, passwordIngresado) {
    // Buscamos la lista de todos los usuarios registrados en localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosTechStore")) || [];

    // Buscamos si hay match de credenciales
    const usuarioEncontrado = usuariosRegistrados.find(
        user => user.email === emailIngresado && user.password === passwordIngresado
    );

    if (usuarioEncontrado) {
        // Guardamos la sesión activa
        localStorage.setItem("usuarioLogueado", usuarioEncontrado.usuario);
        alert(`¡Bienvenido de vuelta, ${usuarioEncontrado.usuario}!`);
        window.location.href = "index.html";
    } else {
        alert("Correo electrónico o contraseña incorrectos. Por favor, vuelve a intentarlo.");
    }
}

// Función global para poder cerrar la sesión
function cerrarSesion(e) {
    if (e) e.preventDefault();
    localStorage.removeItem("usuarioLogueado");
    window.location.reload();
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRegistro");
    const inputTelefono = document.getElementById("regTelefono");

    // Bloqueo de letras en el teléfono
    if (inputTelefono) {
        inputTelefono.addEventListener("input", function() {
            this.value = this.value.replace(/\D/g, "");
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                form.classList.add("was-validated");
            } else {
                e.preventDefault(); 

                // 1. Capturar todos los datos del formulario
                const nombre = document.getElementById("regNombre").value;
                const email = document.getElementById("regEmail").value;
                const telefono = document.getElementById("regTelefono").value;
                const direccion = document.getElementById("regDireccion").value;
                const usuario = document.getElementById("regUsuario").value;
                const password = document.getElementById("regPassword").value;

                // 2. Obtener la lista de usuarios ya registrados o crear una vacía si es el primero
                let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosTechStore")) || [];

                // 3. Validar si el correo ya existe
                const correoExiste = usuariosRegistrados.some(user => user.email === email);
                if (correoExiste) {
                    alert("Este correo electrónico ya está registrado. Intenta iniciar sesión.");
                    return;
                }

                // 4. Crear el nuevo objeto usuario
                const nuevoUsuario = { nombre, email, telefono, direccion, usuario, password };

                // 5. Guardarlo en el arreglo y subirlo al localStorage
                usuariosRegistrados.push(nuevoUsuario);
                localStorage.setItem("usuariosTechStore", JSON.stringify(usuariosRegistrados));

                // 6. Iniciar sesión automáticamente con el nombre de usuario de la cuenta recién creada
                localStorage.setItem("usuarioLogueado", usuario);

                alert(`¡Registro exitoso! Bienvenido/a a TechStore, ${usuario}.`);
                
                
                window.location.href = "index.html";
            }
        }, false);
        
    }
    
    
});
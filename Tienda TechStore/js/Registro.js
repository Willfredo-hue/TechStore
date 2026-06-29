document.addEventListener("DOMContentLoaded", () => {


    // Activar mensajes al pasar el mouse
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    tooltips.forEach(element => {
        new bootstrap.Tooltip(element);
    });



    const form = document.getElementById("formRegistro");
    const inputTelefono = document.getElementById("regTelefono");

    const password = document.getElementById("regPassword");
    const btnVer = document.getElementById("btnVerPassword");
    const icono = btnVer.querySelector("i");



    // Bloqueo de letras para numero telefonico 
    if (inputTelefono) {

        inputTelefono.addEventListener("input", function() {

            this.value = this.value.replace(/\D/g, "");

        });

    }



    // Mostrar / ocultar contraseña
    if(btnVer && password){

        btnVer.addEventListener("click", () => {


            if(password.type === "password"){


                password.type = "text";

                // ojo tachado cuando se ve
                icono.classList.remove("bi-eye-slash");
                icono.classList.add("bi-eye");


            }else{


                password.type = "password";


                icono.classList.remove("bi-eye");
                icono.classList.add("bi-eye-slash");


            }


        });

    }




    // Validación contraseña
    if(password){

        password.addEventListener("input", function(){


            if(password.value === "" || !password.checkValidity()){


                password.classList.add("is-invalid");
                password.classList.remove("is-valid");


            }else{


                password.classList.remove("is-invalid");
                password.classList.add("is-valid");


            }


        });

    }


    // Registro
    if(form){

        form.addEventListener("submit", (e)=>{


            if(!form.checkValidity()){


                e.preventDefault();
                e.stopPropagation();

                form.classList.add("was-validated");


            }else{


                e.preventDefault();



                const nombre = document.getElementById("regNombre").value;
                const email = document.getElementById("regEmail").value;
                const telefono = document.getElementById("regTelefono").value;
                const direccion = document.getElementById("regDireccion").value;
                const usuario = document.getElementById("regUsuario").value;
                const passwordValue = document.getElementById("regPassword").value;



                let usuariosRegistrados =
                JSON.parse(localStorage.getItem("usuariosTechStore")) || [];




                const correoExiste =
                usuariosRegistrados.some(user => user.email === email);



                if(correoExiste){

                    alert("Este correo electrónico ya está registrado. Intenta iniciar sesión.");
                    return;

                }




                const nuevoUsuario = {

                    nombre,
                    email,
                    telefono,
                    direccion,
                    usuario,
                    password: passwordValue

                };




                usuariosRegistrados.push(nuevoUsuario);



                localStorage.setItem(
                    "usuariosTechStore",
                    JSON.stringify(usuariosRegistrados)
                );



                localStorage.setItem(
                    "usuarioLogueado",
                    usuario
                );



                alert(`¡Registro exitoso! Bienvenido/a a TechStore, ${usuario}.`);



                window.location.href = "index.html";


            }



        }, false);


    }



});
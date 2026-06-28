let carrito =
JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {

    actualizarCarrito();

    document
    .querySelectorAll(".btn-carrito")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            const card =
            btn.closest(".card");

            const nombre =
            card.querySelector(".card-title")
            .textContent;

            const precioTexto =
            card.querySelector(".precio")
            .textContent;

            const precio =
            parseFloat(
                precioTexto
                .replace("$","")
                .replace(",","")
            );

            carrito.push({
                nombre,
                precio
            });

            guardarCarrito();
            actualizarCarrito();

        });

    });

});

function guardarCarrito(){

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}

function actualizarCarrito(){

    const contador =
    document.getElementById("contadorCarrito");

    const tabla =
    document.getElementById("tablaCarrito");

    const total =
    document.getElementById("totalCarrito");

    if(contador){

        contador.textContent =
        carrito.length;

    }

    if(tabla){

        tabla.innerHTML = "";

        let suma = 0;

        carrito.forEach((producto,index)=>{

            tabla.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>
                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarProducto(${index})">
                        X
                    </button>
                </td>
            </tr>
            `;

            suma += producto.precio;

        });

        total.textContent =
        suma.toFixed(2);

    }

}

function eliminarProducto(index){

    carrito.splice(index,1);

    guardarCarrito();
    actualizarCarrito();

}

function vaciarCarrito(){

    carrito = [];

    guardarCarrito();
    actualizarCarrito();

}



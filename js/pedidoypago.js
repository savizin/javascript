let carritoLocal = JSON.parse(localStorage.getItem("carrito"));
let obrasLocal = JSON.parse(localStorage.getItem("obras"))
    console.log (carritoLocal);
    if (carritoLocal && obrasLocal) {
        obrasLocal.forEach(x=>{obras.push(x)});
        carritoLocal.forEach((el)=>agregarAlCarrito(el.id));
        console.log('ok');
    }

$(".button").hide ();

//Función para poner un número aleatorio al pedido realizado 
function rango(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1) + min);
}

//Agrego el formulario de pedido con el detalle de las obras a comprar
$("#numPedido").append (` 
    <h3 class="mainComprar__titulo">RESUMEN DE TU CARRITO DE COMPRAS:</h3>
    <span class="numPedido">Pedido Nº: ${rango(1,1000)}</span>
`);

//Se añaden las obras que están en el carrito, al formulario de pedido 
let seccion = document.getElementById ("obrasParaComprar");
carritoDeCompras.forEach( (x) => {
    let obrasComprar = document.createElement ("div");
    obrasComprar.classList.add ("containerObras");
    obrasComprar.innerHTML=
    `   <table class="table table-hover">   
            <thead class="table-info" id="tableinfo">
                <tr>
                    <th scope="col" class="containerObras__colum1">
                        <span class="item-name">Obra: ${x.nb}</span>    
                        <img id="${x.id}" class="imgForm" src=${x.img1} class="img-fluid">
                        <span class="item-price">Precio: $${x.precio}</span>
                    </th>    
                </tr>
            </thead>
            <tbody id="listaProd">
            </tbody>
        </table>    `                   
    seccion.appendChild(obrasComprar);
});

//Para tener el monto total de la compra al final del formulario de pedido
let montoTotal = document.getElementById ("montoTotal");
let montoCarrito = carritoDeCompras.filter ((el) => el.valor == valor)[0];
let monto = document.createElement ("div");
    monto.classList.add ("total");
    monto.innerHTML= ` <p id="totalFact">MONTO TOTAL: $${valor}</p> `
    montoTotal.appendChild(monto);

$("#botonpago").prepend (`<button id="botonpago" type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Realizar pago</button>`);

//Se agrega el formulario de pago al cuerpo del modal
$(".modal-body").prepend (`
    <form>
        <div class="modal-seccion"> 
            <strong class="mondal-subtitulo">Datos del cliente:</strong>
            <label for="nombre" class="nombre">Nombre: <input type="text" name="nombre" id="nombre"></label>
            <label for="apellido" class="apellido">Apellido: <input type="text" name="apellido" id="apellido"> </label>                        
            <label for="correo" class="correo">Correo electrónico: <input type="text" name="correo" id="correo" placeholder="correo@gmail.com"></label>
        </div>  
        <div class="modal-seccion">
            <strong class="mondal-subtitulo">Métodos de envío:</strong>
            <label for="retiro" class="retiro"><input id="circulo" type="radio" name="envio" value="1"> Retiro en local</label>
            <label for="envio" class="envio"><input id="circulo"  type="radio" name="envio" value="2"> Envío a domicilio</label>
        </div>
        <div class="modal-seccion">
            <strong class="mondal-subtitulo">Métodos de pago:</strong>
            <label for="tarjcred" class="tarjcred"><input id="circulo" type="radio" name="metpag" value="1"> Tarjeta de crédito</label>
            <label for="tarjdeb" class="tarjdeb"><input id="circulo" type="radio" name="metpag" value="2"> Tarjeta de débito</label>
            <label for="transf" class="transf"><input id="circulo" type="radio" name="metpag" value="3"> Transferencia bancaria</label>
            <label for="rapipago" class="rapipago"><input id="circulo" type="radio" name="metpag" value="4"> Rapipago</label>
        </div>     
    </form> 
`);

//Alerta que confirma el pago y actualiza el carrito de compras
$("#pago").click (function () {
    swal("PAGO ÉXITOSO", "Se prodecederá a preparar el pedido", "success");
    localStorage.clear();
    $(".close").click();
    $(".mainComprar").remove();
    $(".alcostado__carrito").remove();
    $("#saludoFinal").addClass ("saludo")
                     .prepend (`<strong>¡GRACIAS POR CONFIAR!</strong>
                                <strong class="saludo__firma">Savi :)</strong>`);              
});




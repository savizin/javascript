//Carrito de compras
(function (){
    $("#cart").click( function() {
        $(".shopping-cart").fadeToggle("slow", "linear");
      });
  }) ();

//Array del carrito de compras
let carritoDeCompras = [];

//Array que trae los datos del archivo json para las funciones
let obras = [];
console.log (obras);

//Función para ver las obras en el carrito y decidir si la quiero o la borro y botón para comprar
function agregarAlCarrito (id) {
    let obraValidar = carritoDeCompras.some (x => x.id === id);
    if (obraValidar) {
        swal("¡Cada obra es única y exclusiva!", "Esta obra ya se encuenta en el carrito de compras", "warning");
    }
    else {  
        let productoAgregar = obras.filter((el) => el.id == id)[0];
        carritoDeCompras.push (productoAgregar);
        actualizarCarrito();
    
    document.getElementById("listaPro").innerHTML +=  
        `<li class="clearfix" data-id="${productoAgregar.id}">
            <img src=${productoAgregar.img1} class="img-fluid">
            <span class="item-name">${productoAgregar.nb}</span>
            <span class="item-price">${productoAgregar.precio}</span>
            <img class="eliminar" src="imagenes/eliminar.png" alt="tacho" id="borraElemento${productoAgregar.id}" onclick="borrar(${productoAgregar.id});">
        </li>`;
    }
};

//Función que activa el botón de borrar en el carrito
function borrar (producto) {
    var listaFunc = document.getElementById("listaPro");
    borrarElemento = document.querySelector("li.clearfix[data-id='"+producto+"']");  
    listaFunc.removeChild(borrarElemento);

    for (var i=0; i < carritoDeCompras.length; i++){
        if (carritoDeCompras[i].id == producto) {
            carritoDeCompras.splice(i,1);
        }
    };

    swal("Obra eliminada", "", "error");
    
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    actualizarCarrito()
}

//Función para actualizar carrito
function actualizarCarrito() {
    document.getElementById("cont1").innerHTML = carritoDeCompras.length;
    document.getElementById("cont2").innerHTML = carritoDeCompras.length;
    valor = document.getElementById("total").textContent;
    
    //Aquí número válido si hay un valor previo, si no hay datos, le pongo un cero "0"
    valor = (valor == null || valor == undefined || valor == "") ? 0 : valor;
    valor = carritoDeCompras.reduce((acc, el) => acc + el.precio, 0);
    document.getElementById("total").innerHTML ='$' + valor;
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}

//Funcion para revisar el local storage
function revisarLocal() {
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"));
    console.log(carritoLocal);
    if(carritoLocal){
        carritoLocal.forEach((el)=>agregarAlCarrito(el.id));
    }
}


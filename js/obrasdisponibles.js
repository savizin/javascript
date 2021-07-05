$.getJSON ('../json/obras.json', function (data) { 
    let contenedor = document.getElementById ("cuadros");
    console.log (data.length);
    data.forEach( (x) => {
        obras.push (x);
        let div = document.createElement("article");
        div.classList.add("col-4");
        div.classList.add("bordecarrusel");
        div.innerHTML=` <div id="carrusel${x.id}" class="carousel carousel-fade" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src=${x.img1} id="imagen" class="d-block w-100" alt="obra">
                                </div>
                                <div class="carousel-item">
                                    <img src=${x.img2} id="imagen" class="d-block w-100" alt="obra">
                                </div>
                                <div class="carousel-item">
                                    <img src=${x.img3} id="imagen" class="d-block w-100" alt="obra">
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carrusel${x.id}" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carrusel${x.id}" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div> 
                        <div class="piearticle">
                            <small>${x.nb}</small> <small>$${x.precio}</small> <small>${x.med}</small>            
                            <button class="piearticle__bottom" data-dismiss="alert" type="comprar" value="Comprar" name="Comprar" id="comprar${x.id}">Comprar</button>
                        </div> `
        contenedor.appendChild(div);     
                   
        let boton = document.getElementById (`comprar${x.id}`);
        //Click en el botón comprar para añadir obras al carrito 
        $(boton).click (function () {
            swal("Obra agregada al carrito! 🛒", "", "success");  
            agregarAlCarrito(x.id);
        });

        if (obras.length == data.length) {
            revisarLocal ();
            localStorage.setItem ('obras', JSON.stringify(obras));
        };
    });
});


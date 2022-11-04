
const d = document
const section = d.getElementById('section') 
const home = d.getElementById('home')
const contacto = d.getElementById('contacto')

home.style.display = 'none'
contacto.style.display = 'none'

//section.style.display = 'none'

const btnHome = d.getElementById('homeVer')
const btnProductos = d.getElementById('productoVer')
const btnContacto = d.getElementById('contactoVer')
const btnCarrito = d.getElementById('carrito')

// Interaciones de Botones.
btnProductos.addEventListener('click', e => { sectionProductos(e)
    home.style.display = 'none'
    contacto.style.display = 'none'
    section.style.display = 'block'
})
btnCarrito.addEventListener('click', e => { sectionCarrito(e) 
    home.style.display = 'none'
    contacto.style.display = 'none'
    section.style.display = 'block'
})
btnHome.addEventListener('click', e => {
    //home.style.display = 'block'
    //section.style.display = 'none'
    sectionHome()
  })
  btnContacto.addEventListener('click', e => {
    home.style.display = 'none'
    section.style.display = 'none'
    contacto.style.display = 'block'
    
  })

const fragment = d.createDocumentFragment()
let carrito = {}

let aVelas = [
	{
        "nombre":       "Night Smoke",
        "imagen":       "img/producto/NightSmoke.jpg" ,
        "img_detalle":  "img/detalle_NightSmoke.jpg",
        "descripcion":  "Aroma: Coco, mandarina, pera",
        "precio":       "1800",
        "id":            0
    },
    {
        "nombre":           "Aura",
        "imagen":           "img/producto/Aura.jpg",
        "img_detalle":      "img/detalle_Aura.jpg",
        "descripcion":      "Aroma: Coco, mandarina, pera",
        "precio":           "3200",
        "id":               1
    },
    {
        "nombre":           "Stars Wills",
        "imagen":           "img/producto/StarsWills.jpg" ,
        "img_detalle":      "img/detalle_StarsWills.jpg",
        "descripcion":      "Vela de cera de soja 100% natural.",
        "precio":           "1800",
        "id":               2
    },
    {
        "nombre":           "Blanca Botanica",
        "imagen":           "img/producto/BlancaBotanica.jpg",
        "img_detalle":      "img/detalle_BlancaBotanica.jpg",
        "descripcion":      "Aroma: Orange & Pepper",
        "precio":           "2300",
        "id":                3
    },
    {
        "nombre":           "Hologram",
        "imagen":           "img/producto/Hologram.jpg" ,
        "img_detalle":      "img/detalle_Hologram.jpg",
        "descripcion":      "Aroma: Granada & Manzanilla",
        "precio":           "1950",
        "id":               4
    },
    {
        "nombre":           "Byron",
        "imagen":           "img/producto/Byron.jpg",
        "img_detalle":      "img/detalle_Byron.jpg",
        "descripcion":      "Vela de cera de soja 100% natural",
        "precio":           "1600",
        "id":               5
    }
];
d.addEventListener('DOMContentLoaded', () => { fetchData()
    if(localStorage.getItem('carrito')){
        carrito= JSON.parse(localStorage.getItem('carrito'))
        //pintarCarrito()
        sectionCarrito()
        }  
        if(localStorage.getItem('dato')){
            dato= JSON.parse(localStorage.getItem('dato'))
            CheckoutConfirm() 
        }
        if(localStorage.getItem('pago')){
            pago= JSON.parse(localStorage.getItem('pago'))
            CheckoutConfirm() 
        }
    })
    const fetchData = async () =>  {
        try {
            pintarCards(aVelas)
        } catch {
            console.log('error')
        }
    }
const sectionHome = () => {
    home.style.display = 'block'
    section.style.display = 'none'
    contacto.style.display = 'none'

}
// Productos
const sectionProductos = () => {
    section.innerHTML = ''
    let h1 = d.createElement('h1')
    h1.innerHTML = 'Productos'
    section.appendChild(h1)
    let sectionProducto = d.createElement('section')
    sectionProducto.id = 'cards'
    sectionProducto.classList = 'pt-4'
    section.appendChild(sectionProducto)
    pintarCards(aVelas)
    
}
const pintarCards = aVelas => {
    let cards = d.getElementById('cards')
    aVelas.forEach(producto => {
        //console.log(producto)
        let article = d.createElement('article');
        article.className = 'cards shadow-lg'
        cards.appendChild(article)

        let div1 = d.createElement('div');
        div1.className = 'cards-detalle'
        article.appendChild(div1)

        let h2 = d.createElement('h2');
        h2.innerHTML= producto.nombre
        div1.appendChild(h2);

        let p = d.createElement('p');
        p.innerHTML = '$'
        div1.appendChild(p);

        let span = d.createElement('span');
        span.innerHTML = producto.precio
        p.appendChild(span)
        
        let button = d.createElement('button');
        button.className = 'btn btn-primary btn-lg'
        button.dataset.id = producto.id
        button.innerHTML = 'Agregar'
        div1.appendChild(button);

        let btnAmpliar = d.createElement('button');
        btnAmpliar.className = 'btn btn-outline-dark btn-lg'
        btnAmpliar.dataset.id = producto.id
        btnAmpliar.innerHTML = 'Ampliar'
        div1.appendChild(btnAmpliar);

        let div2 = d.createElement('div');
        div2.className = 'cards-img'
        article.appendChild(div2)

        let img = d.createElement('img');
        img.src = producto.imagen;
        img.alt = 'vela en envase de vidrio'
        div2.appendChild(img);
    })
    //pintarMinicarrito()
    cards.addEventListener('click', e => { addCarrito(e) })
    cards.addEventListener('click', e => { addAmpliar(e) })
    
}

 addAmpliar = e => {
    if (e.target.classList.contains('btn-outline-dark')) {
        setAmpliar(e.target.parentElement)
        console.log(e.target.parentElement)
    }
    e.stopPropagation() 
}

const setAmpliar = objeto => {
    const producto = {
        id: objeto.querySelector('button').dataset.id,
    }
    let id = producto.id
    pintarAmpliar(id)

}
// Ampliamos el producto seleccionado
const pintarAmpliar = id => {
    section.innerHTML = ''

    let div = d.createElement('div')
    div.classList = "card_ampliado"
    section.appendChild(div)

    let div2 = d.createElement('div')
    div.appendChild(div2)
    
    let img = d.createElement('img')
    img.src = aVelas[id].imagen
    img.alt = 'vela en envase de vidrio'
    div2.appendChild(img)

    let div3 = d.createElement('div')
    div3.classList = "detalle p-4"
    div.appendChild(div3)

    let h1 = d.createElement('h1')
    h1.classList = "h1 mb-4"
    h1.innerHTML = aVelas[id].nombre
    div3.appendChild(h1)

    let descripcion = d.createElement('p')
    descripcion.innerHTML = aVelas[id].descripcion
    descripcion.classList = "mb-4"
    div3.appendChild(descripcion)
    
    let p = d.createElement('p')
    p.innerHTML = "$"
    div3.appendChild(p)

    let precio = d.createElement('span')
    precio.innerHTML = aVelas[id].precio
    precio.classList = "h3"
    p.appendChild(precio)

    let btnAgregar = d.createElement('button')
    btnAgregar.innerHTML = "Agregar"
    btnAgregar.dataset.id = id
    btnAgregar.classList = "btn btn-primary btn-lg "
    div3.appendChild(btnAgregar)
}

const addCarrito = e => {
    if (e.target.classList.contains('btn-primary')) {
        console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation() 
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('button').dataset.id,
        precio: objeto.querySelector('span').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    //console.log(producto)
    pintarMinicarrito()
}

const sectionCarrito = () => {
    section.innerHTML = ''
    let div = d.createElement('div')
    div.classList = 'container'
    section.appendChild(div)
        let h1 = d.createElement('h1')
        h1.innerHTML = 'Carrito de Compras'
        h1.classList = 'h1 mt-4'
        div.appendChild(h1)

        let table = d.createElement('table')
        table.classList = 'table text-center'
        div.appendChild(table)

            let thead = d.createElement('thead')
            thead.classList = 'bg-dark text-light'
            table.appendChild(thead)

                    let tr = d.createElement('tr')
                    thead.appendChild(tr)

                        let obj = {a: "Id", b: "Imagen", c: "Nombre", d: "Descripcion", e: "Cantidad", f:"Btn", g:"Total"};
                        for (const prop in obj) {
                        th = d.createElement('th')
                        th.innerHTML = `${obj[prop]}`
                        tr.appendChild(th)
                        }

            let tbody = d.createElement('tbody')
            tbody.id= 'items'
            table.appendChild(tbody)

            let tfoot = d.createElement('tfoot')
            tfoot.classList = 'borde-BF'
            table.appendChild(tfoot)

                let tr2 = d.createElement('tr')
                tr2.id = 'footer'
                tfoot.appendChild(tr2)

        let div2 = d.createElement('div')
        div2.classList = 'text-end pe-2'
        div.appendChild(div2)

            let btnCompra = d.createElement('button')
            btnCompra.innerHTML = 'Aceptar'
            btnCompra.className =  'btn btn-success'
            div2.appendChild(btnCompra)

        btnCompra.addEventListener('click', e => { Checkout(e) })

        
pintarCarrito()
pintarFooter()
}
const pintarCarrito = () => {
    let items = d.getElementById('items')
    //console.log(items)
    items.innerHTML = ''
   Object.values(carrito).forEach(producto => {
        
        let tr = d.createElement('tr')
        tr.classList = 'border align-middle'
        items.appendChild(tr)

       let thId = d.createElement('td')
       thId.innerHTML = producto.id
       tr.appendChild(thId)

       let thImg = d.createElement('td')
       tr.appendChild(thImg)

       let Img = d.createElement('img')
       Img.src = aVelas[producto.id].imagen
       Img.alt = 'vela en envase de vidrio'
       Img.className = 'table-img'
       thImg.appendChild(Img)
       
       let tdNombre = d.createElement('td')
       tdNombre.innerHTML = aVelas[producto.id].nombre
       tr.appendChild(tdNombre)

       let tdDescaripcion = d.createElement('td')
       tdDescaripcion.innerHTML = aVelas[producto.id].descripcion
       tr.appendChild(tdDescaripcion)

       let tdCantidad = d.createElement('td')
       tdCantidad.innerHTML = producto.cantidad
       tr.appendChild(tdCantidad)

       //botones
       let tdBtn = d.createElement('td')
       tr.appendChild(tdBtn)

       let BtnPrimary = d.createElement('button')
       BtnPrimary.innerHTML = '+'
       BtnPrimary.classList = 'btn btn-info btn-sm'
       BtnPrimary.dataset.id = producto.id
       tdBtn.appendChild(BtnPrimary)

       let BtnDanger = d.createElement('button')
       BtnDanger.innerHTML = '-'
       BtnDanger.classList = 'btn btn-danger btn-sm'
       BtnDanger.dataset.id = producto.id
       tdBtn.appendChild(BtnDanger)

       let thTotal = d.createElement('td')
       thTotal.innerHTML = producto.cantidad * aVelas[producto.id].precio
       tr.appendChild(thTotal)
   })
   items.addEventListener('click', e => { btnAumentarDisminuir(e) })
   //pintarFooter()
   pintarMinicarrito()
   //btnaceptar()

   localStorage.setItem('carrito', JSON.stringify(carrito))
   //console.log(carrito)
}

const btnAumentarDisminuir = e => {
    //console.log(e.target)
    if(e.target.classList.contains('btn-info')) {
        carrito[e.target.dataset.id]
        //console.log(carrito[e.target.dataset.id])
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
// no funciona el restar
    /* if(e.target.classList.contains('btn-danger')) {
        carrito[e.target.dataset.id]
        console.log(carrito[e.target.dataset.id])
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        //console.log(producto.cantidad)
        pintarCarrito()
    }
    e.stopPropagation() */
}

const pintarFooter = () => {
    let footer = d.getElementById('footer')
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `<th>Carrito Vacio</th>`
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    let tdProductos = d.createElement('td')
    tdProductos.classList = 'h5 mx-auto'
    tdProductos.innerHTML = 'Total Productos'
    footer.appendChild(tdProductos)

    let td1 = d.createElement('td')
    footer.appendChild(td1)
    let td2 = d.createElement('td')
    footer.appendChild(td2)
    let td3 = d.createElement('td')
    footer.appendChild(td3)

    let tdCantidad = d.createElement('td')
    tdCantidad.innerHTML = nCantidad
    footer.appendChild(tdCantidad)

    let tdVaciar = d.createElement('td')
    footer.appendChild(tdVaciar)

    let btnVaciar = d.createElement('button')
    btnVaciar.innerHTML = 'Vaciar'
    btnVaciar.className = 'btn btn-succes btn-sm'
    tdVaciar.appendChild(btnVaciar)
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
        pintarFooter()
    })

    let tdTotal = d.createElement('td')
    tdTotal.innerHTML = nPrecio
    footer.appendChild(tdTotal)
}

const pintarMinicarrito = () => {
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    let minicarrito = d.getElementById('minicarrito')
    minicarrito.querySelectorAll('span')[0].textContent = nCantidad
    minicarrito.querySelectorAll('span')[1].textContent = "$" + nPrecio
    

}

const Checkout = () => {
    section.innerHTML = ''
    //checkout.innerHTML = ''
    let div = d.createElement('div')
    div.classList = 'row contacto border'// averiguar la clase contacto
    section.appendChild(div)

    let div2 = d.createElement('div')
    div2.classList = 'col-md-12 col-lg-6 mx-auto pt-2 border  pb-3'
    div.appendChild(div2)
    
    let span = d.createElement('span')
    span.classList = 'text-secondary d-flex flex-row-reverse'
    //span.innerHTML = '1 de 2'
    div2.appendChild(span)

    let form = d.createElement('form')
    form.id = 'form'
    //form.action = true
    //form.method = 'POST'
    div2.appendChild(form)

    let divConfirm = d.createElement('div')
    divConfirm.id = 'confirmar'
    divConfirm.classList = 'col-md-12 col-lg-5 bg-gris pt-4  ps-0 '
    div.appendChild(divConfirm)

    CheckoutDato()
    // CheckoutPago()
     CheckoutConfirm()
    
}

const CheckoutDato = () => {
    
    let form = d.getElementById('form')
    form.innerHTML = ''

    let span = form.parentElement.firstChild
    console.log(span)
    span.innerHTML = '1 de 2'

    let div2 = d.createElement('div')
    div2.classList = 'pt-2'
    form.appendChild(div2)

    let h2 = d.createElement('h2')
    h2.innerHTML = 'Datos Personales'
    h2.classList = 'h4 border-bottom border-dark'
    div2.appendChild(h2)

    let nombre = d.createElement('label')
        nombre.innerHTML = 'Nombre'
        nombre.classList = 'mt-3 form-label'
        //for
        div2.appendChild(nombre)
    let nombreInp = d.createElement('input')
        nombreInp.classList = ' form-control'
        nombreInp.id = 'nombre'
        nombreInp.type = 'text'
        nombreInp.placeholder = 'Ingrese su Nombre.'
        //nombreInp.required = true
        div2.appendChild(nombreInp)
    let errNombre = d.createElement('span')
        errNombre.innerHTML = 'El nombre es obligatorio'
        errNombre.style.display = 'none'
        errNombre.classList = 'text-danger mt-1 ms-1'
        div2.appendChild(errNombre)

    let email = d.createElement('label')
        email.innerHTML = 'Email'
        email.classList = 'mt-3 form-label'
        // for
        div2.appendChild(email)
    let emailInp= d.createElement('input')
        emailInp.classList = 'form-control'
        emailInp.id = 'email' 
        emailInp.type = 'text'
        emailInp.placeholder = 'Ingrese su Email.'
        //emailInp.required = true
        div2.appendChild(emailInp)
    let errEmail = d.createElement('span')
        errEmail.innerHTML = 'El Email es obligatorio'
        errEmail.style.display = 'none'
        errEmail.classList = 'text-danger mt-1 ms-1'
        div2.appendChild(errEmail)

    let telefono = d.createElement('label')
        telefono.innerHTML = 'Telefono'
        telefono.classList = 'mt-3 form-label'
        div2.appendChild(telefono)
    let telefonoInp= d.createElement('input')
        telefonoInp.classList = ' form-control'
        telefonoInp.id = 'telefono'
        telefonoInp.type = 'text'
        telefonoInp.placeholder = 'Ingrese su numero de Telefono.'
        //telefonoInp.required = true
        div2.appendChild(telefonoInp)
    let errTel = d.createElement('span')
        errTel.innerHTML = 'El Telefono es obligatorio'
        errTel.style.display = 'none'
        errTel.classList = 'text-danger mt-1 ms-1'
        div2.appendChild(errTel)

    let envio = d.createElement('h2')
        envio.innerHTML = 'Envio'
        envio.classList = 'mt-3 h4 border-bottom border-dark ps-3'
        div2.appendChild(envio)

    let direccion = d.createElement('label')
        direccion.innerHTML = 'Direccion'
        direccion.classList = 'form-label mt-3'
        div2.appendChild(direccion)
    let direccionInp= d.createElement('input')
        direccionInp.classList = ' form-control'
        direccionInp.id = 'direccion'
        direccionInp.type = 'text'
        direccionInp.placeholder = 'Ingrese su Direccion.'
        //direccionInp.required = true
        div2.appendChild(direccionInp)
    let errDirecc = d.createElement('span')
        errDirecc.innerHTML = 'La direccion es obligatorio'
        errDirecc.style.display = 'none'
        errDirecc.classList = 'text-danger mt-1 ms-1'
        div2.appendChild(errDirecc)

    let fecha = d.createElement('label')
        fecha.innerHTML = 'Fecha de entrega'
        fecha.classList = 'form-label mt-3'
        div2.appendChild(fecha)
    let fechaInp = d.createElement('input')
        fechaInp.classList = 'form-control'
        fechaInp.id = 'fecha'
        fechaInp.type = 'date'
        //fechaInp.required = true
        div2.appendChild(fechaInp)
    let errFecha = d.createElement('span')
        errFecha.innerHTML = 'La Fecha es obligatoria'
        errFecha.style.display = 'none'
        errFecha.classList = 'text-danger mt-1 ms-1'
        div2.appendChild(errFecha)

    let costo = d.createElement('p')
        costo.innerHTML = 'Costo de Envio $600'
        costo.classList = 'h4 mt-3'
        div2.appendChild(costo)

    let divBtn = d.createElement('div')
        divBtn.classList = 'text-end'
        div2.appendChild(divBtn)

    let button = d.createElement('button')
        button.className = 'btn btn-primary'
        button.innerHTML = 'Siguiente'
        button.type = 'submit'
        divBtn.appendChild(button)

    button.addEventListener('click', e => { 
        /* if (nombreInp.value.length == 0 ){
                errNombre.style.display = 'block'
                nombreInp.classList ='form-control border-danger'
        }if (emailInp.value.length == 0 ){
            errEmail.style.display = 'block'
            emailInp.classList ='form-control border-danger'
        }if (telefonoInp.value.length == 0 ){
            errTel.style.display = 'block'
            telefonoInp.classList ='form-control border-danger'
        }if (direccionInp.value.length == 0 ){
            errDirecc.style.display = 'block'
            direccionInp.classList ='form-control border-danger'
        }if (fechaInp.value.length == 0 ){
            errFecha.style.display = 'block'
            fechaInp.classList ='form-control border-danger'        }
        else { */
            dato = {
                direccion: direccionInp.value,
                fecha: fechaInp.value,
            }
            //console.log(dato)
            localStorage.setItem('dato', JSON.stringify(dato))
            
            
            MetodoPago()
            //CheckoutConfirm()
            CheckoutSub()
        //}
    })
}

const MetodoPago = () => {

    let form = d.getElementById('form')
     form.innerHTML = ''

    let span = form.parentElement.firstChild
    console.log(span)
    span.innerHTML = '2 de 2'
    //form.appendChild(span)

    let div = d.createElement('div')
    div.id = 'metodo'
    div.classList = 'pt-2'
    form.appendChild(div)

    let divSeleccion = d.createElement('div')
    div.appendChild(divSeleccion)


    let h2 = d.createElement('h2')
    h2.innerHTML = 'Metodos de Pago'
    h2.classList = 'h4 border-bottom border-dark'
    divSeleccion.appendChild(h2)


    let divEfect = d.createElement('div')
        divEfect.id = 'divEfect'
        divEfect.classList = 'form-check border p-3 ps-5 mb-2'
        divSeleccion.appendChild(divEfect)
    let efectivo = d.createElement('label')
        efectivo.innerHTML = 'Efectivo'
        efectivo.classList = 'form-check-label'
        divEfect.appendChild(efectivo) 
    let efectInp = d.createElement('input')
        efectInp.classList = 'form-check-input'
        efectInp.type = 'radio'
        efectInp.name = 'radio'
        divEfect.appendChild(efectInp)

        efectInp.addEventListener('click', e => { 
            console.log(divEfect)
            Efectivo()
            
        })

    let divTarj = d.createElement('div')
        divTarj.id = 'divTarj'
        divTarj.classList = 'form-check border p-3 ps-5 mt-2'
        divSeleccion.appendChild(divTarj)
    let tarjeta = d.createElement('label')
        tarjeta.innerHTML = 'Tarjeta'
        tarjeta.classList = 'form-check-label'
        divTarj.appendChild(tarjeta)
    let tarjetaInp = d.createElement('input')
        tarjetaInp.classList = 'form-check-input'
        tarjetaInp.type = 'radio'
        tarjetaInp.name = 'radio'
        divTarj.appendChild(tarjetaInp)
    
        tarjetaInp.addEventListener('click', e => { 
            Tarjeta()
        })
    let datoTarjeta = d.createElement('div')
        divSeleccion.appendChild(datoTarjeta)


    let divBtn = d.createElement('div')
        divBtn.classList = 'text-end mt-3'
        div.appendChild(divBtn)

        let cancelar = d.createElement('button')
            cancelar.className = 'btn btn-danger'
            cancelar.innerHTML = 'Cancelar'
            divBtn.appendChild(cancelar)
    
            cancelar.addEventListener('click', e => { 
                CheckoutDato()
            })

            let siguiente = d.createElement('button')
            siguiente.className = 'btn btn-primary'
            siguiente.innerHTML = 'Siguiente'
            divBtn.appendChild(siguiente)
}

const Efectivo = () => {
let div = d.getElementById('metodo')
//let divBtn = div.lastChild
//let siguiente = divBtn.lastChild
let siguiente = div.lastChild.lastChild

let datoTarjeta = div.firstChild.lastChild
datoTarjeta.innerHTML = ''
   
    siguiente.addEventListener('click', e => { 
        pago = {
        tarjeta: 'Efectivo',
    }
    localStorage.setItem('pago', JSON.stringify(pago))

    CheckoutConfirm()
    CheckoutSub()
    })
 
}

const Tarjeta = () => {

let div = d.getElementById('metodo')
let divBtn = div.lastChild
//console.log(div.firstChild)
//let divSeleccion = div.firstChild
let siguiente = divBtn.lastChild

//let datoTarjeta = divSeleccion.lastChild
let datoTarjeta = div.firstChild.lastChild
datoTarjeta.innerHTML = ''

let divDni = d.createElement('div')
    divDni.classList = 'form-group mt-3'
    datoTarjeta.appendChild(divDni)
let documento = d.createElement('label')
    documento.innerHTML = 'Numero de su DNI' 
    documento.classList = 'mt-3 form-label'
    // for
    divDni.appendChild(documento)
let dniInp = d.createElement('input')
    dniInp.classList = 'form-control'
    dniInp.id = 'dni'
    dniInp.type = 'num' //checkear este campo
    dniInp.placeholder = 'Ingrese su DNI.'
    //dniInp.required = true
    divDni.appendChild(dniInp)
let errDni = d.createElement('span')
    errDni.innerHTML = 'El DNI es obligatorio'
    errDni.style.display = 'none'
    errDni.classList = 'text-danger mt-1 ms-1'
    divDni.appendChild(errDni)

let divNumTarj = d.createElement('div')
    divNumTarj.classList = 'form-group mb-3'
    datoTarjeta.appendChild(divNumTarj)
let tarjeta = d.createElement('label')
    tarjeta.innerHTML = 'Ingrese el numero de la tarjeta.'
    tarjeta.classList = 'mt-3 form-label'
    // for
    divNumTarj.appendChild(tarjeta)
let tarjetaInp = d.createElement('input')
    tarjetaInp.classList = 'form-control'
    tarjetaInp.id = 'tarjeta'
    tarjetaInp.type = 'num' // revisar este cararcter
    tarjetaInp.placeholder = 'Ej: xxxx xxxx xxxx xxxx'
    //tarjetaInp.required = true
    divNumTarj.appendChild(tarjetaInp)
let errtarj = d.createElement('span')
    errtarj.innerHTML = 'El numero de la tarjeta es obligatorio'
    errtarj.style.display = 'none'
    errtarj.classList = 'text-danger mt-1 ms-1'
    datoTarjeta.appendChild(errtarj)

let divseguri = d.createElement('div')
    divseguri.classList = 'form-group mt-3'
    datoTarjeta.appendChild(divseguri)
let seguridad = d.createElement('label')
    seguridad.innerHTML = 'ingrese los 3 numeros al reverso de su tarjeta' 
    seguridad.classList = 'mt-3 form-label'
    // for
    divseguri.appendChild(seguridad)
let seguriInp = d.createElement('input')
    seguriInp.classList = 'form-control'
    seguriInp.id = 'seguridad'
    seguriInp.type = 'num' //checkear este campo
    seguriInp.placeholder = 'Ej: 349'
    //seguriInp.required = true
    divseguri.appendChild(seguriInp)
let errSegu = d.createElement('span')
    errSegu.innerHTML = 'El codigo de seguridad es obligatorio'
    errSegu.style.display = 'none'
    errSegu.classList = 'text-danger mt-1 ms-1'
    divseguri.appendChild(errSegu)

// fecha de vencimiento
let divVenc = d.createElement('div')
    divVenc.classList = 'form-group mt-3'
    datoTarjeta.appendChild(divVenc)
let vencimiento = d.createElement('label')
    vencimiento.innerHTML = 'ingrese la fecha de vencimiento de su tarjeta' 
    vencimiento.classList = 'mt-3 form-label'
    // for
    divVenc.appendChild(vencimiento)
let vencInp = d.createElement('input')
    vencInp.classList = 'form-control'
    vencInp.id = 'vencimiento'
    vencInp.type = 'date' //checkear este campo
    //vencInp.required = true
    divVenc.appendChild(vencInp)
let errVenc = d.createElement('span')
    errVenc.innerHTML = 'El Vencimiento de la tarjeta es obligatorio'
    errVenc.style.display = 'none'
    errVenc.classList = 'text-danger mt-1 ms-1'
    divVenc.appendChild(errVenc)
    // cuotas
let divCuotas = d.createElement('div')
    divCuotas.classList = 'form-group mt-3'
    datoTarjeta.appendChild(divCuotas)
let cuotas = d.createElement('label')
    cuotas.innerHTML = 'ingrese la cantidad de cuotas' 
    cuotas.classList = 'mt-3 form-label'
    // for
    divCuotas.appendChild(cuotas)
let cuotasSelec = d.createElement('select')
    cuotasSelec.classList = 'form-select'
    cuotasSelec.id = 'cuotas'
    cuotasSelec.type = 'num' //checkear este campo
    //cuotasInp.placeholder = 'Ingrese la cantidad de cuotas'
    //cuotasSelec.required = true
    divCuotas.appendChild(cuotasSelec)    
    for (i=1; i<7; i++){
        let cuota = i
        if(i == 1){
            cuota +=' Cuota'
        } else {
            cuota +=' Cuotas'
        }
        let options = d.createElement('option')
        options.innerHTML = cuota
        cuotasSelec.appendChild(options)
    }
   
    siguiente.addEventListener('click', e => { 
    /* if (dniInp.value.length == 0 ){
            errDni.style.display = 'block'
            dniInp.classList ='form-control border-danger'
    }if (tarjetaInp.value.length == 0 ){
        errtarj.style.display = 'block'
        tarjetaInp.classList ='form-control border-danger'
    }if (seguriInp.value.length == 0 ){
        errSegu.style.display = 'block'
        seguriInp.classList ='form-control border-danger'
    }if (vencInp.value.length == 0 ){
        errVenc.style.display = 'block'
        vencInp.classList ='form-control border-danger'
    } else { */
        pago = {
        tarjeta: tarjetaInp.value,
        //fecha: inputTarj.value
    }
    //console.log(pago)
    localStorage.setItem('pago', JSON.stringify(pago))

    
    CheckoutConfirm()
    CheckoutSub()
    //}
    })

}

const CheckoutConfirm = () => {  
    let checkoutConfirm = d.getElementById('confirmar')
    
     checkoutConfirm.innerHTML = ''

        let h2 = d.createElement('h2')
        h2.innerHTML = 'Productos:'
        h2.classList = 'h4 ps-3'
        checkoutConfirm.appendChild(h2)

        let divConfir = d.createElement('div')
        divConfir.classList = 'checkout container mt-4 mb-4'
        checkoutConfirm.appendChild(divConfir)

        Object.values(carrito).forEach(producto => {
            
            let ul = d.createElement('ul')
            ul.classList = 'row text-center ps-1 border-white align-items-center'
            divConfir.appendChild(ul)

            let liI = d.createElement('li')
            liI.classList = 'd-inline col-3 mx-auto pb-1'
            ul.appendChild(liI)

                let img = d.createElement('img')
                img.src = aVelas[producto.id].imagen
                img.alt = 'vela en envase de vidrio'
                img.style.setProperty("max-width", "50px")
                liI.appendChild(img)

            let liN = d.createElement('li')
            liN.innerHTML = aVelas[producto.id].nombre
            liN.classList = 'd-inline col-3  mx-auto pb-1'
            ul.appendChild(liN)

            let liC = d.createElement('li')
            liC.innerHTML =producto.cantidad
            liC.classList = 'd-inline col-3  mx-auto pb-1'
            ul.appendChild(liC)
            
            let liT = d.createElement('li') 
            liT.innerHTML = producto.cantidad * aVelas[producto.id].precio
            liT.classList = 'd-inline col-3  mx-auto pb-1'
            ul.appendChild(liT)
        })

        const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
        //console.log(nPrecio)

        let divFoot = d.createElement('div')
        divFoot.classList = 'container pb-3 '
        checkoutConfirm.appendChild(divFoot)

        let ul = d.createElement('ul')
        ul.classList = 'row ps-1 '
        ul.id = 'subdatos'
        divFoot.appendChild(ul)

            let subtotal = d.createElement('li')
            subtotal.innerHTML= 'Subtotal'
            subtotal.id = 'subtotal'
            subtotal.classList = 'd-inline col-6 pb-1 h6 text-secondary'
            ul.appendChild(subtotal)

            let subtotalDato = d.createElement('li')
            subtotalDato.innerHTML = '$ ' + nPrecio
            subtotalDato.classList = 'd-inline col-6 text-end pb-1'
            ul.appendChild(subtotalDato)

            let envio = d.createElement('li')
            envio.innerHTML = 'Envio'
            envio.classList = 'd-inline col-6 h6 text-secondary pb-1'
            ul.appendChild(envio)

            let envioDato = d.createElement('li')
            envioDato.innerHTML = '$600'
            envioDato.classList = 'd-inline col-6 text-end pb-1'
            ul.appendChild(envioDato)

            let total  = d.createElement('li')
            total.innerHTML= 'Total'
            total.classList = 'd-inline col-6 h5 pb-1'
            ul.appendChild(total)

            let totalDato = d.createElement('li')
            totalDato.innerHTML = '$ ' + (nPrecio + 600)
            totalDato.classList = 'd-inline col-6 h4 text-end pb-1'
            ul.appendChild(totalDato)

        let divBtn = d.createElement('div')
        divBtn.classList = 'text-end'
        divFoot.appendChild(divBtn)

        /* let cancelar = d.createElement('button')
        cancelar.className = 'btn btn-danger'
        cancelar.innerHTML = 'Cancelar'
        divBtn.appendChild(cancelar)
        cancelar.addEventListener('click', e => { 
            sectionProductos()
        })

        let aceptar = d.createElement('button')
        aceptar.className = 'btn btn-success'
        aceptar.innerHTML = 'Aceptar'
        divBtn.appendChild(aceptar)

        aceptar.addEventListener('click', e => { 
            carrito = {}
            seccionExito()
            pintarMinicarrito()
        }) */
        
}

const CheckoutSub = () => {

    let ul = d.getElementById('subdatos')
    let subtotal = d.getElementById('subtotal')
    let divBtn =  ul.parentElement.lastChild
    
    if(localStorage.getItem('dato') ){
        dato = JSON.parse(localStorage.getItem('dato'))
        
        let direc = d.createElement('li')
        direc.innerHTML= 'Direccion'
        direc.classList = 'd-inline col-6 h6 text-secondary pb-1'
        ul.insertBefore(direc, subtotal)
    let direcDato = d.createElement('li')
        direcDato.innerHTML = dato.direccion
        direcDato.classList = 'd-inline col-6 h6 text-end text-secondary pb-1'
        ul.insertBefore(direcDato, subtotal)

    let entrega = d.createElement('li')
        entrega.innerHTML= 'Fecha de entrega'
        entrega.classList = 'd-inline col-6 h6 text-secondary pb-1'
        ul.insertBefore(entrega, subtotal)
    let entregaDato = d.createElement('li')
        entregaDato.innerHTML= dato.fecha
        entregaDato.classList = 'd-inline col-6 text-end text-secondary pb-1'
        ul.insertBefore(entregaDato, subtotal)
    }

    if(localStorage.getItem('pago') ){
        pago = JSON.parse(localStorage.getItem('pago'))

        let metodo = d.createElement('li')
        metodo.innerHTML= 'Metodo de pago:'
        metodo.classList = 'd-inline col-6 h6 text-secondary pb-1'
        //ul.appendChild(metodo)
        ul.insertBefore(metodo, subtotal)

    let pagoDato = d.createElement('li')
        //pagoDato.innerHTML = 'Visa 1234 en 6 Cuotas'
        pagoDato.innerHTML = pago.tarjeta
        pagoDato.classList = 'd-inline col-6 text-end text-secondary pb-1'
        //ul.appendChild(pagoDato)
        ul.insertBefore(pagoDato, subtotal)

        let cancelar = d.createElement('button')
            cancelar.className = 'btn btn-danger'
            cancelar.innerHTML = 'Cancelar'
            divBtn.appendChild(cancelar)
            cancelar.addEventListener('click', e => { 
                sectionProductos()
            })

            let aceptar = d.createElement('button')
            aceptar.className = 'btn btn-success'
            aceptar.innerHTML = 'Aceptar'
            divBtn.appendChild(aceptar)

            aceptar.addEventListener('click', e => { 
                carrito = {}
                seccionExito()
                pintarMinicarrito()
            })
    }
}

seccionExito = () => {
section.innerHTML = ''

let div = d.createElement('div')
    div.classList = 'text-center m-3 p-3'
    section.appendChild(div)

    let img = d.createElement('img')
    img.src = 'img/icons/cheque.png'
    img.alt = 'Checkout'
    img.classList = 'p-2'
    div.appendChild(img)
    // Alt

let h2 = d.createElement('h2')
    h2.innerHTML = '¡Todo Listo!'
    div.appendChild(h2)

let p = d.createElement('p')
    p.innerHTML = 'Tu compra se realizó con Exito.'
    p.classList = 'text-secondary'
    div.appendChild(p)

let btnHome = d.createElement('button')
    btnHome.classList = 'btn btn-primary'
    btnHome.innerHTML = 'Volver al Home.' 
    div.appendChild(btnHome)
    btnHome.addEventListener('click', e => { 
        sectionHome()
    })

let btnSeguir = d.createElement('button')
    btnSeguir.classList = 'btn btn-success'
    btnSeguir.innerHTML = 'Seguir Comprando' 
    div.appendChild(btnSeguir)
    btnSeguir.addEventListener('click', e => { 
        sectionProductos()
    })


}


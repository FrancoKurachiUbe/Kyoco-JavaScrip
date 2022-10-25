
const d = document
const cards = d.getElementById('cards')
const items = d.getElementById('items')
const ampliar = d.getElementById('ampliar')
//const checkout = d.getElementById('checkout')
const checkoutDatos = d.getElementById('checkoutDatos')
const checkoutConfirm = d.getElementById('checkoutConfirm')

const btnHome = d.getElementById('homeVer')
const btnProductos = d.getElementById('productoVer')
const btnContacto = d.getElementById('contactoVer')
const btnCarrito = d.getElementById('carrito')

/* secciones del html */
const home = d.getElementById('home')
const contacto = d.getElementById('contacto')
const sectionProductos = d.getElementById('sectionProductos')
const sectionCarrito = d.getElementById('sectionCarrito')
const sectionCheckout = d.getElementById('sectionCheckout')
const sectionGracias = d.getElementById('sectionGracias')
const sectionAmpliar = d.getElementById('sectionAmpliar')

sectionCheckout.style.display = "none"; // esto cambia a none
home.style.display = "none"; //esto se borra

contacto.style.display = "none";
sectionProductos.style.display = "none";
sectionAmpliar.style.display = "none";
sectionCarrito.style.display = "block"; // esto cambia a none 

sectionGracias.style.display = "none";

/* Footer del Carrito */
const footer = d.getElementById('footer')
const aceptarCompra = d.getElementById('aceptarCompra')

const btnGracias = d.getElementById('graciasCompra')//????

/*???*/ const fragment = d.createDocumentFragment()
let carrito = {}
/* let dato = {
    direccion: null,
    fecha:null,
    tarjeta:null
} */
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

/*-------Eventos de los Botones-------*/
d.addEventListener('DOMContentLoaded', () => { fetchData()
if(localStorage.getItem('carrito')){
    carrito= JSON.parse(localStorage.getItem('carrito'))
    pintarCarrito()
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

/* Interaciones de Botones */
cards.addEventListener('click', e => { addCarrito(e) })
cards.addEventListener('click', e => { addAmpliar(e) })
ampliar.addEventListener('click', e => { addCarrito(e) })
items.addEventListener('click', e => { btnAumentarDisminuir(e) })
/* checkoutDatos.addEventListener('click', e => { addDatos(e) }) 
checkoutConfirm.addEventListener('click', e => { addDatos(e) }) */

//btnGracias.addEventListener('click', e => { VerGracias(e) })
// Botones del Menu
btnHome.addEventListener('click', e => { VerHome(e) })
btnProductos.addEventListener('click', e => { VerProducto(e) })
btnContacto.addEventListener('click', e => { VerContacto(e) })
btnCarrito.addEventListener('click', e => { VerCarrito(e) })

const fetchData = async () =>  {
    try {
        pintarCards(aVelas)
    } catch {
        console.log('error')
    }
}

/*--------- Productos ---------*/
const pintarCards = aVelas => {
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
        // Falta el alt de la imagen
        div2.appendChild(img);
    })
}

/*--------- Ampliar ---------*/
const addAmpliar = e => {
    if (e.target.classList.contains('btn-outline-dark')) {
        setAmpliar(e.target.parentElement)
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
    ampliar.innerHTML = ""
    sectionAmpliar.style.display = "block";
    sectionProductos.style.display = "none";

    let div = d.createElement('div')
    div.classList = "card_ampliado"
    ampliar.appendChild(div)

    let div2 = d.createElement('div')
    div.appendChild(div2)
    
    let img = d.createElement('img')
    img.src = aVelas[id].imagen
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

/*--------- Carrito ---------*/
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
    pintarCarrito()
}

const pintarCarrito = () => {
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
       //falta el alt de la imagen
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
   pintarFooter()
   pintarMinicarrito()
   btnaceptar()

   localStorage.setItem('carrito', JSON.stringify(carrito))
   console.log(carrito)
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

    if(e.target.classList.contains('btn-danger')) {
        carrito[e.target.dataset.id]
        //console.log(carrito[e.target.dataset.id])
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `<th>Carrito Vacio</th>`
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    let thProductos = d.createElement('th')
    thProductos.innerHTML = 'Total Productos'
    footer.appendChild(thProductos)

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
    btnVaciar.className = 'btn btn-danger btn-sm'
    tdVaciar.appendChild(btnVaciar)
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
        //Checkout()// revisar y sacar
        btnCompra()
    })

    let tdTotal = d.createElement('td')
    tdTotal.innerHTML = nPrecio
    footer.appendChild(tdTotal)


}
// Boton Aceptar del carrito de compras.
const btnaceptar = () => {
    aceptarCompra.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        aceptarCompra.innerHTML= ``
        return
    }

    let btnCompra = d.createElement('button')
    btnCompra.innerHTML = 'Aceptar'
    btnCompra.className =  'btn btn-success'
    aceptarCompra.appendChild(btnCompra)
    btnCompra.addEventListener('click', e => { VerComprar(e)
    CheckoutDato()
    CheckoutConfirm()
})
}

/*--------- Mini Carrito ---------*/
const pintarMinicarrito = () => {
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    let minicarrito= d.getElementById('minicarrito')
    minicarrito.querySelectorAll('span')[0].textContent = nCantidad
    minicarrito.querySelectorAll('span')[1].textContent = "$" + nPrecio
}

/* const Checkout = () => {
    checkout.innerHTML = ''
    let divGeneral = d.createElement('div')
    divGeneral.classList = 'col-md-12 col-lg-6 mx-auto pt-2 border  pb-3'
    checkout.appendChild(divGeneral)
    
    let span = d.createElement('span')
    span.classList = 'text-secondary d-flex flex-row-reverse'
    span.innerHTML = '2 de 2'
    divGeneral.appendChild(span)

    let form = d.createElement('form')
    form.id = 'form'
    divGeneral.appendChild(form)

    let divConfirm = d.createElement('div')
    divConfirm.id = 'confirmar'
    divConfirm.classList = 'col-md-12 col-lg-5 bg-gris pt-4  ps-0'
    divGeneral.appendChild(divConfirm)

    CheckoutDato()
    
} */

const CheckoutDato = () => {
    checkoutDatos.innerHTML = ''

    let span = d.createElement('span')
    span.classList = 'text-secondary d-flex flex-row-reverse'
    span.innerHTML = '2 de 2'
    checkoutDatos.appendChild(span)

    let form = d.createElement('form')
    form.id = 'form'
    checkoutDatos.appendChild(form)

    let div2 = d.createElement('div')
    div2.classList = 'pt-2'
    form.appendChild(div2)

    let h2 = d.createElement('h2')
    h2.innerHTML = 'Datos Personales'
    h2.classList = 'h4 border-bottom border-dark'
    div2.appendChild(h2)

    let nombre = d.createElement('label')
    nombre.innerHTML = 'Nombre'
    nombre.classList = 'form-label'
    // for
    div2.appendChild(nombre)
    let nombreInp = d.createElement('input')
    // type.
    // Id.
    // place Holder.
    nombreInp.classList = 'mb-3 form-control'
    div2.appendChild(nombreInp)

    let email = d.createElement('label')
    email.innerHTML = 'Email'
    email.classList = 'form-label'
    div2.appendChild(email)
    let emailInp= d.createElement('input')
    // type.
    // Id.
    // place Holder.
    emailInp.classList = 'mb-3 form-control'
    div2.appendChild(emailInp)

    let telefono = d.createElement('label')
    telefono.innerHTML = 'Telefono'
    telefono.classList = 'form-label'
    div2.appendChild(telefono)
    let telefonoInp= d.createElement('input')
    // type.
    // Id.
    // place Holder.
    telefonoInp.classList = 'mb-3 form-control'
    div2.appendChild(telefonoInp)

    let envio = d.createElement('h2')
    envio.innerHTML = 'Envio'
    envio.classList = 'h4 border-bottom border-dark ps-3'
    div2.appendChild(envio)

    let direccion = d.createElement('label')
    direccion.innerHTML = 'Direccion'
    direccion.classList = 'form-label'
    div2.appendChild(direccion)
    let direccionInp= d.createElement('input')
    // type.
    
    // place Holder.
    direccionInp.id = 'direccion'
    direccionInp.classList = 'mb-3 form-control'
    div2.appendChild(direccionInp)

    let fecha = d.createElement('label')
    fecha.innerHTML = 'Fecha de entrega'
    fecha.classList = 'form-label'
    div2.appendChild(fecha)
    let fechaInp = d.createElement('input')
    // type.
    
    // place Holder.
    fechaInp.id = 'fecha'
    fechaInp.classList = 'mb-3 form-control'
    div2.appendChild(fechaInp)

    let costo = d.createElement('p')
    costo.innerHTML = 'Costo de Envio $600'
    div2.appendChild(costo)

    let divBtn = d.createElement('div')
    divBtn.classList = 'text-end'
    div2.appendChild(divBtn)

    let button = d.createElement('button')
    button.className = 'btn btn-success'
    button.innerHTML = 'Siguiente'
    divBtn.appendChild(button)

    button.addEventListener('click', {

    })
    button.addEventListener('click', e => { 
         dato = {
            direccion: direccionInp.value,
            fecha: fechaInp.value,
        }
        console.log(dato)
        localStorage.setItem('dato', JSON.stringify(dato))
        
        CheckoutPago()
        CheckoutConfirm()
        CheckoutSub()
        
    })
}

/* const addDatos = e => {
    if (e.target.classList.contains('btn-success')) {
        console.log(e.target.parentElement.parentElement.parentElement)
        setDatos(e.target.parentElement.parentElement.parentElement)
    }
    e.stopPropagation() 
}


const setDatos = objeto => {
    
    const datos = {
        direccion: objeto.querySelector('#direccion').value,
        fecha: objeto.querySelector('#fecha').value,
        tarjeta: objeto.querySelector('#tarjeta').value
    }
    console.log(datos)
    CheckoutPago()
    CheckoutConfirm()
} */


const CheckoutPago = () => {

    let form = d.getElementById('form')
     form.innerHTML = ''
    
    let div = d.createElement('div')
    div.classList = 'pt-2'
    form.appendChild(div)

    let h2 = d.createElement('h2')
    h2.innerHTML = 'Metodos de Pago'
    h2.classList = 'h4 border-bottom border-dark'
    div.appendChild(h2)

    // Efectivo
    // Tarjeta
    // DNI
    let divTarj = d.createElement('div')
    divTarj.classList = 'form-group mb-3'
    div.append(divTarj)
    let labelTarj = d.createElement('label')
    labelTarj.classList = 'form-label'
    labelTarj.innerHTML = 'Numero de la Tarjeta'
    // for
    divTarj.appendChild(labelTarj)
    let inputTarj = d.createElement('input')
    inputTarj.classList = 'mb-3 form-control'
    // type
    inputTarj.id = 'tarjeta'
    // placeholder
    divTarj.appendChild(inputTarj)

    let divBtn = d.createElement('div')
    divBtn.classList = 'text-end'
    div.appendChild(divBtn)

    let cancelar = d.createElement('button')
    cancelar.className = 'btn btn-danger'
    cancelar.innerHTML = 'Cancelar'
    divBtn.appendChild(cancelar)

    let siguiente = d.createElement('button')
    siguiente.className = 'btn btn-success'
    siguiente.innerHTML = 'Siguiente'
    divBtn.appendChild(siguiente)

    cancelar.addEventListener('click', e => { 
        CheckoutDato()
        /* let direccionInfo = direccionInp.value
        console.log(direccionInfo) */
    })

    siguiente.addEventListener('click', e => { 
        pago = {
           tarjeta: inputTarj.value,
           //fecha: inputTarj.value
       }
       //console.log(pago)
       localStorage.setItem('pago', JSON.stringify(pago))
       
       CheckoutPago()
       CheckoutConfirm()
       CheckoutSub()
       
   })

}




const CheckoutConfirm = () => {  
     
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
            liT.innerHTML =producto.cantidad * aVelas[producto.id].precio
            liT.classList = 'd-inline col-3  mx-auto pb-1'
            ul.appendChild(liT)
        })

        const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
        //console.log(nPrecio)

        let divFoot = d.createElement('div')
        divFoot.classList = 'container  border-top bottom-0  pb-3'
        checkoutConfirm.appendChild(divFoot)

        let ul = d.createElement('ul')
        ul.classList = 'row ps-1'
        ul.id = 'subdatos'
        divFoot.appendChild(ul)

            let subtotal = d.createElement('li')
            subtotal.innerHTML= 'Subtotal'
            subtotal.id = 'subtotal'
            subtotal.classList = 'd-inline col-6 pb-1 h6 text-secondary'
            ul.appendChild(subtotal)

            let subtotalDato = d.createElement('li')
            subtotalDato.innerHTML = '$15000'
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
            totalDato.innerHTML = '$15600'
            totalDato.classList = 'd-inline col-6 h4 text-end pb-1'
            ul.appendChild(totalDato)

        let divBtn = d.createElement('div')
        divBtn.classList = 'text-end'
        divFoot.appendChild(divBtn)

        let button = d.createElement('button')
        button.className = 'btn btn-success'
        button.innerHTML = 'Aceptar'
        divBtn.appendChild(button)
}

const CheckoutSub = () => {
    if(localStorage.getItem('dato') ){
        dato= JSON.parse(localStorage.getItem('dato'))
        
    }
    if(localStorage.getItem('pago') ){
        pago= JSON.parse(localStorage.getItem('pago'))
    }  
    //console.log(dato)

    let ul = d.getElementById('subdatos')
    let subtotal = d.getElementById('subtotal')
    
    let direc = d.createElement('li')
        direc.innerHTML= 'Direccion'
        direc.classList = 'd-inline col-6 h6 text-secondary pb-1'
        ul.insertBefore(direc, subtotal)
    let direcDato = d.createElement('li')
        direcDato.innerHTML = dato.direccion
        //direcDato.innerHTML = 'direccion'
        direcDato.classList = 'd-inline col-6 h6 text-end text-secondary pb-1'
        ul.insertBefore(direcDato, subtotal)

    let entrega = d.createElement('li')
        entrega.innerHTML= 'Fecha de entrega'
        entrega.classList = 'd-inline col-6 h6 text-secondary pb-1'
        ul.insertBefore(entrega, subtotal)
    let entregaDato = d.createElement('li')
        entregaDato.innerHTML= dato.fecha
        //entregaDato.innerHTML= 'fecha'
        entregaDato.classList = 'd-inline col-6 text-end text-secondary pb-1'
        ul.insertBefore(entregaDato, subtotal)
    
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
}

// Botones para ver las secciones del HTMl.
const VerCarrito = e => {
    if(e.target.classList.contains('btn-link')) {
            sectionCarrito.style.display = "block";
            home.style.display = "none";
            contacto.style.display = "none";
            sectionProductos.style.display = "none";
            sectionCheckout.style.display = "none";
            sectionGracias.style.display = "none";
            sectionAmpliar.style.display = "none";
    }
}
const VerProducto = e => {
    if(e.target.classList.contains('nav-link')) {
            sectionProductos.style.display = "block";
            home.style.display = "none";
            contacto.style.display = "none";
            sectionCarrito.style.display = "none";
            sectionCheckout.style.display = "none";
            sectionGracias.style.display = "none";
            sectionAmpliar.style.display = "none";
    }
}
const VerComprar = e => {
    if(e.target.classList.contains('btn-success')) {
            sectionCheckout.style.display = "block";
            home.style.display = "none";
            contacto.style.display = "none";
            sectionProductos.style.display = "none";
            sectionCarrito.style.display = "none";
            sectionGracias.style.display = "none";
            sectionAmpliar.style.display = "none";
    }
}
const VerGracias = e => {
    if(e.target.classList.contains('btn')) {
        sectionGracias.style.display = "block";
        home.style.display = "none";
        contacto.style.display = "none";
        sectionProductos.style.display = "none";
        sectionCarrito.style.display = "none";
        sectionCheckout.style.display = "none";
        sectionAmpliar.style.display = "none";

    }
}
const VerHome = e => {
    if(e.target.classList.contains('nav-link')) {
        home.style.display = "block";
        contacto.style.display = "none";
        sectionProductos.style.display = "none";
        sectionCarrito.style.display = "none";
        sectionCheckout.style.display = "none";
        sectionGracias.style.display = "none";
        sectionAmpliar.style.display = "none";
        
    }
}

const VerContacto = e => {
    if(e.target.classList.contains('nav-link')) {
        contacto.style.display = "block";
        home.style.display = "none";
        sectionProductos.style.display = "none";
        sectionCarrito.style.display = "none";
        sectionCheckout.style.display = "none";
        sectionGracias.style.display = "none";
        sectionAmpliar.style.display = "none";
        
    }
}





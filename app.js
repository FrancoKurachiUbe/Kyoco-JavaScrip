
const d = document
const cards = d.getElementById('cards')
const items = d.getElementById('items')
const ampliar = d.getElementById('ampliar')
const checkout = d.getElementById('checkout')

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

sectionCheckout.style.display = "block"; // esto cambia a none
home.style.display = "none"; //esto se borra

contacto.style.display = "none";
sectionProductos.style.display = "none";
sectionAmpliar.style.display = "none";
sectionCarrito.style.display = "none";

sectionGracias.style.display = "none";

/* Footer del Carrito */
const footer = d.getElementById('footer')
const aceptarCompra = d.getElementById('aceptarCompra')

const btnGracias = d.getElementById('graciasCompra')//????

/*???*/ const fragment = d.createDocumentFragment()
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

/*-------Eventos de los Botones-------*/
d.addEventListener('DOMContentLoaded', () => { fetchData()
if(localStorage.getItem('carrito')){
    carrito= JSON.parse(localStorage.getItem('carrito'))
    pintarCarrito()
    } 
})

/* Interaciones de Botones */
cards.addEventListener('click', e => { addCarrito(e) })
cards.addEventListener('click', e => { addAmpliar(e) })
ampliar.addEventListener('click', e => { addCarrito(e) })
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

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
    //Checkout() //creo que no va
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
   //Checkout() //creo que no va tampoco
   btnaceptar()

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
    Checkout()})
}

/*--------- Mini Carrito ---------*/
const pintarMinicarrito = () => {
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    let minicarrito= d.getElementById('minicarrito')
    minicarrito.querySelectorAll('span')[0].textContent = nCantidad
    minicarrito.querySelectorAll('span')[1].textContent = "$" + nPrecio
}

const Checkout = () => {
    /* checkout.innerHTML= ''

    let divDatos = d.createElement('div')
    divDatos.classList = 'col-6 mx-auto pt-2 border'
    checkout.appendChild(divDatos)

        let span = d.createElement('span')
        span.classList = 'text-secondary d-flex flex-row-reverse'
        span.innerHTML = '1 de 2'
        divDatos.appendChild(span) 


    // Confirmar Datos y aceptar compra.
     let divConfir = d.createElement('div')
    divConfir.classList = 'col-5 bg-gris p-3 checkout'
    checkout.appendChild(divConfir)

        let h2 = d.createElement('h2')
        h2.innerHTML = 'Productos:'
        h2.classList = 'h5'
        divConfir.appendChild(h2)

        

        Object.values(carrito).forEach(producto => {
            
            let ul = d.createElement('ul')
            ul.classList = 'row text-center ps-1'
            divConfir.appendChild(ul)

            let liI = d.createElement('li')
            liI.classList = 'd-inline col-3  border-white mx-auto pb-1'
            ul.appendChild(liI)

                let img = d.createElement('img')
                img.src = aVelas[producto.id].imagen
                img.style = 'max-with: 50px'//Esto no funciona
                liI.appendChild(img)

            let liN = d.createElement('li')
            liN.innerHTML = aVelas[producto.id].nombre
            liN.classList = 'd-inline col-3  border-white mx-auto pb-1'
            ul.appendChild(liN)

            let liC = d.createElement('li')
            liC.innerHTML =producto.cantidad
            liC.classList = 'd-inline col-3  border-white mx-auto pb-1'
            ul.appendChild(liC)
            
            let liT = d.createElement('li') 
            liT.innerHTML =producto.cantidad * aVelas[producto.id].precio
            liT.classList = 'd-inline col-3  border-white mx-auto pb-1'
            ul.appendChild(liT)
        })
    
    
        const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
        console.log(nPrecio)

        let subTotal = d.createElement('p')
        subTotal.innerHTML = 'Subtotal: $'
        //subTotal.className = 'h4 text-secondary'
        divConfir.appendChild(subTotal)

        let spanSubTotal = d.createElement('span')
        spanSubTotal.innerHTML = nPrecio
        subTotal.appendChild(spanSubTotal)

        let envio = d.createElement('p')
        //envio.className = 'h4 text-secondary'
        envio.innerHTML = 'Envio: $600'
        divConfir.appendChild(envio)

        let total = d.createElement('p')
        //total.className = 'h2 pt-2'
        total.innerHTML = 'Total: $'
        divConfir.appendChild(total)

        let spanTotal = d.createElement('span')
        spanTotal.innerHTML = nPrecio + 600
        total.appendChild(spanTotal)

        let button = d.createElement('button')
        button.className = 'btn btn-success'
        button.innerHTML = 'Aceptar'
        divConfir.appendChild(button) */

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





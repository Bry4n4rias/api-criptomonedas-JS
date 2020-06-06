const ui = new Interfaz();
const cotizador = new Api('8175135f7ee7f0e28f6c8686c9e09ca093062ef4de74efb8c5ebe339d8d417b8')

cotizador.obtenerMonedasApi()
ui.construirSelect()


//LEER FORMULARIO

const formulario = document.querySelector('#formulario')

formulario.addEventListener('submit', (e) =>{
    e.preventDefault()

    //leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda')
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value

    //leer la criptomoneda seleccionada
    const criptoSelect = document.querySelector('#criptomoneda')
    const criptoSeleccionada = criptoSelect.options[criptoSelect.selectedIndex].value

    //comprobar q ambos campos tengan algo seleccionada{
    if(monedaSeleccionada === '' || criptoSeleccionada === ''){
        //arrojar alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text center')


    }else{
        // bien, podemos consultar la api
        cotizador.obtenerValores(monedaSeleccionada, criptoSeleccionada)
            .then(data => {//resultado ya en json del llamado a la rest
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoSeleccionada)
            })
    }
})

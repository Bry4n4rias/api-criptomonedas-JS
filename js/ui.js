
class Interfaz {


    construirSelect(){
        cotizador.obtenerMonedasApi()//como este metodo llamado es un aync await lleva promises
            .then(moneda =>{

                const select = document.querySelector('#criptomoneda')

                for(const[key, value] of Object.entries(moneda.monedas.Data)){//cuando tengamos un objetos con muchos objetos adentro debemos de organizarlo asi, alamacenar la llave y el valor y despues darle object,entries a la propiedad a la cual queremos iterar, en este caso seria (moneda.monedas.Data)
                    //agregar el symbol y el nombre como opciones del select

                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName))//es lo mismo q hacer inerText
                    select.appendChild(opcion)
                }  
            })
    }

    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div')
        div.className = clases
        div.appendChild(document.createTextNode(mensaje))

        //seleccionar mensajes
        const  divMensaje = document.querySelector('.mensajes')
        divMensaje.appendChild(div)

        //mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove()
        }, 3000); 
    }

    //imprimir resultado cotizacion
    mostrarResultado(resultado, moneda, crypto){//aca esta tomando 3 valores por el resultado q da el rest

        //volver a hacer una consulta y q se borre la q ya esta impresa
        const resultadoAnterior = document.querySelector('#resultado > div')
        if(resultadoAnterior){
            resultadoAnterior.remove()
        }

        const  datosMoneda = resultado[crypto][moneda]

        //recaortar a 2 digitos el precio
        let precio = datosMoneda.PRICE.toFixed(2)
        let porcentaje =datosMoneda.CHANGEPCTDAY.toFixed(2)
        let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX')//Asi cogemos una fecha con numeros largos y la convertimos a fecha local
        console.log(actualizado);
        //construir template
        let templateHtml = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                    <p>Variacion ultimo dia: % ${porcentaje}</p>
                    <p>Ultima actualizacion: % ${actualizado}</p>
                </div>
            </div> 

        `
        this.mostrarSpiner()//asi llamamos un metodo dentro de la misma clase

        setTimeout( () => {
            document.querySelector('#resultado').innerHTML = templateHtml
            
        }, 3000)
        
        
        
    }

    mostrarSpiner(){
        const spinner = document.querySelector('.contenido-spinner')
        spinner.style.display = 'block'

        setTimeout( () => {
            spinner.style.display = 'none'

            
        }, 3000)

    }
}
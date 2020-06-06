class Api {

    constructor(apiKey){
        this.apiKey = apiKey
    }

    //obtener todas las monedas
    async obtenerMonedasApi(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_Key=${this.apiKey}`

        //fetch a la api
        const urlObtenerMonedas = await fetch(url)

        //repuesta en json
        const monedas = await urlObtenerMonedas.json()//este es como el primer fetch

        //monedas es lcomo si fuera la primera respuesta del fetch, q es donde nos dice si se hizo el llamado correcto, para llamarla despues utilizamos el otro fetch para poder ya interactura con el objeto en si
        return{
            monedas
        }
    }

    async obtenerValores(moneda, criptomoneda){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_Key=${this.apiKey}`//asi me convierte de una moneda a una criptomoneda

        //consulta en REST api

        const urlConvertir = await fetch(url)
        const resultado = await urlConvertir.json()

        return{
            resultado
        }
    }
} 
'use strict'
var fs = require('fs')
class ChatbotController {
    async index({response}){
        let hola = {tipo:"negro"}
        
        return response.json(hola)
    }

    async archivoInicial({request,response}){
        const archivo = request.only(['prueba', 'nombre', 'tipo'] )
        this.guardarArchivo(archivo)
        console.log(archivo)
        return response.status(200).json(archivo)
    }
    async obtenerArchivoInicial({response}){
        let archivo = await this.leerArchivo()
        return response.json(archivo)
    }
    
    async preguntar({request,response}){
        
        const archivo = request.only(['pregunta'] )

        return response.json(archivo)
    }

    guardarArchivo(json){
        fs.writeFile("test.txt", JSON.stringify(json) , function(err) { 
            if(err) { 
            return console.log(err); 
            } 
        })
    }
    leerArchivo(){
        return new Promise( archivo =>{
            let texto;
             fs.readFile('test.txt', 'utf-8', (err, data) => {
                if(err) {
                  console.log('error: ', err);
                } else {
                  texto = JSON.parse(data) 
                  archivo((texto))
                }
              });
        })
    }




}

module.exports = ChatbotController

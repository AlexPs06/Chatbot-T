'use strict'
var fs = require('fs')
var AIMLInterpreter = require('AIMLInterpreter')





// let leerArchivo = new Promise( archivo =>{
//     let texto;
//      fs.readFile('config.txt', 'utf-8', (err, data) => {
//         if(err) {
//           console.log('soy error');

//           console.log('error: ', err);
//           archivo(false)
//         } else {
//           texto = JSON.parse(data) 
//           archivo((texto))
//         }
//       });
// })
let aiml 
var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'}); 

function leerArchivo (){
    return new Promise( archivo =>{
        let texto;
         fs.readFile('config.txt', 'utf-8', (err, data) => {
            if(err) {
              console.log('soy error');

              console.log('error: ', err);
              archivo(false)
            } else {
              texto = JSON.parse(data) 
              aiml=texto

              archivo((texto))
            } 
          });
    })
};

leerArchivo().then( function(){
    aimlInterpreter= new AIMLInterpreter({name:'WireInterpreter', age:'43'});        
    aimlInterpreter.loadAIMLFilesIntoArray([String(aiml.archivo)]);
})



 
let respuesta;
class ChatbotController {
    async index({response}){
        let hola = {tipo:"negro"}
        
        return response.json(hola)
    }

    async archivoInicial({request,response}){
        const archivo = request.only(['prueba', 'nombre', 'archivo'] )
        if(archivo.nombre==null){
            return response.status(500).json({data:'Sin nombre de archivo'})
        }
        this.guardarArchivo(archivo)
        aiml = archivo
        return response.status(200).json(archivo)
    }
    async obtenerArchivoInicial({response}){
        if(aiml == false){
            return response.status(404).json({data:'Sin archivo inicial'})
        }
        let archivo = await this.leerArchivo()
        return response.json(archivo)
    }
    
    async preguntar({request,response}){
        if(aiml == false){
            return response.status(404).json({data:'Sin archivo inicial'})
        }
        const archivo = request.only(['pregunta'] )
        if(archivo.pregunta ==null){
            return response.status(404).json({data:'Sin pregunta'})

        }
        let respuesta = await this.hacerPregunta(archivo)
        return response.json(respuesta)
    }

    hacerPregunta(archivo){
        return new Promise( response =>{
            
            aimlInterpreter.findAnswerInLoadedAIMLFiles(String(archivo.preguntar), this.callback);
            
            response(respuesta)
        })
    }

    guardarArchivo(json){
        fs.writeFile("config.txt", JSON.stringify(json) , function(err) { 
            if(err) { 
            return console.log(err); 
            } 
        })
    }
    leerArchivo(){
        return new Promise( archivo =>{
            let texto;
             fs.readFile('config.txt', 'utf-8', (err, data) => {
                if(err) {
                  console.log('error: ', err);
                  archivo(false)
                } else {
                  texto = JSON.parse(data) 
                  archivo((texto))
                }
              });
        })
    }
    callback(answer, wildCardArray, input){
        console.log(answer + ' | ' + wildCardArray + ' | ' + input);
        respuesta = answer;
    };



}

module.exports = ChatbotController

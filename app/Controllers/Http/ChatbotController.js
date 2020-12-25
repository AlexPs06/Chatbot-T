'use strict'
var fs = require('fs')
const path = require('path')

var AIMLInterpreter = require('AIMLInterpreter')


let aiml = null
var aimlInterpreter=null //= new AIMLInterpreter({name:'WireInterpreter', age:'42'}); 
// aimlInterpreter.loadAIMLFilesIntoArray(['test.aiml.xml']);

function leerArchivoConfiguracion (){
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

leerArchivoConfiguracion().then( function(){
    aimlInterpreter= new AIMLInterpreter({name:String(aiml.nombre), age:'43'});        
    // aimlInterpreter.loadAIMLFilesIntoArray([String(aiml.archivo)]);
})

 
let respuesta;

//Clase ChatbotController
class ChatbotController {
    async index({response}){
        let hola = {tipo:"hola"}
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
        if(aiml == null){
            return response.status(404).json({data:'Sin archivo inicial'})
        }
        let archivo = await this.leerArchivo()
        return response.json(archivo)
    }
    
    async actualizarChatbot({request,response}){

        var data = []
        
        const directoryPath = "C:\\Users\\luis_\\Documents\\maestria\\Inteligencia artificial\\APIAdministrador\\archivosAIML"//cambiar url a donde se ubique la base de conocimientos 

        try { 
            var ls=fs.readdirSync(directoryPath);

            for (let index = 0; index < ls.length; index++) {
                
                const file = path.join(directoryPath, ls[index]);
                var dataFile =null;
                try{
                    dataFile = fs.lstatSync(file);
                }catch(e){
                    return response
                    .status(err.status)
                    .send(err)
                }
                if(dataFile){
                    data.push({
                        path: file,
                        isDirectory: dataFile.isDirectory(),
                        length: dataFile.size,
                        name: ls[index]
                    });
                }
            }

            for (let i = 0; i < data.length; i++) {
                aimlInterpreter.loadAIMLFilesIntoArray([String(data[i].path)]);
            }

            return response.json("Termine el entrenamiento");
            

        } catch (err) {
            return response
            .status(400)
            .send(err)
        }

    }


    async preguntar({request,response}){
        if(aiml == null){
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
            aimlInterpreter.findAnswerInLoadedAIMLFiles(String(archivo.pregunta), this.callback);
            
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

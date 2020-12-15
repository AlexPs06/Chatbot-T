'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() =>{
  //Primer parámetro es la ruta, el segundo parámetro es la función que corresponde la ruta.
  Route.get('hola','ChatbotController.index')
  Route.post('archivo','ChatbotController.archivoInicial')
  Route.get('archivo','ChatbotController.obtenerArchivoInicial')
  Route.post('preguntar','ChatbotController.preguntar')
  Route.get('entrenar','ChatbotController.actualizarChatbot')

// Prefix dice a quién le pertenece las rutas
} ).prefix('chatbot')


Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

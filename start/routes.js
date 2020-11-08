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
  Route.get('hola','ChatbotController.index')
  Route.post('archivo','ChatbotController.archivoInicial')
  Route.get('archivo','ChatbotController.obtenerArchivoInicial')
  Route.post('pregunta','ChatbotController.preguntar')


} ).prefix('chatbot')


Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

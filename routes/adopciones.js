import express from 'express';
import adopcionesController from '../controllers/adopciones.js';

const route = express.Router();

// Crear una nueva solicitud de adopción
route.post('/', adopcionesController.create);

// Obtener todas las solicitudes
route.get('/', adopcionesController.getAll);

// Actualizar el estado de una solicitud
route.put('/:id', adopcionesController.updateStatus);

export default route;

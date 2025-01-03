import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import adopcionesController from '../controllers/adopciones.js';

const route = express.Router();

// Crear una nueva solicitud de adopción (solo usuarios autenticados con rol 'adoptante')
route.post('/', authenticateToken, authorizeRole('adoptante'), adopcionesController.create);

// Obtener todas las solicitudes (solo para administradores)
route.get('/', authenticateToken, authorizeRole('admin'), adopcionesController.getAll);

// Actualizar el estado de una solicitud (solo para administradores)
route.put('/:id', authenticateToken, authorizeRole('admin'), adopcionesController.updateStatus);

export default route;


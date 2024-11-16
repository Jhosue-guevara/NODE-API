import express from 'express';
import mascotaController from '../controllers/mascotas.js'; // Asegúrate de importar el controlador.

const route = express.Router();

// Rutas para las operaciones CRUD.
route.post('/', mascotaController.create);
route.get('/:id', mascotaController.getOne);
route.get('/', mascotaController.getAll);
route.put('/:id', mascotaController.update);
route.delete('/:id', mascotaController.delete);

export default route;


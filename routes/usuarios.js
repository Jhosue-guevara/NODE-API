import express from 'express';
import usuariosController from '../controllers/usuarios.js';

const route = express.Router();

// Rutas para los usuarios
route.post('/register', usuariosController.create); // Registro
route.post('/login', usuariosController.login); // Inicio de sesión
route.get('/', usuariosController.getAll); // Obtener todos los usuarios

export default route;

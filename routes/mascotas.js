import express from 'express';
import axios from 'axios'; // Para descargar la imagen
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticateToken } from '../middleware/auth.js';
import mascotasController from '../controllers/mascotas.js';

const route = express.Router();

// Define __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas protegidas
route.post('/', authenticateToken, mascotasController.create); // Solo usuarios autenticados pueden crear mascotas
route.get('/', mascotasController.getAll); // Ruta pública para obtener todas las mascotas
route.get('/:id', mascotasController.getOne); // Ruta pública para obtener una mascota específica por ID
route.put('/:id', authenticateToken, mascotasController.update); // Ruta protegida para actualizar mascotas
route.delete('/:id', authenticateToken, mascotasController.delete); // Ruta protegida para eliminar mascotas

// Ruta para subir una foto desde una URL
route.post('/:id/foto-url', authenticateToken, async (req, res) => {
    const { id } = req.params; // ID de la mascota
    const { fotoUrl } = req.body; // URL de la imagen a subir

    try {
        // Asegúrate de que la carpeta 'uploads' existe
        const uploadsDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Descarga la imagen desde la URL
        const response = await axios({
            url: fotoUrl,
            method: 'GET',
            responseType: 'stream', // Descargar como flujo de datos
        });

        // Genera un nombre único para la imagen
        const filename = `${Date.now()}-${path.basename(fotoUrl)}`;
        const filepath = path.join(uploadsDir, filename);

        // Guarda la imagen en el servidor
        const writer = fs.createWriteStream(filepath);
        response.data.pipe(writer);

        // Espera a que se complete la escritura del archivo
        writer.on('finish', async () => {
            const relativePath = `/uploads/${filename}`;
            const result = await mascotasController.addPhoto(id, relativePath);

            res.status(200).json({
                status: 'foto-agregada',
                fotoUrl: relativePath,
                result,
            });
        });

        writer.on('error', (error) => {
            res.status(500).json({
                message: 'Error al guardar la imagen',
                error: error.message,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al procesar la imagen',
            error: error.message,
        });
    }
});

export default route;


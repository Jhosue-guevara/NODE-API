import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import Mascotas from './models/mascotas.js'; // Importa la clase Mascotas
import Usuarios from './models/usuarios.js'; // Importa la clase Usuarios
import Adopciones from './models/adopciones.js'; // Importa la clase Adopciones
import mascotaRoutes from './routes/mascotas.js';
import usuarioRoutes from './routes/usuarios.js';
import adopcionesRoutes from './routes/adopciones.js'; // Importa las rutas de adopciones
import dbClient from './config/dbClient.js'; // Importa la conexión a la base de datos

// Definir __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crea la instancia de la aplicación Express
const app = express();
app.use(express.json()); // Middleware para manejar JSON

// Sirve la carpeta de imágenes como estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

(async () => {
    try {
        // Conecta a la base de datos
        await dbClient.conectarBD();

        // Crea las instancias de los modelos después de conectar la base de datos
        const mascotasModel = new Mascotas();
        const usuariosModel = new Usuarios();
        const adopcionesModel = new Adopciones();

        // Conecta las rutas
        app.use('/mascotas', mascotaRoutes);
        app.use('/usuarios', usuarioRoutes);
        app.use('/adopciones', adopcionesRoutes);

        // Configura el puerto
        const PORT = process.env.PORT || 3000;

        // Inicia el servidor
        app.listen(PORT, () => {
            console.log(`Servidor activo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error.message);
    }
})();

import express from 'express';
import 'dotenv/config';
import Mascotas from './models/mascotas.js'; // Importa la clase (no la instancia).
import mascotaRoutes from './routes/mascotas.js';
import dbClient from './config/dbClient.js'; // Importa la conexión a la base de datos.

const app = express();
app.use(express.json());

(async () => {
    try {
        // Conecta a la base de datos.
        await dbClient.conectarBD();

        // Crea la instancia del modelo después de conectar la base de datos.
        const mascotasModel = new Mascotas();

        // Pasa el modelo como dependencia al enrutador si es necesario (opcional).
        app.use('/mascotas', mascotaRoutes);

        // Configura el puerto.
        const PORT = process.env.PORT || 3000;

        // Inicia el servidor.
        app.listen(PORT, () => {
            console.log(`Servidor activo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error.message);
    }
})();

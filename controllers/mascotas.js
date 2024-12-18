import Mascotas from '../models/mascotas.js';

let mascotasModel; // Instancia global que será inicializada después de la conexión a la base de datos.

class MascotasController {
    constructor() {}

    // Método para crear una nueva mascota.
    async create(req, res) {
        try {
            if (!mascotasModel) {
                mascotasModel = new Mascotas(); // Instancia el modelo si no está inicializado.
            }

            const data = req.body; // Obtiene los datos enviados en el cuerpo de la solicitud.
            const result = await mascotasModel.create(data); // Llama al método 'create' del modelo.
            res.status(201).json({ status: 'create-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la mascota', error: error.message });
        }
    }

    // Método para obtener todas las mascotas.
    async getAll(req, res) {
        try {
            if (!mascotasModel) {
                mascotasModel = new Mascotas();
            }

            const result = await mascotasModel.getAll(); // Llama al método 'getAll' del modelo.
            res.status(200).json({ status: 'get-all-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener mascotas', error: error.message });
        }
    }

    // Método para obtener una mascota específica por su ID.
    async getOne(req, res) {
        try {
            if (!mascotasModel) {
                mascotasModel = new Mascotas();
            }

            const { id } = req.params; // Obtiene el ID de los parámetros de la solicitud.
            const result = await mascotasModel.getOne(id); // Llama al método 'getOne' del modelo.
            if (!result) {
                return res.status(404).json({ message: 'Mascota no encontrada' });
            }
            res.status(200).json({ status: 'get-one-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la mascota', error: error.message });
        }
    }

    // Método para actualizar una mascota específica por su ID.
    async update(req, res) {
        try {
            if (!mascotasModel) {
                mascotasModel = new Mascotas();
            }

            const { id } = req.params; // Obtiene el ID de los parámetros de la solicitud.
            const data = req.body; // Obtiene los datos enviados en el cuerpo de la solicitud.
            const result = await mascotasModel.update(id, data); // Llama al método 'update' del modelo.

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Mascota no encontrada para actualizar' });
            }

            res.status(200).json({ status: 'update-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la mascota', error: error.message });
        }
    }

    // Método para eliminar una mascota específica por su ID.
    async delete(req, res) {
        try {
            if (!mascotasModel) {
                mascotasModel = new Mascotas();
            }

            const { id } = req.params; // Obtiene el ID de los parámetros de la solicitud.
            const result = await mascotasModel.delete(id); // Llama al método 'delete' del modelo.

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Mascota no encontrada para eliminar' });
            }

            res.status(200).json({ status: 'delete-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la mascota', error: error.message });
        }
    }

    // Método para agregar una foto a una mascota.
    async addPhoto(id, fotoUrl) {
        try {
            if (!mascotasModel) {
                mascotasModel = new Mascotas();
            }

            const result = await mascotasModel.update(id, { fotoUrl }); // Actualiza el campo fotoUrl en el documento.
            res.status(200).json({ status: 'foto-agregada', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar foto', error: error.message });
        }
    }
}

export default new MascotasController(); // Exporta una instancia del controlador.


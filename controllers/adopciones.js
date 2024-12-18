import Adopciones from '../models/adopciones.js';

let adopcionesModel;

class AdopcionesController {
    constructor() {}

    async create(req, res) {
        try {
            if (!adopcionesModel) {
                adopcionesModel = new Adopciones();
            }

            const { usuarioId, mascotaId, comentarios } = req.body;

            const result = await adopcionesModel.create({
                usuarioId,
                mascotaId,
                comentarios,
                fechaSolicitud: new Date(),
                estado: "pendiente", // Valores: pendiente, aceptada, rechazada
            });

            res.status(201).json({ status: 'solicitud-creada', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la solicitud', error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            if (!adopcionesModel) {
                adopcionesModel = new Adopciones();
            }

            const result = await adopcionesModel.getAll();
            res.status(200).json({ status: 'get-all-solicitudes', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener solicitudes', error: error.message });
        }
    }

    async updateStatus(req, res) {
        try {
            if (!adopcionesModel) {
                adopcionesModel = new Adopciones();
            }

            const { id } = req.params;
            const { estado } = req.body; // Estado: aceptada o rechazada

            const result = await adopcionesModel.updateStatus(id, estado);

            res.status(200).json({ status: 'estado-actualizado', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar estado', error: error.message });
        }
    }
}

export default new AdopcionesController();

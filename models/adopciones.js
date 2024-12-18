import dbClient from '../config/dbClient.js';
import { ObjectId } from 'mongodb';

class Adopciones {
    constructor() {
        if (!dbClient.db) {
            throw new Error("La base de datos no está conectada");
        }
        this.collection = dbClient.db.collection('adopciones');
    }

    async create(data) {
        try {
            return await this.collection.insertOne(data);
        } catch (error) {
            console.error("Error al crear solicitud de adopción:", error.message);
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.collection.find().toArray();
        } catch (error) {
            console.error("Error al obtener solicitudes:", error.message);
            throw error;
        }
    }

    async updateStatus(id, estado) {
        try {
            return await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { estado } }
            );
        } catch (error) {
            console.error("Error al actualizar estado de la solicitud:", error.message);
            throw error;
        }
    }
}

export default Adopciones;

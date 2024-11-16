import { ObjectId } from 'mongodb'; // Importa ObjectId desde mongodb
import dbClient from '../config/dbClient.js';

class Mascotas {
    constructor() {
        if (!dbClient.db) {
            throw new Error("La base de datos no está conectada");
        }
        this.collection = dbClient.db.collection('mascotas');
    }

    // Método para crear una nueva mascota.
    async create(data) {
        try {
            return await this.collection.insertOne(data);
        } catch (error) {
            console.error("Error al crear mascota:", error.message);
            throw error;
        }
    }

    // Método para obtener todas las mascotas.
    async getAll() {
        try {
            return await this.collection.find().toArray();
        } catch (error) {
            console.error("Error al obtener todas las mascotas:", error.message);
            throw error;
        }
    }

    // Método para obtener una mascota específica por su ID.
    async getOne(id) {
        try {
            return await this.collection.findOne({ _id: new ObjectId(id) }); // Usa ObjectId
        } catch (error) {
            console.error("Error al obtener mascota:", error.message);
            throw error;
        }
    }

    // Método para actualizar una mascota por su ID.
    async update(id, data) {
        try {
            return await this.collection.updateOne(
                { _id: new ObjectId(id) }, // Usa ObjectId
                { $set: data }
            );
        } catch (error) {
            console.error("Error al actualizar mascota:", error.message);
            throw error;
        }
    }

    // Método para eliminar una mascota por su ID.
    async delete(id) {
        try {
            return await this.collection.deleteOne({ _id: new ObjectId(id) }); // Usa ObjectId
        } catch (error) {
            console.error("Error al eliminar mascota:", error.message);
            throw error;
        }
    }
}

export default Mascotas;


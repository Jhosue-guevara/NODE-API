import { ObjectId } from 'mongodb'; // Importa ObjectId desde mongodb
import dbClient from '../config/dbClient.js';

class Mascotas {
    constructor() {
        if (!dbClient.db) {
            throw new Error("La base de datos no está conectada");
        }
        this.collection = dbClient.db.collection('mascotas'); // Accede a la colección 'mascotas'
    }

    // Método para crear una nueva mascota.
    async create(data) {
        try {
            return await this.collection.insertOne(data); // Inserta un documento en la colección
        } catch (error) {
            console.error("Error al crear mascota:", error.message);
            throw error;
        }
    }

    // Método para obtener todas las mascotas.
    async getAll() {
        try {
            return await this.collection.find().toArray(); // Devuelve un array con todos los documentos
        } catch (error) {
            console.error("Error al obtener todas las mascotas:", error.message);
            throw error;
        }
    }

    // Método para obtener una mascota específica por su ID.
    async getOne(id) {
        try {
            return await this.collection.findOne({ _id: new ObjectId(id) }); // Busca por ObjectId
        } catch (error) {
            console.error("Error al obtener mascota:", error.message);
            throw error;
        }
    }

    // Método para actualizar una mascota por su ID.
    async update(id, data) {
        try {
            return await this.collection.updateOne(
                { _id: new ObjectId(id) }, // Filtro por ObjectId
                { $set: data } // Aplica los cambios
            );
        } catch (error) {
            console.error("Error al actualizar mascota:", error.message);
            throw error;
        }
    }

    // Método para eliminar una mascota por su ID.
    async delete(id) {
        try {
            return await this.collection.deleteOne({ _id: new ObjectId(id) }); // Elimina por ObjectId
        } catch (error) {
            console.error("Error al eliminar mascota:", error.message);
            throw error;
        }
    }

    // Método para filtrar mascotas por criterios (opcional).
    async filter(criteria) {
        try {
            return await this.collection.find(criteria).toArray(); // Filtra usando un criterio
        } catch (error) {
            console.error("Error al filtrar mascotas:", error.message);
            throw error;
        }
    }

    // Método para actualizar solo el campo de la foto de una mascota.
    async updatePhoto(id, fotoUrl) {
        try {
            return await this.collection.updateOne(
                { _id: new ObjectId(id) }, // Filtro por ObjectId
                { $set: { fotoUrl } } // Actualiza solo el campo 'fotoUrl'
            );
        } catch (error) {
            console.error("Error al actualizar foto de mascota:", error.message);
            throw error;
        }
    }
}

export default Mascotas;


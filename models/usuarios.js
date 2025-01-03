import dbClient from '../config/dbClient.js';
import { ObjectId } from 'mongodb';

class Usuarios {
    constructor() {
        if (!dbClient.db) {
            throw new Error("La base de datos no está conectada");
        }
        this.collection = dbClient.db.collection('usuarios');
    }

    // Crear un nuevo usuario
    async create(data) {
        try {
            return await this.collection.insertOne(data); // data debe incluir email, password, y rol
        } catch (error) {
            console.error("Error al crear usuario:", error.message);
            throw error;
        }
    }

    // Obtener todos los usuarios
    async getAll() {
        try {
            return await this.collection.find().toArray();
        } catch (error) {
            console.error("Error al obtener usuarios:", error.message);
            throw error;
        }
    }

    // Obtener un usuario por ID
    async getOne(id) {
        try {
            return await this.collection.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error al obtener usuario:", error.message);
            throw error;
        }
    }

    // Actualizar un usuario por ID
    async update(id, data) {
        try {
            return await this.collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: data }
            );
        } catch (error) {
            console.error("Error al actualizar usuario:", error.message);
            throw error;
        }
    }

    // Eliminar un usuario por ID
    async delete(id) {
        try {
            return await this.collection.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error al eliminar usuario:", error.message);
            throw error;
        }
    }

    // Buscar usuario por email (para login)
    async findByEmail(email) {
        try {
            return await this.collection.findOne({ email });
        } catch (error) {
            console.error("Error al buscar usuario:", error.message);
            throw error;
        }
    }

    // Buscar usuarios por rol
    async findByRole(role) {
        try {
            return await this.collection.find({ rol: role }).toArray();
        } catch (error) {
            console.error("Error al buscar usuarios por rol:", error.message);
            throw error;
        }
    }

    // Verificar si un email ya está registrado
    async emailExists(email) {
        try {
            const user = await this.collection.findOne({ email });
            return !!user;
        } catch (error) {
            console.error("Error al verificar email:", error.message);
            throw error;
        }
    }
}

export default Usuarios;


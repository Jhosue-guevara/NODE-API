import Usuarios from '../models/usuarios.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let usuariosModel; // Inicialización diferida del modelo.

class UsuariosController {
    constructor() {}

    // Registro de un nuevo usuario
    async create(req, res) {
        try {
            if (!usuariosModel) {
                usuariosModel = new Usuarios(); // Instancia solo si aún no existe.
            }

            const { nombre, email, password, telefono, direccion, rol } = req.body;

            // Verificar si el email ya está registrado.
            const existingUser = await usuariosModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "El email ya está registrado" });
            }

            // Encriptar la contraseña.
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el usuario.
            const result = await usuariosModel.create({
                nombre,
                email,
                password: hashedPassword,
                telefono,
                direccion,
                rol: rol || 'adoptante', // Rol por defecto: adoptante
            });

            res.status(201).json({ status: 'create-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
        }
    }

    // Inicio de sesión (login)
    async login(req, res) {
        try {
            if (!usuariosModel) {
                usuariosModel = new Usuarios(); // Instancia el modelo si no está inicializado.
            }

            const { email, password } = req.body;

            // Buscar al usuario por email
            const user = await usuariosModel.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            // Verificar la contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            // Generar un token JWT
            const token = jwt.sign(
                { id: user._id, rol: user.rol },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Token válido por 1 hora
            );

            res.status(200).json({ status: 'login-ok', token });
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
        }
    }

    // Obtener todos los usuarios
    async getAll(req, res) {
        try {
            if (!usuariosModel) {
                usuariosModel = new Usuarios(); // Instancia el modelo si no está inicializado.
            }

            const result = await usuariosModel.getAll(); // Obtener todos los usuarios
            res.status(200).json({ status: 'get-all-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
        }
    }

    // Obtener un usuario por ID
    async getOne(req, res) {
        try {
            if (!usuariosModel) {
                usuariosModel = new Usuarios();
            }

            const { id } = req.params; // ID del usuario
            const result = await usuariosModel.getOne(id);
            if (!result) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.status(200).json({ status: 'get-one-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
        }
    }

    // Actualizar datos de un usuario
    async update(req, res) {
        try {
            if (!usuariosModel) {
                usuariosModel = new Usuarios();
            }

            const { id } = req.params; // ID del usuario
            const data = req.body; // Nuevos datos del usuario

            const result = await usuariosModel.update(id, data);
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Usuario no encontrado para actualizar" });
            }

            res.status(200).json({ status: 'update-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
        }
    }

    // Eliminar un usuario
    async delete(req, res) {
        try {
            if (!usuariosModel) {
                usuariosModel = new Usuarios();
            }

            const { id } = req.params; // ID del usuario

            const result = await usuariosModel.delete(id);
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Usuario no encontrado para eliminar" });
            }

            res.status(200).json({ status: 'delete-ok', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
        }
    }
}

export default new UsuariosController(); // Exporta una instancia del controlador

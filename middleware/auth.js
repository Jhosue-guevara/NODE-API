import jwt from 'jsonwebtoken';

/**
 * Middleware para autenticar el token JWT.
 * Verifica si el token es válido y extrae la información del usuario.
 */
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Obtiene el encabezado Authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token requerido.' });
    }

    const token = authHeader.split(' ')[1]; // Extrae el token del formato "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        req.user = user; // Almacena la información del usuario decodificada en la solicitud
        next();
    });
};

/**
 * Middleware para autorizar usuarios según su rol.
 * Verifica si el usuario tiene el rol necesario para acceder a una ruta específica.
 * @param {string} role - El rol requerido para acceder a la ruta.
 */
export const authorizeRole = (role) => (req, res, next) => {
    if (!req.user || req.user.rol !== role) {
        return res.status(403).json({ message: 'Permiso denegado. Rol no autorizado.' });
    }
    next();
};

/**
 * Middleware para autorizar múltiples roles.
 * Permite el acceso a usuarios que tengan uno de los roles especificados.
 * @param {Array<string>} roles - Los roles permitidos para acceder a la ruta.
 */
export const authorizeRoles = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
        return res.status(403).json({ message: 'Permiso denegado. Rol no autorizado.' });
    }
    next();
};

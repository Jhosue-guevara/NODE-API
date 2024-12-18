import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Obtiene el token del encabezado Authorization
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token requerido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        req.user = user; // Almacena la información del usuario decodificada en la solicitud
        next();
    });
};

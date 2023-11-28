import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const key = 'WS-KEY'

export const createHash = async (password) => { return await bcrypt.hashSync(password, 10) }

export const isValidPassword = async (user, password) => { return await bcrypt.compare(password, user.password) }

export const generateToken = (user) => {
    const token = jwt.sign({ user }, key, { expiresIn: '15m' })
    return token
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'Not authenticated' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, key, (error, credentials) => {
        if (error) return res.status(403).send({ error: 'Not authorized' });

        req.user = credentials.user;

        next();
    })
}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: "El token no existe o no es valido" })
    }

    try {
        const decodedToken = jwt.verify(token, key)
        req.user = decodedToken.user
        next();
    }

    catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
}
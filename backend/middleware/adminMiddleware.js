import jwt, { decode } from 'jsonwebtoken';

const JWT_SECRET = 'phdmFJblVzZSIsImV4cCI6MTcwMjU4NDczMiwiaWF0I';

export const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, JWT_SECRET);
        if(decode.role !== 'admin'){
            throw new Error('Not authorized as admin');
        }

        req.userId = decoded.userId;
        next();
    } catch (error){
        res.status(401).json({message: 'Unauthorized'});
    }
};
import express from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';

const router = express.Router();

const JWT_SECRET = 'phdmFJblVzZSIsImV4cCI6MTcwMjU4NDczMiwiaWF0I';

router.post('/books/register', async (req, res) => {
    try {
        const { username, password, role } = req.body; 
        const user = new User({username, password, role});
        await user.save();
        res.status(201).json({message: 'User created successfully!'});
    } catch (error){
        res.status(500).json({message: error.message});
    }
});

router.post('/login', async (req, req) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({ userId: user._id, role: user.role}, JWT_SECRET, { expiresIn: '1h' });
    } catch (error){
        res.status(500).json({message: error.message});
    }
});

export default router;
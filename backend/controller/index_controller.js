import User from '../models/user.js'
import Disposer from '../models/disposer.js'
import { generateToken } from '../config/jwtUtils.js'

export const signup = async (req, res) => {
    try {
        let user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
        if (user) {
            return res.status(409).json({ error: 'User already exists!'});
        }
        
        user = await User.create(req.body);

        return res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });
    }
}

export const create_session = async (req, res) => {
    try {
        const { emailUsername, password } = req.body;
        let user = await User.findOne({ $or: [{ email: emailUsername }, { username: emailUsername }] });
        
        if (!user || password !== user.password) {
            return res.status(401).json({ error: 'Invalid Email/Username or Password!' });
        }

        const token = generateToken(user);
        return res.status(200).json({ token: token });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
};

// Profile details of the user
export const profile = async (req, res) => {
    try {
        let user = await User.findById(req.user.id, {name: 1, username: 1, email: 1, role: 1, contact: 1, address: 1, location: 1});
        if (user.role === 'Disposer') {
            let disposer = await Disposer.findOne({ username: req.user.id });
            user = {...user, processing_methods: disposer.processing_methods, quantity: disposer.quantity, license_number: disposer.license_number};
            let wasteTypes = await WastePrice.find({ disposer: req.params.id });
            user = {...user, wasteTypes: wasteTypes};
        }
        return res.status(200).json({ message: 'User found!', user: user });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}

// Update the user's profile
export const update_profile = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        await User.findByIdAndUpdate(
            { _id: req.user.id },
            req.body,
            { new: true }
        );
        if (user.role === 'Disposer') {
            await Disposer.findOneAndUpdate(
                { username: req.user.username },
                req.body,
                { new: true }
            );
        }
        return res.status(200).json({ message: 'User data updated!' });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}

// Profile details of Disposer
export const disposer_profile = async (req, res) => {
    try {
        let user = await User.findById(req.params.id, {name: 1, username: 1, email: 1, role: 1, contact: 1, address: 1, location: 1});
        let disposer = await Disposer.findOne({ username: req.user.id });
        user = {...user, processing_methods: disposer.processing_methods, quantity: disposer.quantity, license_number: disposer.license_number};
        let wasteTypes = await WastePrice.find({ disposer: req.params.id });
        user = {...user, wasteTypes: wasteTypes};
        return res.status(200).json({ message: 'User found!', user: user });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}

// Check if username is valid
export const checkUsername = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(200).json({ message: 'Username is valid!' });
        }
        return res.status(409).json({ error: 'Username is invalid!'});

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });
    }
}
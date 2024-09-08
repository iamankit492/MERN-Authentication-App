// Import the User model from the models directory.
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


// Define an asynchronous function 'signup' to handle user registration.
export const signup = async (req, res, next) => {

    // Extract 'username', 'email', and 'password' from the request body.
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new User instance with the extracted data.
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        // Save the new user instance to the database.
        await newUser.save();

        // Send a 201 status response indicating successful creation, along with a message.
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }

};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
           const validPassword = bcryptjs.compareSync(password, validUser.password);
           if(!validPassword) return next(errorHandler(400, 'wrong credentials'));
           const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
           const { password: pass, ...rest } = validUser._doc;
                       const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day from now
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
               .status(200)
               .json(rest);
        }
     catch (error) {
        next(error);
    }

};
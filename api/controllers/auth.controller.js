// Import the User model from the models directory.
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';


// Define an asynchronous function 'signup' to handle user registration.
export const signup = async (req, res) => {

    // Extract 'username', 'email', and 'password' from the request body.
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);

    // Create a new User instance with the extracted data.
    const newUser = new User({ username, email, password:hashedPassword });
try{
 // Save the new user instance to the database.
 await newUser.save();

 // Send a 201 status response indicating successful creation, along with a message.
 res.status(201).json({ message: 'User created successfully' });
}catch(error){
    res.status(500).json(error.message);
}
   
};

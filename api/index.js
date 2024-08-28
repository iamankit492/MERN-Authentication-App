import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("conected to mongoDB");
}).catch((err)=>{
console.log(err);
});
app.listen(3000, () => {
    console.log("server is listening on the port 3000");
});

app.use("/api/user",userRoutes);
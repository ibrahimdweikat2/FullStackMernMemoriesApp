import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import User from '../models/User.js';


export const signIn = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const existingEmail=await User.findOne({email});
        if(!existingEmail) return res.status(404).json({message:'Email Not Found'});
        const isPasswordCorrect = await bcrypt.compare(password,existingEmail.password);
        if(!isPasswordCorrect) return res.status(400).json({message:'Password Not Correct'});
        const token=jwt.sign({email:existingEmail.email,id:existingEmail._id},'test',{expiresIn:'1h'});
        res.status(200).json({result:existingEmail,token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}


export const signUp = async (req, res) =>{
    const {email,password,confirmPassword,firstName,lastName} =req.body;

    try {
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exists"});
        if(password !== confirmPassword) return res.status(400).json({message:"Password is incorrect"});
        const hashPassword = await bcrypt.hash(password,12);
        const result= await User.create({email,password:hashPassword,name:`${firstName} ${lastName}`});
        const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'1h'});
        res.status(200).json({result,token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}
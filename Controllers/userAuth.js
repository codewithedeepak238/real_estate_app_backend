import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";
import USER from "../Models/userMode.js";


export const handleSignUp = async (req, res)=>{
    const body = req.body
    const {fullName, email, password} = body;
    if(!body) return res.status(400).json({ error: "Enter Mandatory Details!!" });
    
    try{
        
    // Hash the password
    const hashedPass = await bcyrpt.hash(password, 10);

    // Create new user to save in DB
    const newUser = await USER.create({
        fullName: fullName,
        email: email,
        password: hashedPass
    })
    return res.status(201).json({"Success": true, "status": 201})}
    catch(err){
        return res.status(500).json({message: "Problem in creating a user"})
    }
}

export const handleSignIn = async (req, res)=>{
    const body = req.body;
    if(!body) return res.status(400).json({ message: "Invalid Credentials" });
    const {email, password} = body;
    try{

    //Find user in DB
    const user = await USER.findOne({email});
    if(!user) return res.status(400).json({ message: "Invalid Credentials"});
    
    //Match hashed password
    const isPassword = await bcyrpt.compare(password, user.password);
    if(!isPassword) return res.status(400).json({ message: "Invalid Credentials" });

    //Generate cookie token and send to the user
    const age = 1000*60*60*24*7;

    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET_KEY, {expiresIn:age});

    return res.cookie("token", token, {
        httOnly:true,
        maxAge:age
    }).status(200).json({message:"Login Successfull", data:{username:user.fullName, email:user.email, avatar:user.avatar}, "status": 201})

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Failed to Login!"})
    }

}

export const logOut = async (req, res)=>{
    return res.clearCookie("token").status(200).json({message:"Logout Successfull!", status:200})
}
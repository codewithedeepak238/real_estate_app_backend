import jwt from "jsonwebtoken"

//Middleware
export async function isAuthorized(req, res, next){
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message:"Not Authorized"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload)=>{
        if (err) return res.status(403).json({message:"Token is not Valid!"});
    })
    res.status(200).json({message: "You are Authenticated!"});
    next()
}

export const handleAuthorization = (req, res)=>{
    return res.json({message: "OK"})
}
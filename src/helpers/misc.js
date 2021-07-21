import jwt  from "jsonwebtoken";
import bcrypt from 'bycrpt'
import statusCodes from "../utils/statusCodes";
import twilioConfig from "../config/twilioConfig";

const { client } = twilioConfig;
 
const successResponse = ( res, statusCode, message, token, data) => res.status(statusCode).json({
    message,
    token,
    data,
})

const errorResponse = (res, statusCode, error) => res.status(statusCode).json({ error });

const returnErrorMessages = (errors, res, next) => {
    if (errors) {
        const {details} = errors
        const errorMessages =details.map(error => error.message.replace(/['"]/g, '')).join(', ');
    }
    return next()
}

const generateToken = async () => {
    const token = jwt.sign(
        data,
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '30d'
        },
    );
    return token;
}

const generateOTP = async () => {
    const otp = Math.floor(100000 + (Math.random() * 900000))
    return otp
};

const sendOTP = async (phone, message) => {
    await client.messages.create({
        body: message,
        from: process.env.TWILIO_FROM_NUMBER,
        to: phone
    })
}

const generateHashedPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
}
    

export default {
    successResponse,
    errorResponse,
    returnErrorMessages,
    generateOTP,
    generateToken,
    generateHashedPassword,
    sendOTP
}
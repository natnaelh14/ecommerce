import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    //the 'id' is the data we want to encode
    return jwt.sign( {id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
};

export default generateToken;
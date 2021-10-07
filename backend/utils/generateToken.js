import jwt from 'jsonwebtoken';

// The 'id' is the data we want to encode
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
export default generateToken;

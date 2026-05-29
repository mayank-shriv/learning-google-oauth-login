import axios from 'axios'
import jwt from 'jsonwebtoken'
import { oauth2client } from '../utils/GoogleConfig.js'
import { User } from '../models/usermodel.js'

const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        // Input validation — reject if code is missing or not a string
        if (!code || typeof code !== 'string' || code.trim().length === 0) {
            return res.status(400).json({
                message: 'Missing or invalid authorization code'
            });
        }

        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name, email, profilePic: picture
            });
        }
        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT
        });

        // Return only necessary fields — don't leak _id, __v, or other internals
        return res.status(200).json({
            message: 'success',
            token,
            user: {
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        console.error('Google login error:', error);
        // Don't leak internal error details to the client
        res.status(500)
            .json({
                message: 'Internal server error'
            });
    }
}

export default googleLogin;
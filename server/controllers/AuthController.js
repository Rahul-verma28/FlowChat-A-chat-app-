import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const maxAge = 3 * 24 * 60 * 60 * 60;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.SECRET_KEY, { expiresIn: maxAge });
}

export const signup = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Email and Password both are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already exists.' });
        }

        const user = await User.create({ email, password });
        res.cookie("jwt", createToken(email, user._id), {
            maxAge,
            secure: true,
            sameSite: "None"
        })
        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        })

    } catch (error) {
        console.log("AuthController error", error);
        return res.status(400).send("Internal server error")
    }
}

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Email and Password both are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        })
        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                color: user.color,
                image: user.image
            }
        })

    } catch (error) {
        console.log("AuthController error", error);
        return res.status(400).send("Internal server error")
    }
}

export const getUserInfo = async (req, res, next) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) return res.status(400).send('User with the given id is not found');
        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            color: userData.color,
            image: userData.image
        })
    } catch (error) {
        console.log("AuthController error", error);
        return res.status(400).send("Internal server error")
    }
}


export const updateProfile = async (request, response, next) => {
    const { userId } = request;
    const { firstName, lastName, color, image } = request.body;
    if (!firstName || !lastName) {
        return response
            .status(400)
            .send("Firstname and lastname is required.");
    }
    try {
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                color,
                image,
                profileSetup: true,
            },
            { new: true, runValidators: true }
        );
        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        });
    } catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error");
    }
};
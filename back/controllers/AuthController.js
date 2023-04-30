const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.logIn = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(async (user) => {
            if (!user) {
                return res.status(400).json({ message: "Invalid email and/or password" })
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        role: user.role
                    },
                    process.env.TOKEN_KEY,
                    { expiresIn: "2h" }
                )
                return res.status(200).json({ user, token });
            }

            res.status(402).json({ message: "Invalid email and/or password" })
        })
        .catch((error) => {
            console.log(error);
            res.json({ message: "Error finding user" });
        });
}

exports.user = async (req, res) => {
    try {
        User.findOne({ email: req.user.email })
            .then((user) => {
                res.status(200).json({ user });
            })
            .catch(() => {
                res.status(500).json({ message: "Error finding user" })
            })
    } catch (err) {
        return res.status(401).send("Invalid token")
    }
}

exports.addUser = (req, res) => {
    const data = req.body;

    User.findOne({ email: data.email })
        .then(async (user) => {
            if (user) {
                return res.status(400).json({ message: "User with this email already exists" });
            } else {
                const encPass = await bcrypt.hash(data.password, 5);
                const userData = {
                    ...data,
                    password: encPass, 
                    image: `images/${req.file.filename}`,
                }

                const user = new User(userData);
                user.save()
                    .then((result) => {
                        console.log(result);
                        res.status(200).json(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ message: "Error occured when adding user" });
                    })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Error occured when finding user" });
        })
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            data: null
        })
    }

}
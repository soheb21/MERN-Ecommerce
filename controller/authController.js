const userModel = require("../model/userModel");
const crypto = require("crypto");
const { senitizeUser } = require("../service/common");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY //ToDo:save thie env file

const createUserController = async (req, res) => {

    try {
        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
            const user = new userModel({ ...req.body, password: hashedPassword, salt });
            const doc = await user.save();
            req.login(senitizeUser(doc), (err) => {
                if (err) {
                    res.status(400).json(err);
                }
                else {
                    let token = jwt.sign(senitizeUser(doc), SECRET_KEY);
                    res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 3600000),
                        httpOnly: true,
                    }).status(201).json({ id: doc.id, role: doc.role,addresses:doc.addresses,name:doc.name })

                }
            })
        });
    } catch (err) {
        res.status(400).json(err);
    }
}
const logoutController = async (req, res) => {
    res.cookie('jwt', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .sendStatus(200)
};
const logginUserController = async (req, res) => {
    const user = req.user;
    res.cookie("jwt", user.token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
    }).status(201).json({  id: user.id, role: user.role,addresses:user.addresses,name:user.name })
}
const checkAuthController = async (req, res) => {
    if (req.user) {
        return res.json(req.user)
    } else {
        return res.status(401);
    }

}
module.exports = { createUserController, logginUserController, checkAuthController, logoutController }
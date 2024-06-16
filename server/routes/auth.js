const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const validateFIO = (fullName) => {
    var fio =
        /^[а-яА-ЯёЁa-zA-Z]+([-\' ][а-яА-ЯёЁa-zA-Z]+)? [а-яА-ЯёЁa-zA-Z]+([-\' ][а-яА-ЯёЁa-zA-Z]+)? [а-яА-ЯёЁa-zA-Z]+([-\' ][а-яА-ЯёЁa-zA-Z]+)?$/;
    return fio.test(fullName);
};

router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const candidateEmail = await User.findOne({ email });
        if (candidateEmail) {
            return res.status(200).json({
                message:
                    "Пользователь с такой электронной почтой уже существует.",
            });
        }
        const candidateFullName = await User.findOne({ fullName });
        if (candidateFullName) {
            return res.status(200).json({
                message: "Пользователь с таким ФИО уже существует.",
            });
        }
        if (!validateFIO(fullName)) {
            return res.status(200).json({
                message: "ФИО введено некорректно.",
            });
        }
        if (password.length <= 5) {
            return res.status(200).json({
                message: "Пароль должен состоять более чем из 5 символов.",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            fullName,
            password: hashPassword,
        });
        await user.save();
        return res.status(200).json({ message: "OK" });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await User.findOne({ email });
        if (!candidate) {
            return res.status(200).json({
                message: "Такого пользователя не существует.",
            });
        }
        const areSame = await bcrypt.compare(password, candidate.password);
        if (!areSame) {
            return res.status(200).json({
                message: "Неверный пароль.",
            });
        }
        res.status(200).json({
            message: "OK",
            user: candidate,
        });
    } catch (e) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

module.exports = router;

const User = require("../models/user")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const { fullName, schoolId } = req.body
    try {
        const accessToken = await jwt.sign(
            { schoolId: schoolId, fullName: fullName },
            process.env.JWT_SECRET_KEY
        )
        const verifyUser = await User.findOne({ schoolId: schoolId })
        if (verifyUser !== null) {
            return res.status(200).json({ user: verifyUser, token: accessToken })
        }

        const user = new User({ fullName: fullName, schoolId: schoolId })
        await user.save()
        
        res.status(201).json({ user: user, token: accessToken })

    } catch (error) {
        res.status(500).json({ msg: "Hatalı İşlem" })
    }
}

const allChair = async (req, res) => {
    try {
        const chair = await User.find()
        res.json({ data: chair })
    } catch (error) {
        res.status(500).json({ msg: "Hatalı İşlem" })
    }

}

const chairById = async (req, res) => {
    const id = req.params.id
    try {
        const chairId = await User.findOne({ chair: id })
        res.json({ data: chairId })
    } catch (error) {
        res.status(500).json({ msg: "Hatalı İşlem" })
    }
}

const chairByStudent = async (req, res) => {
    const { studentId } = req.user
    try {
        const chairId = await User.findOne({ studentId: studentId })
        res.json({ data: chairId })
    } catch (error) {
        res.status(500).json({ msg: "Hatalı İşlem" })
    }
}

const selectChair = async (req, res) => {
    const { chairId } = req.body
    const { schoolId } = req.user
    try {
        const verifyChair = await User.findOne({ chair: chairId })
        if (verifyChair !== null) {
            return res.status(401).json({ msg: "Bu koltuk seçili" })
        }
        const data = await User.findOneAndUpdate({ schoolId: schoolId }, { chair: chairId })
        res.json({ data: data })
    } catch (error) {
        res.status(500).json({ msg: "Hatalı İşlem" })
    }
}

const deleteChair = async (req, res) => {
    const { chairId } = req.body
    const { schoolId } = req.user
    try {
        const data = await User.findOneAndUpdate({ schoolId: schoolId }, { chair: null })
        res.json({ data: data })
    } catch (error) {
        res.status(500).json({ msg: "Hatalı İşlem" })
    }
}

module.exports = {
    login,
    allChair,
    chairById,
    selectChair,
    deleteChair,
    chairByStudent
}
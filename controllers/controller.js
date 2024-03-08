const User = require("../models/user")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const { fullName, schoolId } = req.body
    try {
        const accessToken = await jwt.sign(
            { schoolId: schoolId, fullName: fullName },
            process.env.JWT_SECRET_KEY
        )

        // Kullanıcıyı bul
        const existingUser = await User.findOne({ schoolId: schoolId })
        if (existingUser) {
            return res.status(200).json({ user: existingUser, token: accessToken })
        }

        // Kullanıcı yoksa yeni kullanıcı oluştur ve kaydet
        const newUser = new User({ fullName: fullName, schoolId: schoolId })
        const savedUser = await newUser.save()
        res.status(201).json({ user: savedUser, token: accessToken })

    } catch (error) {
        console.error('Kullanıcı kaydedilirken bir hata oluştu:', error)
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

const editName = async (req, res) => {
    const { fullName } = req.body
    const { schoolId } = req.user
    try {
        const data = await User.findOneAndUpdate({ schoolId: schoolId }, { fullName: fullName })
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
    editName
}
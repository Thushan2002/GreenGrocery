import Address from "../Models/AddressModel.js"

// add address

export const addAddress = async (req, res) => {
    try {
        const { address, userId } = req.body
        await Address.create({ ...address, userId })
        res.json({ success: true, message: "Address added successfully" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// get address

export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body
        const addresses = await Address.find({ userId })
        res.json({ success: true, addresses })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
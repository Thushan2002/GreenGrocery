import Address from "../Models/AddressModel.js"

// add address

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body
        const userId = req.user
        await Address.findOneAndUpdate(
            { userId },       // Filter: find address by userId
            { $set: address },// Update: set new address fields
            { upsert: true, new: true } // Options: create if missing, return updated doc
        );

        res.json({ success: true, message: "Address added successfully" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// get address

export const getAddress = async (req, res) => {
    try {
        const userId = req.user
        const addresses = await Address.find({ userId })
        res.json({ success: true, addresses })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
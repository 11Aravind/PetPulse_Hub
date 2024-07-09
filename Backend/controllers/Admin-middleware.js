import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs"
export const loginValidation = async (req, res, next) => {
    const { email, password } = req.body;
    let adminExistOrNot;
    try {
        adminExistOrNot = await Admin.findOne({ email });
    } catch (err) { return console.log(err); }
    if (!adminExistOrNot)
        return res.status(404).json({ status:"failed",message: "Your login cradintials was wrong" });
    const passwordChecker = bcrypt.compareSync(password, adminExistOrNot.password);
    if (!passwordChecker)
        return res.status(404).json({ status:"failed",message: "Your login cradintials was wrong" })
    return res.status(200).json({ status:"success",message: "Successfuly Logined" });
    // if statusFlag
}
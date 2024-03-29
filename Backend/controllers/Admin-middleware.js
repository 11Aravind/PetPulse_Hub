import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs"
export const loginValidation = async (req, res, next) => {
    const { email, password } = req.body;
    let userExistingOrNot;
    try {
        userExistingOrNot = await Admin.findOne({ email });
    } catch (err) { return console.log(err); }
    if (!userExistingOrNot)
        return res.status(404).json({ message: "e mail was incorrect" });
    const passwordChecker = bcrypt.compareSync(password, userExistingOrNot.password);
    if (!passwordChecker)
        return res.status(404).json({ message: "Password was incorrect" })
    return res.status(200).json({ message: "Successfuly Logined" });
    // if statusFlag
}
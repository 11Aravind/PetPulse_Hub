import Admin from "../models/Admin.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const loginValidation = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        // Find admin by email
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(401).json({ 
                status: "failed",
                message: "Invalid email or password" 
            });
        }
        
        // Compare password using the utility function
        const isPasswordValid = await comparePassword(password, admin.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ 
                status: "failed",
                message: "Invalid email or password" 
            });
        }
        
        // If we get here, login is successful
        return res.status(200).json({ 
            status: "success",
            message: "Successfully Logged In",
            adminId: admin._id 
        });
        
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            status: "error",
            message: "An error occurred during login" 
        });
    }
};

/**
 * Middleware to create a new admin with hashed password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                status: "failed",
                message: "Admin with this email already exists"
            });
        }
        
        // Create new admin with hashed password
        const admin = new Admin({
            name,
            email,
            password: await hashPassword(password)
        });
        
        await admin.save();
        
        res.status(201).json({
            status: "success",
            message: "Admin created successfully",
            adminId: admin._id
        });
        
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({
            status: "error",
            message: "Error creating admin account"
        });
    }
};
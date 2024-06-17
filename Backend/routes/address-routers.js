import express from "express";
import { deleteAddress} from "../controllers/Address-middleware.js";
const router = express.Router();

router.delete("/:addressId", deleteAddress);

export default router;
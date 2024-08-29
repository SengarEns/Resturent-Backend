import express from "express";
import ensureAuthentication from "../middleware/Auth.js";

const router = express.Router();

router.get("/test", ensureAuthentication, (req, res)=>{
    res.status(200).json("ajsdf;o am;dcjao mdoicsacsajd")
})

export default router;

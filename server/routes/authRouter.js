import { Router } from "express";
import googleLogin from "../controllers/authcontroller.js";

const router = Router();

router.get('/test', (req, res) => res.send('test pass'));
router.get('/google', googleLogin );
export default router;
import express from "express";
import { getMasyarakat,updateMasyarakat,getmasyarakatById,blokMasyarakat,createMasyarakat,updatePassword } from "../controllers/Masyarakat.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/masyarakats',verifyUser, getMasyarakat);
router.get('/masyarakat/:id', getmasyarakatById);
router.post('/masyarakat', createMasyarakat);
router.patch('/masyarakat/:id', updateMasyarakat);
router.patch('/masyarakatblock/:id', blokMasyarakat);
router.patch('/pass/:id', updatePassword);

export default router;
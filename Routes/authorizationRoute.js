import express from "express";

import { isAuthorized } from "../Controllers/authorization.js";
import { handleAuthorization } from "../Controllers/authorization.js";

const router = express.Router();

router.get("/restricted", isAuthorized, handleAuthorization);

export default router;
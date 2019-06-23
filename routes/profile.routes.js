const express = require("express");
const router = express.Router();
const profileOps = require("../controllers/profile.controller.js");
const verifyToken = require("../middleware/auth").verifyToken;

router.post("/api/user/profile/create", verifyToken, profileOps.Create);
router.get("/api/user/profile/me", verifyToken, profileOps.GetProfile);
router.delete(
  "/api/user/profile/delete",
  verifyToken,
  profileOps.DeleteProfile
);

module.exports = router;

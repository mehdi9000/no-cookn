const express = require("express");
const router = express.Router();
const addressOps = require("../controllers/address.controller.js");
const verifyToken = require("../middleware/auth").verifyToken;

router.post("/api/user/profile/address", verifyToken, addressOps.NewAddress);
router.get(
  "/api/user/profile/address-book",
  verifyToken,
  addressOps.FetchAddresses
);
router.get(
  "/api/user/profile/address/:id",
  verifyToken,
  addressOps.GetAddressByID
);

router.put(
  "/api/user/profile/address/update/:id",
  verifyToken,
  addressOps.UpdateAddress
);

router.delete(
  "/api/user/profile/address/delete/:id",
  verifyToken,
  addressOps.DeleteAddress
);

module.exports = router;

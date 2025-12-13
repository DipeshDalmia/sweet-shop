const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware.js");
const isAdmin = require("../middleware/roleMiddleware.js");

const {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require("../controllers/sweetController.js");

router.post("/", auth, addSweet);
router.get("/", auth, getAllSweets);
router.get("/search", auth, searchSweets);
router.put("/:id", auth, updateSweet);
router.delete("/:id", auth, isAdmin, deleteSweet);
router.post("/:id/purchase", auth, purchaseSweet);
router.post("/:id/restock", auth, isAdmin, restockSweet);


module.exports = router;

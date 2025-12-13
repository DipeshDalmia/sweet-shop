const Sweet = require("../models/sweetModel.js");

exports.addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    
    if (!name || !category || !price || quantity === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    if (price <= 0 || quantity < 0) {
      return res.status(400).json({ message: "Price and quantity must be valid numbers" });
    }

    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to add sweet" });
  }
};

exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch sweets" });
  }
};

exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let query = {};
    if (name) query.name = new RegExp(name, "i");
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to search sweets" });
  }
};

exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update sweet" });
  }
};

exports.deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }
    res.json({ message: "Sweet deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete sweet" });
  }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }
    
    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to purchase sweet" });
  }
};

exports.restockSweet = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Valid restock amount is required" });
    }

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += Number(amount);
    await sweet.save();
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to restock sweet" });
  }
};
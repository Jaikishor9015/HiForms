const express = require("express");
const Opportunity = require("../models/Opportunity");

const router = express.Router();

// Create an opportunity
router.post("/", async (req, res) => {
  try {
    const { businessName, title, description, reward, category } = req.body;

    // Check required fields
    if (!businessName || !title || !description || !reward || !category) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    // Create opportunity
    const opportunity = await Opportunity.create({
      businessName,
      title,
      description,
      reward,
      category,
    });

    res.status(201).json({
      message: "Opportunity created successfully",
      opportunity,
    });
  } catch (error) {
    console.error("Create opportunity error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get all active opportunities
router.get("/", async (req, res) => {
  try {
    const opportunities = await Opportunity.find({
      status: "active",
    }).sort({ createdAt: -1 });

    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Get opportunities error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found",
      });
    }

    res.status(200).json(opportunity);
  } catch (error) {
    console.error("Get opportunity error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;

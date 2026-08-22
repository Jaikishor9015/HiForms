const express = require("express");
const router = express.Router();

const Application = require("../models/Application");

// Apply for an opportunity
router.post("/", async (req, res) => {
  try {
    const { userId, opportunityId } = req.body;

    // Check required fields
    if (!userId || !opportunityId) {
      return res.status(400).json({
        message: "User ID and Opportunity ID are required",
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      user: userId,
      opportunity: opportunityId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this opportunity",
      });
    }

    // Create application
    const application = new Application({
      user: userId,
      opportunity: opportunityId,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Application error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;

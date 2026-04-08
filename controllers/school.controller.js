import { addSchoolService, listSchoolsService } from "../services/school.service.js";

export const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // ✅ Validation
    if (!name || !address || latitude == null || longitude == null) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (typeof name !== "string" || typeof address !== "string") {
      return res.status(400).json({
        message: "Name and address must be strings"
      });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        message: "Latitude and Longitude must be numbers"
      });
    }

    // ✅ Insert into DB
    const result = await addSchoolService(req.body);

    // 🔥 check duplicate
    if (result.exists) {
      return res.status(409).json({
        message: "School already exists"
      });
    }

    res.status(201).json({
      message: "School added successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // validation
    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and Longitude required"
      });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        message: "Latitude and Longitude must be numbers"
      });
    }

    const schools = await listSchoolsService(
      parseFloat(latitude),
      parseFloat(longitude)
    );

    res.json(schools);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
import { db } from "../config/db.js";
import { calculateDistance } from "../utils/distance.js";

export const addSchoolService = (school) => {
  return new Promise((resolve, reject) => {
    const { name, address, latitude, longitude } = school;

    // 🔍 check if already exists
    const checkQuery = `
      SELECT * FROM schools WHERE name = ? AND address = ?
    `;

    db.query(checkQuery, [name, address], (err, results) => {
      if (err) return reject(err);

      if (results.length > 0) {
        return resolve({ exists: true });
      }

      // ✅ insert if not exists
      const insertQuery = `
        INSERT INTO schools (name, address, latitude, longitude)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [name, address, latitude, longitude],
        (err, result) => {
          if (err) return reject(err);
          resolve({ exists: false, result });
        }
      );
    });
  });
};

export const listSchoolsService = (userLat, userLng) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM schools", (err, results) => {
      if (err) return reject(err);

      const sorted = results
        .map((school) => ({
          ...school,
          distance: calculateDistance(
            userLat,
            userLng,
            school.latitude,
            school.longitude
          )
        }))
        .sort((a, b) => a.distance - b.distance);

      resolve(sorted);
    });
  });
};
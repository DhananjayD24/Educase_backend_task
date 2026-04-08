import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

import schoolRoutes from "./routes/school.routes.js";
app.use("/api/school", schoolRoutes);

export default app;
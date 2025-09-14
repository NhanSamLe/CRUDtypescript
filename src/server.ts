import express from 'express';
import type { Application } from 'express';
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import {connectDB} from "./config/configdb";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine + routes
viewEngine(app);
initWebRoutes(app);

// Database
connectDB();
const port: number = Number(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
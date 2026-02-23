import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();

//middlewares

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
import HeathCheckRouter from './routes/HealthCheck.routes.js'
import authRouter from "./routes/auth.routes.js"
import projectRouter from "./routes/projects.routes.js"

app.use("/api/v1/heathcheck", HeathCheckRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/projects", projectRouter)


export default app;



import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notfound from "./middleware/notfound.js";

const PORT = process.env.PORT || 8000;

const app = express();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup static folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

app.use("/api/posts", posts);

// General not found error middleware
app.use(notfound);

// ErrorHandler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


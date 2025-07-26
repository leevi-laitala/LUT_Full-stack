const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8080;

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

// // Serve front-end 
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/build")));
// 
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"));
//     });
// } else {
//     app.get("/", (req, res) => res.send("Running in development mode"));
// }

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

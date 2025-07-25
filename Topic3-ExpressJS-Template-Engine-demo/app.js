import express from "express";

const app = express();

// Config ejs
app.set("view engine", "ejs");
app.set("views", "views"); // Set views folder to be "views"

app.get("/", (req, res) => {
    res.render("index", {
        title: "Welcome",
        message: "Hello from EJS",
        people: ["Bob", "Alice"],
    }); // Will look for "index" in "views" directory
});

app.listen(8080, () => console.log("Server started"));

// import fs from "fs";

// // readFile() : Async version
// fs.readFile("./test.txt", "utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// // readFileSync() : Synchronous version
// const data = fs.readFileSync("./test.txt", "utf8");
// console.log(data);

import fs from "fs/promises";

// // readFile() : Promise version .then()
// fs.readFile("./test.txt", "utf8")
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));

// readFile() : Promise version .then()
const readFile = async () => {
    try {
        const data = await fs.readFile("./test.txt", "utf8");
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const writeFile = async() => {
    try {
        await fs.writeFile("./test.txt", "Hello, I'm writing to this file");
        console.log("File written");
    } catch (error) {
        console.log(error);
    }
};

const appendFile = async() => {
    try {
        await fs.appendFile("./test.txt", "\nThis is appended text");
        console.log("File appended");
    } catch (error) {
        console.log(error);
    }
};


writeFile();
appendFile();
readFile();





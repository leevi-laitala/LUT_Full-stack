import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

function greetHandler(name) {
    console.log("Hello " + name);
}

function goodbyeHandler(name) {
    console.log("Goodbye " + name);
}

// Register listeners
myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodbyeHandler);
myEmitter.on("error", (err) => { console.log("An error occured:", err); });

// Emit events
myEmitter.emit("greet", "Foo");
myEmitter.emit("goodbye", "Bar");
myEmitter.emit("error", new Error("File not found"));



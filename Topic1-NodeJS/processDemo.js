// Command line arguments
console.log(process.argv);
console.log(process.argv[3]);

// Environment variables
console.log(process.env.SHELL);

// PID
console.log(process.pid);

// cwd
console.log(process.cwd());

// title
console.log(process.title);

// memoryUsage
console.log(process.memoryUsage());

// uptime
console.log(process.uptime());

process.on("exit", (code) => {
    console.log(`About to exit with ${code}`);
});

// exit
process.exit(9);

console.log("I won't be printed");



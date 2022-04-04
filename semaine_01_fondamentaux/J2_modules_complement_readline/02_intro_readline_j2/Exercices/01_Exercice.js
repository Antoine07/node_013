const readline = require("readline");

const students = ["Alan", "Sonia", "Sophie"];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt("OHAI> ");
rl.prompt();

rl.on("line", (line) => {
    //   if (students.map(m => m.toUpperCase()).includes(line.toUpperCase().trim())) {
    //     console.log(`Oui c'est trouvé`);
    //     rl.close();

    //     return;
    //   }
    // dans cette version on est sensible à la casse
    if (students.includes(line.trim())) {
        console.log(`Oui c'est trouvé`);
        rl.close();

        return;
    }

    console.log('essayer encore ...');
    rl.prompt();
}).on("close", () => {
    console.log("Have a great day!");
    process.exit(0); // arrêt du processus
});
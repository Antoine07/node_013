import students from './src/Data/students.js';
import readline from 'readline';
// import * as s from './src/utils.js';
//s.setMention(student.note)
import { setMention } from './src/utils.js';

for (const student of students) {
    student.mention = setMention(student.note)
}

// console.log(students);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('OHAI> ');
rl.prompt();

rl.on('line', (line) => {

    const student = students.find(s => s.name.toUpperCase() === line.trim().toUpperCase())
    
    if(student){
        console.table(student);
    }else{
        console.log(`L'étudiant ${student} est inconnu`);
    }

    rl.prompt();
    // si on fait un Ctrl + c pour arrêter le process
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0); // il vaut fermer le process 
});
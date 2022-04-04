const { readFileSync, appendFileSync } = require('fs');

let students = [];

function readStudents() {

    try {
        let data = readFileSync('./Data/students.txt', 'utf8');
        data = data.split(/\r?\n/);

        // dépile le premier élément 
        const line = data.shift();

        for (const st of data) {
            const [note, name, address] = st.split(' ');
            students.push({ note, name, address })
        }

        console.log(students);

    } catch (err) {
        console.error(err)
    };

}

readStudents();

// 2.Plus de 17 de moyenne

const studentsBest = students.filter(s => s.note > 17);

console.log(studentsBest);

// 3. L'étudiant qui a eu la meilleur note

// première solution 
const studentBest = students.find(s => s.note == Math.max(...students.map(s => s.note)));
console.log(studentBest);

// deuxième solution
let stBest = { name: null, note: 0, address: null };
for (const st of students) {
    if (st.note > stBest.note) stBest = st;
}
console.log(stBest);

students.sort((s1, s2) => s1.note - s2.note)

console.log(students);

// appen

appendFileSync('./Data/students.txt', "\n" + '18 Sonia Paris');
appendFileSync('./Data/students.txt', "\n" + '17 Clarisse Marseille');

readStudents();

// Lire le fichier lui-même et mettez chaque nom en majuscule

for( st of students){
    st.name = st.name.toUpperCase();
}

console.log(students);
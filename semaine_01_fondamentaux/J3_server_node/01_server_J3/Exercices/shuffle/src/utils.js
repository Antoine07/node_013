

export function showUser(users) {

    if (users.length > 0) {

        return (
            `<ul>
                ${users.map(user => `<li> ${user} </li> `).join('')}
            </ul>
            `
        )
    }

    return "No user";
}

export function shuffle(users) {
    users.sort(_ => Math.random() - .5);

    return users;
}
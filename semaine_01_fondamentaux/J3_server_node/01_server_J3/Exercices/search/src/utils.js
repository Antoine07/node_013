import 'dotenv/config'

const { APP_TB, APP_B, APP_P, APP_AB , APP_PRECISION} = process.env;

export function setMention(note) {

    if (note > 16) {
        return APP_TB
    }

    if (note >= 14) {
        return APP_B
    }

    if (note >= 12) {
        return APP_AB
    }

    if (note >= 10 ) {
        return APP_P
    }

    return "PAS DE MENTION";
}

export function avg(notes){

    const sum = notes.reduce((acc, curr) => acc + curr);

    return Math.floor( (sum / notes.length) * APP_PRECISION )/APP_PRECISION ;
}
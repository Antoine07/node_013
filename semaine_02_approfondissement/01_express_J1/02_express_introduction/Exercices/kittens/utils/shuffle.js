

export function shuffle( data ){
    if(data.length > 0)  {
        data.sort( _ => Math.random() - .5 );
    }
}
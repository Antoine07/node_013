process.stdin.on('data', (chunk) => {   
  
  console.log(chunk)
    const text = chunk.toString().replace("\n", "")

    console.log(text)

    console.log(text == 'j')

    if(text == 'j') process.exit(0);
  
    // process.stdout.write(text.toLocaleUpperCase()); 
    
   
   
  });

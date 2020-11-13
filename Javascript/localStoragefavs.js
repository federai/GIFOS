function add(url) {
    favoritos= localStorage.getItem('favoritos');
    if (favoritos == null) {
        favoritos= [];
    } else {
        favoritos= JSON.parse(favoritos);
    }
    favoritos.push(url);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    
}

 function check (checkid){
    
     console.log("Parametro pasado a Gif " + checkid);
     
     retrievedData = localStorage.getItem('ids');
     checkidsarray= JSON.parse(retrievedData); 
      for(i=0 ; i<checkidsarray.length ; i++){
         
         if(checkidsarray[i] == checkid){
             console.log("ya existe");
         }
         else{
             console.log("no existe")
         }
     }
     
}



function favorites(url,id){
    add(url);
    addId(id);
    check(id);
    
}

function addId(numero){
    console.log("id= " + numero)
    ids= localStorage.getItem('ids');
    if (ids == null) {
        ids= [];
    } else {
        ids= JSON.parse(ids);
    }
    ids.push(numero);
    localStorage.setItem('ids', JSON.stringify(ids));
}
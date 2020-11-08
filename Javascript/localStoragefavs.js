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


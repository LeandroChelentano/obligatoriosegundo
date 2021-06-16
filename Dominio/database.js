// var propiedades = new Array() .. Just to look for the exact name..

function load() {
    console.log(propiedades);
}

function save() {    
    console.log(window.localStorage.setItem('people', JSON.stringify(arr)));
    console.log(JSON.parse(window.localStorage.getItem('people')));
    window.localStorage.removeItem('people');
}

function loadAll() {
    loadPropiedades();

    refrescar();
}

function savePropiedades() {
    window.localStorage.removeItem('propiedades');
    console.log(window.localStorage.setItem('propiedades', JSON.stringify(propiedades)));
    propiedades.splice(0, propiedades.length);
    propiedades = JSON.parse(window.localStorage.getItem('propiedades'));
}

function loadPropiedades() {
    propiedades.splice(0, propiedades.length);
    propiedades = JSON.parse(window.localStorage.getItem('propiedades'));
}

function cls() {
    window.localStorage.clear();
}
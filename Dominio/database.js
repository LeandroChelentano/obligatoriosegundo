var propiedades = new Array();

function loadAll() {
    loadPropiedades();
    showProperties(); // Mostrar en base de datos
}

function savePropiedades() { // guardar en ls
    window.localStorage.removeItem('propiedades');
    window.localStorage.setItem('propiedades', JSON.stringify(propiedades));
}

function loadPropiedades() {
    propiedades = JSON.parse(window.localStorage.getItem('propiedades'));
}

function cls() {
    window.localStorage.clear();
}
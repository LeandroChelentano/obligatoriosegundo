var arrEmpty = new Array();
function empty() {
    for (let i = 0; i < arrEmpty.length; i++) {
        if (arrEmpty[i] == '') {
            arrEmpty.splice(0, arrEmpty.length);
            return true;
        }
    }
    if (arrEmpty.length > -1) {
        arrEmpty.splice(0, arrEmpty.length)
        return false;
    }
}

var arrInteger = new Array();
function integer() {
    for (let i = 0; i < arrInteger.length; i++) {
        if (isNaN(arrInteger[i])) {
            arrInteger.splice(0, arrInteger.length);
            return true;
        }
    }
    if (arrInteger.length > -1) {
        arrInteger.splice(0, arrInteger.length);
        return false;
    }
}

///////////////////////////////////////////////////////////////

var propiedades = new Array();
var idPropiedades = new Array();
var propiedadesBackup = new Array();

var tipo; //combo
var direccion;
var barrio;
var ciudad;
var metros;
var dormitorios;
var banos;
var garage; //combo
var parrillero; //combo
var wifi; //combo
var mascotas; //combo
var precio;
var propietario; //combo //Se saca el id del propietario

function getData() {
    if (document.getElementById('v1').checked) {
        tipo = 'Casa';
    } else if (document.getElementById('v2').checked) {
        tipo = 'Apartamento';
    } else {
        tipo = '';
    }
    
    direccion = document.getElementById('propertiesDireccion').value;
    barrio = document.getElementById('propertiesBarrio').value;
    ciudad = document.getElementById('propertiesCiudad').value;
    metros = document.getElementById('propertiesMetros').value;
    dormitorios = document.getElementById('propertiesDormitorios').value;
    banos = document.getElementById('propertiesBanos').value;
    
    if (document.getElementById('v3').checked) {
        garage = 'Si';
    } else if (document.getElementById('v4').checked) {
        garage = 'No'
    } else {
        garage = '';
    }

    if (document.getElementById('v5').checked) {
        parrillero = 'Si';
    } else if (document.getElementById('v6').checked) {
        parrillero = 'No'
    } else {
        parrillero = ''
    }
    
    if (document.getElementById('v7').checked) {
        wifi = 'Si';
    } else if (document.getElementById('v8').checked) {
        wifi = 'No'
    } else {
        wifi = ''
    }
    
    if (document.getElementById('v9').checked) {
        mascotas = 'Si';
    } else if (document.getElementById('v10').checked) {
        mascotas = 'No'
    } else {
        mascotas = ''
    }
    
    precio = document.getElementById('propertiesPrecio').value;

    i = document.getElementById('propertiesPropietario').selectedIndex;
    propietario = personas[i].Id;
    // propietario = 'none'
}

function getPersonas() {
    cI = document.getElementById('pCI').value;
    nombre = document.getElementById('pNombre').value;
    apellido = document.getElementById('pApellido').value;
    telefono = document.getElementById('pTelefono').value;
    email = document.getElementById('pEmail').value;
    direccion = document.getElementById('pDireccion').value;
    
    if (document.getElementById('siComprador').checked) {
        esComprador = 'Comprador';
    } else {
        esComprador = '';
    }

    if (document.getElementById('siVendedor').checked) {
        esVendedor = 'Vendedor';
    } else {
        esVendedor = '';
    }
}


function refrescarPropiedades() {
    propertiesClear();
    savePropiedades();
    savePropiedadesBackup();
    loadPropiedades();
    loadPropiedadesBackup();
    showProperties();
    // loadPropietario();
}

function refrescarPersonas() {
    clearPersonas();
    savePersonas();
    savePersonasBackup()
    loadPersonas();
    loadPersonasBackup();
    showPersonas();
}

function propertiesAdd() {
    getData();
    arrEmpty.push(tipo, direccion, barrio, ciudad, metros, dormitorios, banos, garage, parrillero, wifi, mascotas, precio) //, propietario
    if (empty()) {
        alert('Hay elementos en blanco.')
    } else {
        arrInteger.push(metros, banos, dormitorios, precio)
        if (integer()) {
            alert('La extencion, cantidad de baños, dormitorios y el precio deben ser en formato numerico.')
        } else {
            var x = false;
            for(let i = 0; i < propiedades.length; i++)
            {
                if (direccion == propiedades[i].Direccion)
                {
                    alert(`La direccion ${direccion} ya se encuentra en la lista de propiedades`);
                    x = true
                }
            }
            if (x == false) {
                var newId = propiedades.length + propiedadesBackup.length;

                propiedades.push({
                    Id          : newId,
                    Tipo        : tipo,
                    Direccion   : direccion,
                    Barrio      : barrio,
                    Ciudad      : ciudad,
                    Metros      : parseInt(metros),
                    Dormitorios : parseInt(dormitorios),
                    Banos       : parseInt(banos),
                    Garage      : garage,
                    Parrillero  : parrillero,
                    Wifi        : wifi,
                    Mascotas    : mascotas,
                    Precio      : parseInt(precio),
                    Propietario : propietario
                })
                alert('La propiedad se ingreso correctamente.')
                refrescarPropiedades()
            }
        }
    }
}

function showProperties() {
    var db = document.getElementById('dbPropiedades');
    db.innerHTML = "";
    for(var i=0 ; i < propiedades.length ; i++)
    {
        var linea = document.createElement('option');
        linea.text = `${propiedades[i].Id} | ${propiedades[i].Tipo} | ${propiedades[i].Direccion} |  ${propiedades[i].Barrio} | ${propiedades[i].Dormitorios} | ${propiedades[i].Banos} | ${propiedades[i].Garage} | ${propiedades[i].Parrillero} | ${propiedades[i].Wifi}  | ${ propiedades[i].Mascotas} | ${propiedades[i].Precio} | ${propiedades[i].Propietario}`;
        db.add(linea);
    }

    loadPropietario();
}

function selectP() {
    var index = document.getElementById('dbPropiedades').selectedIndex;
    if (propiedades[index].Tipo == 'Casa') {
        document.getElementById('v1').checked = true;
    } else if (propiedades[index].Tipo == 'Apartamento') {
        document.getElementById('v2').checked = true;
    }
    
    direccion = document.getElementById('propertiesDireccion').value = propiedades[index].Direccion;
    document.getElementById('propertiesBarrio').value = propiedades[index].Barrio;
    document.getElementById('propertiesCiudad').value = propiedades[index].Ciudad;
    document.getElementById('propertiesMetros').value = propiedades[index].Metros;
    document.getElementById('propertiesDormitorios').value = propiedades[index].Dormitorios;
    document.getElementById('propertiesBanos').value = propiedades[index].Banos;
    
    if (propiedades[index].Garage == 'Si') {
        document.getElementById('v3').checked = true;
    } else if (propiedades[index].Garage == 'No')  {
        document.getElementById('v4').checked = true;
    }

    if (propiedades[index].Parrillero == 'Si') {
        document.getElementById('v5').checked = true;
    } else if (propiedades[index].Parrillero == 'No') {
        document.getElementById('v6').checked = true;
    }
    
    if (propiedades[index].Wifi == 'Si') {
        document.getElementById('v7').checked = true;
    } else if (propiedades[index].Wifi == 'No') {
        document.getElementById('v8').checked = true;
    }

    if (propiedades[index].Mascotas == 'Si') {
        document.getElementById('v9').checked = true;
    } else if (propiedades[index].Mascotas == 'No') {
        document.getElementById('v10').checked = true;
    }
    
    document.getElementById('propertiesPrecio').value = propiedades[index].Precio;

    document.getElementById('propertiesPropietario').selectedIndex = propiedades[index].Propietario;
}

function propertiesRemove() 
{
    var index = document.getElementById('dbPropiedades').selectedIndex;
    if (index == -1)
    {
        alert('Primero seleccione un elemento de la lista')
    }
    else
    {
        propiedadesBackup.push(propiedades[index]);
        propiedades.splice(index, 1);
        alert('Propiedad eliminada con exito')
        refrescarPropiedades();
    }  
}


function propertiesClear()
{
    document.getElementById("formProperties").reset()
}


function propertiesModify()
{
    var index = document.getElementById('dbPropiedades').selectedIndex;
    getData();
    arrEmpty.push(tipo, direccion, barrio, ciudad, metros, dormitorios, banos, garage, parrillero, wifi, mascotas, precio) //, propietario
    if (empty()) {
        alert('Hay elementos en blanco.')
    } else {
        arrInteger.push(metros, banos, dormitorios, precio)
        if (integer()) {
            alert('La extencion, cantidad de baños, dormitorios y el precio deben ser en formato numerico.')
        } else {
            var x = false;
            for(let i = 0; i < propiedades.length; i++)
            {
                if (direccion == propiedades[i].Direccion && direccion != propiedades[index].Direccion)
                {
                    alert(`La direccion ${direccion} ya se encuentra en la lista de propiedades`);
                    x = true
                }
            }
            if (x == false) {
                var newId = idPropiedades.length;
                idPropiedades.push(newId);

                propiedades[index] = ({
                    Id          : propiedades[index].Id,
                    Tipo        : tipo,
                    Direccion   : direccion,
                    Barrio      : barrio,
                    Ciudad      : ciudad,
                    Metros      : parseInt(metros),
                    Dormitorios : parseInt(dormitorios),
                    Banos       : parseInt(banos),
                    Garage      : garage,
                    Parrillero  : parrillero,
                    Wifi        : wifi,
                    Mascotas    : mascotas,
                    Precio      : parseInt(precio),
                    Propietario : propietario
                })
                alert('La propiedad se ha modificado correctamente.')
                refrescarPropiedades()
            }
        }
    }
}

function loadPropietario() {
    var dbPropietarios = document.getElementById('propertiesPropietario');
    dbPropietarios.innerHTML = '';
    for (let o = 0 ; o < personas.length ; o++)
    {
        var linea = document.createElement('option');
        linea.text = `Id: ${personas[o].Id} Nombre: ${personas[o].Nombre} ${personas[o].Apellido}`;
        dbPropietarios.add(linea);
    }
}


///////////////////////////////// PERSONAS

var personas = new Array();
var idPersonas = new Array();
var personasBackup = new Array();

var cI;
var nombre;
var apellido;
var telefono;
var eMail;
var esComprador;
var esVendedor;

function peopleAdd()
{
    getPersonas();
    arrEmpty.push(cI,nombre,apellido,telefono,eMail,direccion);
    if(empty())
    {
        alert('Debe seleccionar una persona en la lista')
    }
    else
    {
        arrInteger.push(telefono,cI);
        if(integer())
        {
            alert('Los valores de CI y Telefono deben ser numericos.')
        }
        else
        {
            var x = false;
            for (var i = 0; i < personas.length; i++)
            {
                if (personas[i].Ci == cI)
                {
                    alert('La cedula a registrar ya esta registrada')
                    x = true;
                } 
            }
            if (x == false)
            {
                var newId = personasBackup.length + personas.length;
                personas.push({
                    Id          :   newId,
                    Ci          :   cI,
                    Nombre      :   nombre,
                    Direccion   :   direccion,
                    Apellido    :   apellido,
                    Telefono    :   telefono,
                    Email       :   email,
                    Comprador   :   esComprador,
                    Vendedor    :   esVendedor,
                    cartera     :   0,
                    Uso         :   0
                });
                refrescarPersonas();
            }
        }
    }
}

function peopleRemove() {
    getPersonas();
    var db = document.getElementById('dbPersonas');
    var index = db.selectedIndex;
    personasBackup.push(personas[index]);
    personas.splice(index, 1);
    refrescarPersonas();
}

function showPersonas() {
    var db = document.getElementById('dbPersonas');
    db.innerHTML = '';
    for (let i = 0; i < personas.length; i++) {
        var line = document.createElement('option');
        line.text = `${personas[i].Id} | ${personas[i].Nombre} | ${personas[i].Apellido} | ${personas[i].Ci} | ${personas[i].Direccion} | ${personas[i].Telefono} | ${personas[i].Email} | ${personas[i].Comprador} | ${personas[i].Vendedor}`;
        db.add(line);
    }
}

function selPersona() {
    var index = document.getElementById('dbPersonas').selectedIndex;
    document.getElementById('pCI').value = personas[index].Ci;
    document.getElementById('pNombre').value = personas[index].Nombre;
    document.getElementById('pApellido').value = personas[index].Apellido;
    document.getElementById('pTelefono').value = personas[index].Telefono;
    document.getElementById('pEmail').value = personas[index].Email;
    document.getElementById('pDireccion').value = personas[index].Direccion;
    
    if (personas[index].Comprador == 'Comprador') {
        document.getElementById('siComprador').checked = true;
    } else {
        document.getElementById('siComprador').checked = false;
    }

    if (personas[index].Vendedor == 'Vendedor') {
        document.getElementById('siVendedor').checked = true;
    } else {
        document.getElementById('siVendedor').checked = false;
    }   
}

function clearPersonas() {
    document.getElementById('pCI').value = '';
    document.getElementById('pNombre').value = '';
    document.getElementById('pApellido').value = '';
    document.getElementById('pTelefono').value = '';
    document.getElementById('pEmail').value = '';
    document.getElementById('pDireccion').value = '';
    document.getElementById('siComprador').checked = false;
    document.getElementById('siVendedor').checked = false;
}

function peopleModify()
{
    var index = document.getElementById('dbPersonas').selectedIndex;
    getPersonas();
    arrEmpty.push(cI,nombre,apellido,telefono,eMail,direccion);
    if(empty())
    {
        alert('Debe seleccionar una persona en la lista')
    }
    else
    {
        arrInteger.push(telefono,cI);
        if(integer())
        {
            alert('Los valores de CI y Telefono deben ser numericos.')
        }
        else
        {
            var x = false;
            for (var i = 0; i < personas.length; i++)
            {
                if (personas[i].Ci == cI && personas[i].Ci != personas[index].Ci)
                {
                    alert('La cedula a registrar ya esta registrada');
                    x = true;
                } 
            }
            if (x == false)
            {
                personas[index] = ({
                    Id          :   personas[index].Id,
                    Ci          :   cI,
                    Nombre      :   nombre,
                    Apellido    :   apellido,
                    Direccion   :   direccion,
                    Telefono    :   telefono,
                    Email       :   email,
                    Comprador   :   esComprador,
                    Vendedor    :   esVendedor,
                    Cartera     :   personas[index].Cartera,
                    Uso         :   personas[index].Uso
                });
                refrescarPersonas();
            }
        }
    }
}


/////////////////////////////////////////////////////

function ventasLoadPropiedades() {
    var db = document.getElementById('sellPropiedad');
    db.innerHTML = '';
    for (var i = 0; i < propiedades.length; i++) {
        var line = document.createElement('option');
        line.value = `${propiedades[i].Id} | ${propiedades[i].Tipo} | ${propiedades[i].Direccion} |  ${propiedades[i].Barrio} | ${propiedades[i].Dormitorios} | ${propiedades[i].Banos} | ${propiedades[i].Garage} | ${propiedades[i].Parrillero} | ${propiedades[i].Wifi}  | ${ propiedades[i].Mascotas} | ${propiedades[i].Precio} | ${propiedades[i].Propietario}`
        db.add(line);
    }
}

function ventasLoadCompradores() {
    var db = document.getElementById('sellComprador');
    db.innerHTML = '';
    for (let i = 0; i < personas.length; i++) {
        if (personas[i].Comprador == 'Comprador') {
            var line = document.createElement('option');
            line.text = `${personas[i].Id} | ${personas[i].Nombre} ${personas[i].Apellido}`
            db.add(line);
        }
    }
}

function ventasLoadVendedores() {
    
}

var ventas = new Array();
var idVentas = new Array();

var vFecha;
var vPropiedad;
var vMonto;
var vComprador;
var vVendedor;

function getVenta() {
    vFecha = document.getElementById('sellFecha').value;
    vPropiedad = document.getElementById('sellPropiedad').value;
    vMonto = document.getElementById('sellMonto').value;
    vComprador = document.getElementById('sellComprador').value;
    vVendedor = document.getElementById('sellVendedor').value;
}







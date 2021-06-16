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

    // i = document.getElementById('iropertiesPropietario').selectedIndex;
    // propietario = personas[i].Id;
    propietario = 'none'
}

function refrescar() {
    showProperties()
    propertiesClear()
    savePropiedades()
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
                var newId = idPropiedades.length;
                idPropiedades.push(newId);

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
                refrescar()
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

    document.getElementById('propertiesPropietario').value = propiedades[index].Propietario;
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
        refrescar();
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
                refrescar()
            }
        }
    }
}
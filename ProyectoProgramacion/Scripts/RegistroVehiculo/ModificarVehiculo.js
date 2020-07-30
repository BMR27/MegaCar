$(function () {
    ValidarRegistroVehiculo();
    EventoChange();
    cargaListaPais();
    cargarListaTipos();
    obtenerDetalleVehiculo();
});

function ValidarRegistroVehiculo() {
    $("#frmRegistraVehiculo").validate(
        {
            rules: {
                C_PLACA: {
                    required: true,
                    maxlength: 6,
                    minlength: 6
                },
                C_CANT_PUERTAS: {
                    required: true,
                    digits: true,
                    maxlength: 1,
                    minlength: 1
                },
                C_CANT_RUEDAS: {
                    required: true,
                    digits: true,
                    maxlength: 1,
                    minlength: 1
                },
                C_YEAR: {
                    required: true,
                    digits: true,
                    maxlength: 4,
                    minlength: 4
                },
                C_ID_MODELO: {
                    required: true
                },
                C_ID_TIPO_VEHICULO: {
                    required: true
                },
                C_ID_MARCA: {
                    required: true
                },
                Pais: {
                    required: true
                },
                Fabricantes: {
                    required: true
                }

            }

        }
    );
}

function EventoChange() {
    $("#Pais").change(function () {
        var pais = $("#Pais").val();
        CargarListaCasasFabricantes(pais);
    });

    $("#Fabricante").change(function () {
        var fabricante = $("#Fabricante").val();
        CargarListaMarcas(fabricante);
    });

    $("#C_ID_MARCA").change(function () {
        var marca = $("#C_ID_MARCA").val();
        CargarListaModelos(marca);
    });
}

///carga los registros de las provincias
function cargaListaPais() {
    ///dirección a donde se enviarán los datos
    var url = '/Vehiculo/RetornarPais';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
    };
    ///invocar el método
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            procesarResultadoPais(data);
        },
        error: function (jQxhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
}


function procesarResultadoPais(data) {
    ///mediante un selector nos posicionamos sobre la lista de provincias
    var ddlPais = $("#Pais");
    ///"limpiamos" todas las opciones de la lista de provincias
    ddlPais.empty();

    ///empezamos a trabajar con los datos que nos retorna el servidor
    ///creamos la primera opción de la lista, con un valor vacío y el texto de "Seleecione un valor"
    var nuevaOpción = "<option value=''>Seleccione una Pais</option>";
    ///agregamos la opción al dropdownlist
    ddlPais.append(nuevaOpción);
    ///empezamos a recorerrer cada uno de los registros obtenidos
    $(data).each(function () {
        ///obtenemos el objeto de tipo Provincia haciendo uso de la claúsula "this"                        
        //ahora podemos acceder a todas las propiedades
        ///por ejemplo provinciaActual.nombre nos retorna el nombre de la provincia
        var paisActual = this;
        ///creamos la opción de la lista, con el valor del id de provioncia y el texto con el nomnbre
        nuevaOpción = "<option value='" + paisActual.C_ID_PAIS + "'>" + paisActual.C_NOMBRE_PAIS + "</option>";
        ///agregamos la opción al dropdownlist
        ddlPais.append(nuevaOpción);
    });
}


/* CARGA LA LISTA DE LAS CASAS FABRICANTES POR ID DE PAIS */

function CargarListaCasasFabricantes(pC_ID_PAIS) {
    ///dirección a donde se enviarán los datos
    var url = '/Vehiculo/RetornaFabricantes';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
        C_ID_PAIS: pC_ID_PAIS
    };
    ///invocar el método
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            ProcesaResultadoFabricantes(data);
        },
        error: function (jQxhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
}

function ProcesaResultadoFabricantes(data) {
    var ddlFabricantes = $("#Fabricante");
    ddlFabricantes.empty();
    var nuevaAccion = "<option value=''>Seleccione un Fabricante</option>";
    ddlFabricantes.append(nuevaAccion);
    $(data).each(function () {
        var FabricanteActual = this;
        nuevaAccion = "<option value='" + FabricanteActual.C_ID_FABRICANTE + "'>" + FabricanteActual.C_NOMBRE_FABRICANTE + "</option>";
        ddlFabricantes.append(nuevaAccion);
    });
}

function CargarListaMarcas(pC_ID_MARCA) {
    ///dirección a donde se enviarán los datos
    var url = '/Vehiculo/RetornaMarcas';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
        C_ID_MARCA: pC_ID_MARCA
    };
    ///invocar el método
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            ProcesaResultadoMarcas(data);
        },
        error: function (jQxhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
}

function ProcesaResultadoMarcas(data) {
    var ddlMarcas = $("#C_ID_MARCA");
    ddlMarcas.empty();
    var nuevaAccion = "<option value=''>Seleccione un Marca</option>";
    ddlMarcas.append(nuevaAccion);
    $(data).each(function () {
        var MarcaActual = this;
        nuevaAccion = "<option value='" + MarcaActual.C_ID_MARCA + "'>" + MarcaActual.C_NOMBRE_MARCA + "</option>";
        ddlMarcas.append(nuevaAccion);
    });
}

/* CARGA LOS DATOS DE LOS MODELOS */
function CargarListaModelos(pC_ID_MODELO) {
    ///dirección a donde se enviarán los datos
    var url = '/Vehiculo/RetornaModelos';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
        C_ID_MODELO: pC_ID_MODELO
    };
    ///invocar el método
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            ProcesaResultadoModelo(data);
        },
        error: function (jQxhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
}

function ProcesaResultadoModelo(data) {
    var ddlModelos = $("#C_ID_MODELO");
    ddlModelos.empty();
    var nuevaAccion = "<option value=''>Seleccione un Modelo</option>";
    ddlModelos.append(nuevaAccion);
    $(data).each(function () {
        var ModeloActual = this;
        nuevaAccion = "<option value='" + ModeloActual.C_ID_MODELO + "'>" + ModeloActual.C_NOMBRE_MODELO + "</option>";
        ddlModelos.append(nuevaAccion);
    });
}

/* CARGAMOS LA LISTA DE LOS TIPOS DE VEHICULOS */

///carga los registros de las provincias
function cargarListaTipos() {
    ///dirección a donde se enviarán los datos
    var url = '/Vehiculo/RetornarTipos';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
    };
    ///invocar el método
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            procesarResultadoTipos(data);
        },
        error: function (jQxhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
}


function procesarResultadoTipos(data) {
    ///mediante un selector nos posicionamos sobre la lista de provincias
    var ddlTipos = $("#C_ID_TIPO_VEHICULO");
    ///"limpiamos" todas las opciones de la lista de provincias
    ddlTipos.empty();

    ///empezamos a trabajar con los datos que nos retorna el servidor
    ///creamos la primera opción de la lista, con un valor vacío y el texto de "Seleecione un valor"
    var nuevaOpción = "<option value=''>Seleccione un Tipo</option>";
    ///agregamos la opción al dropdownlist
    ddlTipos.append(nuevaOpción);
    ///empezamos a recorerrer cada uno de los registros obtenidos
    $(data).each(function () {
        ///obtenemos el objeto de tipo Provincia haciendo uso de la claúsula "this"                        
        //ahora podemos acceder a todas las propiedades
        ///por ejemplo provinciaActual.nombre nos retorna el nombre de la provincia
        var TipoActual = this;
        ///creamos la opción de la lista, con el valor del id de provioncia y el texto con el nomnbre
        nuevaOpción = "<option value='" + TipoActual.C_ID_TIPO_VEHICULO + "'>" + TipoActual.C_NOMBRE_TIPO + "</option>";
        ///agregamos la opción al dropdownlist
        ddlTipos.append(nuevaOpción);
    });
}



/* CONSULTAMOS LOS DATOS DEL VEHICULO A MODIFICAR */

function obtenerDetalleVehiculo() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Vehiculo/RetornaLista'
    var parametros = {
            C_PLACA:"123457"};
    var funcion = MostrarDetalleVehiculo;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}

function MostrarDetalleVehiculo(data) {
    $(data).each(function () {
        var TipoActual = this;
        var nombre = TipoActual.C_PLACA;

        alert(nombre);
    });
}
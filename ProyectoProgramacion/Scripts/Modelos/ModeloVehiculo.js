$(function () {
    OcultarAlertasBotones();
    ConsultarListaPais();
    ConsultarListaFabricante();
    CargarListaMarcas();
    EventosClick();
    ConsultarModelos();
    EventoChange();
    ValidarFormularioModelo();
    ObetenerDatoGrid();
});
//EVENTOS CLICK
function EventosClick() {
    //Activa el boton registrar en el modal
    $("#btnRegistrarModelo").on("click", function () {
        $("#btnRegistrar").show();
        $("#btnModificarModelo").hide();
        $("#divIdModelo").hide();
    });

    $("#btnRegistrar").on("click", function () {
        ///asignar a la variable formulario
        ///el resultado del selector
        var formulario = $("#frmRegistroModelo");
        ///ejecutar el método de validación
        formulario.validate();
        ///si el formulario es válido, proceder a
        ///ejecutar la función invocarMetodoPost
        if (formulario.valid()) {
            //CAPTURMAOS LOS DATOS SELECCIONADOS
            var Marca = $("#C_ID_MARCA").val()
            var Nombre = $("#C_NOMBRE_MODELO").val()
            /////construir la dirección del método del servidor
            var urlMetodo = '/Modelos/RegistrarModelo'
            var parametros = {
                C_ID_MARCA: Marca,
                C_NOMBRE_MODELO: Nombre
            };
            var funcion = MostrarResultadoRegistro;
            ///ejecuta la función $.ajax utilizando un método genérico
            //para no declarar toda la instrucción siempre
            ejecutaAjax(urlMetodo, parametros, funcion);
        }
    });

    //MODIFICAR DATOS
    $("#btnModificarModelo").on("click", function () {
        ///asignar a la variable formulario
        ///el resultado del selector
        var formulario = $("#frmRegistroModelo");
        ///ejecutar el método de validación
        formulario.validate();
        ///si el formulario es válido, proceder a
        ///ejecutar la función invocarMetodoPost
        if (formulario.valid()) {
            ObtenerDatosModificarModelo();
        }
    });

    //ELIMINAR DATOS MARCA
    $("#btnEliminar").on("click", function () {
        ObtenerDatosEliminaMarca();
    });
}

//FUNCION MODIFICA LOS DATOS DE LAS MARCAS
function ObtenerDatosModificarModelo() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Modelos/ModificarModelo'
    var parametros = {
        C_ID_MODELO: $("#C_ID_MODELO").val(),
        C_ID_MARCA: $("#C_ID_MARCA").val(),
        C_NOMBRE_MODELO: $("#C_NOMBRE_MODELO").val()
    };
    var funcion = MostrarResultadoRegistro;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
//OCULTAR ALERTAS Y BOTONES
function OcultarAlertasBotones() {
    $("#AlertaExito").hide();
    $("#btnModificarModelo").hide();
    $("#divIdModelo").hide();
    $("#divAlertaElimina").hide();
}

//EVENTOS CHANGE
function EventoChange() {
    $("#Pais").change(function () {
        var pais = $("#Pais").val();
        ConsultarListaFabricante(pais);
    });
    $("#Fabricante").change(function () {
        var pais = $("#Fabricante").val();
        CargarListaMarcas(pais);
    });
}
//Funcion que carga los fabricantes
function ConsultarListaPais() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/MarcaVehiculo/ListaPais'
    var parametros = {};
    var funcion = procesarResultadoPais;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
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

//Funcion que carga los fabricantes
function ConsultarListaFabricante(pais) {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Vehiculo/RetornaFabricantes'
    var parametros = {
        C_ID_PAIS: pais
    };
    var funcion = ProcesaResultadoFabricantes;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
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
//Funcion que carga los Marcas
function CargarListaMarcas(pC_ID_FABRICANTE) {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Vehiculo/RetornaMarcasFabricante';
    var parametros = {
        C_ID_FABRICANTE: pC_ID_FABRICANTE
    };
    var funcion = ProcesaResultadoMarcas;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
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

//MOSTRAMOS ALERTA
function MostrarAlertaExito() {
    $('#AlertaExito').fadeTo(2000, 500).slideUp(500, function () {
        $("#AlertaExito").slideUp(500);
    }); //muestro mediante id
}
//MOSTRAMOS ELIMINA
function MostrarAlertaElimina() {
    $('#divAlertaElimina').fadeTo(2000, 500).slideUp(500, function () {
        $("#divAlertaElimina").slideUp(500);
    }); //muestro mediante id
}
//VALIDAR FORMULARIO
function ValidarFormularioModelo() {
    $("#frmRegistroModelo").validate(
        {
            rules: {
                C_NOMBRE_MARCA: {
                    required: true,
                    maxlength: 60,
                    minlength: 1
                },
                Pais: {
                    required: true
                },
                Fabricante: {
                    required: true
                },
                C_ID_MARCA: {
                    required: true
                }

            }

        }
    );
}

//FUNCION OBTIENE EL DATO SELECCIONADO DEL GRID
function ObetenerDatoGrid() {
    $("#btnModificar").on("click", function () {
        //Apagams el boton de registrar
        $("#btnRegistrar").hide();
        //Encendemos el boton de modificar
        $("#btnModificarModelo").show();
        //ENCENDEMOS EL DIV DEL ID DE LA MARCA
        $("#divIdModelo").show();
        //CAPTURAMOS LOS DATOS DEL GRID
        var grid = $("#divListaModelo").data("kendoGrid");
        var selectedDataItem = grid.dataItem(grid.select());
        //SELECCIONAMOS O MOSTRAMOS EL PAIS DE FABRICANTE
        $("#Pais").val(selectedDataItem.C_ID_PAIS);
        ConsultarListaFabricante(selectedDataItem.C_ID_PAIS);
        $("#Fabricante").val(selectedDataItem.C_ID_FABRICANTE);
        CargarListaMarcas(selectedDataItem.C_ID_FABRICANTE);
        $("#C_ID_MARCA").val(selectedDataItem.C_ID_MARCA);//SELECCIONA LA LISTA DE MARCAS
        $("#C_NOMBRE_MODELO").val(selectedDataItem.C_NOMBRE_MODELO)
        $("#C_ID_MODELO").val(selectedDataItem.C_ID_MODELO)
    });

}
//MUESTRA EL RESULTADO AL REGISTRAR O MODIFICAR UNA MARCA
function MostrarResultadoRegistro(data) {
    $("#lblMensaje").text(data.resultado);
    MostrarAlertaExito();
}
//MUESTRA EL RESULTADO AL ELIMINAR UNA MARCA
function MostrarResultadoElimina(data) {
    $("#lblElimina").text(data.resultado);
    MostrarAlertaElimina();
}

/*consulta la lista de marcas*/
function ConsultarModelos() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Modelos/MostrarModelos'
    var parametros = {};
    var funcion = creaGrid;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
//Funcion para cargar el grid
function creaGrid(data) {
    $("#divListaModelo").kendoGrid({
        dataSource: {
            data: data.resultado,
            pageSize: 6
        },
        pageable: true,
        columnMenu: true,
        sortable: true,
        selectable: "multiple",
        toolbar: ["search"],
        columns: [
            {
                field: 'C_ID_MODELO',
                title: 'Id Modelo'
            },
            {
                field: 'C_NOMBRE_MODELO',
                title: 'Nombre Modelo'
            },
            {
                field: 'C_NOMBRE_MARCA',
                title: 'Nombre Marca'
            },
            {
                field: 'C_NOMBRE_FABRICANTE',
                title: 'Nombre Fabricante'
            },
            {
                field: 'C_NOMBRE_PAIS',
                title: 'Nombre País'
            }
        ]


    });
}
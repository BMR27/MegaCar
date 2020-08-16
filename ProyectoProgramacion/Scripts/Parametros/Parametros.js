//Document ready
$(function () {
    ConsultarListaParametros();
    OcultarAlertasBotones();
    CapturarDatosFormulario();
    ValidarRegistroParametros();
    ObetenerDatoGrid();
});

//OCULTAR ALERTAS Y BOTONES
function OcultarAlertasBotones() {
    $("#AlertaExito").hide();
    $("#btnModificarParametro").hide();
    $("#divIdParametro").hide();
    $("#divAlertaElimina").hide();
}

//VALIDAR FORMULARIO
function ValidarRegistroServicio() {
    $("#frmRegistroParametro").validate(
        {
            rules: {
                C_NOMBRE_ORGANIZACION: {
                    required: true,
                    maxlength: 60,
                    minlength: 1
                },
                C_CORREO_APERTURA: {
                    required: true,
                    email:true
                },
                C_CORREO_CIERRE: {
                    required: true,
                    email: true
                },
                C_MONTO_MINIMO: {
                    required: true
                }

            }

        }
    );
}
//CAPTURAMOS LOS DATOS DEL FORMULARIO
function CapturarDatosFormulario() {
    //Activa el boton registrar en el modal
    $("#btnRegistrarParametro").on("click", function () {
        $("#btnRegistrar").show();
        $("#btnModificarParametro").hide();
    });

    $("#btnRegistrar").click(function () {
        //CAPTURAMOS LOS DATOS SELECCIONADOS
        var Nombre = $("#C_NOMBRE_ORGANIZACION").val()
        var Correo_1 = $("#C_CORREO_APERTURA").val()
        var Correo_2 = $("#C_CORREO_CIERRE").val()
        var Monto = $("#C_MONTO_MINIMO").val()
        /////construir la dirección del método del servidor
        var urlMetodo = '/Parametros/RegistrarParametros'
        var parametros = {
            C_NOMBRE_ORGANIZACION: Nombre,
            C_CORREO_APERTURA: Correo_1,
            C_CORREO_CIERRE: Correo_2,
            C_MONTO_MINIMO: Monto
        };
        var funcion = MostrarResultadoRegistro;
        ///ejecuta la función $.ajax utilizando un método genérico
        //para no declarar toda la instrucción siempre
        ejecutaAjax(urlMetodo, parametros, funcion);
    });
    //MODIFICAR DATOS
    $("#btnModificarParametro").on("click", function () {
        ///asignar a la variable formulario
        ///el resultado del selector
        var formulario = $("#frmRegistroParametro");
        ///ejecutar el método de validación
        formulario.validate();
        ///si el formulario es válido, proceder a
        ///ejecutar la función invocarMetodoPost
        if (formulario.valid()) {
            ObtenerDatosModificarParametros();
        }
    });

    //ELIMINAR DATOS PARAMETROS
    $("#btnEliminar").on("click", function () {
        ObtenerDatosEliminaParametros();
    });
}
function MostrarResultadoRegistro(data) {
    alert(data.resultado);
}


/*Eventos change*/
function EventoChange() {
    $("#C_NOMBRE_ORGANIZACION").change(function () {
        var parametros = $("#C_NOMBRE_ORGANIZACION").val();
        ConsultarListaParametros(parametros);
    });
}

/*consulta la lista de Parametros*/
function ConsultarListaParametros() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Parametros/MostrarParametros'
    var parametros = {};
    var funcion = creaGrid;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
//Funcion para cargar el grid
function creaGrid(data) {
    $("#divListaParametros").kendoGrid({
        dataSource: {
            data: data.resultado,
            pageSize: 10
        },
        pageable: true,
        columnMenu: true,
        sortable: true,
        selectable: "multiple",
        toolbar: ["search"],
        columns: [
            {
                field: 'C_ID_PARAMETROS',
                title: 'Id Parametros'
            },
            {
                field: 'C_NOMBRE_ORGANIZACION',
                title: 'Nombre de la Organizacion'
            },
            {
                field: 'C_CORREO_APERTURA',
                title: 'Correo de Apertura'
            },
            {
                field: 'C_CORREO_CIERRE',
                title: 'Correo de Cierre'
            },
            {
                field: 'C_MONTO_MINIMO',
                title: 'Monto'
            }
        ]


    });
}


//MUESTRA EL RESULTADO AL REGISTRAR O MODIFICAR UN PARAMETRO
function MostrarResultadoRegistro(data) {
    //alert(data.resultado);
    //$("#lblMensaje").val(data.resultado);
    $("#lblMensaje").text(data.resultado);
    MostrarAlertaExito();
}
//MUESTRA EL RESULTADO AL ELIMINAR UN SERVICIO
function MostrarResultadoElimina(data) {

    $("#lblElimina").text(data.resultado);
    MostrarAlertaElimina();
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

//FUNCION OBTIENE EL DATO SELECCIONADO DEL GRID
function ObetenerDatoGrid() {
    $("#btnModificar").on("click", function () {
        //Apagams el boton de registrar
        $("#btnRegistrar").hide();
        //Encendemos el boton de modificar
        $("#btnModificarParametro").show();
        //ENCENDEMOS EL DIV DEL ID DE SERVICIO
        $("#divIdParametro").show();
        //CAPTURAMOS LOS DATOS DEL GRID
        var grid = $("#divListaParametros").data("kendoGrid");
        var selectedDataItem = grid.dataItem(grid.select());
        //SELECCIONAMOS O MOSTRAMOS 
        $("#C_MONTO_MINIMO").val(selectedDataItem.C_MONTO_MINIMO);
        $("#C_NOMBRE_ORGANIZACION").val(selectedDataItem.C_NOMBRE_ORGANIZACION);
        $("#C_ID_PARAMETROS").val(selectedDataItem.C_ID_PARAMETROS);
        $("#C_CORREO_APERTURA").val(selectedDataItem.C_CORREO_APERTURA);
        $("#C_CORREO_CIERRE").val(selectedDataItem.C_CORREO_CIERRE);

    });

}


//FUNCION MODIFICA LOS DATOS DE LOS PARAMETROS
function ObtenerDatosModificarParametros() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Parametros/ModificarParametro'
    var parametros = {
        C_ID_PARAMETROS: $("#C_ID_PARAMETROS").val(),
        C_CORREO_APERTURA: $("# C_CORREO_APERTURA").val(),
        C_CORREO_CIERRE: $("#C_CORREO_CIERRE").val(),
        C_MONTO_MINIMO: $("#C_MONTO_MINIMO").val()
    };
    var funcion = MostrarResultadoRegistro;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}



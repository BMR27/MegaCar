//Document ready
$(function () {
    //ConsultarListaServicios();
    //OcultarAlertasBotones();
    //CapturarDatosFormulario();
    MostrarFecha();
    crearDataPicker();
    //ObetenerDatoGrid();
    EventoClick();
});

function EventoClick() {
    $("#btnConsultar").on("click", function () {
        ConsultarListaVehiculos();
    });
}

function crearDataPicker() {
    $("#C_FECHA").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "c-50:c+1",
        dateFormat: "yy/mm/dd"});
}




//FUNCION MUESTRA LOS CIERRES
function MostrarFecha() {
    var urlMetodo = '/Caja/RetornarCierreDeCaja'
    var parametros = {};
    var funcion = procesarResultadoCliente;
    ejecutaAjax(urlMetodo, parametros, funcion);
}

function procesarResultadoCliente(data) {
    var ddlCliente = $("#cliente");
    ddlCliente.empty();
    var nuevaOpción = "<option value=''>Seleccione una Cliente</option>";
    ddlCliente.append(nuevaOpción);
    $(data).each(function () {
        var ClienteActual = this;
        nuevaOpción = "<option value='" + ClienteActual.C_ID_CLIENTE + "'>" + ClienteActual.C_NOMBRE_CLIENTE + " " + ClienteActual.C_APELLIDO1 + " " + ClienteActual.C_APELLIDO2 + "</option>";
        ddlCliente.append(nuevaOpción);
    });
}
//OCULTAR ALERTAS Y BOTONES
function OcultarAlertasBotones() {
    $("#AlertaExito").hide();
    $("#divIdServicio").hide();
    $("#divAlertaElimina").hide();
}


//VALIDAR FORMULARIO
function ValidarRegistroCliente() {
    $("#frmReportes_CierreCaja").validate(
        {
            rules: {
                C_FECHA: {
                    required: true,
                    maxlength: 60,
                    minlength: 1
                }

            }



        }
    );
}


/*consulta la lista de cierres*/
function ConsultarListaCierres() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Reporte_CierreCaja_/MostrarCierres'
    var parametros = {
        C_FECHA: $("#C_FECHA").val()
    };
    var funcion = creaGrid;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
//Funcion para cargar el grid
function creaGrid(data) {
    $("#divListaCierreCaja").kendoGrid({
        dataSource: {
            data: data.resultado,
            pageSize: 15
        },
        pageable: true,
        columnMenu: true,
        sortable: true,
        selectable: "multiple",
        toolbar: ["search"],
        columns: [
            {
                field: 'C_NOMBRE',
                title: 'Nombre'
            },
            {
                field: 'C_APELLIDO1',
                title: 'Apellido'
            },
            {
                field: 'C_MONTO',
                title: 'Monto'
            },
            {
                field: 'C_FECHA',
                title: 'Fecha'
            }

        ]


    });
}


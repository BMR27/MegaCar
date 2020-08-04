$(function () {
    OcultarAlerta();
    ValidarRegistroVehiculo();
    EventosClick();
    ConsultarVehiculosPorCliente();
});
function EventosClick() {
    /* BOTON ABRIR FORMULARIO */
    $("#btnRegistrar").on("click", function () {
        var formulario = $("#frmRegistraVehiculo")

        formulario.validate();

        if (formulario.valid()) {
            CapturarDatosRegistro();
        }
    });
}

function CapturarDatosRegistro() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/VehiculosPorCliente/RegistrarVehiculoPorCliente'
    var parametros = {
        C_ID_CLIENTE: $("#Cliente").val(),
        C_PLACA: $("#Vehiculo").val(),
    };
    var funcion = MostrarResultadoRegistro;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
/* OCULTAR ALERTA */
function OcultarAlerta() {
    $("#AlertaExito").hide();
}
//MOSTRAMOS ALERTA
function MostrarAlertaExito() {
    $('#AlertaExito').fadeTo(2000, 500).slideUp(500, function () {
        $("#AlertaExito").slideUp(500);
    }); //muestro mediante id
}
//MUESTRA EL RESULTADO AL REGISTRAR O MODIFICAR UNA MARCA
function MostrarResultadoRegistro(data) {
    $("#lblMensaje").text(data.resultado);
    MostrarAlertaExito();
}
/* VALIDAMOS EL FORMULARIO */
function ValidarRegistroVehiculo() {
    $("#frmRegistraVehiculo").validate(
        {
            rules: {
                Vehiculo: {
                    required: true
                },
                Cliente: {
                    required: true
                }

            }

        }
    );
}
/* CONSULTAMOS LOS VEHICULOS POR CLIENTE */
function ConsultarVehiculosPorCliente() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/VehiculosPorCliente/MosrtarVehiculosPorCliente'
    var parametros = {};
    var funcion = creaGrid;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
function creaGrid(data) {
    $("#DivTablaDatos").kendoGrid({
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
                field: 'C_PLACA',
                title: 'Placa'
            },
            {
                field: 'C_NOMBRE_CLIENTE',
                title: 'Cliente'
            },
            {
                field: 'C_APELLIDO1',
                title: 'Apellido 1'
            },
            {
                field: 'C_APELLIDO2',
                title: 'Apellido 2'
            }
        ]


    });
}
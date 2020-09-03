//Document ready
$(function () {
    crearDataPicker();
    EventoClick();
});

function EventoClick() {
    $("#btnConsultar").on("click", function () {
        ConsultarCierreCaja();
    });
}

function crearDataPicker() {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "c-50:c+1",
        dateFormat: "yy/mm/dd"
    });
}


//VALIDAR FORMULARIO
function ValidarCierreCaja() {
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
function ConsultarCierreCaja() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Reporte_CierreCaja_/MostrarCierres'
    var parametros = {
        C_FECHA: $("#datepicker").val()
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





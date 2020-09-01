$(function () {
    /* RETORNAMOS LAS FACTURAS */
    RetornarFacturas();
    /* OCULTAMOS LA ALERTA */
    OcultarAlerta();
    /* EVENTOS CLICK */
    EventosClick();
});

function EventosClick() {
    $("#btnAnular").on("click", function () {
        AnularFactura();
    });
}
/* OCULTAR ALERTA */
function OcultarAlerta() {
    $("#divAlerta").hide();
}
/* RETORNA LAS FACTURAS */
function RetornarFacturas() {
    var url = '/Anular/RetornarFacturas'
    var parametros = {};
    var funcion = ProcesarRetornarFacturas;
    ejecutaAjax(url, parametros,funcion)
}
function ProcesarRetornarFacturas(data) {
    $("#divListaFacturas").kendoGrid({
        dataSource: {
            data: data,
            pageSize: 15
        },
        pageable: true,
        columnMenu: true,
        sortable: true,
        selectable: "multiple",
        toolbar: ["search"],
        columns: [
            {
                field: 'C_ID_ENCABEZADO_FACTURA',
                title: 'Id '
            },
            {
                field: 'C_FECHA',
                title: 'Fecha'
            },
            {
                field: 'NOMBRE',
                title: 'Nombre'
            },
            {
                field: 'C_TOTAL',
                title: 'Total Factura'
            },
            {
                field: 'ESTADO',
                title: 'Estado'
            }
        ]


    });
}

/* ANULAR FACTURA */
function AnularFactura() {
    var url = '/Anular/AnularFactura'
    /* CAPTURAMOS LOS DATOS DEL GRID */
    var grid = $("#divListaFacturas").data("kendoGrid");
    var selectedDataItem = grid.dataItem(grid.select());
    var parametros = {
        C_ID_ENCABEZADO_FACTURA: selectedDataItem.C_ID_ENCABEZADO_FACTURA
    }
    var funcion = ProcesarAnularFactura;
    ejecutaAjax(url, parametros, funcion);
}
function ProcesarAnularFactura(Data) {
    $("#lblMensaje").text(Data.resultado);
    MostrarAlertaExito();
    RetornarFacturas();
}

//MOSTRAMOS ALERTA
function MostrarAlertaExito() {
    $('#divAlerta').fadeTo(2000, 500).slideUp(500, function () {
        $("#divAlerta").slideUp(500);
    }); //muestro mediante id
}
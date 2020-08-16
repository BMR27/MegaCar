$(function () {
    /* RETORNA EL MONTO DE APERTURA DE CAJA  */
    RetornaMontoApertura();
    /* VALIDA QUE EL CAMPO DE MONTO MINIMO NO ESTE VACÍO */
    ValidarMontoApertura();
    /* OCULTAMOS LA ALERTA */
    OcultarAlerta();
    /* EVENTOS CLICK */
    EventosClick();
});
/* EVENTOS CLICK */
function EventosClick() {
    /* EJECUTAMOS EL REGISTRAR APERTURA */
    $("#btnRegistrar").on("click", function () {
        var formulario = $("#frmAperturaCaja")
        formulario.validate();
        if (formulario.valid()) {
            RegistrarApertura();
        }
    });

    /* EJECUTAMOS EL REGISTRAR CIERRE CAJA */
    $("#btnCierreCaja").on("click",function () {
        RegistrarCierre();
    });
    /* EJECUTAMOS CUANDO LLAMAMOS EL MODAL */
    $("#btnAperturaCaja").on("click", function () {
        RetornaMontoApertura();
    });
}
/* RETORNAMOS EL MONTO */
function RetornaMontoApertura() {
    var url = '/Caja/RetornarParametros'
    var parametros = {};
    var funcion = ProcesarResultadoRetornaMontoApertura;
    ejecutaAjax(url, parametros, funcion);
}

function ProcesarResultadoRetornaMontoApertura(data) {
    $("#C_MONTO").val(data[0].C_MONTO_MINIMO);
}

//VALIDAR FORMULARIO
function ValidarMontoApertura() {
    $("#frmAperturaCaja").validate(
        {
            rules: {
                C_MONTO: {
                    required: true
                }
            }

        }
    );
}
/* OCULTA LA ALERTA */
function OcultarAlerta() {
    $("#alerta").hide();
    $("#divCierre").hide();
}

//MOSTRAMOS ALERTA
function MostrarAlerta() {
    $('#alerta').fadeTo(2000, 500).slideUp(500, function () {
        $("#alerta").slideUp(500);
    }); //muestro mediante id
}
//MOSTRAMOS ALERTA lblMensajeCierre
function MostrarAlertalblMensajeCierre() {
    $('#divCierre').fadeTo(2000, 500).slideUp(500, function () {
        $("#divCierre").slideUp(500);
    }); //muestro mediante id
}
/* REGISTRAMOS UNA APERTURA DE CAJA */
function RegistrarApertura() {
    var url = '/caja/RegistrarAperturaCaja';
    var parametros = {
        C_MONTO: $("#C_MONTO").val()
    }
    var funcion = ProcesarRegistrarApertura;
    ejecutaAjax(url, parametros, funcion);

}

function ProcesarRegistrarApertura(data) {
    MostrarAlerta();
    $("#lblMensaje").text(data.resultado);
}
/* REGISTRAMOS UN CIERRE DE CAJA */
function RegistrarCierre() {
    var url = '/caja/RegistrarCierreCaja';
    var parametros = {}
    var funcion = ProcesarCierreApertura;
    ejecutaAjax(url, parametros, funcion);

}

function ProcesarCierreApertura(data) {
    MostrarAlertalblMensajeCierre();
    $("#lblMensajeCierre").text(data.resultado);
}
﻿$(function () {
    ValidarCamposPais();
    // EventoCapturaDatosLogin();
});
/* EVENTO QUE VALIDA LOS CAMPOS DE INICIO DE SESION */
function ValidarCamposPais() {
    $("#frmRegistraPais").validate(

        {
            rules: {
                C_NOMBRE_TIPO: {
                    required: true,
                    maxlength: 60,
                    minlength: 1
                }
            }

        }
    );
}



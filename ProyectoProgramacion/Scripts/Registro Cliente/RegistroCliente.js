

$(function () {
    creaValidaciones();
});

///crea las validaciones para el formulario
function creaValidaciones() {
    $("#frmRegistraCliente").validate({
        ///objeto que contiene "las condiciones" que el formulario
        ///debe cumplir para ser considerado válido
        rules: {
            C_NOMBRE_CLIENTE: {
                required: true,
                minlength: 3,
                maxlength: 7
            },
            C_APELLIDO1: {
                required: true
            },
            C_APELLIDO2: {
                required: true
            },
            C_CEDULA: {
                required: true,
                email: true
            },
            C_CORREO: {
                required: true,
                maxlength: 12
            },
            C_DIRECCION: {
                required: true
            },
            C_TELEFONO: {
                required: true
            },
            id_Provincia: {
                required: true
            },
            id_Canton: {
                required: true
            },
            id_Distrito: {
                required: true
            }
        }
    });
}

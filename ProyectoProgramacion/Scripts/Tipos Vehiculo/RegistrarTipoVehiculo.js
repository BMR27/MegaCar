$(function () {
    ValidarCamposTipo();
    // EventoCapturaDatosLogin();
});
/* EVENTO QUE VALIDA LOS CAMPOS DE INICIO DE SESION */
function ValidarCamposTipo() {
    $("#frmRegistrarTipo").validate(

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
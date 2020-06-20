$(function () {
    estableceMensajesJqueryValidate();
});

function estableceMensajesJqueryValidate() {
    $.extend($.validator.messages, {
        maxlength: $.validator.format("Favor ingrese {0} o menos caracteres"),
        minlength: $.validator.format("Favor ingrese al menos {0} caracteres"),
        required: $.validator.format("Valor Requerido"),
        url: "Debe ingresar una dirección web válida",
        rangelength: $.validator.format("Favor ingrese un valor entre {0} y {1} caracteres de longitud"),
        range: $.validator.format("Favor ingrese un valor entre {0} y {1}"),
        max: $.validator.format("Favor ingrese un valor menor o igual a: {0}"),
        min: $.validator.format("Favor ingrese un valor mayor o igual a: {0}"),
        number: "Favor ingrese un número válido",
        digits: "Favor ingrese solo números",
        email: "Favor ingrese una dirección de correo electrónico válida",
        accept: $.validator.format("Favor seleccione un formato válido {0}"),
        extension: $.validator.format("Favor seleccione un formato válido {0}"),
        require_from_group: $.validator.format("Ingrese al menos uno de estos valores")
    });
}
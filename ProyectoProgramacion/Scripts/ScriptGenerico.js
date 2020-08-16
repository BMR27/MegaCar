function ejecutaAjax(url, parametros, funcionSuccess) {
    $.ajax({
        url: url,
        dataType: 'json', //formato en los que se envían los datos
        type: 'post',//tipo de método(post o get)
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            funcionSuccess(data);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
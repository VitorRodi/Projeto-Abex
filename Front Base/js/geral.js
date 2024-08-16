function sizewindow() {

    var height = $(document).height();
    //$('.content_middle').css('height', (height - 200) + 'px');
    $('.main_bg_panel').css('height', height + 'px');

}

function help(action) {

    if (action == 'close') {
        $('.help_panel').slideToggle();
        $('.main_bg_panel').fadeOut();
    } else {
        $('.main_bg_panel').fadeIn('fast', function () {
            $('.help_panel').slideToggle();
        });

    }
}

function validacao_ps(id, cond) {
    erro_radio = 0;
    erro_select = 0;
    erro_text = 0;
    erro = "";
    field_name = "";

    if ($('#rg').val() == "") {
        alert('Preencha o número do RG');
        return false;
    }

    if (cond == 'next') {

        $('.' + id + ' .form-group').each(function () {

            erro_radio = 0;
            $('input[type="radio"]', this).each(function () {
                if (!$(this).is(":checked") && $(this).attr('data-obrigatorio') == 'true') {
                    erro_radio++;
                    field_name = $(this).attr('name');
                }
            });

            if (erro_radio == 2) {
                return false;
            }

        });

        $('.' + id + ' .form-group select').each(function () {
            if ($(this).val() == "" && $(this).attr('data-obrigatorio') == 'true') {
                erro_select++;
                field_name = $(this).attr('name');
            }

            if (erro_select == 1) {
                return false;
            }
        });

        $('.' + id + ' .form-group input[type="text"]').each(function () {
            if ($(this).val() == "" && $(this).attr('data-obrigatorio') == 'true') {
                erro_text++;
                field_name = $(this).attr('name');
            }

            if (erro_text == 1) {
                return false;
            }
        });

        if (erro_radio == 2) {

            alert('Responda todas as perguntas da pré-triagem (' + field_name + ')');
            return false;

        } else {
            if (erro_select >= 1) {

                alert('Responda todas as perguntas da pré-triagem (' + field_name + ')');
                return false;

            } else {
                if (erro_text >= 1) {

                    alert('Responda todas as perguntas da pré-triagem (' + field_name + ')');
                    return false;

                } else {

                    return true;

                }
            }

        }

    }
}

function validacao_cadastro() {
    erro_text = 0;
    $('#atendimento input[type="text"]').each(function () {
        if ($(this).val() == "") {
            erro_text++;
        }

        if (erro_text == 1) {
            return false;
        }
    });

    if (erro_text >= 1) {
        alert('Preencha todos os campos do cadastro');
        return false;
    } else {
        return true;
    }
}

function show_steps(id, action) {

    var id = parseInt(id);

    if (validacao_ps('passo' + id, action) || action == 'prev') {


        $("div[class^='passo']").each(function () {
            $(this).hide();
        });

        if (action == 'next' && id != 7) {
            id = id + 1;
        } else if (action == 'prev' && id != "0") {
            id = id - 1;
        }

        if (id == 1) {
            $('#voltar').hide();
        } else {
            $('#voltar').fadeIn();
        }
        if (id == 7) {
            $('#continuar').val("FINALIZAR");
            $('#continuar').attr('onclick', "window.location.href='usuario_finalizacao.html'");
        } else {
            $('#continuar').val("CONTINUAR");
            $('#continuar').attr('onclick', "show_steps($('#step').val(), 'next')");
        }


        $("div[class='passo" + id + "']").show();
        $("#step").val(id);
        $("#step_text").html(id);


        if (id == 1) {
            progress = 0;
        } else if (id == 7) {
            progress = 100;
        } else {
            progress = (id * 14);
        }

        $('.progress-bar').css({
            'width': progress + '%'
        });
    }

}

window.setInterval('sizewindow()', 0);

$(function () {
    $('.close').click(function () {
        help('close');
    });


});

function listuni(id) {
    $('div[class^="listuni"]').each(function () {
        $(this).css({
            'box-shadow': '0px 0px 0px #fff'
        });
        $('.dataunidade').hide();
    })
    $(id).css({
        'box-shadow': 'rgba(0, 121, 105, 0.53) 0px 0px 7px inset'
    });
     $('#hora, #hi').hide();
    $('.dataunidade').val("");
    $('.dataunidade').fadeIn();
}

function showhi(val) {
    //alert(val);
    $('#hora, #hi').hide();
    if (val != '2016-05-31') {
        $('#hora').fadeIn();
    } else {
        $('#hi').fadeIn();
    }
}

function showtable(table) {
    $("div[data-especialidade]").each(function () {
        $(this).hide();
    });
    $("div[data-especialidade='" + table + "']").fadeIn();
}
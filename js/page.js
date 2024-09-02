document.addEventListener("DOMContentLoaded", function () {

    var customBgDivs = document.querySelectorAll('.custom-bg');
    customBgDivs.forEach(function (element) {
        var bgImage = element.getAttribute('data-bg-image');
        if (bgImage) {
            element.style.backgroundImage = "url('" + bgImage + "')";
        }
    });
});

$(document).ready(function () {

    $(function () {
        var selectdefault = $(".dropdown-menu .dropdown-item:first");
        Textlenguaje(selectdefault);
    });

    $('.dropdown-item').click(function () {
        Textlenguaje($(this));
    });

    function Textlenguaje(option) {
        var selectedLanguage = option.data('language');
        // Remover la clase 'active' de todos los elementos
        $('.dropdown-item').removeClass('active');
        // Agregar la clase 'active' al elemento clicado
        option.addClass('active');

        // Cambiar el texto (dwn) según el idioma seleccionado
        $('.dropdown-item').each(function () {
            if (selectedLanguage === 'en') {
                $(this).text($(this).attr('text-en'));
            } else if (selectedLanguage === 'es') {
                $(this).text($(this).attr('text-es'));
            }
        });
        // Cambiar el texto según el idioma seleccionado
        $('[id^="title-"], [id^="text-"], [id^="btn-"]').each(function () {
            if (selectedLanguage === 'en') {
                //texto
                $(this).text($(this).attr('text-en'));
                //url
                if ($(this).prop('href'))
                    $(this).prop('href', $(this).attr('hrefen'));
            } else if (selectedLanguage === 'es') {
                //texto
                $(this).text($(this).attr('text-es'));
                //url
                if ($(this).prop('href'))
                    $(this).prop('href', $(this).attr('hrefes'));
            }
        });
    }
});

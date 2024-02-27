
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.feature-title a');

    // Agregar event listener para el cambio de clase feature-active
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            links.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.classList.remove('feature-active'); // Eliminar la clase de todos los enlaces excepto el que se hizo clic
                }
            });
            link.classList.add('feature-active'); // Agregar la clase al enlace que se hizo clic
        });
    });

    // Función para previsualizar el PDF seleccionado
    function previsualizarPdf(selectedPdf) {
    var rutaPdf = ""+ selectedPdf;

    // Eliminar el contenido anterior del contenedor del PDF
    var container = document.getElementById("pdfContainer");
    container.innerHTML = "";

    // Cargar el PDF y mostrar cada página una debajo de la otra en orden
    pdfjsLib.getDocument(rutaPdf).promise.then(function(pdf) {
        var renderPage = function(page, pageNumber) {
            var viewport = page.getViewport({ scale: 1.5 });
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var pageContainer = document.createElement("div");
            pageContainer.className = "pdfPageContainer"; // Agrega una clase al contenedor de la página
            if (pageNumber === 1) {
                pageContainer.style.marginTop = "550px"; // Ajuste de margen superior solo para la primera página
            }
            pageContainer.appendChild(canvas);
            container.appendChild(pageContainer);

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        };

        // Renderizar cada página en orden
        for (let i = 1; i <= pdf.numPages; i++) {
            pdf.getPage(i).then(function(page) {
                renderPage(page, i);
            });
        }
    }).catch(function(error) {
        console.error("Error al cargar el PDF:", error);
    });
}
// Encontrar el enlace con order="1" y autoseleccionar al cargar pagina
const initialLink = document.querySelector('a[order="1"]');
if (initialLink) {
    initialLink.classList.add('feature-active'); // Agregar la clase "feature-active"
    const selectedPdf = initialLink.getAttribute('val'); // Obtener el valor del atributo 'val' del enlace
    previsualizarPdf(selectedPdf); // Llamar a la función previsualizarPdf con el PDF seleccionado
}


// Agregar event listener para previsualizar el PDF al hacer clic en los enlaces
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            links.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.classList.remove('feature-active'); // Eliminar la clase de todos los enlaces excepto el que se hizo clic
                }
            });
            link.classList.add('feature-active'); // Agregar la clase al enlace que se hizo clic
            var selectedPdf = link.getAttribute('val'); // Obtener el valor del atributo 'val' del enlace
            previsualizarPdf(selectedPdf); // Llamar a la función previsualizarPdf con el PDF seleccionado
        });
    });
});

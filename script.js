document.addEventListener('DOMContentLoaded', function() {
    // Inicializar highlight.js para resaltar la sintaxis
    hljs.highlightAll();
    
    // Inicializar clipboard.js para los botones de copiar
    new ClipboardJS('.copy-btn', {
        target: function(trigger) {
            return trigger.parentNode.querySelector('code');
        }
    }).on('success', function(e) {
        const originalText = e.trigger.innerHTML;
        e.trigger.innerHTML = '<i class="bi bi-check-lg"></i> ¡Copiado!';
        setTimeout(function() {
            e.trigger.innerHTML = originalText;
        }, 2000);
        e.clearSelection();
    });
    
    // Navegación del sidebar
    const navLinks = document.querySelectorAll('#sidebar-nav .nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Activar el link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar la sección
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    // Actualizar URL hash
                    window.location.hash = targetSection;
                    // Actualizar la barra de progreso
                    updateProgressBar();
                }
            });
        });
    });
    
    // Botones de navegación entre secciones
    const navButtons = document.querySelectorAll('.next-section-btn, .prev-section-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSectionId = this.getAttribute('data-next') || this.getAttribute('data-prev');
            const targetLink = document.querySelector(`#sidebar-nav .nav-link[data-section="${targetSectionId}"]`);
            if (targetLink) {
                targetLink.click();
                // Hacer scroll al inicio de la página
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Iniciar con el hash de la URL o la primera sección
    const initialSection = window.location.hash.substring(1) || 'intro';
    const initialLink = document.querySelector(`#sidebar-nav .nav-link[data-section="${initialSection}"]`);
    if (initialLink) {
        initialLink.click();
    } else {
        // Si no se encuentra la sección, mostrar la primera
        document.querySelector('#sidebar-nav .nav-link').click();
    }
    
    // Botones para ejecutar código
    const runButtons = document.querySelectorAll('.run-code-btn');

    runButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeId = this.getAttribute('data-code-id');
            const codeContainer = this.closest('.card-body').querySelector('.code-container');
            const codeElement = codeContainer.querySelector('code[class*="language-dart"]');
            const code = codeElement.textContent;
            
            // Mostrar contenedor de salida
            const outputContainer = this.closest('.card-body').querySelector('.output-container');
            const outputElement = outputContainer.querySelector('.output');
            
            outputContainer.classList.remove('d-none');
            outputElement.innerHTML = '<div class="spinner-border spinner-border-sm text-light" role="status"></div> Ejecutando...';
            
            // Simulación de ejecución (en un entorno real, esto se conectaría a un servidor o API de Dart)
            setTimeout(() => {
                let output = '';
                
                // Ejecutar el código correspondiente según el ID
                switch(codeId) {
                    case 'hello-world':
                        output = '¡Hola, Dart!';
                        break;
                    case 'imports':
                        output = '3.0';
                        break;
                    case 'funciones-basicas':
                        output = 'Suma: 8\nHola, Ana!\nProducto: 7.5';
                        break;
                    case 'syntax-exercise':
                        output = 'Lenguaje: Dart\nVersión: 2.19\nAño de creación: 2011\nNúmero PI: 3.14159';
                        break;
                    case 'var-declarations':
                        output = 'Carlos González tiene 30 años\nVive en Calle Principal 123\nEl valor de PI es 3.14159';
                        break;
                    case 'strings-example':
                        output = 'Hola Mundo\nHola Mundo\nHOLA mundo\nEste es un texto\nque ocupa varias\nlíneas.\nC:\\archivos\\nuevos';
                        break;
                    case 'numbers-example':
                        output = 'Suma: 7.5\nResta: 2.5\nMultiplicación: 12.5\nDivisión: 2.0\nDivisión entera: 2\nMódulo: 1\nIncremento: 11\nDecremento: 10\nPotencia: 8.0\nRaíz cuadrada: 3.0\nValor absoluto: 5\nString a int: 42\nString a double: 3.14';
                        break;
                    case 'null-safety':
                        output = 'Nombre: Ana\nDirección: null\nDir: Sin dirección\nLongitud de dirección: null\nDirección actualizada: Calle Principal 123';
                        break;
                    case 'parametros-funciones':
                        output = 'a: 10, b: hola, c: true\n' +
                                'Nombre: Luis, Edad: 25\n' +
                                'Nombre: Desconocido, Edad: 30\n' +
                                'Nombre: María, Edad: 28\n' +
                                'Nombre: Carlos, Edad: 30, Ciudad: Desconocida\n' +
                                'Nombre: Carlos, Edad: 35, Ciudad: Desconocida\n' +
                                'Nombre: Carlos, Edad: 35, Ciudad: Madrid';
                        break;
                    case 'funciones-objeto':
                        output = '10\n' +           // operacion(5, 2)
                                '7\n' +            // sumar(3, 4)
                                'Resultado: 15\n' + // calcular(5, 3, multiplicar)
                                'Resultado: 8\n' +  // calcular(5, 3, (a, b) => a + b)
                                '50';              // funcionGenerada(5)
                        break;
                    case 'recursion':
                        output = 'Factorial de 5: 120\n' +
                                'Fibonacci de 7: 13\n' +
                                'Secuencia de Fibonacci:\n' +
                                'fibonacci(0) = 0\n' +
                                'fibonacci(1) = 1\n' +
                                'fibonacci(2) = 1\n' +
                                'fibonacci(3) = 2\n' +
                                'fibonacci(4) = 3\n' +
                                'fibonacci(5) = 5\n' +
                                'fibonacci(6) = 8\n' +
                                'fibonacci(7) = 13\n' +
                                'fibonacci(8) = 21\n' +
                                'fibonacci(9) = 34';
                        break;
                    // Añadir más casos según sea necesario para cada ejemplo de código
                    default:
                        output = 'Código ejecutado correctamente';
                }
                
                outputElement.innerHTML = output;
            }, 1000);
        });
    });
    
    // Botones para limpiar la salida
    const clearButtons = document.querySelectorAll('.clear-output-btn');
    
    clearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const outputContainer = this.closest('.output-container');
            outputContainer.classList.add('d-none');
            outputContainer.querySelector('.output').innerHTML = '';
        });
    });
    
    // Tabs de instalación
    const installTabs = document.getElementById('installTabs');
    if (installTabs) {
        // Bootstrap 5 ya inicializa los tabs automáticamente
    }
    
    // Quizzes
    const quizButtons = document.querySelectorAll('.check-answer');
    
    quizButtons.forEach(button => {
        button.addEventListener('click', function() {
            const correctAnswer = this.getAttribute('data-correct');
            const quiz = this.closest('.quiz');
            const selectedOption = quiz.querySelector('input[type="radio"]:checked');
            const feedback = quiz.querySelector('.feedback');
            
            if (!selectedOption) {
                feedback.textContent = 'Por favor, selecciona una respuesta';
                feedback.className = 'feedback mt-2 alert alert-warning';
                return;
            }
            
            if (selectedOption.value === correctAnswer) {
                feedback.textContent = '¡Correcto! ¡Muy bien!';
                feedback.className = 'feedback mt-2 correct';
            } else {
                feedback.textContent = 'Incorrecto. Inténtalo de nuevo.';
                feedback.className = 'feedback mt-2 incorrect';
            }
        });
    });
    
    // Actualizar la barra de progreso
    function updateProgressBar() {
        const totalSections = document.querySelectorAll('#sidebar-nav .nav-link').length;
        const activeLinkIndex = Array.from(document.querySelectorAll('#sidebar-nav .nav-link')).findIndex(link => link.classList.contains('active'));
        
        if (activeLinkIndex !== -1) {
            const progress = ((activeLinkIndex + 1) / totalSections) * 100;
            document.querySelector('.progress-bar').style.width = `${progress}%`;
        }
    }
    
    // Detectar desplazamiento y actualizar barra de progreso
    window.addEventListener('scroll', function() {
        updateProgressBar();
    });
});

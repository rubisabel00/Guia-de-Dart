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
    
    // Iniciar con el hash de la URL o la primera sección si no hay hash
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
                    case 'condicionales':
                        output = 'Es mayor de edad\nAdulto\nMayor de edad\nPuede conducir';
                        break;
                    case 'switch-case':
                        output = 'Mitad de semana\nResultado: Muy Bien';
                        break;                    case 'bucles':
                        output = 'Bucle for:\nÍndice: 0\nÍndice: 1\nÍndice: 2\nÍndice: 3\nÍndice: 4\n\nBucle while:\nContador: 0\nContador: 1\nContador: 2\n\nBucle do-while:\nValor de j: 0\nValor de j: 1\nValor de j: 2\n\nBucle for-in:\nFruta: Manzana\nFruta: Banana\nFruta: Naranja\n\nBucle forEach:\nFruta con forEach: Manzana\nFruta con forEach: Banana\nFruta con forEach: Naranja\n\nBucle forEach con función flecha:\nFruta: Manzana\nFruta: Banana\nFruta: Naranja';
                        break;
                    case 'control-bucles':
                        output = 'Bucle interno: 0\nBucle interno: 1\nSaliendo de ambos bucles';
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
                        break;                    case 'code1':
                        output = '¡Hola, Dart!';
                        break;
                    // Casos para la sección de colecciones
                    case 'listas':
                        output = 'Primer número: 1\n' +
                                'Segunda fruta: banana\n' +
                                'Cantidad de números: 5\n' +
                                'Frutas actualizadas: [manzana, banana, naranja, mango]\n' +
                                'Números actualizados: [1, 2, 3, 4, 5, 6, 7, 8]\n' +
                                'Lista con elemento insertado: [manzana, fresa, banana, naranja, mango]\n' +
                                'Lista después de eliminar: [manzana, fresa, naranja, mango]\n' +
                                'Números después de eliminar índice 2: [1, 2, 4, 5, 6, 7, 8]\n' +
                                '¿La lista contiene mango? true\n' +
                                'Índice de mango: 3\n' +
                                'Números ordenados: [1, 2, 4, 5, 6, 7, 8]\n' +
                                'Lista generada: [0, 2, 4, 6, 8]\n' +
                                'Lista no modificable: [10, 20, 30]';
                        break;
                    case 'listas-avanzadas':
                        output = 'Cuadrados: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n' +
                                'Números pares: [2, 4, 6, 8, 10]\n' +
                                'Suma de todos los números: 55\n' +
                                'Suma con valor inicial 100: 155\n' +
                                '¿Hay algún número mayor que 8? true\n' +
                                '¿Todos los números son menores que 20? true\n' +
                                'Primer número par: 2\n' +
                                'Saltando 3 elementos: [4, 5, 6, 7, 8, 9, 10]\n' +
                                'Tomando 4 elementos: [1, 2, 3, 4]\n' +
                                'Encadenamiento de operaciones: [20, 40]';
                        break;
                    case 'sets':
                        output = 'Set de números: {1, 2, 3, 4, 5, 6}\n' +
                                'Set después de intentar añadir duplicado: {1, 2, 3, 4, 5, 6}\n' +
                                'Set de frutas actualizado: {manzana, banana, naranja, fresa, mango}\n' +
                                'Set después de eliminar: {manzana, naranja, fresa, mango}\n' +
                                '¿El set contiene manzana? true\n' + 
                                'Unión de conjuntos: {1, 2, 3, 4, 5, 6}\n' +
                                'Intersección de conjuntos: {3, 4}\n' +
                                'Diferencia de conjuntos (a - b): {1, 2}\n' +
                                '¿c es subconjunto de a? true';
                        break;
                    case 'maps':
                        output = 'Edad de Carlos: 30\n' +
                                'Edad de Juan: null\n' +
                                'Ana está en el mapa con edad: 25\n' +
                                'Mapa actualizado: {Ana: 26, Carlos: 30, Luis: 40}\n' +
                                'Mapa después de eliminar: {Ana: 26, Carlos: 30, Luis: 40}\n' +
                                'Todas las claves: (Ana, Carlos, Luis)\n' +
                                'Todos los valores: (26, 30, 40)\n\n' +
                                'Iterando sobre el mapa de capitales:\n' +
                                'La capital de España es Madrid\n' +
                                'La capital de Francia es París\n' +
                                'La capital de Italia es Roma\n' +
                                'Mapa con putIfAbsent: {Ana: 26, Carlos: 30, Luis: 40, Elena: 28}\n' +
                                'Promedio de Sofía: 9.2';
                        break;
                    case 'inmutables':
                        output = 'Lista inmutable: [1, 2, 3]\n' +
                                'Set inmutable: {1, 2, 3}\n' +
                                'Map inmutable: {a: 1, b: 2}\n' +
                                'Lista mutable después de modificación: [1, 2, 3, 4]\n' +
                                'Copia inmutable (no cambia): [1, 2, 3]';
                        break;
                    case 'clases-basicas':
                        output = 'Nombre: Ana\n' +
                                'Edad: 25\n' +
                                'Hola, soy Ana y tengo 25 años.\n' +
                                'Ana es mayor de edad.\n' +
                                'Carlos no es mayor de edad.\n' +
                                'Edad actualizada: 26';
                        break;
                    case 'encapsulacion':
                        output = 'Titular actual: Juan\n' +
                                'Saldo: 0.0\n' +
                                'Número de cuenta: 123456\n' +
                                'Titular actualizado: María';
                        break;
                    case 'herencia':
                        output = '--- Animal ---\n' +
                                'Nombre: Animal genérico, Edad: 5 años\n' +
                                'El animal hace un sonido\n\n' +
                                '--- Perro ---\n' +
                                'Nombre: Bobby, Edad: 3 años\n' +
                                'Raza: Golden Retriever\n' +
                                'Bobby dice: ¡Guau guau!\n' +
                                'Bobby está corriendo\n\n' +
                                '--- Gato ---\n' +
                                'Nombre: Michi, Edad: 2 años\n' +
                                'Michi dice: ¡Miau!\n' +
                                'Michi está trepando';
                        break;
                    case 'abstractas-interfaces':
                        output = 'Vehículo: Toyota Corolla\n' +
                                'El coche Toyota Corolla se mueve por carretera\n' +
                                '¡Pip pip!\n\n' +
                                'Vehículo: Yamaha Cruiser\n' +
                                'El barco Yamaha Cruiser navega por el agua\n' +
                                'Ancla lanzada\n\n' +
                                'Vehículo: Boeing 747\n' +
                                'El avión Boeing 747 se mueve por el aire\n' +
                                'El avión Boeing 747 está volando a 5000 metros\n' +
                                'El avión Boeing 747 está aterrizando en la pista\n\n' +
                                'El dron DJI-123 está volando\n' +
                                'El dron DJI-123 está aterrizando\n' +
                                'Fotografía tomada\n\n' +
                                'Entidades que pueden volar:\n' +
                                'El avión Boeing 747 está volando a 5000 metros\n' +
                                'El avión Boeing 747 está aterrizando en la pista\n' +
                                'El dron DJI-123 está volando\n' +
                                'El dron DJI-123 está aterrizando';
                        break;                    case 'mixins':
                        output = 'LOG: Conectando a https://api.ejemplo.com - 2025-05-12 12:00:00\n' +
                                'LOG: Desconectando de https://api.ejemplo.com - 2025-05-12 12:00:01\n\n' +
                                'LOG: Usuario creado - 2025-05-12 12:00:02\n' +
                                'LOG: Cambiando email de Ana: ana@ejemplo.com -> ana.nueva@ejemplo.com - 2025-05-12 12:00:03\n' +
                                'Datos serializados: {nombre: Ana, email: ana.nueva@ejemplo.com}\n\n' +
                                'Piolin está volando';
                        break;
                    case 'constructores':
                        output = 'Producto 1: Laptop, 999.99€, Portátil de alta gama\n' +
                                'Producto 2 (con descuento): Teléfono, precio final: 680€\n' +
                                'Producto 3 (desde mapa): Teclado, Teclado mecánico\n' +
                                'Producto 4 (básico): Producto genérico, 0€, General\n' +
                                'Precio con IVA del producto 1: 1209.99€';
                        break;
                    case 'futures':
                        output = 'Inicio del programa\n' +
                                'Este mensaje aparece después de 2 segundos\n' +
                                'Valor procesado: Este mensaje aparece después de 2 segundos\n' +
                                'Future completado (con o sin error)\n' +
                                'Error capturado: Exception: ¡Algo salió mal!\n' +
                                'Valor inmediato: 42\n' +
                                'Fin del programa (pero las operaciones asíncronas siguen en proceso)';
                        break;
                    case 'async-await':
                        output = 'Obteniendo datos...\n' +
                                'Procesando: Datos del servidor\n' +
                                'Guardando: Datos procesados\n' +
                                '¡Datos guardados!\n' +
                                'Operación completada con éxito\n' +
                                'Limpieza final (se ejecuta con o sin error)\n\n' +
                                'Ejecutando tareas en paralelo:\n' +
                                'Todos los resultados: [Resultado 1, Resultado 2, Resultado 3]\n' +
                                'Fin del programa';
                        break;
                    case 'streams':
                        output = 'Inicio del programa\n' +
                                'Recibido: 1\n' +
                                'Recibido: 2\n' +
                                'Pausando suscripción...\n' +
                                'Reanudando suscripción...\n' +
                                'Recibido: 3\n' +
                                'Recibido: 4\n' +
                                'Recibido: 5\n' +
                                'Stream completado\n\n' +
                                'Generando otro Stream con async*:\n' +
                                'Mensaje: Primer mensaje\n' +
                                'Mensaje: Segundo mensaje\n' +
                                'Mensaje: Tercer mensaje\n' +
                                'Mensaje: Mensaje final\n' +
                                'Fin del programa';
                        break;
                    case 'stream-transform':
                        output = 'Cuadrados de números pares:\n' +
                                '0\n' +
                                '4\n' +
                                '16\n' +
                                '36\n' +
                                '64\n\n' +
                                'Stream transformado:\n' +
                                '30\n' +
                                '40\n\n' +
                                'Stream desde Future:\n' +
                                'Futuro completado\n\n' +
                                'StreamTransformer en acción:\n' +
                                'Número procesado: 10\n' +
                                'Número procesado: 20\n' +
                                'Número procesado: 30\n' +
                                'Error capturado: ¡Ups!\n' +
                                '¡Transmisión finalizada!\n' +
                                'Fin del programa';
                        break;                    case 'flutter-counter':
                        let counter = 0;
                        output = 'Has presionado el botón esta cantidad de veces:\n' + counter;
                        
                        // Esperar a que el DOM se actualice
                        setTimeout(() => {
                            const fab = document.getElementById('flutter-fab');
                            if (fab) {
                                fab.onclick = () => {
                                    counter++;
                                    outputElement.innerHTML = 'Has presionado el botón esta cantidad de veces:\n' + counter;
                                };
                            }
                        }, 100);
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

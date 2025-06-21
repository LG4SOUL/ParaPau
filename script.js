// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Contador de Tiempo ---
    // Establece la fecha de inicio de tu "amor".
    // Puedes cambiar esta fecha a la fecha real en que comenzó tu relación.
    // Formato: Mes Día, Año Hora:Minuto:Segundo
    const startDate = new Date('June 17, 2023 16:20:00'); // Ejemplo: 1 de Enero de 2024

    // Obtiene las referencias a los elementos HTML donde se mostrará el tiempo
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    // Función para actualizar el contador cada segundo
    function updateLoveDuration() {
        const now = new Date(); // Obtiene la fecha y hora actuales
        const duration = now.getTime() - startDate.getTime(); // Calcula la duración en milisegundos

        // Calcula los días, horas, minutos y segundos restantes
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));

        // Actualiza el texto de los elementos HTML
        daysSpan.textContent = days;
        hoursSpan.textContent = hours;
        minutesSpan.textContent = minutes;
        secondsSpan.textContent = seconds;
    }

    // Llama a la función una vez al cargar la página para mostrar el tiempo inicial
    updateLoveDuration();

    // Actualiza el contador cada 1000 milisegundos (1 segundo)
    setInterval(updateLoveDuration, 1000);

    // --- Lógica de Reproducción de Audio con Overlay ---
    const music = document.getElementById('background-music');
    const welcomeOverlay = document.getElementById('welcome-overlay');

    // Función para intentar reproducir la música
    function playMusic() {
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // La reproducción automática comenzó correctamente
                console.log("Música reproduciéndose automáticamente.");
                welcomeOverlay.classList.add('hidden'); // Oculta el overlay
            }).catch(error => {
                // La reproducción automática fue bloqueada por el navegador
                console.warn("Reproducción automática de música bloqueada. Haz clic en la pantalla para iniciarla.", error);
                // El overlay se mantiene visible para que el usuario haga clic
            });
        }
    }

    // Intenta reproducir la música tan pronto como la página cargue
    // (pero el clic en el overlay será el que realmente la inicie en muchos navegadores)
    playMusic();

    // Al hacer clic en el overlay, intentar reproducir la música y ocultarlo
    welcomeOverlay.addEventListener('click', () => {
        playMusic();
    });

});

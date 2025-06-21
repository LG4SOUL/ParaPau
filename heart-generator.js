document.addEventListener('DOMContentLoaded', () => {
    const leavesContainer = document.getElementById('heart-leaves-container');
    
    // --- Configuración para los corazones del árbol (copa) ---
    const numberOfTreeHearts = 4000; 
    const treeHeartColors = ['#FF0000', '#FF69B4', '#FFC0CB', '#FFFF00', '#FFA500']; // Colores de las hojas del árbol

    const containerWidth = leavesContainer.offsetWidth;
    const containerHeight = leavesContainer.offsetHeight;

    // Función para crear un solo corazón HTML para el árbol
    function createTreeHeart(x, y, color, delay) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.backgroundColor = color;
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.animationDelay = `${delay}s`;
        return heart;
    }

    // Función para verificar si un punto (x, y) está dentro de la forma de un corazón
    function isPointInsideHeartShape(x, y, containerW, containerH) {
        let nx = (x / containerW - 0.5) * 2.2; 
        let ny = (y / containerH - 0.5) * 2.8; 
        let result = Math.pow(nx * nx + ny * ny - 1, 3) - nx * nx * Math.pow(ny, 3);
        return result < 0.08; 
    }

    // Función para generar los corazones y posicionarlos en forma de corazón grande para el árbol
    function generateTreeHearts() {
        leavesContainer.innerHTML = ''; // Limpiar corazones existentes
        let heartsPlaced = 0;
        let attempts = 0;
        const maxAttemptsPerHeart = 1000; 
        const totalMaxAttempts = numberOfTreeHearts * maxAttemptsPerHeart; 

        while (heartsPlaced < numberOfTreeHearts && attempts < totalMaxAttempts) {
            attempts++;
            let randX = Math.random() * 1.4 - 0.2; 
            let randY = Math.random() * 1.4 - 0.2; 
            let x = randX * containerWidth;
            let y = randY * containerHeight;

            if (isPointInsideHeartShape(x, y, containerWidth, containerHeight)) {
                let randomColor = treeHeartColors[Math.floor(Math.random() * treeHeartColors.length)];
                let randomDelay = Math.random() * 1.5; 
                const heartElement = createTreeHeart(x, y, randomColor, randomDelay);
                leavesContainer.appendChild(heartElement);
                heartsPlaced++;
            }
        }

        if (heartsPlaced < numberOfTreeHearts) {
            console.warn(`Solo se pudieron colocar ${heartsPlaced} de ${numberOfTreeHearts} corazones dentro de la forma del árbol.`);
        }
    }

    // Llama a la función de generación de corazones del árbol después de que el tronco haya emergido
    setTimeout(() => {
        generateTreeHearts();
    }, 1500); 


    // --- Configuración para los corazones que caen horizontalmente ---
    const numberOfFallingHearts = 60; // Mayor cantidad para una cascada más densa
    const fallingHeartColors = ['#FF0000', '#FF69B4', '#9370DB', '#DDA0DD', '#DA70D6', '#FFC0CB', '#FFFF00', '#FF8C00']; // Más variedad de colores
    const minDelay = 0;
    const maxDelay = 8; // Rango de retraso para una cascada continua y variada

    // Función para generar un corazón cayendo horizontalmente
    function createFallingHeart(delay) {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.style.animationDelay = `${delay}s`;

        // Posición vertical aleatoria a lo largo de la pantalla
        const randomTop = Math.random() * 100; // 0-100vh
        heart.style.top = `${randomTop}vh`;
        
        // El 'left' inicial es handled por la animación CSS (translateX(-120vw))
        // Y el color se asigna aquí
        heart.style.backgroundColor = fallingHeartColors[Math.floor(Math.random() * fallingHeartColors.length)];

        document.body.appendChild(heart);
    }

    // Generar corazones cayendo con retrasos variados
    function generateFallingHearts() {
        for (let i = 0; i < numberOfFallingHearts; i++) {
            const randomDelay = minDelay + (Math.random() * (maxDelay - minDelay));
            createFallingHeart(randomDelay);
        }
    }

    // Llama a la función de generación de corazones cayendo al cargar el DOM
    generateFallingHearts();
});

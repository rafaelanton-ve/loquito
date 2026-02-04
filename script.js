const displayImg = document.getElementById('display-img');
const siBtn = document.getElementById('si-btn');
const noBtn = document.getElementById('no-btn');
const questionText = document.getElementById('question-text');
const mainCard = document.getElementById('main-card');
const celebrationText = document.getElementById('celebration');
const heartContainer = document.getElementById('heart-container');
const reactionGif = document.getElementById('reaction-gif');

// Path to images
const imgPregunto = 'assets/img/pregunto.jpg';
const imgCorrecto = 'assets/img/correcto.jpg';
const imgIncorrecto = 'assets/img/incorrecto.jpg';
const gifSi = 'assets/gif/si.gif';
const gifNo = 'assets/gif/no.gif';

// Heart creation function
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.opacity = Math.random();
    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Start falling hearts
setInterval(createHeart, 300);

// "Si" button logic
siBtn.addEventListener('click', () => {
    displayImg.src = imgCorrecto;
    reactionGif.src = gifSi;
    reactionGif.style.display = 'block';
    questionText.innerHTML = "¡Sabía que dirías que sí! <br> Felices 2 meses Mi Loquito ❤️";
    questionText.classList.add('response-text');
    document.getElementById('button-area').style.display = 'none';

    // Intense celebration
    celebrationText.style.animation = 'popOut 2s ease forwards';
    mainCard.style.transform = 'scale(1.05)';


    // Spawn extra hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(createHeart, i * 50);
    }

    // WhatsApp Redirect with delay
    setTimeout(() => {
        const phoneNumber = "584124166770";
        const message = "he aceptado ser tu novio ❤✍";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }, 4000); // 4 seconds delay to enjoy the celebration
});

// "No" button logic
noBtn.addEventListener('click', () => {
    displayImg.src = imgIncorrecto;
    reactionGif.src = gifNo;
    reactionGif.style.display = 'block';
    questionText.innerHTML = "¡Respuesta incorrecta! 💔<br>Inténtalo de nuevo...";
    questionText.classList.add('response-text');

    // Disable buttons temporarily during the feedback loop
    siBtn.disabled = true;
    noBtn.disabled = true;

    // Reset loop after 2 seconds
    setTimeout(() => {
        displayImg.src = imgPregunto;
        reactionGif.style.display = 'none';
        questionText.innerHTML = "¿Quieres ser mi novio? ❤️";
        questionText.classList.remove('response-text');
        siBtn.disabled = false;
        noBtn.disabled = false;
    }, 2000);
});

// Initial animation for the card
window.onload = () => {
    mainCard.style.opacity = '0';
    mainCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        mainCard.style.transition = 'all 1s ease';
        mainCard.style.opacity = '1';
        mainCard.style.transform = 'translateY(0)';
    }, 100);

    generateStars();
};

/* --- Theme: Shooting Stars Logic --- */

// YouTube Player Logic
let player;
let isMusicPlaying = false;

// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'feA64wXhbjo',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'loop': 1,
            'playlist': 'feA64wXhbjo', // Required for loop to work
            'start': 21
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(50);
    // Attempt to play immediately
    event.target.playVideo();
}

// Ensure playback on user interaction (browser policy)
document.body.addEventListener('click', () => {
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
        isMusicPlaying = true;
    }
});

// Generate Stars
function generateStars() {
    const starContainers = [document.getElementById('stars'), document.getElementById('stars2'), document.getElementById('stars3')];

    starContainers.forEach((container, index) => {
        if (!container) return;
        const starCount = 50 + (index * 20); // Different densities
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            // Random size tailored to layer
            const size = Math.random() * 2 + (index === 0 ? 1 : 0.5);

            // Random duration
            const duration = Math.random() * 3 + 2;

            star.style.left = `${x}vw`;
            star.style.top = `${y}vh`;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.animationDelay = `${Math.random() * 5}s`;

            container.appendChild(star);
        }
    });
}

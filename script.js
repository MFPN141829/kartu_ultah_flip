document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const startButton = document.getElementById('start-button');
    const cardScreen = document.getElementById('card-screen');
    const birthdayCard = document.getElementById('birthday-card');
    const countdownElement = document.getElementById('countdown');
    const birthdayTextElement = document.getElementById('birthday-text');
    const catImage = document.getElementById('cat-image');
    const backgroundMusic = document.getElementById('background-music');
    const flipSound = document.getElementById('flip-sound');
    const fullBirthdayText = "HAPPY\nBIRTHDAY\nTO\nYOU";

    startButton.addEventListener('click', () => {
        introScreen.classList.remove('active');
        cardScreen.classList.add('active');
        playMusic();
        startCountdownAndTextAnimation();
    });

    function playMusic() {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play().catch(e => console.log("Audio play prevented:", e));
    }

    function startCountdownAndTextAnimation() {
        let count = 3;
        countdownElement.textContent = count;
        countdownElement.style.opacity = 1;
        countdownElement.style.display = 'block';

        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownElement.textContent = count;
                countdownElement.style.animation = 'none';
                void countdownElement.offsetWidth;
                countdownElement.style.animation = 'fadeIn 0.5s forwards';
            } else if (count === 0) {
                countdownElement.textContent = '';
                countdownElement.style.display = 'none';
                clearInterval(countdownInterval);
                displayBirthdayText();
            }
        }, 1000);
    }

    function displayBirthdayText() {
        birthdayTextElement.classList.remove('hidden');
        let charIndex = 0;
        const chars = fullBirthdayText.split('');

        birthdayTextElement.innerHTML = chars.map(char => {
            if (char === '\n') return '<br>';
            return `<span>${char}</span>`;
        }).join('');

        const spans = birthdayTextElement.querySelectorAll('span');
        const textInterval = setInterval(() => {
            if (charIndex < spans.length) {
                spans[charIndex].style.opacity = 1;
                spans[charIndex].style.animation = 'fadeIn 0.3s forwards';
                charIndex++;
            } else {
                clearInterval(textInterval);
                setTimeout(() => {
                    catImage.classList.remove('hidden');
                    catImage.classList.add('fade-in');
                }, 500);
            }
        }, 80);

        setTimeout(() => {
            document.querySelector('.tap-hint').style.display = 'block';
        }, 2500);
    }

    birthdayCard.addEventListener('click', () => {
        birthdayCard.classList.toggle('flipped');
        flipSound.play().catch(e => console.log("Flip sound blocked:", e));
    });

    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.log("Audio play prevented:", e));
        }
    }, { once: true });
});

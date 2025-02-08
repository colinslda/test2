// Gestion des onglets
const navButtons = document.querySelectorAll('.nav-button');
const tabContents = document.querySelectorAll('.tab-content');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');
        navButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});

// Métronome
let metronomeInterval;
const metronomeButton = document.getElementById('metronome-button');
const tempoSlider = document.getElementById('tempo-slider');
const tempoValue = document.getElementById('tempo-value');

tempoSlider.addEventListener('input', (event) => {
    const tempo = event.target.value;
    tempoValue.textContent = `${tempo} BPM`;
    if (metronomeInterval) {
        clearInterval(metronomeInterval);
        startMetronome();
    }
});

metronomeButton.addEventListener('click', () => {
    if (metronomeInterval) {
        clearInterval(metronomeInterval);
        metronomeInterval = null;
        metronomeButton.textContent = 'Start';
    } else {
        startMetronome();
        metronomeButton.textContent = 'Stop';
    }
});

function startMetronome() {
    const tempo = tempoSlider.value;
    const interval = 60000 / tempo;
    metronomeInterval = setInterval(() => {
        const audio = new Audio('https://www.metronomeonline.com/'); // Remplacez par le chemin de votre son de métronome
        audio.play();
    }, interval);
}

// Accordeur
const tuneButtons = document.querySelectorAll('.tune-button');

tuneButtons.forEach(button => {
    button.addEventListener('click', () => {
        const note = button.getAttribute('data-note');
        playNote(note);
    });
});

function playNote(note) {
    let frequency;
    switch (note) {
        case 'G':
            frequency = 392;
            break;
        case 'D':
            frequency = 293.66;
            break;
        case 'A':
            frequency = 442;
            break;
        case 'E':
            frequency = 329.63;
            break;
        default:
            return;
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);

    oscillator.start();

    setTimeout(() => {
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    }, 500);

    setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
    }, 1000);
}

// Journal de bord
const saveLogButton = document.getElementById('save-log');
const logTextarea = document.getElementById('log-textarea');
const logEntries = document.getElementById('log-entries');

saveLogButton.addEventListener('click', () => {
    const logEntry = logTextarea.value.trim();
    if (logEntry) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('log-entry');
        entryDiv.textContent = logEntry;
        logEntries.appendChild(entryDiv);
        logTextarea.value = '';
    }
});

// Connexion
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    alert(`Email: ${email}, Mot de passe: ${password}`);
    // Ajoutez ici la logique de connexion
});

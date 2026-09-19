const targetTimeElement = document.getElementById("targetTime");
const timerDisplay = document.getElementById("timerDisplay");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const newGameBtn = document.getElementById("newGameBtn");

const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const difference = document.getElementById("difference");
const resultMessage = document.getElementById("resultMessage");

let targetTime = 0;
let startTime = 0;
let animationFrame = null;
let running = false;


/* =========================
   NOVO DESAFIO
========================= */

function generateTarget() {

    // Gera um tempo entre 3 e 15 segundos
    targetTime = Math.random() * 12 + 3;

    // Duas casas decimais
    targetTime = Number(targetTime.toFixed(2));

    targetTimeElement.textContent = targetTime.toFixed(2);

    timerDisplay.textContent = "0.00";

    result.classList.add("hidden");
    result.classList.remove("success", "fail");

    startBtn.disabled = false;
    stopBtn.disabled = true;
}


/* =========================
   ATUALIZA CRONÔMETRO
========================= */

function updateTimer() {

    if (!running) return;

    const currentTime = performance.now();

    const elapsed = (currentTime - startTime) / 1000;

    timerDisplay.textContent = elapsed.toFixed(2);

    animationFrame = requestAnimationFrame(updateTimer);
}


/* =========================
   COMEÇAR
========================= */

function startGame() {

    if (running) return;

    running = true;

    startTime = performance.now();

    startBtn.disabled = true;
    stopBtn.disabled = false;

    result.classList.add("hidden");

    updateTimer();
}


/* =========================
   PARAR
========================= */

function stopGame() {

    if (!running) return;

    running = false;

    cancelAnimationFrame(animationFrame);

    const endTime = performance.now();

    const playerTime = (endTime - startTime) / 1000;

    timerDisplay.textContent = playerTime.toFixed(2);

    calculateResult(playerTime);

    stopBtn.disabled = true;
}


/* =========================
   RESULTADO
========================= */

function calculateResult(playerTime) {

    const differenceValue =
        Math.abs(playerTime - targetTime);

    difference.textContent =
        `${differenceValue.toFixed(2)}s`;

    result.classList.remove("hidden");

    if (differenceValue === 0) {

        resultTitle.textContent = "CRAVOU! 🎯";

        resultMessage.textContent =
            "Perfeito. Você acertou exatamente o tempo.";

        result.classList.add("success");

        return;
    }

    if (differenceValue <= 0.10) {

        resultTitle.textContent = "QUASE PERFEITO! 🔥";

        resultMessage.textContent =
            "Foi por muito pouco!";

        result.classList.add("success");

        return;
    }

    if (differenceValue <= 0.50) {

        resultTitle.textContent = "MUITO PERTO!";

        resultMessage.textContent =
            "Você chegou bem perto do alvo.";

        result.classList.add("success");

        return;
    }

    resultTitle.textContent = "ERROU O ALVO";

    resultMessage.textContent =
        playerTime < targetTime
            ? "Você parou cedo demais."
            : "Você passou do tempo.";

    result.classList.add("fail");
}


/* =========================
   NOVO JOGO
========================= */

function newGame() {

    if (running) {

        running = false;

        cancelAnimationFrame(animationFrame);
    }

    generateTarget();
}


/* =========================
   EVENTOS
========================= */

startBtn.addEventListener("click", startGame);

stopBtn.addEventListener("click", stopGame);

newGameBtn.addEventListener("click", newGame);


/* =========================
   INICIAR
========================= */

generateTarget();

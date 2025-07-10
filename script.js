let timerAnimationId = null; // Variable global para el timer de la card 3
let barAnimationId = null;   // Para la barra de progreso de cualquier card

const cardsWithBar = [2, 4, 51, 52, 5];

function nextCard(cardNumber) {
  // Detiene el timer si existe y no estamos en la card 3
  if (timerAnimationId && cardNumber !== 3) {
    cancelAnimationFrame(timerAnimationId);
    timerAnimationId = null;
  }
   // Detiene la barra si existe
  if (barAnimationId) {
    cancelAnimationFrame(barAnimationId);
    barAnimationId = null;
  }

  // Oculta todos los grupos de botones antes de mostrar la nueva card
  cardsWithBar.forEach(num => {
    const group = document.getElementById(`button-group-${num}`);
    if (group) group.style.display = 'none';
  });

  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('active');
  });
  document.getElementById('card-' + cardNumber).classList.add('active');

  // Si es la card 3, inicia el temporizador visual
  if (cardNumber === 3) {
    startTimer();
  }

  // Si la card tiene barra, lanza la animación
  if (cardsWithBar.includes(cardNumber)) {
    showProgressBarAndButtonsFor(cardNumber);
  }
}

function prevCard(cardNumber) {
  // Detiene el timer si existe y no estamos en la card 3
  if (timerAnimationId && cardNumber !== 3) {
    cancelAnimationFrame(timerAnimationId);
    timerAnimationId = null;
  }
   // Detiene la barra si existe
  if (barAnimationId) {
    cancelAnimationFrame(barAnimationId);
    barAnimationId = null;
  }

  // Oculta todos los grupos de botones antes de mostrar la nueva card
  cardsWithBar.forEach(num => {
    const group = document.getElementById(`button-group-${num}`);
    if (group) group.style.display = 'none';
  });

  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('active');
  });
  document.getElementById('card-' + cardNumber).classList.add('active');

  // Si es la card 3, inicia el temporizador visual
  if (cardNumber === 3) {
    startTimer();
  }

  // Si la card tiene barra, lanza la animación
  if (cardsWithBar.includes(cardNumber)) {
    showProgressBarAndButtonsFor(cardNumber);
  }
}

function startTimer() {
  const duration = 3000; // 3 segundos
  const circle = document.getElementById('progress');
  if (!circle) return;
  const total = 176; // Circunferencia del círculo (2 * PI * r)
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    circle.style.strokeDashoffset = total * progress;
    if (progress < 1) {
      timerAnimationId = requestAnimationFrame(animate);
    } else {
      timerAnimationId = null;
      nextCard(4); // Cambia automáticamente a la card 4
    }
  }

  // Reinicia el círculo visual
  circle.style.strokeDashoffset = 0;
  timerAnimationId = requestAnimationFrame(animate);
}

function showProgressBarAndButtonsFor(cardNumber) {
  const bar = document.getElementById(`progress-bar-${cardNumber}`);
  const barContainer = document.getElementById(`progress-bar-container-${cardNumber}`);
  const group = document.getElementById(`button-group-${cardNumber}`);
  if (!bar || !barContainer) return;
  const duration = 2000; // 2 segundos
  let start = null;

  bar.style.width = '0%';
  barContainer.style.display = 'block';
  if (group) group.style.display = 'none';

  function animateBar(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    bar.style.width = (progress * 100) + '%';
    if (progress < 1) {
      barAnimationId = requestAnimationFrame(animateBar);
    } else {
      barAnimationId = null;
      barContainer.style.display = 'none';
      // Si es la card 2, salta automáticamente a la 3
      if (cardNumber === 2) {
        nextCard(3);
      } else if (group) {
        group.style.display = 'flex';
      }
    }
  }
  barAnimationId = requestAnimationFrame(animateBar);
}
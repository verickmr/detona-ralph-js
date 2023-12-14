const state = {
  views: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDowntTimerId: setInterval(countDown, 1000),
  },
};

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a")
    audio.volume = 0.2
    audio.play()
}

function countDown() {
  state.values.curretTime--;
  state.views.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDowntTimerId)
    clearInterval(state.actions.timerId)
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}

function randomSquare() {
  state.views.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.views.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.views.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id == state.values.hitPosition) {
        state.values.result++;
        state.views.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound()
      }
    });
  });
}

function init() {
  addListenerHitBox();
  countDown();
}

init();

const EventEmitter = require('events');
const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  const game = new EventEmitter();
  const buttons = new five.Buttons(['a5', 'a6']);
  const leds = new five.Leds(['b5', 'b6']);

  let gameOver = false;
  let timeAllowance = 3000;
  let timeOut;
  let target = null;

  buttons.on('press', (button) => {
    if (gameOver) return;

    if (button === target) {
      game.emit('hit');
    } else {
      game.emit('miss');
    }
  });

  game.once('start', () => {
    console.log('Game starting!');

    game.emit('prepare');
  });

  game.on('hit', () => {
    console.log('Nice hit!');

    clearTimeout(timeOut);
    game.emit('prepare');
  });

  game.on('prepare', () => {
    console.log('Preparing round...');

    const index = Math.round(Math.random());
    target = buttons[index];
    setTimeout(() => game.emit('roundstart', leds[index]), 3000);
    leds.off();
  });

  game.on('roundstart', (led) => {
    console.log('Go!');

    timeOut = setTimeout(() => game.emit('over'), timeAllowance);
    led.on();
  });

  game.once('miss', () => {
    console.log('You missed!');

    clearTimeout(timeOut);
    game.emit('over');
  });

  game.once('over', () => {
    console.log('Game over!');

    gameOver = true;
    leds.off();
    leds.blink(500);
  });

  game.emit('start');
});


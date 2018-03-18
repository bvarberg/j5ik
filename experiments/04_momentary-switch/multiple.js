const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  const buttons = new five.Buttons(['a5', 'a6']);
  const leds = new five.Leds(['b5', 'b6']);

  buttons.on('press', (button) => {
    leds.off();
    leds[buttons.indexOf(button)].on();
  });
});


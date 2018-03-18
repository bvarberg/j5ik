const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  const button = new five.Button('a2');

  button.on('press', () => console.log('Button pressed.'));
  button.on('release', () => console.log('Button released.'));
});


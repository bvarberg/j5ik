const Barcli = require('barcli');
const Tessel = require('tessel-io');
const five = require('johnny-five');

const board = new five.Board({
  io: new Tessel(),
  repl: false,
  debug: false,
});

board.on('ready', () => {
  const range = [0, 100];
  const graph = new Barcli({
    label: 'Potentiometer',
    range: range,
  });

  const sensor = new five.Sensor({
    pin: 'a7',
    threshold: 5,
  });

  sensor.on('change', () => {
    graph.update(sensor.scaleTo(range));
  })
})

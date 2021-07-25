const OneBue =  require('../dist/lib/onebus');

OneBue.on('data', (data) => {
  console.log(data);
});

OneBue.emit('data', 'hello word');
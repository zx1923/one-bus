import OneBus from '../dist/lib/onebus';

OneBus.on('data', (data) => {
  console.log(data);
});

OneBus.emit('data', 'hello word');
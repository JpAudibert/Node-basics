const EventEmitter = require('events');
class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter();
const eventName = 'user:click';

myEmitter.on(eventName, click => {
    console.log("Um usuário clicou", click);
});

const stdin = process.openStdin();
stdin.addListener('data', value => {
    console.log(`Você digitou: ${value.toString().trim()}`);
})

// myEmitter.emit(eventName, "na barra de rolagem");
// myEmitter.emit(eventName, "no ok");

// let count = 0;

// setInterval(() => {
//     myEmitter.emit(eventName, 'no ok' + count++);
// }, 1000);
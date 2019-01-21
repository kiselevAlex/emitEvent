# emitEvent

Реализации функции контроля ведущей вкладки. Цель написания - реализовать одно сокет соединение с сервером и и спользовать его на разных вкладках.

## Пример использования
```
var ws;

function run(){
  ws = new WebSocket(host); //Ваш хост 
  ws.onmessage = function(data){
    localStorage.setItem('WS_SOCKET_DATA', JSON.stringify(data));
    if (!window.navigator.userAgent.indexOf("MSIE ") > 0 
      || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // проверка на ie
      doSomething(JSON.stringify(data));
  }
}

function stop(){
  if (ws != null && ws != undefined) {
      ws.close();
  }
}

window.addEventListener('storage', function (e) {
  if (e.key != 'WS_SOCKET_DATA')
      return;
  doSomething(JSON.parse(e.newValue));
});

function doSomething(data){
  // work with data from socket
}

new emitEvent(run, stop);
```

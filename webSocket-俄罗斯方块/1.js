// let socket = io('http://localhost:3000')


let socket = io('ws://localhost:3000')
var local = new Local(socket)
// local.start()
var remote = new Remote(socket)
// remote.start(2,2)
// remote.bindEvents()
socket.on('waiting',str=>{
    window.waiting.innerHTML = str
})
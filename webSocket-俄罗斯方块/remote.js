var Remote = function(socket){
	var game
	var bindEvents = function(){
		socket.on('init',data=>{
			start(data.type,data.dir)
		})
		socket.on('next',data=>{
			game.performNext(data.type,data.dir)
		})
		socket.on('rotate',data=>{
			game.rotate()
		})
		socket.on('right',data=>{
			game.right()
		})
		socket.on('down',data=>{
			game.down()
		})
		socket.on('left',data=>{
			game.left()
		})
		socket.on('fall',data=>{
			game.fall()
		})
		socket.on('fixed',data=>{
			game.fixed()
		})
		socket.on('line',data=>{
			game.checkClear()
			game.addScore(data)
		})
		socket.on('time',data=>{
			game.setTime(data)
		})
		socket.on('lose',data=>{
			game.gameOver(false)
		})
		socket.on('addTailLines',data=>{
			game.addTailLines(data)
		})
		
/*		window.down['onclick'] = function(){
			game.down()
		}
		window.left['onclick'] = function(){
			game.left()
		}
		window.right['onclick'] = function(){
			game.right()
		}
		window.rotate['onclick'] = function(){
			game.rotate()
		}
		window.fall['onclick'] = function(){
			game.fall()
		}
		window.fixed['onclick'] = function(){
			game.fixed()
		}
		window.performNext['onclick'] = function(){
			game.performNext(2,2)
		}
		window.checkClear['onclick'] = function(){
			game.checkClear()
		}
		window.checkGameover['onclick'] = function(){
			game.checkGameover()
		}
		window.setTime['onclick'] = function(){
			game.setTime(20)
		}
		window.addScore['onclick'] = function(){
			game.addScore(4)
		}
		window.gameOver['onclick'] = function(){
			game.gameOver(true)
		}
		window.addTailLines['onclick'] = function(){
			game.addTailLines([[0,1,0,1,0,1,0,1,0,1]])
		}*/
	}
	// kaishi
	var start = function(type,dir){
		var doms = {
			gameDiv:window.remote_game,
			nextDiv:window.remote_next,
			timeDiv:window.remote_time,
			scoreDiv:window.remote_score,
			overDiv:window.remote_over
		}
		game = new Game()
		game.init(doms,type,dir)
	}
	bindEvents()
	// 导出API
	// this.start = start
	// this.bindEvents = bindEvents
}
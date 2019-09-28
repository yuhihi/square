var Local = function(socket){
	// 游戏对象
	var game
	// 
	var INTERVAL = 2000
	// timer
	var timer = null
	// 时间计数器
	var timeCount = 0
	var time = 0
	// 绑定键盘事件
	var bindKeyEvent = function(){
		document.onkeydown = function(e){
			switch(e.keyCode){
				case 38 ://up
					game.rotate()
					socket.emit('rotate')
					break
				case 39 ://right
					game.right()
					socket.emit('right')
					break
				case 40 ://down
					game.down()
					socket.emit('down')
					break
				case 37 ://left
					game.left()
					socket.emit('left')
					break
				case 32 ://space
					game.fall()
					socket.emit('fall')
					break
				default :
					break
			}
		}
	}
	// move
	var move =function(){
		timeFn()
		if(!game.down()){
			game.fixed()
			socket.emit('fixed')
			var line = game.checkClear()
			// console.log(line,typeof line,4444)
			if(line){
				game.addScore(line)
				socket.emit('line',line)
				if(line > 1){
					var BottomLine = randomBottomLine(line)
					socket.emit('BottomLine',BottomLine)
				}
			}
			var over = game.checkGameover()
			if(over){
				game.gameOver(false)
				remote_over.innerHTML = '你赢了'
				socket.emit('lose')
				stop()
			}else{
				var t = randomType()
				var d = generateDir()
				game.performNext(t,d)
				socket.emit('next',{type:t,dir:d})
				// game.performNext(randomType(),generateDir())
			}
		}else{
			socket.emit('down')
		}
	}
	// 
	var randomBottomLine = function(lineNum){
		var lines = []
		for(var i=0;i<lineNum;i++){
			var line = []
			for(var j=0;j<10;j++){
				line.push(Math.ceil(Math.random()*2)-1)
			}
			lines.push(line)
		}
		return lines
	}
	// 计时函数
	var timeFn = function(){
		timeCount += 1
		if(timeCount == 5){
			timeCount = 0
			time += 1
			game.setTime(time)
			/*if(time % 10 == 0){
				game.addTailLines(randomBottomLine(1))
			}*/
			socket.emit('time',time)
		}
	}
	// 随机生成一个方块种类
	var randomType = function(){
		return Math.ceil(Math.random() * 7) - 1
	}
	// 随机生成一个方块种类
	var generateDir = function(){
		return Math.ceil(Math.random() * 4) - 1
	}
	// stop
	var stop = function(){
		if(timer){
			clearInterval(timer)
			timer = null
		}
		document.onkeydown = null
	}
	// kaishi
	var start = function(){
		var doms = {
			gameDiv:window.local_game,
			nextDiv:window.local_next,
			timeDiv:window.local_time,
			scoreDiv:window.local_score,
			overDiv:window.local_over
		}
		game = new Game()
		var type = randomType()
		var dir = generateDir()
		game.init(doms,type,dir)
		socket.emit('init',{type,dir})
		bindKeyEvent()
		var t = randomType()
		var d = generateDir()
		game.performNext(t,d)
		socket.emit('next',{type:t,dir:d})
		timer = setInterval(move,INTERVAL)
	}
	// 导出API
	// this.start = start
	socket.on('start',()=>{
    	waiting.innerHTML = ''
    	start()
	})
	socket.on('lose',()=>{
    	game.gameOver(true)
    	stop()
	})
	socket.on('leave',()=>{
		local_over.innerHTML = '对方掉线'
		remote_over.innerHTML = '已掉线'
		stop()
	})
	socket.on('BottomLine',data=>{
		game.addTailLines(data)
		socket.emit('addTailLines',data)
	})
}
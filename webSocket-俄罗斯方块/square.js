var Square = function(){
	// 方块数据
	this.data = [
	    [0,0,0,0],
	    [0,0,0,0],
	    [0,0,0,0],
	    [0,0,0,0]
	]
	// 远点
	this.origin = {
		x:0,
		y:0
	}
	// 方向
	this.dir = 0
}
Square.prototype.canDown = function(isValid){
	var test = {}
	test.x = this.origin.x + 1
	test.y = this.origin.y
	return isValid(test,this.data)
}
Square.prototype.down = function(){
		this.origin.x += 1
}
Square.prototype.canLeft = function(isValid){
	var test = {}
	test.x = this.origin.x 
	test.y = this.origin.y - 1
	return isValid(test,this.data)
}
Square.prototype.left = function(){
		this.origin.y -= 1
}
Square.prototype.canRight = function(isValid){
	var test = {}
	test.x = this.origin.x 
	test.y = this.origin.y + 1
	return isValid(test,this.data)
}
Square.prototype.right = function(){
		this.origin.y += 1
}
Square.prototype.canRotate = function(isValid){
	var d = (this.dir + 1) % 4
	/*if(d == 4){
		d = 0
	}*/
	var test = [
		[0,0,0,0],
	    [0,0,0,0],
	    [0,0,0,0],
	    [0,0,0,0]
	]
	for(var i=0;i<this.data.length;i++){
		for(var j=0;j<this.data[0].length;j++){
			test[i][j] = this.roates[d][i][j]
		}
	}
	return isValid(this.origin,test)
}
Square.prototype.rotate = function(num){
	if(!num) num = 1
	this.dir = (this.dir +  num) % 4
	/*if(this.dir == 4){
		this.dir = 0
	}*/
	for(var i=0;i<this.data.length;i++){
		for(var j=0;j<this.data[0].length;j++){
			this.data[i][j] = this.roates[this.dir][i][j]
		}
	}
}
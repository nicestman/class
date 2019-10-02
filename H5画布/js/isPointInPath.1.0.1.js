class Labels {
	constructor(saveCanvas, drawCanvas) {
		this.saveCanvas = saveCanvas
		this.drawCanvas = drawCanvas
		this.saveCtx = saveCanvas.getContext('2d')
		this.drawCtx = drawCanvas.getContext('2d')
		this.saveObjs = []
		this.drawObjs = []
		this.moveAllXY = {x: 0,y: 0}
		this.isMoveAll = false
	}
	add(drawObj) {
		let drawObjs = this.drawObjs
		let len = drawObjs.length
		!!len && this.saveObjs.push(drawObjs.shift())
		drawObjs.push(drawObj)
		return this
	}
	save(saveObj){
		this.saveObjs.push(saveObj)
		return this
	}
	drawRender() {
		let drawCanvas = this.drawCanvas
		let drawObjs = this.drawObjs
		let ctx = this.drawCtx
		ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
		drawObjs.forEach(function(drawObj) {
			drawObj.update(ctx)
			drawObj.renderPoints(ctx, drawObj.centerPoint, 8, 10)
			drawObj.renderPoints(ctx, drawObj.points, 5, 7)
		})
		return this
	}
	saveRender() {
		let saveCanvas = this.saveCanvas
		let saveObjs = this.saveObjs
		let ctx = this.saveCtx
		ctx.clearRect(0, 0, saveCanvas.width, saveCanvas.height)
		saveObjs.forEach(function(saveObj) {
			saveObj.update(ctx)
		})
		return this
	}
	isPointInCircle(x, y, circle) {
		let diffX = x - circle.x
		let diffY = y - circle.y
		let r = circle.r
		return ((diffX * diffX) + (diffY * diffY)) <= r * r
	}
	checkSelected(x, y) {
		let drawObj = this.drawObjs[0]
		if (drawObj) {
			let isChecked = false
			if (drawObj.isChecked(x, y)){
				isChecked = true
				let isMove = false
				drawObj.points.forEach(point => {
					if (this.isPointInCircle(x, y, point)) {
						drawObj.isDrag = true
						drawObj.dragPosition = point.name
						drawObj.moveXY.x = x - drawObj.x
						drawObj.moveXY.y = y - drawObj.y
						if (Math.abs(drawObj.moveXY.x) > point.r) {
							drawObj.moveXY.x -= drawObj.w
						}
						if (Math.abs(drawObj.moveXY.y) > point.r) {
							drawObj.moveXY.y -= drawObj.h
						}
						isMove = true
						return false
					}
				})
				if (!isMove && this.isPointInCircle(x, y, drawObj.centerPoint[0])) {
					isMove = true
					console.log(isMove)
					drawObj.isMove = isMove
					drawObj.moveXY.x = x - drawObj.x
					drawObj.moveXY.y = y - drawObj.y
				}
				return true
			}
			if (!isChecked) {
				this.saveObjs.forEach((saveObj, index) => {
					if (saveObj.isChecked(x, y)){
						isChecked = true
						this.add(saveObj)
						this.saveObjs.splice(index, 1)
						return false
					}
				})
				this.drawRender()
				this.saveRender()
				return isChecked
			}
			this.saveObjs.push(drawObjs.shift())
			this.drawRender()
			this.saveRender()
			return false
		}
		return false
	}
	move(mouseX, mouseY) {
		let drawObj = this.drawObjs[0]
		let isMove = drawObj.isMove
		if (isMove) {
			let x = mouseX - drawObj.moveXY.x
			let y = mouseY - drawObj.moveXY.y
			drawObj.config(x, y)
			this.drawRender()
		}
	}
	moveAll(mouseX, mouseY) {
		if (this.isMoveAll) {
			let x = mouseX - this.moveAllXY.x
			let y = mouseY - this.moveAllXY.y
			this.saveObjs.forEach(saveObj => {
				let fx = saveObj.x + x
				let fy = saveObj.y + y
				saveObj.config(fx, fy)
			})
			this.saveRender()
		}
	}
	
	rect(x, y, w, h) {
		let self = this
		w = !isNaN(w) ? w : 0
		h = !isNaN(h) ? h : 0
		return new (class Rect {
			constructor(x, y, w, h) {
				this.isMove = false
				this.moveXY = {x: 0, y: 0}
				this.isDrag = false
				this.dragPosition = ''
				this.points = []
				this.centerPoint = []
				this.config(x, y, w, h)
				self.add(this)
			}
			config(x, y, w, h) {
				w = !isNaN(w) ? w : this.w
				h = !isNaN(h) ? h : this.h
				this.x = x
				this.y = y
				this.w = w
				this.h = h
				this.addPoints(x, y, w, h)
			}
			update(ctx) {
				ctx.strokeStyle = "#00f"
				ctx.lineWidth = 2
				ctx.beginPath()
				ctx.rect(this.x, this.y, this.w, this.h)
				ctx.stroke()
				ctx.closePath()
			}
			addPoints(x, y, w, h){
				let topX = x
				let topY = y
				let middleX = x + w / 2
				let middleY = y + h / 2
				let bottomX = x + w
				let bottomY = y + h
				
				this.centerPoint = [{name: 'center',x: middleX, y: middleY}]
				
				let points = []
				points.push({name: 'topLift', x: topX, y: topY})
				points.push({name: 'topCenter', x: middleX, y: topY})
				points.push({name: 'topRight', x: bottomX, y: topY})
				points.push({name: 'middleLift', x: topX, y: middleY})
				points.push({name: 'middleRight', x: bottomX, y: middleY})
				points.push({name: 'bottomLift', x: topX, y: bottomY})
				points.push({name: 'bottomCenter', x: middleX, y: bottomY})
				points.push({name: 'bottomRight', x: bottomX, y: bottomY})
				this.points = points
			}
			renderPoints(ctx, points, r1, r2) {
				points = points || []
				points.forEach(point => {
					point.r1 = r1
					point.r = r2
					let x = point.x
					let y = point.y
					ctx.beginPath()
					ctx.strokeStyle = '#000'
					ctx.arc(x, y, r1, 0, 2 * Math.PI)
					ctx.stroke()
					ctx.closePath()
					// 小圆圈的遮罩层
					ctx.beginPath()
					let grd = ctx.createRadialGradient(x, y, 0, x, y, r2)
					grd.addColorStop(0, 'rgba(255, 255, 255, 0.7)')
					grd.addColorStop(0.5, 'rgba(255, 255, 255, 0.6)')
					grd.addColorStop(1, 'rgba(255, 255, 255, 0.1)')
					ctx.fillStyle = grd
					ctx.arc(x, y, r2, 0, 2 * Math.PI)
					ctx.fill()
					ctx.closePath()
				})
			}
			isChecked(mouseX, mouseY) {
				let x = this.x
				let y = this.y
				let w = Math.abs(this.w)
				let h = Math.abs(this.h)
				let fx = x + w
				let fy = y + h
				let mg = this.points[0].r
				/*if (w < 0 && (x + mg) >= mouseX && mouseX >= (fx - mg) && h > 0 && (y - mg) <= mouseY && mouseY <=  (fy + mg)){
					return true
				}
				if (w > 0 && (x - mg) <= mouseX && mouseX <= (fx + mg) && h < 0 && (y + mg) >= mouseY && mouseY >=  (fy - mg)){
					return true
				}
				if (w < 0 && (x + mg) >= mouseX && mouseX >= (fx - mg) && h < 0 && (y + mg) >= mouseY && mouseY >=  (fy - mg)){
					return true
				}
				if (w > 0 && (x - mg) <= mouseX && mouseX <= (fx + mg) && h > 0 && (y - mg) <= mouseY && mouseY <=  (fy + mg)){
					return true
				}*/
				if (this.w < 0) {
					mouseX += w
				}
				if (this.h < 0) {
					mouseY += h
				}
				if ((x - mg) <= mouseX && mouseX <= (fx + mg) && (y - mg) <= mouseY && mouseY <=  (fy + mg)){
					return true
				}
				return false
			}
			drag(mouseX, mouseY) {
				if (this.isDrag) {
					let x = this.x
					let y = this.y
					let w = this.w
					let h = this.h
					mouseX -= this.moveXY.x
					mouseY -= this.moveXY.y
					switch (this.dragPosition){
						case 'topLift':
							w += x - mouseX
							h += y - mouseY
							x = mouseX
							y = mouseY
							break;
						case 'topCenter':
							h += y - mouseY
							y = mouseY
							break;
						case 'topRight':
							w = mouseX - x
							h += y - mouseY
							y = mouseY
							break;
						case 'middleLift':
							w += x - mouseX
							x = mouseX
							break;
						case 'middleRight':
							w = mouseX - x
							break;
						case 'bottomLift':
							w += x - mouseX
							h = mouseY - y
							x = mouseX
							break;
						case 'bottomCenter':
							h =  mouseY - y
							break;
						case 'bottomRight':
							w = mouseX - x
							h =  mouseY - y
							break;
						default:
							console.log('未选中矩形框上的小圆圈')
							break;
					}
					this.config(x, y, w, h)
				}
			}
			
		})(x, y, w, h)
	}
	
}
export default Labels
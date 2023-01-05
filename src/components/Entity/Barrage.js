export class Barrage {

    /** @type {number} */
    positionX

    /** @type {number} */
    positionY

    /** @type {number} */
    screenWidth

    /** @type {number} */
    screenHeight

    /** @type {number} */
    speed



    constructor(text, time, screenWidth, screenHeight) {
        this.text = text
        this.time = time
        this.screenWidth = screenWidth
        this.screenHeight = screenHeight
        this.generateStartPosition()
        this.calculateSpeed()
    }

    generateStartPosition() {
        this.positionX = this.screenWidth
        this.positionY = 20 + Math.random() * 180
    }

    calculateSpeed() {
        this.speed = this.screenWidth / 8
    }

    updatePosition(currentTime) {
        if (currentTime > this.time){
            this.positionX = this.screenWidth - ((currentTime - this.time) * this.speed)
        }

        return (this.positionX < -this.text.length)
    }
}
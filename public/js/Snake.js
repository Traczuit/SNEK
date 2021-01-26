export default class Snake {
  constructor(scene) {
    this.scene = scene;
    //this.pointCount = 0;
    this.direction = Phaser.Math.Vector2.RIGHT;
    this.moveInterval = 100;
    this.lastMoveTime = 0;
    this.tileSize = 16;
    this.body = [];
    this.body.push(
      this.scene.add
        .rectangle(
          this.scene.game.config.width / 2,
          this.scene.game.config.height / 2,
          this.tileSize,
          this.tileSize,
          0x00ff00
        )
        .setOrigin(0)
    );
    this.apple = this.scene.add
      .rectangle(0, 0, this.tileSize, this.tileSize, 0xff0000)
      .setOrigin(0);
    this.positionApple();
    scene.input.keyboard.on("keydown", (e) => {
      this.keydown(e);
    });
  }

  positionApple() {
    this.apple.x =
      Math.floor(
        (Math.random() * this.scene.game.config.width) / this.tileSize
      ) * this.tileSize;
    this.apple.y =
      Math.floor(
        (Math.random() * this.scene.game.config.height) / this.tileSize
      ) * this.tileSize;
  }

  keydown(event) {
    switch (event.keyCode) {
      case 37:
        if (this.direction !== Phaser.Math.Vector2.RIGHT)
          this.direction = Phaser.Math.Vector2.LEFT;
        break;
      case 38:
        if (this.direction !== Phaser.Math.Vector2.DOWN)
          this.direction = Phaser.Math.Vector2.UP;
        break;
      case 39:
        if (this.direction !== Phaser.Math.Vector2.LEFT)
          this.direction = Phaser.Math.Vector2.RIGHT;
        break;
      case 40:
        if (this.direction !== Phaser.Math.Vector2.UP)
          this.direction = Phaser.Math.Vector2.DOWN;
        break;
    }
  }

  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }
 
  move() {
    let x = this.body[0].x + this.direction.x * this.tileSize;
    let y = this.body[0].y + this.direction.y * this.tileSize;

    //Eat the apple
    if (this.apple.x === x && this.apple.y === y) {
      this.body.push(
        this.scene.add
          .rectangle(0, 0, this.tileSize, this.tileSize, 0xffffff)
          .setOrigin(0)
      );
      this.positionApple();
      this.moveInterval -= 5;
      /* this.pointCount += 1;
      console.log(this.pointCount)
      document.getElementById('point-count').innerHTML = `${this-pointCount}`; */
    }

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    this.body[0].x = x;
    this.body[0].y = y;
    
    //DEATH
    // death by ringout
    if (
      this.body[0].x < 0 ||
      this.body[0].x >= this.scene.game.config.width ||
      this.body[0].y < 0 ||
      this.body[0].y >= this.scene.game.config.height
    ) {
      this.scene.scene.restart();
    }
    // death by ouroboros
    let tail = this.body.slice(1);
    if (tail.some((s) => s.x === this.body[0].x && s.y === this.body[0].y)) {
      this.scene.scene.restart();
    }
  }
}

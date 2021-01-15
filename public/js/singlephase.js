import MainScene from './MainScene.js';

const config = {

    width: 450,
  
    height: 450,
    type: Phaser.AUTO,
    parent: 'phaser-game',
    scene: [MainScene]
  };
  
  new Phaser.Game(config);
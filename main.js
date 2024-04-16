
//const Phaser = require('')
//class fireball extends 


var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default:'arcade',
        arcade:{
            debug:false,
            gravity:{y:0}
        }
    }
};

var game = new Phaser.Game(config);
var player;
var bg;
var bullets;
function fireBullet() {
    var bullet = bullets.create(player.x, player.y, 'bullet');
    bullet.setScale(0.3, 0.3);
    bullet.setVelocityY(-100);
}
/*
function bulletHitPlayer(player, bullet) {
    var explosion = game.scene.scenes[0].add.sprite(bullet.x, bullet.y, 'bom');
    explosion.setScale(0.2);
    explosion.play('explode');

    bullet.disableBody(true, true);
}*/
function preload() {
    this.load.image('background', 'image/background.jpg');
    //this.load.image('mainplayer', 'image/player.png');
    this.load.image('bullet', 'image/bullet2.png');
    this.load.spritesheet('ship3','image/spritesheets/ship3.png',{
        frameWidth: 32,
        frameHeight: 32
    })
    this.load.spritesheet('explosion','image/spritesheets/explosion.png',{
        frameWidth: 16,
        frameHeight:16
    });
}

function create() {
    var background = this.textures.get('background');
    var scaleX = config.width / background.source[0].width;
    var scaleY = config.height / background.source[0].height;
    bg = this.add.tileSprite(0, 0, config.width, config.height, 'background');
    bg.setScale(scaleX, scaleY);

    this.ship3 = this.add.sprite(config.width/2-50, config.height-50, 'ship3');
    this.ship3.angle = 180;
    this.ship3.setScale(2);
    player = this.ship3;
    bullets = this.physics.add.group();
    
    this.input.on('pointerdown',function(pointer){
        fireBullet();
    });

    
    this.input.on('pointermove', function (pointer) {
       player.x =pointer.x;
       player.y =pointer.y;
       
    });
    this.anims.create({
        key:"ship3_anim",
        frames:this.anims.generateFrameNumbers("ship3"),
        frameRate:20,
        repeat:-1
    });
   
    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion'), 
        frameRate:20,
        repeat: 0,
        hideOnComplete: true
    });
    this.ship3.play("ship3_anim");
    
    this.ship3.setInteractive();
  
   //this.input.on('gameobjectdown',this.destroyShip,this);

}
/*
function destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
}*/
function update() {
    bg.tilePositionY -= 1;
    
    if (player.y <=300)
    {
        console.log("11111111111111");
        player.play('explode');
        this.ship3 = this.add.sprite(config.width/2-50, config.height-50, 'ship3');
        this.ship3.angle = 180;
        this.ship3.setScale(2);
        player = this.ship3;
        this.ship3.play("ship3_anim");
       // destroyShip(pointer,player);
        
    }

  
}


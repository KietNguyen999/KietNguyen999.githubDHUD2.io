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
    bullet.setScale(0.5, 0.5);
    bullet.setVelocityY(-100);
}

function destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
}

function preload() {
    this.load.image('background', 'image/background.jpg');
    this.load.image('bullet', 'image/bullet2.jpg');
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

    this.ship3 = this.add.sprite(config.width/2-50, config.height/2, 'ship3');
    bullets = this.physics.add.group();
    this.input.on('pointerdown',function(pointer){
        fireBullet();
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
    this.input.on('gameobjectdown',this.destroyShip,this);
}

function update() {
    bg.tilePositionY -= 1;
    this.ship3.x = this.input.activePointer.x;
    this.ship3.y = this.input.activePointer.y;
}
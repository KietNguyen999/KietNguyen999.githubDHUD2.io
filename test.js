

        var config = {
            type: Phaser.CANVAS,
            width:600,
            height: 800,
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        var game = new Phaser.Game(config);
        var player;
        var bg;
        function preload() {
           this.load.image('background', 'DoAn/background.jpg');
           this.load.image('mainplayer','DoAn/player.png');
           
        }
        
        function create() {
           
            var background = this.textures.get('background');
            var scaleX = config.width / background.source[0].width;
            var scaleY = config.height / background.source[0].height;
             bg = this.add.tileSprite(0, 0, config.width, config.height, 'background');
             bg.setScale(scaleX, scaleY);
            
            //const {width,height} = this.scale

            player = this.add.image(0, 0, 'mainplayer');
            
            player.setOrigin(0.5);
            player.setScale(0.3,0.3);
            this.input.on('pointermove', function(pointer) {
                player.x = pointer.x;
                player.y = pointer.y;
            
        });
        }
    

        function update() {
            // Tùy chỉnh tốc độ cuộn của background tại đây
           bg.tilePositionY -= 1;
        }

  
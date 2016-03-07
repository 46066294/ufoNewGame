/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    game: Phaser.Game;
    private ufo:Phaser.Sprite;
    private cursor:Phaser.CursorKeys;
    private FRICCION = 30;
    private MAX_SPEED = 250;
    private ACCELERATION = 750; // pixels/second/second

    preload():void {
        super.preload();

        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        //this.load.image('background', 'assets/Background_low.png');
        this.load.image('background1', 'assets/Background_low-0-0.png');
        this.load.image('background2', 'assets/Background_low-0-1.png');
        this.load.image('background3', 'assets/Background_low-0-2.png');
        this.load.image('background4', 'assets/Background_low-1-0.png');
        this.load.image('background5', 'assets/Background_low-1-1.png');
        this.load.image('background6', 'assets/Background_low-1-2.png');
        this.load.image('background7', 'assets/Background_low-2-0.png');
        this.load.image('background8', 'assets/Background_low-2-1.png');
        this.load.image('background9', 'assets/Background_low-2-2.png');

        this.physics.startSystem(Phaser.Physics.ARCADE);

    }

    create():void {
        super.create();

        var background1 = this.add.sprite(0, 0, 'background1');
        var background2 = this.add.sprite(0, 0, 'background2');
        //bla, bla


        background = this.add.sprite(0, 0, 'background');

        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo);
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.ufo.body.drag.setTo(this.FRICCION, this.FRICCION);
        this.ufo.body.collideWorldBounds = true;
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update():void {
        super.update();
        this.game.debug.bodyInfo(this.ufo, 0, 0);

        if(this.cursor.left.isDown){
            //this.ufo.x -= 5;
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        } else if(this.cursor.right.isDown){
            //this.ufo.x += 5;
            this.ufo.body.acceleration.x = this.ACCELERATION;
        } else if(this.cursor.up.isDown){
            //this.ufo.y -= 5;
            this.ufo.body.acceleration.y = -this.ACCELERATION;
        } else if(this.cursor.down.isDown){
            //this.ufo.y += 5;
            this.ufo.body.acceleration.y = this.ACCELERATION;
        }else {
            this.ufo.body.acceleration.y = 0;
            this.ufo.body.acceleration.x = 0;

        }

    }
}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new SimpleGame();
};



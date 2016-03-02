/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    game: Phaser.Game;
    private ufo:Phaser.Sprite;
    private cursor:Phaser.CursorKeys;
    private UFO_SIZE = 75;
    private UFO_SPEED = 200;
    private MAX_SPEED = 250;
    private ACCELERATION = 750; // pixels/second/second

    preload():void {
        super.preload();

        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.load.image('background', 'assets/Background_low.png');

        this.physics.startSystem(Phaser.Physics.ARCADE);

    }

    create():void {
        super.create();
        var background;

        background = this.add.sprite(0, 0, 'background');

        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo);
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update():void {
        super.update();
        this.game.debug.bodyInfo(this.ufo, 0, 0);

        if(this.cursor.left.isDown){
            this.ufo.x -= 5;
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        }
        if(this.cursor.right.isDown){
            this.ufo.body.velocity.x = this.UFO_SPEED;
            this.ufo.x += 5;
        }
        if(this.cursor.up.isDown){
            this.ufo.y -= 5;
            this.ufo.body.acceleration.x = this.ACCELERATION;
        }
        if(this.cursor.down.isDown){
            this.ufo.y += 5;
            this.ufo.body.acceleration.y = this.ACCELERATION;
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

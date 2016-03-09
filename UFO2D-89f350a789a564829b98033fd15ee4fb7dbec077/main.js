var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser/phaser.d.ts"/>
var Point = Phaser.Point;
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.MAX_SPEED = 250;
        this.ACCELERATION = 750; // pixels/second/second
        this.DRAG = 100;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.game.load.tilemap('tilemap', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/Background_low.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createWalls();
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo, Phaser.Physics.ARCADE);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(0.5);
        this.ufo.body.drag.setTo(this.DRAG, this.DRAG); // x, y
        //pickups
        this.pickup = this.add.sprite(this.world.centerX, this.world.centerY, 'pickup');
        this.pickup.anchor.setTo(0.5, 0.5);
        /////////
    };
    //GITHUB PROFE: https://github.com/lawer/UFO2D/blob/e4dd238c1cd9225b35c6bbb72917b9201b679b15/main.ts
    mainState.prototype.createWalls = function () {
        //this.map = this.game.add.tilemap('map.json');
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('Background_low', 'tiles');
        var background = this.map.createLayer('background'); //Tile Layer 2
        this.walls = this.map.createLayer('walls'); //Tile Layer 1
        this.map.setCollisionBetween(1, 100, true, 'walls');
    };
    ;
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        //this.game.debug.bodyInfo(this.ufo, 0, 0);
        this.physics.arcade.collide(this.ufo, this.walls);
        if (this.cursor.left.isDown) {
            //this.ufo.x -= 5;
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        }
        else if (this.cursor.right.isDown) {
            //this.ufo.x += 5;
            this.ufo.body.acceleration.x = this.ACCELERATION;
        }
        else if (this.cursor.up.isDown) {
            //this.ufo.y -= 5;
            this.ufo.body.acceleration.y = -this.ACCELERATION;
        }
        else if (this.cursor.down.isDown) {
            //this.ufo.y += 5;
            this.ufo.body.acceleration.y = this.ACCELERATION;
        }
        else {
            this.ufo.body.acceleration.y = 0;
            this.ufo.body.acceleration.x = 0;
        }
        this.ufo.body.angularAcceleration = this.ufo.body.acceleration.y;
        this.pickup.angle += 1;
    };
    return mainState;
})(Phaser.State);
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=main.js.map
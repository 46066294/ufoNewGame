/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.UFO_SIZE = 75;
        this.UFO_SPEED = 200;
        this.MAX_SPEED = 250;
        this.ACCELERATION = 750; // pixels/second/second
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.load.image('background', 'assets/Background_low.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        var background;
        background = this.add.sprite(0, 0, 'background');
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo);
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.cursor = this.input.keyboard.createCursorKeys();
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.game.debug.bodyInfo(this.ufo, 0, 0);
        if (this.cursor.left.isDown) {
            this.ufo.x -= 5;
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        }
        if (this.cursor.right.isDown) {
            this.ufo.body.velocity.x = this.UFO_SPEED;
            this.ufo.x += 5;
        }
        if (this.cursor.up.isDown) {
            this.ufo.y -= 5;
            this.ufo.body.acceleration.x = this.ACCELERATION;
        }
        if (this.cursor.down.isDown) {
            this.ufo.y += 5;
            this.ufo.body.acceleration.y = this.ACCELERATION;
        }
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
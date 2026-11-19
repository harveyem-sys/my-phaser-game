import { Scene } from "phaser";

export class MainGame extends Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  platforms: any;

  //this is for input from keyboard
  cursors: any;

  constructor() {
    super("MainGame");

    console.log("MainGame constuctor");
  }

  // provided by phaser, preloads assets like images
  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky");

    this.platforms = this.physics.add.staticGroup();
    //main gorund
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

    //other platforms
    this.platforms.create(400, 400, "ground");
    this.platforms.create(10, 250, "ground");
    this.platforms.create(800, 250, "ground");

    this.player = this.physics.add.sprite(400, 400, "dude");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
        key:  "left",
        frames: this.anims.generateFrameNumbers("dude", {
          start: 0,
          end: 3
        }),
        repeat: -1, 
        frameRate: 10,
    })
    
    this.anims.create({
       key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5, 
        end: 8 
      }),
      frameRate: 10,
      repeat: -1
   })

    this.cursors = this.input.keyboard?.createCursorKeys();


    this.physics.add.collider(this.player, this.platforms);
  }

  update(time: number, delta: number): void {
    
      const { left, right, up, } = this.cursors;

      if(left.isDown) {
          this.player.setVelocityX(-160);
          this.player.anims.play("left", true);
      } else if (right.isDown) {
        this.player.setVelocityX(160)
        this.player.anims.play("right", true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
      }

      if(up.isDown && this.player.body.touching.down) {
          this.player.setVelocityY(-330);
      }
  }
}

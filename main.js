
var DPR = window.devicePixelRatio;
var gameW = document.body.clientWidth *DPR;
var gameH = document.body.clientHeight *DPR;
var game = new Phaser.Game(gameW,gameH,Phaser.CANVAS,'game');
var fontSize = 28*DPR;

onload = function () {

    var loading,
        progress,
        timer,
        ball;

    //游戏加载
    var bootState = function (game) {
        this.preload = function(){
            game.load.image("loading","./assets/loading.gif")
        };
        this.create =function(){
            console.log("启动loading");
            var style = {font:"36px",fill:"#fff"};
            var gameTitle = game.add.text(0,game.height/3,'loading',style);
            gameTitle.x = (game.width - gameTitle.width)/2;
            gameTitle.alpha =1;
            game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.stage.backgroundColor = "#1b2436";
            game.state.start('start');
        };
    };

    //游戏开始画面
    var startState = function (game) {
        var bmd,colors,rectangle,ball,getColor,innerCircle,outerCircle,rgb,button;
        var i = 0;
        var p =null;

        this.preload =function(){
            game.load.spritesheet('button', './assets/button_sprite_sheet.png', 210, 0);
        };
        this.create = function(){
            console.log("开始画面");
            //游戏名称
            var style = {font:fontSize+"px",fill:"#fff"};
            var gameTitle = game.add.text(0,game.height/5,'大鱼吃小鱼',style);
            gameTitle.x = (game.width - gameTitle.width)/2;
            gameTitle.alpha =1;

            //启动动画
            //var circle = new ShapeBall(colorObj.color2,colorObj.color1,size);
            var circle1 = new ShapeBall("#8ED6FF","#003BA2",80);
            var circle2 = new ShapeBall("#94ff6f","#2aa200",30);

            player = game.add.sprite(game.width/2+50,game.height/2,circle2);
            ball = game.add.sprite(game.width/2 -110,game.height/4+100,circle1);

            game.add.tween(ball,player).to(
                {
                    y: game.height / 2 - 50,
                    radius: 1
                },
                2000,
                Phaser.Easing.Bounce.Out,
                true,
                100 + 400 *2
            );

            //开始按钮
            button = game.add.button(game.world.centerX - 95, game.height*0.75, 'button', actionOnClick, this, 2, 1, 0);
            function actionOnClick () {
                game.state.start('main');
            }
            //game.state.start('main');

        };
        this.update = function(){
            //bmd.setPixel(p.x, p.y, colors[i].r, colors[i].g, colors[i].b);
        };
        this.render = function () {
            //game.debug.geom(ball,'#cfffff');

        }
    };
    var enemy,player,sBall,scoreText,ballNum;
    var score = 0;
    var mainState = function (game) {
        this.addBall = function () {
            var colorObj = new RandomColor();
            var size = Math.floor(Math.random()*10 +1) * 5*DPR;
            if(size > 89){
                size = size -80;
            }

            var circle = new ShapeBall(colorObj.color2,colorObj.color1,size);
            var ballX = game.world.randomX;
            var ballY = game.world.randomY;
            if(ballX < game.width/2){
                ballX = -ballX;
            }else{
                ballX = ballX+game.width;
            }
            if(ballY < game.height/2){
                ballY = -ballY;
            }else{
                ballY = ballY;
            }

            sBall = enemy.create(ballX,ballY,circle);
            sBall.body.collideWorldBounds = true;
            sBall.body.setCircle(size/2);
            sBall.body.bounce.set(1);
            sBall.body.gravity.y = size/4;
            sBall.body.velocity.set((130 - size/2)*2);
            //console.log(size,);
            return ballNum = enemy.children.length

        };
        this.create = function(){
            game.physics.startSystem(Phaser.Physics.ARCADE);
            //设置游戏标准重力为100
            //game.physics.arcade.gravity.y = 98;
            //game.enableBody = true;

            enemy = game.add.group();
            enemy.enableBody = true;
            enemy.physicsBodyType = Phaser.Physics.ARCADE;

            for(var c=0;c<4;c++) {
                this.addBall();
            }
            console.log(this.addBall());

            //玩家设置
            var Shape = new ShapeBall("#ff5757","#aa0101",11*DPR);
            //
            player = game.add.sprite(game.width/2 -10,game.height/2-10,Shape);

            //拖动设置
            player.inputEnabled = true; //sprite to input
            player.input.enableDrag(true); //input set drag
            //player.body.immovable = true;
            //player.body.collideWorldBounds = true;

            game.physics.arcade.enable([enemy,player], Phaser.Physics.ARCADE);

            //统计得分
            scoreText = game.add.text(24,24,'分数：0', { fontSize: '48px', fill: '#fff' });

            game.time.events.loop(1000, this.addBall, this);

        };

        this.update = function(){
            game.physics.arcade.collide(enemy, player);
            game.physics.arcade.overlap(enemy,player,collectStar,null,this);
        };
        this.render = function(){

        };
        function collectStar(player,sBall) {
            if(player.width>sBall.width){
                sBall.kill();
                player.width+=6;
                player.height+=6;
                score +=10;
                scoreText.text = '分数：'+ score;
            }else{
                console.log("游戏结束，你被吃掉了！");
                game.state.start('end');
            }

        }
    };

    var endState = function (game) {
        var button2,scoreText,titleTxt;
        this.preload = function () {
            game.load.spritesheet('button2', './assets/button_sprite_sheet2.png', 210, 0);
        };
        this.create = function(){
            //结语
            titleTxt =  game.add.text(0 ,game.height/5,'游戏结束', { fontSize: fontSize*1.3+'px', fill: '#c00',boundsAlignH:'center' })
            titleTxt.setTextBounds(0, 100, 800, 100);
            scoreText = game.add.text(0 ,game.height/3,'我的战绩：'+score, { fontSize: '32px', fill: '#fff',boundsAlignH:'center' });
            scoreText.setTextBounds(0, 100, 800, 100);
            //重新开始
            button2 = game.add.button(game.world.centerX - 95, game.height*0.75, 'button2', actionOnClick, this, 2, 1, 0);
            function actionOnClick () {
                score = 0;
                game.state.start('start');
            }
        };
    };



    game.state.add('boot',bootState);
    game.state.add('start',startState);
    game.state.add('main',mainState);
    game.state.add('end',endState);

    //游戏
    game.state.start('boot');

    function ShapeBall(color1,color2,size) {
        this.bmd = game.make.bitmapData(size*2, size*2);

        this.ballStyle = this.bmd.context.createRadialGradient(
            size*0.6,
            size*0.6,
            size*0.1,
            size,
            size,
            size * 1.2
        );
        this.ballStyle.addColorStop(0, color1);
        this.ballStyle.addColorStop(1, color2);

        this.bmd.circle(size, size, size, this.ballStyle);
        return this.bmd;
    }

    function RandomColor() {
        //随机颜色
        this.highlight = 88;
        this.r=Math.floor(Math.random()*256);
        this.g=Math.floor(Math.random()*(256-this.highlight));
        this.b=Math.floor(Math.random()*256);
        this.g2 = this.g + this.highlight;
        //所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
        return{
            color1:"#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1),
            color2:"#" + ((1 << 24) + (this.r << 16) + (this.g2 << 8) + this.b).toString(16).slice(1)
        }
    }


};

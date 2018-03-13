

var game = new Phaser.Game(750,1334,Phaser.CANVAS,'game');

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
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.stage.backgroundColor = "#1b2436";
        game.state.start('loader');
    };
};

//游戏启动画面
var loaderState = function (game) {
    var bmd,colors,rectangle,ball,getColor,innerCircle,outerCircle,rgb;
    var i = 0;
    var p =null;

    this.preload =function(){

    };
    this.create = function(){
        console.log("开始画面");

        getColor = function (){
            //随机颜色
            var highlight = 80;
            var r=Math.floor(Math.random()*256),
                g=Math.floor(Math.random()*(256-highlight)),
                b=Math.floor(Math.random()*256),
                g2 = g + highlight;
            //所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
            return{
                color1:"#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1),
                color2:"#" + ((1 << 24) + (r << 16) + (g2 << 8) + b).toString(16).slice(1)
            }

            //};
            //console.log(ballColor());

            //十六进制颜色转化
            // function colorRGB2Hex(color) {
            //     rgb = color.split(','),
            //         r = parseInt(rgb[0].split('(')[1]),
            //         g = parseInt(rgb[1]),
            //         b = parseInt(rgb[2].split(')')[0]);
            //
            //     var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            //     //var hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            //     return hex;
            // }
            // var color = ballColor().color;
            // var color2 = ballColor().lighter;
            // console.log(color,color2);
            //
            // ballColor = colorRGB2Hex(color);
            // ballLighter = colorRGB2Hex(color2);
            // return {
            //     color:ballColor,
            //     lighter:ballLighter
            // };

        };

        var c = Phaser.Color.HSVColorWheel(50, 255, 255);

        var style = {font:"36px",fill:"#fff"};

        var gameTitle = game.add.text(0,game.height/3,'弹珠',style);
        gameTitle.x = (game.width - gameTitle.width)/2;
        gameTitle.alpha =1;
        //ball = new Phaser.Circle(game.width/2,game.height/2,120);

        game.add.sprite(100,100,'ball');

        //colors = Phaser.Color.hexToColor();
        var aColor = Phaser.Color.getRandomColor(0,100,0.6);

        //  Create a Rectangle
        rectangle = new Phaser.Rectangle(100, 100, 550, 1000);

        // bmd = game.add.bitmapData(game.width, game.height);
        // bmd.addToWorld();


        p = new Phaser.Point();

        // ball1 = new Shape(getColor(),100,30);
        //
        // var sp = game.add.sprite(ball1);

        // 创建一个bitmap对象
        //var bmd = game.add.bitmapData(128,128);
        // bmd = game.make.bitmapData(100, 100);
        // //bmd.addToWorld();
        // innerCircle = new Phaser.Circle(50, 50, 10);
        // outerCircle = new Phaser.Circle(50, 50, 100);
        //
        // ball = bmd.context.createRadialGradient(
        //     innerCircle.x-10,
        //     innerCircle.y-10,
        //     innerCircle.radius,
        //     outerCircle.x,
        //     outerCircle.y,
        //     outerCircle.radius
        // );
        // var colorObj = getColor();
        //
        // ball.addColorStop(0, colorObj.color2);
        // ball.addColorStop(1, colorObj.color1);
        //console.log(colorObj,colorObj.color1,colorObj.color2);

        //console.log(generateHexColor(0.5));

        // 使用Canvas的api进行绘制
        //bmd.ctx.beginPath();
        //bmd.circle(0, 0, 128, "#cc0000");
        //bmd.ctx.fillStyle = '#ff0000';
        //bmd.ctx.fill();
        // 用bitmap对象创建精灵
        //var sprite = game.add.sprite(0, 30, outerCircle);

        //bmd.cls();
        //type1
        // bmd.circle(outerCircle.x, outerCircle.y, outerCircle.radius, ball);
        // console.log(bmd);



        //type2


        //var type2 = game.add.sprite(100,200,ballC);

        //console.log(type2);
        console.log(game.world.randomX,game.world.randomY);

        setTimeout(function () {
            //i = game.math.wrapValue(i, 1, 359);
            for(var c=0;c<10;c++) {
                rectangle.random(p);
                p.floor();

                var colorObj = getColor();
                var size = Math.floor(Math.random()*10 +1) * 10 +10;

                var circle = new ShapeBall(colorObj.color2,colorObj.color1,size);
                var sBall = game.add.sprite(game.world.randomX,game.world.randomX,circle);

                game.add.tween(sBall).to(
                    {
                        x: game.world.randomX,
                        y: game.world.randomY,
                        radius: 1
                    },
                    3000,
                    "Sine.easeInOut",
                    true,
                    0,
                    -1,
                    true
                );

            }

        },1000);

        function ShapeBall(color1,color2,size) {
            this.bmd = game.make.bitmapData(size*2, size*2);

            this.ballStyle = this.bmd.context.createRadialGradient(
                size - size*0.3,
                size - size*0.3,
                size - size*0.6,
                size,
                size,
                size * 2
            );
            this.ballStyle.addColorStop(0, color1);
            this.ballStyle.addColorStop(1, color2);

            this.bmd.circle(size, size, size, this.ballStyle);
            return this.bmd;
        }
        // var size = Math.floor(Math.random()*10 +1) * 10 +10;
        //
        // var ballC = new ShapeBall("#286c15","#28bc15",size);
        //
        // game.add.sprite(100,100,ballC);

        //console.log(this.bmd);
        // this.ball = game.add.graphics();
        // this.ball.beginFill("0x" + color);
        // //this.ball.lineStyle = "rgb(255,255,0)";
        // this.ball.drawCircle(x, y, 50);
        // this.ball.endFill();
        //return this.bmd;

    };
    this.update = function(){

    };
    this.render = function () {
        //game.debug.geom(ball,'#cfffff');

    }
};



game.state.add('boot',bootState);
game.state.add('loader',loaderState);
//游戏
game.state.start('boot');


// Shape.prototype = {
//     constructor :Shape,
//     draw:function () {
//
//     }
// }

};

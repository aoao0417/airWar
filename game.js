var cvs = document.getElementById('ground');
var ctx = cvs.getContext('2d');

var rockImg = new Image();
var rock2Img = new Image();
var enemyImg = new Image();
var enemy2Img = new Image();
var heartImg = new Image();
var background = new Image();
var plane = new Image();
var bullet1 = new Image();
var enemybullet1 = new Image();
var enemyBullet = new Image();
var boss = new Image();
rockImg.src = 'image/rock1.png';
rock2Img.src = 'image/rock2.png';
enemyImg.src = 'image/enemy1.png';
enemy2Img.src = 'image/enemy2.png';
heartImg.src = 'image/heart.png';
background.src = 'image/background.jpg';
plane.src = 'image/plane1.png';
bullet1.src = 'image/bullet3.png';
enemybullet1.src = 'image/enemyBullet2.gif';
enemyBullet.src = 'image/enemyBullet1.gif';
boss.src = 'image/boos1.gif';
//游戏canvas画布初始化以及更新
function Game() {
    var _this = this;
    this.airplane = new airplane();
    this.UI = new UI();
    this.boss1 = new Boss();
    //陨石1
    this.rockstr = [];
    this.rframe =0;
    this.rlastframe = 0;
    this.rCD = 30;
    //陨石2
    this.rock2str = [];
    this.r2frame =0;
    this.r2lastframe = 0;
    this.r2CD = 80;
    //玩家子弹
    this.bulletstr = [];
    this.bltframe =0;
    this.bltlastframe = 0;
    this.bltCD = 5;
    //掉落的生命
    this.ht = [];
    this.htframe =0;
    this.htlastframe = 0;
    this.htCD = 200;
    //敌人1
    this.enemystr =[];
    this.enemyframe = 0;
    this.enemylastframe = 0;
    this.enemyCD = 60;
    //敌人2
    this.enemy2str =[];
    this.enemy2frame = 0;
    this.enemy2lastframe = 0;
    this.enemy2CD = 80;
    //敌人2发射的子弹
    this.enemybulletframe = 0;
    this.enemybulletlastframe = 0;
    this.enemybulletCD = 15;
    //boss发射的子弹
    this.bigBullet = [];
    this.bbshootframe = 0;
    this.bbshootlasrframe = 0;
    this.bbshootCD = 10;
    //boss出场的随机子弹
    this.randomBullet = [];
    for(var i = 0; i <= 20 ; i++){
        _this.randomBullet.push(new randomBullet());
    }

    this.lastScore = 0;

    this.update = function () {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        //画UI
        _this.UI.heartX = 10;
        //画玩家飞机
        _this.airplane.drawPlane();
        _this.airplane.planeMove();
        _this.airplane.isPlaneCollision();
        //cd定时器
        _this.bltframe++;
        _this.enemyframe++;
        _this.enemy2frame++;
         _this.rframe++;
        _this.r2frame++;
        _this.htframe++;
        //随机掉落红心
        if(_this.htframe - _this.htlastframe >= _this.htCD){
            _this.ht.push(new prop());
            _this.htlastframe = _this.htframe;
        }
        if(_this.ht.length >= 1){
            _this.ht.forEach(function (h,index) {
                h.heartCollision();
                if(Math.abs(h.heartX - _this.airplane.planeX) <= 50 && Math.abs(h.heartY - _this.airplane.planeY) <= 50 &&
                _this.UI.heartnum <= 10){
                    _this.ht.splice(index,1);
                    _this.UI.heartnum ++;
                }
                h.drawHeart();
                h.heartMove();
            })
        }
        //陨石1的生成与下落
        if(_this.rframe - _this.rlastframe >= _this.rCD){
            _this.rockstr.push(new rock());
            _this.rlastframe = _this.rframe;
        }
        if(_this.rockstr.length >= 1){
            _this.rockstr.forEach(function (r,index) {
                r.rockCollision();
                if(Math.abs(r.rockX - _this.airplane.planeX) <= 50 && Math.abs(r.rockY - _this.airplane.planeY) <= 50){
                    r.rockappear = true;
                    _this.UI.heartnum --;
                }
                if(r.rockappear == true){
                    _this.rockstr.splice(index,1);
                }
                r.drawRock();
                r.rockMove();
            })
        }
        //陨石2的生成与下落
        if(_this.UI.level >= 2){
            if(_this.r2frame - _this.r2lastframe >= _this.r2CD){
                _this.rock2str.push(new rock());
                _this.r2lastframe = _this.r2frame;
            }
            if(_this.rock2str.length >= 1){
                _this.rock2str.forEach(function (r2,index) {
                    r2.rock2Collision();
                    if(Math.abs(r2.rock2X - _this.airplane.planeX) <= 50 && Math.abs(r2.rock2Y - _this.airplane.planeY) <= 50){
                        r2.rock2appear = true;
                        _this.UI.heartnum --;
                    }
                    if(r2.rock2appear == true){
                        _this.rock2str.splice(index,1);
                    }
                    r2.drawRock2();
                    r2.rock2Move();
                    r2.isCollision();
                })
            }
        }
        //敌人1的生成
        if(_this.UI.level >= 3){
            if(_this.enemyframe - _this.enemylastframe >= _this.enemyCD){
                _this.enemystr.push(new enemy());
                console.log(_this.enemystr);
                _this.enemylastframe = _this.enemyframe;
            }
            if(_this.enemystr.length >= 1){
                _this.enemystr.forEach(function (em,index) {
                    em.enemyCollision();
                    if(Math.abs(em.enemyX - _this.airplane.planeX) <= 50 && Math.abs(em.enemyY - _this.airplane.planeY) <= 50){
                        em.enemyappear = true;
                        _this.UI.heartnum --;
                    }
                    if(em.enemyappear == true){
                        _this.enemystr.splice(index,1);
                    }
                    em.drawEnemy();
                    em.enemyMove();
                    em.isCollision();
                })
            }
        }
        //敌人2以及子弹的生成
        if(_this.UI.level >= 4){
            if(_this.enemy2frame - _this.enemy2lastframe >= _this.enemy2CD){
                _this.enemy2str.push(new enemy());
                _this.enemy2lastframe = _this.enemy2frame;
            }
            if(_this.enemy2str.length >= 1){
                _this.enemy2str.forEach(function (em2,index) {
                    _this.enemybulletframe ++;
                    if(_this.enemybulletframe - _this.enemybulletlastframe >= _this.enemybulletCD){
                        em2.createBlt();
                        _this.enemybulletlastframe = _this.enemybulletframe;
                    }
                    em2.fire();
                    em2.emblt.forEach(function (emb) {
                        if(Math.abs(emb.embulletX  - _this.airplane.planeX) <= 50 && Math.abs(emb.embulletY - _this.airplane.planeY) <= 50){
                            emb.emappear = true;
                            _this.UI.heartnum --;
                        }
                    })
                    em2.enemy2Collision();
                    if(Math.abs(em2.enemy2X - _this.airplane.planeX) <= 50 && Math.abs(em2.enemy2Y - _this.airplane.planeY) <= 50){
                        em2.enemy2appear = true;
                        _this.UI.heartnum --;
                    }
                    if(em2.enemy2appear){
                        _this.enemy2str.splice(index,1);
                    }
                    em2.enemy2Move();
                    em2.drawEnemy2();
                })
            }
        }
        //boss的相关内容
        if(_this.UI.level >= 5){
            _this.boss1.drawBoss();
            _this.boss1.bossMove();

            //boss的子弹
            _this.bbshootframe ++;
            if(_this.bbshootframe - _this.bbshootlasrframe >= _this.bbshootCD){
                _this.bigBullet.push(new bossBullet(_this.boss1.bossX,_this.boss1.bossY));

                _this.bbshootlasrframe = _this.bbshootframe;
            }
            if(_this.bigBullet.length >= 1){
                _this.bigBullet.forEach(function (bb,index) {
                    bb.bigCollision();
                    if(Math.abs(bb.bigBulletX  - _this.airplane.planeX) <= 50 && Math.abs(bb.bigBulletY - _this.airplane.planeY) <= 50
                        || Math.abs(bb.bigBulletX  - _this.airplane.planeX) >= 200 && Math.abs(bb.bigBulletY - _this.airplane.planeY) <= 50
                        && Math.abs(bb.bigBulletX  - _this.airplane.planeX) <= 270 ){
                        bb.bigappear =true;
                        _this.UI.heartnum --;
                    }
                    if(bb.bigappear){
                        _this.bigBullet.splice(index,1);
                    }
                    bb.drawBigBullet();
                    bb.bigBulletMove();
                })
            }

            //boss的随机子弹
            _this.randomBullet.forEach(function (rb,index) {
                rb.isappear();
                if(Math.abs(rb.sBulletX  - _this.airplane.planeX) <= 50 && Math.abs(rb.sBulletY - _this.airplane.planeY) <= 50){
                    rb.sappear = true;
                    _this.UI.heartnum --;
                }
                if(rb.sappear){
                    _this.randomBullet.splice(index,1);
                }
                rb.createB();
                rb.moveB();
                rb.collisionB();
            })
        }

        //玩家子弹的生成
        if(_this.bulletstr.length >= 1){
            _this.bulletstr.forEach(function (blt,index) {
                blt.isBulletCollision();
                if(blt.appear == true){
                    _this.bulletstr.splice(index,1);
                }
                blt.createBullet();
                blt.bulletMove();
            })
        }
        //子弹和陨石的碰撞检测
        if(_this.bulletstr.length >=1){
            _this.bulletstr.forEach(function (blt) {
                //与boss的碰撞检测
                if(Math.abs(blt.bulletX - _this.boss1.bossX) <= 200 && Math.abs(blt.bulletY - _this.boss1.bossY) <= 150){
                    if(_this.boss1.bossHP <=0){
                        blt.appear = true;
                        _this.UI.score += 1000;
                    }
                    else{
                        blt.appear = true;
                        _this.boss1.bossHP--;
                    }
                }
                //与石头1的碰撞检测
                _this.rockstr.forEach(function (r) {
                    if(Math.abs(blt.bulletX - r.rockX) <= 50 && Math.abs(blt.bulletY - r.rockY) <= 50) {
                        blt.appear = true;
                        r.rockappear = true;
                        _this.UI.score += 10;
                    }
                })
                //与石头2的碰撞检测
                _this.rock2str.forEach(function (r2) {
                    if(Math.abs(blt.bulletX - r2.rock2X) <= 50 && Math.abs(blt.bulletY - r2.rock2Y) <= 50) {
                        blt.appear = true;
                        r2.rock2appear = true;
                        _this.UI.score += 10;
                    }
                })
                //与敌人1的碰撞检测
                _this.enemystr.forEach(function (em) {
                    if(Math.abs(blt.bulletX - em.enemyX) <= 50 && Math.abs(blt.bulletY - em.enemyY) <= 50) {
                        if(em.enemyHP <= 0){
                            blt.appear = true;
                            em.enemyappear = true;
                            _this.UI.score += 10;
                        }
                        else{
                            em.enemyHP -= 1;
                            blt.appear = true;}
                    }
                })
                //与敌人2的碰撞检测
                _this.enemy2str.forEach(function (em2) {
                    if(Math.abs(blt.bulletX - em2.enemy2X) <= 50 && Math.abs(blt.bulletY - em2.enemy2Y) <= 50) {
                        blt.appear = true;
                        em2.enemy2appear = true;
                        _this.UI.score += 10;
                    }
                })
            })
        }
        //分数以及关卡的判断
        if(_this.UI.level <= 4){
            if(_this.UI.score - _this.lastScore >= 100){
                nextLevel();
                _this.UI.level++;
                _this.lastScore = _this.UI.score;
            }
        }
        //画其他UI
        _this.UI.drawHeart();
        _this.UI.scoreNum();
        _this.UI.drawLevel();

        win();
        lose();
    }
    //键盘按键事件监控
    document.onkeydown = function (e) {
        if(e.keyCode == 32){
            if(_this.bltframe - _this.bltlastframe >= _this.bltCD){
                _this.bulletstr.push(new bullet(_this.airplane.planeX,_this.airplane.planeY));
                _this.bltlastframe = _this.bltframe;
            }
        }
        else{
            switch (e.keyCode){
                case 37:
                    _this.airplane.direction = 2;
                    break;
                case 38:
                    _this.airplane.direction = 0;
                    break;
                case 39:
                    _this.airplane.direction = 3;
                    break;
                case 40:
                    _this.airplane.direction = 1;
                    break;
            }
        }
    }
    //初始化游戏场景
    this.init = function () {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        _this.bulletstr = [];
        _this.rockstr = [];
        _this.rock2str = [];
        _this.ht = [];
        _this.enemystr = [];
        _this.enemy2str =[];
        _this.bigBullet = [];
        _this.randomBullet = [];
        for(var i = 0; i <= 20 ; i++){
            _this.randomBullet.push(new randomBullet());
        }
        _this.boss1.bossHP = 20;
        _this.lastScore = 0;
        _this.UI.heartnum = 5;
        _this.UI.score = 0;
        _this.airplane.planeX = 225;
        _this.airplane.planeY = 600;
        _this.rframe =0;
        _this.rlastframe = 0;
        _this.bltframe =0;
        _this.bltlastframe = 0;
        _this.airplane.direction = 5;
        _this.UI.level = 1;
        _this.boss1.bossX = 85;
        _this.boss1.bossY = -200;
    }
}
//玩家飞机的构造函数
function airplane() {
    var _this = this;
    this.planeX = 225;
    this.planeY = 600;
    this.direction;
    this.speed = 5;

    this.drawPlane = function () {
        ctx.beginPath();
        ctx.drawImage(plane,_this.planeX,_this.planeY,70,70);
    }

    this.planeMove = function () {
        switch(_this.direction){
            case 0:
                _this.planeY -= _this.speed;
                break;
            case 1:
                _this.planeY += _this.speed;
                break;
            case 2:
                _this.planeX -= _this.speed;
                break;
            case 3:
                _this.planeX += _this.speed;
                break;
        }
    }

    this.isPlaneCollision = function () {
        if(_this.planeY <= 0){
            _this.planeY = 0;
        }
        if(_this.planeY >= cvs.height - 70 ){
            _this.planeY = cvs.height - 70;
        }
        if(_this.planeX <= -70){
            _this.planeX += cvs.width;
        }
        if(_this.planeX >= cvs.width + 30){
            _this.planeX -= cvs.width + 40;
        }
    }
}
//陨石的构造函数
function rock() {
    var _this = this;
    this.rockX = Math.floor(Math.random()* 400 +50);
    this.rockY = 0;
    this.rock2X = Math.random() * 400 + 50;
    this.rock2Y = 0;
    this.rockAngle = Math.random() * 140 + 20;
    this.speed = 3;
    this.dt = 3;
    this.rockappear = false;
    this.rock2appear = false;

    this.drawRock = function () {
        ctx.beginPath();
        // ctx.rect(_this.rockX,_this.rockY,50,50);
        // ctx.fill();
        ctx.drawImage(rockImg,_this.rockX,_this.rockY,50,50);
    }

    this.rockMove = function () {
        _this.rockY += _this.speed;
    }

    this.rockCollision = function () {
        if(_this.rockY >= cvs.height){
            _this.rockappear = true;
        }
    }

    this.drawRock2 = function () {
        ctx.beginPath();
        ctx.drawImage(rock2Img,_this.rock2X,_this.rock2Y,45,45);
    }

    this.rock2Move = function () {
        _this.rock2X += _this.speed * Math.cos(Math.PI / 180 * _this.rockAngle) * _this.dt;
        _this.rock2Y += _this.speed * Math.sin(Math.PI / 180 * _this.rockAngle) * _this.dt;

    }

    this.isCollision = function () {
        if(_this.rock2X <= 0 || _this.rock2X >= cvs.width - 45){
            _this.rockAngle += 90;
        }
    }

    this.rock2Collision = function () {
        if(this.rock2Y >= cvs.height){
            _this.rock2appear = true;
        }
    }
}
//敌人的构造函数
function enemy() {
    var _this = this;
    this.enemyX = Math.floor(Math.random()* 400 +50);
    this.enemyY = 0;
    this.enemyAngle = Math.random() * 140 + 20;
    this.enemyappear = false;
    this.enemyHP = 2;

    this.enemy2X = Math.floor(Math.random()* 400 +50);
    this.enemy2Y = 0;
    this.enemy2appear = false;

    this.CD = 10;
    this.emblt = [];


    this.speed = 5;
    this.dt = 1;
    this.speed2 = 20;

    this.drawEnemy = function () {
        ctx.beginPath();
        ctx.drawImage(enemyImg,_this.enemyX,_this.enemyY,60,60)
    }

    this.enemyMove = function () {
        _this.enemyX += _this.speed * Math.cos(Math.PI / 180 * _this.enemyAngle) * _this.dt;
        _this.enemyY += _this.speed * Math.sin(Math.PI / 180 * _this.enemyAngle) * _this.dt;
    }

    this.enemyCollision = function () {
        if(_this.enemyY >= cvs.height){
            _this.enemyappear = true;
        }
    }

    this.isCollision = function () {
        if(_this.enemyX <= 0 || _this.enemyX >= cvs.width - 45){
            _this.enemyAngle += 90;
        }
    }

    this.drawEnemy2 = function () {
        ctx.beginPath();
        ctx.drawImage(enemy2Img,_this.enemy2X,_this.enemy2Y,60,60);
    }

    this.enemy2Move = function () {
        _this.enemy2Y += _this.speed;
    }

    this.enemy2Collision = function () {
        if(_this.enemy2Y >= cvs.height){
            _this.enemy2appear = true;
        }
    }

    this.createBlt = function () {
        _this.emblt.push(new bullet(_this.enemy2X,_this.enemy2Y))
    }

    this.fire = function () {
        if(_this.emblt.length >= 1){
            _this.emblt.forEach(function (emblt,index) {
                emblt.isEmBulletCollision();
                if(emblt.emappear){
                    _this.emblt.splice(index,1)
                }
                emblt.createEmBullet();
                emblt.bulletEmMove();
            })
        }
    }
}
//boos的生成
function Boss() {
    var _this = this;
    this.bossX = 85;
    this.bossY = -200;
    this.speed = 1;
    this.speed2 = 2;
    this.bossHP = 10;

    this.drawBoss = function () {
        ctx.beginPath();
        ctx.drawImage(boss,_this.bossX,_this.bossY,350,200);
    }

    this.bossMove = function () {
        if(_this.bossY <= 80){
            _this.bossY += _this.speed;
        }
        if(_this.bossY >= 80){
            _this.bossY -= _this.speed2;
        }
    }
}
//子弹的构造函数
function bullet(x,y) {
    var _this = this;
    this.speed = 15;
    this.dt = 1;
    this.bulletX = x + 30;
    this.bulletY = y;
    this.appear = false;

    this.emspeed = 20;
    this.emdt = 1;
    this.embulletX = x + 25;
    this.embulletY = y + 60;
    this.emappear = false;

    this.createBullet = function () {
        ctx.beginPath();
        ctx.drawImage(bullet1,_this.bulletX,_this.bulletY,10,20);
        // ctx.arc(_this.bulletX,_this.bulletY,10,0,2*Math.PI);
        // ctx.stroke();
    }

    this.bulletMove = function () {
        _this.bulletY -= _this.speed * _this.dt;

    }

    this.isBulletCollision = function () {
        if(_this.bulletY <= 0){
            _this.appear = true;
        }
    }

    this.createEmBullet = function () {
        ctx.beginPath();
        ctx.drawImage(enemyBullet,_this.embulletX,_this.embulletY,10,10);
        // ctx.arc(_this.bulletX,_this.bulletY,10,0,2*Math.PI);
        // ctx.stroke();
    }

    this.bulletEmMove = function () {
        _this.embulletY += _this.emspeed * _this.emdt;

    }

    this.isEmBulletCollision = function () {
        if(_this.embulletY <= 0){
            _this.emappear = true;
        }
    }



}
//boss子弹的构造函数
function bossBullet(x,y) {
    var _this = this;

    this.bigBulletX = x;
    this.bigBulletY = y + 200;
    this.bigspeed = 10;
    this.bigappear = false;

    this.drawBigBullet = function () {
        ctx.beginPath();
        ctx.drawImage(enemyBullet,_this.bigBulletX + 70,_this.bigBulletY,15,15);
        ctx.drawImage(enemyBullet,_this.bigBulletX + 270,_this.bigBulletY,15,15);
    }

    this.bigBulletMove = function () {
        _this.bigBulletY += _this.bigspeed;
    }

    this.bigCollision = function () {
        if(_this.bigBulletY >= ctx.height){
            _this.bigappear = true;
        }
    }
}
//随机子弹生成
function randomBullet() {
    var _this = this;
    this.sBulletX = Math.random() * 200 + 100;
    this.sBulletY = Math.random() * 50 + 100;
    this.sangle = Math.random() * 360;
    this.sspeed = 5;
    this.dt = 1;
    this.sappear = false;
    this.collisionNum = 0;

    this.createB = function () {
        ctx.beginPath();
        ctx.drawImage(enemybullet1,_this.sBulletX,_this.sBulletY,10,10);
    }

    this.moveB = function () {
        _this.sBulletX += _this.sspeed * _this.dt * Math.cos(Math.PI / 180 * _this.sangle);
        _this.sBulletY += _this.sspeed * _this.dt * Math.sin(Math.PI / 180 * _this.sangle);
    }

    this.collisionB = function () {
        if(_this.sBulletX <= 0 || _this.sBulletX >= cvs.width || _this.sBulletY <= 0 || _this.sBulletY >= cvs.heightth){
            _this.sangle += 270;
            _this.collisionNum ++;
        }
    }

    this.isappear = function () {
        if(_this.collisionNum >= 5){
            _this.sappear = true;
        }
    }

}
//UI界面的构造函数
function UI() {
    var _this = this;
    this.heartX = 10;
    this.heartY = 10;
    this.heartnum = 5;
    this.score = 0;
    this.level = 1;

    this.drawHeart = function () {
        for(var i = 0;i < _this.heartnum;i++){
            ctx.beginPath();
            ctx.drawImage(heartImg,_this.heartX,_this.heartY,20,20);
            _this.heartX += 25;
        }
    }

    this.scoreNum = function () {
        ctx.beginPath();
        ctx.font = 'bold 28px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('score：'+ _this.score,80,60);
    }

    this.drawBackground = function () {
        ctx.beginPath();
        ctx.drawImage(background,0,0);
    }

    this.drawLevel = function () {
        ctx.beginPath();
        // ctx.font = '20px Arial';
        // ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('第'+ _this.level +'关',260,50);
    }
}
//游戏小道具的生成
function prop() {
    var _this = this;
    this.heartX = Math.floor(Math.random()* 400 +50);
    this.heartY = 0;
    this.speedH = 10;
    this.heartAppear = false;

    this.drawHeart = function () {
        ctx.beginPath();
        ctx.drawImage(heartImg,_this.heartX,_this.heartY,20,20);
    }

    this.heartMove = function () {
        _this.heartY += _this.speedH;
    }

    this.heartCollision = function () {
        if(_this.heartY >= cvs.height + 20){
            _this.heartAppear = true;
        }
    }
}
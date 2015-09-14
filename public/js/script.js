// requestAnimationFrame 的浏览器兼容性处理
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//画布大小为屏幕大小
canvas.width = document.body.scrollWidth;
canvas.height = document.body.scrollHeight;



//图片元素加载
var cat_ready = false;
var cat_img = new Image();
cat_img.onload = function() {
    cat_ready = true;

};
cat_img.src = 'public/img/cat.png';
var ingot_ready = false;
var ingot_img = new Image();
ingot_img.onload = function() {
    ingot_ready = true;
};

ingot_img.src = 'public/img/ingot.png';

//游戏对象
var cat = {
    speed: 512,
    x: canvas.width / 2 - 85,
    y: canvas.height - 230
};
var ingot = {
    speed: 382,
    x: canvas.width / 2 - 65,
    y: 0
};
var score = 0,
    time = 3,
    timer;

//处理用户输入
var key_value = {};
window.addEventListener('keydown', function(e) {
    key_value[e.keyCode] = true;
    console.log(e.keyCode);
}, false);
window.addEventListener('keyup', function(e) {
    delete key_value[e.keyCode];
    console.log(e.keyCode);
}, false);

//接到元宝后重置游戏
var reset = function() {
    ingot.x = 130 + (Math.random() * (canvas.width - 260));
    ingot.y = 0;
};

// 更新对象
var update = function(modifier) {

    if (37 in key_value && cat.x >= 0) { // 用户按的是←
        cat.x -= cat.speed * modifier;
    }
    if (39 in key_value && cat.x <= canvas.width - 170) { // 用户按的是→
        cat.x += cat.speed * modifier;
    }

    if (Math.ceil(time) == 0) {
        clearTimeout(timer);
        alert('ddd');
        // return 0;
    }

    ingot.y += ingot.speed * modifier;

    if (ingot.y >= canvas.height) {
        reset();
    }

    // 英雄与怪物碰到了么？
    if (
        cat.x <= (ingot.x + 130) && ingot.x <= (cat.x + 170) && cat.y <= (ingot.y + 90) && ingot.y <= (cat.y + 230)
    ) {
        ++score;
        reset();
    }
};

//渲染画布
var render = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (cat_ready) {
        ctx.drawImage(cat_img, cat.x, cat.y, 170, 230);
    }
    if (ingot_ready) {
        ctx.drawImage(ingot_img, ingot.x, ingot.y, 130, 90);
    }

    //游戏界面信息
    ctx.font = "bold 65px 微软雅黑";
    ctx.fillText('得分：' + score, 60, 100);
    ctx.fillText('时间：' + Math.ceil(time), 660, 100);
};

//定义主函数
var main = function() {
    var now = Date.now();
    var delta = now - then;
    time -= delta / 1000;

    update(delta / 1000);
    render();
    then = now;
    // 立即调用主函数
    // requestAnimationFrame(main);
    timer = setTimeout(main, 1);

};

if (confirm('开始游戏？')) {
    var then = Date.now();
    reset();
    main();
}
var randomWordnumber = 0;
var word = '';
var currentLevel = 0;
var levelTime = 0;
var lives = 3;

var MenuLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
        currentLevel = 0;
        //call super class's super function
        this._super();
        //music
        cc.audioEngine.playMusic(res.music_mp3, true);
        cc.audioEngine.setMusicVolume(0);
        // cc.audioEngine.setMusicVolume(0.3);

        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        //4. create a background image and set it's position at the center of the screen
        // var spritebg = new cc.Sprite(res.helloBG_png);
        // spritebg.setPosition(centerpos);
        // this.addChild(spritebg);

        //5.
        cc.MenuItemFont.setFontSize(60);

        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.start_n_png), // normal state image
            new cc.Sprite(res.start_s_png), // select state image
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
        menu.setPosition(centerpos);
        this.addChild(menu);
    },

    onPlay : function(){
        cc.log("==onplay clicked");
        cc.audioEngine.playEffect(res.blop_mp3);
        // randomWordnumber = (Math.floor(Math.random() * 21) % 21);
        // randomWord();
        cc.director.runScene(new PlayScene());
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});
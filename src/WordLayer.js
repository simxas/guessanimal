//spejamo gyvuno pavadinimas
var words = ['Bear', 'Beaver', 'Cat', 'Chick', 'Cow', 'Dog', 'Elephant', 'Elk', 'Giraffe', 'Gnu', 'Goat', 'Hippo', 'Kangaroo', 'Monkey', 'Mouse', 'Owl', 'Penguin', 'Pig', 'Sheep', 'Squirrel', 'Zebra'];
var wordLayerThis = {};
var start = true;

var WordLayer = cc.Layer.extend({
    ctor:function () {
        // this._super();
        this._super(cc.color.WHITE);
        this.init();
    },

    init:function () {
        var wordLayerThis = this;
        this._super();
        var play = function() {
            cc.audioEngine.playEffect(res.blop_mp3);
            cc.log("Clicked on a word"); //playSceneThis referina is PlayScene i pati PlayScene
            playSceneThis.addChild(new BackgroundLayer());
            playSceneThis.addChild(new AnimationLayer());
            playSceneThis.removeChild(wordLayerThis); //wordLayerThis referina i pati Wordlayer
        };

        var winsize = cc.director.getWinSize();
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        cc.MenuItemFont.setFontSize(60);

        randomWordnumber = (Math.floor(Math.random() * 21) % 21);
        word = new cc.MenuItemFont(words[randomWordnumber], play);
        var menu = new cc.Menu(word);
        menu.setPosition(centerPos);

        this.addChild(menu);
    }
});

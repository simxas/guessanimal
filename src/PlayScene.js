//tiesiog inicializavimas visu layeriu
var playSceneThis = {};
var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        playSceneThis = this;
        //add three layer in the right order
        // this.addChild(new BackgroundLayer());
        // // this.addChild(new GameOverLayer());
        // this.addChild(new AnimationLayer());
        this.addChild(new WordLayer());
        // this.addChild(new StatusLayer());

    }
});
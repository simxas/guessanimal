//kur visas veiksmas vyksta
var animationLayerThis = {};
var animals = [
    res.bear_png,
    res.beaver_png,
    res.cat_png,
    res.chick_png,
    res.cow_png,
    res.dog_png,
    res.elephant_png,
    res.elk_png,
    res.giraffe_png,
    res.gnu_png,
    res.goat_png,
    res.hippo_png,
    res.kangaroo_png,
    res.monkey_png,
    res.mouse_png,
    res.owl_png,
    res.penguin_png,
    res.pig_png,
    res.sheep_png,
    res.squirrel_png,
    res.zebra_png
];

//randomly place incorrect animal
var wrongAnimalNumber = 0;
//using this to place randomly correct animal
var randomPlaceNumber = 0;
//using this for update method
var correctClicked = 0;
//using this to have a reference to the correct animal
var correctAnimal = {};

var a = 0;

function nextCorrectScene(){
    playSceneThis.addChild(new WordLayer());
    playSceneThis.removeChild(backgroundLayerThis);
    playSceneThis.removeChild(animationLayerThis);
    correctClicked = 0;
}
function nextLostScene(){
    playSceneThis.addChild(new WordLayer());
    playSceneThis.removeChild(backgroundLayerThis);
    playSceneThis.removeChild(animationLayerThis);
    correctClicked = 0;
}

var AnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
        this.scheduleUpdate();
    },

    update: function(dt){
        if(correctClicked == 1){

            var rotateAction = cc.RotateBy(1, 360);
            var scaleAction = cc.ScaleBy(1, 3, 3);
            var fadeAction = cc.FadeTo(1, 0);
            correctAnimal.runAction( cc.sequence( rotateAction, scaleAction, fadeAction, cc.callFunc( nextCorrectScene, this ) ) );            
        }else if(correctClicked == 2){
            nextLostScene();
            // game over dalis
            a = a + 1;
            if(a == 3) {
                playSceneThis.addChild(new GameOverLayer());
                a = 0;
            }
        }
    },

    init:function () {
        this._super();
        animationLayerThis = this;
        var winsize = cc.director.getWinSize();
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

        var place = new cc.Sprite(res.place_png);
        var place2 = new cc.Sprite(res.place_png);
        var place3 = new cc.Sprite(res.place_png);
        var place4 = new cc.Sprite(res.place_png);
        //===================
        // WHOLE TOUCH THING
        //===================
        //Create a "one by one" touch event listener (processes one touch at a time)
        var correctListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function                      
            onTouchBegan: function (touch, event) { 
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.   
                var target = event.getCurrentTarget();  

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {       
                    cc.log("WAS CLICKED ON THE CORRECT ANIMAL");
                    target.opacity = 180;
                    // game over dalis
                    a = a -1;
                    if(a < 0) {
                        a = 0;
                    }
                    //winning sound
                    cc.audioEngine.playEffect(res.win_mp3);

                    correctClicked = 1;
                    // var sprite_action = cc.FadeOut.create(2);
                    // place.runAction(sprite_action);
                    // playSceneThis.addChild(new WordLayer());
                    // playSceneThis.removeChild(backgroundLayerThis);
                    // playSceneThis.removeChild(animationLayerThis);
                    
                    return true;
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {         

            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {         

            }
        });
        //Listener to listen on incorrect Animals
        var incorrectListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) { 
                var target = event.getCurrentTarget();  

                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {       
                    cc.log("INCORRECT ANIMAL TOUCHED");
                    correctClicked = 2;
                    cc.audioEngine.playEffect(res.lost_mp3);
                   
                    return true;
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {         

            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {         
            }
        });

        //================================================
        // DECIDE ON WICH PLACE TO PLACE CORRECT IMAGE :)
        //================================================
        randomPlaceNumber = (Math.floor(Math.random() * 4) % 4);

        switch(randomPlaceNumber) {
            case 0:
                place.initWithFile(animals[randomWordnumber]);
                place.setPosition(winsize.width / 7.7, winsize.height / 2);
                place.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place2.initWithFile(animals[wrongAnimalNumber]);
                place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                place2.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place3.initWithFile(animals[wrongAnimalNumber]);
                place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                place3.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place4.initWithFile(animals[wrongAnimalNumber]);
                place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                place4.setAnchorPoint(cc.p(0.5, 0.5));

                correctAnimal = place;
                cc.eventManager.addListener(correctListener, place);
                cc.eventManager.addListener(incorrectListener, place2);
                cc.eventManager.addListener(incorrectListener.clone(), place3);
                cc.eventManager.addListener(incorrectListener.clone(), place4);
                break;
            case 1:
                place2.initWithFile(animals[randomWordnumber]);
                place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                place2.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place.initWithFile(animals[wrongAnimalNumber]);
                place.setPosition(winsize.width / 7.7, winsize.height / 2);
                place.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place3.initWithFile(animals[wrongAnimalNumber]);
                place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                place3.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place4.initWithFile(animals[wrongAnimalNumber]);
                place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                place4.setAnchorPoint(cc.p(0.5, 0.5));

                correctAnimal = place2;
                cc.eventManager.addListener(correctListener, place2);
                cc.eventManager.addListener(incorrectListener, place);
                cc.eventManager.addListener(incorrectListener.clone(), place3);
                cc.eventManager.addListener(incorrectListener.clone(), place4);
                break;
            case 2:
                place3.initWithFile(animals[randomWordnumber]);
                place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                place3.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place.initWithFile(animals[wrongAnimalNumber]);
                place.setPosition(winsize.width / 7.7, winsize.height / 2);
                place.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place2.initWithFile(animals[wrongAnimalNumber]);
                place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                place2.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place4.initWithFile(animals[wrongAnimalNumber]);
                place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                place4.setAnchorPoint(cc.p(0.5, 0.5));

                correctAnimal = place3;
                cc.eventManager.addListener(correctListener, place3);
                cc.eventManager.addListener(incorrectListener, place);
                cc.eventManager.addListener(incorrectListener.clone(), place2);
                cc.eventManager.addListener(incorrectListener.clone(), place4);
                break;
            case 3:
                place4.initWithFile(animals[randomWordnumber]);
                place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                place4.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place.initWithFile(animals[wrongAnimalNumber]);
                place.setPosition(winsize.width / 7.7, winsize.height / 2);
                place.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place2.initWithFile(animals[wrongAnimalNumber]);
                place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                place2.setAnchorPoint(cc.p(0.5, 0.5));

                wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                if(wrongAnimalNumber == randomWordnumber){
                    wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                }
                place3.initWithFile(animals[wrongAnimalNumber]);
                place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                place3.setAnchorPoint(cc.p(0.5, 0.5));


                correctAnimal = place4;
                cc.eventManager.addListener(correctListener, place4);
                cc.eventManager.addListener(incorrectListener, place);
                cc.eventManager.addListener(incorrectListener.clone(), place2);
                cc.eventManager.addListener(incorrectListener.clone(), place3);
                break;
        }

        //==================
        // DEBUGINIMO DALIS
        //==================
        // var a = (Math.floor(Math.random() * 21) % 21);
        cc.log("Animation layer plus a value: " + a);
        // cc.log("Random randomWordnumber yra: " + randomWordnumber);

        animationLayerThis.addChild(place);
        animationLayerThis.addChild(place2);
        animationLayerThis.addChild(place3);
        animationLayerThis.addChild(place4);

        // this.addChild(new GameOverLayer());
    }
});

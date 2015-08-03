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
// using to decide when to show GameOverLayer
var gameover = 0;
//using to increese difficulty
var dif = 0;

function nextCorrectScene(){
    playSceneThis.addChild(new WordLayer());
    playSceneThis.removeChild(backgroundLayerThis);
    playSceneThis.removeChild(animationLayerThis);
    dif = dif + 1;
    correctClicked = 0;
}
function nextLostScene(){
    playSceneThis.addChild(new WordLayer());
    playSceneThis.removeChild(backgroundLayerThis);
    playSceneThis.removeChild(animationLayerThis);
    gameover = gameover + 1;
    // game over dalis
    if(gameover == 3) {
        playSceneThis.addChild(new GameOverLayer());
        gameover = 0;
    }
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
            //Making game more difficult
            if(dif == 5) {
                currentLevel = 1;
            }else if(dif == 10) {
                currentLevel = 2;
            }

            var rotateAction = cc.RotateBy(1, 360);
            var scaleAction = cc.ScaleBy(1, 3, 3);
            var fadeAction = cc.FadeTo(1, 0);
            correctAnimal.runAction( cc.sequence( rotateAction, scaleAction, fadeAction, cc.callFunc( nextCorrectScene, this ) ) );            
        }else if(correctClicked == 2){
            // nextLostScene();
        }
    },

    init:function () {
        this._super();
        animationLayerThis = this;
        var winsize = cc.director.getWinSize();
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
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
                    //make sure that only one correct click works
                    if(correctClicked != 2) {
                        cc.log("WAS CLICKED ON THE CORRECT ANIMAL");
                        cc.log("dif YRA: " + dif);

                        target.opacity = 180;
                        // game over dalis
                        gameover = gameover -1;
                        if(gameover < 0) {
                            gameover = 0;
                        }
                        //winning sound playing just once.
                        if(correctClicked == 0) {
                            cc.audioEngine.playEffect(res.win_mp3);
                        }
                        correctClicked = 1;

                        return true;
                    }    

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
                    //make sure that only one incorrect click works
                    if(correctClicked != 1 && correctClicked != 2) {
                        cc.log("INCORRECT ANIMAL TOUCHED");
                        cc.log("GAMEOVER IS: "+ gameover);
                        correctClicked = 2;
                        cc.audioEngine.playEffect(res.lost_mp3);

                        //animation for incorrect animal
                        var jumpAction = cc.JumpTo(0.8, cc.p(1000, 200), 50, 4);
                        target.runAction( cc.sequence( jumpAction, cc.callFunc( nextLostScene, this ) ) );

                        return true;
                    }     
                    
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

        //====================
        //LEVEL ONE DIFFICULTY
        //====================
        var place = new cc.Sprite(res.place_png);
        var place2 = new cc.Sprite(res.place_png);
        var place3 = new cc.Sprite(res.place_png);
        var place4 = new cc.Sprite(res.place_png);
        //====================
        //LEVEL TWO DIFFICULTY
        //====================
        var place5 = new cc.Sprite(res.place_png);
        var place6 = new cc.Sprite(res.place_png);
        var place7 = new cc.Sprite(res.place_png);
        var place8 = new cc.Sprite(res.place_png);
        //======================
        //LEVEL THREE DIFFICULTY
        //======================
        var place9 = new cc.Sprite(res.place_png);
        var place10 = new cc.Sprite(res.place_png);
        var place11 = new cc.Sprite(res.place_png);
        var place12 = new cc.Sprite(res.place_png);

        switch(currentLevel) {
            //deciding which dificulty level
            //===========================================================================
            //LEVEL ONE DIFFICULTY
            //===========================================================================
            case 0:
                randomPlaceNumber = (Math.floor(Math.random() * 4) % 4);
                cc.log("Esamas sudetingumo lygis yra: " + currentLevel);
                cc.log("SWITCH CASE NUMBER IS: "+randomPlaceNumber);

                switch(randomPlaceNumber) {
                    // deciding on which place will be a correct animal and wrong animals
                    case 0:
                        place.initWithFile(animals[randomWordnumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
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

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
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

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
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

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));


                        correctAnimal = place4;
                        cc.eventManager.addListener(correctListener, place4);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        break;
                    //fifth place
                    
                }//end of switch on which place to place correct and wrong animals
                animationLayerThis.addChild(place);
                animationLayerThis.addChild(place2);
                animationLayerThis.addChild(place3);
                animationLayerThis.addChild(place4);
                break;//end of first level
            //===========================================================================
            //LEVEL TWO DIFFICULTY
            //===========================================================================
            case 1:
                cc.log("Esamas sudetingumo lygis yra: " + currentLevel);
                randomPlaceNumber = (Math.floor(Math.random() * 8) % 8);
                cc.log("SWITCH CASE NUMBER IS: "+randomPlaceNumber);

                switch(randomPlaceNumber) {
                    // deciding on which place will be a correct animal and wrong animals
                    case 0:
                        place.initWithFile(animals[randomWordnumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place;
                        cc.eventManager.addListener(correctListener, place);
                        cc.eventManager.addListener(incorrectListener, place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        break;
                    case 1:
                        place2.initWithFile(animals[randomWordnumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place2;
                        cc.eventManager.addListener(correctListener, place2);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        break;
                    case 2:
                        place3.initWithFile(animals[randomWordnumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place3;
                        cc.eventManager.addListener(correctListener, place3);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        break;
                    case 3:
                        place4.initWithFile(animals[randomWordnumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place4;
                        cc.eventManager.addListener(correctListener, place4);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        break;
                    //5 place is for correct animal
                    case 4:
                        place5.initWithFile(animals[randomWordnumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place5;
                        cc.eventManager.addListener(correctListener, place5);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        break;
                    //6 place is for correct animal
                    case 5:
                        place6.initWithFile(animals[randomWordnumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place6;
                        cc.eventManager.addListener(correctListener, place6);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        break;
                    //7 place is for correct animal
                    case 6:
                        place7.initWithFile(animals[randomWordnumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place7;
                        cc.eventManager.addListener(correctListener, place7);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        break;
                    //8 place is for correct animal
                    case 7:
                        place8.initWithFile(animals[randomWordnumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place8;
                        cc.eventManager.addListener(correctListener, place8);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        break;
                }//end of switch on which place to place correct and wrong animals
                animationLayerThis.addChild(place);
                animationLayerThis.addChild(place2);
                animationLayerThis.addChild(place3);
                animationLayerThis.addChild(place4);
                animationLayerThis.addChild(place5);
                animationLayerThis.addChild(place6);
                animationLayerThis.addChild(place7);
                animationLayerThis.addChild(place8);
                break;//end of second difficulty level
            //=============================================================================
            //LEVEL THREE DIFFICULTY
            //=============================================================================
            case 2:
                cc.log("Esamas sudetingumo lygis yra: " + currentLevel);
                randomPlaceNumber = (Math.floor(Math.random() * 12) % 12);
                cc.log("SWITCH CASE NUMBER IS: "+randomPlaceNumber);
                switch(randomPlaceNumber) {
                    // deciding on which place will be a correct animal and wrong animals
                    case 0:
                        place.initWithFile(animals[randomWordnumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place;
                        cc.eventManager.addListener(correctListener, place);
                        cc.eventManager.addListener(incorrectListener, place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    case 1:
                        place2.initWithFile(animals[randomWordnumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place2;
                        cc.eventManager.addListener(correctListener, place2);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    case 2:
                        place3.initWithFile(animals[randomWordnumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place3;
                        cc.eventManager.addListener(correctListener, place3);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    case 3:
                        place4.initWithFile(animals[randomWordnumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place4;
                        cc.eventManager.addListener(correctListener, place4);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    //5 place is for correct animal
                    case 4:
                        place5.initWithFile(animals[randomWordnumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place5;
                        cc.eventManager.addListener(correctListener, place5);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    //6 place is for correct animal
                    case 5:
                        place6.initWithFile(animals[randomWordnumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place6;
                        cc.eventManager.addListener(correctListener, place6);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    //7 place is for correct animal
                    case 6:
                        place7.initWithFile(animals[randomWordnumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place7;
                        cc.eventManager.addListener(correctListener, place7);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    //8 place is for correct animal
                    case 7:
                        place8.initWithFile(animals[randomWordnumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place8;
                        cc.eventManager.addListener(correctListener, place8);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    //9 place is for correct animal
                    case 8:
                        place9.initWithFile(animals[randomWordnumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place9;
                        cc.eventManager.addListener(correctListener, place9);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    //10 place is for correct animal
                    case 9:
                        place10.initWithFile(animals[randomWordnumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place10;
                        cc.eventManager.addListener(correctListener, place10);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    //11 place is for correct animal
                    case 10:
                        place11.initWithFile(animals[randomWordnumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place12.initWithFile(animals[wrongAnimalNumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place11;
                        cc.eventManager.addListener(correctListener, place11);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place12);
                        break;
                    //12 place is for correct animal
                    case 11:
                        place12.initWithFile(animals[randomWordnumber]);
                        place12.setPosition(winsize.width / 1.15, winsize.height / 5.5);
                        place12.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place.initWithFile(animals[wrongAnimalNumber]);
                        place.setPosition(winsize.width / 7.7, winsize.height / 2);
                        place.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place2.initWithFile(animals[wrongAnimalNumber]);
                        place2.setPosition(winsize.width / 2.65, winsize.height / 2);
                        place2.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place3.initWithFile(animals[wrongAnimalNumber]);
                        place3.setPosition(winsize.width / 1.60, winsize.height / 2);
                        place3.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place4.initWithFile(animals[wrongAnimalNumber]);
                        place4.setPosition(winsize.width / 1.15, winsize.height / 2);
                        place4.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place5.initWithFile(animals[wrongAnimalNumber]);
                        place5.setPosition(winsize.width / 7.7, winsize.height / 1.25);
                        place5.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place6.initWithFile(animals[wrongAnimalNumber]);
                        place6.setPosition(winsize.width / 2.65, winsize.height / 1.25);
                        place6.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place7.initWithFile(animals[wrongAnimalNumber]);
                        place7.setPosition(winsize.width / 1.60, winsize.height / 1.25);
                        place7.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place8.initWithFile(animals[wrongAnimalNumber]);
                        place8.setPosition(winsize.width / 1.15, winsize.height / 1.25);
                        place8.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place9.initWithFile(animals[wrongAnimalNumber]);
                        place9.setPosition(winsize.width / 7.7, winsize.height / 5.5);
                        place9.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place10.initWithFile(animals[wrongAnimalNumber]);
                        place10.setPosition(winsize.width / 2.65, winsize.height / 5.5);
                        place10.setAnchorPoint(cc.p(0.5, 0.5));

                        do {
                            wrongAnimalNumber = (Math.floor(Math.random() * 21) % 21);
                        } while(wrongAnimalNumber === randomWordnumber);
                        place11.initWithFile(animals[wrongAnimalNumber]);
                        place11.setPosition(winsize.width / 1.60, winsize.height / 5.5);
                        place11.setAnchorPoint(cc.p(0.5, 0.5));

                        correctAnimal = place12;
                        cc.eventManager.addListener(correctListener, place12);
                        cc.eventManager.addListener(incorrectListener, place);
                        cc.eventManager.addListener(incorrectListener.clone(), place2);
                        cc.eventManager.addListener(incorrectListener.clone(), place3);
                        cc.eventManager.addListener(incorrectListener.clone(), place4);
                        cc.eventManager.addListener(incorrectListener.clone(), place5);
                        cc.eventManager.addListener(incorrectListener.clone(), place6);
                        cc.eventManager.addListener(incorrectListener.clone(), place7);
                        cc.eventManager.addListener(incorrectListener.clone(), place8);
                        cc.eventManager.addListener(incorrectListener.clone(), place9);
                        cc.eventManager.addListener(incorrectListener.clone(), place10);
                        cc.eventManager.addListener(incorrectListener.clone(), place11);
                        break;
                }//end of switch on which place to place correct and wrong animals
                animationLayerThis.addChild(place);
                animationLayerThis.addChild(place2);
                animationLayerThis.addChild(place3);
                animationLayerThis.addChild(place4);
                animationLayerThis.addChild(place5);
                animationLayerThis.addChild(place6);
                animationLayerThis.addChild(place7);
                animationLayerThis.addChild(place8);
                animationLayerThis.addChild(place9);
                animationLayerThis.addChild(place10);
                animationLayerThis.addChild(place11);
                animationLayerThis.addChild(place12);
                break;

        }//end of MAIN switch to decide which difficulty level will be used
    }
});

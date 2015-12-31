/**
 * Created by Phil on 2015-02-01.
 */
$(function() {

    var ctx;
    var imgBg;
    var imgDrops;
    var x = 0;
    var y = 0;
    var noOfDrops = 10;
    var fallingDrops = [];
    var canvas = document.getElementById('canvasGoutte');

    /*function drawBackground(){
        ctx.drawImage(imgBg, 0, 0); //Background
    }*/

    function draw() {
        //drawBackground();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i=0; i< noOfDrops; i++)
        {
            ctx.drawImage (fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); //The rain drop

            fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed
            if (fallingDrops[i].y > 200) {  //Repeat the raindrop when it falls out of view
                fallingDrops[i].y = -25 //Account for the image size
                fallingDrops[i].x = Math.random() * 100;    //Make it appear randomly along the width
            }

        }
    }

    function setup() {


        if (canvas.getContext) {
            ctx = canvas.getContext('2d');

            setInterval(draw, 36);
            for (var i = 0; i < noOfDrops; i++) {
                var fallingDr = new Object();
                var rnd = Math.random();
                fallingDr["image"] =  new Image();
                if (rnd <= 0.14) {
                    fallingDr.image.src = 'GOUTTES-DENIS/Goutte-violet.png';
                } else if ((rnd > 0.14) && (rnd <= 0.28)){
                    fallingDr.image.src = 'GOUTTES-DENIS/Goutte-verte.png';
                } else if ((rnd > 0.28) && (rnd <= 0.42)){
                    fallingDr.image.src = 'GOUTTES-DENIS/Goutte-rose.png';
                } else if ((rnd > 0.42) && (rnd <= 0.56)){
                    fallingDr.image.src = 'GOUTTES-DENIS/Goutte-jaune.png';
                } else if ((rnd > 0.56) && (rnd <= 0.70)){
                    fallingDr.image.src = 'GOUTTES-DENIS/Goutte-bleu pale.png';
                } else if ((rnd > 0.70) && (rnd <= 0.85)){
                    fallingDr.image.src = 'GOUTTES-DENIS/Goutte-bleu moyen.png';
                } else{
                    fallingDr.image.src = 'GOUTTES-DENIS/Goutte-bleu fonce.png';
                }
                //fallingDr.image.src = 'http://lorempixel.com/10/10/sports/';
                console.log(fallingDr.image);
                fallingDr["x"] = Math.random() * 100;
                fallingDr["y"] = Math.random() * 5;
                fallingDr["speed"] = 2 + Math.random();
                fallingDrops.push(fallingDr);
            }

        }
    }

    setup();

   /* // get a refrence to the canvas and its context
    var canvas = document.getElementById("canvasGoutte");
    var ctx = canvas.getContext("2d");

    // newly spawned objects start at Y=25
    var spawnLineY = 25;

    // spawn a new object every 1500ms
    var spawnRate = 1500;

    // set how fast the objects will fall
    var spawnRateOfDescent = 0.50;

    // when was the last object spawned
    var lastSpawn = -1;

    // this array holds all spawned object
    var objects = [];

    // save the starting time (used to calc elapsed time)
    var startTime = Date.now();

    // start animating
    animate();


    function spawnRandomObject() {

        // select a random type for this new object
        //var t;
        var fallingDr = new Object();
        fallingDr["image"] =  new Image();
        // About Math.random()
        // Math.random() generates a semi-random number
        // between 0-1. So to randomly decide if the next object
        // will be A or B, we say if the random# is 0-.49 we
        // create A and if the random# is .50-1.00 we create B

        if (Math.random() <= 0.14) {
            fallingDr.image.src = 'GOUTTES-DENIS/Goutte-violet.png';
        } else if ((Math.random() > 0.14) && (Math.random() <= 0.28)){
            fallingDr.image.src = 'GOUTTES-DENIS/Goutte-verte.png';
        } else if ((Math.random() > 0.28) && (Math.random() <= 0.42)){
            fallingDr.image.src = 'GOUTTES-DENIS/Goutte-rose.png';
        } else if ((Math.random() > 0.42) && (Math.random() <= 0.56)){
            fallingDr.image.src = 'GOUTTES-DENIS/Goutte-jaune.png';
        } else if ((Math.random() > 0.56) && (Math.random() <= 0.70)){
            fallingDr.image.src = 'GOUTTES-DENIS/Goutte-bleu pale.png';
        } else if ((Math.random() > 0.70) && (Math.random() <= 0.85)){
            fallingDr.image.src = 'GOUTTES-DENIS/Goutte-bleu moyen.png';
        } else{
            fallingDr.image.src = 'GOUTTES-DENIS/Goutte-bleu fonce.png';
        }

        // create the new object
        var object = {
            // set this objects type
            type: t,
            // set x randomly but at least 15px off the canvas edges
            x: Math.random() * (canvas.width - 30) + 15,
            // set y to start on the line where objects are spawned
            y: spawnLineY
        }

        // add the new object to the objects[] array
        objects.push(object);
    }


    function animate() {

        // get the elapsed time
        var time = Date.now();

        // see if its time to spawn a new object
        if (time > (lastSpawn + spawnRate)) {
            lastSpawn = time;
            spawnRandomObject();
        }

        // request another animation frame
        requestAnimationFrame(animate);

        // clear the canvas so all objects can be
        // redrawn in new positions
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw the line where new objects are spawned
        //ctx.beginPath();
        //ctx.moveTo(0, spawnLineY);
        //ctx.lineTo(canvas.width, spawnLineY);
        //ctx.stroke();

        // move each object down the canvas
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            object.y += spawnRateOfDescent;
            ctx.beginPath();
            ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = object.type;
            ctx.fill();
        }

    }*/
});
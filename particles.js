const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

window.addEventListener('resize',updateSize);

const offset = 0;

let width = window.innerWidth - offset;
let height = window.innerHeight - offset;

let backgroundColor = '#FFFFFF';
let particleColor = '#BCBCBC';

let range = 75;
let numOfParticles = 75;
let speedInput = 4;
let speed = 4;

function updateSize(shift) {
    width = window.innerWidth - shift;
    height = window.innerHeight - shift;
    canvas.width = width;
    canvas.height = height;
}

// function updateFromInputs() {
//     //backgroundColor = document.getElementById("backgroundColor").value;
//     document.querySelector("canvas").style.background = backgroundColor;
//     //particleColor = document.getElementById("particleColor").value;
//
//     //range = document.getElementById("range").value;
//
//     //numOfParticles = document.getElementById("numberOfParticles").value;
//     if(numOfParticles<0){
//         numOfParticles=0;
//         document.getElementById("numberOfParticles").value = 0;
//     }
//
//     speedInput = document.getElementById("speed").value;
//     if(speedInput<0){
//         speedInput*=-1
//     }
//
// }

function drawParticle(x,y){
    const radius = 2.5;
    //var color = "#F5F5F5";
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.fillStyle = particleColor;
    ctx.strokeStyle = particleColor;
    ctx.fill();
    ctx.stroke();
}

function drawConnector(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = particleColor;
    ctx.stroke();
}

let particles = [];

function createParticles(amount) {
    for (let j = 0; j < amount; j++){
        let x = Math.floor(Math.random()*width);
        let y = Math.floor(Math.random()*height);
        let xv = Math.floor(Math.random()*speed - speed/2);
        if(xv===0){
            xv+=1;
        }
        let yv = Math.floor(Math.random()*speed - speed/2);
        if(yv===0){
            yv+=1;
        }
        particles.push([x,y,xv,yv]);
    }
}

function updateParticlePos() {
    for(let j = 0; j < particles.length;j++){
        let [x,y,xv,yv]=particles[j];
        x+=xv;
        y+=yv;
        if(x<0){
            x=0;
            xv *= -1;
        }
        else if(x>=width){
            x=width;
            xv*= -1;
        }
        if(y<0){
            y=0;
            yv *= -1;
        }
        else if (y>=height){
            y= height;
            yv*=-1;
        }
        particles[j] = [x,y,xv,yv];
    }
}

function drawParticles(){
    for(let j = 0; j < particles.length;j++){
        let cord = particles[j];
        drawParticle(cord[0],cord[1]);
    }
}

function drawConnectedParticles(){
    for(let i = 0; i < particles.length;i++){
        let cordA = particles[i];
        for(let j = i+1; j < particles.length;j++){
            let cordB = particles[j];
            let x = Math.abs(cordA[0] - cordB[0]);
            let y = Math.abs(cordA[1] - cordB[1]);
            let tempMag = Math.sqrt(x * x + y * y);
            if(tempMag<=range){
                drawConnector(cordA[0],cordA[1],cordB[0],cordB[1]);
            }
        }
    }
}

function update(){
    updateSize(offset);
    //updateFromInputs();

    if(numOfParticles>particles.length){
        let diff = numOfParticles-particles.length;
        createParticles(diff);
    }
    else if(numOfParticles<particles.length){
        particles = particles.slice(0,numOfParticles);
    }
    if(speed !== speedInput){
        speed = speedInput;
        particles = [];
        createParticles(particles.length);
    }
    drawParticles();
    updateParticlePos();
    drawConnectedParticles();
    window.requestAnimationFrame(update);
}


function init() {
    document.querySelector("canvas").style.background = backgroundColor;
    createParticles(numOfParticles);
    console.log(particles);
    update();
}

init();
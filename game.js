const screens={
start:document.getElementById('startScreen'),
how:document.getElementById('howScreen'),
game:document.getElementById('gameScreen'),
end:document.getElementById('endScreen')
};

const city=document.getElementById('city');
const scoreEl=document.getElementById('score');
const timeEl=document.getElementById('time');
const finalScoreEl=document.getElementById('finalScore');
const messageEl=document.getElementById('message');

let score=0;
let timeLeft=60;
let gameTimer=null;
let spawnTimer=null;

const types=[
['🗑️',10,'Trash Cleaned!'],
['🎭',15,'Trouble Washed!'],
['💸',20,'Dirty Money Cleaned!'],
['🚨',25,'Corruption Exposed!'],
['🫧',30,'Soap Bonus!']
];

function show(n){
Object.values(screens).forEach(s=>s.classList.remove('active'));
screens[n].classList.add('active');
}

function msg(t){
messageEl.textContent=t;
setTimeout(()=>messageEl.textContent='',700);
}

function clearTargets(){
document.querySelectorAll('.target').forEach(t=>t.remove());
}

function spawn(){

const [icon,points,label]=types[
Math.floor(Math.random()*types.length)
];

const el=document.createElement('div');

el.className='target';

el.textContent=icon;

el.style.position='absolute';

const rect=city.getBoundingClientRect();

const maxX=rect.width-70;
const maxY=rect.height-120;

const x=Math.random()*maxX;
const y=Math.random()*maxY;

el.style.left=x+'px';
el.style.top=y+'px';

el.onclick=function(){

score+=points;

scoreEl.textContent=score;

msg(label);

el.remove();

};

city.appendChild(el);

setTimeout(()=>{
if(el.isConnected){
el.remove();
}
},2500);

}

function start(){

score=0;

timeLeft=60;

scoreEl.textContent=score;

timeEl.textContent=timeLeft;

clearTargets();

show('game');

gameTimer=setInterval(()=>{

timeLeft--;

timeEl.textContent=timeLeft;

if(timeLeft<=0){

end();

}

},1000);

/* slower spawn */
spawnTimer=setInterval(spawn,1200);

}

function end(){

clearInterval(gameTimer);

clearInterval(spawnTimer);

clearTargets();

finalScoreEl.textContent=score;

show('end');

}

document.getElementById('startBtn').onclick=start;

document.getElementById('playAgainBtn').onclick=start;

document.getElementById('homeBtn').onclick=()=>show('start');

document.getElementById('howBtn').onclick=()=>show('how');

document.getElementById('backBtn').onclick=()=>show('start');

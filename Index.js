let activeplayer=0,current,gameactive=true;
let scores=[0,0];
let initial=[0,0];
let repeat = true;
var compmode;
var p=0;
function randomNo()
{
    if(gameactive)
    {
        let dice=Math.floor(Math.random()*6)+1;
        initial[0]=initial[1];
        initial[1]=dice;
        document.getElementById("dice-score").src="./src/images/dice-"+dice+".png";
        document.getElementById("dice-score").style.visibility="visible";
        current=document.getElementById("current-"+activeplayer);
        current.innerHTML=(dice!==1)?Number(dice)+Number(current.innerHTML):0;
        if(dice==1 || (initial[0]==6 && initial[1]==6))
        {
            current.innerHTML="0";
            changePlayer();
        }
        document.getElementById("hold").addEventListener("click",update);
        document.getElementById("dice-roll-sound").play();
    }
}
function initializeP()
{
    if(repeat == true)
    {
        p = Math.floor(Math.random()*6)+1;
    }
}
function randomNoComp()
{
    if(gameactive)
    {
        let dice=Math.floor(Math.random()*6)+1;
        initial[0]=initial[1];
        initial[1]=dice;
        document.getElementById("dice-score").src="./src/images/dice-"+dice+".png";
        document.getElementById("dice-score").style.visibility="visible";
        current=document.getElementById("current-"+activeplayer);
        current.innerHTML=(dice!==1)?Number(dice)+Number(current.innerHTML):0;
        if(dice==1 || (initial[0]==6 && initial[1]==6))
        {
            current.innerHTML="0";
            changePlayer();
        }
        else if(p==1)
        {
            setTimeout(update,3000);
        }
        p--;
        document.getElementById("dice-roll-sound").play();
        repeat =false;
    }
}
function update()
{
    if(gameactive)
    {
        scores[activeplayer]=Number(current.innerHTML)+Number(scores[activeplayer]);
        document.getElementById("global-"+activeplayer).innerHTML=scores[activeplayer];
        current.innerHTML="0";
        if(scores[activeplayer]>100)
        {
            document.getElementById("player-"+activeplayer).innerHTML="Winner";
            gameactive=false;
        }
        changePlayer();
    }
}
function changeShade()
{
    if(activeplayer==0)
    {
        document.getElementById("child-id").style.background="linear-gradient(to right, #e2d9dc 50%, white 50%)";
    }
    else
    {
        document.getElementById("child-id").style.background="linear-gradient(to left, #e2d9dc 50%, white 50%)";
    }
}
setInterval(function()
{
    if(activeplayer == 1 && compmode == true)
    {
        initializeP();
        randomNoComp();
    }
} ,2000);
function changePlayer()
{
    activeplayer=(activeplayer==0)?1:0;
    changeShade();
    initial[0]=0;
    initial[1]=0;
    repeat=true;
    if(activeplayer == 1 && compmode == true)
    {
        document.getElementById("roll-dice").style.visibility = "hidden";
        document.getElementById("hold").style.visibility = "hidden";
    }
    if(activeplayer == 0)
    {
        document.getElementById("roll-dice").style.visibility = "visible";
        document.getElementById("hold").style.visibility = "visible";
    }
}
document.getElementById("roll-dice").addEventListener("click",randomNo);

// form elements manipulation
document.getElementById("submit-data").addEventListener("click",initialPlayers);
function initialPlayers()
{
    document.getElementById("dice-score").style.visibility="hidden";
    compmode = document.getElementById("computer").checked;
    var playermode = document.getElementById("player-mode").checked;
    let input1=document.getElementById("input-0").value;
    let input2=document.getElementById("input-1").value;
    if(playermode == true)
    {
        document.querySelector(".fill-player-names").style.display="none";
    }
    if(input1)
    {
        document.getElementById("player-0").innerHTML=input1+".";
    }
    if(input2)
    {
        document.getElementById("player-1").innerHTML=input2+".";
    }
    if(compmode == true)
    {
        document.getElementById("player-1").innerHTML="Computer";
    }
    document.getElementById("forms").style.display="none";
}
//refresing on new game
document.querySelector(".new-game-button").addEventListener("click",function()
{
    document.location.reload(true);
});
//games rules
document.querySelector(".rules-button").addEventListener("click",function()
{
    document.querySelector(".games-rules").classList="rules-games-fixed";
});
document.querySelector(".games-rules-close-button").addEventListener("click",function()
{
    document.querySelector(".rules-games-fixed").classList="games-rules";
});

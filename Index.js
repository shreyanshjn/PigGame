let activeplayer=0,current,gameactive=true;
let scores=[0,0];
document.getElementById('dice-score').style.visibility="hidden";
function randomNo()
{
    if(gameactive)
    {
        let dice=Math.floor(Math.random()*6)+1;
        document.getElementById("dice-score").src="./src/images/dice-"+dice+".png";
        document.getElementById('dice-score').style.visibility="visible";
        current=document.getElementById("current-"+activeplayer);
        current.innerHTML=(dice!==1)?Number(dice)+Number(current.innerHTML):0;
        if(dice==1)
        {
            current.innerHTML="0";
            activeplayer=(activeplayer==0)?1:0;
            changeShade();
        }
        document.getElementById("hold").addEventListener('click',update);
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
        activeplayer=(activeplayer==0)?1:0;
        changeShade();
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
document.getElementById("roll-dice").addEventListener('click',randomNo);

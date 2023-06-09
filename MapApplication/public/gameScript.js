function getRandomColor(max) {
    let t=Math.floor(Math.random() * max);
    switch(t)
    {
        case 0:
            return "zolty"
        case 1:
            return "zielony"
        case 2:
            return "czerwony"
        case 3:
            return "niebieski"
    }
    return 'niewiedm'
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let btnColorOnClick='rgb(194, 194, 214)'
let list=[]
let licznikKlikniec=0
let licznikTur=2
let ruchyGracza=[]
let currentColors=2
let czyJestWyswietlane=false

var snd1 = new Audio("sounds/btn1.mp3");
var snd2 = new Audio("sounds/btn2.mp3"); // buffers automatically when created
var snd3 = new Audio("sounds/btn3.mp3"); // buffers automatically when created
var snd4 = new Audio("sounds/btn4.mp3"); // buffers automatically when created
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  

function updateCounter() {
    counter.textContent = 'Punkty: ' + punktyGracza;
  }

document.getElementById("zolty").addEventListener("click",  function buttonHandler(){
    if(czyJestWyswietlane) return false
    snd1.pause()
    snd1.currentTime = 0.1;
    snd1.play();
    ruchyGracza.push("zolty");
    licznikKlikniec++;
    let tempColor=window.getComputedStyle(document.getElementById("zolty")).backgroundColor
    document.getElementById("zolty").style.backgroundColor=btnColorOnClick;
    delay(200).then(() => document.getElementById("zolty").style.backgroundColor=tempColor);
   }
    ,false)

document.getElementById("zielony").addEventListener("click",  function buttonHandler(){
    if(czyJestWyswietlane) return false
    snd2.pause()
    snd2.currentTime = 0.1;
    snd2.play();
    ruchyGracza.push("zielony");
    licznikKlikniec++;
    let tempColor=window.getComputedStyle(document.getElementById("zielony")).backgroundColor
    document.getElementById("zielony").style.backgroundColor=btnColorOnClick;
    delay(200).then(() => document.getElementById("zielony").style.backgroundColor=tempColor);
   },false)
document.getElementById("czerwony").addEventListener("click",  function buttonHandler(){
    if(czyJestWyswietlane) return false
    snd3.pause()
    snd3.currentTime = 0.1;
    snd3.play();
    ruchyGracza.push("czerwony");
    licznikKlikniec++;
    let tempColor=window.getComputedStyle(document.getElementById("czerwony")).backgroundColor
    document.getElementById("czerwony").style.backgroundColor=btnColorOnClick;
    delay(200).then(() => document.getElementById("czerwony").style.backgroundColor=tempColor);
   },false)
document.getElementById("niebieski").addEventListener("click",  function buttonHandler(){
    if(czyJestWyswietlane) return false
    snd4.pause()
    snd4.currentTime = 0.1;
    snd4.play();
    ruchyGracza.push("niebieski");
    licznikKlikniec++;
    let tempColor=window.getComputedStyle(document.getElementById("niebieski")).backgroundColor
    document.getElementById("niebieski").style.backgroundColor=btnColorOnClick;
    delay(200).then(() => document.getElementById("niebieski").style.backgroundColor=tempColor);

   },false)





function addColorToList()
{
    list.push(getRandomColor(4))
}

function generateList()
{
    for(let i=0;i<licznikTur;i++)
    {
        addColorToList()
    }
}

function validate()
{
    for(let i=0;i<licznikKlikniec;i++)
    {
        if(list[i] != ruchyGracza[i])
        {
            return false
        }
    }
    return true
}

async function podswietl()
{
    await sleep(500)
    for(let i =0; i<licznikTur;i++)
    {
        let tmpbckgColor=document.getElementById(list[i]).style.backgroundColor;
        let tempColor=document.getElementById(list[i]).style.color;
        document.getElementById(list[i]).style.backgroundColor = "black";
        document.getElementById(list[i]).style.color = "white";
        switch(list[i])
        {
            case "zolty":
                snd1.play()
                break 
            case "zielony":
                snd2.play()
                break 
            case "czerwony":
                snd3.play()
                break 
            case "niebieski":
                snd4.play()
                break 
        }
        await sleep(1000)
        document.getElementById(list[i]).style.backgroundColor=tmpbckgColor
        document.getElementById(list[i]).style.color=tempColor
        if(i<licznikTur-1)
        {
            await sleep(500)

        }
    }

}

function empty()
{
    return true
}

function disableButtons()
{

   czyJestWyswietlane=true
}

function enableButtons()
{
    czyJestWyswietlane=false
   
}

async function czekajNaLicznik()
{
    while(licznikKlikniec<licznikTur)
    {
        await sleep(10)
        
    } return true
  

}

generateList()
licznikKlikniec=0
ruchyGracza=[]
var punktyGracza=0
async function mainLoop()
{
    licznikKlikniec=0
    ruchyGracza=[]
    while(true)
    {
       
        disableButtons()
        await podswietl()
        enableButtons()
            if(await czekajNaLicznik()==true){
            console.log("sprawdzam....")
            if(validate()==false)
            {
                console.log("przegranko")
                licznikTur=2
                licznikKlikniec=0
                punktyGracza=0
                ruchyGracza=[]
                list=[]
                generateList()
                document.getElementById("btnStartImage").src='images/start.png'
                updateCounter()
                break

            }else
            {
                
                console.log("wgranko")
                punktyGracza=licznikTur-1
                licznikTur++
                addColorToList()
                updateCounter()
            }
        }
            licznikKlikniec=0
            ruchyGracza=[]
    }
    
    
}

var started=false

document.getElementById("start").addEventListener("click",  ()=>
{
    if(started==false)
    {
        mainLoop();
        document.getElementById("btnStartImage").src='images/restart.png'
        started=true
    }else
    {
        window.location.reload();
    }

},false)


function closeInfo(){
    document.getElementById("info-container").hidden=true
    document.getElementById("blur").hidden=true
}

function showInfo()
{
    document.getElementById("info-container").hidden=false
    document.getElementById("blur").hidden=false
}
  
 
function redirectToMap(){
    window.location.href = '/';
}



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

let list=[]
let licznikKlikniec=0
let licznikTur=2
let ruchyGracza=[]
let currentColors=2
let czyJestWyswietlane=false

var snd1 = new Audio("btn1.mp3");
var snd2 = new Audio("btn2.mp3"); // buffers automatically when created
var snd3 = new Audio("btn3.mp3"); // buffers automatically when created
var snd4 = new Audio("btn4.mp3"); // buffers automatically when created


function updateCounter() {
    counter.textContent = 'Points: ' + licznikKlikniec;
  }

document.getElementById("zolty").addEventListener("click",  function buttonHandler(){
    if(czyJestWyswietlane) return false
    snd1.pause()
    snd1.currentTime = 0.1;
    snd1.play();
    ruchyGracza.push("zolty");
    licznikKlikniec++;
   }
    ,false)

document.getElementById("zielony").addEventListener("click",  function buttonHandler(){
    if(czyJestWyswietlane) return false
    snd2.pause()
    snd2.currentTime = 0.1;
    snd2.play();
    ruchyGracza.push("zielony");
    licznikKlikniec++;
   },false)
document.getElementById("czerwony").addEventListener("click",  function buttonHandler(){
    if(czyJestWyswietlane) return false
    snd3.pause()
    snd3.currentTime = 0.1;
    snd3.play();
    ruchyGracza.push("czerwony");
    licznikKlikniec++;
   },false)
document.getElementById("niebieski").addEventListener("click",  function buttonHandler(){
    if(czyJestWyswietlane) return false
    snd4.pause()
    snd4.currentTime = 0.1;
    snd4.play();
    ruchyGracza.push("niebieski");
    licznikKlikniec++;
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
    for(let i=0;i<licznikTur;i++)
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

async function mainLoop()
{
    licznikKlikniec=0
    ruchyGracza=[]
    while(true)
    {
       
        disableButtons()
        await podswietl()
        console.log("dupsko")
        enableButtons()
            if(await czekajNaLicznik()==true){
            console.log("sprawdzam....")
            if(validate()==false)
            {
                console.log("przegranko")
                licznikTur=2
                licznikKlikniec=0
                ruchyGracza=[]
                list=[]
                generateList()
                document.getElementById("start").style.visibility = 'visible';
                updateCounter()
                break

            }else
            {
                updateCounter()
                console.log("wgranko")
                licznikTur++
                addColorToList()
            }}
            licznikKlikniec=0
            ruchyGracza=[]
    }
    
    
}



document.getElementById("start").addEventListener("click",  ()=>
{
    mainLoop();
    document.getElementById("start").style.visibility = 'hidden';
},false)



  
 
  

// mainLoop()


var buttonUp=document.getElementById("button-up")
var buttonDown=document.getElementById("button-down")
var sidebar=document.getElementsByClassName("sidebar")[0]
var positon=0
const scrollStep=50
buttonUp.addEventListener("click",()=>
{

    sidebar.scroll(0,sidebar.scrollTop-scrollStep)
},false)

buttonDown.addEventListener("click",()=>
{
    positon+=scrollStep
    sidebar.scroll(0,sidebar.scrollTop+scrollStep)
},false)
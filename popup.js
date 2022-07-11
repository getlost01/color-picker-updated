const colorValue = document.querySelector('.colorValue');
const colorGrid=document.querySelector('.colorGrid');
// const resultElement = document.getElementById('result');
const hexColor = document.getElementById('color');
const select= document.getElementById('col');
const saveBtn=document.querySelector('.save');
const toast=document.querySelector(".toast");
const playground=document.querySelector(".playground");
const home=document.querySelector(".home");
const recent50=document.querySelector(".recent50");

let ids=[];
let colorArr=[];
let colorfromls=JSON.parse(localStorage.getItem("colors"));
if(colorfromls)
{
    colorArr=colorfromls;
    render();
}

function render(){
  let tempid=[];
  let c=1;
  for(let i=colorArr.length-1;i>=0;i--)
  {
    if(c<11)
    {
     let is=""+c;
     let te=document.getElementById(is)
     te.style.backgroundColor=colorArr[i];
    }
    if(c<51)
    {
     let is="r"+c;
     let te=document.getElementById(is)
     te.style.backgroundColor=colorArr[i];
     c++;
    }
    else{
      colorArr.shift();
    }
  }

  for(let i=1;i<=colorArr.length;i++)
  {
      if(i<11)
      {
      let is=""+i
      let te=document.getElementById(is)
      tempid.push(te.addEventListener('click',function(){
        navigator.clipboard.writeText(colorArr[colorArr.length-i]);
        show_toast("Color Picked");
       }))
      }
      let is="r"+i
      let te=document.getElementById(is)
      tempid.push(te.addEventListener('click',function(){
        navigator.clipboard.writeText(colorArr[colorArr.length-i]);
        show_toast("Color Picked");
       }))
  }
  ids=tempid
}

function check(val){
   for(let i=0;i<colorArr.length;i++)
   {
     if(colorArr[i]==val)
     return false;
   }
  //  console.log("true");
   return true;
}

saveBtn.addEventListener('click',function(){
  if(check(colorValue.textContent))
  {
   colorArr.push(colorValue.textContent);
   show_toast("Color Saved");
   localStorage.setItem("colors",JSON.stringify(colorArr))
  //  localStorage.clear()
   render()
  }
  else
  {
     show_toast("Color Already Exist");
  }
})


colorValue.addEventListener('click', () => {
         navigator.clipboard.writeText(colorValue.textContent);
         show_toast("Color Picked");
  })
  hexColor.addEventListener("input", () => {
    colorValue.textContent = hexColor.value;
    colorGrid.style.backgroundColor = hexColor.value;
  })


  select.addEventListener('change', (event) => {
    if(event.target.value==='Eye')
    {
      const eyeDropper = new EyeDropper();
      const abortController = new AbortController();
    
      eyeDropper.open({ signal: abortController.signal }).then(result => {
        var temp = result.sRGBHex;
        if(temp[0]==='#')
        {colorValue.textContent = temp;
        colorGrid.style.backgroundColor = temp;}
        else{
          temp = temp.toLowerCase();
          if(temp[0]==='r' && temp[1]==='g' && temp[2]==='b')
          {
             var b1 = temp.indexOf('(');
             var b2 = temp.indexOf(')');
             temp = temp.substring(b1,b2+1);
             var rgbVal = temp.split(",");
             var HexVal = rgbToHex(parseInt(rgbVal[0]),parseInt(rgbVal[1]),parseInt(rgbVal[2]));
             colorValue.textContent = HexVal;
             colorGrid.style.backgroundColor = HexVal;
          }
          else{
            show_toast("Error Occur, Contact Developer");
          }
        }
      }).catch((e) => {
        show_toast(e);
      });
    }
    else if(event.target.value==='ColorC')
    {
      hexColor.click();
    }
    event.target.value='ele';
  });


document.querySelector('#playBTN').addEventListener('click',()=>{
     playground.classList.remove('hidden');
     home.classList.add('hidden');
     recent50.classList.add('hidden');
     document.querySelector('#playBTN').classList.add('okActive');
     document.querySelector('#homeBTN').classList.remove('okActive');
     document.querySelector('#recent50BTN').classList.remove('okActive');
     document.querySelector('#headerName').innerText='Playground';
});
document.querySelector('#homeBTN').addEventListener('click',()=>{
      playground.classList.add('hidden');
      home.classList.remove('hidden');
      recent50.classList.add('hidden');
      document.querySelector('#playBTN').classList.remove('okActive');
      document.querySelector('#homeBTN').classList.add('okActive');
      document.querySelector('#recent50BTN').classList.remove('okActive');
      document.querySelector('#headerName').innerText='Color Dropper';
});
document.querySelector('#recent50BTN').addEventListener('click',()=>{
      playground.classList.add('hidden');
      home.classList.add('hidden');
      recent50.classList.remove('hidden');
      document.querySelector('#playBTN').classList.remove('okActive');
      document.querySelector('#homeBTN').classList.remove('okActive');
      document.querySelector('#recent50BTN').classList.add('okActive');
      document.querySelector('#headerName').innerText='Previous Colors';
});



  let toasttime;
  const show_toast=(msg)=>{
    toast.innerText=msg
    toast.style.transform="translateY(0)"
    clearTimeout(toasttime)
    toasttime= setTimeout(()=>{
    toast.style.transform="translateY(+60px)"
    },2000)
}



// playground Color Mixer --------->

var slider1 = document.getElementById("colorIN1");
var sliderVal1 = document.getElementById("colorVal1");
var slider2 = document.getElementById("colorIN2");
var sliderVal2 = document.getElementById("colorVal2");
var userColor1 = document.getElementById("userColor1");
var userColor2 = document.getElementById("userColor2");
var resultColor = document.getElementById("resultColor");
var resultColorValue = document.getElementById("resultColorValue");
var workCol1='#000000',workCol2='#000000';
var intensity1=50, intensity2=50;

slider1.oninput = function() {
  intensity1 = this.value;
  sliderVal1.innerHTML = `${intensity1}%`;
  intensity2 = 100 - intensity1;
  slider2.value = intensity2;
  sliderVal2.innerHTML = `${intensity2}%`;
  getColor();
}
slider2.oninput = function() {
  intensity2 = this.value;
  sliderVal2.innerHTML = `${intensity2}%`;
  intensity1 = 100 - intensity2;
  slider1.value = intensity1;
  sliderVal1.innerHTML = `${intensity1}%`;
  getColor();
}

userColor1.addEventListener("input", () => {
   workCol1=userColor1.value;
   getColor();
})
userColor2.addEventListener("input", () => {
  workCol2=userColor2.value;
  getColor();
})
resultColorValue.addEventListener('click',()=>{
  navigator.clipboard.writeText(resultColorValue.innerText);
  show_toast("Color Picked");
})


function getColor(){
   var temp1 = hexToRgb(workCol1);
   var temp2 = hexToRgb(workCol2);
   var r = parseInt((temp1.r*intensity1 + temp2.r*intensity2)/100);
   var g = parseInt((temp1.g*intensity1 + temp2.g*intensity2)/100);
   var b = parseInt((temp1.b*intensity1 + temp2.b*intensity2)/100);
   resultColor.style.backgroundColor = rgbToHex(r,g,b);
   resultColorValue.innerHTML = rgbToHex(r,g,b);
  //  console.log(rgbToHex(r,g,b));
}



// convertors ==========>
function HexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; 
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return {h, s, l};
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


// Color  converter --------->

var HEXvalue = document.getElementById("HEXvalue");
var Rvalue = document.getElementById("Rvalue");
var Gvalue = document.getElementById("Gvalue");
var Bvalue = document.getElementById("Bvalue");
var hexRESULT = document.getElementById("hexRESULT");
var RGBresult = document.getElementById("RGBresult");

HEXvalue.addEventListener('input',()=>{
    var temp = HEXvalue.value.toLowerCase();
    var newTemp = "";
    for(let i=0;i<temp.length;i++)
    {
      if((temp[i]<='9'&&temp[i]>='0') || (temp[i]<='f'&&temp[i]>='a'))
      newTemp+= temp[i]
    }
    HEXvalue.value = newTemp;
    newTemp = "#"+newTemp;
    hexRESULT.innerHTML = newTemp;
    var t = hexToRgb(newTemp);
    // console.log(t);
    if(t!=null)
    {RGBresult.innerHTML = `rgb(${t.r}, ${t.g}, ${t.b})`;}
})
Rvalue.addEventListener('input',()=>{
  var temp = parseInt(Rvalue.value);
  if(temp>255)
  Rvalue.value = 255;
  RGBresult.innerHTML = `rgb(${Rvalue.value}, ${Gvalue.value}, ${Bvalue.value})`;
  hexRESULT.innerHTML = rgbToHex(parseInt(Rvalue.value),parseInt(Gvalue.value),parseInt(Bvalue.value));
})
Gvalue.addEventListener('input',()=>{
  var temp = parseInt(Gvalue.value);
  if(temp>255)
  Gvalue.value = 255;
  RGBresult.innerHTML = `rgb(${Rvalue.value}, ${Gvalue.value}, ${Bvalue.value})`;
  hexRESULT.innerHTML = rgbToHex(parseInt(Rvalue.value),parseInt(Gvalue.value),parseInt(Bvalue.value));
})

Bvalue.addEventListener('input',()=>{
  var temp = parseInt(Bvalue.value);
  if(temp>255)
  Bvalue.value = 255;
  RGBresult.innerHTML = `rgb(${Rvalue.value}, ${Gvalue.value}, ${Bvalue.value})`;
  hexRESULT.innerHTML = rgbToHex(parseInt(Rvalue.value),parseInt(Gvalue.value),parseInt(Bvalue.value));
})

RGBresult.addEventListener('click',()=>{
  navigator.clipboard.writeText(RGBresult.innerText);
  show_toast("Color Picked");
})
hexRESULT.addEventListener('click',()=>{
  navigator.clipboard.writeText(hexRESULT.innerText);
  show_toast("Color Picked");
})


// Color Grader  ------------------>

const cursorRounded = document.querySelector('.rounded');
const nowCol = document.querySelector('.nowCol');
const givCol = document.querySelector('.colGiven');
const colorGrader1 = document.querySelector('#HEXvalueColorGrader');
const colorGrader2 = document.querySelector('#colorValueColorGrader');
const con = document.querySelector('.colorGrader');

colorGrader1.addEventListener('input',()=>{
    var temp = colorGrader1.value.toLowerCase();
    var newTemp = "";
    for(let i=0;i<temp.length;i++)
    {
      if((temp[i]<='9'&&temp[i]>='0') || (temp[i]<='f'&&temp[i]>='a'))
      newTemp+= temp[i]
    }
    colorGrader1.value = newTemp;
    newTemp = "#"+newTemp;
    var t = hexToRgb(newTemp);
    // console.log(t);
    if(t!=null)
    {colorGrader2.value = newTemp; colorGrader2.dispatchEvent(new Event('input'));}
})
colorGrader2.addEventListener('input',()=>{
    // console.log("change Occur");
    let inputColor = colorGrader2.value;
    let ourColor = HexToHSL(inputColor);
    var temp = {};
    temp[ourColor.l] = hslToHex(ourColor.h,ourColor.s,ourColor.l);
    for(var i = 100 ;i >= 0 ; i -= 4)
    {
        temp[i] = hslToHex(ourColor.h,ourColor.s,i);
    }
    con.innerHTML = ``;
    for (const [key, value] of Object.entries(temp)) {
        var fontColor;
        if(key<=50)
        fontColor = "white";
        else
        fontColor = "black";
        var colorHigh = ((key == ourColor.l)?"ColorHigh":"");
        con.innerHTML = `
            <div class="colorBox  ${colorHigh}" id="cID${key}" style="color: ${fontColor}; background-color: ${value};">
                 <span class="keySpan" id="keySpanid${key}"></span>
                 ${value}
            </div>
            
        ` + con.innerHTML;
    }
    for (const [key, value] of Object.entries(temp)) {
        document.querySelector(`#cID${key}`).addEventListener('mousemove',(e)=>{
            document.querySelector(`#keySpanid${key}`).innerHTML = `${key}%`;
            cursorRounded.style.display = "block";
            nowCol.style.backgroundColor = `${value}`;
            givCol.style.backgroundColor = `${inputColor}`;
            const mouseY = e.clientY;
            const mouseX = e.clientX;
            cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      })
        document.querySelector(`#cID${key}`).addEventListener('mouseout',(e)=>{
          document.querySelector(`#keySpanid${key}`).innerHTML = ``;
          cursorRounded.style.display = "none";
        })
        document.querySelector(`#cID${key}`).addEventListener('click',(e)=>{
          navigator.clipboard.writeText(value);
          show_toast("Color Picked");
        })
    }
})








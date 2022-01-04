import React, { useEffect, useRef } from 'react'

const Vowel = props => {

  const canvasRef = useRef(null);
  let colors = ['#000','#42f584','#59ff00','#52b31e'];
  var margin = 50;
  var f1min = 250;
  var f1max = 750;
  var f2min = 800;
  var f2max = 2400;
  var vowels = [];
  const map = (value,origMin,origMax,destMin,destMax) =>{
    if (destMax < destMin){
      let tmp = destMin
      destMin = destMax
      destMax = tmp
  }
    let res =(value-origMin) * (destMax-destMin) / (origMax - origMin) + destMin;
    console.log("origen ",origMin,origMax)
    console.log("destino ",destMin, destMax)
    console.log(value, " to ",res)
    return(res)
  }
  const draw = ctx => {
    let centerX = map(props.f1,f1min,f1max,margin,ctx.canvas.width-margin); 
    let centerY = map(props.f2,f2min,f2max,ctx.canvas.height-margin,margin);
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    console.log(centerX,centerY)

    ctx.arc(centerX,centerY, 20, 0, 2*Math.PI)
    ctx.fillText(props.name, centerX,centerY+30)
    console.log(props.name)
    ctx.fillStyle="blue";
    ctx.fill()
  }
  useEffect(()=>{
    //console.log("drawe ",distance);
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
      
    //canvasCtx.beginPath();
    //let centerX = map(props.f1,f1min,f1max,margin,window.innerWidth-margin); 
    //let centerY = map(props.f2,f2min,f2max,window.innerHeight-margin,margin);
    //let radius = 5;
    ////canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    //canvasCtx.font = "30px Arial";
    //canvasCtx.fillStyle="red";
    //canvasCtx.fillText(props.name, centerX,centerY);
    ////console.log(centerX,centerY)
    //canvasCtx.rect(centerX,centerY,radius,200)
    //canvasCtx.fillStyle="#f"+((1<<23)*Math.random()|0).toString(16);
    //canvasCtx.fillStyle=colors[Math.floor(Math.random()*colors.length)];

    //canvasCtx.strokeStyle=colors[Math.floor(Math.random()*colors.length)];
    //canvasCtx.stroke();
    draw(canvasCtx);
  },[draw])
/*
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 19,
        width: 640,
        height: 480,
      }}
      */
  return (
    <canvas
      ref={canvasRef}
    ></canvas>
    )


}

export default Vowel;

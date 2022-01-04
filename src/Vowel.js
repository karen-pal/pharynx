import React, { useEffect, useRef } from 'react'

const Vowel = (props) => {

  let colors = ['#000','#42f584','#59ff00','#52b31e'];
  let  canvasRef = props.canvasRef;
  var margin = 50;
  var f1min = 250;
  var f1max = 750;
  var f2min = 800;
  var f2max = 2400;
  var vowels = [];
  const map = (value,origMin,origMax,destMin,destMax) =>{
    return(value + (destMin-origMin))
  }
  useEffect(()=>{
        //console.log("draw: ",distance)
        let requestId;
        let i=0;
        const render = () => {
            //console.log("drawe ",distance);
            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
              
            canvasCtx.beginPath();
            let centerX = map(props.f1,f1min,f1max,margin,window.innerWidth-margin); 
            let centerY = map(props.f2,f2min,f2max,window.innerHeight-margin,margin);
            let radius = 5;
            canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            canvasCtx.fillText(props.name, centerX,centerY);
            //console.log(centerX,centerY)
            canvasCtx.rect(centerX,centerY,radius,200)
            //canvasCtx.fillStyle="#f"+((1<<23)*Math.random()|0).toString(16);
            canvasCtx.fillStyle=colors[Math.floor(Math.random()*colors.length)];

            canvasCtx.strokeStyle=colors[Math.floor(Math.random()*colors.length)];
            canvasCtx.stroke();
            i += 0.05;
            requestId = requestAnimationFrame(render)
        }
        render();
        return () => {
            cancelAnimationFrame(requestId);
        };
    },[])

  return (
    <div>
    <canvas
      ref={canvasRef}
      className="output_canvas"
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
    ></canvas>
    </div>
)


}

export default Vowel;

import logo from './logo.svg';
import './App.css';
import * as Tone from "tone";
import Vowel from './Vowel';

import React, { Suspense, useRef, useEffect, useState } from "react";
function App() {
  const vowels = [
      {x:570,y :840, f3:2410}, 
      {x:300,y :870, f3:2240}, 
      {x:440,y :1020, f3:2240},
      {x:730,y :1090, f3:2440},  
      {x:520,y :1190, f3:2390},  
      {x:490,y :1350, f3:1690},  
      {x:660,y :1720, f3:2480},  
      {x:530,y :870, f3:1840},   
      {x:390,y :1990, f3:2480},  ]
  var margin = 50;
  var f1min = 250;
  var f1max = 750;
  var f2min = 800;
  var f2max = 2400;
  const synth = new Tone.MembraneSynth().toDestination();
  const filtf1 = new Tone.BiquadFilter({
    frequency: 490,
    type: "bandpass",
    Q: 5.0
  }).toDestination();

  const filtf2 = new Tone.BiquadFilter({
    frequency: 1420,
    type: "bandpass",
    Q: 13.0
  }).toDestination();

  const filtf3 = new Tone.BiquadFilter({
    frequency: 2380,
    type: "bandpass",
    Q: 14.0
  }).toDestination();
  
  
  const noi = new Tone.Noise({
    type: "pink",
    volume: -16
  }).connect(filtf1).connect(filtf2).connect(filtf3);

  const osc = new Tone.Oscillator({
      type: "sawtooth",
      frequency: "E3",
      volume: -6
  }).connect(filtf1).connect(filtf2).connect(filtf3);

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
  const adjust = (mx, my, secs) => {
      var closestIndex = 0;
      var closestDist = 9999;
      for (var i = 0; i < vowels.length; i++) {
        var dx = mx - vowels[i].x;
        var dy = my - vowels[i].y;
        var dh = Math.sqrt(dx * dx + dy * dy);
        if (dh < closestDist) {
          closestDist = dh;
          closestIndex = i;
        }
      }
      
      // Get the frequency for the filters
      let width = window.innerWidth;
      let height = window.innerHeight;
      var f1 = map(mx, margin, width - margin, f1min, f1max);
      var f2 = map(my, height - margin, margin, f2min, f2max);
      var f3 = vowels[closestIndex].f3;
      console.log(closestIndex)
      filtf1.frequency.rampTo(f1, secs);
      filtf2.frequency.rampTo(f2, secs);
      filtf3.frequency.rampTo(f3, secs);

  }

  const playSynth = () => {synth.triggerAttackRelease("C2", "8n")}
  const play = () => { osc.toDestination().start();noi.toDestination().start();}

  const playCopado = (e) => { osc.toDestination().start();
                            noi.toDestination().start();
                            let mx =e.clientX ;
                            let my=e.clientY;
                            console.log("MOUSES",mx,my)
                            adjust(mx,my, 0.01)
                            }

  const stop = () => { osc.toDestination().stop();noi.toDestination().stop();}

  return (
    <div className="App" id='wrapper' >
      <button id='play-button' onMouseDown={(e)=>playCopado(e)}>play</button>
      <button id='stop-button' onClick={stop}>stop</button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={570} f2={840} f3={2410} name={"ow"}/></button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={300} f2={870} f3={2240} name={"oo"}/></button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={440} f2={1020} f3={2240} name={"u"}/></button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={730} f2={1090} f3={2440} name={"a"}/></button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={520} f2={1190} f3={2390} name={"uh"}/></button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={490} f2={1350} f3={1690} name={"er"}/></button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={660} f2={1720} f3={2480} name={"ae"}/></button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={530} f2={870} f3={1840} name={"e"}/></button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={390} f2={1990} f3={2480} name={"i"}/></button>
      <button onMouseDown={(e)=>playCopado(e)} onMouseUp={stop}><Vowel f1={270} f2={2290} f3={3010} name={"iy"}/></button>
    </div>
  );
}

export default App;

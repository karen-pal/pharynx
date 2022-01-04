import logo from './logo.svg';
import './App.css';
import * as Tone from "tone";
import Vowel from './Vowel';

import React, { Suspense, useRef, useEffect, useState } from "react";
function App() {
  const [mousePosition, setMousePosition] = useState({x:0,y:0});
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
    volume: -6
  }).connect(filtf1).connect(filtf2).connect(filtf3);

  const osc = new Tone.Oscillator({
      type: "sawtooth",
      frequency: "E3",
      volume: -6
  }).connect(filtf1).connect(filtf2).connect(filtf3);
  const playSynth = () => {synth.triggerAttackRelease("C2", "8n")}
  const play = () => { osc.toDestination().start();noi.toDestination().start();}
  const stop = () => { osc.toDestination().stop();noi.toDestination().stop();}
  const vowels = [];
  const mouseMove = (e) => {setMousePosition({x:e.clientX - e.target.offsetTop, y:e.clientY - e.target.offsetTop})}
  return (
    <div className="App" id='wrapper' onMouseMove={(e) =>mouseMove(e)}>
      <div> {mousePosition.x+","+mousePosition.y}</div>
      <button id='play-button' onClick={play}>play</button>
      <button id='stop-button' onClick={stop}>stop</button>
      <Vowel f1={570} f2={840} f3={2410} name={"ow"}/>
      <Vowel f1={300} f2={870} f3={2240} name={"oo"}/>
      <Vowel f1={440} f2={1020} f3={2240} name={"u"}/>
      <Vowel f1={730} f2={1090} f3={2440} name={"a"}/>
      <Vowel f1={520} f2={1190} f3={2390} name={"uh"}/>
      <Vowel f1={490} f2={1350} f3={1690} name={"er"}/>
      <Vowel f1={660} f2={1720} f3={2480} name={"ae"}/>
      <Vowel f1={530} f2={870} f3={1840} name={"e"}/>
      <Vowel f1={390} f2={1990} f3={2480} name={"i"}/>
      <Vowel f1={270} f2={2290} f3={3010} name={"iy"}/>
    </div>
  );
}

export default App;

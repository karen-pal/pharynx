import logo from './logo.svg';
import './App.css';
import * as Tone from "tone";
import Vowel from './Vowel';

import React, { Suspense, useRef, useEffect, useState } from "react";
function App() {
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

  const canvasRef = useRef(null);
  return (
    <div className="App" id='wrapper'>
      <button id='play-button' onClick={play}>play</button>
      <button id='stop-button' onClick={stop}>stop</button>
    </div>
  );
}

export default App;

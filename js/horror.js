
window.VG = window.VG || {};


VG.audio = (function () {
  let ctx = null, master = null;
  let midiTimer = null, midiOn = false;
  let vol = 0.45;

  function init() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = vol;
    master.connect(ctx.destination);
  }
  function resume() { if (ctx && ctx.state === 'suspended') ctx.resume(); }
  function setVolume(v) { vol = v; if (master) master.gain.value = v; }

  
  function tone(o) {
    if (!ctx) return;
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(o.f0 || 440, t0);
    if (o.f1) osc.frequency.exponentialRampToValueAtTime(o.f1, t0 + (o.dur || 0.3));

    let node = osc;
    if (o.distort) {
      const ws = ctx.createWaveShaper();
      const n = 256, c = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const x = (i / (n - 1)) * 2 - 1;
        c[i] = Math.tanh(x * (o.distort || 4));
      }
      ws.curve = c;
      node.connect(ws); node = ws;
    }
    node.connect(g); g.connect(master);

    const peak = (o.gain == null ? 0.2 : o.gain);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + (o.dur || 0.3));
    osc.start(t0); osc.stop(t0 + (o.dur || 0.3) + 0.05);
  }

  
  function noise(dur, gain, lp) {
    if (!ctx) return;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lp || 1200;
    const g = ctx.createGain(); g.gain.value = gain == null ? 0.15 : gain;
    src.connect(f); f.connect(g); g.connect(master);
    src.start();
  }

  

  
  function dialup() {
    if (!ctx) return;
    
    tone({ type: 'sine', f0: 350, f1: 440, dur: 0.9, gain: 0.10 });
    tone({ type: 'sine', f0: 440, f1: 350, dur: 0.9, gain: 0.10 });
    setTimeout(() => noise(0.8, 0.06, 900), 900);
    setTimeout(() => {
      
      for (let i = 0; i < 10; i++) {
        setTimeout(() => tone({
          type: 'square', f0: 700 + Math.random() * 1400,
          f1: 500 + Math.random() * 1600, dur: 0.07, gain: 0.045
        }), i * 90);
      }
    }, 1700);
  }

  
  
  let _lastClick = 0;
  function click() {
    const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    if (now - _lastClick < 55) return;
    _lastClick = now;
    if (!ctx) return;
    noise(0.018, 0.05, 5400);
    tone({ type: 'triangle', f0: 2100, f1: 880, dur: 0.022, gain: 0.042 });
  }

  
  function errorDing(slow) {
    const s = slow ? 0.5 : 1;
    tone({ type: 'sine', f0: 830 * s, dur: 0.22 / s, gain: 0.16 });
    setTimeout(() => tone({ type: 'sine', f0: 622 * s, dur: 0.42 / s, gain: 0.16 }), 130 / s);
  }

  
  function bang() {
    noise(0.06, 0.22, 2600);
    tone({ type: 'triangle', f0: 220, f1: 110, dur: 0.10, gain: 0.20 });
  }

  
  function chime() {
    [1568, 2093, 2637].forEach((f, i) =>
      setTimeout(() => tone({ type: 'sine', f0: f, dur: 0.6, gain: 0.06 }), i * 60));
  }

  
  function scareBurst() {
    if (!ctx) return;
    
    tone({ type: 'sawtooth', f0: 420, f1: 1180, dur: 0.55, gain: 0.30, distort: 9 });
    tone({ type: 'square', f0: 415, f1: 1170, dur: 0.55, gain: 0.16, distort: 6 });
    
    noise(0.09, 0.30, 5200);
    
    setTimeout(() => errorDing(true), 40);
  }

  
  function reverseTone() {
    if (!ctx) return;
    tone({ type: 'sine', f0: 900, f1: 220, dur: 1.6, gain: 0.10 });
    tone({ type: 'triangle', f0: 460, f1: 130, dur: 1.6, gain: 0.07 });
  }

  
  function river(dur) { noise(dur || 3, 0.05, 420); }

  
  function staticNoise(dur) { noise(dur || 0.8, 0.075, 3200); }

  
  
  function radioVoice() {
    if (!ctx) return;
    noise(2.6, 0.05, 1100);                                   
    tone({ type: 'sawtooth', f0: 214, f1: 178, dur: 2.6, gain: 0.045, distort: 3 }); 
    
    for (let i = 0; i < 15; i++) {
      const f = 300 + Math.random() * 520;
      setTimeout(() => tone({
        type: 'square', f0: f, f1: f * 0.86, dur: 0.085,
        gain: 0.032, distort: 6
      }), i * 165);
    }
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => tone({ type: 'sine', f0: 1200, dur: 0.03, gain: 0.05 }), i * 520);
    }
  }

  
  const MELODY = [
    [659, 380], [587, 380], [523, 380], [587, 380],
    [659, 380], [659, 380], [659, 760],
    [587, 380], [587, 380], [587, 760],
    [659, 380], [784, 380], [784, 760],
    [659, 340], [587, 340], [523, 900]
  ];
  function midiStart() {
    if (!ctx || midiOn) return;
    midiOn = true;
    let i = 0;
    const step = () => {
      if (!midiOn) return;
      const [f, d] = MELODY[i % MELODY.length];
      
      const detune = 1 + (Math.sin(i * 2.7) * 0.006);
      tone({ type: 'square', f0: f * detune, dur: d / 1000 * 0.85, gain: 0.045 });
      tone({ type: 'triangle', f0: f * detune / 2, dur: d / 1000 * 0.9, gain: 0.03 });
      i++;
      midiTimer = setTimeout(step, d);
    };
    step();
  }
  function midiStop() { midiOn = false; clearTimeout(midiTimer); }
  function midiIsOn() { return midiOn; }

  

  let _tune = null;

  function circusTuneStop() {
    if (!_tune) return;
    clearTimeout(_tune.timer);
    if (_tune.stopDrone) _tune.stopDrone();
    _tune = null;
  }

  function circusTune() {
    if (_tune) return;
    init(); resume();
    if (!ctx) return;
    const C = ctx;
    const t0 = C.currentTime;

    const out = C.createGain();
    out.gain.value = 0.22;
    out.connect(master);

    
    const drone = C.createGain();
    drone.gain.value = 0.05;
    const d1 = C.createOscillator(); d1.type = 'sawtooth'; d1.frequency.value = 55;
    const d2 = C.createOscillator(); d2.type = 'sine';     d2.frequency.value = 55.7;
    const dlp = C.createBiquadFilter();
    dlp.type = 'lowpass'; dlp.frequency.value = 260;
    d1.connect(dlp); d2.connect(dlp); dlp.connect(drone); drone.connect(out);
    d1.start(t0); d2.start(t0);

    
    const TUNE = [69, 72, 76, 72, 69, 72, 76, 72, 65, 69, 72, 69];
    const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
    const st = { i: 0, drift: 0 };

    function note() {
      if (!_tune) return;
      const now = C.currentTime;

      
      if (st.i > 0 && st.i % (TUNE.length * 4) === 0) st.drift -= 1;

      let n = TUNE[st.i % TUNE.length] + st.drift;
      if (Math.random() < 0.04) {                 
        n += Math.random() < 0.5 ? -1 : 1;
      }

      const f = midi(n) * (1 + (Math.random() - 0.5) * 0.006);
      const o = C.createOscillator(); o.type = 'triangle';
      o.frequency.setValueAtTime(f, now);
      const o2 = C.createOscillator(); o2.type = 'sine';   
      o2.frequency.setValueAtTime(f * 2, now);

      const lg = C.createGain();
      lg.gain.setValueAtTime(0.0001, now);
      lg.gain.exponentialRampToValueAtTime(0.16, now + 0.008);
      lg.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

      const g2 = C.createGain(); g2.gain.value = 0.35;
      o.connect(lg); o2.connect(g2); g2.connect(lg); lg.connect(out);
      o.start(now); o2.start(now);
      o.stop(now + 0.5); o2.stop(now + 0.5);

      
      if (Math.random() < 0.035) {
        try {
          o.frequency.exponentialRampToValueAtTime(f * 0.55, now + 0.38);
          o2.frequency.exponentialRampToValueAtTime(f * 1.1, now + 0.38);
          d1.frequency.exponentialRampToValueAtTime(44, now + 0.5);
          d2.frequency.exponentialRampToValueAtTime(45, now + 0.5);
          setTimeout(() => {
            if (!_tune) return;
            const t = C.currentTime;
            try {
              d1.frequency.setValueAtTime(55, t);
              d2.frequency.setValueAtTime(55.7, t);
            } catch (e) {}
          }, 900);
        } catch (e) {}
        
    glitchAny();
      }

      st.i++;
      
      const gap = 300 + (Math.random() < 0.12 ? Math.random() * 260 : 0);
      _tune.timer = setTimeout(note, gap);
    }

    _tune = {
      timer: null,
      stopDrone: () => { try { d1.stop(); d2.stop(); } catch (e) {} }
    };
    note();
  }


  

  
  function glitchHit() {
    init(); resume();
    tone({ type: 'square', f0: 1840, f1: 320, dur: 0.035, gain: 0.10 });
    noise(0.020, 0.10, 6800);
    tone({ type: 'triangle', f0: 96, f1: 54, dur: 0.09, gain: 0.16 });
  }

  
  function glitchTear() {
    init(); resume();
    noise(0.05, 0.13, 9000);
    tone({ type: 'sawtooth', f0: 720, f1: 88, dur: 0.34, gain: 0.13 });
    noise(0.30, 0.055, 2400);
  }

  
  function glitchDrop() {
    init(); resume();
    tone({ type: 'sine', f0: 1180, f1: 62, dur: 1.15, gain: 0.11 });
    tone({ type: 'square', f0: 590, f1: 31, dur: 1.15, gain: 0.045 });
    noise(1.10, 0.035, 1600);
  }

  
  function glitchBuzz() {
    init(); resume();
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        noise(0.018, 0.09, 5200 + Math.random() * 2600);
        tone({ type: 'square', f0: 130 + Math.random() * 220,
               f1: 90, dur: 0.022, gain: 0.075 });
      }, i * (28 + Math.random() * 34));
    }
  }

  
  function glitchReverse() {
    init(); resume();
    tone({ type: 'sawtooth', f0: 90, f1: 1420, dur: 0.62, gain: 0.10 });
    noise(0.60, 0.03, 4200);
    setTimeout(() => { noise(0.035, 0.12, 7400);
      tone({ type: 'square', f0: 2100, f1: 1400, dur: 0.03, gain: 0.09 }); }, 620);
  }

  
  function signalLost() {
    init(); resume();
    const seq = [[0, 1200, 0.10], [260, 1200, 0.085], [540, 980, 0.06]];
    seq.forEach(([at, f, g]) => setTimeout(() => {
      tone({ type: 'sine', f0: f, dur: 0.20, gain: g });
      tone({ type: 'sine', f0: f * 0.75, dur: 0.20, gain: g * 0.5 });
    }, at));
    noise(0.95, 0.028, 1100);
  }

  
  function glitchStutter() {
    init(); resume();
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        tone({ type: 'triangle', f0: 420, f1: 400, dur: 0.045, gain: 0.095 });
        noise(0.030, 0.065, 3600);
      }, i * 78);
    }
  }

  
  function glitchChirp() {
    init(); resume();
    tone({ type: 'sine', f0: 2400, f1: 5200, dur: 0.13, gain: 0.055 });
    tone({ type: 'sine', f0: 5200, f1: 900, dur: 0.17, gain: 0.045 });
  }

  
  function glitchHum() {
    init(); resume();
    tone({ type: 'sawtooth', f0: 42, f1: 46, dur: 0.85, gain: 0.10 });
    tone({ type: 'sine', f0: 50.5, dur: 0.85, gain: 0.06 });
    noise(0.80, 0.022, 420);
  }

  
  function glitchAny() {
    const F = [glitchHit, glitchTear, glitchDrop, glitchBuzz,
               glitchReverse, glitchStutter, glitchChirp];
    F[Math.floor(Math.random() * F.length)]();
  }

  return {
    init, resume, setVolume, tone, noise, dialup, click, errorDing,
    bang, chime, scareBurst, reverseTone, river, staticNoise, radioVoice,
    midiStart, midiStop, midiIsOn, circusTune, circusTuneStop,
    
    glitchHit, glitchTear, glitchDrop, glitchBuzz, glitchReverse,
    signalLost, glitchStutter, glitchChirp, glitchHum, glitchAny,
    getVolume: () => vol
  };
})();


VG.horror = (function () {
  let gentle = false;
  let busy = false;

  function setGentle(v) { gentle = !!v; }
  function isGentle() { return gentle; }

  
  function faceSVG() {
    return `
<svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fg" cx="50%" cy="42%" r="58%">
      <stop offset="0%"  stop-color="#8e9a92"/>
      <stop offset="55%" stop-color="#5c675f"/>
      <stop offset="100%" stop-color="#0a0d0b"/>
    </radialGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="2.4"/></filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.34"/></feComponentTransfer>
      <feComposite operator="in" in2="SourceGraphic"/>
      <feBlend mode="overlay" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="300" height="380" fill="#050505"/>
  <g filter="url(#grain)">
    <ellipse cx="150" cy="185" rx="100" ry="140" fill="url(#fg)" filter="url(#blur)"/>
    <ellipse cx="112" cy="165" rx="20" ry="12" fill="#050706"/>
    <ellipse cx="188" cy="165" rx="20" ry="12" fill="#050706"/>
    <ellipse cx="150" cy="250" rx="26" ry="15" fill="#0a0b09"/>
    <path d="M60 60 Q150 -10 240 60 Q150 30 60 60Z" fill="#0b0d0b"/>
  </g>
</svg>`;
  }

  

  let scareAudio = null, scareUnlocked = false;

  function initScareAudio() {
    if (scareAudio) return scareAudio;
    try {
      scareAudio = new Audio('assets/scare.mp4');
      scareAudio.preload = 'auto';
      scareAudio.load();
    } catch (e) { scareAudio = null; }
    return scareAudio;
  }

  
  function unlockScareAudio() {
    const a = initScareAudio();
    if (!a || scareUnlocked) return;
    scareUnlocked = true;
    const v = a.volume;
    a.volume = 0;
    const p = a.play();
    if (p && p.then) {
      p.then(() => { a.pause(); a.currentTime = 0; a.volume = v; })
       .catch(() => { a.volume = v; });
    } else { a.volume = v; }
  }

  function playScareAudio() {
    const a = initScareAudio();
    if (!a) return;
    
    a.volume = Math.min(1, (VG.audio.getVolume ? VG.audio.getVolume() : 0.45) * 1.7);
    try { a.currentTime = 0; } catch (e) {  }
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
  }

  
  function finalScare(onDone) {
    const el = document.getElementById('scare');

    if (gentle) {
      
      VG.ui.typeTextOverlay('镜子里是一张脸。你看不清是谁。', 2200);
      setTimeout(() => { if (onDone) onDone(); }, 2300);
      return;
    }

    el.className = 'scare';
    el.innerHTML = '<img class="scare-img" src="assets/scare.jpg" alt="">'
                 + '<div class="scare-tint"></div>';
    el.classList.remove('hidden');

    playScareAudio();

    
    setTimeout(() => el.classList.add('shake'), 340);
    
    setTimeout(() => {
      el.classList.remove('shake');
      el.classList.add('hidden');
      el.innerHTML = '';
      if (onDone) onDone();
    }, 1050);
  }

  
  function flash(opts) {
    if (busy) return;
    busy = true;
    const el = document.getElementById('scare');

    if (gentle) {
      el.className = 'scare hidden';
      VG.ui.typeTextOverlay(opts.gentleText || '（这里有一段影像，你看不清。）', 1600);
      setTimeout(() => { busy = false; }, 1800);
      return;
    }

    el.className = 'scare';
    el.innerHTML = '<div class="face">' + faceSVG() + '</div>';
    el.classList.remove('hidden');
    if (opts.sound !== false) VG.audio.scareBurst();
    setTimeout(() => {
      el.classList.add('hidden');
      el.innerHTML = '';
      busy = false;
    }, 130);
  }

  

  return {
    setGentle, isGentle, flash, finalScare, unlockScareAudio, initScareAudio,
    
    circusTune: () => VG.audio.circusTune(),
    circusTuneStop: () => VG.audio.circusTuneStop()
  };
})();

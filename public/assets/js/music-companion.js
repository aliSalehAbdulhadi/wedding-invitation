// Independent light reflections appear, fade completely, then re-enter elsewhere.
export function advanceLightWash(state, now, energy, night, random = Math.random) {
  if (state.active && now >= state.active.born + state.active.duration) {
    state.active = null;
    state.nextAt = now + 1600 + random()*2600;
    return null;
  }
  if (!state.active) {
    if (!state.nextAt) { state.nextAt = now + 650 + random()*850; return null; }
    if (now < state.nextAt || energy < .04) return null;
    let side;
    if (state.lastSide < 0) side = Math.floor(random()*4);
    else { side = Math.floor(random()*3); if (side >= state.lastSide) side++; }
    const along = 12+random()*76;
    state.active = {
      id:++state.id, index:state.id%2, side, born:now, duration:4600+random()*2800,
      x:side===0?0:side===1?100:along, y:side===2?0:side===3?100:along,
      angle:[0,180,90,270][side] + random()*26-13,
      width:14+random()*12, height:26+random()*22, drift:10+random()*18,
    };
    state.lastSide = side;
  }
  const wash=state.active, t=Math.max(0,Math.min(1,(now-wash.born)/wash.duration));
  const eased=t*t*(3-2*t), envelope=Math.sin(Math.PI*t)**2;
  return {...wash,
    dx:(wash.side===0?1:wash.side===1?-1:0)*wash.drift*eased,
    dy:(wash.side===2?1:wash.side===3?-1:0)*wash.drift*eased,
    opacity:envelope*(night?.065:.15)*(.2+Math.min(1,energy)*.8),
  };
}

// Read the selected recording locally; no microphone, network service or synthetic beat.
export function createMusicCompanion(audio) {
  const light = document.querySelector('.music-ambience');
  const bird = document.querySelector('#story-bird');
  const pools = [...light.querySelectorAll('i')];
  const bars = [...document.querySelectorAll('.music-bars i')];
  const scenes = [...document.querySelectorAll('.hero,.chapter')];
  let activeScene = document.querySelector('.hero');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let context, source, analyser, samples, spectrum, frame = 0, last = 0, energy = 0, swell = 0;
  const washes = {active:null,nextAt:0,lastSide:-1,id:0};
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        if (activeScene !== entry.target) { activeScene?.style.setProperty('--music-energy','0'); activeScene?.style.setProperty('--music-swell','0'); }
        activeScene = entry.target;
      }
    }, {rootMargin:'-35% 0px -35% 0px',threshold:0});
    scenes.forEach(scene => observer.observe(scene));
  }
  function paint() {
    const value = energy.toFixed(3), accent = swell.toFixed(3);
    for (const node of [light,bird,activeScene]) {
      node?.style.setProperty('--music-energy',value);
      node?.style.setProperty('--music-swell',accent);
    }
    const night = activeScene?.classList.contains('chapter--celebration') || activeScene?.classList.contains('chapter--promise');
    const tone=night?'night':'paper';
    if (light.dataset.tone !== tone) light.dataset.tone=tone;
    const wash = advanceLightWash(washes,performance.now(),energy,night);
    pools.forEach((pool,index) => {
      if (!wash || index !== wash.index) { pool.style.opacity='0'; return; }
      if (pool.dataset.washId !== String(wash.id)) {
        pool.dataset.washId=String(wash.id); pool.dataset.edge=['left','right','top','bottom'][wash.side];
        pool.style.width=`clamp(100px,${wash.width.toFixed(1)}vw,220px)`;
        pool.style.height=`clamp(200px,${wash.height.toFixed(1)}vh,430px)`;
      }
      pool.style.opacity=wash.opacity.toFixed(4);
      pool.style.transform=`translate3d(${wash.x.toFixed(1)}vw,${wash.y.toFixed(1)}vh,0) translate(-50%,-50%) rotate(${wash.angle.toFixed(1)}deg) translate3d(${wash.dx.toFixed(2)}px,${wash.dy.toFixed(2)}px,0)`;
    });
    bars.forEach((bar,index) => {
      const start=[1,2,4,7,11,17,25,38,55][index], end=start+(index+1)*2;
      let sum=0;
      if (spectrum) for(let i=start;i<end;i++)sum+=spectrum[i];
      bar.style.setProperty('--bar',energy ? Math.max(.12,Math.min(1,sum/((end-start)*190))).toFixed(3) : '.12');
    });
  }
  function stop() {
    cancelAnimationFrame(frame); frame = 0; energy = 0; swell = 0; last = 0;
    washes.active=null; washes.nextAt=0;
    document.body.classList.remove('music-listening');
    paint();
    if (context?.state === 'running' && audio.paused) void context.suspend().catch(() => {});
  }
  function tick(now) {
    frame = 0;
    if (audio.paused || document.hidden || reduced.matches || context?.state !== 'running') { stop(); return; }
    if (now-last >= 50) {
      analyser.getByteTimeDomainData(samples);
      let sum = 0;
      for (const sample of samples) { const value = (sample-128)/128; sum += value*value; }
      const rms = Math.sqrt(sum/samples.length);
      const target = rms < .0005 ? 0 : Math.min(1, rms*22);
      energy += (target-energy)*(target > energy ? .12 : .06);
      swell += (energy-swell)*.055;
      analyser.getByteFrequencyData(spectrum);
      last = now;
      paint();
    }
    frame = requestAnimationFrame(tick);
  }
  function start() {
    if (!analyser || context.state !== 'running' || audio.paused || document.hidden || reduced.matches) return;
    document.body.classList.add('music-listening');
    if (!frame) frame = requestAnimationFrame(tick);
  }
  // Called synchronously by the existing guest music gesture, before audio.play().
  function prepare() {
    if (reduced.matches) return;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    try {
      if (!context) {
        context = new Context();
        analyser = context.createAnalyser(); analyser.fftSize = 1024;
        samples = new Uint8Array(analyser.fftSize);
        spectrum = new Uint8Array(analyser.frequencyBinCount);
        context.addEventListener('statechange', () => context.state === 'running' ? start() : stop());
      }
      // Keep native playback untouched until the browser permits the audio context.
      void context.resume().then(() => {
        if (context.state !== 'running') return;
        if (!source) {
          source = context.createMediaElementSource(audio);
          source.connect(analyser); analyser.connect(context.destination);
        }
        start();
      }).catch(fallback);
    } catch { fallback(); }
  }
  function fallback() {
    // An unavailable visualizer must not prevent the song from playing.
    if (source) {
      try { source.disconnect(); source.connect(context.destination); } catch { /* Preserve the existing output when possible. */ }
      analyser = null;
    }
    stop();
  }
  audio.addEventListener('playing', start);
  for (const event of ['pause','waiting','ended','error']) audio.addEventListener(event, stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  reduced.addEventListener('change', () => { if (reduced.matches) stop(); else if (!audio.paused) { prepare(); start(); } });
  return { prepare, get energy() { return energy; }, get swell() { return swell; } };
}

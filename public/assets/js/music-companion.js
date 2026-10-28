// A short engraved stroke passes one edge, disappears, then returns somewhere else.
export function advanceMusicStroke(state, now, energy, random = Math.random) {
  if (state.active && now >= state.active.born + state.active.duration) {
    state.active = null;
    state.nextAt = now + 900 + random()*1500;
    return null;
  }
  if (!state.active) {
    if (!state.nextAt) { state.nextAt = now + 250 + random()*350; return null; }
    if (now < state.nextAt || energy < .04) return null;
    let side;
    if (state.lastSide < 0) side = Math.floor(random()*4);
    else { side = Math.floor(random()*3); if (side >= state.lastSide) side++; }
    state.active = {
      id:++state.id, side, born:now, duration:3800+random()*1800,
      along:24+random()*52, variant:Math.floor(random()*3),
    };
    state.lastSide = side;
  }
  const stroke=state.active, progress=Math.max(0,Math.min(1,(now-stroke.born)/stroke.duration));
  return {...stroke, progress,
    offset:.55-progress*1.55,
    opacity:Math.sin(Math.PI*progress)**2*(.48+Math.min(1,energy)*.24),
  };
}

// Read the selected recording locally; no microphone, network service or synthetic beat.
export function createMusicCompanion(audio) {
  const engraving = document.querySelector('.music-engraving');
  const bird = document.querySelector('#story-bird');
  const strokes = [...engraving.querySelectorAll('svg')];
  const bars = [...document.querySelectorAll('.music-bars i')];
  const scenes = [...document.querySelectorAll('.hero,.chapter')];
  let activeScene = document.querySelector('.hero');
  // A leaf layer keeps the same outline response without inheriting values through the artwork.
  for (const ornament of document.querySelectorAll('.ring-universe,.date-card,.arrival-seal')) {
    const accent=document.createElement('span'); accent.className='music-scene-accent'; accent.setAttribute('aria-hidden','true');
    accent.dataset.kind=ornament.classList.contains('ring-universe')?'rings':ornament.classList.contains('date-card')?'date':'seal';
    ornament.append(accent);
  }
  const sceneAccent = scene => scene?.querySelector('.music-scene-accent');
  let activeAccent = sceneAccent(activeScene);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let context, source, analyser, samples, spectrum, frame = 0, last = 0, energy = 0, swell = 0;
  const passage = {active:null,nextAt:0,lastSide:-1,id:0};
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        if (activeScene !== entry.target && activeAccent) activeAccent.style.opacity='0';
        activeScene = entry.target;
        activeAccent = sceneAccent(activeScene);
      }
    }, {rootMargin:'-35% 0px -35% 0px',threshold:0});
    scenes.forEach(scene => observer.observe(scene));
  }
  function paint() {
    const value = energy.toFixed(3), accent = swell.toFixed(3);
    for (const node of [engraving,bird]) {
      node?.style.setProperty('--music-energy',value);
      node?.style.setProperty('--music-swell',accent);
    }
    if (activeAccent) {
      const kind=activeAccent.dataset.kind;
      activeAccent.style.opacity=(kind==='seal'?swell*.2:energy*(kind==='rings'?.12:.14)).toFixed(3);
      activeAccent.style.transform=`scale(${(1+swell*(kind==='seal'?.08:kind==='rings'?.008:.006)).toFixed(4)})`;
    }
    const night = activeScene?.classList.contains('chapter--celebration') || activeScene?.classList.contains('chapter--promise');
    const tone=night?'night':'paper';
    if (engraving.dataset.tone !== tone) engraving.dataset.tone=tone;
    const stroke = advanceMusicStroke(passage,performance.now(),energy);
    strokes.forEach(mark => {
      if (!stroke) { mark.style.opacity='0'; return; }
      if (mark.dataset.fragmentId !== String(stroke.id)) {
        mark.dataset.fragmentId=String(stroke.id);
        mark.dataset.edge=['left','right','top','bottom'][stroke.side];
        mark.dataset.variant=String(stroke.variant);
        const vertical=stroke.side<2;
        mark.style.left=vertical?(stroke.side===0?'16px':'calc(100% - 16px)'):`${stroke.along.toFixed(1)}%`;
        mark.style.top=vertical?`clamp(150px,${stroke.along.toFixed(1)}vh,calc(100vh - 150px))`:(stroke.side===2?'16px':'calc(100% - 16px)');
        mark.style.transform=`translate(-50%,-50%) rotate(${[0,180,90,270][stroke.side]}deg)`;
      }
      mark.style.opacity=stroke.opacity.toFixed(3);
      mark.style.setProperty('--stroke-offset',stroke.offset.toFixed(4));
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
    passage.active=null; passage.nextAt=0;
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

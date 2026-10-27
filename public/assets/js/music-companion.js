// Read the selected recording locally; no microphone, network service or synthetic beat.
export function createMusicCompanion(audio) {
  const light = document.querySelector('.music-ambience');
  const bird = document.querySelector('#story-bird');
  const pools = [...light.querySelectorAll('i')];
  const bars = [...document.querySelectorAll('.music-bars i')];
  const scenes = [...document.querySelectorAll('.hero,.chapter')];
  let activeScene = document.querySelector('.hero');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let context, source, analyser, samples, spectrum, frame = 0, last = 0, energy = 0, pulse = 0, lastAccent = -1000;
  const perimeter = [[.15,0],[.85,0],[1,.2],[1,.8],[.85,1],[.15,1],[0,.8],[0,.2]];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        if (activeScene !== entry.target) { activeScene?.style.setProperty('--music-energy','0'); activeScene?.style.setProperty('--music-pulse','0'); }
        activeScene = entry.target;
      }
    }, {rootMargin:'-35% 0px -35% 0px',threshold:0});
    scenes.forEach(scene => observer.observe(scene));
  }
  function paint() {
    const value = energy.toFixed(3), accent = pulse.toFixed(3);
    for (const node of [light,bird,activeScene]) {
      node?.style.setProperty('--music-energy',value);
      node?.style.setProperty('--music-pulse',accent);
    }
    const night = activeScene?.classList.contains('chapter--celebration') || activeScene?.classList.contains('chapter--promise');
    light.dataset.tone = night ? 'night' : 'paper';
    pools.forEach((pool,index) => {
      const phase = ((audio.currentTime/24+index*.48)%1)*perimeter.length;
      const point = Math.floor(phase), mix = phase-point, ease = mix*mix*(3-2*mix);
      const from=perimeter[point],to=perimeter[(point+1)%perimeter.length];
      pool.style.transform = `translate3d(${((from[0]+(to[0]-from[0])*ease)*100).toFixed(2)}vw,${((from[1]+(to[1]-from[1])*ease)*100).toFixed(2)}vh,0) translate(-50%,-50%)`;
    });
    bars.forEach((bar,index) => {
      const start=[1,2,4,7,11,17,25,38,55][index], end=start+(index+1)*2;
      let sum=0;
      if (spectrum) for(let i=start;i<end;i++)sum+=spectrum[i];
      bar.style.setProperty('--bar',energy ? Math.max(.12,Math.min(1,sum/((end-start)*190))).toFixed(3) : '.12');
    });
  }
  function stop() {
    cancelAnimationFrame(frame); frame = 0; energy = 0; pulse = 0; last = 0; lastAccent = -1000;
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
      pulse *= Math.exp(-Math.min(100,now-last)/280);
      const rise = target-energy;
      if (rise > .055 && target > .12 && now-lastAccent > 460) { pulse = Math.min(1,.45+rise*3); lastAccent = now; }
      energy += (target-energy)*(target > energy ? .32 : .12);
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
  return { prepare, get energy() { return energy; }, get pulse() { return pulse; } };
}

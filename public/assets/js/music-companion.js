// Read the selected recording locally; no microphone, network service or synthetic beat.
export function createMusicCompanion(audio) {
  const light = document.querySelector('.music-ambience');
  const bird = document.querySelector('#story-bird');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let context, source, analyser, samples, frame = 0, last = 0, energy = 0;
  function paint() {
    const value = energy.toFixed(3);
    light?.style.setProperty('--music-energy', value);
    bird?.style.setProperty('--music-energy', value);
  }
  function stop() {
    cancelAnimationFrame(frame); frame = 0; energy = 0; last = 0;
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
      energy += (target-energy)*(target > energy ? .24 : .08);
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
  return { prepare, get energy() { return energy; } };
}

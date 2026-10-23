// A small transparent tile replaces a full-screen SVG with dozens of changing nodes.
export function drawBirdWake(canvas, particles, now, color, pixelRatio = 1) {
  if (!particles.length) {
    if (!canvas.hidden) canvas.hidden = true;
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  if (canvas.hidden) canvas.hidden = false;
  const size = 512, ratio = Math.min(pixelRatio,1.5), pixels = Math.round(size*ratio);
  if (canvas.width !== pixels || canvas.height !== pixels) canvas.width = canvas.height = pixels;
  const xs = particles.map(p=>p.x), ys = particles.map(p=>p.y);
  const left = Math.round((Math.min(...xs)+Math.max(...xs))/2-size/2);
  const top = Math.round((Math.min(...ys)+Math.max(...ys))/2-size/2);
  canvas.style.transform = `translate3d(${left}px,${top}px,0)`;
  ctx.setTransform(ratio,0,0,ratio,0,0);
  ctx.clearRect(0,0,size,size);
  ctx.strokeStyle = color; ctx.lineWidth = .9; ctx.lineCap = 'round';
  for (const p of particles) {
    const age = Math.max(0,Math.min(1,(now-p.born)/p.life));
    ctx.save(); ctx.translate(p.x-left,p.y-top);
    ctx.rotate((p.glint?45:p.angle)*Math.PI/180);
    ctx.scale(1+age*.45,1+age*.45);
    ctx.globalAlpha = Math.min(1,age/.12)*Math.pow(1-age,1.7)*(p.glint ? .65 : .48);
    ctx.beginPath();
    if (p.glint) { ctx.moveTo(-2,0); ctx.lineTo(2,0); ctx.moveTo(0,-2); ctx.lineTo(0,2); }
    else { ctx.moveTo(-p.size/2,0); ctx.quadraticCurveTo(0,-2,p.size/2,0); }
    ctx.stroke(); ctx.restore();
  }
}

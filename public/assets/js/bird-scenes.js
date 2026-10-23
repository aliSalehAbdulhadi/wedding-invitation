// Small, curved visits in the artwork's own coordinates; the existing spring supplies inertia.
const routes = {
  hero: [[-.6,-.5],[1.2,-.9],[.8,.2],[.5,-.1]],
  rings: [[.17,.48],[.38,.7],[.65,.33],[.82,.47],[.72,.17]],
  date: [[.85,.33],[.66,.13],[.35,.08],[.18,.35],[.35,.12]],
  blossom: [[.7,.1],[.48,.18],[.5,.08],[.72,.05],[.67,.12]],
  lantern: [[.22,.28],[.45,.23],[.54,.16],[.75,.18],[.64,.24]],
  couple: [[.2,.37],[.37,.17],[.67,.15],[.79,.36],[.69,.33]],
  letter: [[.18,.12],[.43,.1],[.53,.19],[.6,.04],[.71,.15]],
  closing: [[.35,.02],[.39,-.09],[.52,.07],[.61,-.09],[.64,.02]],
};
const clamp = (n,a,b) => Math.min(b,Math.max(a,n));

export function makeBirdVisit(kind, rect, viewport, from, random = Math.random()) {
  const source = routes[kind] || routes.hero;
  const route = random>.5 ? [...source.slice(0,-1).reverse(),source.at(-1)] : source;
  const sway = (random-.5)*.08;
  const points = [from, ...route.map(([x,y]) => ({
    x: clamp(rect.left+(x+sway)*rect.width,30,Math.max(30,viewport.width-30)),
    y: clamp(rect.top+y*rect.height,58,Math.max(58,viewport.height-65)),
  }))];
  return { points, duration: 2100+random*500, kind };
}

export function sampleBirdVisit(points, progress) {
  const p = clamp(progress,0,1)*(points.length-1);
  const i = Math.min(points.length-2,Math.floor(p)), t=p-i;
  const a=points[Math.max(0,i-1)], b=points[i], c=points[i+1], d=points[Math.min(points.length-1,i+2)];
  const axis = key => .5*((2*b[key])+(-a[key]+c[key])*t+(2*a[key]-5*b[key]+4*c[key]-d[key])*t*t+(-a[key]+3*b[key]-3*c[key]+d[key])*t*t*t);
  return {x:axis('x'),y:axis('y')};
}

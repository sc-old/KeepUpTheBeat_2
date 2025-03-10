// Normalized parametric functions for geometries

function astroidalEllipsoid(u, v, target) {
  u = u * Math.PI * 2;
  v = (v - 0.5) * Math.PI;
  const x = Math.cos(u) * Math.cos(u) * Math.cos(u) * Math.cos(v) * Math.cos(v) * Math.cos(v);
  const y = Math.sin(u) * Math.sin(u) * Math.sin(u) * Math.cos(v) * Math.cos(v) * Math.cos(v);
  const z = Math.sin(v) * Math.sin(v) * Math.sin(v);
  return target.set(x, y, z);
}

function pillow(u, v, target) {
  u *= Math.PI;
  v *= 2 * Math.PI;
  let x = Math.cos(u);
  let y = Math.cos(v);
  let z = 0.5 * Math.sin(u) * Math.sin(v);
  return target.set(x, y, z);
}

function sineSurface(u, v, target) {
  u = u * Math.PI * 2;
  v = v * Math.PI * 2;
  const x = Math.sin(u);
  const y = Math.sin(v);
  const z = Math.sin(u + v);
  return target.set(x, y, z);
}

function romanSurface(u, v, target) {
  u *= Math.PI;
  v = v * Math.PI * 2;
  let x = 0.5 * Math.sin(2 * u) * Math.cos(v) ** 2;
  let y = 0.5 * Math.sin(u) * Math.sin(2 * v);
  let z = 0.5 * Math.cos(u) * Math.sin(2 * v);
  return target.set(x, y, z);
}

function twistedSphere(u, v, target) {
  u *= 2 * Math.PI;
  v *= Math.PI;
  const r = 0.5;
  const x = r * (2 + Math.sin(5 * u + 10 * v)) * Math.cos(u) * Math.sin(v);
  const y = r * (2 + Math.sin(5 * u + 10 * v)) * Math.sin(u) * Math.sin(v);
  const z = r * (2 + Math.sin(5 * u + 10 * v)) * Math.cos(v);
  return target.set(x, y, z);
}

function breather(u, v, target) {
  let a = 0.4;
  u = 26.4 * u - 13.2;
  v = 2 * v * 37.4 - 37.4;
  let b = Math.sqrt(0.84);
  let c = a * ((b * Math.cosh(a * u)) ** 2 + (a * Math.sin(b * v)) ** 2);
  let x = -u + (1.68 * Math.cosh(a * u) * Math.sinh(a * u)) / c;
  let y = (2 * b * Math.cosh(a * u) * (-b * Math.cos(v) * Math.cos(b * v) - Math.sin(v) * Math.sin(b * v))) / c;
  let z = (2 * b * Math.cosh(a * u) * (-b * Math.sin(v) * Math.cos(b * v) + Math.cos(v) * Math.sin(b * v))) / c;
  const scale = 0.2;
  return target.set(x * scale, z * scale, y * scale);
}

function bonanJeenerKlein(u, v, target) {
  u = u * Math.PI * 2;
  v = v * Math.PI * 2;
  const scale = 1/16;
  const x = scale * 16 * Math.pow(Math.sin(u), 3) * Math.cos(v);
  const y = scale * (-13 * Math.cos(u) + 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) + Math.cos(4 * u));
  const z = scale * -16 * Math.pow(Math.sin(u), 3) * Math.sin(v);
  return target.set(x, y, z);
}

function twistedTorus(u, v, target) {
  u *= 2 * Math.PI;
  v *= 2 * Math.PI;
  const scale = 0.25;
  var r = (Math.cos(v) ** 20 + Math.sin(v) ** 20) ** -0.05;
  var x = scale * (4 + r * Math.cos(v + 3 * u)) * Math.cos(u);
  var y = scale * (4 + r * Math.cos(v + 3 * u)) * Math.sin(u);
  var z = scale * r * Math.sin(v + 3 * u);
  return target.set(x, y, z);
}

function kleinBottle1(u, v, target) {
  u = u * Math.PI * 2;
  v = v * Math.PI * 2;
  const scale = 0.25;
  const x = scale * (2 + Math.cos(v / 2) * Math.sin(u) - Math.sin(v / 2) * Math.sin(2 * u)) * Math.cos(v);
  const y = scale * (2 + Math.cos(v / 2) * Math.sin(u) - Math.sin(v / 2) * Math.sin(2 * u)) * Math.sin(v);
  const z = scale * (Math.sin(v / 2) * Math.sin(u) + Math.cos(v / 2) * Math.sin(2 * u));
  return target.set(x, y, z);
}

function kleinBottle2(u, v, target) {
  u = u * (2 * Math.PI) - Math.PI;
  v = v * (2 * Math.PI) - Math.PI;
  const scale = 0.25;
  let x = scale * Math.cos(u) * (2 + Math.sin(v) * Math.cos(u) - (Math.sin(2 * v) * Math.sin(u)) / 2);
  let y = scale * (Math.sin(u) * Math.sin(v) + (Math.cos(u) * Math.sin(2 * v)) / 2);
  let z = scale * Math.sin(u) * (2 + Math.sin(v) * Math.cos(u) - (Math.sin(2 * v) * Math.sin(u)) / 2);
  return target.set(x, y, z);
}

export { 
  astroidalEllipsoid,
  pillow,
  sineSurface,
  romanSurface,
  twistedSphere,
  breather,
  bonanJeenerKlein,
  twistedTorus,
  kleinBottle1,
  kleinBottle2
};
// Vercel serverless endpoint — mirror of the local /api/order implementation,
// but WITHOUT writing to disk (Vercel's filesystem is read-only, and persisting
// orders isn't needed for the shared demo). It validates the payload and echoes
// the computed order so the frontend's success flow works unchanged.

const WOOD = {
  sosna: { pricePerM3: 3200, pricePerM2: 900 },
  orzech: { pricePerM3: 9800, pricePerM2: 2600 },
};
const PRODUCTS = { regal: 1, blat: 1, stol: 1 };
const SHAPES = { okragly: 1, prostokatny: 1 };

const clamp = (v, min, max, fb) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return fb;
  return Math.min(max, Math.max(min, Math.round(n)));
};

function buildOrder(input) {
  const product = PRODUCTS[input.product] ? input.product : 'regal';
  const wood = WOOD[input.wood] ? input.wood : 'sosna';
  const woodLegs = WOOD[input.woodLegs] ? input.woodLegs : 'sosna';
  const base = {
    order_id: 'ZAM-' + Date.now().toString(36).toUpperCase(),
    created_at: new Date().toISOString(),
    product, wood,
  };

  if (product === 'blat') {
    const width = clamp(input.width, 60, 360, 240);
    const depth = clamp(input.depth, 40, 90, 60);
    const thickness = clamp(input.thickness, 2, 6, 4);
    const price = Math.round((width / 100) * (depth / 100) * WOOD[wood].pricePerM2 + 200);
    return { ...base, width_cm: width, depth_cm: depth, thickness_cm: thickness, price_pln: price };
  }
  if (product === 'stol') {
    const shape = SHAPES[input.shape] ? input.shape : 'okragly';
    const height = clamp(input.height, 70, 110, 75);
    const topT = 0.04;
    const legsVol = 4 * (0.06 * 0.06 * (height / 100 - topT));
    let topVol, fields;
    if (shape === 'okragly') {
      const diameter = clamp(input.diameter, 60, 160, 100);
      const r = diameter / 200;
      topVol = Math.PI * r * r * topT;
      fields = { diameter_cm: diameter };
    } else {
      const width = clamp(input.width, 70, 120, 90);
      const length = clamp(input.length, 120, 260, 180);
      topVol = (width / 100) * (length / 100) * topT;
      fields = { width_cm: width, length_cm: length };
    }
    const price = Math.round(topVol * WOOD[wood].pricePerM3 + legsVol * WOOD[woodLegs].pricePerM3 + 250);
    return { ...base, shape, wood_legs: woodLegs, height_cm: height, ...fields, price_pln: price };
  }

  const width = clamp(input.width, 30, 240, 80);
  const height = clamp(input.height, 20, 200, 120);
  const depth = clamp(input.depth, 15, 50, 30);
  const shelves = clamp(input.shelves, 1, 8, Math.max(1, Math.round(height / 35)));
  const volume = (width / 100) * (height / 100) * (depth / 100);
  const price = Math.round(volume * WOOD[wood].pricePerM3 + 120);
  return { ...base, width_cm: width, height_cm: height, depth_cm: depth, shelves, price_pln: price };
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return Response.json(
        { ok: false, error: 'Method Not Allowed' },
        { status: 405, headers: { Allow: 'POST' } },
      );
    }

    let input;
    try {
      input = await request.json();
    } catch {
      return Response.json(
        { ok: false, error: 'Nieprawidłowe dane.' },
        { status: 400 },
      );
    }

    try {
      const order = buildOrder(input && typeof input === 'object' ? input : {});
      return Response.json({ ok: true, order });
    } catch (err) {
      console.error('Order error:', err);
      return Response.json(
        { ok: false, error: 'Nie udało się złożyć zamówienia.' },
        { status: 500 },
      );
    }
  },
};

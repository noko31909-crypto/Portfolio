// Line drawings for each part category, on a 48×48 grid. Used in place of a photo
// when a listing has none.

const circle = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

export const CATEGORY_ICONS = {
  // Motor can with output shaft and mounting face
  motors: ['M10 16h22v16H10z', 'M32 20h4v8h-4', 'M36 24h6', 'M14 16v16', 'M18 16v16'],
  // Servo body with horn
  servos: ['M8 18h28v16H8z', 'M4 22h4v8H4', 'M36 22h4v8h-4', circle(28, 14, 4), 'M22 14h12'],
  // Hub: board with ports
  control: ['M6 10h36v28H6z', 'M12 16h6v4h-6z', 'M22 16h6v4h-6z', 'M32 16h4v4h-4z', 'M12 28h24', 'M12 32h16'],
  // Sensor: lens in a housing
  sensors: ['M10 12h28v24H10z', circle(24, 24, 7), circle(24, 24, 2)],
  // Battery pack with leads
  batteries: ['M8 16h28v18H8z', 'M36 22h4v6h-4', 'M16 25h6', 'M19 22v6', 'M27 25h4'],
  // U-channel with hole row
  structure: ['M6 14h36v20H6z', 'M6 20h36', circle(12, 27, 2), circle(20, 27, 2), circle(28, 27, 2), circle(36, 27, 2)],
  // Gear
  motion: [
    'M24 8v5M24 35v5M8 24h5M35 24h5M12.7 12.7l3.5 3.5M31.8 31.8l3.5 3.5M12.7 35.3l3.5-3.5M31.8 16.2l3.5-3.5',
    circle(24, 24, 11),
    circle(24, 24, 4),
  ],
  // Mecanum wheel with angled rollers
  wheels: [circle(24, 24, 16), circle(24, 24, 4), 'M14 12l6 6M30 30l6 6M12 30l6-6M30 18l6-6'],
  // Slide: nested rails
  linear: ['M4 18h40v12H4z', 'M10 22h28v4H10z', 'M38 14v20'],
  // Socket head screw
  hardware: ['M16 8h16v8H16z', 'M22 12h4', 'M20 16v22l4 4 4-4V16', 'M20 22l8 3M20 28l8 3'],
  // Connector with cable
  cables: ['M14 18h12v12H14z', 'M26 22h6M26 26h6', 'M14 24H8c-4 0-4 10 4 10h20'],
  // Box
  other: ['M8 16l16-8 16 8v18l-16 8-16-8z', 'M8 16l16 8 16-8', 'M24 24v18'],
};

export function iconForCategory(category) {
  return CATEGORY_ICONS[category] ?? CATEGORY_ICONS.other;
}

export const UI_ICONS = {
  search: [circle(21, 21, 12), 'M30 30l11 11'],
  swap: ['M14 10v28', 'M8 32l6 6 6-6', 'M34 38V10', 'M28 16l6-6 6 6'],
  telegram: ['M6 22l34-14-6 32-12-9', 'M22 31l-4 9v-12l16-13'],
  close: ['M12 12l24 24M36 12L12 36'],
  filter: ['M6 12h36', 'M12 24h24', 'M18 36h12'],
};

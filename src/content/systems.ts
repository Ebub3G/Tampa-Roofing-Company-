/**
 * DRAFT FOR OWNER REVIEW. Generic, accurate descriptions with no performance
 * numbers. Layer names describe a typical assembly; actual specifications
 * vary by building, manufacturer and code requirements.
 */

export type Layer = { name: string; note: string; tone: 'deck' | 'insulation' | 'board' | 'ply' | 'membrane' | 'surface' | 'metal' | 'frame' };

export type RoofSystem = {
  id: string;
  name: string;
  summary: string;
  fit: string;
  layers: Layer[]; // bottom to top
};

export const systems: RoofSystem[] = [
  {
    id: 'built-up',
    name: 'Built-Up',
    summary:
      'Several plies of reinforcing felt laid in hot asphalt, finished with a flood coat and gravel. The redundancy of multiple layers is the point: one damaged ply does not mean a leak.',
    fit: 'Low-slope roofs where a proven, layered assembly is preferred.',
    layers: [
      { name: 'Structural deck', note: 'Steel, concrete or wood deck that carries the roof.', tone: 'deck' },
      { name: 'Insulation board', note: 'Rigid insulation that also gives the plies a uniform base.', tone: 'insulation' },
      { name: 'Base sheet', note: 'The first ply, fastened or adhered to the substrate.', tone: 'ply' },
      { name: 'Ply sheets in hot asphalt', note: 'Multiple reinforcing plies, each mopped in asphalt.', tone: 'membrane' },
      { name: 'Flood coat and gravel', note: 'Protects the plies from sun and foot traffic.', tone: 'surface' },
    ],
  },
  {
    id: 'modified',
    name: 'Modified',
    summary:
      'Modified bitumen: asphalt blended with polymers for flexibility, applied in factory-made rolls over a base sheet. Fewer layers than built-up, with a granule-surfaced cap.',
    fit: 'Low-slope roofs that see temperature swings and some foot traffic.',
    layers: [
      { name: 'Structural deck', note: 'The existing or new roof deck.', tone: 'deck' },
      { name: 'Insulation and cover board', note: 'Insulation, topped with a board that resists denting.', tone: 'insulation' },
      { name: 'Base sheet', note: 'Anchors the system and backs up the cap sheet.', tone: 'ply' },
      { name: 'Modified cap sheet', note: 'Polymer-modified membrane with a mineral granule surface.', tone: 'membrane' },
    ],
  },
  {
    id: 'cold-applied',
    name: 'Cold Applied',
    summary:
      'A multi-ply assembly bonded with cold adhesives instead of hot asphalt or torches. Useful where open flame or kettle fumes are a concern for occupied buildings.',
    fit: 'Occupied buildings where flame and fumes need to be avoided.',
    layers: [
      { name: 'Structural deck', note: 'The roof deck.', tone: 'deck' },
      { name: 'Insulation board', note: 'Rigid insulation fastened to the deck.', tone: 'insulation' },
      { name: 'Base ply', note: 'The first reinforcing layer.', tone: 'ply' },
      { name: 'Cold adhesive and plies', note: 'Plies set in adhesive applied at ambient temperature.', tone: 'membrane' },
      { name: 'Cap sheet or coating', note: 'A surfaced cap sheet or reflective coating on top.', tone: 'surface' },
    ],
  },
  {
    id: 'tpo',
    name: 'TPO',
    summary:
      'A single-ply thermoplastic membrane with seams welded by hot air, so the seams become one piece with the sheet. Usually white, which reflects sunlight.',
    fit: 'Large low-slope roofs such as warehouses and retail.',
    layers: [
      { name: 'Structural deck', note: 'Usually steel or concrete on commercial buildings.', tone: 'deck' },
      { name: 'Insulation board', note: 'Rigid insulation sets the thermal value of the roof.', tone: 'insulation' },
      { name: 'Cover board', note: 'Protects the insulation and gives the membrane a firm base.', tone: 'board' },
      { name: 'TPO membrane', note: 'Fastened or adhered, with heat-welded seams.', tone: 'membrane' },
    ],
  },
  {
    id: 'metal',
    name: 'Metal',
    summary:
      'Metal panels on structural framing, either new or restored. On existing metal buildings, restoration coatings can extend service where the panels are still sound.',
    fit: 'Sloped metal buildings, and metal roofs worth restoring rather than replacing.',
    layers: [
      { name: 'Structural framing', note: 'Purlins or a solid deck that the panels attach to.', tone: 'frame' },
      { name: 'Underlayment or insulation', note: 'Moisture and thermal layer beneath the panels.', tone: 'insulation' },
      { name: 'Metal panels', note: 'Standing seam or through-fastened panels.', tone: 'metal' },
      { name: 'Seams, fasteners and coating', note: 'The details that keep water out; coatings when restoring.', tone: 'surface' },
    ],
  },
];

/** Legend swatch colours, matched to the cross-section fills. */
export const SWATCH: Record<Layer['tone'], string> = {
  deck: '#6b7c89', frame: '#6b7c89', insulation: '#e4dcc8', board: '#c9d1d7',
  ply: '#8c6f3e', membrane: '#B38A3C', surface: '#7d8b96', metal: '#a9bccb',
};

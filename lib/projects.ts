export type MediaItem = {
  type: 'image' | 'glb';
  src: string;
  alt: string;
  label?: string;
  category?: string;
  rotate?: number;
};

export type Project = {
  id: string;
  title: string;
  semester: string;
  year: number;
  season: 'Spring' | 'Fall';
  order: number;
  shortDescription: string;   // shown in collapsed card
  longDescription: string;    // shown only when expanded
  tags: string[];
  media: MediaItem[];
  wip?: boolean;
  coverOverride?: string;
  titleImage?: string; // shown to the right of expanded description
};

const BASE = 'https://raw.githubusercontent.com/rottenb73-art/portfolio_images/main';
const enc = (s: string) => s.split('/').map(encodeURIComponent).join('/');
const img = (path: string) => `${BASE}/${enc(path)}`;

export const projects: Project[] = [
  {
    id: 'mid-rise-complex',
    title: 'Mid Rise Complex',
    semester: 'Spring 2026',
    year: 2026,
    season: 'Spring',
    order: 4,
    wip: true,
    shortDescription: 'Residential complex composed of modular units.',
    longDescription: 'A residential complex composed of modular units currently in development. Exploring density, verticality, and the relationship between public ground-floor programming and private residential above.',
    tags: ['Mixed-Use', 'Urban Density'],
    coverOverride: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Drawings/comprehensive plan.jpg')}`,
    media: [
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Drawings/comprehensive plan.jpg')}`, alt: 'Comprehensive Plan', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Drawings/Axonometric Section.jpeg')}`, alt: 'Axonometric Section', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Drawings/birdseye drawing-02.jpg')}`, alt: 'Birdseye Drawing', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Art Progression/pattern12314-07.jpg')}`, alt: 'Pattern Study', category: 'Art Progression' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Art Progression/1.jpg')}`, alt: 'Art Progression Study', category: 'Art Progression' },
    ],
  },
  {
    id: 'bath-house',
    title: 'Bath House',
    semester: 'Fall 2025',
    year: 2025,
    season: 'Fall',
    order: 3,
    shortDescription: 'Modern day public bath house project.',
    longDescription: 'Designed to serve as a contemporary civic anchor, the bathhouse draws on the ritual and communal heritage of public bathing — organized around light, material warmth, and procession through water.',
    tags: ['Public Building', 'Civic', 'Materiality'],
    coverOverride: `${BASE}/${enc('BATH HOUSE, Fall 2025/diagramcroppreview.jpg')}`,
    media: [
      // 3 showcase panels shown side by side
      {
        type: 'image',
        src: `${BASE}/${enc('BATH HOUSE, Fall 2025/SHOWCASE PANELS (PUT THESE SIDE BY SIDE IN ORDER)/F25_205_Blakely_Pettiette_Loe_Elkins_Panel1.jpg')}`,
        alt: 'Panel 1', category: 'Showcase Panels',
      },
      {
        type: 'image',
        src: `${BASE}/${enc('BATH HOUSE, Fall 2025/SHOWCASE PANELS (PUT THESE SIDE BY SIDE IN ORDER)/F25_205_Blakely_Pettiette_Loe_Elkins_Panel2.jpg')}`,
        alt: 'Panel 2', category: 'Showcase Panels',
      },
      {
        type: 'image',
        src: `${BASE}/${enc('BATH HOUSE, Fall 2025/SHOWCASE PANELS (PUT THESE SIDE BY SIDE IN ORDER)/F25_205_Blakely_Pettiette_Loe_Elkins_TrinityBathhouse_OBLIQUE+PERSPECTIVE Panel 3.jpg')}`,
        alt: 'Panel 3 — Oblique Perspective', category: 'Showcase Panels',
      },
      // Model pics in sub-frames
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/model1.png')}`, alt: 'Physical Model — View 1', category: 'Model Pics' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/model2.png')}`, alt: 'Physical Model — View 2', category: 'Model Pics' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/model3.png')}`, alt: 'Physical Model — View 3', category: 'Model Pics' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/model4.png')}`, alt: 'Physical Model — View 4', category: 'Model Pics' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Extra images/FINAL DIAGRAM PAGE.png')}`, alt: 'Final Diagram', category: 'Extra Images' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Extra images/ViewCapture20250206_162337.png')}`, alt: 'View Capture', category: 'Extra Images' },
    ],
  },
  {
    id: 'riverside-residential',
    title: 'Riverside Residential',
    semester: 'Spring 2025',
    year: 2025,
    season: 'Spring',
    order: 2,
    shortDescription: 'Single-family residence integrating with the surrounding landscape.',
    longDescription: `Situated on the southern bank of the Riverside in WA, this single-family residence rejects any pure platonic form and embraces a series of volumes, voids, and angular folds that respond to the site's dramatic topography and the natural movement of water and light. The design draws inspiration from geological strata — horizontal layers that fracture, shift, and tilt over time.

In contradiction to the downward pull of the floor, the roof is angled to pull space circulation and light up the slope. Our roof design is inspired by the Dancing Light House by Kendle Design Collaborative. However, our roof responds to our site and organizations of social to private spaces in the angles each roof plane is tilted. The roof towards the front is the highest tilted angle up while the lowest step has a less inclined roof. This allows for a better feeling of refuge in the private spaces and allows less cover and more light in the social spaces. The roof is supported by a few columns but mainly monolithic masses. The masses are meant to serve as geological and boulder-like in correlation to the surrounding volcanoes and mountains.`,
    coverOverride: `${BASE}/${enc('gif previews/translatedgif.gif')}`,
    titleImage: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Riverside Full Model including neighbors (Next to project description maybe).jpg')}`,
    tags: ['Residential', 'Landscape Integration', 'Single Family'],
    media: [
      // Graphic first in drawings category
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/riversidehousegraphic.jpg')}`, alt: 'House Graphic', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Front Elevation.jpg')}`, alt: 'Front Elevation', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Back elevation.jpg')}`, alt: 'Back Elevation', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Left elevation.jpg')}`, alt: 'Left Elevation', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Right elevation.jpg')}`, alt: 'Right Elevation', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Plan.jpg')}`, alt: 'Floor Plan', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Sections-01.png')}`, alt: 'Section 01', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Sections-02.png')}`, alt: 'Section 02', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/House Model Pics/riversidehousemod1.jpg')}`, alt: 'House Model — View 1', category: 'House Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/House Model Pics/riversidehousemod2.jpg')}`, alt: 'House Model — View 2', category: 'House Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/House Model Pics/riversidehousemod3.jpg')}`, alt: 'House Model — View 3', category: 'House Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/House Model Pics/riversidehousemod4.jpg')}`, alt: 'House Model — View 4', category: 'House Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/House Model Pics/riversidehousemod5.jpg')}`, alt: 'House Model — View 5', category: 'House Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Chunk Model Pics/riversidechunkmod1.jpg')}`, alt: 'Chunk Model — View 1', category: 'Chunk Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Chunk Model Pics/riversidechunkmod2.jpg')}`, alt: 'Chunk Model — View 2', category: 'Chunk Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Chunk Model Pics/riversidechunkmod3.jpg')}`, alt: 'Chunk Model — View 3', category: 'Chunk Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Chunk Model Pics/riversidechunkmod4.jpg')}`, alt: 'Chunk Model — View 4', category: 'Chunk Model' },
      // Site Model Pics
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Site Model Pics/riversidemodelview1.jpg')}`, alt: 'Site Model — View 1', category: 'Site Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Site Model Pics/riversidemodelview2.jpg')}`, alt: 'Site Model — View 2', category: 'Site Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Site Model Pics/riversidemodelview3.jpg')}`, alt: 'Site Model — View 3', category: 'Site Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Abstract Drawing Progression/ViewCaptureFront.png')}`, alt: 'View Capture — Front', category: 'Abstract Drawing Progression' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Abstract Drawing Progression/ViewCaptureLeft.png')}`, alt: 'View Capture — Left', category: 'Abstract Drawing Progression' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Abstract Drawing Progression/ViewCaptureRight.png')}`, alt: 'View Capture — Right', category: 'Abstract Drawing Progression' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Abstract Drawing Progression/Fireplace1.png')}`, alt: 'Fireplace Study', category: 'Abstract Drawing Progression' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Abstract Drawing Progression/artistic comp.jpg')}`, alt: 'Artistic Composition', category: 'Abstract Drawing Progression' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Abstract Drawing Progression/capture 3d mass combination.png')}`, alt: '3D Mass Combination', category: 'Abstract Drawing Progression' },
    ],
  },
  {
    id: 'translation-of-space',
    title: 'Translation of Space',
    semester: 'Fall 2024',
    year: 2024,
    season: 'Fall',
    order: 1,
    shortDescription: 'Development of three spaces maintaining hierarchical order.',
    longDescription: `The project addresses the challenge of forming 3 hierarchical spaces by using a variety of carefully incorporated elements. Through this analysis of these elements, three internal logics are revealed; repetition, difference, and juxtaposition.

Repetition is apparent in the pattern shown in the gaps between the angled geometry. You will notice in the angled geometry a pattern of 8 feet solid, 8 foot gap, 8 feet solid, 4 foot gap, and then 4 feet solid. This pattern's proportions are inspired from my drawing in project 1. However, there is a slight difference in this pattern on the horizontal angled geometry where the last piece is another full 8 feet solid to match the proportions of elements nearby.

Under the same angled geometry, there is a 45 degree, negatively sloped shape that fits between the width of the gap of the above geometry. This shape is a juxtaposition by reversing the order of positive and negative space in the repeating pattern.

The project's primary mass was generated through a series of drawings and grids containing vertical, horizontal, and 45 degree lines. The organizing lines of the project appear similar to what is seen in the grid-like layout of the Geisel Library by William Pereira. However; in contrast to the Geisel, the angled lines, parallels and intersections are utilized to break up symmetry.

Despite this transgression of symmetry, the project is intentionally proportional in a more abstract, less strict way. The generative drawings utilized lines at 45 degree angles to create spiraling motion and cut through each corner of the drawings maintaining a 1:1 aspect ratio, which is an apparent repeating element in my drawing.

The new proportioning system of my model came from the rearrangement of simplified volumes that make up the massing. The lines that create these main volumes were then used as guiding lines for many elements.`,
    coverOverride: `${BASE}/${enc('gif previews/riversidegif.gif')}`,
    titleImage: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/fall 2024 TITLE IMAGE.png')}`,
    tags: ['Spatial Design', 'Phenomenology', 'Form Study'],
    media: [
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTS1pegg_Page_1.png')}`, alt: 'S&P Prints — Page 1', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTS1pegg_Page_2.png')}`, alt: 'S&P Prints — Page 2', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTS1pegg_Page_3.png')}`, alt: 'S&P Prints — Page 3', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTSpeg_Page_1.jpg')}`, alt: 'S&P Prints Peg — Page 1', category: 'Drawings', rotate: -90 },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTSpeg_Page_2.jpg')}`, alt: 'S&P Prints Peg — Page 2', category: 'Drawings', rotate: -90 },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTSpeg_Page_3.jpg')}`, alt: 'S&P Prints Peg — Page 3', category: 'Drawings', rotate: -90 },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Model Views/FP1.png')}`, alt: 'Model View 1', category: 'Model Views' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Model Views/FP2.png')}`, alt: 'Model View 2', category: 'Model Views' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Model Views/FP3.png')}`, alt: 'Model View 3', category: 'Model Views' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Model Views/FP4.png')}`, alt: 'Model View 4', category: 'Model Views' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Part 1, Abstract drawings grid/1.png')}`, alt: 'Abstract Drawing — 01', category: 'Abstract Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Part 1, Abstract drawings grid/2.jpg')}`, alt: 'Abstract Drawing — 02', category: 'Abstract Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Part 1, Abstract drawings grid/3.jpg')}`, alt: 'Abstract Drawing — 03', category: 'Abstract Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Part 1, Abstract drawings grid/4.jpg')}`, alt: 'Abstract Drawing — 04', category: 'Abstract Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Extra images/ViewCapture20241101_161028.png')}`, alt: 'View Capture — Nov 1 A', category: 'Extra Images' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Extra images/ViewCapture20241101_163543.png')}`, alt: 'View Capture — Nov 1 B', category: 'Extra Images' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Extra images/ViewCapture20241104_163057.png')}`, alt: 'View Capture — Nov 4', category: 'Extra Images' },
    ],
  },
];

export const COVER_PHOTO = `${BASE}/${enc('AYDENPETTIETTECOVERphoto.png')}`;
export const projectsSorted = [...projects].sort((a, b) => b.order - a.order);

export type MediaItem = {
  type: 'image' | 'glb';
  src: string;
  alt: string;
  label?: string;
  category?: string;
  rotate?: number;
  // Figure title shown in the project-page caption block; falls back to `alt`
  // when omitted. Keep `alt` as the plain accessibility description and use
  // `title` for the more editorial, professional figure title when they differ.
  title?: string;
  // Technical line (e.g. graphic scale, north arrow, model materials/scale).
  // Only set this once real scale/orientation info exists for the drawing —
  // an incorrect scale note is worse than none.
  technical?: string;
  // Figure description: what the image demonstrates, not just what it is.
  description?: string;
  // How the thumbnail fills its 16:10 cell in the plate grid. Defaults to
  // cropping, which is what keeps the grid reading as an even row. Set
  // 'contain' for a drawing whose title block or edges must survive — it will
  // float in its cell instead. The lightbox is always uncropped either way.
  fit?: 'cover' | 'contain';
  // Wall panels only: trim this fraction off the TOP of the sheet, for an
  // export that carries a band of empty page above the drawing. The panel
  // keeps its full width and loses only the top, so nothing of the drawing
  // itself is cut. Measured against the loaded image, so it still holds if the
  // sheet is re-exported at a different size.
  cropTop?: number;
  // Name of the grid area this plate occupies, when its category is given a
  // composition in the project's `plateLayouts`. Every plate in a composed
  // set needs one; a set with no layout ignores this and keeps the even row.
  area?: string;
  // Wall panels only: cap the panel's width and centre it instead of letting
  // it run edge to edge. The proportion is untouched, so this shrinks the
  // panel in both directions at once — the lever for a sheet that is already
  // cropped as tight as its content allows but still sits too large.
  maxWidth?: string;
};

/**
 * A composition for one category, in place of the even row of equal plates.
 *
 * `areas` is a CSS grid-template-areas value naming where each plate sits, and
 * `columns` the track sizes it is drawn against. `span` names the one area
 * that covers more than a single row: its plate fills its area rather than
 * holding the 16:10 proportion the others keep, which is what lets a lead
 * drawing run the full height of the smaller ones beside it.
 */
export type PlateLayout = { columns: string; areas: string; span?: string };

/**
 * Several categories drawn as one row rather than one row each.
 *
 * The sets keep their identity — each becomes a labelled cluster inside the
 * row — but they stop costing a full band of page apiece. For the supporting
 * material at the foot of a project (research, precedent, process) that is
 * the right trade: a reader wants to see it is there and what it covers, not
 * to scroll four separate sections of it.
 *
 * `title` is optional; without one the cluster labels carry the row on their
 * own, which is enough when the categories name themselves.
 */
export type PlateGroup = { title?: string; categories: string[] };

// Numbered program legend for a project's plans/sections/axons. Render the
// codes unobtrusively inside the drawing (Illustrator-side) and list them
// here so the same legend is reused across every drawing in the project.
export type ProgramLegendEntry = { code: string; label: string };

// Attribution for work that was not solely the author's — photography, model
// fabrication help, group partners (see portfolio review, "photography by
// (credit to group and people who helped)"). Rendered at the foot of the
// project page. Name real people only; an empty `names` array is dropped.
export type CreditEntry = { role: string; names: string[] };

// What the jury actually said at final review, kept beside the brief so the
// project's own claim and the response to it are read together (see portfolio
// review, "faculty review notes?"). One note per entry, in the words they were
// given in; `by` is optional and only worth setting when a note is a direct
// quote from a named critic.
export type ReviewNote = { note: string; by?: string };

// Standardized project information block (see portfolio review, "Create a
// consistent project information block"). Fields are optional and only
// rendered when present — leave a field out rather than filling it with a
// placeholder, since this information is presented to firms as fact.
export type ProjectMeta = {
  subtitle?: string;      // one-line conceptual subtitle, shown under the title
  studio?: string;        // e.g. "Intermediate Architectural Design / Housing Studio"
  institution?: string;
  degreePlan?: string;
  faculty?: string;
  location?: string;
  projectType?: string;
  workType?: string;      // e.g. "Individual" or "Team of 4"
  team?: string[];        // teammate names, excluding self
  myRole?: string;
  tools?: string[];
  brief?: string;         // ~75-125 word project thesis
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
  media: MediaItem[];
  wip?: boolean;
  coverOverride?: string;
  titleImage?: string; // shown to the right of expanded description
  meta?: ProjectMeta;
  programLegend?: ProgramLegendEntry[];
  credits?: CreditEntry[];
  finalReviewNotes?: ReviewNote[];
  // Compositions by category name. A category with no entry here is laid out
  // as an even row, which is still the case for all but one set.
  plateLayouts?: Record<string, PlateLayout>;
  // Categories to draw as one row instead of one row each. A category not
  // named here keeps its own row.
  plateGroups?: PlateGroup[];
};

const INSTITUTION = 'Texas A&M University';
const DEGREE_PLAN = 'Bachelor of Science in Architecture (BS-Arch)';

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
    shortDescription: 'Residential complex composed of modular units.',
    longDescription: '',
    meta: {
      subtitle: 'Mixed-Use Housing + Urban Density',
      institution: INSTITUTION,
      degreePlan: DEGREE_PLAN,
      location: 'Austin, Texas',
      projectType: 'Mixed-Use Housing',
    },
    coverOverride: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/rotating midrise preview gif.gif')}`,
    // The four supporting sets share one row: they are what backs the project
    // up rather than what it is, and four separate bands of them buried the
    // drawings above.
    plateGroups: [{ categories: ['Diagrams', 'Site Analysis', 'Precedents', 'Art Progression'] }],
    plateLayouts: {
      // Lead at 2fr against two 1fr columns, spanning both rows, so it stands
      // a full head taller than the four studies ranged to its right.
      Model: {
        columns: '2fr 1fr 1fr',
        areas: `"lead circ nw"
                "lead stack top"`,
        span: 'lead',
      },
    },
    media: [
      // Large Drawings — displayed side by side
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/LargeDrawings/comprehensive plan with renders and all updated for midterm.jpg')}`, alt: 'Comprehensive Plan', category: 'Large Drawings' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/LargeDrawings/birdseyeviewcoloredfinal.jpg')}`, alt: 'Birdseye View — Colored', category: 'Large Drawings' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/LargeDrawings/sectionfrpmdrivespring2026.jpg')}`, alt: 'Section from Drive', category: 'Large Drawings' },
      // Model — the sectional and massing sets read as one composed plate:
      // the front view leads at full height, the two sectional studies sit
      // beside it, and the two massing views stack at the right. The sectional
      // stair study and the north and south massing views are deliberately
      // not here; the set is these five.
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Chunk Model images/Front Viewchunk edited.png')}`, alt: 'Sectional Model — Front View', category: 'Model', area: 'lead' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Chunk Model images/circulationedited.png')}`, alt: 'Sectional Model — Circulation', category: 'Model', area: 'circ' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Chunk Model images/stackedunitsedited.png')}`, alt: 'Sectional Model — Stacked Units', category: 'Model', area: 'stack' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Massing Model images/NW edited.png')}`, alt: 'Massing — Northwest', category: 'Model', area: 'nw' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Massing Model images/TOP edited.png')}`, alt: 'Massing — Top', category: 'Model', area: 'top' },
      // Diagrams & Massing studies
      // Its title sits hard against both edges, so a crop to the cell eats it.
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/DiagramAndMassing/massingmovement diagram.jpg')}`, alt: 'Massing Movement Diagram', category: 'Diagrams', fit: 'contain' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/DiagramAndMassing/LandScapeLinesDiagram.png')}`, alt: 'Landscape Lines Diagram', category: 'Diagrams' },
      // Site Analysis
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Site Analysis, 2700 & 2800 S Lamar Blvd (Austin, TX 78704)/Height map-01.jpg')}`, alt: 'Height Map', category: 'Site Analysis' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Site Analysis, 2700 & 2800 S Lamar Blvd (Austin, TX 78704)/Noise Diagram-03.jpg')}`, alt: 'Noise Diagram', category: 'Site Analysis' },
      // Precedents
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Precedents/520 W 28th Zaha Hadid/zaha hadid plan-01-01-01.jpg')}`, alt: 'Zaha Hadid — 520 W 28th Plan', category: 'Precedents' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Precedents/Jenga Building/jenga circulation file-01.jpg')}`, alt: 'Jenga Building — Circulation', category: 'Precedents' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Precedents/Jenga Building/jenga unit diagram file-01.jpg')}`, alt: 'Jenga Building — Unit Diagram 01', category: 'Precedents' },
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Precedents/Jenga Building/jenga unit diagram file-02.jpg')}`, alt: 'Jenga Building — Unit Diagram 02', category: 'Precedents' },
      // Art Progression
      { type: 'image', src: `${BASE}/${enc('MID RISE COMPLEX, Spring 2026/Art Progression/pattern12314-07.jpg')}`, alt: 'Pattern Study', category: 'Art Progression' },
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
    longDescription: '',
    meta: {
      subtitle: 'A Modern Public Bathhouse',
      institution: INSTITUTION,
      degreePlan: DEGREE_PLAN,
      projectType: 'Public / Civic Building',
      workType: 'Team of 4',
      team: ['Blakely', 'Loe', 'Elkins'],
    },
    coverOverride: `${BASE}/${enc('BATH HOUSE, Fall 2025/bathhouse_animated.gif')}`,
    media: [
      // 3 showcase panels shown side by side
      {
        type: 'image',
        src: `${BASE}/${enc('BATH HOUSE, Fall 2025/SHOWCASE PANELS (PUT THESE SIDE BY SIDE IN ORDER)/F25_205_Blakely_Pettiette_Loe_Elkins_Panel1.jpg')}`,
        alt: 'Final Presentation Panel 1 of 3', category: 'Showcase Panels',
      },
      {
        type: 'image',
        src: `${BASE}/${enc('BATH HOUSE, Fall 2025/SHOWCASE PANELS (PUT THESE SIDE BY SIDE IN ORDER)/F25_205_Blakely_Pettiette_Loe_Elkins_Panel2.jpg')}`,
        alt: 'Final Presentation Panel 2 of 3', category: 'Showcase Panels',
      },
      {
        type: 'image',
        src: `${BASE}/${enc('BATH HOUSE, Fall 2025/SHOWCASE PANELS (PUT THESE SIDE BY SIDE IN ORDER)/F25_205_Blakely_Pettiette_Loe_Elkins_TrinityBathhouse_OBLIQUE+PERSPECTIVE Panel 3.jpg')}`,
        alt: 'Final Presentation Panel 3 of 3 — Oblique Perspective', category: 'Showcase Panels',
      },
      // Model pics in sub-frames
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/model1.png')}`, alt: 'Physical Model — View 1', category: 'Physical Model' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/model2.png')}`, alt: 'Physical Model — View 2', category: 'Physical Model' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/model3.png')}`, alt: 'Physical Model — View 3', category: 'Physical Model' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/model4.png')}`, alt: 'Physical Model — View 4', category: 'Physical Model' },
      // Sectional Model pics
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/chunkmodel1.jpg')}`, alt: 'Sectional Model — View 1', category: 'Sectional Model' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/chunkmodel2.jpg')}`, alt: 'Sectional Model — View 2', category: 'Sectional Model' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/chunkmodel3.jpg')}`, alt: 'Sectional Model — View 3', category: 'Sectional Model' },
      { type: 'image', src: `${BASE}/${enc('BATH HOUSE, Fall 2025/Model Pics/chunkmodel4.jpg')}`, alt: 'Sectional Model — View 4', category: 'Sectional Model' },
    ],
  },
  {
    id: 'riverside-residential',
    title: 'Riverside Residential',
    semester: 'Spring 2025',
    year: 2025,
    season: 'Spring',
    order: 2,
    shortDescription: 'Riverside single family houses that respond to the environment, site, and neighboring houses.',
    longDescription: `When tasked with developing a building to respond to a set site and environment it is essential to research. Our site in Sunriver, Oregon had many crucial factors to consider before developing a house. The climate, environment, and topography became our focus in our research. The area experiences a low amount of precipitation due to it being located in the rain shadow of surrounding mountains. This caused us to really take into consideration elements like a roof to respond to the climate. The area sits on a high desert plateau and our site has two rivers west of the property. With no budget, these site conditions asked us to think creatively throughout our design process.

To start our design process we began abstract compositions using the defining lines, angles, and shapes of airports across the world. Using trace paper, we could hand draw these compositions and connect shapes and lines based on the defining elements of a satellite view of an airport. These figure and ground drawings were then combined in our group and subject to be manipulated to however each member saw fit. Some saw plan conditions while others represented interesting sections and elevations. To further express what each group member was envisioning, we created three dimensional artifacts and extrusions. These projections started to form spaces of habitation and the formation of a plan view of a building. Inspiration from the group's drawings is present throughout our building. Some pieces are exact shapes extruded as well as inspiration in some of our more monolithic supporting elements. In response to the site being sloped on a riverside, we decided on making our house step down the slope in three layers to create different levels of spaces. The highest spaces serve as social areas and private spaces are found as you maneuver down towards the river.

In contradiction to the downward pull of the floor, the roof is angled to pull space circulation and light up the slope. Our roof design is inspired by the Dancing Light House by Kendle Design Collaborative. However, our roof responds to our site and organizations of social to private spaces in the angles each roof plane is tilted. The roof towards the front is the highest tilted angle up while the lowest step has a less inclined roof. This allows for a better feeling of refuge in the private spaces and allows less cover and more light in the social spaces. The roof is supported by a few columns but mainly monolithic masses. The masses are meant to serve as geological and boulder-like in correlation to the surrounding volcanoes and mountains.`,
    coverOverride: `${BASE}/${enc('gif previews/translatedgif.gif')}`,
    titleImage: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Riverside Full Model including neighbors (Next to project description maybe).jpg')}`,
    meta: {
      subtitle: 'Site-Responsive Housing on a Sloped Riverside Lot',
      institution: INSTITUTION,
      degreePlan: DEGREE_PLAN,
      location: 'Sunriver, Oregon',
      projectType: 'Single-Family Residential',
      workType: 'Team',
      brief: 'Sited on a sloped riverside lot in Sunriver, Oregon, this single-family residence responds to a high-desert climate, two adjacent rivers, and a team-developed formal language derived from abstracted airport compositions. The house steps down the slope in three layers, moving from public social space at the top to private space near the river below. An angled roof — inspired by the Dancing Light House — pulls light and circulation up the incline, tilted most steeply at the social spaces and shallow at the private ones. Monolithic, boulder-like masses anchor the section, echoing the volcanic terrain beyond the site.',
    },
    finalReviewNotes: [
      { note: '“How do I say… schizophrenic nightmare”', by: 'David Jimenez Iniesta · Texas A&M' },
    ],
    media: [
      // Section 02 + House Graphic displayed side by side
      // Sections — both section sheets read together: 02 came out of the wall
      // set, 01 out of the elevations.
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Sections-02.png')}`, alt: 'Section 02', category: 'Sections', title: 'Building Section — Riverside Descent', description: 'The building steps down the riverside slope in three layers, placing shared social space at the highest level and private space nearest the river below.' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Sections-01.png')}`, alt: 'Section 01', category: 'Sections' },
      // The graphic keeps the full-bleed wall treatment on its own.
      // The sheet is 6267x2416 and its top 1032 rows (42.7%) are blank white;
      // the drawing runs from there to the bottom edge. 0.42 takes the blank
      // band and stops just short of the ink.
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/riversidehousegraphic.jpg')}`, alt: 'House Graphic', category: 'Graphic', cropTop: 0.42, maxWidth: '72rem' },
      // Model — house views 1, 2 and 5 with the fourth sectional view. The
      // other two house views and the first three sectional views are
      // deliberately not here; the set is these four.
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/House Model Pics/riversidehousemod1.jpg')}`, alt: 'House Model — View 1', category: 'Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/House Model Pics/riversidehousemod2.jpg')}`, alt: 'House Model — View 2', category: 'Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/House Model Pics/riversidehousemod5.jpg')}`, alt: 'House Model — View 5', category: 'Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Chunk Model Pics/riversidechunkmod4.jpg')}`, alt: 'Sectional Model — View 4', category: 'Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Front Elevation.jpg')}`, alt: 'Front Elevation', category: 'Elevations and Plan', description: "The roof's steepest pitch occurs above the highest, most public level, pulling light and circulation up the slope; the angle relaxes toward the lower, more private levels." },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Back elevation.jpg')}`, alt: 'Back Elevation', category: 'Elevations and Plan' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Left elevation.jpg')}`, alt: 'Left Elevation', category: 'Elevations and Plan' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Right elevation.jpg')}`, alt: 'Right Elevation', category: 'Elevations and Plan' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Drawings/Plan.jpg')}`, alt: 'Floor Plan', category: 'Elevations and Plan', description: "Massing and circulation carry forward the project's abstract drawing studies — extruded shapes and monolithic, boulder-like supporting elements informed by the surrounding volcanic terrain." },
      // Site Model Pics
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Site Model Pics/riversidemodelview1.jpg')}`, alt: 'Site Model — View 1', category: 'Site Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Site Model Pics/riversidemodelview2.jpg')}`, alt: 'Site Model — View 2', category: 'Site Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Site Model Pics/riversidemodelview3.jpg')}`, alt: 'Site Model — View 3', category: 'Site Model' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Abstract Drawing Progression/ViewCaptureFront.png')}`, alt: 'View Capture — Front', category: 'Abstract Drawing Progression', title: 'Digital Massing Study — Front View' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Abstract Drawing Progression/ViewCaptureLeft.png')}`, alt: 'View Capture — Left', category: 'Abstract Drawing Progression', title: 'Digital Massing Study — Left View' },
      { type: 'image', src: `${BASE}/${enc('RIVERSIDE RESIDENTIAL, Spring 2025/Abstract Drawing Progression/ViewCaptureRight.png')}`, alt: 'View Capture — Right', category: 'Abstract Drawing Progression', title: 'Digital Massing Study — Right View' },
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
    // The two study sets share one row at the foot of the page, the same
    // trade Mid Rise makes: these back the project up rather than being it.
    plateGroups: [{ categories: ['Abstract Drawings', 'Process Studies'] }],
    shortDescription: 'Development of three spaces maintaining hierarchical order.',
    longDescription: `The project addresses the challenge of forming 3 hierarchical spaces by using a variety of carefully incorporated elements. Through this analysis of these elements, three internal logics are revealed; repetition, difference, and juxtaposition.

Repetition is apparent in the pattern shown in the gaps between the angled geometry. You will notice in the angled geometry a pattern of 8 feet solid, 8 foot gap, 8 feet solid, 4 foot gap, and then 4 feet solid. This pattern's proportions are inspired from my drawing in project 1. However, there is a slight difference in this pattern on the horizontal angled geometry where the last piece is another full 8 feet solid to match the proportions of elements nearby.

Under the same angled geometry, there is a 45 degree, negatively sloped shape that fits between the width of the gap of the above geometry. This shape is a juxtaposition by reversing the order of positive and negative space in the repeating pattern.

The project's primary mass was generated through a series of drawings and grids containing vertical, horizontal, and 45 degree lines. The organizing lines of the project appear similar to what is seen in the grid-like layout of the Geisel Library by William Pereira. However; in contrast to the Geisel, the angled lines, parallels and intersections are utilized to break up symmetry.

Despite this transgression of symmetry, the project is intentionally proportional in a more abstract, less strict way. The generative drawings utilized lines at 45 degree angles to create spiraling motion and cut through each corner of the drawings maintaining a 1:1 aspect ratio, which is an apparent repeating element in my drawing.

The new proportioning system of my model came from the rearrangement of simplified volumes that make up the massing. The lines that create these main volumes were then used as guiding lines for many elements.`,
    coverOverride: `${BASE}/${enc('gif previews/riversidegif.gif')}`,
    titleImage: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/fall 2024 TITLE IMAGE.png')}`,
    meta: {
      subtitle: 'Repetition, Difference, and Juxtaposition in Spatial Hierarchy',
      institution: INSTITUTION,
      degreePlan: DEGREE_PLAN,
      projectType: 'Formal / Spatial Study',
      workType: 'Individual',
      brief: 'This project develops three hierarchical spaces from a single generative logic of repetition, difference, and juxtaposition. A repeating pattern of solids and gaps — proportioned from an earlier drawing exercise — organizes an angled primary geometry, while a reversed, negatively sloped volume juxtaposes that same rhythm in negative space. The massing originated from a series of vertical, horizontal, and 45-degree drawings whose grid recalls the Geisel Library by William Pereira, though the angled lines intentionally break the library’s symmetry. Despite this departure, the project maintains an abstract, self-referential proportioning system carried through from drawing into three-dimensional volume.',
    },
    media: [
      // Model Views first
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Model Views/FP1.png')}`, alt: 'Model View 1', category: 'Model Views', title: 'Primary Massing Study', description: "The model's primary mass is generated from a grid of vertical, horizontal, and 45-degree lines, producing a repeating rhythm of solid and gap that establishes the project's three hierarchical spaces." },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Model Views/FP2.png')}`, alt: 'Model View 2', category: 'Model Views', title: 'Primary Massing Study — View 2' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Model Views/FP3.png')}`, alt: 'Model View 3', category: 'Model Views', title: 'Primary Massing Study — View 3' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Model Views/FP4.png')}`, alt: 'Model View 4', category: 'Model Views', title: 'Primary Massing Study — View 4' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTS1pegg_Page_1.png')}`, alt: 'S&P Prints — Page 1', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTS1pegg_Page_2.png')}`, alt: 'S&P Prints — Page 2', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTS1pegg_Page_3.png')}`, alt: 'S&P Prints — Page 3', category: 'Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTSpeg_Page_1.jpg')}`, alt: 'S&P Prints Peg — Page 1', category: 'Drawings', rotate: -90 },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTSpeg_Page_2.jpg')}`, alt: 'S&P Prints Peg — Page 2', category: 'Drawings', rotate: -90 },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Drawings/S&P PRINTSpeg_Page_3.jpg')}`, alt: 'S&P Prints Peg — Page 3', category: 'Drawings', rotate: -90 },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Part 1, Abstract drawings grid/1.png')}`, alt: 'Abstract Drawing — 01', category: 'Abstract Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Part 1, Abstract drawings grid/2.jpg')}`, alt: 'Abstract Drawing — 02', category: 'Abstract Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Part 1, Abstract drawings grid/3.jpg')}`, alt: 'Abstract Drawing — 03', category: 'Abstract Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Part 1, Abstract drawings grid/4.jpg')}`, alt: 'Abstract Drawing — 04', category: 'Abstract Drawings' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Extra images/ViewCapture20241101_161028.png')}`, alt: 'View Capture — Nov 1 A', category: 'Process Studies', title: 'Massing Development — November 1 (A)' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Extra images/ViewCapture20241101_163543.png')}`, alt: 'View Capture — Nov 1 B', category: 'Process Studies', title: 'Massing Development — November 1 (B)' },
      { type: 'image', src: `${BASE}/${enc('TRANSLATION OF SPACE, Fall 2024/Extra images/ViewCapture20241104_163057.png')}`, alt: 'View Capture — Nov 4', category: 'Process Studies', title: 'Massing Development — November 4' },
    ],
  },
];

export const COVER_PHOTO = `${BASE}/${enc('AYDENPETTIETTECOVERphoto.png')}`;
export const projectsSorted = [...projects].sort((a, b) => b.order - a.order);

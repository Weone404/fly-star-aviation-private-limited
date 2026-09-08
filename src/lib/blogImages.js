/**
 * Illustration plan for the blog, one entry per image.
 *
 * This file is the single source for three things that used to live apart: what
 * each image is meant to show, the prompt that produces it, and where it goes in
 * the article. `BLOG-IMAGE-PROMPTS.md` is generated from here by
 * `scripts/generate-image-prompts.mjs` — write prompts here, never there.
 *
 * An image with `ready: false` renders nothing in production. In `npm run dev`
 * it renders a placeholder card carrying its own prompt, so the gaps are visible
 * exactly where the picture will go. Generate the file, drop it at `file`, flip
 * `ready` to true.
 *
 * `after` places an inline image after the Nth `<h2>` of the article body
 * (1-based). A cover has no `after`.
 *
 * House style is appended to every prompt at generation time, so no prompt below
 * repeats it. Two rules inside it matter more than the rest: **no text anywhere
 * in the image** — generated lettering is always subtly wrong and a screenshot of
 * a wrong figure is worse than no picture on a page whose whole claim is that its
 * figures are checked — and a consistent flat-vector treatment, so fourteen posts
 * look like one publication.
 */


export const HOUSE_STYLE =
  'Flat vector illustration, minimal clean style, professional Indian aviation training context, ' +
  'deep green and warm amber accents on a light neutral ground, generous negative space, ' +
  'absolutely NO text, words, letters, numbers or signage anywhere in the image. 1200 x 675.'

/** @type {Record<string, import("../types/blog").BlogImage[]>} */
export const BLOG_IMAGES = {
  'dgca-exam-fees': [
    {
      slot: 'cover',
      file: '/blog/dgca-exam-fees-cover.webp',
      alt: 'A single coin dropping into a slot beside a sealed examination envelope.',
      prompt:
        'A single stylised coin falling into a narrow slot on a plain payment terminal, beside a sealed examination envelope. One coin only, mid-air, casting a soft shadow. The composition should read as a single non-refundable payment rather than a pile of money.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/dgca-exam-fees-four-papers.webp',
      alt: 'Four identical examination papers in a row, each with its own small coin above it.',
      caption: 'Four papers, four separate fees.',
      prompt:
        'Four identical upright exam paper sheets in a neat row, each with one small coin hovering directly above it. Even spacing, flat perspective. The point is repetition: the same fee, four times.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/dgca-exam-fees-rejected.webp',
      alt: 'An application form marked with a cross, with the coin beside it already gone.',
      prompt:
        'A single application form on a desk with a bold cross mark stamped across a corner, and beside it an empty coin-shaped outline where a coin used to be. Quiet, matter-of-fact, not alarming. Conveys a fee that is not returned when a form is rejected.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/dgca-exam-fees-not-the-fee.webp',
      alt: 'Three cost blocks beside the exam fee, each a different size and none of them the fee.',
      caption: 'Class fees, books and travel are not the exam fee.',
      prompt:
        'One small labelled-free coin block on the left, separated by a clear vertical rule from three larger blocks of different heights on the right, each holding a small abstract icon: an open book, a classroom desk, a bus. The single small block is the point.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/dgca-exam-fees-before-you-pay.webp',
      alt: 'A short pre-payment checklist beside a payment button.',
      caption: 'The checks that are cheaper than a resit.',
      prompt:
        'A vertical stack of four rounded rows with empty tick boxes on the left, and to the right a single prominent rounded payment button shape. A thin arrow runs from the last row to the button, in that order.',
    },
  ],

  'dgca-exam-subjects-by-licence': [
    {
      slot: 'cover',
      file: '/blog/dgca-exam-subjects-cover.webp',
      alt: 'Three columns of stacked subject cards of different heights, side by side.',
      prompt:
        'Three vertical columns of stacked rounded cards, side by side, of clearly different heights — short, medium, tall. Flat isometric. Reads instantly as three licences examined on different numbers of subjects, with no labels of any kind.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/dgca-exam-subjects-overlap.webp',
      alt: 'Three overlapping circles showing subjects shared between the licences.',
      caption: 'Shared subjects sit in the overlap; the differences sit outside it.',
      prompt:
        'A clean three-circle Venn diagram, generous overlap, each circle a different flat tone from the palette. Small abstract icons scattered inside the regions — a compass rose, a cloud, a radio wave, a propeller — and nothing written anywhere.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/dgca-exam-subjects-sequence.webp',
      alt: 'A simple left-to-right path with numbered stops for sequencing the papers.',
      prompt:
        'A horizontal path with four evenly spaced circular stops, each holding a small abstract icon, connected by a thin dashed line that gets slightly bolder left to right. Suggests an order of attempt without naming any subject.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/dgca-exam-subjects-comparison-grid.webp',
      alt: 'A three-column grid comparing what each licence is examined on.',
      caption: 'One grid settles the three licences.',
      prompt:
        'A clean three-column comparison grid with a header band, rows of small abstract icons instead of any lettering, and one column subtly highlighted. Reads as a specification table with no text at all.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/dgca-exam-subjects-outside.webp',
      alt: 'A boundary line with two items placed outside it.',
      caption: 'Some requirements sit outside these papers entirely.',
      prompt:
        'A large rounded boundary shape containing four small icon tiles, and two further tiles sitting clearly outside the boundary with a soft gap between. Conveys scope: what these papers cover and what they do not.',
    },
  ],

  'dgca-exam-attempts-and-validity': [
    {
      slot: 'cover',
      file: '/blog/dgca-exam-validity-cover.webp',
      alt: 'Two hourglasses of visibly different sizes standing side by side.',
      prompt:
        'Two hourglasses side by side on a flat surface, one distinctly smaller than the other, sand part-run in both. The size difference is the entire idea: two validity windows, one half the length of the other.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/dgca-exam-validity-window.webp',
      alt: 'A horizontal time bar with a shaded window and a paper sitting inside it.',
      caption: 'A pass is only useful while its window is open.',
      prompt:
        'A long horizontal bar representing time, with one clearly shaded segment near the left and a small exam paper icon sitting inside that segment. Outside the shaded part the bar is pale. Flat, diagrammatic, no scale markings.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/dgca-exam-validity-stagger.webp',
      alt: 'Four papers placed at different points along a timeline, some overlapping.',
      prompt:
        'Four small exam paper icons placed at different positions along a horizontal timeline, each with a soft shaded bar extending to its right, the bars overlapping unevenly. Conveys staging attempts so the windows still overlap at the end.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/dgca-exam-attempts-no-limit.webp',
      alt: 'An open counter with no ceiling above it.',
      caption: 'What is published about attempts, and what is not.',
      prompt:
        'A vertical stack of identical small paper tiles rising upward, the topmost fading out into empty space rather than meeting a bar or a lid. Conveys an absence of a stated ceiling, calmly.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/dgca-exam-attempts-real-constraint.webp',
      alt: 'A door closing on a timeline while attempts continue.',
      caption: 'The constraint is the window, not the count.',
      prompt:
        'A horizontal timeline with several small paper icons along it, and a shutter descending at one point on the line. The icons to the right of the shutter are pale. Quiet, mechanical.',
    },
  ],

  'dgca-olode-vs-regular-exams': [
    {
      slot: 'cover',
      file: '/blog/dgca-olode-cover.webp',
      alt: 'Two doors side by side opening onto the same room.',
      prompt:
        'Two simple doorways standing side by side, one wide open and one ajar, both opening onto an identical plain room containing a single desk. Flat, symmetrical. Two routes, one destination.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/dgca-olode-calendar-vs-ondemand.webp',
      alt: 'A month grid with a few marked days beside a single always-open door.',
      caption: 'Scheduled sittings on one side, on-demand on the other.',
      prompt:
        'Left: a plain month grid of empty squares with three of them filled in a warm accent. Right: a single doorway standing open with a soft glow. A thin vertical divider between them. No numbers or day names anywhere in the grid.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/dgca-olode-same-rules.webp',
      alt: 'Two identical rulebooks, one on each side of a mirror line.',
      prompt:
        'Two identical closed books lying symmetrically either side of a faint vertical mirror line, drawn identically down to the binding. Emphasises that the rules do not change between the two routes.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/dgca-olode-eligibility-identical.webp',
      alt: 'Two identical entry gates, mirrored.',
      caption: 'Eligibility does not change with the route.',
      prompt:
        'Two identical archway gates mirrored across a faint vertical centre line, each with the same small figure approaching at the same distance. Perfect symmetry is the message.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/dgca-olode-before-you-book.webp',
      alt: 'A booking slot being selected from a row of open slots.',
      caption: 'What to settle before you book.',
      prompt:
        'A horizontal row of six identical open slot shapes, one of them highlighted and slightly raised with a soft glow, and a cursor-like arrow pointing to it. Flat, calm, no calendar numerals.',
    },
  ],

  'dgca-exam-misconceptions': [
    {
      slot: 'cover',
      file: '/blog/dgca-misconceptions-cover.webp',
      alt: 'Several speech bubbles crowding out one small verified document.',
      prompt:
        'A cluster of overlapping empty speech bubbles in muted grey filling most of the frame, and in front of them one small crisp document with a check-mark seal in the accent colour. Repetition versus a source. Bubbles must be completely empty.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/dgca-misconceptions-two-doors.webp',
      alt: 'Two entry gates of different heights, one much lower than the other.',
      caption: 'Two licences, two different entry requirements.',
      prompt:
        'Two simple archway gates side by side, one noticeably lower and narrower than the other, each with a small figure approaching. Conveys two different entry requirements without stating either.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/dgca-misconceptions-check-yourself.webp',
      alt: 'A magnifying glass held over an official-looking document.',
      prompt:
        'A magnifying glass held over a plain official document bearing only an abstract seal and faint horizontal placeholder lines that are clearly not readable text. Calm, instructional. Conveys checking a claim at its source.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/dgca-misconceptions-repetition.webp',
      alt: 'The same shape copied across a page, with one different.',
      caption: 'Repetition is not verification.',
      prompt:
        'A grid of twelve identical grey rounded tiles with one tile in a warm accent colour and a small check seal on it. The eleven identical tiles are copies of each other; the accented one is the source.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/dgca-misconceptions-age-open-door.webp',
      alt: 'An open doorway with no bar across it.',
      caption: 'No stated upper limit.',
      prompt:
        'A single wide open doorway with an empty horizontal bar shape lying discarded on the ground beside it, and a clear path leading through. Understated, no figures, no faces.',
    },
  ],

  'dgca-board-verification-certificate': [
    {
      slot: 'cover',
      file: '/blog/dgca-bvc-cover.webp',
      alt: 'A mark sheet with an embossed seal being handed across a counter.',
      prompt:
        'A single document with a raised circular seal in the corner being passed across a plain counter between two pairs of hands. Warm, procedural, unhurried. The seal is the subject.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/dgca-bvc-who-needs-it.webp',
      alt: 'Two queues, one routed through a verification desk and one going straight past.',
      caption: 'One route goes through verification; the other does not.',
      prompt:
        'Two simple paths drawn as flat arrows: the upper one detours through a small desk with a seal stamp on it, the lower one runs straight past. A few generic standing figures on each path.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/dgca-bvc-sequence.webp',
      alt: 'Four steps in a row, with the verification step highlighted early in the sequence.',
      prompt:
        'Four connected rounded rectangles in a horizontal row, the second one filled in the accent colour and slightly raised. Each holds a small abstract icon. Conveys that this step comes early, not late.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/dgca-bvc-documents-covered.webp',
      alt: 'A fanned set of four certificates, each with a corner seal.',
      caption: 'Which documents the certificate covers.',
      prompt:
        'Four rectangular certificate shapes fanned in a shallow arc, each with a small circular seal in the top corner and faint non-readable placeholder lines. Even, orderly, no lettering.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/dgca-bvc-international-route.webp',
      alt: 'A second, longer path branching off through an extra desk.',
      caption: 'An international qualification takes a longer route.',
      prompt:
        'A main horizontal path with a branch that loops downward through one additional desk marked with a small globe icon before rejoining. The branch is visibly longer than the main line.',
    },
  ],

  'cpl-eligibility-after-12th': [
    {
      slot: 'cover',
      file: '/blog/cpl-eligibility-cover.webp',
      alt: 'A school desk with two subject icons on it, and a runway visible through the window.',
      prompt:
        'A school desk by a window, two small abstract subject icons resting on it — an atom and a geometric compass — and through the window a runway with a light aircraft on it. Warm daylight, hopeful, uncluttered.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/cpl-eligibility-two-subjects.webp',
      alt: 'Two keys of different shapes fitting one lock.',
      caption: 'Two subjects, one requirement.',
      prompt:
        'Two distinct keys, one shaped around an atom motif and one around a geometric compass motif, both inserted into a single lock plate. Flat, symbolic, clean.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/cpl-eligibility-no-age-limit.webp',
      alt: 'Figures of visibly different ages standing at the same starting line.',
      prompt:
        'Four simple silhouetted figures of clearly different ages standing shoulder to shoulder at a single starting line on a runway. Equal footing, no hierarchy. No faces, no text.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/cpl-eligibility-pcm-myth.webp',
      alt: 'Three subject icons with one lifted away from the other two.',
      caption: 'Physics and Mathematics is not the same as PCM.',
      prompt:
        'Three small subject icons in a row — an atom, a geometric compass, a beaker — with the beaker lifted clearly out of the line and rendered pale grey. Neutral, no cross or prohibition mark.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/cpl-eligibility-first-steps.webp',
      alt: 'Three numbered steps leading from a school desk to a licence card.',
      caption: 'What to do first, while you are still in school.',
      prompt:
        'Three circular numbered stops connected by a thin line, starting at a school desk and ending at a blank licence card, with a small aircraft silhouette above the final stop.',
    },
  ],

  'atpl-eligibility-india': [
    {
      slot: 'cover',
      file: '/blog/atpl-eligibility-cover.webp',
      alt: 'Two licence cards stacked, the upper one resting on the lower.',
      prompt:
        'Two blank rounded licence cards, one resting on and slightly overlapping the other, the upper one raised on a subtle shadow. Conveys that the second is issued on top of the first. Cards entirely blank.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/atpl-oral-and-written.webp',
      alt: 'A written paper and a pair of facing chairs, side by side as two separate hurdles.',
      caption: 'The written papers and the oral are assessed separately.',
      prompt:
        'Left: a single exam paper on a desk. Right: two chairs facing each other across a small table. A thin divider between the halves, both halves given equal weight.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/atpl-twin-engine.webp',
      alt: 'A twin-engine aircraft silhouette beside a single-engine one, with the single greyed out.',
      prompt:
        'Two aircraft silhouettes side by side in flat profile: a twin-engine aircraft in full accent colour and a single-engine aircraft rendered in pale grey. Clear, calm contrast with no cross or prohibition symbol.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/atpl-eligibility-three-mistakes.webp',
      alt: 'Three stumbling points marked along an otherwise clear path.',
      caption: 'The three things people get wrong.',
      prompt:
        'A clean horizontal path with three small raised bumps along it, each marked by a subtle warm-toned marker, and a figure silhouette walking the path. Restrained, not alarming.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/atpl-eligibility-after-the-papers.webp',
      alt: 'A cleared paper handing over to a flight-hours logbook.',
      caption: 'The papers are one step, not the last one.',
      prompt:
        'An exam paper on the left with a check seal, an arrow to the right, and an open blank logbook with a small aircraft silhouette above it. Equal weight to both objects.',
    },
  ],

  'foreign-licence-conversion-checklist': [
    {
      slot: 'cover',
      file: '/blog/foreign-conversion-cover.webp',
      alt: 'A licence card passing between two stylised landmasses, with a clock behind it.',
      prompt:
        'A blank licence card in mid-air between two simplified abstract landmass shapes, with a large soft clock face behind it, low contrast. The clock is the quiet warning: conversion runs against time.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/foreign-conversion-currency-window.webp',
      alt: 'A closing window with flight hours stacked inside it.',
      caption: 'Currency is the clause that closes first.',
      prompt:
        'A window frame partly slid shut, and inside the remaining opening a small stack of horizontal bars representing logged hours. The narrowing gap carries the meaning. No numerals anywhere.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/foreign-conversion-order.webp',
      alt: 'A checklist with steps connected in a deliberate order.',
      prompt:
        'A vertical checklist of five rounded rows with empty tick boxes, connected by a thin line that loops from the third row back up to the first. Conveys an order of operations that is not simply top to bottom. Rows carry icons, never text.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/foreign-conversion-which-licences.webp',
      alt: 'Two licence cards accepted and one set aside.',
      caption: 'Which licences this route covers.',
      prompt:
        'Three blank licence cards: two grouped together and slightly raised, one set apart and pale. Clean spacing, no marks or symbols of rejection.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/foreign-conversion-not-waived.webp',
      alt: 'A gate that stays shut on one path while another opens.',
      caption: 'Conversion waives nothing on the examination side.',
      prompt:
        'Two parallel paths: the upper passes through an open gate, the lower meets a closed gate with an exam paper icon on it. Both paths continue beyond, so nothing is a dead end.',
    },
  ],

  'dgca-ground-classes-vs-self-study': [
    {
      slot: 'inline',
      after: 2,
      file: '/blog/ground-classes-cost-vs-time.webp',
      alt: 'Two scales balancing money against time.',
      caption: 'The trade is money against time, and it is not the same for everyone.',
      prompt:
        'A simple balance scale with a stack of coins on one pan and an hourglass on the other, tipped slightly, neither side clearly winning. Flat, symmetrical, calm.',
    },
    {
      slot: 'inline',
      after: 5,
      file: '/blog/ground-classes-hybrid-route.webp',
      alt: 'One path splitting and rejoining, with a shorter branch through a classroom.',
      prompt:
        'A single path that forks into two and rejoins further along; the upper branch passes through a small classroom block, the lower runs past a desk with a lamp. Both branches reach the same endpoint.',
    },
    {
      slot: 'cover',
      file: '/blog/ground-classes-vs-self-study-cover-v2.webp',
      alt: 'A classroom of students on one side and a single desk lamp on the other, divided by a soft line.',
      prompt:
        'A wide banner split by a soft vertical divider. Left: rows of simple seated figures facing a board. Right: one figure alone at a desk with a lamp and an open book. Same warm light on both halves, neither presented as better.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/ground-classes-what-you-pay-for.webp',
      alt: 'Four things bundled inside a package outline.',
      caption: 'What a ground-class fee actually buys.',
      prompt:
        'A large rounded package outline containing four small icon tiles — a board, a stack of notes, a clock, a headset — with generous space around them. The outline is what is being purchased.',
    },
    {
      slot: 'inline',
      after: 7,
      file: '/blog/ground-classes-six-month-plan.webp',
      alt: 'A six-segment arc with papers distributed unevenly across it.',
      caption: 'A plan that works on either route.',
      prompt:
        'A wide flat arc divided into six equal unlabelled segments, with small paper icons placed unevenly across them, two segments carrying two icons and two carrying none.',
    },
  ],

  'how-to-choose-dgca-ground-classes': [
    {
      slot: 'cover',
      file: '/blog/choose-ground-classes-cover.webp',
      alt: 'A hand holding a checklist in front of three identical institute buildings.',
      prompt:
        'Three identical simple institute buildings in a row, deliberately indistinguishable from one another, with a clipboard held up in the foreground bearing empty tick boxes. The point is that the buildings tell you nothing.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/choose-ground-classes-per-paper.webp',
      alt: 'A bundle of items beside the same items sold individually.',
      caption: 'A package and single papers are not the same purchase.',
      prompt:
        'Left: several rounded cards tied together with a band. Right: the same cards standing separately with small gaps between them. Equal visual weight to both sides.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/choose-ground-classes-red-flags.webp',
      alt: 'A row of small flags with one raised higher than the rest.',
      prompt:
        'A row of small triangular pennant flags on thin poles, all in muted grey except one in a warm accent standing noticeably taller. Restrained, not alarming.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/choose-ground-classes-not-approved.webp',
      alt: 'An approval seal with a line through the space where an institute would sit.',
      caption: 'The regulator approves examinations, not coaching.',
      prompt:
        'A circular official seal on the left connected by a thin line to an exam paper, and a second thin line reaching toward a small institute building but stopping short with a visible gap. The gap is the point.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/choose-ground-classes-timeline.webp',
      alt: 'A realistic timeline with four papers spread across it.',
      caption: 'What a realistic timeline looks like.',
      prompt:
        'A horizontal timeline with four small paper icons spaced unevenly, each with a soft shaded preparation bar of a different length leading up to it. Conveys that the papers are not evenly weighted.',
    },
  ],

  'how-to-choose-a-flying-school-in-india': [
    {
      slot: 'cover',
      file: '/blog/choose-flying-school-cover.webp',
      alt: 'A light aircraft on an apron with a logbook and a weather vane in the foreground.',
      prompt:
        'A single-engine training aircraft parked on an apron at golden hour, with an open blank logbook and a small weather vane in the foreground. The foreground objects are what the article is about; the aircraft is context.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/choose-flying-school-utilisation.webp',
      alt: 'Four aircraft in a row, two in the air and two grounded.',
      caption: 'A fleet on the ground is not a fleet.',
      prompt:
        'Four identical small aircraft: two shown airborne against a pale sky, two parked below with chocks at the wheels. Even spacing, flat treatment, no judgement implied.',
    },
    {
      slot: 'inline',
      after: 4,
      file: '/blog/choose-flying-school-weather.webp',
      alt: 'A year arc with some months shaded for weather that suppresses flying.',
      prompt:
        'A wide flat arc divided into twelve equal unlabelled segments, four of them shaded in a cool grey with small rain and haze motifs above them. Conveys a season that costs flying days.',
    },
    {
      slot: 'inline',
      after: 1,
      file: '/blog/choose-flying-school-approval-list.webp',
      alt: 'A regulator list on one side and a glossy brochure on the other.',
      caption: 'Check the list, not the brochure.',
      prompt:
        'Left: a plain official document with a circular seal and faint non-readable rows. Right: a glossy folded brochure with an aircraft silhouette on the cover. The plain document is lit; the brochure sits in shadow.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/choose-flying-school-logbook.webp',
      alt: 'An open logbook with a pen resting on a filled column.',
      caption: 'Records are the thing you are actually buying.',
      prompt:
        'An open double-page logbook in flat perspective with columns of faint non-readable ruling, one column subtly shaded, and a pen lying across it. Careful, administrative, unglamorous.',
    },
  ],

  'air-hostess-salary-in-india-2026': [
    {
      slot: 'inline',
      after: 1,
      file: '/blog/cabin-crew-pay-components.webp',
      alt: 'Stacked segments showing pay split into basic, flying allowance and layover allowance.',
      caption: 'Cabin crew pay is assembled from parts, not quoted as one number.',
      prompt:
        'A single vertical bar divided into three clearly different-sized flat colour segments, with a thin leader line from each segment to a small icon — a bank card, a wing, a suitcase. No figures or percentages anywhere.',
    },
    {
      slot: 'inline',
      after: 3,
      file: '/blog/cabin-crew-verify-offer.webp',
      alt: 'A magnifying glass over an offer letter with several unmarked questions beside it.',
      prompt:
        'A plain offer letter on a desk under a magnifying glass, with five small empty question-mark bubbles arranged down its right side. Faint placeholder lines on the letter that are clearly not readable text.',
    },
    {
      slot: 'cover',
      file: '/blog/cabin-crew-salary-cover-v2.webp',
      alt: 'A cabin crew silhouette beside a pay slip broken into three parts.',
      prompt:
        'A single cabin crew figure silhouette on the left in flat vector, and on the right a document divided into three stacked bands of different sizes. Calm, professional, no faces and no lettering.',
    },
    {
      slot: 'inline',
      after: 2,
      file: '/blog/cabin-crew-what-airlines-publish.webp',
      alt: 'A small published area beside a much larger unpublished one.',
      caption: 'What airlines publish, and what they do not.',
      prompt:
        'Two adjacent rectangles: a small solid one and a much larger one drawn only as a dashed outline. A thin label line points to each, ending in a small icon rather than any text.',
    },
    {
      slot: 'inline',
      after: 5,
      file: '/blog/cabin-crew-different-paths.webp',
      alt: 'Two paths diverging from one school gate, one to a cabin door and one to a cockpit.',
      caption: 'Cabin crew and pilot training are different paths.',
      prompt:
        'A single starting point that forks into two clearly separate paths, one ending at a cabin door outline and the other at a cockpit window outline. Equal visual weight, no hierarchy.',
    },
  ],
}

/**
 * Images planned for a post, in document order.
 * @param {string} [slug]
 * @returns {import("../types/blog").BlogImage[]}
 */
export function imagesFor(slug) {
  return (slug && BLOG_IMAGES[slug]) || []
}

/**
 * True when a post's `coverImage` is a stand-in rather than a picture of that
 * post's subject.
 *
 * Ten of the fourteen posts point at the same site-wide hero photograph and one
 * still points at a stock URL, so "has a cover" was never the same as "has its
 * own cover". Where the cover is generic the page shows the planned
 * illustration's placeholder instead — one shared aeroplane photo repeated down
 * a listing tells a reader nothing and tells a crawler less.
 */
export function isGenericCover(src) {
  if (!src) return true
  return /\/assets\/hero-aircraft|images\.unsplash\.com/.test(src)
}

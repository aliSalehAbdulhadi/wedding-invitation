# Design brief

## Starting direction: a modern heirloom

Create the feeling of opening considered wedding stationery: warm paper, expressive serif type, generous space, and a quiet botanical or monogram detail. The invitation should feel intimate and celebratory, with the couple's names and essential information at the center.

Apple's typography and layout guidance is a reference for hierarchy, clarity, adaptation, and care in interaction. Apply those qualities to the web; this is not an iOS interface. No Apple fonts or assets are bundled. The couple can change this direction as the brief develops.

## Visual decisions

- **Palette:** warm ivory background `#f8f5ef`, paper `#fffdf9`, deep olive ink `#30382f`, secondary ink `#62695e`, muted bronze ornament `#867044`, and soft line `#d7d5c9`.
- **Type:** an expressive serif for names and headings; a quiet sans serif for practical details. The starter uses installed fonts and fallbacks, with no network font dependency. If a custom font is chosen, keep its license, self-host WOFF2, and provide compatible fallbacks.
- **Hierarchy:** a short invitation line, the couple's names, wedding date and venue, then practical details and an RSVP action if requested. Do not fill the screen with equally loud elements.
- **Layout:** mobile first, centered ceremonial moments, narrow readable paragraphs, and generous section breathing room. Use a clear rhythm rather than an array of generic cards.
- **Decoration:** one coherent motif, such as a fine botanical line, an understated monogram, or a stationery border. Decorative strokes can be subtle; text and meaningful controls must remain readable.
- **Photography:** use supplied or appropriately licensed images with intentional crops and dimensions. Avoid unrelated stock photography. Load images responsively; do not lazy-load the primary hero image.
- **Motion:** optional, brief, and purposeful. Start with a still composition. If motion is added, favor opacity/transform, keep content visible without JS, and respect `prefers-reduced-motion`.

## Token conventions

Keep colors, type families, spacing, widths, and motion timing in `:root` in `public/assets/css/styles.css`. Use fluid type with `clamp()`, relative units, logical properties, and explicit line heights. Avoid fixed-height text containers.

The starter has 16px-or-larger body text, a 65-character reading measure, a 44px minimum control target, and strong ink on a light background. Bronze is decorative rather than the default color for small text. Verify actual foreground/background pairs when changing tokens.

## Avoid

- Generic SaaS layouts, unrelated gradients, glass panels, floating blobs, and heavy shadows.
- Multiple competing fonts, body copy in calligraphy, or letter-spacing applied indiscriminately to scripts such as Arabic.
- Tiny pale text, hidden navigation, custom cursors, mandatory entrance animations, and autoplay audio.
- Fake RSVP success, unnecessary account creation, or decoration that obscures event details.

## Design acceptance

The result should still feel like the same invitation at 320px and on a large screen. Check long names, multiple lines, 200% zoom, keyboard focus, and reduced motion. If localization is selected, test real copy in that language rather than translating only the labels.

Use the actual browser to evaluate the composition. Screenshots and tools support judgment; they do not replace checking the couple's brief and the reading experience.

## Current implementation direction

The approved direction is an ivory/olive/champagne invitation with an animated sealed envelope. After it, the page is a story told in six time-based chapters rather than scroll-scrubbed scenes: two orbits join and part when tapped; a wave of olive opens a celestial date dial whose 24 stars twinkle in a sweeping wave while a gold comet circles it; a night promise draws a constellation, with a moon, jasmine blooms and shooting stars; a golden-hour garden (peach sky, soft sun rays, gold conservatory arches, a reflecting pool, lanterns) responds to the pointer in parallax layers, with the venue details on an ivory stationery plaque that overlaps the artwork; a keepsake chapter reads as one centered story — title, an ivory-and-gold hall whose doors open onto a champagne ballroom where a couple in umber silhouette twirls against a sunset window, the guest's card tucked over the hall's corner, then a gold thread leading to the call to action. Olive is kept for ink and the night chapters; these two chapters use warm ivory, champagne, gold and blush; a closing night repeats the joined rings. Text remains readable throughout; practical actions are real, accessible controls.

Each `[data-chapter]` is awakened once by an IntersectionObserver (`is-awake`) and plays a timed entrance (CSS transitions staggered by `--d`/`--n`/`--w`); while it is on screen (`is-live`) its ambient loops run, and they pause when it leaves. Nothing is tied to scroll position, so motion is smooth and never feels dragged. Hidden entrance states exist only under `.motion-ready .chapter:not(.is-awake)`, so no-JS, print and reduced-motion visitors see the finished composition. Stars, fireflies, petals and jasmine blooms are generated by a small seeded script (`populateAtmosphere`), sit in plain HTML, and are placed by percentage so they never distort. Pointer interactions: `[data-tilt]` perspective tilt and garden parallax, tapping the rings parts and rejoins them, and `[data-starlight]` chapters sprinkle glints under the pointer and launch a shooting star on tap. Music remains off by default in development.

Fonts are now self-hosted: Amiri for Arabic ceremonial type, Noto Sans Arabic for practical Arabic text, and Cormorant Garamond for English display type. Preserve the licenses in `public/assets/fonts/`. All fonts load from the site's own origin.

## Continuous narrative object

A single folded-paper bird is transferred from the physical opening letter into a pointer-transparent overlay. Its entrance follows a timed cubic path, then scroll supplies destinations between real scene anchors. The bird stays the same DOM element, rather than being recreated at each section. Manual Popover API layering lets it cross the departing native opening dialog; a normal overlay is the fallback. Opening either action dialog moves the overlay into that dialog and raises it above the modal: the companion flies to a decorative header perch, folds its wings, and returns to the page after closing. Its perch is remeasured after dialog animation, resize, scrolling, and image-preview expansion. Focus stays with the native dialog controls. Reduced motion shows a still header bird instead of the traveler. The final PNG repeats the bird motif.

Its wake follows actual flight rather than drawing a permanent route. Sparse champagne wisps and occasional tiny glints inherit a little opposing velocity, drift upward, and dissolve over roughly one to one-and-a-half seconds. Emission depends on movement, while existing marks age independently: a pause lets the wake disperse instead of cutting a line. The same effect accompanies the envelope entrance and autonomous detours. A pool of at most 32 SVG marks keeps work bounded; hidden-tab pauses clear stale marks on resume.

## A living companion

Scroll now supplies a destination rather than directly placing the bird. A bounded spring integrates acceleration and damping, scroll velocity adds a little lag and anticipation, and turns bank through a changing paper profile. When the guest pauses, the bird can take a small curved detour and settle near a visible scene ornament; its wings fold, it looks around, and it may explore again after a varied rest. Scrolling interrupts these behaviors smoothly. The motion heartbeat uses cached scene geometry, pauses when the page is hidden, and stays disabled for reduced-motion visitors.

## Scene pacing and accessibility

Chapter reveals are time-based and play once per chapter; scrolling back does not reverse them. All headings and event copy stay visible; no scroll hijacking or wheel capture is used. Reduced motion, print, and JavaScript-disabled reading show complete compositions and no continuous animation. SVG artwork is original and remains decorative; the garden is explicitly an illustration, not a geographical map. Guest input also appears on the on-page keepsake while staying local to the device.

## Quiet life and the restrained garden

The garden is an airy conservatory drawing with nested fine arches, a faint aisle, sparse sprigs and a string of swinging lanterns. Its layers drift against the pointer, and the artwork clip-reveals when the chapter wakes.

The first screen is the dark olive opening envelope, kept at the couple's request and refined: a gold frame that draws itself, drifting gold dust, swaying sprigs, a breathing halo with slowly counter-rotating rings and an orbiting star, a floating envelope that tilts toward the pointer, and a wax seal that sends out ripples. The title shimmers once the entrance settles. Pressing the envelope unseals it with a light burst, the rings release outward, and the paper bird flies out as the screen fades into the landing hero. The envelope button has no outline; keyboard focus brightens the call-to-action underline instead. Reduced motion shows the finished still composition and skips the tilt. Instead of repeating static birds, the bird wakes a different element in each chapter when it arrives — the landing star, the joined rings, the date dial, the promise moon and jasmine, the garden flower, the dancing couple, the keepsake bird, and the closing rings. Global scrollbars use a 4px track in WebKit/Blink and the native thin option in Firefox, with a restrained olive thumb.

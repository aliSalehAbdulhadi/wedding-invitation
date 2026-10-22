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

The approved direction is an ivory/olive/champagne invitation with an animated sealed envelope. The current revision replaces the separate visual cards with full-width illustrated worlds. Two floating orbits join and expand; a wave of olive opens a celestial date dial and constellation of evening moments; the shared night sky becomes a promise with blooming jasmine; a pale horizon leads to perspective garden gates that open around an aisle; folded botanical paper reveals the guest's keepsake. Each chapter holds briefly as its choreography unfolds, with shared circles, gold threads, jasmine, and paper linking the sequence. Text remains readable throughout; practical actions are real, accessible controls.

A single requestAnimationFrame callback reads section geometry once per scroll frame and writes bounded CSS progress values. Event listeners are passive; continuous motion uses transforms and opacity. Reduced-motion preferences disable movement, reveal all text, and remove the prolonged sticky stage. Music remains off by default in development.

Fonts are now self-hosted: Amiri for Arabic ceremonial type, Noto Sans Arabic for practical Arabic text, and Cormorant Garamond for English display type. Preserve the licenses in `public/assets/fonts/`. All fonts load from the site's own origin.

## Continuous narrative object

A single folded-paper bird is transferred from the physical opening letter into a pointer-transparent overlay. Its entrance follows a timed cubic path, then scroll supplies destinations between real scene anchors. The bird stays the same DOM element, rather than being recreated at each section. Manual Popover API layering lets it cross the departing native opening dialog; a normal overlay is the fallback. Opening either action dialog moves the overlay into that dialog and raises it above the modal: the companion flies to a decorative header perch, folds its wings, and returns to the page after closing. Its perch is remeasured after dialog animation, resize, scrolling, and image-preview expansion. Focus stays with the native dialog controls. Reduced motion shows a still header bird instead of the traveler. The final PNG repeats the bird motif.

Its wake follows actual flight rather than drawing a permanent route. Sparse champagne wisps and occasional tiny glints inherit a little opposing velocity, drift upward, and dissolve over roughly one to one-and-a-half seconds. Emission depends on movement, while existing marks age independently: a pause lets the wake disperse instead of cutting a line. The same effect accompanies the envelope entrance and autonomous detours. A pool of at most 32 SVG marks keeps work bounded; hidden-tab pauses clear stale marks on resume.

## A living companion

Scroll now supplies a destination rather than directly placing the bird. A bounded spring integrates acceleration and damping, scroll velocity adds a little lag and anticipation, and turns bank through a changing paper profile. When the guest pauses, the bird can take a small curved detour and settle near a visible scene ornament; its wings fold, it looks around, and it may explore again after a varied rest. Scrolling interrupts these behaviors smoothly. The motion heartbeat uses cached scene geometry, pauses when the page is hidden, and stays disabled for reduced-motion visitors.

## Scene pacing and accessibility

Arrival progress and the held scene's progress are separate, bounded values. Scrolling backward reverses the artwork. Short viewports can expand each stage to fit its content rather than clip essential details. All headings and event copy stay visible; no scroll hijacking or artificial wheel capture is used. Reduced motion, print, and JavaScript-disabled reading remove the prolonged holds and show complete compositions. SVG artwork is original and remains decorative; the garden is explicitly an illustration, not a geographical map. Guest input also appears on the on-page keepsake while staying local to the device.

## Quiet life and the restrained garden

The garden was simplified at the user's request: an airy conservatory drawing, nested fine arches, a faint aisle, and two sparse botanical sprigs replace the solid illustrated trees, colored ground, and busy gate ornament. Light and negative space surround the venue details. The remaining minimal gates still open with scroll.

Independent CSS motion gives each world a quiet pulse: ring highlights brighten, the celestial dial turns very slowly, moonlight breathes, jasmine inclines, garden stems sway, and the keepsake floats a few pixels. These use separate opacity, rotate, and translate properties so the scroll choreography continues to work. Animation pauses outside visible chapters and is disabled for reduced motion and print. Global scrollbars use a 4px track in WebKit/Blink and the native thin option in Firefox, with a restrained olive thumb.

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

The invitation keeps the animated envelope and six time-based chapters: joining orbits, a celestial date dial, a night promise with jasmine, a floating jasmine lantern over reflected light, an animated bride and groom beside the guest's keepsake, and a paper closing that repeats the joined rings. Each chapter plays on arrival rather than scrubbing with scroll. All colors come from the selected palette, with shared paper surfaces and related night tones. The venue scene is an unframed sky lantern above fine reflected ripples, with the venue copy beside it on desktop and below on mobile. The couple is rendered in silhouette under an overhead beam, beside an unframed guest dedication. The closing uses small rings, delicate orbit lines, and larger names. Text remains readable; practical actions remain accessible controls.

Each `[data-chapter]` wakes its background (`is-awake`) and runs ambient loops only while visible (`is-live`). Individual foreground scenes and text are observed separately (`has-arrived`): at least 8% of that scene must enter the viewport, without a negative bottom margin. Rings, date dial, timeline, garden, couple, dedication, headings, and practical actions each wait for their own arrival. Observers start only after the envelope closes. This prevents long mobile sections spending all their entrances before their artwork becomes visible. Arrivals play once; scrolling never scrubs or reverses the animation. Reduced-motion visitors see the complete composition, and changing that preference reveals any waiting content. Print also exposes unvisited content.

Stars, fireflies, petals and jasmine blooms are generated by `populateAtmosphere`. Pointer interactions retain perspective tilt, garden parallax, joining rings, and starlight. Ambient loops pause offscreen. Music remains off by default.

Fonts are now self-hosted: Amiri for Arabic ceremonial type, Noto Sans Arabic for practical Arabic text, and Cormorant Garamond for English display type. Preserve the licenses in `public/assets/fonts/`. All fonts load from the site's own origin.

## Continuous narrative object

A single folded-paper bird is transferred from the physical opening letter into a pointer-transparent overlay. Its entrance follows a timed cubic path, then scroll supplies destinations between real scene anchors. The bird stays the same DOM element, rather than being recreated at each section. Manual Popover API layering lets it cross the departing native opening dialog; a normal overlay is the fallback. Opening either action dialog moves the overlay into that dialog and raises it above the modal: the companion flies to a decorative header perch, folds its wings, and returns to the page after closing. Its perch is remeasured after dialog animation, resize, scrolling, and image-preview expansion. Focus stays with the native dialog controls. Reduced motion shows a still header bird instead of the traveler. The final PNG repeats the bird motif.

Its wake follows actual flight rather than drawing a permanent route. Sparse champagne wisps and occasional tiny glints inherit a little opposing velocity, drift upward, and dissolve over roughly one to one-and-a-half seconds. Emission depends on movement, while existing marks age independently: a pause lets the wake disperse instead of cutting a line. The same effect accompanies the envelope entrance and autonomous detours. A pool of at most 32 SVG marks keeps work bounded; hidden-tab pauses clear stale marks on resume.

## A living companion

Scroll now supplies a destination rather than directly placing the bird. A bounded spring integrates acceleration and damping, scroll velocity adds a little lag and anticipation, and turns bank through a changing paper profile. When the guest pauses, the bird can take a small curved detour and settle near a visible scene ornament; its wings fold, it looks around, and it may explore again after a varied rest. Scrolling interrupts these behaviors smoothly. The motion heartbeat uses cached scene geometry, pauses when the page is hidden, and stays disabled for reduced-motion visitors.

## Scene pacing and accessibility

Chapter reveals are time-based and play once per chapter; scrolling back does not reverse them. All headings and event copy stay visible; no scroll hijacking or wheel capture is used. Reduced motion, print, and JavaScript-disabled reading show complete compositions and no continuous animation. SVG artwork is original and remains decorative; the garden is explicitly an illustration, not a geographical map. Guest input also appears on the on-page keepsake while staying local to the device.

## The place where a little light waits

The venue is an imagined jasmine lantern scene rather than a depiction of the real venue. Its softly domed paper shell, glowing jasmine, distant wishes, reflection, and a drawn thread replace the repeated conservatory arches and plaque. The lantern rises on its own arrival; paper, light, flame, dust, and ripples move quietly while on screen. The bird can nudge it and release three wishes. An ornament the bird has visited retains a subtle light.

## Unified palettes and guest color studio

`public/assets/js/themes.js` defines eleven palettes. The original five are: `olive`, `pearl`, `champagne`, `midnight`, and `sage`. Semantic CSS properties color backgrounds, text, buttons, borders, embedded SVG strokes/fills/gradient stops, the bird/wake, dialogs, and the PNG renderer. `public/assets/css/themes.css` contains the coordinated artwork treatment and developer controls. Use shared tokens instead of literal section colors. Error red remains a meaningful state color.

The garden and keepsake share the paper surface; star chapters use the selected night values. The couple is an original silhouette SVG vignette with rim light, a flowing veil, drifting dust, and an opening overhead beam. It sits beside an unframed dedication on desktop and above it on narrow screens. The heavy ballroom, ornate doors, and overlapping card were removed. The closing returns to paper with fine rings, quiet light, a spacious message, and larger names.

A floating Colors / الألوان button opens a bilingual native palette dialog for all guests on local and public hosts, including during the envelope opening and action dialogs. Selection updates the page immediately and remembers that guest’s preference in optional browser storage. It never writes configuration or event data. All hosts honor a valid saved preference; `design.theme` in `public/content.json` supplies the default, falling back to `olive` for an unknown value. The bird follows this dialog and returns to any underlying action dialog on close. PNG exports snapshot the active palette before loading fonts.

The first screen is the dark olive opening envelope, kept at the couple's request and refined: a gold frame that draws itself, drifting gold dust, swaying sprigs, a breathing halo with slowly counter-rotating rings and an orbiting star, a floating envelope that tilts toward the pointer, and a wax seal that sends out ripples. The title shimmers once the entrance settles. Pressing the envelope unseals it with a light burst, the rings release outward, and the paper bird flies out as the screen fades into the landing hero. The envelope button has no outline; keyboard focus brightens the call-to-action underline instead. Reduced motion shows the finished still composition and skips the tilt. Instead of repeating static birds, the bird wakes a different element in each chapter when it arrives — the landing star, the joined rings, the date dial, the promise moon and jasmine, the garden flower, the dancing couple, the keepsake bird, and the closing rings. Global scrollbars use a 4px track in WebKit/Blink and the native thin option in Firefox, with a restrained olive thumb.


## October 23: a light from above

The keepsake is now a single theatrical silhouette vignette. Original continuous paths describe the couple and a flowing veil; restrained rim light separates their profiles. A narrow overhead beam opens on arrival, the couple emerges after it, and dust and light breathe independently. All colors come from the selected theme. The old ballroom, illustrated costumes, and miniature floating card are gone. An unframed dedication and the download action sit beside the stage on desktop and below it on mobile. The paper bird still visits both the couple and dedication, and accompanies the native dialogs.

The five choices now evoke wedding stationery: olive and ivory, pearl and graphite, ivory and champagne, powder blue and pearl (`midnight`), and sage and silk. No red/merlot or terracotta palette remains. Existing obsolete saved palette IDs fall back to the configured palette.

The `preview.js` classic bootstrap loads the module application only over HTTP(S). On `file://`, it keeps the static Arabic content readable and shows a bilingual link to the local HTTP preview at port 8082. This does not bypass browser origin restrictions; the local server must be running. The theme studio is available on HTTP(S), including on the opening screen and inside action dialogs; file:// retains its static-preview guidance.


## Affectionate encounters and fairytale silhouettes

`public/assets/js/bird-scenes.js` defines eight small curved journeys in each ornament's coordinates. The existing spring and paper-bird identity are retained. The star teeters, the rings part and rejoin, the date's star escapes, a jasmine blossom tickles the bird into a tiny sneeze, a lantern releases wishes, a heart draws above the couple, a paper friend returns a bow, and the closing receives a farewell kiss. Autonomous visits choose visible, arrived ornaments only once per ornament automatically; guests can request another visit; approach direction and timing vary. The route sampler is independently tested. Heart particles are bounded and expire. Geometry is cached on scene measurement instead of being read every flight frame.

These ornaments are native buttons with bilingual accessible names, keyboard focus, and generous hit targets. They remain disabled without JavaScript or under reduced motion. Activating one queues a short visit after focus scrolling settles. Deliberate wheel/touch scrolling interrupts it. Modal focus takes precedence and brings the bird to its existing perch. Quiet visited states remain after the brief reaction. No action blocks reading, navigation, maps, calendar, or downloads.

The couple now have original fairytale silhouettes: the prince's swept profile, collar and tailcoat, and the princess's tiara, bun, fuller ball gown, fine folds and translucent veil. The overhead stage light and airy composition are preserved. The floating miniature card has not returned.

`public/assets/css/enchanted.css` owns these refinements and the new interaction styles. Practical buttons have a brief light sweep on hover/focus and a radial pulse at the press position. Native actions run immediately. The envelope is excluded: its label stays still without an arrow or shifting underline; the paper tilts gently and the seal receives a quiet brightness response. Keyboard focus is indicated around the seal. Music stays off by default.


## Opening sound, jasmine and a personal spell

Opening the envelope plays an original, quiet ascending bell chime from a finite Web Audio score. It runs only after activation, uses the existing audio context, and releases its eight voices. The separate ambient melody remains off by default. Unsupported audio does not interrupt entry.

The promise garden is a connected pair of rooted jasmine boughs, with attached leaves, five deliberate blossoms per side, a linking thread and central flower. Its own arrival draws the stems; dew and light breathe independently. Reserved lower space separates the composition from the readable cream-colored promise, footnote and bridge line.

Native modal backdrops are a dark, softly blurred night sky with sparse drifting stars; the paper panel has a distinct border and shadow. The same bird accompanies the guest while writing: a hidden, inert single-text-node mirror and a collapsed native Range measure the caret without splitting Arabic shaping. Input scroll and selection changes update the destination. The measurement stays on this device. Empty or unfocused fields return the bird to its header perch.

A roughly 2.6-second keepsake ceremony gathers light, unfolds a small paper invitation, reveals the name and seals it before triggering the local PNG download. The bird approaches the paper. The close control remains available and focused; the concealed form is inert while preparing. Escape, close or another modal cancels the pending download. Reduced motion skips the ceremony; export errors restore the form for retry. Developer controls move to the modal header and disappear during the ceremony.


## Responsive encounters and softer wedding papers

Foreground entrances start at 8% visibility, still after the envelope closes. Headings, practical details, date, timeline and quote have shorter, tightly staggered delays. The joined rings stay joined: a bird visit warms their center instead of parting them again. The original envelope pointer tilt is preserved.

Ornament visits start after a short scroll pause (about 240ms), with a reaction around the first quarter of a 2.1–2.6 second curved visit. Automatic visits happen once per ornament; explicit taps and keyboard activation can repeat them. Curious head tilts and delighted bounces give the bird an answer to its surroundings. Tapping empty starlight attracts it to investigate that glint. Scrolling or opening a modal still interrupts safely.

While writing, input events supply small beak dips, word hops with occasional hearts, and a puzzled tilt on corrections. The caret remains the destination and the bird settles when typing stops. No keystroke blocks the input or triggers sound. After a successful PNG, the redundant submit action disappears; editing the name or changing palette hides the old preview and makes export available again.

The larger lantern sits over a sparse jasmine shoreline; cropped excess margins and shorter mobile gaps bring it closer to venue copy. Fairytale profiles have curved noses, chins, hairlines and fine rim details. The veil is static within the swaying pair so it remains attached. The small folded friend has a distinct head, beak, eye and fold lines. The closing uses airy side brackets and a flowing thread with a traveling glimmer, breathing star and dew beneath the signature.

Six additional low-chroma wedding palettes are lilac and moonlight (`lilac`), sea glass and silk (`sea-glass`), moonstone and cashmere (`moonstone`), oyster and linen (`oyster`), wisteria and pearl (`wisteria`), celadon and almond (`celadon`). All share the same semantic roles and PNG renderer; body, secondary, accent, primary-button and night contrast are tested. The studio becomes two columns on wide viewports and scrolls naturally on phones. Changed static asset URLs carry a release query so cached module graphs cannot retain older controls.


Text entrance refinement: headings and promise lines fade from 4% to full opacity over about 1.25 seconds, using a smooth opacity easing and only .14em of upward drift. Word/line wrappers no longer clip the letters. Supporting copy moves 8px with a very light blur; hero text uses the same opacity-led entrance. Earlier observation timing stays intact. Reduced motion and print explicitly expose full-opacity text.


Press border and dance entrance: practical controls have a pointer-transparent, aria-hidden edge layer. A theme-colored light sweeps once around its masked border over .85s alongside the existing press pulse. Native clicks and keyboard actions are immediate; plain border glow is the fallback when the mask is unsupported. The layer is restored if localized labels replace its content. The envelope retains its separate treatment.

The complete couple group performs one 2.8-second perspective turn on its own arrival, fading in and settling into the original pose. Dress, veil and both figures remain in the same transformed group. A short drawn light arc marks the turn near their feet; the surrounding ambient sway continues separately. Scrolling back or a bird visit does not restart the entrance. Reduced motion and print expose the final still pose and hide the edge/turn effects.

The couple's anatomy was redrawn: the groom has a tapered tailcoat, two separate trouser legs with shoes and a short coat tail, and the bride's gown hides her feet. Arms are round-capped strokes with small hands: his forearm cradles her waist and her hand rests on his chest. A shared user-space gradient keeps strokes and fills one tone. After the entrance the couple waltz slowly and continuously: nested groups carry an 18-second oval floor path (sine-eased sideways travel with a slight perspective turn, plus depth), a 4.5-second rise and fall on three, and lagging fabric. The ball gown skews at the waist while two hem flares fan out beyond it, the groom's near leg steps and his coat tail swings, the veil and a sheer second veil drift, both heads tilt, and the floor shadow and a faint gold orbit trace follow. All of it is CSS on SVG groups; loops pause when the chapter is off screen, and reduced motion and print show the still pose.


Confirmed content and numeric dates: Ali and Tabarak's wedding uses 20/11/2026, with gathering at 17:00, celebration at 18:00 and conclusion at 22:00 in Baghdad. The venue's secondary title sits beneath its name and is included in calendars and the local PNG. Month names are replaced by two-digit numeric months in both languages. JSON remains canonical and the Arabic HTML fallback matches it.

The rings hold their separate names during the approach: a one-second pause, three-second join and a later fade before the shared word. Names travel to separate ring centers rather than colliding in the middle. The small folded friend is 42 x 38px. Existing scenery-only ornaments and other recent local changes are preserved.


## Arrival at Khayal Hall

The venue is an imagined folded-paper gateway, rather than a separate lantern illustration above a block of copy. Its two arched paper leaves open once on arrival around the semantic venue name, secondary title, address and real map link. It is storybook scenery, not a representation of the hall's architecture. A continuous drawn thread leads from the preceding jasmine garden, visits the gate's star seal and passes down toward the personal invitation. A restrained traveling glint, warm interior light and three small stars keep the scene alive without obscuring the practical details.

The autonomous bird has a short gateway route: approach, inspect the seal, brighten it and continue around the arch. Scenery remains inert and aria-hidden, preserving the recent removal of ornament buttons. Copy stays selectable and the native map link keeps its immediate behavior. All art uses the existing palette tokens. The gateway is open by default without motion enhancement; reduced motion exposes its open pose, and print removes the art while retaining the venue information. The old lantern scene and its active route were replaced.


## Chapter rhythm and connected motion refinement

Chapter boundaries now share a shorter spacing scale; the story and promise no longer force viewport height when their content already fits. The promise still reserves space for its rooted jasmine. The venue bridge and keepsake heading have a combined 68px separation at 551px, down from 144px. Closing space is shorter as well. This preserves breathing room without repeated empty screenfuls.

The joining rings wait until 35% of their own artwork is visible, independently of the kicker. Names are SVG text attached to the ring groups, so their paths cannot drift apart on different aspect ratios. A short readable pause leads into a gentle acceleration and deceleration over 2.8 seconds, then names fade and the shared word emerges. The word does not bounce larger when the bird passes.

The timeline's traveling light and diamond highlights share a linear 6.5-second clock. Marker centers are measured only when layout changes; distance sets each highlight's delay. Language replacement restarts the clock together, and CSS chapter visibility pauses all participants together offscreen. No continuous geometry reads or animation timers were added. Reduced motion uses static filled markers.

The gate's leaves are precise SVG quarter arches with inset paper contours and handles, matching the surrounding frame. The two hinges have slightly different settling times and the interior light spreads gently as they open. The original gate concept and autonomous seal encounter stay intact. Guest-modal copy now invites the guest to add their name and keep a memory; image dimensions, file type and the character-count/privacy helper are removed from the normal form copy. The actual validation and local-only behavior are preserved, with technical details still documented here.


## Faster joining and restored gate opening

The ring sequence is about three seconds overall: a .2s readable start, 1.65s of approach with a gentle landing, names held fully opaque until 2.05s, a .5s name fade and together appearing from 2.3s to 3s. Names remain inside their SVG ring groups. Shared timing variables keep the phases aligned. This replaces the previous 2.8s movement and 4.65s overall sequence.

The gate's waiting rule had accidentally repeated layout declarations instead of applying its closed transform. It now explicitly uses perspective(1600px) rotateY(0deg), with no waiting-state transition. On arrival the leaves transition to their existing opposite 78-degree poses. The portal waits for 35% visibility, like the rings, so its opening is visible during normal arrival. It still plays once per visit to the page; reduced motion and the no-JavaScript composition stay open and readable.


## Rendering budget after Chrome profiling (24 October 2026)

Keep the startup, WOFF2 fonts, literal backdrop fallback, and manual scroll restoration from the couple's latest fixes. The envelope's outer panel stays opaque; its contents retain their entrance motion. A simple dialog-open class locks background scrolling, and scene-covered pauses chapter atmosphere while an action dialog covers it. These states update only when dialogs open or close, avoiding broad document-level relational selectors in the animation hot path.

The venue keeps its two hinged leaves, drawn arch and bird/seal encounter. The large glow, wandering light path and SVG star group settle into still artwork rather than repainting throughout the guest's reading time. Motes remain sparse. Most generated stars are still points, with every sixth star twinkling. The hero now participates in visibility observation too, so its branches and scroll hint stop when offscreen.

The dance separates still scenery, a soft CSS light, sparse SVG encounter strokes, and the original figure artwork. The figures are still SVG paths rasterized together; an outer HTML layer carries their slow waltz and an inner HTML layer carries the one-time twirling entrance. Hands, faces and veil stay attached. The large SVG blur filter and independent body-part loops are removed. The finished entrance drops its 3D transform. This keeps the requested dance and bird-drawn heart without repainting the figures every frame.

The single bird keeps its spring, routes, responses and writing reactions. Its wake now draws at most 20 short-lived marks into a 512px canvas tile, capped at 1.5 device-pixel ratio and roughly 30 redraws per second. Empty trails are hidden. On coarse-pointer devices the bird's position updates at roughly 30fps; desktop updates remain near 60fps. Resize, fonts, language changes and completed entrance transforms invalidate cached scene geometry, instead of polling every 300ms. Reduced motion exposes the still composition and hides the flight layer as before.


Guest palette and sharing refinement (24 October 2026): the user explicitly requested the theme button for all live visitors. This supersedes historical local-only references above. A fixed olive stationery image represents the invitation in social previews; a guest’s private palette choice does not rewrite shared metadata. No additional motion or runtime package was added.


Arabic hero font confirmed (24 October 2026): the couple selected Aref Ruqaa, the former option 2. It now styles only the main Arabic names at the approved smaller responsive sizes. Preserve the original Cormorant Garamond italic ampersand with a 0.32em downward optical adjustment. English names and all other headings retain their existing typography. The comparison labels and duplicate Gulzar hero are removed. The licensed names-only WOFF2 subset is 7,304 bytes; provenance is in assets/fonts/sources.json.


## Recorded background music — 24 October 2026

The optional background is now Moonlight by Scott Buckley: a human-composed piano-and-strings recording, chosen for its restrained romantic character. Native HTML audio replaces the recurring oscillator scheduler. The full 4:14 track is self-hosted, reduced from 10.18MB to 4.07MB with a quiet level and subtle fades. preload=none keeps the recording out of the initial page load. Music starts only through the existing explicit music choice; the envelope’s brief original bell remains separate. Pause/resume retains the current position. Hidden pages pause, with the guest’s prior intent retained for return; a cancelled loading request cannot start playing later. The music toggle can retry after an unavailable download. A small visible footer attribution links to the composer, CC BY 4.0 and the quiet-edit details.


Recorded music updated (27 October 2026): the couple selected their supplied recording of فستانك الأبيض by حسين الجسمي. It replaces Moonlight without changing the native opt-in player or opening bell. The full song is retained at a quieter level with short fades and 128 kbps encoding; no preload, extra audio framework, or third-party player is added. Footer and audio metadata identify the supplied recording without the previous CC BY claim.


Audio refinement (27 October 2026): the song now uses 50% of its previous playback level. The envelope chime is removed entirely; preserve the visual opening and explicit music opt-in. The only sound is the selected recording.


## Romantic garden branch study — 28 October 2026

On codex/reel-inspired-invitation only: the couple supplied an Instagram reel as visual direction. See REEL-STUDY.md for observed references, original-art provenance and the final illustration prompt. A burgundy correspondence envelope opens onto peach stationery, a painted floral arch, paired swans and vertically arranged live names in the approved Aref Ruqaa. The supporting sentence sits below the frame so date/address stay legible. The rose palette is added alongside all eleven existing choices. Existing scenes, guide bird, doors, dancing couple, maps, calendar and personalized download remain; song-only audio remains half its preceding playback level. Main and the production domain are unchanged.


Vintage refinement (28 October 2026, branch only): retain the couple's olive-and-ivory colors by default and honor their existing saved color preference. Burgundy is optional. All correspondence colors now derive from the selected semantic palette, including envelope folds, seal and letter. Floral art is gently toned to fit the selected color family. Carry understated engraving into headings, date dial, timeline, venue and dialogs. The closing and other paper sections share the same paper background; do not reintroduce fixed blush/red surfaces.


Music/identity refinement (28 October 2026, branch only): Birdy gently follows the recording's real dynamics, with brighter wake, a slight lift/tilt and wing response. Faint edge candlelight appears and recedes with the music; no fixed border or crossing thread is added. All accents follow the selected palette. Pausing settles the effects; reduced motion preserves song playback without animation. The white envelope's wax seal uses the same approved interwoven Arabic initials as the sharing graphic.


Music visibility correction (28 October 2026, branch only): the couple rejected nearly invisible, stationary side light and tiny bird responses. Use travelling perimeter candlelight with sufficient palette contrast on paper and night, clear but bounded bird accents, and different response layers within the current section. Keep text clear and avoid a permanent enclosing frame. Replace the visible music label with a note icon expanding into an actual audio-spectrum waveform; retain accessible bilingual state and controls.


Calmer music direction (28 October 2026, branch only): the couple explicitly rejected circular travelling glows, bright night lighting and sharp beat responses. Replace them with brief, irregular edge reflections separated by quiet gaps; fade fully before changing location. Keep the note above Birdy removed and the bird/scene influence slow and restrained. Retain the note-and-waveform music button. Follow the official Apple motion guidance recorded in REEL-STUDY.md, with reading and the wedding artwork as the focus.


## Engraved musical passages — 28 October 2026, branch only

The couple rejected ambient edge lighting entirely. Remove its DOM, gradients and light scheduler, plus the extra music-driven promise glow and spotlight brightness change. Replace them with one short, unfiltered SVG engraving at a time: a small calligraphic curl, bowed hairline or diamond detail. Ink travels down the local stroke, fades out fully, rests briefly, then appears on a different edge. Never draw an enclosing frame or a path across the text. Palette-aware ink is stronger on paper and uses the existing gold on night scenes. The recording's gently smoothed energy changes its ink opacity; the existing quiet bird response and real spectrum control remain. Pause, hidden pages and reduced motion clear reactions while preserving native audio behavior.

The promise's own surface now has a single curved bottom shared by night paper, stars and jasmine. Remove the separate venue wave and garden's low radial wash so there is no flat seam above a different dark strip. Keep the central blossom fully above the curved edge. The couple's existing static theatrical beam now has a transparent-to-opaque upper mask; it no longer starts at a visible horizontal line. No audio gain, event content or production branch changes.


## Confirmed champagne direction and smooth wave — 28 October 2026, branch only

The couple selected ivory and champagne for all guests. The fixed palette module applies the configured colors without reading previous guest choices, creating a dock or creating a palette dialog. Retain the alternative palette definitions in source. Match the static CSS fallback and browser theme color to champagne too. The envelope has one action: opening it starts the selected song through that click. Remove the separate music-entry button; keep the floating music control for pause/resume.

Restore the original native Bezier wave as a small SVG mask shared by the promise background and garden. This replaces the sampled polygon. Remove the following venue section's negative overlap: it cut off the lowest part of the curve and produced a flat segment, especially on desktop. Keep the jasmine and transparent spotlight-top refinements. Gathering is now 15:00, celebration 16:00, conclusion around 21:00 Baghdad time; regenerate both hosted calendars.


Softer champagne contrast (28 October 2026, branch only): the couple asked to lighten the dark brown while retaining the champagne aesthetic. Shift night surfaces to warm taupe (#49463e / #36342e), with softer matching ink (#575044) and button hover (#4e483d). Ivory, champagne gold and secondary text stay coordinated with the existing palette. Static fallbacks and startup background match the same colors.


## Compact keepsake entry and finished invitation — 28 October 2026

The invitation dialog has two explicit views in the same native modal. Entry contains only the compact heading, short description, name field and save action. After the existing ceremony/export succeeds, hide the whole entry view and show the finished PNG with Save again and Write a new name. Closing and reopening retains that finished view and image in memory; only Write a new name clears the input, revokes the previous object URL and returns focus to a blank entry. Guest names are still neither stored nor transmitted.

Use visualViewport height and offset for the modal's available area; a keyboard can resize that viewport independently of the layout viewport. Below 480px of visible height, omit secondary copy and tighten spacing while retaining 44px controls. A 16px input avoids small-input focus zoom. Keep the existing ceremony, scaled to fit the compact panel, and return focus to the finished heading rather than reopening the keyboard. Closing during export cancels the ceremony/download; errors leave the form usable for retry. The invitation button's press gradient is bounded by its button instead of an auto-sized floating pseudo-element, which shifted the press hit target in Firefox.

The sharing image now uses medium rounded ivory corners against a slim champagne margin inside the image. Its source, exact image-tool prompt and optimized JPEG path are recorded in SHARING-IMAGE.md; the approved initials and existing metadata wording remain. The old image remains available for cached shares.


## Full viewer before the ceremony — 28 October 2026

The couple clarified that only name entry should be compact. Restore الفصل الأخير · وأنت جزءٌ منه as the subtitle below the heading in both entry and finished views, including short keyboard-space layouts. Save immediately switches the same native dialog to a full-height viewer (viewport minus 24px, up to 620px wide), blurs the name field and focuses the close control. Let visualViewport resize settle briefly, with a bounded timeout, and paint the expanded geometry before starting the existing paper ceremony. Keep that full-size viewer for the finished invitation and on reopen. Write a new name removes the expanded state and returns to the compact form. Export errors and cancellation also clean up pending expansion and restore entry. No image, music, schedule or privacy changes.


## Animation-preserving performance follow-up — 29 October 2026

Keep the approved visual scenes, animation timing, 30fps wake drawing and 20Hz music sampling. The measured change moves the three music-responsive outlines to small decorative child layers, with the same border/opacity/scale response. Music values no longer inherit through every descendant of an entire chapter. Scope the landing reveal class to the hero, and preserve scroll events when the visualViewport handler requests bird updates so cached route geometry is reused. Preload the existing Noto Sans Arabic body face and names-only Aref Ruqaa face alongside Amiri; no font or artwork changes.

The mixed perfromance-improvements stash is retained unchanged. Its broader keyframe/glow rewrites, wing wrappers, higher-frequency music sampling and uncapped wake work were not applied. This patch rebuilds only the previously measured changes from the clean approved release, then revalidates them.


## Small invisible performance fixes - 29 October 2026

Keep the bird heartbeat handle occupied while its callback executes, so visits cannot create another loop or reset the running frame clock. Preserve every route, spring parameter, delay and frame-rate cap. Refresh cached routes after transform transitions only when the target is an anchor or its ancestor; unrelated decorative descendants do not move those document-space anchors. Music energy and swell retain the same values and sampling rate but are written only to the two consuming wing paths, not inherited through the bird and engraving containers. No stylesheet, artwork, animation keyframe or event content changes.


## Browser Back closes the modal - 29 October 2026

Opening the keepsake or calendar dialog adds one same-URL history entry containing only the dialog ID. Name entry, expansion, the existing ceremony, finished preview and rewriting a name remain within that one entry. Browser Back dismisses the dialog, preserving the page position and the in-memory finished invitation. Forward may reopen that same dialog. Close, Escape and backdrop dismissal consume the entry rather than leaving hidden Back steps; repeated closes cannot traverse twice. Cancel a pending close timer when Forward rapidly reopens a dialog. Back during export uses the existing abort flow so it cannot finish an unwanted download. The landing envelope is not an added history step, and normal navigation remains available after dialogs close. No animation or layout changes.

# Gravitational Attractors

A full-screen interactive particle system built with p5.js. Click anywhere on the canvas to place an attractor and watch 750 particles redirect their flow toward it. Add more to create competing fields of influence, remove them by clicking directly, and shift between fading traces and clean real-time rendering with a keypress.

## How it works

Each particle carries a position, velocity, and acceleration vector. Every frame, it calculates a direction pointing toward each active attractor, sums all of them, divides by the attractor count to get the average pull direction, then normalizes the result before scaling and adding it to the particle's velocity.

The normalization step is worth dwelling on. In Newtonian gravity, force diminishes with the square of distance (F ∝ 1/r²). Here, normalizing the direction vector removes distance from the equation entirely. Every attractor pulls with the same force regardless of how far away a particle is. This makes the behavior feel more like flowing current than orbital mechanics. Particles stream toward attractors in smooth arcs rather than spiraling inward or collapsing on impact.

When multiple attractors are active, averaging the directions creates natural tension zones between them. Particles caught equidistant between two points oscillate or settle into curved paths that emerge from the arithmetic without being explicitly scripted.

The trails are produced by painting a near-transparent white rectangle over the canvas on every frame at alpha 20 of 255. Rather than clearing the buffer outright, this gradually erases older marks while keeping recent ones sharp. Toggling trails off switches to a full clear each frame, which shifts the piece from trace-based to moment-to-moment.

## Controls

- Click on the canvas to place an attractor
- Click an existing attractor to remove it
- Space to toggle fading trails on or off
- Keys 1 through 9 to step through speed levels

## Changing it

The normalized attraction model is a deliberate simplification, and swapping it out changes the character of the piece considerably.

Replacing the normalized direction vector with an actual inverse-square force law (F ∝ 1/r²) would make proximity matter dramatically. Particles near an attractor would be pulled hard and fast, potentially slingshotting past, while distant ones barely respond. The smooth, flowing field quality would give way to something more turbulent and orbital.

Adding a repulsion threshold below a minimum radius shifts the system toward something closer to a Lennard-Jones potential, where particles orbit at a preferred distance rather than converging on a point. The result reads less like attraction and more like coexistence.

The color structure is also a design choice rather than a given. Particles are warm-toned (red and orange dominant) and attractors cool-toned (blue and purple), which gives the visual impression of opposing forces. Mapping color to velocity magnitude instead would turn the piece into something more like a flow visualization, making the energy distribution of the field legible rather than decorative.

## Running locally

No build tools are needed. p5.js loads directly from CDN so the project runs by opening `index.html` in any modern browser.

Clone and run with `git clone https://github.com/QC20/Gravitational-Attractors.git`, then open `index.html`.

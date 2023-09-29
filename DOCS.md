# Intro

Welcome to MapKey!
This library aims to extend the features of [ReMapper](https://github.com/Swifter1243/ReMapper), so it's worth having a bit of knowledge on using ReMapper before using MapKey.
That being said, learning on the spot is great too, so if you'd like to do that, then go ahead.

This document covers most of the main features of MapKey, or any features that may be a bit confusing to use. Please note that this guide is not a complete list of features, but should help to make the rest intuitive to use.

## Importing

To use MapKey in your project, you will need to import it to your script.
You can import the entire MapKey module.

```js
import * as mk from "https://deno.land/x/mapkey@2.0.0/src/ReMapper/mod.ts";
```

This is not recommended though, as you will have to prefix everything from MapKey with `mk.`.
Ideally, you can import the specific items you need into your script.

```js
import { playerAnimation, Polygon } from "https://deno.land/x/mapkey@2.0.0/mod.ts";
```

**Important!**

When you add your import it will likely show an error, hover over the link, click quick fix => cache dependancy.

# Key Features

The following guide will explain the key features of MapKey, note that this is for version `2.0.0`, and will not be consistent with other versions.

## Despawner

This function will remove certain environment objects from your map.
**Example:**

```js
despawn("Contains", ["PlayersPlace", "Mirror"], ["Construction"], ["Clouds"]);
```

This will use the `Contains` lookup to despawn `PlayersPlace` and `Mirror`, then restore `Construction`. It will also "hard despawn" `Clouds`.

### Params

-   lookup: The lookup method to use for despawning objects.
-   ids: The ids of your objects to despawn.
-   restore: (Optional) Objects to restore after despawning.
-   hardDespawn: (Optional) Object to despawn based on the `active` property. These objects canot be used later in your map, and will not be restored by `restore`.

## Light Gradient

A simple gradient creator, this creates a gradient transition for a light over a set number of beats.
**Example:**

```js
new lightGradient(0, 16, [
	[0, 0, 0, 0],
	[0, 1, 0, 1],
	[0, 1, 1, 1],
	[0, 0, 0, 0]
])
	.type(1)
	.push();
```

This will create a gradient from beat 0 to beat 16 on event type 1 (ring lights). The gradient will transition though black, green, aqua, and then black over the 16 beats.

### Params

-   time: The start time of the gradient.
-   duration: How long the gradient should go for.
-   colors: The colors to transition through.
-   type(): The light type of the gradient. i.e., 0 = back lasers, 1 = ring lights, etc.
-   ID(): The light id/s to run the gradient on.
-   lerp(): Whether to lerp HSV or RGB (if you would like to learn more about HSV vs RGB lerp, read [here](https://www.alanzucconi.com/2016/01/06/colour-interpolation/)).
-   easing(): An easing to apply to each color in the gradient.
-   push(): Push your gradient to the active diff.

## Strobe Generator

A simple generator function to create strobe sequences in your map.
**Example:**

```js
strobeGenerator(0, 16, 4, 1, [1, 0, 0, 1]);
```

This will create a strobing sequence that flashes between red and black between beat 0 and beat 16. There will be 4 events every beat, and it will affect the ring lights.

### Params

-   time: The time to begin the strobe.
-   duration: How long the strobe should go for.
-   density: The number of events per beat, or 1 event every `1 / density` beats.
-   type: The light type to strobe on. i.e., 0 = back lasers, 1 = ring lights, etc.
-   color: The color for every "on" event, this can also be a boolean to use vanilla colors.
-   ids: (Optional) The light ids to run the strobe on.
-   ease: (Optional) Whether to use an easing on the strobe.

**Important**
The current update of remapper contains broken easing functions, this won't affect most cases, but it does affect some easings on the strobe generator. This issue does not affect animation or keyframes as they use Unity's easings.

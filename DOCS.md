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
-   hardDespawn: (Optional) Object to despawn based on the `active` property. These objects can't be used later in your map and will not be restored by `restore`.

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
The current update of ReMapper (3.1.2) contains broken easing functions, this won't affect most cases, but it does affect some easings on the strobe generator. This issue does not affect animation or keyframes as they use Unity's easings.

## Material Creator

This class helps to make geometry materials and add them to your map. Also includes a type to help with auto-filling shader keywords.

**Example:**

```js
new geometryMaterial("solidBlack").BTSPillar().push();
```

This will create a new material called `"solidBlack"` that uses the `BTSPillar` shader.

### Params

-   name: The name of the material

Each shader method has the following params:

-   shaderKeywords?: The list of shader keywords to apply to the material. Some shaders don't have autofill for keywords.
-   color?: The color of the material.
-   track?: The track to add to your material.

## Polygon generator

This class will create a 2d polygon out of geometry cubes.

**Example:**

```js
new Polygon("material", 5, 10, [0, 0, 10], [1, 1, 1]).push();
```

This will create a pentagon out of cubes with the material called `"material"`, the pentagon will have a radius of 10 and the cubes will be 1 meter wide.

### Params

-   material: The name of the material to create the polygon with.
-   sides: The number of sides on the shape.
-   radius: The radius of the shape, this will be the distance from the center to the middle of each side.
-   position: The position of the center to the shape.
-   scale: The scale of each side in the shape, the X value of this is ignored since it is used to fill the sides.
-   rotation: The rotation of the shape.
-   innercorcners: Makes the edges join on the inner corners of each side rather than the outer. This option makes triangles look better.
-   track: The track to give each of the sides of the shape.
-   iterateTrack: (Default = true) Changes the track value for each piece of the shape. False: every piece will have the same track. True: each piece will have the track `${track}_${i}` where {0 <= i < sides}.
-   iterateOffset: The number to start iterating tracks from, the first track number will be this number.
-   push(): Pushes the polygon to the active diff.
-   return(): returns the array of geometry instead of pushing it, this is an advanced feature that only has some very specific uses.

## Primitive Shape Generator

Despite the name, this class is rather useful. It can create several basic 3d shapes from geometry cubes.
Currently, the shapes it can generate are:

-   Prisms: Any 2d shape that has been extruded, this includes cubes.
-   Spheres: These spheres are made out of rings.
-   Cones: This includes pyramids.

**Example:**

```js
new primitiveShape("material", [0, 0, 10], [1, 1, 1]).prism(4, 5, 10, false, true).push();
```

This will create a cube with sides 10 meters in length using the material `"material"`

### Base Params

-   material: The name of the geometry material to create the shape with.
-   position: The position of the center of the shape.
-   scale: The scale of each of the pieces that make up the sides of the shape, X value is ignored as it is used to fill the sides.
-   rotation: The rotation of the shape.
-   track: The track to apply to each piece of the shape.
-   iterateTrack: (Default = true) Changes the track value for each piece of the shape. False: every piece will have the same track. True: each piece will have the track `${track}_${i}` where {0 <= i < the number of cubes in the shape}.
-   iterateOffset: The offset to begin iterating tracks from.

### Prism Params

-   sides: The number of sides of the prism.
-   radius: The radius of the 2d shape at each end.
-   length: The length of the extrusion between each end.
-   innerCorners: Makes the corners touch on the inside edge of each side rather than the outside edge.
-   alignedSides: Aligns the rotation of the sides to the nearest clockwise side of the 2d shape at each end of the prism.

### Ring Sphere Params

-   rings: The number of rings to make the sphere from.
-   segments: The number of segments in each ring.
-   radius: The radius of the sphere.
-   innerCorners: Makes the segments join on the inside edge of each corner rather than the outside edge.

### Ring Cone Params

-   rings: The number of rings to make the cone from.
-   segments: The number of segments in each ring.
-   baseRadius: The radius of the base shape of the cone.
-   depth: The depth of the cone. i.e., the distance from the base to the point.
-   innerCorners: Makes the segments join on the inside edge of each corner rather than the outside edge.

## Environment Exporter

This function will take all the environments from your map and convert them into a file that you can share. To read more on how to use these files, look [here](https://github.com/Aeroluna/Heck/wiki/EnvironmentJSONS). This function optionally also optimizes the geometry materials in your map using the `optimizeMaterials()` function, and can convert your animated environment pieces into static ones with the `optimizeStaticEnvironment()` function. These functions are both features of MapKey that you can use separately if you want.

**Example:**

```js
exportShareableEnv({ name: "My cool environment" });
```

This will export all your environments and geometry into a file called `My cool environment.dat`. This function will modify elements of your map, so it's highly recommended to run the function after your `map.save()`.

### Params

-   settings:

    -   name: The name for the environment (in game) and the environment file.
    -   author: The author of the environment, will default to the mapper name if left blank.
    -   environmentVersion: The version of your environment, useful if you continue to make changes to your environment.
    -   description: The description of your environment, this is currently unused by chroma but will be added later.
    -   copyLightEvents: Optional to copy lighting events from the map to your environment.
    -   features: see below.

-   optimizeMats: (Default = true) Whether or not to run the material optimizer on your map.
-   staticifyEnv: Whether or not to convert animated environments/geometry into static objects in your map.

The features section of settings has the following parameters:

-   forceEffectsFilter: Suggests the effectsFilter to be used with the environment.
-   useChromaEvents: Suggests the chromaEvents setting to be used with the environment.
-   basicBeatMapEvents: The raw JSON of lighting events to be loaded with your environment. The copyLightEvents setting already does this.

## Environment Importer

This function can be used to import the environments and geometry from a user shared environment file and add them to your map.

**Example:**

```js
importShareableEnv("My cool environment");
```

This will take the environment data from `My cool environment.dat` and add it to your map.

### Params

-   file: The name of the environment file. If the file is in a folder, you will need to include the name of the folder (e.g., `New Folder/My cool environment`). You don't need to include the `.dat` on the end.
-   conflictingBaseEnv: This parameter is only needed if the base environment in the imported environment is different from the one in your map. This option will allow you to specify which base environment to use.

## Geometry Filter

This function will filter through all the geometry objects in your map based on certain conditions, then run some code for each geometry that is filtered. It works in the same way as lightRemapper does.

**Example:**

```js
filterGeometry(
	x => x.track.has("cubes") || geo.position == [0, 10, 0],
	geo => {
		geo.position = [0, 0, 10];
	}
);
```

This will take every piece of geometry that has the track `"cubes"`, or the position `[0, 10, 0]` and move them to the position `[0, 0, 10]`.

### Params

-   condition: The condition that the geometry must pass to be affected.
-   action: The action to run on all passing geometry.

## Environment Filter

This function is exactly the same as the [geometry filter](#geometry-filter), but for environment objects.

**Example:**

```js
filterEnvironments(
	env => env.lookupMethod == "Contains",
	env => {
		env.track.add("stuff");
	}
);
```

This will add the track `"stuff"` to all environment objects that use the `"Contains"` lookup.

### Params

-   condition: The condition that the environments must pass to be affected.
-   action: The action to run on all passing environments.

## Note Filter

Works exactly the same as the other filter functions, except it runs for notes.

**Example:**

```js
filterNotes(
	false,
	n => n.time >= 64 && n.time < 128,
	note => {
		note.animate.dissolve = [
			[0, 0],
			[1, 0.1]
		];
	}
);
```

This will filter through all the non-fake notes in your map for any between beat 64 and 128. Then add a dissolve animation to the filtered notes. This implementation of the note filter function could be simply done with a `notesBetween()` from ReMapper.

### Params

-   fake: Whether to target fake or regular notes.
-   condition: The condition that the notes must pass to be affected.
-   action: The action to run on all passing notes.

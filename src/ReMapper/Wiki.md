
# Intro

Map key is a library of functions designed to extend [ReMapper](https://github.com/Swifter1243/ReMapper) if you are not using ReMapper, then try having a look at the other mappings tools supported by MapKey. For those using ReMapper, welcome!

MapKey is a feature packed extension of ReMapper designed to make many tedious tasks much simpler.

# Documentation

## Importing

A basic import statement for Map Key looks like this:

```ts
import { } from "https://deno.land/x/mapkey@1.3.0/src/ReMapper/mod.ts"
```

You can add classes and functions to the import just like this:

```ts
import { despawner, Polygon, optimizeMaterials } from "https://deno.land/x/mapkey@1.3.0/src/ReMapper/mod.ts"
```

You can also import everything like this:

```ts
import * as mk from "https://deno.land/x/mapkey@1.3.0/src/ReMapper/mod.ts"
```

This isn't recommended though, because you will have to prefix everything with `mk`.

```ts
new mk.despawner()
```

## Map Versions

Note that map key is a tool for Beatmaps v3 and only supports ReMapper v3 at this time, to use a v2 version of ReMapper import from this link:

```ts
import {  } from "https://deno.land/x/enviromodder@5.0.0/src/exports.ts"
```

**There ARE broken functions in this version** but it is currently the most compatible with Beatmaps v2

# Functions and Documentation

## Class Usage

Most classes have 2 ways of being used. You can either initialise the class in a single line like so:

```ts
new despawner("Contains", ["Environment"]).push()
```

Or you can specify the class as a variable to be edited later.

```ts
const ds = new despawner("Contains")
ds.ids = ["Environment"]
ds.push()
```

Both of these methods will do the same thing. The single-line method has the benefit of being compact and readable, the variable method has the benefit of reusability.

## Despawner

Despawner will take the selected environment pieces from your array and move them out of the player's sight with the capability to exclude environment pieces from your original array and completely despawn your selected environment pieces if you would rather do it that way.

### Example

```ts
const ds = new despawner("Contains", [
   "Sun",
   "Moon"
])
ds.restore = ["Moon"]
ds.hardDespawn = [
   "Track",
   "Construction"
]
ds.push();
```

This will move all environment pieces to -9999 on all axis, it will then restore the moon's original position, allowing for mass environment removal with small amounts of compensation to restore a non-duplicated object's position.

### Parameters

| Parameter        | type                        | Description                                                                                                                                                                                       |
|------------------|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `lookup`         | `rm.LOOKUP` (lookup method) | The lookup method to find your IDs to despawn and exclude.                                                                                                                                         |
| `ids`            | `string[]`                  | An array of environment IDs to despawn (hint, use `"Environment"` and `"Contains"` to despawn an entire environment.                                                                               |
| `excludes`       | `string[]`                  | Exclude anything from your original array if ids (useful for bringing back small amounts of environment pieces after despawning a lot).                                                            |
| `hardDespawn()`  | `string[]`                  | Set slected environment piece to `active = false`. This will mean that environment objects and their children cannot be reused later. |

## Player Animation

`playerAnim` is a class that helps with animating the player and notes together. With optional tracks for the player and notes for later use.

### Example

```ts
new playerAnim(0, 64, player =>{player.animate.position = [[0, 0, 0, 0], [0, 0, 100, 1]]}, "camera", "notes").push()
```
Or:
```ts
const pAnim = new playerAnim(0,64);
pAnim.animation = player =>{
    player.animate.position = [[0, 0, 0, 0], [0, 0, 100, 1]]
}
pAnim.push()
```

### Params

| Param         | Type            | Description                                          |
|---------------|-----------------|------------------------------------------------------|
| `time`        | `number`        | The time to start animating the player.               |
| `timeEnd`     | `number`        | The time to end the player animation.                 |
| `animation` | `(x: CustomEventInternals.AnimateTrack) => void`| The animation to apply to the player.|
| `playerTrack` | `string`        | The extra player track to assign the player to.       |
| `noteTrack`   | `string`        | The extra note track to assign the parented notes to. |

## Events

There are a few classes to help with creating and modifying lighting events and colors.

### Light Gradient

`lightGradient` is a class that helps with creating color gradients for lights over a period of time.

#### Example

```ts
new lightGradient(0, 32, 0, [[1, 0, 0, 1], [0, 1, 0, 1], [1, 0, 1, 1]], "HSV", "easeInOutExpo").push()
```

Or referenced as a variable:

```ts
const gradient = new lightGradient(0, 32);
gradient.colors = [[1, 0, 0, 1], [0, 1, 0, 1], [1, 0, 1, 1]];
gradient.push()
```

#### Params

| Param       | Type                                    | Description                                                         |
|-------------|-----------------------------------------|---------------------------------------------------------------------|
| `time`      | `number`                                | When to start the gradient                                    |
| `duration`  | `number`                   | The duration of the gradient.                        |
| `type` | `number` | The lightType for the events
| `colors` | `ColorType[]` | The colors to include in the gradient.|
| `lerpType` | `"HSV" \| "RGB"` | The lerp type to use on each color in the gradient.|
|`easing`|`EASE`|The easing to use on each color in the gradient.|

### Lerp Gradient

`lerpGradient` is a class that helps to return RGB colors that lerp a hue gradient.

#### Example

```js
const wall = new Wall()
const col = new lerpGradient([0, 1, 1, 1], 20)
for(let i = 0; i < 20; i++) {
 wall.color = col.export(i)
 wall.push()
}
```

#### Params

| Param         | Type            | Description                                          |
|---------------|-----------------|------------------------------------------------------|
| `startingColor`        | `ColorType`        | The starting color to begin from. Uses HSV color type.               |
| `loopPoint`     | `number`        | The number of repeats before returning to the original color.|

### Strobe Generator

`strobeGenerator` is a class that helps with generating sequences of strobing lights.

#### Example

```ts
new strobeGenerator(10, 20, 2, 0, [1, 0, 0, 1]).push()
```

Or:

```ts
const  strobe = new  strobeGenerator(10, 10, 2, 0)
strobe.color = [1, 0, 0, 1]
strobe.ease = "easeInExpo"
strobe.push()
```

#### Params
|Param|Type|Description|
|---|---|---|
|`time`|`number`|The time to start the strobe sequence.|
|`duration`|`number`|The duration of the sequence.|
|`interval`|`number`|The number of lighting events to do per beat. This includes the off events.|
|`type`|`number`|The lightType to use.|
|`color`|`ColorType \| boolean`|The color that acts as the on event. Can also be a boolean to use vanilla lighting colors.|
|`ids`|`LightID`|The IDs of the lights to affect.|
|`ease`|`EASE`|Any easing to use on the sequence. NOTE: some of the easings may yield unusual results.|
## Export User Shared Environment

`exportShareableEnv` is a function that can be run at the end of your script to export all the environments (and optionally, events) to a shareable environment file.

### Example

```js
exportShareableEnv({
 name: "A cool environment",
 author: "Me",
 copyLightEvents: "Events At beat 0",
 features: {
  useChromaEvents: true
 }
})
```

### Params

|Param|Type|Description|
|--------|------------|--------|
|`settings.name`|`string`|The name for the environment and environment file.|
|`settings.author`|`string`|The author of the environment (probably you).|
|`settings.environmentVersion`|`string` `"number.number.number"`|The version of your environment. (defaults to "0.0.1")|
|`settings.description`|`string`|Currently unused by chroma. The description of your environment.|
|`settings.copyLightEvents`|`"All Events"\|"Events At Beat 0"`| Optional to copy lighting events from the map to your env.|
|`settings.features.forceEffectsFilter`| `"AllEffects"\|"StrobeFilter"\|"NoEffects"`| Suggests the effectsFilter to be used with the env.|
|`settings.features.useChromaEvents`|`boolean`|Suggests the chromaEvents setting to be used with the env.|
|`settings.features.basicBeatMapEvents`|`Json[]`|The raw json of basic lighting events to be loaded with your env. `copyLightEvents` is the better alternative to this.|

## Import User Shared Environment

Works in the opposite way to the afformentioned export function. This function imports the environment from a .dat file.

### Example

```ts
importShareableEnv("Cool Env.dat")
```

### Params
|Param|Type|Description|
|-|-|-|
|`file`|`string`|The path of the file to import from.|
|`conflictingBaseEnv`|`"Keep Map Environment" \| "Use Imported Environment"`| The function will prompt you to use this param if the base environment of the imported env is different to your map's base environment. You don't need to specify this normally, only if the error appears in the console.|

## Geometry material

`Material` is a class that helps with creating map-wide materials quickly. It also supports auto-filling shader keywords with VSCode. Youcan also assign the created material to the primary group of a ModelScene.

### Example

```ts
new Material("Solid",{shader:"BTSPillar"}).shaderKeywords({BTSPillar:["ENABLE_SPECULAR","DIFFUSE","_RIMLIGHT_NONE"]}).push()
```
Or:
```ts
const mat = new Material("Solid",{shader:"BTSPillar"})
mat.shaderKeywords({BTSPillar:["ENABLE_SPECULAR","DIFFUSE","_RIMLIGHT_NONE"]})
mat.addPrimaryGroup({
  sceneName: scene,
  blenderMatName: "Solid",
  geoType: "Cube"
})
mat.push()
```

### Params

| Param       | Type                                    | description                                                         |
|-------------|-----------------------------------------|---------------------------------------------------------------------|
| `name`      | `string`                                | The name of the material.                                    |
| `material`  | `RawGeometryMaterial`                   | The raw material data.                        |

|Method|Params|Description|
|-|-|-|
|`addPrimaryGroup`|`sceneName: ModelScene`, `blenderMatName: string`, `geoType: GEO_TYPE`|Adds your material to the primary group of a ModelScene.|
|`shaderKeywords`|`keywords: shaderKeywords`| Add shader keywords to your material with autofill on supported platforms.|

**NOTE:** The shaderKeywords function is only confirmed to work on Beat Saber 1.27. This is subject to change with any Beat Saber update and may not be consistently updated on MapKey.

Shader keywords need to be formatted as such in the `shaderKeywords()` method.
```ts
{MaterialShader:["keyword", "keyword"]}
// MaterialShader would be replaced by the name of the shader that your material uses. e.g., BTSPillar, or WaterfallMirror etc.
```

## Multi Environment

`multiEnv` allows for essentially a ReMapper Environment statement which uses multiple lookup methods to select multiple environment pieces.

### Example

```js
const menv = new multiEnv()
menv.contains = ["PlayersPlace", "PillarL"];
menv.regex = ["Clouds$"];
menv.push(env => {
 env.position = [0,10,100]
 env.scale = [0.5,0.5,0.5]
})
```

### Params

| Param     | Type                       | Description                                          |
|-----------|----------------------------|------------------------------------------------------|
| `contains`     | `string[]`       | The ids to use Contains lookup for. |
|`regex`|`string[]`| The ids to use Regex lookup for.|
|`endsWith`|`string[]`|The ids to use EndsWith lookup for.|
|`exact`|`string[]`|The ids to use Exact lookup for.|

The `push()` method also requires a parameter.

|Param|Type|Description|
|-------|------|------|
|`forEnv`|`(x: Environment) => void`|What to execute for each environment piece.|

## Left Right Notes

`noteSplit` is a class allowing to split the left and the right notes and applying custom data and modifications to each

### Example

```js
const LR = new notePath(0, 20)
LR.forNoteLeft = l => {
   l.animate.position = [[-10, 10, 0, 0], [0, 0, 0, 0.3]]
}
LR.forNoteRight = r => {
   r.animate.position = [[10, 10, 0, 0], [0, 0, 0, 0.3]]
}
LR.push();
```

### Params

| Param          | Type                | description                                             |
|----------------|---------------------|---------------------------------------------------------|
| `time`         | `number`            | the time to start applying modifications to split notes |
| `timeEnd`      | `number`            | the time to stop applying modifications to split notes  |
| `forNoteLeft`  | `(n: Note) => void` | the modifications to left notes                         |
| `forNoteRight` | `(n: Note) => void` | the modifications to right notes                        |

## Laser Group

laser group allows you to add a primary group of your model scene with customizable lightID and type

### Example

```ts
const group = new laserScene(new Environment("LightingWithTarget", "EndsWith"))
group.amount = 12
group.blenderMatName = "Lightning"
group.lightID = 101
group.lightType = 0
group.addGroup = {
   true,
   scene
}
```

This one can get a little confusing so let me explain - this will add a primary group to your scene with customizable lightID, lightType, and Blender material name.  This will help you with lighting your lasers by adding a number after your material ie: `Lighting1` which will be assigned to the 1st available interval to your assigned lightID meaning you no longer have to guess which light is which.

### Params

| Param            | Type                           | description                                                              |
|------------------|--------------------------------|--------------------------------------------------------------------------|
| `object`         | `GroupObjectTypes`             | the object (laser) of your added group, Environment, or geometry          |
| `amount`        | `number`                       | the number of lasers placed in Blender with the material name            |
| `blenderMatName` | `string`                       | the name of the material assigned in Blender (without the added numbers) |
| `lightID`        | `number`                       | the minimum light id of the 1st laser                                    |
| `lightType?`     | `number`                       | the light type of the assigned lasers                                    |
| `addGroup?`      | `{boolean, ModelScene, Vec3?}` | add as a primary group?, scene name, transform for object                |

## Filters

Filters are functions similar to `notesBetween` except they filter for objects based on a property and a value. For example, all notes with a direction of 5, or all geometry with the track "cool track".

### Geometry filter

```ts
filterGeometry(
   "track",
   "sickTrackBruh",
   x = > {
      x.position = [0, 0, 0]
   }
)
```

This will filter geometry with the track `"sickTrackBruh"` and assign it to position `[0, 0, 0]`

#### Params

| Param      | Type                           | description                                    |
|------------|--------------------------------|------------------------------------------------|
| `property` | `GEO_FILTER_PROPS`             | the property to filter your geometry with      |
| `value`    | `number[] \| string \| number` | the value to filter your geometry with         |
| `forEach`  | `(x: Geometry) => void`        | the modifications to filtered Geometry objects |

### Environment filter

```ts
filterEnvironment(
   "track",
   "lessSickTrackBruh",
   x => {
      x.position = [0, 1, 0]
   }
)
```

This will filter environment pieces with the track `"lessSickTrackBruh"` assigning them to position `[0, 1, 0]`

#### Params

| Param      | Type                           | Description                                       |
|------------|--------------------------------|---------------------------------------------------|
| `property` | `ENV_FILTER_PROPS`             | the property to filter your environment with      |
| `value`    | `number[] \| string \| number` | the value to filter your environment with         |
| `forEach`  | `(x: Environment) => void`     | the modifications to filtered environment objects |

### Note Filter

```js
filterNotes(
 "x",
 "0",
 note => {
  note.animate.localRotation = [[0,0,90,0],[0,0,0,0.5,"easeOutExpo"]]
})
```

#### Params

|Param|Type|Description|
|-----|-----|----|
|`property`|`NOTE_FILTER_PROPS \| rotation \| localRotation`|The property to check for on each note. This can either be an auto-fill property like "position", or it can be one of the available enums (like rotation.x).|
|`value`|`number[] \| string \| number \| boolean`|The value that the property must be to pass.|
|`forEach`|`(x: Note) =>  void`|What to execute for each note that passes.|

## Shape Generators

The shape generators will generate custom 2d and 3d shapes from geometry cubes.

### Polygon

`Polygon` generates a regular 2d shape with any number of sides > 2. The shape will generate along the XY plane but can be rotated and repositioned to to your liking.

```ts
const tri = new Polygon("water")
tri.sides = 3
tri.radius = 6
tri.position = [0, 0, 10]
tri.scale = [1, 1, 1]
tri.rotation = [0, 0, 0]
tri.innercorners = true
tri.push()
```

#### Params

| Param          | Type      | description                                                                              |
|----------------|-----------|------------------------------------------------------------------------------------------|
| `material`     | `GeometryMaterial`  | The material to use for your shape. Can either be a raw geo material, or the name of a premade material.                                                      |
| `sides`        | `number`  | The number of sides of the shape.                                                         |
| `radius`       | `number`  | The radius of the shape.                                                                  |
| `position`     | `Vec3`    | The position of the shape.                                                                |
| `scale`        | `Vec3`    | The scale of the shape.                                                                   |
| `rotation`     | `Vec3`    | The rotation of the shape.                                                               |
| `innercorners` | `boolean` | Changes the way that corners are joined. Triangles look better (IMO) with inner corners. |
| `track`        | `string`  | The track to assign the shape to.                                                         |
| `iterateTrack` | `boolean` | If false, each piece of the shape will have the same track, if true they will have individual tracks.                                      |
|`iterateOffset`|`number`| If defined, will begin iterating tracks from this number rather than 0.|

### Primitive Shape

`primitiveShape` generates a 3d shae primitive from geometry cubes. As of now, the only available shapes are `prism`, `ringSphere`, and `ringCone`.

#### Example

```ts
new primitiveShape("water", [0, 10, 10], [1, 1, 1], [-90, 0, 0], "pyramid").ringCone().push()
```

Or:
```ts
const pyramid = new primitiveShape("solid", [0, 10, 10], [1, 1, 1])
pyramid.track = "pyramid"
pyramid.rotation = [-90, 0, 0]
pyramid.ringCone()
pyramid.push()
```

#### Params

##### Parameters for the base class:

|Param|Type|Description|
|-|-|-|
|`material`|`GeometryMaterial`|The material to use.|
|`position`|`Vec3`|The position of the center of the shape.|
|`scale`|`Vec3`|The scale of the individual sides of the shape. (Note - the x value is ignored as it is used to fill the sides)|
|`rotation`|`Vec3`|The rotation to apply to the shape.|
|`track`|`string \| undefined`|The track for the shape.|
|`iterateTrack`|`boolean`|(Default - true) Changes the track value for each piece of the shape. False: every piece will have the same track. True: each piece will have the track `${track}_${i}` where {0 <= i < the number of cubes in the shape}.|
|`iterateOffset`|`number`|The offset to begin iterating tracks from.|

##### Prism:
Generates the prism of any regular 2d shape.
|Param|Type|Description|
|-|-|-|
|`sides`|`number`|The number of sides.|
|`radius`|`number`|The radius of the 2d shape, i.e., the triangles of a triangular prism.|
|`length`|`number`|The extrusion length of the prism, i.e., the length of the sides.|
|`innerCorners`|`boolean`|Makes the corners join on the inside edge of the sides rather than the outside edge. looks better for triangles.|
|`alignedSides`|`boolean`|Aligns the rotation of the sides to the nearest clockwise side of the 2d prism base shape.|

##### Ring Sphere

Generates a sphere made out of rings.
|Param|Type|Description|
|-|-|-|
|`radius`|`number`|The radius of the sphere.|
|`rings`|`number`|The number of rings to make the sphere from.|
|`segments`|`number`|The number of segments to make each ring from.|
|`innerCorners`|`boolean`|Makes the segments join at the inner corner of the cubes rather than the outer one.|

##### Ring Cone

Generates a cone (or pyramid) out of rings.
|Param|Type|Description|
|-|-|-|
|`rings`|`number`|The number of rings to make the cone from.|
|`segments`|`number`|The number of segments per ring. For example, 4 will make a square-base pyramid, 3 will make a triangle-base pyramid.|
|`baseRadius`|`number`|The radius of the base of the cone.|
|`depth`|`number`|The depth of the cone (how far away the point is from the base).|
|`innerCorners`|`boolean`|Makes the segments join at the inner corner of the cubes rather than the outer one.|

### Text

MapKey has 2 classes to help with quick text production in your map.

#### Text To Wall

Create text out of walls.

#### Example

```ts
new textToWall("blah blah blah, cool text idk", "font", 64, 2).push()
```

Or:

```ts
const hi = new textToWall("Hi", "font")
hi.time = 64;
hi.duration = 2;
hi.wallData = wall =>{
    wall.color = [1,0,0,1];
    wall.animate.dissolve = [0.5]
}
hi.textData = text =>{
    text.position = [0,0,30];
}
hi.push()
```

#### Params

|Param|Type|Description|
|-|-|-|
|`text`|`string`|The text to write|
|`fontModel`|`string`|The relative path of your font model.|
|`time`|`number`|The time to spawn the text.|
|`duration`|`number`|The duration of the text.|
|`textData`|`(data: Text) => void`|Any extra data to add to the text.|
|`wallData`|`(data: Wall) => void`|Any extra data to add to the walls.|

### Text To Geometry

Create text with geometry cubes.

#### Example

```ts
new textToGeo("blah blah", "font", {shader:"Standard"}).push()
```

Or:

```ts
const hi = new textToGeo("Hi", "font")
hi.material = "water";
hi.push()
```

#### Params

|Param|Type|Description|
|-|-|-|
|`text`|`string`|The text to write.|
|`fontModel`|`string`|The relative path of your font model.|
|`material`|`GeometryMaterial`|The material for your geometry objects.|
|`extraData`|`(data: Text) => void`|Any extra data to add to the text.|

## Presets

MapKey offers some preset effects to quickly spice up your map. The only complete preset currently is the note mod preset. But some basic environment setups are in development.

### Note Mods

`noteMod` is a class that helps to create quick note mods from a collection of presets.

#### Example

```js
new noteMod(0,64).noteLine()
```

This will make all the notes from beats 0-64 have the "note line" animation.

#### Params

|Param|Type|Description|
|---|---|---|
|`startTime`|`number`|The starting time of the notes, including notes on this time.|
|`endTime`|`number`|The ending time of the notes, excluding notes on this time.|
|`extraData`|`(x: Note) =>  void`|Anything extra to add to the notes on top of the note mods.|

Each individual note mod may also have its own params. If you are using VSCode, you should see a brief description of how to use the params in the popup window. However, all params have default values, so you don't need to specify anything if you just want the basic note mod.

## Constants

Map Key offers a variety of constants ranging from environment IDs to light types for ReMapper's dumb lightType system.

### Environment IDS

```ts
const env = new Environment(Env.gaga.Lightning, "Regex")
```

All environment constants will use regex just like ReMapper's.

### Colors

```ts
const note = new Note()
note.color = colors.pink
```

Map Key offers color constants compatible with the RGB function (0 - 255) and with normal Beat Saber colors compatible with ReMapper.

### lightTypes

```ts
const light = new Environment("FrontLaser$", "Regex")
light.lightType = lightTypes.ringLights // returns 1
```

Light types will help with the cross between numbers and light lane names in ReMapper.

## Misc. Features

**Disclaimer:** This section may be incomplete as new features are added. It is recommended to explore what can be imported by MapKey and see for yourself some of the cool misc. features it has to offer.

### Log Map Data

`functionLogger` is a class that displays a brief overview of your map contents in the console.

```js
new functionLogger()
```

### Random Array

`randArray` is a class that creates an array of random numbers with an optional seed for reproducible results.
It has the option to produce numbers with no identical consecutive numbers or even no identical numbers whatsoever.

```js
const array = new randArray(69420, [0, 100], 100, 2).runUnique()
```

### Procedural Noise

`Noise` is a class that creates a noise map with an optional seed for reproducible results. Noise values range from roughly -0.9 to 0.9. It can then be used to create 2d, 3d, or 4d noise.

```js
const noise = new Noise()
console.log(noise.point2d([1,0]))
```

### Seeded RNG

`seedRNG` is a function that returns a random number with an optional seed for reproducible results.

```js
console.log(seedRNG(0,10,"a cool seed, can also be a number"))
```

### Log Functions

`logFunctions` is a function that can be run at the top of your map script to console log MapKey events as they are executed.

### RGB converter

`rgb` is a function that easily converts gamma RGB to linear RGB. i.e., RGB with values from 0 to 255, into RGB with values from 0 to 1.

```js
console.log(rgb(colors.rgb.coral))
```

### All Between

`allBetween` is a function that works exactly the same as ReMapper's `notesBetween` function. Except it runs for notes, arcs, and chains all in one.

```js
allBetween(0,10,n =>{
 n.animate.rotation = [[0,0,90,0],[0,0,0,0.5]]
})
```

### Blender Frame Math

`blenderFrameMath` is a class that helps with the math of lining up Blender animations to a map.

```js
new blenderFrameMath(120,64,24).totalFramesInBlender()
```

### Copy Map folder

`copytodir` is a function that copies the contents of the map folder to another location (most likely your beat saber map folder).

```js
copytodir(["ExpertPlusStandard.dat"], "Beat Saber folder")
```

### Vector Unit

Finds the unit vector in the same direction as a given vector.

```ts
console.log(vectorUnit([10,5,6]))
```

### Point Rotation

`pointRotation` finds the rotation of an object at point 1 so that it is facing toward point 2.

```js
console.log(pointRotation([0, 0, 0], [0, 10, 10]))
```

### Repeat

If you are really lazy like me, then you might find this function useful. It writes out a `for` loop for you in a very simple function.

```ts
repeat(10,rep => {console.log(rep)})
```

### Optimize Materials

Converts all duplicate raw materials on geometry objects into a single map-wide material. Improving the load time and filesize of your map.

Has different methods for naming the materials, this won't change much. But can improve file-size or readability in some cases.

```ts
optimizeMaterials()
```

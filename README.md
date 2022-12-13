# Map Key
map key is a library of functions designed to extend [ReMapper](https://github.com/Swifter1243/ReMapper) if you don't know what that is then im sorry but this is not the tool for you.  If you do then welcome! Map Key is designed to make otherwise tedious things easier, here are a few examples:

**despawning environment pieces**
**base ReMapper**
```ts
const piece1 = new Environment("Building$", "Regex")
peice1.position = [-9999, -9999, -9999]
peice1.push

const piece2 = new Environemnt("Track$", "Regex")
piece2.position = [-9999, -9999, -9999]
piece2.push();
```
**with Map Key**
```ts
new despawner("Regex", [
    "Building$",
    "Track$"
])
```
**moving the player**
**with base ReMapper**
```ts
new CustomEvent(0).assignPlayerToTrack("player").push();

const track = new CustomEvent(0).animateTrack()
track.animate.position = [[0, 0, 0, 0], [0, 10, 0, 0.5], [0, 0, 0, 1, "easeOutQuad"]]
track.push();

new CustomEvent().assignTrackParent(["notes"], "player").push();

notesBetween(0, 10, n => {
   n.customData.track = "notes"
})
```
**with Map Key**
```ts
new PlayerAnim(0, 10).position([[0, 0, 0, 0], [0, 10, 0, 0.5], [0, 0, 0, 1, "easeOutQuad"]])
```
# Documentation
there are 2 similar ways to call these functions, one using const and one not, each function will be documented here
**option 1**
```ts
new despwner("Contains", [
   "Environment"
]).exclude([
   "Lighting",
   "Auroras"
])
```
**option2**
```ts
const des = new despawner("Contains", [
   "Environment"
])
des.exclude([
   "Auroras",
   "Lightning"
])
```
these 2 choices will apply to almost all of the functions here, for any that it doesn't I'll say that in the documentation for the function
# Installation
To use Map Key in your script, you will need to import it. This works in the same way as ReMapper.

You can either import all items.
```ts
import * as mk from "https://deno.land/x/mapkey/src/exports.ts"
```
Or specify the individual items you need.
```ts
import { PlayerAnim, shapeGenerator } from "https://deno.land/x/mapkey/src/exports.ts"
```
**Important**
When you add your import it will likely show an error, make sure you update the version to its redirected specifier, and that you cache all dependencies.
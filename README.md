![image](https://user-images.githubusercontent.com/111317032/207435249-e15b8624-bde4-4cd7-b96a-0713ceaac681.png)

# Map Key
Map Key is a typescript library designed to extend [ReMapper](https://github.com/Swifter1243/ReMapper) which allows you to do tedious things much faster and more efficiently.

# Installation
To use Map Key in your script, you will need to import it. This works in the same way as ReMapper.

You can either import all items (not recommended as you will have to prefix everything with `mk.`).
```ts
import * as mk from "https://deno.land/x/mapkey@0.1.0/src/exports.ts"
```
Or specify the individual items you need.
```ts
import { PlayerAnim, shapeGenerator } from "https://deno.land/x/mapkey@0.1.0/src/exports.ts"
```
**Important!**

When you add your import it will likely show an error, hover over the link, click quick fix => cache dependancy.

to get started with map key, head over to the [Wiki](https://github.com/Splashcard04/Map-Key/wiki).

# HeckLib?

For those of you who use [HeckLib](https://github.com/Heck-Library/HeckLib), most of the features of MapKey will not work for you. However, a port of MapKey is being *slowly* developed. So, hang tight, you have not been forgotten.  There is a **very** small beta version of a port which you can find [here](https://github.com/Splashcard04/Map-Key/tree/main/src/HeckLib), in the future there will be a deno file cloning system just like the one for ReMapper so that you dont have to manually download.

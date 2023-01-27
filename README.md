![image](https://user-images.githubusercontent.com/111317032/207435249-e15b8624-bde4-4cd7-b96a-0713ceaac681.png)

# Map Key
Map Key is a typescript library designed to extend [ReMapper](https://github.com/Swifter1243/ReMapper) which allows you to do tedious things much faster and more efficiently.

## Installation
To use Map Key in your script, you will need to import it. This works in the same way as ReMapper.

You can either import all items (not recommended as you will have to prefix everything with `mk.`).
```ts
import * as mk from "https://deno.land/x/mapkey@1.2.0/src/ReMapper/mod.ts"
```
Or specify the individual items you need.
```ts
import { PlayerAnim, shapeGenerator } from "https://deno.land/x/mapkey@1.2.0/src/ReMapper/mod.ts"
```
**Important!**
When you add your import it will likely show an error, hover over the link, click quick fix => cache dependancy.

To get started with map key, head over to the [Wiki](https://github.com/Splashcard04/Map-Key/wiki).

## Other mapping tools?
For those of you who use [HeckLib](https://github.com/Heck-Library/HeckLib), most of the features of MapKey will not work for you. However, a port of MapKey is being *slowly* developed. So, hang tight, you have not been forgotten.  There is a **very** small beta version of a port which you can find [here](https://github.com/Splashcard04/Map-Key/tree/main/src/HeckLib), in the future there will be a deno file cloning system just like the one for ReMapper so that you dont have to manually download.

For those of you who use [JSMapper](https://github.com/Splashcard04/JSMapper), MapKey will not work for you. Like HeckLib, a port of MapKey is being developed and will be available in the near future (most likely the next release of MapKey). When this happens, the importing system will change, so be prepared for that in the update. You can check the current state of JSM's MapKey [here](https://github.com/Splashcard04/Map-Key/tree/main/src/JSMapper).  Note that JSM will not use a deno link and will instead be an npm module, you can find out more on the wiki

# Pull Request Guide
 
If you didn't already know, map key is an extension for remapper which is composed of mostly utils, if you would like to PR your own function, constant or preset, follow this guide.

## Functions / Utils
To PR a function make sure that it includes js doc formatted as all others are, if you would like to discuss your pull request or just *life* join the [map key discord](https://discord.gg/NSmpcYDS)
Make sure to include parameters and do your best to keep the format similar to everything else as the functionality should be reletivaly similar for user advantage. If you do PR something that looks like a good idea but could use some more execution of some sort, changes will likely be made, but please dont be offended by this, it's just to ensure that your function is the best it can be for MapKey.

## Constants
To pr a constant, make sure you edit the constants.ts file and keep consistent formatting with the other constants, new constant categories are allowed of course, as well as additional environment IDs or something of the sort.

## conclusion
All PRs are very welcome, and will be merged 99% of the time. If they need to be modified, then that will be done. Once again, if you have any concerns, or would like to disscuss anything relating to PRs or MapKey in general, the [discord](https://discord.gg/NSmpcYDS) is the best place to start.

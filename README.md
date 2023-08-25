# Map Key

![image](https://user-images.githubusercontent.com/111317032/207435249-e15b8624-bde4-4cd7-b96a-0713ceaac681.png)

Map Key is a typescript library designed to extend [ReMapper](https://github.com/Swifter1243/ReMapper) which allows you to do tedious things much faster and more efficiently.

## Installation

To use Map Key in your script, you will need to import it. This works in the same way as ReMapper.

You can either import all items (not recommended as you will have to prefix everything with `mk.`).

```ts
import * as mk from "https://deno.land/x/mapkey@1.3.1/src/ReMapper/mod.ts";
```

Or specify the individual items you need.

```ts
import { playerAnim, Polygon } from "https://deno.land/x/mapkey@2.0/mod.ts";
```

**Important!**
When you add your import it will likely show an error, hover over the link, click quick fix => cache dependancy.

To get started with map key, head over to the [Wiki](https://github.com/Splashcard04/Map-Key/wiki).

## Pull Request Guide

If you didn't already know, map key is an extension for remapper which is composed of mostly utils, if you would like to PR your own function, constant or preset, follow this guide.

### Functions / Utils

To PR a function make sure that it includes js doc formatted as all others are, if you would like to discuss your pull request or just _life_ join the [discord](https://discord.gg/Q9fvu7Bn87).
Make sure to include parameters and do your best to keep the format similar to everything else as the functionality should be reletivaly similar for user advantage. If you do PR something that looks like a good idea but could use some more execution of some sort, changes will likely be made, but please dont be offended by this, it's just to ensure that your function is the best it can be for MapKey.

### Constants

To pr a constant, make sure you edit the constants.ts file and keep consistent formatting with the other constants, new constant categories are allowed of course, as well as additional environment IDs or something of the sort.

## Conclusion

All PRs are very welcome, and will be merged 99% of the time. If they need to be modified, then that will be done. Once again, if you have any concerns, or would like to disscuss anything relating to PRs or MapKey in general, the [discord](https://discord.gg/Q9fvu7Bn87) is the best place to start.

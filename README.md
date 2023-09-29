# Map Key

![image](https://user-images.githubusercontent.com/111317032/207435249-e15b8624-bde4-4cd7-b96a-0713ceaac681.png)

Map Key is a typescript library designed to extend [ReMapper](https://github.com/Swifter1243/ReMapper) which allows you to do tedious things much faster and more efficiently.

## Installation

To use Map Key in your script, you will need to import it. This works in the same way as ReMapper.

You can either import all items (not recommended as you will have to prefix everything with `mk.`).

```ts
import * as mk from "https://deno.land/x/mapkey@2.0.0/src/ReMapper/mod.ts";
```

Or specify the individual items you need.

```ts
import { playerAnimation, Polygon } from "https://deno.land/x/mapkey@2.0.0/mod.ts";
```

**Important!**
When you add your import it will likely show an error, hover over the link, click quick fix => cache dependancy.

To get started with Map Key, head over to the [Wiki](https://github.com/Splashcard04/Map-Key/DOCS.md).

## Pull Request Guide

### Functions / Utils

To PR a function make sure that it includes js doc formatted as all others are, if you would like to discuss your pull request or just _life_ join the [discord](https://discord.gg/Q9fvu7Bn87).
Make sure to include parameters and do your best to keep the format similar to everything else as the functionality should be reletivaly similar for user advantage.
If your PR includes elements that need adjustments or improvement, then changes might be made before it gets merged. This is just to ensure that your PR is the best it can be for Map Key, so if you have any issues with changes made to your PR then feel free to contact us.

### Constants

To pr a constant, make sure you edit the constants.ts file and keep consistent formatting with the other constants, new constant categories are allowed of course, as well as additional environment IDs or something of the sort.

## Conclusion

All PRs are very welcome, and will be merged 99% of the time. If they need to be modified, then that will be done. Once again, if you have any concerns, or would like to disscuss anything relating to PRs or Map Key in general, the [discord](https://discord.gg/Q9fvu7Bn87) is the best place to start.

import cloneTemplateToCache from "./clone.ts"; 
import { configDir, path, fs } from "./deps.ts";

const name = Deno.args[0] ?? "."
 
const refIndex = Deno.args.findIndex(e => e === "--version" || e === "-v")
let ref = refIndex !== -1 ? Deno.args[refIndex + 1] : undefined

const currentFolder = Deno.cwd();

const destFolder = path.join(currentFolder, name)

if (name !== ".") await Deno.mkdir(destFolder)

const userDir = configDir();

if (!userDir) {
    console.error("Unable to find user config directory!");
    Deno.exit(1);
}

const remapperDirectory = path.join(userDir, "remapper_setup")

if (!ref) {
    const latestRelease = await fetch("https://api.github.com/repos/Splashcard04/Map-Key/releases/latest", {
        headers: {
            "Accept": "application/vnd.github+json"
        }
    })
    if (latestRelease.status != 200) {
        console.error(`Received error ${latestRelease.status} while fetching latest release name`)
        Deno.exit(2)
    }
    const json = await latestRelease.json()
    ref = json["tag_name"]!
}

if (!ref) {
    console.error(`No ref specified`)
    Deno.exit(2)
}

try {
    await Deno.mkdir(remapperDirectory, {
        recursive: true
    })
} catch (e) {
    if (e! instanceof Deno.errors.AlreadyExists) throw e;
}
    
const templatePath = path.join(remapperDirectory, ref)

try {
    await Deno.stat(templatePath)
} catch (e) {
    if (e instanceof Deno.errors.NotFound) {
        await cloneTemplateToCache(templatePath, ref);
    } else {
        throw e;
    }
}

// Validate the path exists
await Deno.stat(templatePath)

// now copy to path
const ignoredFiles = ["setup", ".git", "README.md", ".gitignore", "test", "LICENSE", "ExampleMaps.md"]

const tasks: Promise<void>[] = []

for await (const file of Deno.readDir(templatePath)) {
    if (ignoredFiles.includes(file.name)) continue


    const src = path.join(templatePath, file.name)
    const dest = path.join(destFolder, file.name)

    tasks.push(fs.copy(src, dest))
}

await Promise.all(tasks)

console.log(`setup from map key complete at ${destFolder} , Thanks for useing my really dumb package :D`)

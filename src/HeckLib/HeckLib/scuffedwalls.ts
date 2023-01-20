// deno-lint-ignore-file
import { __dirname } from "./main.ts";
import { vec2, vec3, vec4, vec1anim, vec3anim, vec4anim, Track, font } from "./types.ts";

// deno-lint-ignore-file no-namespace
function swFormat(input: string) {
    const json = JSON.parse(input);
    const funcName = Object.keys(json)[0]
    let output = json[funcName].time + ":" + funcName + "\n    " +
    JSON.stringify(json[funcName]).replace(/("|{|})/g, "").replace(/,/g, "\n    ")
    let swFile = Deno.readTextFileSync('./temp/swTemp.sw')
    swFile += `\n\n${output}`
    Deno.writeTextFileSync('./temp/swTemp.sw', swFile)
}

class swJSON {
    sw: {
        HideMapInRPC: true,
        MapFolderPath: string,
        SWFilePath: string,
        InfoPath: string
        MapFilePath: string
        OldMapPath: string
        ClearConsoleOnRefresh: true,
        IsAutoImportEnabled: true,
        IsBackupEnabled: true,
        Debug: false,
        IsAutoSimplifyPointDefinitionsEnabled: true,
        PrettyPrintJson: boolean,
        BackupPaths: {
            BackupFolderPath: string
            BackupSWFolderPath: string
            BackupMAPFolderPath: string
        }
    }
    constructor(diffName: string) {
        this.sw = {
            HideMapInRPC: true,
            MapFolderPath: __dirname + "temp",
            SWFilePath: `${__dirname}temp\\swTemp.sw`,
            InfoPath: __dirname + 'temp\\Info.dat',
            MapFilePath: `${__dirname}temp\\tempOut.dat`,
            OldMapPath: `${__dirname}temp\\temp.dat`,
            ClearConsoleOnRefresh: true,
            IsAutoImportEnabled: true,
            IsBackupEnabled: true,
            Debug: false,
            IsAutoSimplifyPointDefinitionsEnabled: true,
            PrettyPrintJson: true,
            BackupPaths: {
                BackupFolderPath: `${__dirname}temp\\${diffName.slice(0, -4)}Backup`,
                BackupSWFolderPath: `${__dirname}temp\\${diffName.slice(0, -4)}Backup\\` + 'SW_History',
                BackupMAPFolderPath: `${__dirname}temp\\${diffName.slice(0, -4)}Backup\\` + 'Map_History'
            }
        }
    }
}

export let scuffedWallsInUse = false;

export namespace SW {

    /**
     * If scuffed walls should be enabled or not.
     * @param enabled Wether scuffed walls should be enabled or not.
     * @param diffName The difficulty that scuffed walls should apply to.
     */
    export function scuffedWalls(enabled: boolean, diffName: string) {
        scuffedWallsInUse = enabled;
        const thing = JSON.stringify({_version: "2.2.0", _notes: [],_obstacles: [],_events: []}, null, 4);
        Deno.writeTextFileSync('./temp/temp.dat', thing)
    
        const swData = new swJSON(diffName)
        Deno.writeTextFileSync('./temp/swTemp.sw',
            "Workspace\n\n" +
            "0: Import\n" +
            "   Path:temp.dat"
        )
        Deno.writeTextFileSync('./ScuffedWalls.json', JSON.stringify(swData.sw, null, 2))
    
        const info = JSON.parse(Deno.readTextFileSync('./Info.dat'))
        const e = JSON.stringify(info, null, 4).replace(diffName, "tempOut.dat");
        Deno.writeTextFileSync('./temp/Info.dat', e)
    }

    export class SWFunc {
        model: {
            time?: number
            path?: string,
            fullPath?: string,
            hasAnimation?: boolean,
            duration?: number,
            definiteDurationBeats?: number,
            definiteDurationSeconds?: number,
            definiteTime?: "beats"|"seconds",
            spreadSpawnTime?: number,
            normal?: boolean,
            thicc?: number,
            deltaPosition?: vec3,
            deltaRotation?: vec3,
            deltaScale?: number,
            setDeltaPosition?: boolean,
            setDeltaScale?: boolean,
            color?: vec4,

            njsOffset?: number,
            njs?: number,
            interactable?: boolean,
            fake?: boolean,
            position?: vec2,
            rotation?: vec3,
            localRotation?: vec3,
            scale?: [number, number?, number?],
            track?: Track,
            animateDefinitePosition?: vec3anim,
            AnimatePosition?: vec3anim,
            AnimateDissolve?: vec1anim,
            AnimateDissolveArrow?: vec1anim,
            AnimateColor?: vec4anim,
            AnimateRotation?: vec3anim,
            AnimateLocalRotation?: vec3anim,
            AnimateScale?: vec3anim,
            AnimateInteractable?: vec1anim
        }
        constructor(path: string) {
            this.model = {
                fullPath: path
            }
        }
        time(x: number) {this.model.time = x; return this }
        path(x: string) {this.model.path = x; return this }
        fullPath(x: string) {this.model.fullPath = x; return this }
        hasAnimation(x: boolean) {this.model.hasAnimation = x; return this }
        duration(x: number) {this.model.duration = x; return this }
        definiteDurationBeats(x: number) {this.model.definiteDurationBeats = x; return this }
        definiteDurationSeconds(x: number) {this.model.definiteDurationSeconds = x; return this }
        definiteTime(x: "beats"|"seconds") {this.model.definiteTime = x; return this }
        spreadSpawnTime(x: number) {this.model.spreadSpawnTime = x; return this }
        normal(x: boolean) {this.model.normal = x; return this }
        outline(x: number) {this.model.thicc = x; return this }
        deltaPosition(x: vec3) {this.model.deltaPosition = x; return this }
        deltaRotation(x: vec3) {this.model.deltaRotation = x; return this }
        deltaScale(x: number) {this.model.deltaScale = x; return this }
        setDeltaPosition(x: boolean) {this.model.setDeltaPosition = x; return this }
        setDeltaScale(x: boolean) {this.model.setDeltaScale = x; return this }
        color(x: vec4) {this.model.color = x; return this }
        njsOffset(x: number) {this.model.njsOffset = x; return this }
        njs(x: number) {this.model.njs = x; return this }
        interactable(x: boolean) {this.model.interactable = x; return this }
        fake(x: boolean) {this.model.fake = x; return this }
        position(x: vec2) {this.model.position = x; return this }
        rotation(x: vec3) {this.model.rotation = x; return this }
        localRotation(x: vec3) {this.model.localRotation = x; return this }
        scale(x: [number, number?, number?]) {this.model.scale = x; return this }
        track(x: Track) {this.model.track = x; return this }
        animateDefinitePosition(x: vec3anim) {this.model.animateDefinitePosition = x; return this }
        AnimatePosition(x: vec3anim) {this.model.AnimatePosition = x; return this }
        AnimateDissolve(x: vec1anim) {this.model.AnimateDissolve = x; return this }
        AnimateDissolveArrow(x: vec1anim) {this.model.AnimateDissolveArrow = x; return this }
        AnimateColor(x: vec4anim) {this.model.AnimateColor = x; return this }
        AnimateRotation(x: vec3anim) {this.model.AnimateRotation = x; return this }
        AnimateLocalRotation(x: vec3anim) {this.model.AnimateLocalRotation = x; return this }
        AnimateScale(x: vec3anim) {this.model.AnimateScale = x; return this }
        AnimateInteractable(x: vec1anim) {this.model.AnimateInteractable = x; return this }

        push() {
            swFormat(JSON.stringify(this));
        }
    }
    export class Text extends SWFunc {
        texttowall: {
            time?: number,
            line: string,
            letting: number,
            leading: number,
            size: number
            path?: string,
            fullPath?: string,
            hasAnimation?: boolean,
            duration?: number,
            definiteDurationBeats?: number,
            definiteDurationSeconds?: number,
            definiteTime?: "beats"|"seconds",
            spreadSpawnTime?: number,
            normal?: boolean,
            thicc?: number,
            deltaPosition?: vec3,
            deltaRotation?: vec3,
            deltaScale?: number,
            setDeltaPosition?: boolean,
            setDeltaScale?: boolean,
            color?: vec4,

            njsOffset?: number,
            njs?: number,
            interactable?: boolean,
            fake?: boolean,
            position?: vec2,
            rotation?: vec3,
            localRotation?: vec3,
            scale?: [number, number?, number?],
            track?: Track,
            animateDefinitePosition?: vec3anim,
            AnimatePosition?: vec3anim,
            AnimateDissolve?: vec1anim,
            AnimateDissolveArrow?: vec1anim,
            AnimateColor?: vec4anim,
            AnimateRotation?: vec3anim,
            AnimateLocalRotation?: vec3anim,
            AnimateScale?: vec3anim,
            AnimateInteractable?: vec1anim
        }
        constructor(font: font) {
            super(font);
            this.texttowall = {
                line: "text",
                letting: 1,
                leading: 1,
                size: 1
            }
        }
        text(x: string) { this.texttowall.line = x; return this; }
        letting(x: number) { this.texttowall.letting = x; return this; }
        leading(x: number) { this.texttowall.leading = x; return this; }
        size(x: number) { this.texttowall.size = x; return this; }
        push() {
            let out = {
                texttowall: {
                    ...this.model,
                    ...this.texttowall
                }
            }
            swFormat(JSON.stringify(out))
        }
    }
}

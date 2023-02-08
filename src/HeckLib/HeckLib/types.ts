// deno-lint-ignore-file no-explicit-any

import { Difficulty, Mod, Shader, Shape } from './consts.ts';

export type Track = string|string[];

export type lineIndex = 0|1|2|3;
export type lineLayer = 0|1|2;
export type noteDir = 0|1|2|3|4|5|6|7|8;
export type noteType = 0|1|3;
export type wallType = 0|1;

export type vec1 = [x: number];
export type vec2 = [x: number, y: number];
export type vec3 = [x: number, y: number, z: number];
export type vec4 = [r: number, g: number, b: number, a: number];

export type vec1frame = [x: number, time: number, easing?: string];
export type vec3frame = [x: number, y: number, z: number, time: number, easing?: string, spline?: "splineCatmullRom"];
export type vec4frame = [r: number, g: number, b: number, a: number, time: number, easing?: string, spline?: "splineCatmullRom"];

export type vec1anim = string|vec1frame[]|vec1;
export type vec3anim = string|vec3frame[]|vec3;
export type vec4anim = string|vec4frame[]|vec4;

export type requirement = Mod.Chroma | Mod.Cinema | Mod.Mapping | Mod.Noodle;
export type diffFile = 
    Difficulty.Lawless.Easy |
    Difficulty.Lawless.Normal |
    Difficulty.Lawless.Hard |
    Difficulty.Lawless.Expert |
    Difficulty.Lawless.ExpertPlus |

    Difficulty.Standard.Easy |
    Difficulty.Standard.Normal |
    Difficulty.Standard.Hard |
    Difficulty.Standard.Expert |
    Difficulty.Standard.ExpertPlus |

    Difficulty.Lightshow.Easy |
    Difficulty.Lightshow.Normal |
    Difficulty.Lightshow.Hard |
    Difficulty.Lightshow.Expert |
    Difficulty.Lightshow.ExpertPlus;

export type noteJump = "Dynamic" | "Static";
export type effects = "AllEffects" | "Strobefilter" | "NoEffects";
export type energy = "Bar" | "Battery";
export type speed = "Normal" | "Faster" | "Slower" | "SuperFast";
export type enabledWall = "All" | "FullHeightOnly" | "NoObstacles";

export type geoShape = string | Shape.Capsule | Shape.Cube | Shape.Cylinder | Shape.Plane | Shape.Quad | Shape.Sphere | Shape.Triangle;
export type shaderType = string | Shader.OpaqueLight | Shader.TransparentLight | Shader.Standard;
export type mat = {
    _color: vec3,
    _shader: shaderType,
    _track?: Track,
    _shaderKeywords?: string[]
}

export type anyAnimation = vec1anim|vec3anim|vec4anim;

export type POINTDEFINITION = {
    name: string,
    points: vec1anim|vec3anim|vec4anim
}
//#region Objects
export type WALL = {
    time: number,
    x?: lineIndex,
    y?: lineLayer,
    duration?: number,
    width?: number,
    height?: number,
    data: customNoteData,
    anim: animationData
}

export type wallData = {
    time: number,
    x?: lineIndex,
    y?: lineLayer,
    duration?: number,
    width?: number,
    height?: number
}

export type customWallData = {
    track?: Track,
    color?: vec4,
    position?: vec2,
    rotation?: vec3,
    localRotation?: vec3,
    size?: vec2,
    scale?: vec3,
    njs?: number,
    offset?: number,
    fake?: boolean,
    interactable?: boolean
}

export type NOTE = {
    time: number,
    x?: lineIndex,
    y?: lineLayer,
    type?: noteType,
    direction?: noteDir,
    data: customNoteData,
    anim: animationData
}

export type noteData = {
    time: number,
    x?: lineIndex,
    y?: lineLayer,
    type?: noteType,
    direction?: noteDir
}

export type customNoteData = {
    track?: Track,
    color?: vec4,
    position?: vec2,
    rotation?: vec3,
    localRotation?: vec3,
    flip?: vec2,
    scale?: vec3,
    njs?: number,
    offset?: number,
    fake?: boolean,
    interactable?: boolean,
    disableSpawnEffect?: boolean,
    disableNoteGravity?: boolean,
    disableNoteLook?: boolean
}

export type animationData = {
    position?: vec3anim,
    definitePosition?: vec3anim,
    rotation?: vec3anim,
    localRotation?: vec3anim,
    scale?: vec3anim,
    color?: vec4anim,
    interactable?: vec1anim,
    dissolve?: vec1anim,
    dissolveArrow?: vec1anim
}
//#endregion

//#region Lights

export type lightType = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18;
export type lightValue = 0|1|2|3|4|5|6|7|8|9|10|11|12

export type LIGHT = {
    time: number,
    type: lightType,
    value: lightValue,
    float?: number,
    data?: lightCustomData
}

export type lightData = {
    time: number,
    type: lightType,
    value: lightValue,
    float?: number
}

export type lightCustomData = {
    lightID?: number,
    color?: vec3|vec4,
    easing?: string,
    lerpType?: "HSV"|"RGB",
    lockPosition?: boolean,
    nameFilter?: string,
    rotation?: number,
    step?: number,
    prop?: number,
    speed?: number,
    direction?: 0|1
}
//#endregion

//#region CustomEvents
export type parentTrackType = {
    parentTrack: Track,
    childrenTracks: string[]
}

export type playerTrackType = {
    track: Track
}

export type animateTrackData = {
    track: Track,
    duration: number,
    easing?: string,
    position?: vec3anim,
    localPosition?: vec3anim,
    rotation?: vec3anim,
    localRotation?: vec3anim,
    scale?: vec3anim,
    color?: vec4anim,
    dissolve?: vec1anim,
    dissolveArrow?: vec1anim,
    interactable?: vec1anim,
    timeAnim?: vec1anim
}

export type pathAnimData = {
    track: Track,
    easing?: string,
    position?: vec3anim,
    localPosition?: vec3anim,
    definitePosition?: vec3anim,
    rotation?: vec3anim,
    localRotation?: vec3anim,
    scale?: vec3anim,
    color?: vec4anim,
    dissolve?: vec1anim,
    dissolveArrow?: vec1anim,
    interactable?: vec1anim,
}

export type animComponentData = {
    track: Track,
    duration: number,
    easing?: string,
    BloomFogEnvironment?: {
        attenuation?: vec1anim,
        offset?: vec1anim,
        startY?: vec1anim,
        height?: vec1anim
    },
    TubeBloomPrePassLight?: {
        colorAlphaMultiplier?: vec1anim,
        bloomFogIntensityMultiplier?: vec1anim
    }
}

export type fogTrackData = {
    track: Track
}

export type CUSTOMEVENT = {
    json: {
        time: number
        type: string
        data: fogTrackData|animateTrackData|pathAnimData|playerTrackType|parentTrackType
    }
}
//#endregion
export type JsonModel = {
    position: vec3,
    rotation: vec3,
    scale: vec3,
    shape: geoShape,
    color: vec4
}

export type V3DIFF = {
    version: "3.1.0",
    customData: {
        environment: Record<string, any>[],
        fakeColorNotes: Record<string, any>[],
        customEvents: Record<string, any>[],
        pointDefinitions: Record<string, any>,
        fakeObstacles: Record<string, any>[],
        fakeBombNotes: Record<string, any>[]
    },
    bpmEvents: {b:number, m:number}[],
    rotationEvents: Record<string, any>[],
    colorNotes: Record<string, any>[],
    bombNotes: Record<string, any>[],
    obstacles: Record<string, any>[],
    sliders: Record<string, any>[],
    burstSliders: Record<string, any>[],
    waypoints: Record<string, any>[],
    basicBeatmapEvents: Record<string, any>[],
    colorBoostBeatmapEvents: Record<string, any>[],
    lightColorEventBoxGroups: Record<string, any>[],
    lightRotationEventBoxGroups: Record<string, any>[],
    basicEventTypesWithKeywords: Record<string, any>,
    useNormalEventsAsCompatibleEvents: boolean
}

export type V2JsonNote = {_time: number, _lineIndex: number, _lineLayer: number, _type: number, _cutDirection: number, _customData?: Record<string, any>};

export type V2DIFF = {
    _version: "2.2.0",
    _notes: V2JsonNote[],
    _obstacles: Record<string, any>[],
    _events: Record<string, any>[],
    _waypoints: Record<string, any>[],
    _customData: {
        _time?: number,
        _environment: Record<string, any>[],
        _customEvents: Record<string, any>[],
        _bookmarks: Record<string, any>[],
        _pointDefinitions: Record<string, any>[],
        _materials: Record<string, any>
    }
}

export type InitProperties = {
    /**
     * Sets the NJS of all notes
     */
    njs: number,
    /**
     * Sets the offset of all notes
     */
    offset: number,
    /**
     * Imports the lightshow from another difficulty.
     */
    lightshow?: string
}

export type FinalizeProperties = {
    translateToV3?: boolean,
    translateToV2?: boolean,
    /**
     * Formats and indents the file.
     * SIGNIFICANTLY INCREASES FILESIZE, DISABLE BEFORE FINAL RUN
     */
    formatting?: boolean,
    /**
     * showVanillaStats is VERY performance heavy and will slow down your script
     */
    showVanillaStats?: {
        notes?: boolean,
        walls?: boolean,
        bombs?: boolean,
        lights?: boolean
    },
    /**
     * showModdedStats is VERY performance heavy and will slow down your script
     */
    showModdedStats?: {
        notes?: boolean,
        walls?: boolean,
        bombs?: boolean,
        lights?: boolean,
        customEvents?: boolean,
        pointDefinitions?: boolean,
        showEnvironmentStats?: boolean
    },
}
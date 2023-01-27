import { Note, activeOutput } from "./HeckLib/main.ts";

export function notesBetween(time: number, timeEnd: number, forNote: (n: Note) => void) {
    JSON.parse(Deno.readTextFileSync(activeOutput)).colorNotes.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forNote(x)
        }
    })
}

export function allBetween(time: number, timeEnd: number, forAll: (n: Note) => void) {
    JSON.parse(Deno.readTextFileSync(activeOutput)).colorNotes.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
    JSON.parse(Deno.readTextFileSync(activeOutput)).bombNotes.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
    JSON.parse(Deno.readTextFileSync(activeOutput)).sliders.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
    JSON.parse(Deno.readTextFileSync(activeOutput)).burstSliders.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
    JSON.parse(Deno.readTextFileSync(activeOutput)).customData.fakeColorNotes.forEach((x: Note) => {
        if(x.time >= time && x.time < timeEnd) {
            forAll(x)
        }
    })
}
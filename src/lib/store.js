//

import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const clip = writable('');

//string
export const textChunk = writable(
    (browser && localStorage.getItem("textChunk")) || "ἀντιπαραγράφω"
);
textChunk.subscribe((val) => browser && (localStorage.textChunk = val));


// array
const storedFruits = JSON.parse(browser && localStorage.getItem("fruits")) || [
    "apple",
    "orange",
    "grapes",
];
export const fruits = writable(browser && storedFruits);
fruits.subscribe(
    (val) => browser && (localStorage.fruits = JSON.stringify(val))
);

let items = [{id: 1, dname: 'wkt', act: true}, {id: 2, dname:  'bbl', act: true}, {id: 3, dname: 'dvr', act: false}]

// object
const storedDbs = JSON.parse(browser && localStorage.getItem("dbs")) || [
    {id: 1, dname: 'wkt', act: true},
    {id: 2, dname:  'bbl', act: true},
    {id: 3, dname: 'dvr', act: false}]
;

// const storedDbs = {a: 'a'}
export const dbs = writable(browser && storedDbs);
dbs.subscribe(
    (val) => browser && (localStorage.dbs = JSON.stringify(val))
);

// object
const storedUser = JSON.parse(browser && localStorage.getItem("user")) || {
    name: "webjeda",
    id: "123",
};
export const user = writable(browser && storedUser);
user.subscribe(
    (val) => browser && (localStorage.user = JSON.stringify(val))
);

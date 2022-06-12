// ==UserScript==
// @name         Wakanim skip, next
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically skip and click nexts on wakanim.tv
// @author       lihachev9
// @match        https://www.wakanim.tv/*
// @icon         https://www.google.com/s2/favicons?domain=wakanim.tv
// @grant        none
// ==/UserScript==

const targets = [
    {className: 'PlayerSkip'}, // Wakanim skip opening, ending
    {className: 'PlayerNextEp active', className1stChildClick: 'PlayerNextEp-link'}, // Wakanim video next
]

var count = 0;

async function find() {
    if (count === 0) {
        targets.forEach(target => {
            const elements = document.getElementsByClassName(target.className);
            if (elements.length !== 0) {
                if (target.hasOwnProperty('className1stChildClick')) {
                    document.getElementsByClassName(target.className1stChildClick)[0].click();
                } else {
                    elements[0].click();
                }
                count = 5;
            }
        });
    } else {
        count--;
    }
}

var intervalId = window.setInterval(find, 300);

// ==UserScript==
// @name         Kinopoisk skip, next
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically skip and click nexts on hd.kinopoisk.ru
// @author       lihachev9
// @match        https://hd.kinopoisk.ru/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==

const jQueryTargets = [
    {selector: "button:contains('Пропустить')", innerText: 'Пропустить'},
    {selector: "button:contains('Следующая серия')", innerText: 'Следующая серия'},
];

var count = 0;

async function find() {
  if (count === 0) {
        jQueryTargets.forEach(target => {
            const badDivs = $(target.selector);
            for (let i = 0; i < badDivs.length; i++) {
                if (badDivs[i].innerText === target.innerText) {
                    badDivs[i].click();
                    count = 5;
                }
            }
        });
    }
    else {
        count--;
    }
}

var intervalId = window.setInterval(find, 300);
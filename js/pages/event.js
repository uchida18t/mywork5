"use strict";{const a=document.getElementById("loading"),b=document.getElementById("content"),c=document.querySelectorAll(".edge");document.addEventListener("DOMContentLoaded",()=>{a.classList.add("loaded"),b.classList.add("loaded"),c.forEach(e=>{e.classList.add("loaded")})})}{const e=document.querySelector(".event-list-ul"),f="/mywork5/data/event.json";async function displayEvent(){const t=await fetch(f),n=await t.json(),d=[];await n.forEach(e=>{!1===d.includes(e.category)&&d.push(e.category)}),d.forEach(t=>{const n=document.createElement("LI");n.classList.add("news-list-target","set-"+t);const d=document.createElement("P");d.classList.add("eng"),d.textContent=t,e.appendChild(n),n.appendChild(d)})}displayEvent().catch(()=>{console.log("error")})}
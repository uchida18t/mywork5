"use strict";{const a=document.querySelector("title"),b=document.getElementById("content").classList.value,c=parseInt(b.substring(b.length-1,b.length)),d="PRESQUE POURRIE | Official Site",e="/mywork5/data/event.json";async function insertTitle(){const t=await fetch(e),n=await t.json();n.forEach(t=>{t.index===c&&(console.log(t.title),a.textContent=t.title+" | "+d)})}insertTitle().catch(()=>{alert("申し訳ございませんが、お使いのブラウザでは正常に表示できない可能性がございます。")})}{const i=document.getElementById("loading"),j=document.getElementById("content"),k=document.querySelectorAll(".edge");document.addEventListener("DOMContentLoaded",()=>{i.classList.add("loaded"),j.classList.add("loaded"),k.forEach(t=>{t.classList.add("loaded")})})}
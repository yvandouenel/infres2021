const h1 = document.getElementById("h1");
console.log(`onclick de h1`, h1.onclick);
document.onclick = function(event) {
    console.log(`click sur h1`);
    console.log(`event.target : `, event.target);
};



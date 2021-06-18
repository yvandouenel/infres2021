const modal = document.getElementById("modal");
modal.style.display = "none";
document.getElementById("btn-modal").onclick = function() {
    modal.style.display = "flex";
}

modal.onclick = function(e) {
    console.log(`click sur modal`);
    
    console.log(e.target.id);
    if(e.target.id == "modal") {
        modal.style.display = "none";
    }
}
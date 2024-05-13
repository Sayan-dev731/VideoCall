function enterRoom() {
    var roomID = document.getElementById("roomID").value;
    if (roomID.trim() !== "") {
        window.location.href = "room.html?roomID=" + encodeURIComponent(roomID);
    } else {
        alert("Please enter a valid Room ID.");
    }
}

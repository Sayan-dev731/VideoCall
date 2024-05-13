var roomID = decodeURIComponent(window.location.search.substring(1).split("=")[1]);

document.getElementById("roomID").innerText = roomID;

var localStream;
var remoteStream;

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(function(stream) {
        localStream = stream;
        var localVideo = document.getElementById("localVideo");
        if (localVideo) {
            localVideo.srcObject = localStream;
        }
    })
    .catch(function(error) {
        console.error("Error accessing media devices: " + error);
    });

function toggleCamera() {
    localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
}

function toggleMic() {
    localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
}

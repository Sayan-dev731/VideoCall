var roomID = decodeURIComponent(window.location.search.substring(1).split("=")[1]);

document.getElementById("roomID").innerText = roomID;

var localStream;
var remoteStream;
var peerConnection;

// Function to create a peer connection
function createPeerConnection() {
    try {
        peerConnection = new RTCPeerConnection();
        peerConnection.addEventListener('addstream', function(event) {
            remoteStream = event.stream;
            var remoteVideo = document.getElementById("remoteVideo");
            if (remoteVideo) {
                remoteVideo.srcObject = remoteStream;
            }
        });
        peerConnection.addStream(localStream);
        console.log('Peer connection created');
    } catch (error) {
        console.error('Error creating peer connection: ' + error);
    }
}

// Function to initiate call
function initiateCall() {
    createPeerConnection();
    peerConnection.createOffer()
        .then(function(offer) {
            return peerConnection.setLocalDescription(offer);
        })
        .then(function() {
            // Send offer to signaling server (not implemented here)
            console.log('Offer sent to signaling server');
        })
        .catch(function(error) {
            console.error('Error creating offer: ' + error);
        });
}

// Function to receive call
function receiveCall(offer) {
    createPeerConnection();
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(function() {
            return peerConnection.createAnswer();
        })
        .then(function(answer) {
            return peerConnection.setLocalDescription(answer);
        })
        .then(function() {
            // Send answer to signaling server (not implemented here)
            console.log('Answer sent to signaling server');
        })
        .catch(function(error) {
            console.error('Error receiving call: ' + error);
        });
}

// Function to handle incoming ICE candidates
function handleIceCandidate(event) {
    if (event.candidate) {
        // Send candidate to signaling server (not implemented here)
        console.log('ICE candidate sent to signaling server');
    }
}

// Function to handle incoming ICE candidates
function handleRemoteStream(event) {
    remoteStream = event.stream;
    var remoteVideo = document.getElementById("remoteVideo");
    if (remoteVideo) {
        remoteVideo.srcObject = remoteStream;
    }
}

// Event listeners for ICE candidates and remote stream
peerConnection.addEventListener('icecandidate', handleIceCandidate);
peerConnection.addEventListener('addstream', handleRemoteStream);

// Call initiateCall() or receiveCall() based on user role (host or guest)
// For simplicity, assuming the first user to join the room is the host

// If the user is the host
initiateCall();

// If the user is a guest, you would receive an offer from the host through signaling server
// receiveCall(offerFromHost);

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const joinForm = document.getElementById('joinForm');

let localStream;
let peer;

joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roomId = document.getElementById('roomId').value;

    try {
        // Get local video stream
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        // Initialize peer connection
        peer = new SimplePeer({
            initiator: true,
            trickle: false, // This disables ICE trickle and sends candidates once connectivity is established
            stream: localStream
        });

        // Listen for incoming data
        peer.on('signal', data => {
            console.log('SIGNAL', JSON.stringify(data));
            // Emit signal to other peer
            // You need to communicate this signal to the other peer, for example, through a signaling server or another channel
        });

        // Handle incoming tracks from remote peer
        peer.on('stream', stream => {
            remoteVideo.srcObject = stream;
        });

        // Connect to remote peer
        // You need to exchange signaling data (like offer/answer and ICE candidates) with the remote peer
        // Once signaling is set up, you can call peer.signal(offerOrAnswerOrIceCandidate) to establish the connection

        // For example:
        // socket.emit('joinRoom', roomId); // Send room ID to signaling server
        // socket.on('offer', offer => peer.signal(offer));
        // socket.on('answer', answer => peer.signal(answer));
        // socket.on('iceCandidate', candidate => peer.signal(candidate));
    } catch (error) {
        console.error('Error joining call:', error);
    }
});

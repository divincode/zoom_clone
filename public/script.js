const socket = io('/')

const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
 // port: '443'
})

const myVideo = document.createElement('video');
const videoGrid=document.getElementById('video-grid');
myVideo.muted = true;


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream)
  });
  
socket.emit("join-room");

socket.on("user-connected", () => {
  connectToNewUser();
});

const connectToNewUser = () =>{
  console.log("hi");
}



function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  }
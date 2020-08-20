const videoElement = document.getElementById('video');
const selectShareScreen = document.getElementById('select-share-screen-button');
const stopCaptureButton = document.getElementById('stop-capture-button');


stopScreenCapture = () => {
    let tracks = videoElement.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
    selectShareScreen.disabled = false;
    selectShareScreen.hidden = false;
    stopCaptureButton.hidden = true;
}

selectShareScreen.addEventListener('click', async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
            startPictureInPicture();
        }
        selectShareScreen.disabled = true;
        selectShareScreen.hidden = true;
        stopCaptureButton.disabled = false;
        stopCaptureButton.hidden = false;
    } catch (error) {
        console.log('Error: ', error)
    }
});

stopCaptureButton.addEventListener('click', async () => {
    stopCaptureButton.disabled = true;
    stopScreenCapture();
    stopPictureInPicture();
})

videoElement.addEventListener('leavepictureinpicture', function() {
    stopScreenCapture(); 
    stopPictureInPicture();
  });


async function startPictureInPicture () {
    try {
        await videoElement.requestPictureInPicture();
    } catch (error) {
       console.log('Error: ', error)
   }
}

async function stopPictureInPicture () {
    try {
        await document.exitPictureInPicture();
    } catch (error) {
        console.log('Error:', error)
    }
}

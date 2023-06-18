const button = document.querySelector('.bottom-content button');
const audio = new Audio('/reverse.mp3');
let isAudioPlaying = false;

button.addEventListener('click', () => {
    if(!isAudioPlaying){
        isAudioPlaying = true;
        audio.addEventListener('ended', () => {
            isAudioPlaying = false;
        });
        audio.play();
    }
})
const app = () => {
const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');
const sounds = document.querySelectorAll('.sound-picker button');
const timedisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button')
const outlinelength= outline.getTotalLength();
console.log(outlinelength);

//pick different sounds
sounds.forEach(sound =>{
    sound.addEventListener("click" , function(){
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
    });
});

let fakeduration = 600;
outline.style.strokeDasharray = outlinelength;
outline.style.strokeDashoffset= outlinelength;

//play sound
play.addEventListener("click", () => {
    checkPlaying(song);
});

timeSelect.forEach(Option => {
    Option.addEventListener("click", function(){
        fakeduration = this.getAttribute("data-time");
        timedisplay.textContent = `${Math.floor(fakeduration / 60)}: ${Math.floor(fakeduration % 60)}`;

    });



});

//Create a function specific to stop and play the sounds
const checkPlaying = song=> {
    if(song.paused)
    {
        song.play();
        video.play();
        play.src = './SVGs/pause.svg';
    }
    else
    {
        song.pause();
        video.pause();
        play.src= "./SVGs/play.svg";

    }
};

song.ontimeupdate = () =>{
    let currentTime = song.currentTime;
    let elapsed = fakeduration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

//animating the circle
    let progress = outlinelength - (currentTime / fakeduration) * outlinelength;
    outline.style.strokeDashoffset = progress;

    timedisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime>=fakeduration)
    {
        song.pause();
        song.currentTime = 0;
        play.src = ".svg/play.svg";
        video.pause();
    }


}
};
app();

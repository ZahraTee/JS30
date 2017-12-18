const player = document.querySelector('.player'),
      video = player.querySelector('.viewer'),
      progress = player.querySelector('.progress'),
      progressBar = player.querySelector('.progress__filled'),
      playToggle = player.querySelector('.toggle'),
      sliders = player.querySelectorAll('.player__slider'),
      skipButtons = player.querySelectorAll('[data-skip]');

function togglePlay() {
    if(video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}

function updatePlayToggleButton() {
    const icon = this.paused? '►' : '| |';
    playToggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange() {
    video[this.name] = this.value;
}

function updateProgress() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`;

}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('play', updatePlayToggleButton)
video.addEventListener('pause', updatePlayToggleButton)
video.addEventListener('timeupdate', updateProgress)

video.addEventListener('click', togglePlay);
playToggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

sliders.forEach(slider => slider.addEventListener('change', updateRange));
sliders.forEach(slider => slider.addEventListener('mousemove', updateRange));

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', () => {mousedown = true})
progress.addEventListener('mouseup', () => {mousedown = false})
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
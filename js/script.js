let $music = document.querySelector('audio')
const $playButton = document.querySelector('.playButton')
const $pauseButton = document.querySelector('.pauseButton')

const $progressBar = document.querySelector('.progressBar')

$playButton.addEventListener('click', () => {
    $music.play()

    $pauseButton.style.display = 'block'
    $playButton.style.display = 'none'
})

$pauseButton.addEventListener('click', () => {
    $music.pause()

    $playButton.style.display = 'block'
    $pauseButton.style.display = 'none'
})

$music.addEventListener('timeupdate', () => {
    $progressBar.value = Math.floor(($music.currentTime / $music.duration) * 100)
})
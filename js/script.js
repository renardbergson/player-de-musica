let $musica = document.querySelector('audio')
const $playButton = document.querySelector('.playButton')
const $pauseButton = document.querySelector('.pauseButton')

$playButton.addEventListener('click', () => {
    $musica.play()

    $pauseButton.style.display = 'block'
    $playButton.style.display = 'none'
})

$pauseButton.addEventListener('click', () => {
    $musica.pause()

    $playButton.style.display = 'block'
    $pauseButton.style.display = 'none'
})
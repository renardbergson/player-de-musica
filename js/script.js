let $music = document.querySelector('audio')
const $playButton = document.querySelector('.playButton')
const $pauseButton = document.querySelector('.pauseButton')

const $currentTime = document.querySelector('.start')
const $progressBar = document.querySelector('.progressBar')
const $duration = document.querySelector('.end')

const $volumeBar = document.querySelector('.volumeBar')

// reset function
document.body.onload = () => {
    $progressBar.value = 0
    $volumeBar.value = 100
}

// play and pause button functions
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

// time update and convert functions
$music.addEventListener('timeupdate', () => {
    $progressBar.value = Math.floor(($music.currentTime / $music.duration) * 100)

    function secondsToMinutes (timeToConvert) {
        let minute = Math.floor(timeToConvert / 60)
        let seconds = timeToConvert % 60

        if (seconds < 10) {
            seconds = '0' + seconds
        }
        
        return `${minute}:${seconds}`
    }

    $currentTime.innerHTML = secondsToMinutes( Math.floor($music.currentTime) )
    $duration.innerHTML = secondsToMinutes( Math.floor($music.duration) )
})

// progress bar change function
$progressBar.addEventListener('change', () => {
    $music.currentTime = ($progressBar.value / 100) * $music.duration
})

// volume change function
$volumeBar.addEventListener('change', () => {
    $music.volume = $volumeBar.value / 100
})
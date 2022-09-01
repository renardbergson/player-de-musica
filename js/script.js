let $music = document.querySelector('audio')
const $playButton = document.querySelector('.playButton')
const $pauseButton = document.querySelector('.pauseButton')

const $currentTime = document.querySelector('.start')
const $progressBar = document.querySelector('.progressBar')
const $duration = document.querySelector('.end')

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
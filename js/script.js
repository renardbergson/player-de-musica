let $music = document.querySelector('audio')

const $backwardButton = document.querySelector('.backwardButton')
const $playButton = document.querySelector('.playButton')
const $pauseButton = document.querySelector('.pauseButton')
const $forwardButton = document.querySelector('.forwardButton')

const $currentTime = document.querySelector('.start')
const $progressBar = document.querySelector('.progressBar')
const $duration = document.querySelector('.end')

const $volumeBar = document.querySelector('.volumeBar')

let musicIndex = 0
let $artistPhoto = document.querySelector('.artistPhoto')
let $songName = document.querySelector('.songName')
let $artistName = document.querySelector('.artistName')

let playlist = [
    {
        src: 'music/cold-heart-EltonJohn.mp3',
        img: 'url(images/elton-john.png)',
        title: 'Cold Heart',
        artist: 'Elton John'
    },
    {
        src: 'music/save-your-tears-TheWeeknd.mp3',
        img: 'url(images/the-weeknd.png)',
        title: 'Save Your Tears',
        artist: 'The Weeknd'
    },
    {
        src: 'music/easy-lover-PhillCollins.mp3',
        img: 'url(images/phil-collins.png)',
        title: 'Easy Lover',
        artist: 'Phil Collins'
    }
]

// reset function
document.body.onload = () => {
    $progressBar.value = 0
    $volumeBar.value = 100

    $songName.innerHTML = playlist[0].title
    $artistName.innerHTML = playlist[0].artist
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
function secondsToMinutes (timeToConvert) {
    let minute = Math.floor(timeToConvert / 60)
    let seconds = timeToConvert % 60

    if (seconds < 10) {
        seconds = '0' + seconds
    }
    
    return `${minute}:${seconds}`
}

$music.addEventListener('timeupdate', () => {
    $progressBar.value = Math.floor(($music.currentTime / $music.duration) * 100)

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

// music selection
function musicChange(index) {
    $music.setAttribute('src', playlist[index].src)
    $music.addEventListener('loadeddata', () => {
        $artistPhoto.style.backgroundImage = playlist[index].img
        $songName.innerHTML = playlist[index].title
        $artistName.innerHTML = playlist[index].artist
        $duration.innerHTML = secondsToMinutes( Math.floor($music.duration) )
        
        $music.play()
        $pauseButton.style.display = 'block'
        $playButton.style.display = 'none'
    })
}

// music backward and forward
$backwardButton.addEventListener('click', () => {
    musicIndex--

    if (musicIndex < 0) {
        musicIndex = 2
    }

    musicChange(musicIndex)
})

$forwardButton.addEventListener('click', () => {
    musicIndex++

    if (musicIndex > 2) {
        musicIndex = 0
    }

    musicChange(musicIndex)
})
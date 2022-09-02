// music
let $music = document.querySelector('audio')
const $currentTime = document.querySelector('.start')
const $progressBar = document.querySelector('.progressBar')
const $duration = document.querySelector('.end')
const $volumeBar = document.querySelector('.volumeBar')
let musicIndex = 0

// buttons
const $backwardButton = document.querySelector('.backwardButton')
const $playButton = document.querySelector('.playButton')
const $pauseButton = document.querySelector('.pauseButton')
const $forwardButton = document.querySelector('.forwardButton')

// artist info
let $artistPhoto = document.querySelector('.artistPhoto')
let $songName = document.querySelector('.songName')
let $artistName = document.querySelector('.artistName')

// playlist
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

// load page function
document.body.onload = () => {
    $progressBar.value = 0
    $volumeBar.value = 100

    $songName.innerText = playlist[0].title
    $artistName.innerText = playlist[0].artist
}

// play button function
$playButton.addEventListener('click', () => {
    $music.play()
    
    currentAndTotalTimeRefresh()

    $pauseButton.style.display = 'block'
    $playButton.style.display = 'none'
})

// pause button function
$pauseButton.addEventListener('click', () => {
    $music.pause()

    $playButton.style.display = 'block'
    $pauseButton.style.display = 'none'
})

// time convert function 
function secondsToMinutes (timeToConvert) {
    let minute = Math.floor(timeToConvert / 60)
    let seconds = timeToConvert % 60

    if (seconds < 10) {
        seconds = '0' + seconds
    }
    
    return `${minute}:${seconds}`
}

// music current and total time refresh function
function currentAndTotalTimeRefresh() {
    $currentTime.innerText = secondsToMinutes(Math.floor($music.currentTime))
    $duration.innerText = secondsToMinutes(Math.floor($music.duration))
}

// progress bar movement function
$music.addEventListener('timeupdate', () => {
    $progressBar.value = Math.floor(($music.currentTime / $music.duration) * 100)
})

// music slider function
$progressBar.addEventListener('change', () => {
    $music.currentTime = ($progressBar.value / 100) * $music.duration
})

// volume slider function
$volumeBar.addEventListener('change', () => {
    $music.volume = $volumeBar.value / 100
})

// music selection
function musicChange(index) {
    $music.setAttribute('src', playlist[index].src)
    $music.addEventListener('loadeddata', () => {
        $artistPhoto.style.backgroundImage = playlist[index].img
        $songName.innerText = playlist[index].title
        $artistName.innerText = playlist[index].artist
        
        currentAndTotalTimeRefresh()
        
        $music.play()
        $pauseButton.style.display = 'block'
        $playButton.style.display = 'none'
    })
}

// backward button function
$backwardButton.addEventListener('click', () => {
    musicIndex--

    if (musicIndex < 0) {
        musicIndex = 2
    }

    musicChange(musicIndex)
    $progressBar.value = 0
})

// forward button function
$forwardButton.addEventListener('click', () => {
    musicIndex++

    if (musicIndex > 2) {
        musicIndex = 0
    }

    musicChange(musicIndex)
})
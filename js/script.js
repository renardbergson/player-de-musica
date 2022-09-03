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
        src: 'music/i-feel-it-all-so-deeply-BailBonds.mp3',
        bkg: 'url(images/i-feel.jpg)',
        title: 'I Fell it All so Deeply',
        artist: 'Bail Bonds',
    },
    {
        src: 'music/the-monuments-and-tunnels-in-goa-and-hampi-BailBonds.mp3',
        bkg: 'url(images/the-monuments.jpg)',
        title: 'The Monuments and Tunnels in Goa and Hampi',
        artist: 'Bail Bonds',
    },
    {
        src: 'music/swimming-lessons-BailBonds.mp3',
        bkg: 'url(images/swimming.jpg)',
        title: 'Swimming Lessons',
        artist: 'Bail Bonds',
    },
    {
        src: 'music/summer-solstice-on-the-june-planet-BailBonds.mp3',
        bkg: 'url(images/summer.jpg)',
        title: 'Summer Solstice on The June Planet',
        artist: 'Bail Bonds',
    },
    {
        src: 'music/chasing-down-a-vision-BailBonds.mp3',
        bkg: 'url(images/chasing.jpg)',
        title: 'Chasing Down a Vision',
        artist: 'Bail Bonds',
    }
]

// footer variables  
const $whoAmI = document.querySelector('.whoAmI')
const $musicSpectrum = document.querySelector('.musicSpectrum')

// load page reset function
document.body.onload = () => {
    $progressBar.value = 0
    $volumeBar.value = 100
    
    $music.setAttribute('src', playlist[0].src)
    $artistPhoto.style.backgroundImage = playlist[0].bkg
    $songName.innerText = playlist[0].title
    $artistName.innerText = playlist[0].artist
}

// play and pause switch functions
function showPlayBtn () {
    $playButton.style.display = 'block'
    $pauseButton.style.display = 'none'
}

function hidePlayBtn () {
    $pauseButton.style.display = 'block'
    $playButton.style.display = 'none'
}

// play button function
$playButton.addEventListener('click', () => {
    $music.play()

    hidePlayBtn()

    spectrumPlay()
})

// pause button function
$pauseButton.addEventListener('click', () => {
    $music.pause()

    showPlayBtn()

    spectrumOff()
})

// time convert function 
function secondsToMinutes (timeToConvert) {
    let minute = parseInt(timeToConvert / 60)
    let seconds = timeToConvert % 60

    if (seconds < 10) {
        seconds = '0' + seconds
    }
    
    return `${minute}:${seconds}`
}

// music current time update function
$music.addEventListener('timeupdate', () => {
    $currentTime.innerText = secondsToMinutes( parseInt(($music.currentTime)) )
})

// music total time refresh function
$music.addEventListener('loadeddata', () => {
    $duration.innerText = secondsToMinutes( parseInt($music.duration) )
})

// progress bar movement function
$music.addEventListener('timeupdate', () => {
    $progressBar.value = parseInt( ($music.currentTime / $music.duration) * 100 )
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
        $artistPhoto.style.backgroundImage = playlist[index].bkg
        $songName.innerText = playlist[index].title
        $artistName.innerText = playlist[index].artist
        
        $music.play()
    })
}

// backward button function
$backwardButton.addEventListener('click', () => {
    musicIndex--

    if (musicIndex < 0) {
        musicIndex = 4
    }

    musicChange(musicIndex)
    hidePlayBtn()
    spectrumPlay()
})

// forward button function
$forwardButton.addEventListener('click', () => {
    musicIndex++

    if (musicIndex > 4) {
        musicIndex = 0
    }

    musicChange(musicIndex)
    hidePlayBtn()
    spectrumPlay()
})

// animation functions
function spectrumPlay () {
    $whoAmI.style.display = 'none'
    $musicSpectrum.style.display = 'flex'
}

function spectrumOff () {
    $whoAmI.style.display = 'block'
    $musicSpectrum.style.display = 'none'
}
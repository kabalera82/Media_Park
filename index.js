document.querySelector('#fallout').addEventListener('mouseover', function() {
    this.querySelector('video').play();
});

document.querySelector('#fallout').addEventListener('mouseout', function() {
    this.querySelector('video').pause();
});

document.querySelector('#diablo').addEventListener('mouseover', function() {
    this.querySelector('video').play();
});

document.querySelector('#diablo').addEventListener('mouseout', function() {
    this.querySelector('video').pause();
});
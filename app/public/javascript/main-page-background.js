// FUNCTION FOR CHANGING BACKGROUND IMAGE WHEN PAGE LOADED
$(window).load(function() {
    var randomImages = ['background1', 'background2', 'background3', 'background4', 'background5'];
    var rndNum = Math.floor(Math.random() * randomImages.length);
    var url = 'url(images/background/' + randomImages[rndNum] + '.jpg)';
    $(document.body).css({
        'background': url + ' no-repeat center center fixed',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover'
    });
});

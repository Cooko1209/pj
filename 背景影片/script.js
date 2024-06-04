var player1, player2;
var startTime1 = 90;  // 第一段影片的開始時間（秒）
var endTime1 = 150;   // 第一段影片的結束時間（秒）
var startTime2 = 30;  // 第二段影片的開始時間（秒）
var endTime2 = 90;    // 第二段影片的結束時間（秒）
var activePlayer = 1; // 當前播放的影片編號

function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('player1', {
        height: '360',
        width: '640',
        videoId: 'PB4gId2mPNc', // 替換為第一段影片的ID
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'loop': 1,
            'mute': 1,
            'start': startTime1,
            'playlist': 'PB4gId2mPNc'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    player2 = new YT.Player('player2', {
        height: '360',
        width: '640',
        videoId: 'OoLrk8Pp5vU', // 替換為第二段影片的ID
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'loop': 1,
            'mute': 1,
            'start': startTime2,
            'playlist': 'OoLrk8Pp5vU',
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });
}

function onPlayerReady(event) {
    if (event.target.getIframe().id === 'player1') {
        event.target.playVideo();
        document.getElementById('video1').style.opacity = 1; // 顯示第一段影片
    }
}

function onPlayerStateChange(event) {
    var currentTime, endTime, nextPlayer, currentPlayer;

    if (event.data == YT.PlayerState.PLAYING) {
        if (event.target.getIframe().id === 'player1') {
            currentPlayer = player1;
            nextPlayer = player2;
            currentTime = player1.getCurrentTime();
            endTime = endTime1;
        } else {
            currentPlayer = player2;
            nextPlayer = player1;
            currentTime = player2.getCurrentTime();
            endTime = endTime2;
        }

        var checkTime = function() {
            if (currentTime >= endTime) {
                nextPlayer.seekTo(startTime2); // 跳轉到第二段影片的開始時間
                nextPlayer.playVideo();
                document.getElementById('video2').style.opacity = 1; // 顯示第二段影片
                document.getElementById('video1').style.opacity = 0; // 隱藏第一段影片
                currentPlayer.stopVideo(); // 停止第一段影片
                activePlayer = activePlayer === 1 ? 2 : 1;
            } else {
                currentTime = currentPlayer.getCurrentTime();
                setTimeout(checkTime, 1000); // 每秒檢查一次時間
            }
        };
        checkTime(); // 開始檢查時間
    }
}

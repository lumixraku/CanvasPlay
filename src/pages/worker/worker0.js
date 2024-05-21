var offscreen, ctx;
onmessage = function (e) {
    if (e.data.msg == 'init') {
        init(e);
    } else if (e.data.msg == 'draw') {
        draw(e);
    }
}

function init(e) {
    offscreen = e.data.canvas;
    ctx = offscreen.getContext('2d');
}

function draw(e) {
    const now = performance.now();
    const deadline = e.data.deadline;
    if (now > deadline) {
        return;
    }
    ctx.clearRect(0, 0, offscreen.width, offscreen.height);
    for (var i = 0; i < 1000; i++) {
        if (now > deadline) {
            break;
        }
        for (var j = 0; j < 1000; j++) {
            ctx.fillRect(i * 3, j * 3, 2, 2);
        }
    }
}

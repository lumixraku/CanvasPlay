importScripts('/public/paper-full.js');
paper.install(this);
paper.setup([640, 480]);

onmessage = function (event) {
    console.log('worker onmessage')
    var data = event.data;
    if (data && data.length == 2) {
        var path1 = project.importJSON(data[0]);
        var path2 = project.importJSON(data[1]);
        console.log(path1, path2);
        var result = path1.unite(path2);
        postMessage(result.exportJSON());
    } else {
        // this.postMessage('data not valid')
    }
};
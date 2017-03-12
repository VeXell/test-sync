self.addEventListener('message', function (e) {
    var json = JSON.parse(e.data);

    if (json && json.method) {
        executeRequestMethod(json);
    }
}, false);


function executeRequestMethod(json) {
    switch (json.method) {
        case 'sendStatistic':
            sendStatistic(json.url, json.data, json.i);
            break;
    }
}

function sendStatistic(url, data, i) {
	var startDate = new Date();
	
    fetch(url, {
        body: data
    }).then(function() {
	    var endDate = new Date();
	    var text = 'Request #' + i + ' (worker). Execution time: ' + ((endDate - startDate) / 1000) + 's';
        self.postMessage(text);
    });
}
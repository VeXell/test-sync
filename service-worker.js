var syncData = [];

console.info("SW Startup!");

self.addEventListener('install', function (event) {
    self.skipWaiting();
});

self.addEventListener('sync', function (event) {
    if (event.tag == "oneTimeStatisticSync") {
        event.waitUntil(sendStatistic());
    }
});

self.addEventListener('periodicsync', function (event) {
    if (event.registration.tag == "periodicStatisticSync") {
        console.log("Periodic event occurred: ", event);
        event.waitUntil(sendStatistic());
    }
});

self.addEventListener('message', function (event) {
    switch (event.data.command) {
        case 'stat':
            syncData.push(event.data.data);
            break;
    }

    console.log(`Data to sync ${JSON.stringify(syncData)}`);
});

function sendStatistic() {
    if (syncData.length === 0) {
        return true;
    }

    var requestData = JSON.stringify(syncData);
    syncData = [];

    return fetch('./server.php?sw=1', {
        method: 'POST',
        body: requestData
    });
}


var syncData = [];

console.info("SW Startup!");

self.addEventListener('install', function (event) {
    self.skipWaiting();
});

self.addEventListener('sync', function (event) {
    console.info('Sync event executed');

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

    event.ports[0].postMessage({
        error: null
    });
});

function sendStatistic() {
    console.info('Make request to sendStatistic. Sync data length: %s', syncData.length);

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


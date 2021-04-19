const redis = require('redis');
const host = 'queue';
const port = '6379';
const client = redis.createClient(port, host);

client.on('connect', function(){
    console.log('==> REDIS Connection OK!')
})

client.on('error', function (err) {
    console.log('==> REDIS Connection fail: ' + err);
});

module.exports = client;
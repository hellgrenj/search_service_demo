var shelljs = require('shelljs');
var args = process.argv;
var mongodb_host_ip = args[2];
var db_name = args[3];
var collection_name = args[4];
var mongo_port = args[5];
if (!mongodb_host_ip) {
    throw new Error('you have to provide the IP to the mongodb host as the first argument'); //node(0) transport.js(1)
}
if (!db_name) {
    throw new Error('you have to provide the name of the mongodb database as the second argument'); //node(0) transport.js(1) mongodb_host_ip(2)
}
if (!collection_name) {
    throw new Error('you have to provide the name of the mongodb database collection as the third argument'); //node(0) transport.js(1) mongodb_host_ip(2) db_name(3)
}
if (!mongo_port) {
    throw new Error('you have to provide the mongodb port as the fourth argument'); //node(0) transport.js(1) mongodb_host_ip(2) db_name(3) collection_name(4)
}
shelljs.exec('docker stop transporter-one-off');
shelljs.exec('docker rm transporter-one-off');
var transporter_one_off_command = 'docker run --name transporter-one-off --link elasticsearch:elasticsearch -e PIPELINE="Source({type: \\"mongo\\", uri:\\"mongodb://' + mongodb_host_ip + ':' + mongo_port + '\\", namespace: \\"' + db_name + './^' + collection_name + '$/\\", tail: false}).save({type: \\"elasticsearch\\", uri: \\"http://elasticsearch:9200/\\", namespace: \\"search.' + collection_name + '\\"})" dortort/transporter:es-v2.x-compat';
if (shelljs.exec(transporter_one_off_command).code !== 0) {
    var error = 'command failed! ; ' + transporter_one_off_command;
    console.log(error);
} else {
    console.log('command succeeded! ; ' + transporter_one_off_command);
}

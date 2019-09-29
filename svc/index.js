import express from 'express';
import morgan from 'morgan';
import {handleRequest} from "./routing";
import {JsonConfiguration} from "./util";

//Prepare config
console.log('Loading configuration...');
const config = new JsonConfiguration(__dirname + '/../svc.config.json');
config.defaults({
   port: '2207',
   cacheTimeout: '15',
   requestUrl: 'https://hypixel-api.inventivetalent.org/api/skyblock/bosstimer/magma/estimatedSpawn',
   icon: 'i30969'
});
config.save();

//Configure morgan remote-address
morgan.token('remote-addr', (req, res) => {
    return req.headers.hasOwnProperty('x-forwarded-for') ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;
});

//Prepare express
console.log('Initializing express using port ' + config.get('port') + '...');
const app = express();
app.use(morgan('common'));
app.get('/', (req, res) => handleRequest(req, res));
app.get('/getEstimation', (req, res) => handleRequest(req, res));
app.use('/privacy', express.static(__dirname + '/../public/privacy.html'));

try
{
  app.listen(config.get('port'));
  console.log('Service started. Request logging handed over to morgan.');
} catch (e) {
  console.log('An error occurred: ' + e.message);
}

export {
    config,
    app
}

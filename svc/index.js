import express from 'express';
import morgan from 'morgan';
import {handleRequest, handleLegacyRequest} from "./routing/routes";
import JsonConfiguration from "./util/JsonConfiguration";

//Prepare config
console.log('Loading configuration...');
const config = new JsonConfiguration(__dirname + '/../svc.config.json');
config.defaults({
   port: '2207',
   cacheTimeout: '15',
   requestUrl: {
       magmaBoss: 'https://hypixel-api.inventivetalent.org/api/skyblock/bosstimer/magma/estimatedSpawn',
       newYear: 'https://hypixel-api.inventivetalent.org/api/skyblock/newyear/estimate'
   },
   icon: {
       magmaBoss: 'i30969',
       newYear: '29438'
   }
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

//Legacy
app.get('/', (req, res) => handleLegacyRequest(req, res));
app.get('/getEstimation', (req, res) => handleLegacyRequest(req, res));

//Current path
app.get('/getEstimation/:timerName', (req,res) => handleRequest(req, res));

//Info resources
app.use('/privacy', express.static(__dirname + '/../public/privacy.html'));
app.use('/issue', (req, res) => res.redirect(process.env.npm_package_bugs_url));
app.use('/issues', (req, res) => res.redirect(process.env.npm_package_bugs_url));

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

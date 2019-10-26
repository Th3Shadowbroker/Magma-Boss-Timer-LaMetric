import express from 'express';
import log4js from 'log4js';
import {handleRequest, handleLegacyRequest, handleSummary, logRequest} from "./routing/routes";
import JsonConfiguration from "./util/JsonConfiguration";
import LaMetric from "./api/LaMetric";

// Prepare log
const log = log4js.getLogger(process.env.npm_package_name);
log.level = 'info';

//Prepare config
log.info('Loading configuration...');
const config = new JsonConfiguration(__dirname + '/../svc.config.json');
config.defaults({
   port: '2207',
   cacheTimeout: '15',
   requestUrl: {
       magmaBoss: 'https://hypixel-api.inventivetalent.org/api/skyblock/bosstimer/magma/estimatedSpawn',
       newYear: 'https://hypixel-api.inventivetalent.org/api/skyblock/newyear/estimate',
       darkAuction: 'https://hypixel-api.inventivetalent.org/api/skyblock/darkauction/estimate',
       interest: 'https://hypixel-api.inventivetalent.org/api/skyblock/bank/interest/estimate',
       spooky: 'https://hypixel-api.inventivetalent.org/api/skyblock/spookyFestival/estimate'
   },
   icon: {
       magmaBoss: 'i30969',
       newYear: '29438',
       darkAuction: '22961',
       interest: '4472',
       spooky: '32001'
   }
});
config.save();

//Prepare express
log.info('Initializing express using port ' + config.get('port') + '...');
const app = express();
app.use(logRequest);

//Legacy
app.get('/getEstimation', (req, res) => handleLegacyRequest(req, res));

//Current paths
app.get('/getEstimation/:timerName', (req,res) => handleRequest(req, res));
app.get('/getEstimations', (req,res) => handleSummary(req, res).then(r => res.json(r)).catch( reason => {
    log.error(reason.message);
    res.status = 500;
    res.json(LaMetric.generateResponse('Unable to connect to the timer-api. LaMetric will try to reconnect automatically.','620'));
} ));

//Info resources
    // Swagger stuff
    app.use('/swagger.json', express.static(__dirname + '/../public/swagger.json'));
    app.use('/swagger', express.static(__dirname + '/../public/swagger.html'));

    // Privacy policy
    app.use('/privacy', express.static(__dirname + '/../public/privacy.html'));

    // Bug tracking
    app.use('/issue', (req, res) => res.redirect(process.env.npm_package_bugs_url));
    app.use('/issues', (req, res) => res.redirect(process.env.npm_package_bugs_url));

    // IMPORTANT: KEEP ALWAYS AS LAST ROUTE!!!
    app.use('/', (req, res) => res.redirect('https://th3shadowbroker.github.io/Magma-Boss-Timer-LaMetric/'));

try
{
  app.listen(config.get('port'));
  log.info('Service started!');
} catch (e) {
  log.error('An error occurred: ' + e.message);
}

export {
    config,
    app,
    log
}

'use strict';

const router = require('./routes').router;
const registersession = require('./sessions').registersessions;
const authfbpassport = require('./auths/facebook').passport;
//const forumcrawler = require('./data_collection/forum_crawler');
//const fbcrawler = require('.data_collection/fb_crawler');
//const fbdata = require('./data_collection/fb_data');

module.exports = (()=>{
    
  
    return {
        router,
        registersession,
        authfbpassport
    }
})();

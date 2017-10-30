const session = require('express-session');
const config = require('../../config/config.js');
const GlobalApp = require('../main_reg.js');

module.exports = (() => {
    
    var self = {}
    
   
    var sessionOptions = {secret: config.session.sessionSecret,
                        resave: true,
                        saveUninitialized: true
                    };

    //console.error("at sessions ", "FOLDER "+require('path').basename(__dirname)+" ERROR", sessionOptions)

    
    self.initialize = () => {
        console.log('session initialized')
        return;
    }
    
    (function(){
        GlobalApp.registerModule(self);
    })()    
    
    return {
        initialize : self.initialize(),
        registersessions : session(sessionOptions),
        sessions : session,
    }
})();
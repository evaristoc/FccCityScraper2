'use strict';

const passport = require('passport');
const config = require('../../../config/config.js');
const fbStrategy = require('passport-facebook').Strategy;
const GlobalApp = require('../../main_reg.js');
var user = require('../../dbs/user');

module.exports =(()=>{
    
    let self = {};
    var at;
   
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        done(null, {token : at});
    });
    
    passport.use('facebook', new fbStrategy({
        clientID        : config.fb.fbAPPid,
        clientSecret    : config.fb.fbAPPsecret,
        callbackURL     : config.fb.fbCALLBACKurl
        },
        
        function(access_token, refresh_token, profile, done) {
 
            at = access_token; //this change in the value will be captured by passport and the (de)serializations
            //console.log('in passport.use ',at)
            // asynchronous
            //process.nextTick(function() {
            //
            // var user = {
            //        id : 1,
            //        st : 2,
            //
            //        token : at
            //
            //    }
            //    
            //    done(null, user);
            //
            //});
            
            //var user = {
            //       id : 1,
            //       st : 2,
            //
            //       token : at
            //
            //   }
            
                        
            user.token = access_token;   
            done(null, user);            
            
        })
    )
    
    // route middleware to ensure user is logged in, if it's not send 401 status
    var isLoggedIn = function(req, res, next) {
            if (req.isAuthenticated())
                return next();
         
            res.sendStatus(401);
        }


    self.initialize = () => {
        console.log('fb passport initialized')
        return;
    }
    
    (function(){
        GlobalApp.registerModule(self);
    })() 
    
    return {
        
        initialize : self.initialize(),
        
        passport : passport,
        
        isLoggedIn : isLoggedIn,
        
        //at : at
                  
    }
})();

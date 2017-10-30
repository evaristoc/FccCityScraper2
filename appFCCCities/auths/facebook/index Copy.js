'use strict';


//https://code.tutsplus.com/articles/social-authentication-for-nodejs-apps-with-passport--cms-21618
//http://www.codexpedia.com/node-js/node-js-authentication-using-passport-facebook-strategy/
//https://scotch.io/tutorials/easy-node-authentication-facebook
//http://stackoverflow.com/questions/35858226/facebooktokenerror-this-authorization-code-has-been-used
//http://stackoverflow.com/questions/20929092/passport-js-passport-facebook-token-strategy-login-trough-js-sdk-and-then-auth/24474900#24474900
//https://www.jokecamp.com/tutorial-passportjs-authentication-in-nodejs
//http://stackoverflow.com/questions/32985655/passport-facebook-logout-not-working
//http://stackoverflow.com/questions/12873960/passport-js-facebook-strategy-logout-issue
//https://jeroenpelgrims.com/token-based-sessionless-auth-using-express-and-passport
//http://security.stackexchange.com/questions/72475/should-we-store-accesstoken-in-our-database-for-oauth2
//https://blog.hyphe.me/token-based-authentication-with-node/
const passport = require('passport');
const config = require('../../../config/config.js');
const fbStrategy = require('passport-facebook').Strategy;
const GlobalApp = require('../../main_reg.js');

module.exports =(()=>{
    
    let self = {};
    //var at;
    var at = 'hola como va todo? yo soy access token... si creeme! soy yo';
    //at = ()=>{
    //            var v;
    //            return {
    //                y : ()=>{return v}, 
    //                x : (z)=>{if( z.length > 0 ){
    //                            v = z;
    //                            return v;
    //                        }
    //                }
    //        }
    //}
    //var cb = (ate)=>{return "inside "+ate};
    //at = new Promise((resolve, reject)=>{return cb})
    
    // passport needs ability to serialize and unserialize users out of session
    //http://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
    //http://stackoverflow.com/questions/35359295/how-does-passport-js-stores-user-object-in-session
    //http://toon.io/understanding-passportjs-authentication-flow/
    //https://www.terlici.com/2015/09/21/node-express-controller-testing.html
    //https://scotch.io/tutorials/generate-fake-data-for-your-javascript-applications-using-faker
    //https://expressjs.com/en/guide/database-integration.html
    //https://dzone.com/articles/f-mongodb-f-nodejs-and-f-you
    //http://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron
    
    passport.serializeUser(function (user, done) {
        //Here the values are assigned from user AFTER passport.use strategy get the data
        //in this part and in the "done" the data is passed to session
        //at = user.token;
        //console.log('token in serializeUser ', at)
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        //I think....
        //Here the values are deserialized to get the data that is not available but after deserialization
        //with the id the data is completely recovered to get also the token that was stored in at the moment of registration (passport.use)
        //console.log("in passport auth: deserializeUser ", at);
        done(null, {token : at}); //this at value is the global one after changed! so at is updated, but later
    });
    
    passport.use('facebook', new fbStrategy({
        clientID        : config.fb.fbAPPid,
        clientSecret    : config.fb.fbAPPsecret,
        callbackURL     : config.fb.fbCALLBACKurl
        },
        
        // facebook will send back the tokens and profile
        //I can take the data out easily because it is a closure!!! I would need to modify passport properties adding a new method that adds my callback function to make the data public (I dont like to do that...)
        function(access_token, refresh_token, profile, done) {
 
            at = access_token; //this change in the value will be captured by passport and the (de)serializations
            //console.log('in passport.use ',at)
            // asynchronous
            process.nextTick(function() {

                //console.log("In facebook authorization module ",access_token);
                
                //at().x(access_token)
                
                var user = {
                    id : 1,
                    st : 2,
                    //token : at().x(access_token),
                    token : at

                }
                
                done(null, user);
          
            });
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
        
        //at : at().y,
        at : at //this value doesn't change, it is synchronous
                    
    }
})();

//const passport = require('passport');
//const config = require('../config/congig.js');
//const fbStrategy = require('passport-facebook').Strategy;
//
//module.exports = function(){
//    let authProcessor = (fbAPPid, fbAPPsecret, done) => {
//            done(null, result);
//        };
//    
//    passport.use(new fbStrategy(config.fb, authProcessor));
//}

//const FB = require('fb');
//const config = require('../../../config/config.js');
//
//
//module.export = ()=> {FB.api('oauth/access_token', {
//        client_id: config.fb.fbAPPid,
//        client_secret:config.fb.fbAPPsecret,
//        //grant_type: 'client_credentials'
//    }, function (res) {
//        if(!res || res.error) {
//            console.log(!res ? 'error occurred' : res.error);
//            return;
//        }
//     
//        var accessToken = res.access_token;
//        console.log(accessToken)
//    })
//};

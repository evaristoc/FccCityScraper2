'use strict';
const router = require('express').Router();
const GlobalApp = require('../main_reg.js');
const authfb = require('../auths/facebook');
const forumlinks = require('../data_collection/forum_crawler');
const testat = require('../auths/facebook');
var user = require('../dbs/user');
//https://www.promisejs.org/
//http://exploringjs.com/es6/ch_promises.html
//console.log(forumlinks)
//console.log(user)
const fbservice = require('../services/fb_service');
const testcrawler = require('../data_collection/fb_crawler');


module.exports = (() => {
    
    let self = {};
    
    //console.error("at routers ", "FOLDER "+require('path').basename(__dirname)+" ERROR ", GlobalApp)


    self.routes = {
        '/' : {
            'get' : (req, res, next) => {
                        console.log("In routes ", req.sessionStore.sessions.passport)
                        console.log("In routes ", req.session.passport)
                        //console.log(req)
                        console.log("in main router ",user)
                        res.send('Hello? Is anyone there?');
                    }
        },

        '/test' : {
            'get' : (req, res, next) => {
                
                fbservice.setaccesstoken(user.token);
                testcrawler.fbcrawleratwork();
                
                //var x = new Promise((resolve, reject) => {resolve(forumlinks.listofcampsites())})
                //x.then((r)=>{res.send(r)})                
                
                //if (x) {
                //    //code  
                //    res.send(x);
                //
                //}
            }
        
        },
        
        '/login' : {
            'get': (req, res, next) => {
                    //res.send("<a href='/auth/facebook'>login through facebook</a>");
                    res.render('login.ejs')
                    },
        },
        
        // send to facebook to do the authentication    
        '/auth' : {
            '/facebook' : {
                'get' : authfb.passport.authenticate("facebook", { scope : "email" }),
                // handle the callback after facebook has authenticated the user
                '/callback':{
                    'get' : authfb.passport.authenticate("facebook", {
                                successRedirect : "/content",
                                failureRedirect : "/login"
                            })
                    }
            },
        },
        
        // content page, it calls the isLoggedIn function defined above first
        // if the user is logged in, then proceed to the request handler function,
        // else the isLoggedIn will send 401 status instead            
        '/content' : {
            'get' : [authfb.isLoggedIn,
                          (req, res, next) => {
                            console.log("In content after login ",req.sessionStore.sessions);
                            console.log(req.user)
                            console.log(user)
                            //console.log("In content after login ",testat.at);
                            //console.log("In content after login ", testat.passport)
                            res.send("Congratulations! you've successfully logged in.");
                    }]
        },
        
        // logout request handler, passport attaches a logout() function to the req object,
        // and we call this to logout the user, same as destroying the data in the session.
        '/logout' : {
            'get' : (req, res, next) => {
                            req.logout();
                            res.send("logout success!");
                            next();
                            //res.redirect('https://www.facebook.com/logout.php?next=8080/logout&access_token='+at);
                        },
        },
            //'post' : {
            //    '/logout' : (req, res, next) => {
            //                res.redirect('https://www.facebook.com/logout.php?next=8080/logout&access_token='+authfb.at);
            //    }
            //}
    };


    self.initialize = function registerRoutes(routes, url) {
        for (let key in routes){
            if ( typeof routes[key] === 'object' && routes[key] != null && !(routes[key] instanceof Array) ) {
                console.log(key)
                if (url == undefined) {
                    //code
                    url = '';
                };
                registerRoutes(routes[key], url+key)
            } else {
                if (key === 'get') {
                    console.log(url, key)
                    router.get(url, routes[key]);
                }
            }
        };
        //console.log('routes initialized ', router);
    };
    

    
    //self.routes = {
    //    'get' : {
    //        '/' : (req, res, next) => {
    //                res.send('Hello? Is anyone there?');
    //            },
    //        "/login" : (req, res, next) => {
    //                //res.send("<a href='/auth/facebook'>login through facebook</a>");
    //                res.render('login.ejs')
    //            },
    //        // send to facebook to do the authentication    
    //        "/auth/facebook": authfb.passport.authenticate("facebook", { scope : "email" }),
    //        // handle the callback after facebook has authenticated the user
    //        "/auth/facebook/callback" : authfb.passport.authenticate("facebook", {
    //                successRedirect : "/content",
    //                failureRedirect : "/login"
    //            }),
    //        // content page, it calls the isLoggedIn function defined above first
    //        // if the user is logged in, then proceed to the request handler function,
    //        // else the isLoggedIn will send 401 status instead            
    //        "/content" : [authfb.isLoggedIn,
    //                      (req, res, next) => {
    //                        res.send("Congratulations! you've successfully logged in.");
    //                    }],
    //        // logout request handler, passport attaches a logout() function to the req object,
    //        // and we call this to logout the user, same as destroying the data in the session.
    //        "/logout" : (req, res, next) => {
    //                        req.logout();
    //                        res.send("logout success!");
    //                        next();
    //                        //res.redirect('https://www.facebook.com/logout.php?next=8080/logout&access_token='+at);
    //                    },
    //        //'post' : {
    //        //    '/logout' : (req, res, next) => {
    //        //                res.redirect('https://www.facebook.com/logout.php?next=8080/logout&access_token='+authfb.at);
    //        //    }
    //        //}
    //    }
    //};
    
    //self.initialize = function registerRoutes(routes, method) {
    //    for (let key in routes){
    //        if ( typeof routes[key] === 'object' && routes[key] != null && !(routes[key] instanceof Array) ) {
    //            registerRoutes(routes[key], key)
    //        } else {
    //            if (method === 'get') {
    //                router.get(key, routes[key]);
    //            }
    //        }
    //    };
    //    //console.log('routes initialized ', router);
    //};
    //
    //connecting to main module registration code using thin layer, called immediately as it is a IIEF
    (function(){
        GlobalApp.registerModule(self,'');
    })();
    
    return {
        initialize : self.initialize(self.routes),
        
        router : router
    }
  
  
})()
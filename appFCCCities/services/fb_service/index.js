//https://github.com/criso/fbgraph
//https://www.npmjs.com/package/fb
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//http://stackoverflow.com/questions/3362471/how-can-i-call-a-javascript-constructor-using-call-or-apply
let fbgraph = require('fbgraph');
let GlobalApp = require('../../main_reg.js');
let fbser = require('../../data_collection/fb_data');
let fbusertoken = require('../../../config/config.js').FBUSERTokken;
fbusertoken = require('../../dbs/user').token;
let searchOptions = {};

console.log("token in fbserv ", fbusertoken)

module.exports = (function(){
  
    //self object will be used to register and initialize this module using the main module registration code
    let self = {};
    const modulename = "fbService"; 
    
    //the initialization function: REQUIRED; in this case it will add the token to fbgraph
    //it is the only function added to empty self object (augmentation)
    //it is an IIEF (immediately invoked function expression)
    self.initialize = (()=>{
        console.log("INITIALIZING "+modulename);
        fbgraph.setAccessToken(fbusertoken);   
    })();
    
    //connecting to main module registration code using thin layer, called immediately as it is a IIEF
    (function(){
        GlobalApp.registerModule(self);
    })()
  
    
    //counter as a closure
    let cfb = (function(){
            let c = 0;
            return {
                add: () => { return c++; },
                getc: () => { return c }
            }
    })();
        
    return {
        
        //calling the initialization function of this module
        initialize : self.initialize,
        
        setaccesstoken : function(at){fbgraph.setAccessToken(at)},
        
        fbgetc : cfb.getc(),
        
        searchOptions : {
            q : "",
            type : "group"
        },
        
 
        fbfinddetails : function(fb_id){
          fbgraph.get("/"+fb_id+"?fields=id,name,updated_time,owner", (err, fbfound) => {
                        
            })  
        },
        
        
        fbsearchgroup : function(cb, cbe) {
            fbgraph.search(this.searchOptions, (err, fbfound) => {
                    if (err) {
                        console.error("ERROR FINDING LINK ", this.searchOptions.q, err);
                        cfb.add();
                        return;
                    } else if (fbfound.data[0].id){
                        let fb_id = fbfound.data[0].id;
                        cb(fb_id, cbe);        
                    }else {
                        console.log("ERROR : NO fb.id found ", this.searchOptions.q)
                    }
                
                })
        },
        

        fbfindmembers : function(fb_id) {
        
            return {
                  method : 'GET',
                  relative_url : "/"+fb_id+"/members?summary=true&limit=1"
                }
        },
        
        fbfindevents : function(fb_id) {
        
            return {
                  method : 'GET',
                  relative_url : "/"+fb_id+"/events"
                }
        },
        
        
        finddata : function(fb_id, cb) {
            //http://stackoverflow.com/questions/3133243/how-do-i-get-the-path-to-the-current-script-with-node-js
            //console.error("cb at finddata ", "FOLDER "+require('path').basename(__dirname)+" ERROR", cb)

            let fbfindmembers = function(fb_id) {
            
                return {
                      method : 'GET',
                      relative_url : "/"+fb_id+"/members?summary=true&limit=1"
                    }
            };
            

            let fbfindevents = function(fb_id) {
            
                return {
                      method : 'GET',
                      relative_url : "/"+fb_id+"/events"
                    }
            };            

            
            fbgraph.batch(
                [fbfindmembers(fb_id), fbfindevents(fb_id)],
                
                (err, membersAevents) => {
                   if(err){
                        console.error('AN ERROR HAS BEEN FOUND GETTING A RECORD', err);
                        return;
                    }     
                    cb(membersAevents);
                }
                
            )
        }
    }
})()

    //return {
    //    
    //    fbgetc : cfb.getc(),
    //    
    //    
    //    searchOptions : {
    //        q : "",
    //        type : "group"
    //    },
    //    
    //
    //    
    //    fbgetmembers : (fb_id, resolve, reject) => {
    //        //resolve and reject are actually callback functions that I have to define...
    //        //I think a multi-get for members nad events is better than just one by one? I think that I have them in parallel anyway... Check!
    //        return new Promise( (resolve, reject) => { fbgraph.get("/"+fb_id+"/members?summary=true&limit=1", (err, members) => {
    //                if (err) {
    //                    cfb.add();
    //                    console.error("ERROR MEMBERS ID ", fb_id, this.searchOptions.q);
    //                    reject(err);
    //                } else {
    //                    cfb.add();
    //                    console.log(this.searchOptions.q, "HAS MEMBERS ", members.summary.total_count);
    //                    resolve(members);
    //                }
    //            
    //        })})
    //    },
    //    
    //    fbgetevents : (fb_id, resolve, reject) => {
    //      return new Promise( (resolve, reject) => {fbgraph.get("/"+fb_id+"events", (err, events) => {
    //                if (err) {
    //                    console.error("ERROR EVENTS ID ", fb_id, this.searchOptions.q);
    //                    reject(err);
    //                } else {
    //                    console.log(this.searchOptions.q, "HAS EVENT ", events.data[0].id);
    //                    resolve(members);
    //                }            
    //        
    //        })})
    //    },
    //    
    //    fbsearch : () => {
    //        fbgraph.search(this.searchOptions, (err, fbfound) => {
    //                if (err) {
    //                    console.error("ERROR FINDING LINK ", searchOptions.q, err);
    //                    cfb.add();
    //                    return;
    //                } else {
    //                    return fbfound;        
    //                }
    //            
    //            })
    //    }
    //    
    //}
//}
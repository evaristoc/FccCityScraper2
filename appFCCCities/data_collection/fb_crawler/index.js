let fbserv = require('../../services/fb_service');
let fbdatacol = require('../fb_data');
let forumcrawler = require('../forum_crawler')
//console.error(fbdatacol.fbcollect);

module.exports = (function(){
    
    var links = [
                    "https://www.facebook.com/groups/free.code.camp.Algiers/",
                    "https://www.facebook.com/groups/free.code.camp.batna/",
                    "https://www.facebook.com/groups/free.code.camp.biskra/",
                    "https://www.facebook.com/groups/free.code.camp.bouira/",
                    "https://www.facebook.com/groups/free.code.camp.constantine/",
                    "https://www.facebook.com/groups/free.code.camp.mansoura/",
                    "https://www.facebook.com/groups/free.code.camp.oran/",
                    "https://www.facebook.com/groups/free.code.camp.setif/",
                    "https://www.facebook.com/groups/free.code.camp.sidibelabbes/",
                    "https://www.facebook.com/groups/free.code.camp.souk.ahras/",
                    "https://www.facebook.com/groups/free.code.camp.tiziouzou/"
                ]

    links = new Promise((resolve, reject)=>{resolve(forumcrawler.listofcampsites())})

    fbcrawler = function(passedlinks){
        //console.log("inside fbcrawler ", passedlinks[0]);
        for (let nulinkindx = 0; nulinkindx < passedlinks.length; nulinkindx++) {
                //console.log("inside fbcrawler ", passedlinks[0]);
                //console.log(passedlinks[nulinkindx].url.split("/")[3]);
                //console.log(passedlinks[nulinkindx].url.split("/")[4]);
                let splittedurl = passedlinks[nulinkindx].url.split('/'); 
                //console.log(splittedurl)
                if(splittedurl[2] != 'www.facebook.com'){
                    console.log("this one not ", splittedurl[3], splittedurl[4])
                }else{
                    //console.log("this one yes ", splittedurl[3], splitterurl[4])
                    ((indx, l) => {
                        setTimeout(() =>{
                           fbserv.searchOptions.q = l; //OJO: RESOLVER!!!
                           console.log(fbserv.searchOptions.q);
                           fbserv.fbsearchgroup(fbserv.finddata, fbdatacol.fbcollect);
                       },
                       4000*indx)
                    })(nulinkindx, splittedurl[4])
                };

        };
        
        //if (nulinkindx == links.length - 1) {
        //    fbdatacol.getdata()
        //}
    }

    
        
    return {
        //simplest version of the crawler, without comparing to an existing updated list to skip values: just check them all
                
        //fbcrawler : function(passedlinks){
        //    for (var nulinkindx = 0; nulinkindx < links.length; nulinkindx++) {
        //            ((indx, l) => {
        //                setTimeout(() =>{
        //                   fbserv.searchOptions.q = l[indx].url.split("/")[4]; //OJO: RESOLVER!!!
        //                   fbserv.fbsearchgroup(fbserv.finddata, fbdatacol.fbcollect);
        //                   console.log(fbserv.searchOptions.q);
        //               },
        //               4000*indx)
        //            })(nulinkindx, passedlinks)
        //    };
        //    
        //    //if (nulinkindx == links.length - 1) {
        //    //    fbdatacol.getdata()
        //    //}
        //},
    
        fbcrawleratwork : ()=>{links.then((passedlinks)=>{fbcrawler(passedlinks)})}
    
    }
    
})()
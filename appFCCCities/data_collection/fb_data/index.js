module.exports = (function() {
    
    let fbdata = {}
    
    return {
            fbcollect : function(membersAevents) {
                if (!membersAevents) {
                    console.error("NO DATA FOUND FOR THIS RECORD");
                    return;
                } else {
                    console.log(membersAevents);
                    fbdata["data"] = membersAevents;
                }
            },
            
            fbgetdata : function(){
                    console.log(fbdata)
                } 
        }
})()
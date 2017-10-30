//https://github.com/Bouncey/bounceyBot/blob/master/app/discourseData.js#L22
const request = require('request');


module.exports = (()=>{
    
    let self = {};
    
    let initialize = (self) => {
            return self;
        };
    
    return {
        initialize : initialize(self),
        
        searchOptions : {
            url : "https://forum.freecodecamp.com/t/freecodecamp-city-based-local-groups/19574.json"
          },
        
        forumfindcamps : ()=>{
            let url = "https://forum.freecodecamp.com/t/freecodecamp-city-based-local-groups/19574.json"

            return new Promise((resolve, reject) => {
                request.get(url, (err, res, body) => {
                    if (err) {
                        //code
                        reject(err)
                    };
                    const response = JSON.parse(body).post_stream.posts;
                    //console.log(response);
                    resolve(response);
                })
            })
        },
        
    };
})();

//function apiCall(path, page) {
//  const pageString = page ? `?page=${page}` : '';
//  const url = `https://forum.freecodecamp.com/${path}${pageString}`;
//  const options = {
//    url
//  };
//  return new Promise((resolve, reject) => {
//    request.get(options, (err, res, body) => {
//      if (err) {
//        reject(err);
//      }
//      const response = JSON.parse(body);
//      resolve(response);
//    });
//  });
//}
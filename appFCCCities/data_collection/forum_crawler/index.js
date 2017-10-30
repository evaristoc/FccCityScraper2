const forumserv = require('../../services/fccforum_service');

module.exports = (()=>{
        
    return {
        listofcampsites : ()=>{
            return forumserv.forumfindcamps()
                .then((posts)=>{
                
                    var links = [];

                    if (posts) {
                        posts
                            .forEach((d) => {
                                //console.log(d.link_counts);
                                //console.log(posts);

                                for (let k = 0; k < d.link_counts.length; k++){
                                    links.push(d.link_counts[k])
                                } 
                            })
                        //.forEach((d) => {links.push({url : d.url, clicks : d.clicks})})                
                        //console.log(links);
                        return links;
                    } else {
                        console.error("NO POST DELIVERED TO listofcampsites")
                    };
                })
                .catch(error => {
                    console.error(error);
                })
            },
        
        //links : links
    }
})()
const express = require('express');
const router = express.Router();
const helper = require("./../helpers/custom");
const htc_url = `https://api.hatchways.io/assessment/blog/posts`;


/*
* Request sent to API, 
*   data retrieved, and cached
*
*/
router.get('/api/posts',(req, res) => {
    let tag = req.query.tag,
        direction = req.query.direction,
        sortBy = req.query.sortBy;
    res.setHeader('Content-Type', 'application/json');

    /*
    * Tag validation
    */
    if(!tag){
        res.send({"error": "Tags parameter is required"}).statusCode(400)
    }

    /*
    * Direction validation
    */
    if(direction && !['desc','asc'].includes(direction)){
        res.send({"error": "sortBy parameter is invalid"}).statusCode(400)
    }
    
    helper.getData(htc_url,{tag})
    .then(data => {
        /*
        * sortBy validation
        */
        if(['id','reads','likes','popularity'].includes(sortBy)){
            data.posts.sort((a, b) => (direction === 'desc' ? a[sortBy] < b[sortBy] : a[sortBy] > b[sortBy]) ? 1 : -1)
        }
        res.send(JSON.stringify(data, null, 3));
    }).catch(err => {
        console.log(err)
    })
})


/*
* Request sent to API, and if no err, it will return success 
*
*/
router.get('/api/ping',(req, res) => {
    let tag = req.query.tag;
    res.setHeader('Content-Type', 'application/json');
    helper.getData(htc_url,{tag}).then(data => {
        res.send({"success": true}).statusCode(200)
    }).catch(data => {
        res.send({"success": false}).statusCode(500)
    })
    
})


module.exports = router;
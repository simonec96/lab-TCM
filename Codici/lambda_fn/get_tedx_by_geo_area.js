const connect_to_db = require('./db');

// GET BY TALK HANDLER

const talk = require('./Talk');


module.exports.get_by_cont = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('Received event:', JSON.stringify(event, null, 2));
    let body = {}
    if (event.body) {
        body = JSON.parse(event.body)
    }
    // set default
    if(!body.continente && !body.nazione && !body.citta) {
        callback(null, {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the talks. No parameter is defined.'
        })
    }
    
    if (!body.doc_per_page) {
        body.doc_per_page = 10
    }
    if (!body.page) {
        body.page = 1
    }
    
    
    
    connect_to_db().then(() => {
        console.log('=> get_all talks');
        if(!body.nazione && !body.citta){
        talk.find({'geo_area.continent':body.continente},'title url main_speaker details geo_area.continent geo_area.nation geo_area.city')
            .skip((body.doc_per_page * body.page) - body.doc_per_page)
            .limit(body.doc_per_page)
            .then(talks =>{
                        callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(talks)
                        })
            }).catch(err =>
                callback(null, {
                    statusCode: err.statusCode || 404,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the talks.'
                })
            );
        }
        else if(!body.citta){
        talk.find({'geo_area.nation':body.nazione},'title url main_speaker details geo_area.nation geo_area.city')
            .skip((body.doc_per_page * body.page) - body.doc_per_page)
            .limit(body.doc_per_page)
            .then(talks =>{
                        callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(talks)
                        })
            }).catch(err =>
                callback(null, {
                    statusCode: err.statusCode || 404,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the talks.'
                })
            );
        }else{
             talk.find({'geo_area.city':body.citta},'title url main_speaker details geo_area.city')
            .skip((body.doc_per_page * body.page) - body.doc_per_page)
            .limit(body.doc_per_page)
            .then(talks =>{
                        callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(talks)
                        })
            }).catch(err =>
                callback(null, {
                    statusCode: err.statusCode || 404,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the talks.'
                })
            );
        }
        
            
    });
};

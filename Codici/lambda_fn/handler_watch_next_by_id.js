const connect_to_db = require('./db');

// GET BY TALK HANDLER

const talk = require('./Talk');
const talk_ref = require('./Talk');

module.exports.get_by_idx = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('Received event:', JSON.stringify(event, null, 2));
    let body = {}
    if (event.body) {
        body = JSON.parse(event.body)
    }
    // set default
    if(!body.id) {
        callback(null, {
                    statusCode: 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the talks. Identifier is null.'
        })
    }
    
    connect_to_db().then(() => {
        console.log('=> get_all idx of next talks');
        talk.findOne({_id:body.id})
            .then(talk_find => 
                    talk_ref.find({_id:talk_find.next_idx},'title main_speaker url details').then(talked =>
                    {
                    callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(talked)
                    })
                })
            )
            .catch(err =>
                callback(null, {
                    statusCode: err.statusCode || 400,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the talks.'
                })
            );
    });
};

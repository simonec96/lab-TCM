const connect_to_db = require('./db');

// GET BY TALK HANDLER

const talk = require('./Talk');

module.exports.get_vote_by_idx = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('Received event:', JSON.stringify(event, null, 2));
    let body = {}
    if (event.body) {
        body = JSON.parse(event.body)
    }
    // set default
    
    /* parametri:
    - voto unico, id e numero stelle 
    - media voti
    */
    
    if(!body.id) {
        callback(null, {
                    statusCode: 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the talks. Identifier is null.'
        })
    }
    
    connect_to_db().then(() => {
        console.log('=> get_all idx of next talks');
        if(!body.voto_limite){
        talk.findOne({_id:body.id},'title url main_speaker vote_user')
            .then(talks => {
                    var bd=JSON.stringify(talks)
                    var n=0
                    var sum=0
                    while(n<talks.vote_user.length){
                        sum+=talks.vote_user[n].vote
                    n+=1
                }
                const media=sum/n
                bd=bd+JSON.stringify({"media voti":media,"voti totali":n})
                callback(null, {
                    statusCode: 200,
                    body:bd
                })
            })
            .catch(err =>
                callback(null, {
                    statusCode: err.statusCode || 400,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the talks.'
                })
            )
            }else{
                talk.findOne({_id:body.id})
                .then(talks => {
                    var obj={"title":talks.title,"url":talks.url,"main_speaker":talks.main_speaker};
                    var bd=JSON.stringify(obj)
                    var n=0
                    var sum=0
                    while(n<talks.vote_user.length){
                        sum+=talks.vote_user[n].vote
                    if(talks.vote_user[n].vote>=new Number(body.voto_limite)){
                        bd=bd+JSON.stringify(talks.vote_user[n])
                    }
                    n+=1
                }
                const media=sum/n
                bd=bd+JSON.stringify({"media voti":media,"voti totali":n})
                callback(null, {
                    statusCode: 200,
                    body:bd
                })
            })
            .catch(err =>
                callback(null, {
                    statusCode: err.statusCode || 400,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the talks.'
                })
            );
        }
    })
};

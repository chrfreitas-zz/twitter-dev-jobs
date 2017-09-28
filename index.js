'use strict'

const Twitter = require('twitter');
const Promise = require('promise')

const accounts = [
    'Jobspresso',
    'remote_co',
    'remote_ok',
    'workingnomads',
    'weworkremotely'
];

function filter(tweets, word) {

    if(!word){
        return tweets;
    }

    const regex = new RegExp(word, 'g', 'i');

    return tweets.filter(item => item.text.match(regex));
}

function format(tweets){
    return tweets.map(item => {
        return {
            name: item.user.name,
            text: item.text,
            link: item.entities.urls[0].url
        }
    });
}

function getPostsFrom(twitter, accounts) {
    return accounts.map(account => {

        const params = {
            screen_name: account,
            count: 50
        };

        return twitter.get('statuses/user_timeline', params);
    });
}

module.exports = function(context, callback){

    if(!context.data.keyWord){
        callback('It\'s required to pass a paramter named keyWork');
        return;
    }

    const twitter = new Twitter({
        consumer_key: context.secrets.CONSUMER_KEY,
        consumer_secret: context.secrets.CONSUMER_SECRET,
        access_token_key: context.secrets.TOKEN_KEY,
        access_token_secret: context.secrets.TOKEN_SECRET
    });

    const promises = getPostsFrom(twitter, accounts);

    Promise.all(promises)
           .then(data => {

               let jobs = []

                callback(data);
                data.forEach(function(tweets) {
                    const matched = filter(tweets, context.data.keyWord);
                    jobs.push(format(matched));
                });

                callback(jobs);
            })
            .catch(error => {
                callback(error);
            })
}

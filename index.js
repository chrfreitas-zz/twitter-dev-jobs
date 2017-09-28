'use strict'

const Twitter = require('twitter');
const Promise = require('promise')

const accounts = [
    'Jobspresso',
    'remote_co',
    'remote_ok',
    'workingnomads',
    'weworkremotely',
    'stackdevjobs',
    'GitHubJobs'
];
const maxCount = 100;

function isMatch(tweet, word) {

    if(!word){
        return tweet;
    }

    const regex = new RegExp(word, 'g', 'i');

    return (tweet.text.match(regex));
}

function format(tweets){
    return tweets.map(item => {

        const link = item.entities.urls.length ? item.entities.urls[0].url : 'No link :('

        return {
            name: item.user.name,
            text: item.text,
            link
        }
    });
}

function getPostsFrom(twitter, accounts) {
    return accounts.map(account => {

        const params = {
            screen_name: account,
            count: maxCount
        };

        return twitter.get('statuses/user_timeline', params);
    });
}

function serialize(tweets, word){
    return tweets.reduce((total, posts) => {

        // Filter just items that match with the word
        const matches = posts.reduce((total, post) => {
            if(isMatch(post, word)){
                total.push(post);
            }

            return total;
        }, []);

        if(matches.length){
            const formatted = format(matches);
            total.push(formatted);
        }

        return total;
    }, []);
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
               let jobs = serialize(data, context.data.keyWord);
                callback(jobs);
            })
            .catch(error => {
                callback(error);
            })
}

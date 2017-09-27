
const Twitter = require('twitter');

const twitter = new Twitter({
    consumer_key: 'Xk0Amm1A181XR1N0to9aJUkuY',
    consumer_secret: 'c9KMGo4C499CwhX3bPeoKrAwpGv9biETgBUZ8gDqSFtUPl9Iza',
    access_token_key: '1556332994-mTdlKEoGy4A3ZxtAmtOI2h2kSKAFVRTdkZKIRcB',
    access_token_secret: 'XClcYPLkf6UHlUdwY28Cbn5u7xkPzXJIz4uvwRxCsl5KL'
});

const accounts = [
    {
        name: 'Jobspresso',
        lastId: 0
    },
    {
        name: 'remote_co',
        lastId: 0
    },
    {
        name: 'remote_ok',
        lastId: 0
    },
    {
        name: 'workingnomads',
        lastId: 0
    },
    {
        name: 'weworkremotely',
        lastId: 0
    }
];

module.exports = (context, callback) => {

    const params = {
        screen_name: accounts[0].name
    };

    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            callback('Error');
        }

        callback(tweets);
    });

}

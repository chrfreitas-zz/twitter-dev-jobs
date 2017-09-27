
var Twitter = require('twitter');

//https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
//https://webtask.io/docs/modules#_=_

var twt = new Twitter({
  consumer_key: 'Xk0Amm1A181XR1N0to9aJUkuY',
  consumer_secret: 'c9KMGo4C499CwhX3bPeoKrAwpGv9biETgBUZ8gDqSFtUPl9Iza',
  access_token_key: '1556332994-mTdlKEoGy4A3ZxtAmtOI2h2kSKAFVRTdkZKIRcB',
  access_token_secret: 'XClcYPLkf6UHlUdwY28Cbn5u7xkPzXJIz4uvwRxCsl5KL'
});

module.exports = (context, callback) => {

    var params = {
        screen_name: 'chrfreitas',
        since_id: 913052639151185900
    };

    twt.get('statuses/user_timeline', params, function(error, tweets, response) {
        var details = tweets.details;

      if (!error) {
          callback(details)
      }
    });

}

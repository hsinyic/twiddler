$(document).ready(function () {
  $("time.timeago").timeago();

  // background image
  $.backstretch("https://picsum.photos/200/300");

  var $addtweets = $('#add-tweets');
  var $profiles = $('#usr-prof');
  var $twt_c = $('#twt_box');
  var $spn = $('spn');
  var $tempUsr; // use scoping to pass the tempuser around

  var specUserTweets = function (usrname) {
    $twt_c.html('');
    let index = streams.users[usrname].length - 1;
    while (index >= 0) {
      let tweet = streams.users[usrname][index];
      let $tweet = $('<div class="tweets user"></div>');
      $tweet.html('@' + tweet.user + '--> ' + tweet.message + ' <div id="twt_time">- ' + $.timeago(tweet.created_at) + '</div>');
      $tweet.appendTo($twt_c);
      index -= 1;
    }
  };

  var allTweets = function () {
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweets"></div>');
      $tweet.html('@<spn class="' + tweet.user + '">' + tweet.user + '</spn>--> ' + tweet.message + ' <div id="twt_time">- ' + $.timeago(tweet.created_at) + '</div>');
      $tweet.appendTo($twt_c);
      index -= 1;
    }
    $spn = $('spn');
  };

  allTweets();

  var sendNAME = function () {
    if ($("textarea.user-control").val().replace(/^\s+|\s+$/g, "").length == 0){
      alert('pick a username!')
    }else{
      var inputUsr = $('textarea.user-control').val()
      $tempUsr = inputUsr
    }
    if (!(inputUsr in streams.users)) {
      streams.users.$tempUsr = [];
    }
    $('form').trigger('reset');
  };
  var getUser = function(){
    return $tempUsr
  }

  var sendTweet = function () {
    let p = String($tempUsr)
    if (!(p in streams.users)) {
      streams.users[p] = [];
    }
    let tweet = {};
    tweet.user = $tempUsr;
    // alert('hi') // alert($tempUsr)  // alert(tweet.user) 
    tweet.message = $('textarea.form-control').val();
    if($tempUsr==undefined){
      alert('who are you???? login first! Alien alert!! ')
    }else if ($("textarea.form-control").val().replace(/^\s+|\s+$/g, "").length != 0){
      tweet.created_at = new Date();
      $('form.controlTxtbox').trigger('reset');
      addTweet(tweet);
    }else{
      alert('say something! write a poem! share a recipe! make some noise!')
    }
  };


  // Do not refresh
  $('form').submit(function (e) {
    e.preventDefault();
  });

  // Send a tweet
  $(document).on('click', '#tweet', function () {
    sendTweet();
    $twt_c.html('');
    allTweets();
  });

  // test 
  $(document).on('click', '#iamuser', function () {
    sendNAME();
    $twt_c.html('');
    allTweets();
  });

  // Home button
  $(document).on('click', '#home', function () {
    $('#new-tweet').show();
    $profiles.html('<h4>all timeline</h4');
    $twt_c.html('');
    allTweets();

    if ($addtweets.hasClass('user-tl')) {
      $addtweets.removeClass('user-tl').addClass('timeline');
    }

  });

  // Update timeline with more recent tweets
  $(document).on('click', '.timeline', function () {
    $twt_c.html('');
    allTweets();
  });

  // view someone's timeline on a @name click
  $(document).on('click', 'spn', function () {
    // $('#new-tweet').hide(); 
    let usrname = this.className;
    if (usrname === $tempUsr) {
      $profiles.html('<h4>your awesome timeline</h4>');
    } else {
      $profiles.html('<h4>@' + usrname + '\'s timeline</h4>');
    }
    specUserTweets(usrname);

    // view only current user's tweets
    $addtweets.removeClass('timeline').addClass('user-tl');
    $(document).on('click', '.user-tl', function () {
      $profiles.html('<h4>@' + usrname + '\'s timeline</h4>');
      specUserTweets(usrname);
    });
  });
});
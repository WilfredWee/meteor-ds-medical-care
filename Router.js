Router.route('/', function () {
  this.render('login');
});

Router.route('/profiles', function () {
  this.render('profiles');
});


Router.route("/test/trackableForm", function() {
  this.render("trackableForm");
});

Router.route("/test/sleepingProblem", function() {
  this.render("sleepingProblem");
});

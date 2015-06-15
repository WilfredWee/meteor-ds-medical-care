Meteor.startup(function() {
  Session.setDefault("problems", []);
  Session.setDefault("trackable", {});
})

Template.trackableForm.onRendered(function() {
  this.$("#datetimepicker3").datetimepicker({
    pickDate: false
  });
});

Template.sleepingProblem.events({
  // If the child has a sleeping problem, we will
  // construct a problem and trackable object and
  // later send it to the server.

  "click .yes": function(event) {
    event.preventDefault();
    var problems = Session.get("problems");

    problems = problems.push({
      code: "sleep_bedtime",
      name: "What time did your child go to bed?"
    });
  },
});

Template.trackableForm.events({
  "change .bedTime": function(event) {
    console.log(arguments);
  },

  "focus .bedTime": function(event) {
     var something = this.$("#datetimepicker3");
  },

  "blur .bedTime": function(event) {
     var something = this.$("#datetimepicker3");
  }
});

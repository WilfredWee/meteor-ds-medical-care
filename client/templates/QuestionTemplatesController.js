var bedTimeProblem = {
  code: "sleep_bedtime",
  name: "BedTime"
};

var awakeningProblem = {
  code: "sleep_awakening",
  name: "Awakening"
};


var breathingProblem = {
  code: "sleep_breathing",
  name: "Breathing"
};


var parasomniaProblem = {
  code: "sleep_parasomnia",
  name: "Parasomnias (Nightmares, night terrors, teeth grinding etc.)"
};

var restlessSleepProblem = {
  code: "sleep_restless",
  name: "Restless Sleep"
};

var allProblems = [bedTimeProblem, awakeningProblem, breathingProblem,  parasomniaProblem, restlessSleepProblem];


Meteor.startup(function() {
  Session.setDefault("problems", []);
  Session.setDefault("trackables", []);
});

Template.trackableForm.helpers({
  problemInputs: function() {
    return allProblems;
  },
  hasProblemContext: function() {
    var problemContext = Session.get("currentProblem");

    if(!problemContext) {
      return false;
    }

    return true;
  },

  isNotDone: function() {
    return !Session.get("isDone");
  }
});

Template.trackableForm.onRendered(function() {
  this.$("#datetimepicker3").datetimepicker({
    pickDate: false
  });
});

Template.problemInput.helpers({
  isChecked: function(problemCode) {
    var problems = Session.get("problems");
    return _.some(problems, function(problem) {
      if(!problem) {
        return false;
      }
      return problem.code === problemCode;
    });
  }
});

Template.problemInput.events({
  "change .severitySelect": function(event) {
    var severityValue = event.currentTarget.selectedOptions[0].value;

    var trackables = Session.get("trackables");

    var trackable = _.find(trackables, function(trackable) {
      return trackable.problemCode === this.code;
    }.bind(this));

    if(!trackable) {
      trackable = {};
      // We need to convert this problemCode to problemId later.
      trackable.problemCode = this.code;
      trackable.severity = severityValue;
    }
    else {
      trackable.severity = severityValue;
    }

    trackables.push(trackable);

    // need a childId
    Session.set("trackables", trackables);
  }
});

// Template.sleepingProblem.events({
//   // If the child has a sleeping problem, we will
//   // construct a problem and trackable object and
//   // later send it to the server.

//   "click .yes": function(event) {
//     event.preventDefault();
//     var problems = Session.get("problems");

//     problems = problems.push({
//       code: "sleep_bedtime",
//       name: "What time did your child go to bed?"
//     });
//   },
// });

var handleSessionProblems = function(event, problemCode) {
  var currentProblem = _.find(allProblems, function(problem) {
    if(!problem) {
      return false;
    }
    return problem.code === problemCode;
  });

  var problems = Session.get("problems");

  if(event.currentTarget.checked) {
    problems.push(currentProblem);
  }
  else {
    problems = _.filter(problems, function(problem) {
      if(!problem) {
        return false;
      }
      return problem.code !== problemCode;
    });
  }

  Session.set("problems", problems);
  Session.set("problemsContexts", problems);
};

Template.trackableForm.events({
  "change .checkbox": function(event) {
    if(!event.currentTarget.id) {
      return;
    }
    handleSessionProblems(event, event.currentTarget.id);
  },

  "click #nextButton": function(event) {
    event.preventDefault();

    var problems = Session.get("problemsContexts");
    var currentProblem = problems.pop();
    Session.set("problemsContexts", problems);

    Session.set("currentProblem", currentProblem);

  }
});

Template.problemContextQuestions.helpers({
  isBedTimeProblem: function() {
    var currentProblem = Session.get("currentProblem");

    return currentProblem.code === bedTimeProblem.code;
  },

  isAwakeningProblem: function() {
    var currentProblem = Session.get("currentProblem");

    return currentProblem.code === awakeningProblem.code;
  },

  isBreathingProblem: function() {
    var currentProblem = Session.get("currentProblem");

    return currentProblem.code === breathingProblem.code;
  }
});

Template.problemContextQuestions.events({
  "click .button": function(event) {
    event.preventDefault();
    var currentProblem = Session.get("currentProblem");
    var problemsContexts = Session.get("problemsContexts");

    if(problemsContexts.length === 0) {
      Session.set("isDone", true);
    }

    var newProblem = problemsContexts.pop();

    Session.set("problemsContexts", problemsContexts);
    Session.set("currentProblem", newProblem);

  }
});

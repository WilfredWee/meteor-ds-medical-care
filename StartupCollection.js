Meteor.startup(function() {
   if(Meteor.isServer && Parents.find().fetch().length === 0) {
    var initialTestParent = {
      username: "joannesmith",
      password: "Password1",
      email: "joannesmith.smith@outlook.com"
    };

    var parentId = Parents.insert(initialTestParent);

    var initialTestChild = {
      firstName: "Andy",
      lastName: "Smith",
      dob: new Date("2005-10-05"),
      gender: "Female",
      parentId: parentId,
      bedTime: 1200
    };

    var childId = Children.insert(initialTestChild);

    var bedtimeProblem = {
      code: "sleep_bedtime",
      name: "What time did your child go to bed?"
    };

    var bedtimeProblemId = Problems.insert(bedtimeProblem);

    var sleeptimeProblem = {
      code: "sleep_sleeptime",
      name: "What time did your child fall asleep?"
    };

    var sleeptimeProblemId = Problems.insert(sleeptimeProblem);

    var sleep_beforemood = {
      code: "sleep_beforemood",
      name: "How would you describe the mood of your child before going to bed?"
    };

    var sleep_beforemoodProblemId = Problems.insert(sleep_beforemood);

    var bedtimeTrackable = {
      notifyAt: 1260,
      promptInterval: 1440,
      childId: childId,
      problemId: bedtimeProblemId,
      isProblemForChild: true
    };

    var bedtimeTrackableId = Trackables.insert(bedtimeTrackable);

    var sleep_beforemoodTrackable = {
      notifyAt: 1260,
      promptInterval: 1440,
      childId: childId,
      problemId: sleep_beforemoodProblemId,
      isProblemForChild: false
    };

    var sleep_beforemoodTrackableId = Trackables.insert(sleep_beforemoodTrackable);


    var initialEvent = {
      timeStamp: new Date(),
      trackableId: bedtimeTrackableId
    };

    var initialEventId = Events.insert(initialEvent);

   }
});

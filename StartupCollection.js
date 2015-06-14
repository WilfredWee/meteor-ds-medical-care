Meteor.startup(function() {
   if(Meteor.isServer && Parents.find().fetch().length === 0) {
    var initialTestParent = {
      username: "TestParent",
      password: "pass",
      email: "wilfred.wee@outlook.com"
    };

    var parentId = Parents.insert(initialTestParent);

    var initialTestChild = {
      firstName: "Test",
      lastName: "Child",
      dob: new Date(),
      gender: "Male",
      parentId: parentId,
      bedTime: 22
    };

    var childId = Children.insert(initialTestChild);

    var initialProblem = {
      code: "1",
      name: "Awakening"
    };

    var initialProblemId = Problems.insert(initialProblem);

    var initialTrackable = {
      notifyAt: 200,
      promptInterval: 1440,
      childId: childId,
      problemId: initialProblemId,
      isProblemForChild: true
    };

    var initialTrackableId = Trackables.insert(initialTrackable);

    var initialEvent = {
      timeStamp: new Date(),
      trackableId: initialTrackableId
    };

    var initialEventId = Events.insert(initialEvent);

   }
});

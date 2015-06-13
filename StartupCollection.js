Meteor.startup(function() {
  // if(Parents.find().fetch().length === 0) {
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


    var initialTrackable = {
      promptInterval: 1440,
      childId: childId
    };

    var initialTrackableId = Trackables.insert(initialTrackable);

    var initialEvent = {
      eventType: "BedTime",
      timeStamp: new Date(),
      trackableId: initialTrackableId
    };

    var initialEventId = Events.insert(initialEvent);

  // }
});

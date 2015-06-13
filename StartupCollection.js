Meteor.startup(function() {
  if(Parents.find().fetch().length === 0) {
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
      bedTime: 22,
      trackables: [{
        events: [{
          eventType: "BedTime",

          timeStamp: new Date()
        }],

        promptInterval: 1440
      }]
    };

    var childId = Children.insert(initialTestChild);
  }
});

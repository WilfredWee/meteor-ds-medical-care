Meteor.startup(function() {
  if(Meteor.isServer) {
    Meteor.publish("parents", function() {
      return Parents.find();
    });

    Meteor.publish("children", function() {
      return Children.find();
    });
  }
})

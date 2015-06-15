Meteor.startup(function() {
  if(Meteor.isServer) {
    Meteor.publish("parents", function() {
      return Parents.find();
    });

    Meteor.publish("children", function() {
      return Children.find();
    });

    Meteor.publish("trackables", function() {
      return Trackables.find();
    });

    Meteor.publish("events", function() {
      return Events.find();
    });
  }
});

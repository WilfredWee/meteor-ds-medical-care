Meteor.startup(function() {
  if(Meteor.isClient) {
    Meteor.subscribe("parents");
    Meteor.subscribe("children");
    Meteor.subscribe("trackables");
    Meteor.subscribe("events");
  }
});

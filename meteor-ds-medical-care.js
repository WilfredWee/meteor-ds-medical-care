
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.profiles.helpers({
    parents: function(){
      return Parents.find().fetch();
    },

    children: function(){
      return Children.find().fetch();
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

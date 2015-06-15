Parents = new Mongo.Collection("parents");
Children = new Mongo.Collection("children");
Trackables = new Mongo.Collection("trackables");
Events = new Mongo.Collection("events");
Problems = new Mongo.Collection("problems");

var ParentSchema = new SimpleSchema({
  username: {
    type: String,
    label: "username"
  },

  password: {
    type: String,
    label: "password"
  },

  email: {
    type: String,
    label: "password"
  }
});

var ChildSchema = new SimpleSchema({
  firstName: {
    type: String,
    label: "child first name"
  },

  lastName: {
    type: String,
    label: "child last name"
  },

  dob: {
    type: Date,
    label: "child dob"
  },

  gender: {
    type: String,
    label: "child gender"
  },

  parentId: {
    type: String,
    label: "id of parent"
  },

  bedTime: {
    type: Number,
    label: "bed time represented as minutes in a day"
  }
});

var ProblemSchema = new SimpleSchema({
   code: {
    type: String,
    label: "Problem Code"
   },

   name: {
    type: String,
    label: "Problem Name"
   }
});

var TrackableSchema = new SimpleSchema({
  notifyAt:{
    type: Number,
    label: "Time represented as minutes in a day"
  },

  promptInterval: {
    type: Number,
    label: "interval to prompt the event, in minutes"
  },

  childId: {
    type: String,
    label: "id of the child the trackable relates to"
  },

  problemId: {
    type: String,
    label: "problem unique identifier"
  },

  isProblemForChild: {
    type: Boolean,
    label: "Does the problem exist for the child"
  },

  severity: {
    type: String,
    label: "The severity of the problem for the child"
  }
});

// For now, we add relevant fields/events into an Event object
// we implicitly set the rules for now.
var EventSchema = new SimpleSchema({
  timeStamp: {
    type: Date,
    label: "time stamp of a trackable event."
  },

  trackableId: {
    type: String,
    label: "id of the trackable the event relates to"
  },

  happinessLevel: {
    type: Number,
    label: "level of happiness, in increasing order. 0 and negative is sad."
  },

  note: {
    type: String,
    label: "note of an event"
  }
});

// Parents.attachSchema(ParentSchema);
// Children.attachSchema(ChildSchema);
// Trackables.attachSchema(TrackableSchema);
// Events.attachSchema(EventSchema);
// Problems.attachSchema(ProblemSchema);


if(Meteor.isServer) {
  Restivus.configure({
    useAuth: false,
    prettyJson: true
  });

  Restivus.addCollection(Parents);
  Restivus.addCollection(Children);
  Restivus.addCollection(Trackables);
  Restivus.addCollection(Events);
  Restivus.addCollection(Problems);
}

Parents = new Mongo.Collection("parents");
Children = new Mongo.Collection("children");

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
    label: "set bed time of child, in 24hr format"
  },

  trackables: {
    type: [Trackable],
    label: "trackables of a child",
    optional: true
  }
});

var Trackable = new SimpleSchema({
  events: {
    type: [Event],
    label: "event of a trackable"
  },

  promptInterval: {
    type: Number,
    label: "interval to prompt the event, in minutes"
  }
});

// For now, we add relevant fields/events into an Event object
// we implicitly set the rules for now.
var Event = new SimpleSchema({
  eventType: {
    type: String,
    label: "type of an event. Any object that extends event.",
    allowedValues: ["Awakening", "BedTime"]
  },

  timeStamp: {
    type: Date,
    label: "time stamp of a trackable event."
  }
});

Parents.attachSchema(ParentSchema);
Children.attachSchema(ChildSchema);

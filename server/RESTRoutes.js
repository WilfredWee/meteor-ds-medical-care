if(Meteor.isServer) {
  Restivus.addRoute('parents/username=:id', {authRequired: false}, {
    get: function () {
      var parents = Parents.find({username: this.urlParams.id}).fetch();
      if (parents.length > 0) {
        return {status: 'success', data: parents};
      }
      return {
        statusCode: 404,
        body: {status: 'fail', message: 'No parents with that username found'}
      };
    }
  });

  Restivus.addRoute('superparents/:id', {authRequired: false}, {
    get: function () {
      var parent = Parents.findOne(this.urlParams.id);

      if(parent) {
        var children = Children.find({parentId: parent._id}).fetch();

        parent.children = _.map(children, function(child) {
          if(!child) {
            return child;
          }

          var trackables = Trackables.find({childId: child._id}).fetch();

          child.trackables = _.map(trackables, function(trackable) {
            if(!trackable) {
              return trackable;
            }
            var problem = Problems.find(trackable.problemId).fetch();
            var events = Events.find({trackableId: trackable._id}).fetch();

            trackable.problem = problem;
            trackable.events = events;

            return trackable;
          });

          return child;
        });

        return {status: 'success', data: parent};
      }

      return {
        statusCode: 404,
        body: {status: 'fail', message: 'No parents with that username found'}
      };
    }
  });
}

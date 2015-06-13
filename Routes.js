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

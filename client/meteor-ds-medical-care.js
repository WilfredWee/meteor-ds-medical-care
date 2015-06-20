Meteor.startup(function(){
  if(Meteor.isClient) {
    $('#editChildModal').on('shown.bs.modal', function () {
    $('#first-name').focus();
    });
    $('#loginModal').on('shown.bs.modal', function () {
    $('#username').focus();
    });
    $("input[type='image']").click(function() {
      $("input[id='upload-file']").click();
    });

    $("#upload-file").change(function(){
      readURL(this);
    });

    Session.setDefault("profileImage", "/child-profile-default.jpg");
  }
});

if (Meteor.isClient) {
  Template.profiles.helpers({
    parents: function(){
      return Parents.find().fetch();
    },

    children: function(){
      return Children.find().fetch();
    }
  });

  Template.login.events({
    'click #submitLogin': function(event){
      event.preventDefault();
      window.location.href = "/profiles";
      // Router.go("/profiles");
    }
  });

  Template.addprofile.events({
    'click #submit': function(event){
      event.preventDefault();
      var firstName = $('#first-name').val();
      var lastName = $('#last-name').val();
      var dob = $('#date-of-birth').val();
      var gender = $('#gender').val();

      var child = {
        firstName: firstName,
        lastName: lastName,
        dob: new Date(dob),
        gender: gender,
        parentId: 'MWW4XDpWStRXGkRef',
        bedTime: 1400
      };

      if($('#yesSleepingProblem').is(':checked')){
        var problems = Session.get("problems");
        var sleep_time = $('#bedTime').val();
        var notify_time = $('#notifyTime').val() * 60 + sleep_time;
        var frequency = $('#frequency').val() * 60;

        var addedProblemIds = [];
        if(problems && problems.length > 0) {
          _.each(problems, function(problem) {
            var addedProblemId = Problems.insert(problem);

            addedProblemIds.push(addedProblemId);
          });
        }

        child.bedTime = sleep_time;

        var addedChild = Children.insert(child);

        if(addedProblemIds.length > 0) {
          _.each(addedProblemIds, function(problemId) {
            var trackable = {
              notifyAt: notify_time,
              promptInterval: 100,
              childId: addedChild,
              problemId: problemId,
              isProblemForChild: true
            };

            var addedTrackable = Trackables.insert(trackable);
          });
        }
      }

      var addedChild = Children.insert(child);

      document.getElementById('add-child-form').reset();
      $('#editChildModal').modal('hide');
    }
  });

  Template.sleepingProblem.events({
  // If the child has a sleeping problem, we will
  // construct a problem and trackable object and
  // later send it to the server.

  'click #sleepingProblemRadioGroup': function(event) {
    if($('#yesSleepingProblem').is(':checked')){
        Session.set("yesSelected", true);
      }
      else{
        Session.set("yesSelected", false);
      }
    }
  });

  Template.addprofile.helpers({
  yesSelected: function(){
    return Session.get("yesSelected");
  }
  });

  Template.child.events({
    'click #btneditdata': function(event){
      event.preventDefault();
      // var parent = $(event.target).closest('.row');
      // var child_id = parent.find('#child_id').text();
      // Children.update({_id: child_id}, {$set: {firstName: "Roberta"}});
    },

    "click #btn-visual-overview": function(event) {
      event.preventDefault();
      Router.go("visual");
    }
  });

  Template.child.helpers({
    getId: function() {
      var id = this._id;
      var location = "http://104.131.137.34/api/picture/?id=" + id;

      var img = $("<img />");
      var img2 = img.attr("src", location)
        .attr("class", "img-responsive img-center img-circle profile-picture")
        .load(function() {
           if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
              img2.attr("src", "/child-profile-default.jpg");
              $("#" + id).append(img2);
            } else {
                $("#" + id).append(img2);
            }
        })
        .error(function() {
          img2.attr("src", "/child-profile-default.jpg");
          $("#" + id).append(img2);
        });

      return id;
    },

    imageLocation: function() {
      var id = this._id;
      var location = "http://104.131.137.34/api/picture/?id=" + id;

      $.ajax ({
        url : location
      }).done(function() {
        Session.set("profileImage", location);
      })
      .fail(function() {
        Session.set("profileImage", "/child-profile-default.jpg");
      });

      return Session.get("profileImage");
    },

    getDob: function() {
      var dob = this.dob;

      return dob.getUTCFullYear() + "-" + dob.getUTCMonth() + "-" + dob.getUTCDate();
    },

    getParentName: function() {
      var parentId = this.parentId;

      var parent = Parents.findOne({_id: parentId});

      return parent.username;

    },

    getBedTime: function() {
      var bedTimeString;
      var bedTime = this.bedTime;
      var ampm;

      if(bedTime >= 12 * 60) {
        ampm = "pm";
        bedTime -= (12*60)
      }
      else {
        ampm = "am";
      }

      if(bedTime < 60) {
        bedTimeString = "12:" + bedTime.toString + ampm;
      }
      else {
        var hour = Math.floor(bedTime / 60);
        var minutes = bedTime % 60;
        if(minutes < 10) {
          minutes = "0" + minutes.toString();
        }
        bedTimeString = hour + ":" + minutes + ampm;
      }

      return bedTimeString;
    }
  });
}

function readURL(input) {
  if(input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#added-photo').attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
  }
}

// var $radioButtons = $('input:radio');

// function isRadioChecked(radioButtons){
//   var radioChecked = false;
//   $radioButtons.each(function(){
//     if(this.checked){
//       radioChecked = true;

//       return false;
//     }
//   });
//   return radioChecked;
// }

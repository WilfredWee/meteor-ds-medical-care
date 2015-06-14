Meteor.startup(function(){
  $('#editChildModal').on('shown.bs.modal', function () {
  $('#first-name').focus()
  })
  $("input[type='image']").click(function() {
    $("input[id='upload-file']").click();
  });

  $("#upload-file").change(function(){
    readURL(this);
  });
})

  function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#added-photo').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
  }

if (Meteor.isClient) {
  Template.profiles.helpers({
    parents: function(){
      return Parents.find().fetch();
    },

    children: function(){
      return Children.find().fetch();
    }
  })

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
        dob: dob,
        gender: gender,
        parentId: 'MWW4XDpWStRXGkRef',
        bedTime: 1400
      }

      Children.insert(child);

      document.getElementById('add-child-form').reset();
      $('#editChildModal').modal('hide');
    }
  })

  Template.child.events({
    'click #btneditdata': function(event){
      event.preventDefault();
      var parent = $(event.target).closest('.row');
      var child_id = parent.find('#child_id').text();
      Children.update({_id: child_id}, {$set: {firstName: "Roberta"}});
    }
  })
}
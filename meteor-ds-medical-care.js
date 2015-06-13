if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  
  Template.chart.rendered = function() {
    chart = {
        target: 'chart_div',
        type: 'LineChart',
        columns: [
            ['string', 'Topping'],
            ['number', 'Slices']
        ],
        rows: [
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
        ],
        options: {
            'title': 'How Much Pizza I Ate Last Night',
            'width': 400,
            'height': 300
        }
    };
    drawChart(chart);
}
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

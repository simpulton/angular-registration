angular.module('Register', ['ngMaterial'])
.controller('RegisterController', function(AttendeeService, $mdDialog) {
    var register = this;

    // Attendees
    register.newAttendee = {};
    register.newAttendee.subscribe = false;

    var getAttendees = function() {
      register.attendees = AttendeeService.all()
    };

    register.addAttendee = function(attendee) {
      AttendeeService.add(attendee);
    };
    register.removeAttendee = function(id) {
      AttendeeService.delete(id);
    };

    getAttendees();

    register.showConfirm = function(ev, data, action, id) {
      var templates = {
        attendee: {
          copy: $mdDialog.confirm().title('Are you sure you want to delete attendee ' + data.firstName + ' ' + data.lastName + '?').ariaLabel('Delete Attendee??').ok('Yes').cancel('No').targetEvent(ev),
          action: function() {register.removeAttendee(id)}
        }
      };

      $mdDialog.show(templates[action].copy).then(function() {templates[action].action(id)}, function() {return false;});
    };
})
.service('AttendeeService', function() {
    var attendees = [
      {firstName: 'John', lastName:'Doe'},
      {firstName: 'James', lastName:'Monroe'},
      {firstName: 'Oliver', lastName:'Twist'},
      {firstName: 'Sally', lastName:'McDuffy'},
      {firstName: 'Gollum', lastName:'Weirdermeister'},
      {firstName: 'Wild', lastName:'Style'},
      {firstName: 'Vetruvius', lastName:'the Great'},
      {firstName: 'Lucy', lastName:'Scholtz'}
    ];

    this.all = function() {return attendees;};

    this.add = function(attendee) {attendees.push(attendee);};

    this.delete = function(id) {attendees.splice(id,1)};
  });
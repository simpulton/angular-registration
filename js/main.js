angular.module('Register', ['ngMessages'])
.controller('RegisterController', function(AttendeeService) {
    var register = this;

    // Attendees
    register.newAttendee = {};
    register.newAttendee.subscribed = false;

    var getAttendees = function() {
      register.attendees = AttendeeService.all()
    };

    register.addAttendee = function(attendee) {
      AttendeeService.add(attendee);
      clearForm();
    };
    register.removeAttendee = function(id) {
      AttendeeService.delete(id);
    };

    var clearForm = function() {
      register.newAttendee = {};
    };

    getAttendees();
})
.service('AttendeeService', function() {
    var attendees = [
      {firstName: 'John', lastName:'Doe', email:"john.doe@example.com", subscribed: true},
      {firstName: 'James', lastName:'Monroe', email:"jmonroe@example.com", subscribed: false},
      {firstName: 'Oliver', lastName:'Twist', email:"twisted@example.com", subscribed: true},
      {firstName: 'Sally', lastName:'McDuffy', email:"duff-duff@example.com", subscribed: true},
      {firstName: 'Gollum', lastName:'Weirdermeister', email:"precious@example.com", subscribed: false},
      {firstName: 'Wild', lastName:'Style', email:"specialist@example.com", subscribed: true},
      {firstName: 'Vetruvius', lastName:'the Great', email:"morgan@example.com", subscribed: false},
      {firstName: 'Lucy', lastName:'Scholtz', email:"odyssey_times@example.com", subscribed: false}
    ];

    this.all = function() {return attendees;};

    this.add = function(attendee) {attendees.push(attendee);};

    this.delete = function(id) {attendees.splice(id,1);};
  });
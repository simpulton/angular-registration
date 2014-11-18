angular.module('Register', ['ngMaterial'])
.controller('RegisterController', function(AttendeeService, CouponService, $mdDialog) {
    var register = this;

    // Attendees
    var getAttendees = function() {
      register.attendees = AttendeeService.all()
    };

    register.addAttendee = function(attendee) {
      AttendeeService.add(attendee);
    };
    register.removeAttendee = function(id) {
      AttendeeService.delete(id);
    };
    // Coupons
    var getCoupons = function() {
      register.coupons = CouponService.all();
    };

    register.addCoupon = function(coupon) {
      CouponService.add(coupon);
      getCoupons();
    };

    register.removeCoupon = function(id) {
      CouponService.delete(id);
    };

    getCoupons();
    getAttendees();

    register.showConfirm = function(ev, data, action, id) {
      console.log(data,action,id)
      var templates = {
        coupon: {
          copy: $mdDialog.confirm().title('Are you sure you want to delete coupon ' + data.code + '?').ariaLabel('Delete Code?').ok('Yes').cancel('No').targetEvent(ev),
          action: function() {register.removeCoupon(id)}
        },
        attendee: {
          copy: $mdDialog.confirm().title('Are you sure you want to delete attendee ' + data.firstName + ' ' + data.lastName + '?').ariaLabel('Delete Attendee??').ok('Yes').cancel('No').targetEvent(ev),
          action: function() {register.removeAttendee(id)}
        }
      };

      $mdDialog.show(templates[action].copy).then(function() {templates[action].action(id)}, function() {return false;});
    };
})
.service('CouponService', function() {
   var coupons = [
     {code: 'asdfghjk', uses:5},
     {code: 'tf$a9801', uses:3},
     {code: '1ac%c1zx', uses:1},
     {code: '91ac#@1x', uses:2},
     {code: '65zctp12', uses:9},
     {code: 'mmbneoel', uses:10},
     {code: 'asdfwecz', uses:5},
     {code: 'asdfedgg', uses:8}
   ];

   this.all = function() {return coupons;};

   this.add = function(coupon) {coupons.push(coupon);};

   this.delete = function(id) {coupons.splice(id,1)};
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

    this.delete = function(id) {console.log(id); attendees.splice(id,1)};
  });
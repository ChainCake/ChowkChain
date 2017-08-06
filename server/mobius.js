Meteor.methods({
  req: function (url) {
    this.unblock();
    return Meteor.http.call("GET", url);
  }
});

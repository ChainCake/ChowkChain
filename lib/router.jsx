WelcomeComponent = React.createClass({
  render() {
    return <div>
    <h1>Hello, {this.props.name}</h1>
    </div>
  }
});

FlowRouter.route('/blog/:postId', {
  action: function(params, queryParams) {
    console.log("Yeah! We are on the post:", params.postId);
    ReactLayout.render(WelcomeComponent, {name: "Arunoda"})
  }
});


FlowRouter.route('/leaderboard', {
  action: function(params, queryParams) {
    ReactLayout.render(App);
  }
});


FlowRouter.route('/candidates', {
  action: function(params, queryParams) {
    ReactLayout.render(Candidates);
  }
});



FlowRouter.route('/employers', {
  action: function(params, queryParams) {
    ReactLayout.render(App);
  }
});


FlowRouter.route('/jobs', {
  action: function(params, queryParams) {
    ReactLayout.render(Jobs);
  }
});

FlowRouter.route('/jobcompletion', {
  action: function(params, queryParams) {
    ReactLayout.render(JobCompletion);
  }
});

FlowRouter.route('/', {
  action: function(params, queryParams) {
    ReactLayout.render(Chowk);
  }
});
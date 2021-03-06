
const {
  RaisedButton,
  Styles
} = mui;
const ThemeManager = Styles.ThemeManager;

const {
  List,
  ListItem,
  ListDivider,
  Avatar
} = mui;

const water = 'e259c518-5b38-4cf6-8dfd-9b646ff7f9b5';

Leaderboard4 = React.createClass({
  propTypes: {
    selectedPlayerId: React.PropTypes.string,
    players: React.PropTypes.array.isRequired,
    onPlayerSelected: React.PropTypes.func
  },
  selectPlayer(playerId) {
    this.props.onPlayerSelected(playerId);
  },
  render() {
    return (
      <List>
      {this.props.players.map((player) => {
        let style = {};

    if (this.props.selectedPlayerId === player._id) {
      style['backgroundColor'] = '#eee';
    }

    return [
      <ListItem key={player._id}
    primaryText={player.name}
    onClick={this.selectPlayer.bind(this, player._id)}
    leftAvatar={<Avatar src={player.image}/>}
    secondaryText={player.description}
    style={style}/>,
  <ListDivider/>
  ];
  })}
  </List>
  );
  }
});

JobCompletion = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function () {
    return {
      selectedPlayerId: null
    };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Styles.LightRawTheme)
    };
  },
  getMeteorData() {
    return {
      players: Coll.Jobs.find({}, { sort: { score: -1, name: 1}, limit: 1} ).fetch(),
      selectedPlayer: Coll.Jobs.findOne(this.state.selectedPlayerId)
    }
  },
  selectPlayer(playerId) {
    this.setState({
      selectedPlayerId: playerId
    });
  },
  addPointsToPlayer(playerId) {
    const app_uid='f0ad94fd-2f51-4328-82f6-bcf6096d289c';
    let url = 'https://mobius.network/api/v1/app_store/balance?api_key='+water+'&app_uid='+app_uid+'&email=alltheseletters@gmail.com'
    console.log('url ', url);
    Meteor.call("req", url, function(error, results) {
      console.log(results.content); //results.data should be a JSON object
      const balance = JSON.parse(results.content).num_credits;
      alert('Job is marked complete and payment sent! Your balance is ' + balance);
    });

    Coll.Jobs.update(playerId, {$inc: {score: 5}});
  },
  getBottomBar() {
    return this.state.selectedPlayerId
      ? (
      <div className="details">
        <div className="name">{this.data.selectedPlayer.name}</div>
    <div className="description">{this.data.selectedPlayer.description}</div>
    <p className="jobdetails">{this.data.selectedPlayer.details}</p>
    <RaisedButton
    onClick={this.addPointsToPlayer.bind(
      this, this.state.selectedPlayerId)}
    style={{float: "right"}}
    label="Mark complete"
    primary={true}/>
      </div>
  )
  : <div className="message">Click a job to select</div>;
  },
  render() {
    return (
      <div className="outer">
      <h1 className="title">Jobs in Progress</h1>
      <div className="subtitle">Select a job to mark progress</div>
    <Leaderboard4 players={this.data.players}
    selectedPlayerId={this.state.selectedPlayerId}
    onPlayerSelected={this.selectPlayer} />
    {this.getBottomBar()}
  </div>
  )
  }
});

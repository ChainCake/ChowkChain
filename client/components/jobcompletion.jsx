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
    Coll.Jobs.update(playerId, {$inc: {score: 5}});
    alert('Job is marked complete!');
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

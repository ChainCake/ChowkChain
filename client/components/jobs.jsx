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

Leaderboard2 = React.createClass({
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
    leftAvatar={<Avatar src={'/' + player.name + '.png'}/>}
    secondaryText={'Current score: ' + player.score}
    style={style}/>,
  <ListDivider/>
  ];
  })}
  </List>
  );
  }
});

Jobs = React.createClass({
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
      players: Coll.Players.find({}, { sort: { score: -1, name: 1 } }).fetch(),
      selectedPlayer: Coll.Players.findOne(this.state.selectedPlayerId)
    }
  },
  selectPlayer(playerId) {
    this.setState({
      selectedPlayerId: playerId
    });
  },
  addPointsToPlayer(playerId) {
    Coll.Players.update(playerId, {$inc: {score: 5}});
  },
  getBottomBar() {
    return this.state.selectedPlayerId
      ? (
      <div className="details">
        <div className="name">{this.data.selectedPlayer.name}</div>
    <RaisedButton
    onClick={this.addPointsToPlayer.bind(
      this, this.state.selectedPlayerId)}
    style={{float: "right"}}
    label="Add 5 points"
    primary={true}/>
      </div>
  )
  : <div className="message">Click a player to select</div>;
  },
  render() {
    return (
      <div className="outer">
      <h1 className="title">Jobs</h1>
      <div className="subtitle">Select a job to see details</div>
    <Leaderboard players={this.data.players}
    selectedPlayerId={this.state.selectedPlayerId}
    onPlayerSelected={this.selectPlayer} />
    {this.getBottomBar()}
  </div>
  )
  }
});

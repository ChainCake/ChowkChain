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

Chowk = React.createClass({
  render() {
    return (
      <div className="outer">
        <h1 className="title">Chain Chowk</h1>
        <div className="subtitle">Make a selection</div>
        <List>
          <ListItem key='jobs' primaryText={"Jobs"} onClick={()=>{FlowRouter.go('/jobs');}}/>
          <ListDivider/>
          <ListItem key='candidates' primaryText={"Candidates"} onClick={()=>{FlowRouter.go('/candidates');}}/>
          <ListDivider/>
          <ListItem key='postajob' primaryText={"Post a job"} />
        </List>
      </div>

  );
  }
});


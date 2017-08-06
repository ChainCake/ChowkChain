let Players = new Mongo.Collection('players');
let Candidates = new Mongo.Collection('candidates');
let Employers = new Mongo.Collection('employers');
let Jobs = new Mongo.Collection('jobs');
Coll = {
  Players,
  Candidates,
  Employers,
  Jobs
};

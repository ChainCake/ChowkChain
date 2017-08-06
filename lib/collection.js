let Players = new Mongo.Collection('players');
let Employees = new Mongo.Collection('employees');
let Employers = new Mongo.Collection('employers');
let Jobs = new Mongo.Collection('jobs');
Coll = {
  Players,
  Employees,
  Employers,
  Jobs
};

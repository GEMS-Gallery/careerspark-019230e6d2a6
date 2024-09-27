export const idlFactory = ({ IDL }) => {
  const Job = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Text,
    'company' : IDL.Text,
    'requirements' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'addJob' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text)],
        [IDL.Nat],
        [],
      ),
    'getAllJobs' : IDL.Func([], [IDL.Vec(Job)], ['query']),
    'getJob' : IDL.Func([IDL.Nat], [IDL.Opt(Job)], ['query']),
    'searchJobs' : IDL.Func([IDL.Text], [IDL.Vec(Job)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

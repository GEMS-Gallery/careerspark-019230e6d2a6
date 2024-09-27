import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor JobAssistant {
  // Define the Job type
  type Job = {
    id: Nat;
    title: Text;
    company: Text;
    description: Text;
    requirements: [Text];
  };

  // Store jobs in a stable variable
  stable var jobs: [Job] = [];
  stable var nextId: Nat = 0;

  // Add a new job
  public func addJob(title: Text, company: Text, description: Text, requirements: [Text]): async Nat {
    let id = nextId;
    nextId += 1;
    let newJob: Job = {
      id;
      title;
      company;
      description;
      requirements;
    };
    jobs := Array.append(jobs, [newJob]);
    id
  };

  // Get all jobs
  public query func getAllJobs(): async [Job] {
    jobs
  };

  // Get a specific job by ID
  public query func getJob(id: Nat): async ?Job {
    Array.find(jobs, func(job: Job): Bool { job.id == id })
  };

  // Search for jobs based on a keyword
  public query func searchJobs(keyword: Text): async [Job] {
    Array.filter(jobs, func(job: Job): Bool {
      Text.contains(Text.toLowercase(job.title), #text(Text.toLowercase(keyword))) or
      Text.contains(Text.toLowercase(job.company), #text(Text.toLowercase(keyword))) or
      Text.contains(Text.toLowercase(job.description), #text(Text.toLowercase(keyword))) or
      Option.isSome(Array.find(job.requirements, func(req: Text): Bool {
        Text.contains(Text.toLowercase(req), #text(Text.toLowercase(keyword)))
      }))
    })
  };
}

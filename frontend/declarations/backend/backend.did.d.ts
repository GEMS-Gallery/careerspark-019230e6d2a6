import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Job {
  'id' : bigint,
  'title' : string,
  'description' : string,
  'company' : string,
  'requirements' : Array<string>,
}
export interface _SERVICE {
  'addJob' : ActorMethod<[string, string, string, Array<string>], bigint>,
  'getAllJobs' : ActorMethod<[], Array<Job>>,
  'getJob' : ActorMethod<[bigint], [] | [Job]>,
  'searchJobs' : ActorMethod<[string], Array<Job>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

import type { UtbmsCode } from './types.js';

/**
 * Official UTBMS Activity Codes (A101 - A111)
 * Ref: Uniform Task-Based Management System standards.
 * Note: A client consultation call is strictly A106 (Communicate with client), not A104.
 */
export const UTBMS_ACTIVITY_CODES: UtbmsCode[] = [
  {
    code: 'A101',
    category: 'activity',
    name: 'Plan and prepare for',
    description: 'Planning and preparing for meetings, depositions, trials, hearings, etc.',
  },
  {
    code: 'A102',
    category: 'activity',
    name: 'Research',
    description: 'Legal, factual, or competitive research.',
  },
  {
    code: 'A103',
    category: 'activity',
    name: 'Draft/revise',
    description: 'Drafting and revising documents, pleadings, contracts, and correspondence.',
  },
  {
    code: 'A104',
    category: 'activity',
    name: 'Review/analyze',
    description: 'Reviewing and analyzing documents, transcripts, and records.',
  },
  {
    code: 'A105',
    category: 'activity',
    name: 'Communicate (in firm)',
    description: 'Conferences and communications with attorneys, paralegals, and staff in firm.',
  },
  {
    code: 'A106',
    category: 'activity',
    name: 'Communicate (with client)',
    description: 'Conferences and communications with client, including consultation calls and reporting.',
  },
  {
    code: 'A107',
    category: 'activity',
    name: 'Communicate (other outside counsel)',
    description: 'Conferences and communications with co-counsel, opposing counsel, etc.',
  },
  {
    code: 'A108',
    category: 'activity',
    name: 'Communicate (other external)',
    description: 'Conferences and communications with witnesses, experts, court staff, and third parties.',
  },
  {
    code: 'A109',
    category: 'activity',
    name: 'Appear for/attend',
    description: 'Court appearances, depositions, arbitrations, and external hearings.',
  },
  {
    code: 'A110',
    category: 'activity',
    name: 'Manage data/files',
    description: 'Managing electronic discovery, physical files, and record retention.',
  },
  {
    code: 'A111',
    category: 'activity',
    name: 'Other',
    description: 'Other activities not specifically classified.',
  },
];

/**
 * Standard Litigation Task Codes (L100 - L530)
 */
export const UTBMS_LITIGATION_CODES: UtbmsCode[] = [
  {
    code: 'L110',
    category: 'litigation_task',
    name: 'Fact investigation/development',
    description: 'Locating and interviewing witnesses, assembling factual exhibits.',
  },
  {
    code: 'L120',
    category: 'litigation_task',
    name: 'Analysis/strategy',
    description: 'Developing case theory, motion strategy, settlement evaluation.',
  },
  {
    code: 'L160',
    category: 'litigation_task',
    name: 'Settlement/non-binding ADR',
    description: 'Mediation, settlement negotiations, and ADR presentations.',
  },
  {
    code: 'L310',
    category: 'litigation_task',
    name: 'Written discovery',
    description: 'Interrogatories, requests for production, and requests for admission.',
  },
  {
    code: 'L330',
    category: 'litigation_task',
    name: 'Depositions',
    description: 'Preparing for, taking, and defending party and witness depositions.',
  },
  {
    code: 'L410',
    category: 'litigation_task',
    name: 'Fact witnesses',
    description: 'Preparing and examining non-party and party fact witnesses.',
  },
  {
    code: 'L450',
    category: 'litigation_task',
    name: 'Trial and hearing attendance',
    description: 'In-court trial, evidentiary hearing, or arbitral attendance.',
  },
];

export const ALL_UTBMS_CODES: UtbmsCode[] = [
  ...UTBMS_ACTIVITY_CODES,
  ...UTBMS_LITIGATION_CODES,
];

export function getUtbmsCode(code: string): UtbmsCode | undefined {
  return ALL_UTBMS_CODES.find((c) => c.code.toUpperCase() === code.toUpperCase());
}

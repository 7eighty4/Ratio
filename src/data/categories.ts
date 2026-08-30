import type { TopicCategory } from '../types';

export interface CategoryInfo {
  id: TopicCategory;
  title: string;
  shortLabel: string;
  description: string;
  color: string;
}

export const CATEGORIES: Record<TopicCategory, CategoryInfo> = {
  constitutional_law: {
    id: 'constitutional_law',
    title: 'Constitutional Law',
    shortLabel: 'Consti',
    description: 'Fundamental rights, doctrines, constitutional structure, and governance.',
    color: '#3B82F6'
  },
  jurisprudence: {
    id: 'jurisprudence',
    title: 'Jurisprudence & Theory',
    shortLabel: 'Theory',
    description: 'Schools of legal thought, philosophy, and concepts of justice.',
    color: '#8B5CF6'
  },
  cases: {
    id: 'cases',
    title: 'Important Indian Cases',
    shortLabel: 'Landmark Cases',
    description: 'Landmark Judgments of the Supreme Court and High Courts of India.',
    color: '#EC4899'
  },
  history: {
    id: 'history',
    title: 'Legal History',
    shortLabel: 'History',
    description: 'Colonial legislation, charters, and evolution of the Indian legal framework.',
    color: '#F59E0B'
  },
  statutes: {
    id: 'statutes',
    title: 'Statutes & Legislation',
    shortLabel: 'Statutes',
    description: 'Key Bare Acts, legislative drafting, and statutory provisions.',
    color: '#10B981'
  },
  maxims: {
    id: 'maxims',
    title: 'Legal Maxims',
    shortLabel: 'Maxims',
    description: 'Latin maxims and foundational principles of jurisprudence.',
    color: '#6366F1'
  },
  logical_fallacies: {
    id: 'logical_fallacies',
    title: 'Logical Fallacies',
    shortLabel: 'Fallacies',
    description: 'Flaws in argumentation, debate errors, and flawed logic in advocacy.',
    color: '#EF4444'
  },
  legal_reasoning: {
    id: 'legal_reasoning',
    title: 'Legal Reasoning',
    shortLabel: 'Reasoning',
    description: 'Analogical reasoning, statutory interpretation, and judicial logic.',
    color: '#14B8A6'
  },
  contracts: {
    id: 'contracts',
    title: 'Contract Law',
    shortLabel: 'Contracts',
    description: 'Formation, breach, remedies, and commercial obligations in law.',
    color: '#06B6D4'
  },
  crimes: {
    id: 'crimes',
    title: 'Criminal Law',
    shortLabel: 'Crimes',
    description: 'Penal jurisprudence, defenses, mens rea, and procedural fairness.',
    color: '#DC2626'
  },
  torts: {
    id: 'torts',
    title: 'Law of Torts',
    shortLabel: 'Torts',
    description: 'Civil wrongs, strict Liability, negligence, and compensation.',
    color: '#D97706'
  },
  property: {
    id: 'property',
    title: 'Property Law',
    shortLabel: 'Property',
    description: 'Ownership, transfer of property, trusts, and real rights.',
    color: '#059669'
  },
  admin_law: {
    id: 'admin_law',
    title: 'Administrative Law',
    shortLabel: 'Admin Law',
    description: 'Delegated legislation, natural justice, and judicial control of executive action.',
    color: '#7C3AED'
  },
  international_law: {
    id: 'international_law',
    title: 'International Law',
    shortLabel: 'Intl Law',
    description: 'Public international law, treaties, state sovereignty, and international courts.',
    color: '#2563EB'
  },
  human_rights: {
    id: 'human_rights',
    title: 'Human Rights',
    shortLabel: 'Human Rights',
    description: 'International conventions, fundamental freedoms, and PILs.',
    color: '#E11D48'
  },
  institutions: {
    id: 'institutions',
    title: 'Legal Institutions',
    shortLabel: 'Institutions',
    description: 'Structure of Courts, Tribunals, Law Commissions, and Legal Aid.',
    color: '#4B5563'
  },
  ethics: {
    id: 'ethics',
    title: 'Legal Ethics',
    shortLabel: 'Ethics',
    description: 'Professional responsibility, advocate duties, and contempt of court.',
    color: '#4F46E5'
  },
  mixed: {
    id: 'mixed',
    title: 'Mixed / Surprise',
    shortLabel: 'Surprise',
    description: 'Interdisciplinary legal topics, emerging questions, and surprise draws.',
    color: '#C86D51'
  }
};

export interface Experience {
  id: string;
  organization: string;
  role: string;
  period?: string;
  description: string;
  type: 'education' | 'experience';
}

export const experience: Experience[] = [
  {
    id: 'brac-university',
    organization: 'BRAC University',
    role: 'Computer Science & Engineering undergraduate',
    period: 'Currently studying',
    description: 'Building a foundation in computer science while exploring software development, AI, automation, and practical applications.',
    type: 'education',
  },
];

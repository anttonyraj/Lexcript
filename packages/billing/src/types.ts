export interface UtbmsCode {
  code: string;
  category: 'activity' | 'litigation_task' | 'counseling' | 'project' | 'bankruptcy';
  name: string;
  description: string;
}

export interface RoundingConfig {
  increment: number; // usually 0.1 (6 minutes)
  rule: 'up' | 'nearest';
  minimumHours: number; // e.g. 0.1 or 0.2
}

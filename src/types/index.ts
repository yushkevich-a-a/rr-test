export type TContact = {
  id: string; 
  createdAt: number;
  first?: string;
  last?: string;
  twitter?: string;
  avatar?: string;
  notes?: string;
  favorite? : boolean;
}
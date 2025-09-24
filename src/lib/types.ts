export interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  eligibility: string[];
  category: string;
  link: string;
  imageUrl: string;
  imageHint: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
}

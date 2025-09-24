import type { Scholarship, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || { imageUrl: '', imageHint: '' };

export const scholarships: Scholarship[] = [
  {
    id: '1',
    title: 'Future Leaders STEM Scholarship',
    description: 'A scholarship for promising high school seniors pursuing a degree in Science, Technology, Engineering, or Mathematics.',
    amount: 10000,
    deadline: '2024-12-15',
    eligibility: ['High School Senior', 'STEM Major'],
    category: 'Academic',
    link: '#',
    imageUrl: getImage('scholarship-1').imageUrl,
    imageHint: getImage('scholarship-1').imageHint,
  },
  {
    id: '2',
    title: 'Aspiring Athlete Grant',
    description: 'Financial support for student-athletes who have demonstrated exceptional skill and dedication in their sport.',
    amount: 5000,
    deadline: '2024-11-30',
    eligibility: ['Student-Athlete', 'All Levels'],
    category: 'Athletic',
    link: '#',
    imageUrl: getImage('scholarship-2').imageUrl,
    imageHint: getImage('scholarship-2').imageHint,
  },
  {
    id: '3',
    title: 'Creative Minds Art Fund',
    description: 'For talented artists in visual arts, design, or performing arts to help fund their creative projects and education.',
    amount: 7500,
    deadline: '2025-01-20',
    eligibility: ['Artist', 'Portfolio Required'],
    category: 'Arts',
    link: '#',
    imageUrl: getImage('scholarship-3').imageUrl,
    imageHint: getImage('scholarship-3').imageHint,
  },
   {
    id: '4',
    title: 'Community First Leadership Award',
    description: 'Recognizing students who have shown outstanding leadership and commitment to community service.',
    amount: 2500,
    deadline: '2025-02-28',
    eligibility: ['Undergraduate', 'Volunteer Experience'],
    category: 'Leadership',
    link: '#',
    imageUrl: getImage('scholarship-1').imageUrl,
    imageHint: getImage('scholarship-1').imageHint,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Write a Winning Scholarship Essay',
    author: 'Jane Doe',
    date: '2024-05-10',
    excerpt: 'Crafting the perfect essay is crucial. Here are our top tips to make your application stand out from the crowd.',
    content: 'Full blog post content goes here...',
    imageUrl: getImage('blog-1').imageUrl,
    imageHint: getImage('blog-1').imageHint,
  },
  {
    id: '2',
    title: 'Finding the Right Scholarship For You',
    author: 'John Smith',
    date: '2024-04-22',
    excerpt: 'Navigating the world of scholarships can be overwhelming. This guide will help you narrow down your options.',
    content: 'Full blog post content goes here...',
    imageUrl: getImage('blog-2').imageUrl,
    imageHint: getImage('blog-2').imageHint,
  },
];

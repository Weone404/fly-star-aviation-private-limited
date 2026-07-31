export const BLOG_POSTS = [
  {
    _id: '1',
    title: 'How to Become a Commercial Pilot in India – Complete 2026 Guide',
    excerpt: 'Everything you need to know about becoming a CPL holder in India.',
    category: 'CPL Guide',
    createdAt: 'Dec 15, 2026',
    coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    content:
      '<h2>What is a Commercial Pilot License (CPL)?</h2><p>A Commercial Pilot License (CPL) allows you to fly aircraft for compensation or hire. In India, the CPL is issued by the Directorate General of Civil Aviation (DGCA).</p><h2>Eligibility Requirements</h2><ul><li>Minimum age: 18 years</li><li>Educational qualification: 10+2 with Physics and Mathematics</li><li>Valid DGCA Class 1 Medical Certificate</li><li>Minimum 200 hours of total flight time</li></ul><h2>Conclusion</h2><p>Becoming a commercial pilot in India is a challenging but rewarding career path.</p>',
  },
  {
    _id: '2',
    title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips',
    excerpt: 'Ace all 9 DGCA written exams.',
    category: 'DGCA',
    createdAt: 'Dec 10, 2026',
    coverImage: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1200&q=80',
    content:
      '<h2>Overview</h2><p>To obtain a CPL in India, candidates must pass 9 written examinations conducted by the DGCA.</p>',
  },
  {
    _id: '3',
    title: 'CPL Training in India vs Abroad – Which is Better?',
    excerpt: 'Pros and cons of training in India vs USA, Canada, Australia. Cost comparison, timelines, and license conversion process explained.',
    category: 'Training',
    createdAt: 'Dec 5, 2026',
    coverImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    content: '',
  },
  {
    _id: '4',
    title: 'Pilot Salary in India 2026 – Complete Breakdown by Airline',
    excerpt: 'How much do pilots earn in India? Salary breakdown for trainee pilots, first officers, and captains at IndiGo, Air India, SpiceJet.',
    category: 'Career',
    createdAt: 'Nov 28, 2026',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    content: '',
  },
  {
    _id: '5',
    title: 'Medical Requirements to Become a Pilot – DGCA Class 1',
    excerpt: 'Detailed guide on DGCA Class 1 medical requirements, what conditions are disqualifying, and how to prepare for the medical exam.',
    category: 'Medical',
    createdAt: 'Nov 20, 2026',
    coverImage: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=800&q=80',
    content: '',
  },
  {
    _id: '6',
    title: 'How to Become a Pilot After 12th Science – Step-by-Step',
    excerpt: 'A complete roadmap for 12th PCM students aspiring to become commercial pilots. Colleges, entrance exams, fees, and timelines.',
    category: 'After 12th',
    createdAt: 'Nov 15, 2026',
    coverImage: 'https://images.unsplash.com/photo-1585995028913-16e7a4c9c1d3?w=800&q=80',
    content: '',
  },
];

export function getBlogPost(id) {
  return BLOG_POSTS.find((post) => post._id === id) || null;
}

export function getBlogRoutes() {
  return BLOG_POSTS.map((post) => `/blogs/${post._id}`);
}

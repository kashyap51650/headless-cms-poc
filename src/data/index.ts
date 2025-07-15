export const dummyEvents = [
  {
    id: "1",
    title: "React Conference 2025",
    slug: "react-conference-2025",
    date: "2025-08-15T09:00:00Z",
    description: "Join us for the biggest React conference of the year!",
    banner:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    isPublished: true,
    organizer: {
      id: "1",
      name: "Tech Events Inc",
      email: "contact@techevents.com",
    },
    categories: [
      { id: "1", title: "Technology", slug: "technology" },
      { id: "2", title: "Web Development", slug: "web-development" },
    ],
    speakers: [
      { id: "1", name: "John Doe", bio: "React core team member" },
      { id: "2", name: "Jane Smith", bio: "Frontend architect" },
    ],
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "AI & Machine Learning Summit",
    slug: "ai-ml-summit-2025",
    date: "2025-09-20T10:00:00Z",
    description: "Explore the future of AI and machine learning.",
    banner:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    isPublished: true,
    organizer: {
      id: "2",
      name: "AI Research Lab",
      email: "info@airesearch.org",
    },
    categories: [
      { id: "1", title: "Technology", slug: "technology" },
      {
        id: "5",
        title: "Artificial Intelligence",
        slug: "artificial-intelligence",
      },
    ],
    speakers: [
      {
        id: "3",
        name: "Dr. Alice Johnson",
        bio: "AI researcher and professor",
      },
      { id: "4", name: "Bob Wilson", bio: "ML engineer at Tech Corp" },
    ],
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "Design Systems Workshop",
    slug: "design-systems-workshop",
    date: "2025-07-30T14:00:00Z",
    description: "Learn how to build scalable design systems.",
    banner:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop",
    isPublished: false,
    organizer: {
      id: "3",
      name: "Design Guild",
      email: "hello@designguild.com",
    },
    categories: [{ id: "3", title: "Design", slug: "design" }],
    speakers: [{ id: "5", name: "Sarah Kim", bio: "Design system specialist" }],
    createdAt: "2025-01-03T00:00:00Z",
    updatedAt: "2025-01-03T00:00:00Z",
  },
  {
    id: "4",
    title: "Next.js Global Meetup",
    slug: "nextjs-global-meetup",
    date: "2025-10-01T10:00:00Z",
    description: "The ultimate meetup for Next.js developers.",
    banner:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    isPublished: true,
    organizer: {
      id: "4",
      name: "Next Meetup Org",
      email: "team@nextmeetup.org",
    },
    categories: [
      { id: "2", title: "Web Development", slug: "web-development" },
    ],
    speakers: [{ id: "6", name: "Remy Sharp", bio: "JavaScript expert" }],
    createdAt: "2025-01-04T00:00:00Z",
    updatedAt: "2025-01-04T00:00:00Z",
  },
  {
    id: "5",
    title: "TypeScript Mastery Bootcamp",
    slug: "typescript-mastery-bootcamp",
    date: "2025-11-15T12:00:00Z",
    description: "Deep dive into advanced TypeScript concepts.",
    banner:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    isPublished: true,
    organizer: { id: "5", name: "TS Devs", email: "ts@devbootcamps.com" },
    categories: [{ id: "4", title: "Programming", slug: "programming" }],
    speakers: [
      { id: "7", name: "Dan Vanderkam", bio: "Author of Effective TypeScript" },
    ],
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: "6",
    title: "Figma to Code Conference",
    slug: "figma-to-code-conference",
    date: "2025-12-05T11:00:00Z",
    description: "Bridge design and development workflows.",
    banner:
      "https://images.unsplash.com/photo-1603575448364-9333f3f9d598?w=800&h=400&fit=crop",
    isPublished: false,
    organizer: { id: "6", name: "Design2Dev", email: "hello@design2dev.com" },
    categories: [
      { id: "3", title: "Design", slug: "design" },
      { id: "2", title: "Web Development", slug: "web-development" },
    ],
    speakers: [{ id: "8", name: "Emily Zhang", bio: "Design systems lead" }],
    createdAt: "2025-01-06T00:00:00Z",
    updatedAt: "2025-01-06T00:00:00Z",
  },
  {
    id: "7",
    title: "The JAMstack Future",
    slug: "jamstack-future",
    date: "2025-08-25T13:00:00Z",
    description: "Discuss modern architecture with JAMstack experts.",
    banner:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    isPublished: true,
    organizer: { id: "7", name: "WebConf Org", email: "info@webconf.com" },
    categories: [
      { id: "2", title: "Web Development", slug: "web-development" },
    ],
    speakers: [{ id: "9", name: "Matt Biilmann", bio: "CEO of Netlify" }],
    createdAt: "2025-01-07T00:00:00Z",
    updatedAt: "2025-01-07T00:00:00Z",
  },
  {
    id: "8",
    title: "Node.js Backend Intensive",
    slug: "nodejs-backend-intensive",
    date: "2025-09-10T10:00:00Z",
    description: "Master building scalable APIs with Node.js.",
    banner:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&h=400&fit=crop",
    isPublished: false,
    organizer: {
      id: "8",
      name: "Backend Academy",
      email: "contact@backend.io",
    },
    categories: [
      { id: "4", title: "Programming", slug: "programming" },
      { id: "6", title: "Backend", slug: "backend" },
    ],
    speakers: [
      { id: "10", name: "TJ Holowaychuk", bio: "Open-source contributor" },
    ],
    createdAt: "2025-01-08T00:00:00Z",
    updatedAt: "2025-01-08T00:00:00Z",
  },
  {
    id: "9",
    title: "Modern CSS Summit",
    slug: "modern-css-summit",
    date: "2025-11-01T16:00:00Z",
    description: "CSS tricks, layout systems, and modern workflows.",
    banner:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=800&h=400&fit=crop",
    isPublished: true,
    organizer: { id: "9", name: "CSS Masters", email: "info@cssmasters.dev" },
    categories: [{ id: "7", title: "CSS", slug: "css" }],
    speakers: [{ id: "11", name: "Una Kravets", bio: "Google Dev Advocate" }],
    createdAt: "2025-01-09T00:00:00Z",
    updatedAt: "2025-01-09T00:00:00Z",
  },
  {
    id: "10",
    title: "GraphQL Developer Day",
    slug: "graphql-developer-day",
    date: "2025-10-10T15:00:00Z",
    description: "Hands-on GraphQL and API design best practices.",
    banner:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    isPublished: true,
    organizer: {
      id: "10",
      name: "API Engineers Guild",
      email: "graphql@apiguild.org",
    },
    categories: [
      { id: "1", title: "Technology", slug: "technology" },
      { id: "6", title: "Backend", slug: "backend" },
    ],
    speakers: [{ id: "12", name: "Lee Byron", bio: "Co-creator of GraphQL" }],
    createdAt: "2025-01-10T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "11",
    title: "Frontend Performance Camp",
    slug: "frontend-performance-camp",
    date: "2025-09-01T09:30:00Z",
    description: "Best practices for optimizing frontend performance.",
    banner:
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&h=400&fit=crop",
    isPublished: true,
    organizer: {
      id: "11",
      name: "Speedy Sites",
      email: "support@speedysites.dev",
    },
    categories: [
      { id: "2", title: "Web Development", slug: "web-development" },
    ],
    speakers: [
      { id: "13", name: "Addy Osmani", bio: "Google performance engineer" },
    ],
    createdAt: "2025-01-11T00:00:00Z",
    updatedAt: "2025-01-11T00:00:00Z",
  },
  {
    id: "12",
    title: "Content Modeling Workshop",
    slug: "content-modeling-workshop",
    date: "2025-08-18T14:00:00Z",
    description: "Learn the art of structuring content for scalability.",
    banner:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    isPublished: true,
    organizer: {
      id: "12",
      name: "Contentful Experts",
      email: "team@contentfulworkshop.dev",
    },
    categories: [{ id: "8", title: "CMS", slug: "cms" }],
    speakers: [
      { id: "14", name: "Kashyap Patel", bio: "Content modeling expert" },
    ],
    createdAt: "2025-01-12T00:00:00Z",
    updatedAt: "2025-01-12T00:00:00Z",
  },
];

export const categoryList = [
  { id: "1", title: "Technology", slug: "technology" },
  { id: "2", title: "Web Development", slug: "web-development" },
  { id: "3", title: "Design", slug: "design" },
  { id: "4", title: "Programming", slug: "programming" },
  {
    id: "5",
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
  },
  { id: "6", title: "Backend", slug: "backend" },
  { id: "7", title: "CSS", slug: "css" },
  { id: "8", title: "CMS", slug: "cms" },
];

export const organizerList = [
  { id: "1", name: "Tech Events Inc", email: "contact@techevents.com" },
  { id: "2", name: "AI Research Lab", email: "info@airesearch.org" },
  { id: "3", name: "Design Guild", email: "hello@designguild.com" },
  { id: "4", name: "Next Meetup Org", email: "team@nextmeetup.org" },
  { id: "5", name: "TS Devs", email: "ts@devbootcamps.com" },
  { id: "6", name: "Design2Dev", email: "hello@design2dev.com" },
  { id: "7", name: "WebConf Org", email: "info@webconf.com" },
  { id: "8", name: "Backend Academy", email: "contact@backend.io" },
  { id: "9", name: "CSS Masters", email: "info@cssmasters.dev" },
  { id: "10", name: "API Engineers Guild", email: "graphql@apiguild.org" },
  { id: "11", name: "Speedy Sites", email: "support@speedysites.dev" },
  {
    id: "12",
    name: "Contentful Experts",
    email: "team@contentfulworkshop.dev",
  },
];

export const speakerList = [
  { id: "1", name: "John Doe", bio: "React core team member" },
  { id: "2", name: "Jane Smith", bio: "Frontend architect" },
  { id: "3", name: "Dr. Alice Johnson", bio: "AI researcher and professor" },
  { id: "4", name: "Bob Wilson", bio: "ML engineer at Tech Corp" },
  { id: "5", name: "Sarah Kim", bio: "Design system specialist" },
  { id: "6", name: "Remy Sharp", bio: "JavaScript expert" },
  { id: "7", name: "Dan Vanderkam", bio: "Author of Effective TypeScript" },
  { id: "8", name: "Emily Zhang", bio: "Design systems lead" },
  { id: "9", name: "Matt Biilmann", bio: "CEO of Netlify" },
  { id: "10", name: "TJ Holowaychuk", bio: "Open-source contributor" },
  { id: "11", name: "Una Kravets", bio: "Google Dev Advocate" },
  { id: "12", name: "Lee Byron", bio: "Co-creator of GraphQL" },
  { id: "13", name: "Addy Osmani", bio: "Google performance engineer" },
  { id: "14", name: "Kashyap Patel", bio: "Content modeling expert" },
];

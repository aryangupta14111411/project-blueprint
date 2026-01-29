import { Deal, DealCategory } from '@/types';

export const categoryLabels: Record<DealCategory, string> = {
  'cloud': 'Cloud Services',
  'marketing': 'Marketing',
  'analytics': 'Analytics',
  'productivity': 'Productivity',
  'design': 'Design',
  'developer-tools': 'Developer Tools',
  'communication': 'Communication',
  'finance': 'Finance',
};

export const categoryIcons: Record<DealCategory, string> = {
  'cloud': '☁️',
  'marketing': '📣',
  'analytics': '📊',
  'productivity': '⚡',
  'design': '🎨',
  'developer-tools': '🛠️',
  'communication': '💬',
  'finance': '💰',
};

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'AWS Activate',
    description: 'Get up to $100,000 in AWS credits for your startup. AWS Activate provides startups with low cost, easy-to-use infrastructure needed to scale and grow any size business. Build on a secure, scalable infrastructure with access to all AWS services.',
    shortDescription: 'Up to $100,000 in cloud credits for startups',
    partner: {
      name: 'Amazon Web Services',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png',
      website: 'https://aws.amazon.com',
    },
    category: 'cloud',
    discount: '$100,000 Credits',
    isLocked: true,
    eligibilityRules: [
      'Must be an early-stage startup (less than 10 years old)',
      'Must not have previously received AWS Activate credits',
      'Must be associated with a qualifying accelerator, incubator, or VC',
      'Annual revenue under $10M',
    ],
    claimInstructions: 'Apply through the AWS Activate portal with your startup verification documents.',
    totalClaims: 1234,
    maxClaims: 5000,
  },
  {
    id: '2',
    title: 'Notion for Startups',
    description: 'Get 6 months free of Notion Plus with unlimited AI features. Notion is the connected workspace where better, faster work happens. Write, plan, collaborate, and get organized — all in one place.',
    shortDescription: '6 months free of Notion Plus with unlimited AI',
    partner: {
      name: 'Notion',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
      website: 'https://notion.so',
    },
    category: 'productivity',
    discount: '6 Months Free',
    originalPrice: '$120/seat',
    isLocked: false,
    eligibilityRules: [
      'New Notion workspaces only',
      'Startup must be less than 2 years old',
      'Fewer than 50 employees',
    ],
    claimInstructions: 'Sign up with your startup email and apply through the partner portal.',
    totalClaims: 3456,
  },
  {
    id: '3',
    title: 'Stripe Atlas',
    description: 'Launch your startup with $5,000 in Stripe fee credits. Stripe Atlas helps you incorporate your company, open a business bank account, and start accepting payments in days instead of weeks.',
    shortDescription: '$5,000 in Stripe processing fee credits',
    partner: {
      name: 'Stripe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
      website: 'https://stripe.com',
    },
    category: 'finance',
    discount: '$5,000 Credits',
    isLocked: false,
    eligibilityRules: [
      'New Stripe accounts only',
      'Must incorporate through Stripe Atlas or be a new Stripe user',
    ],
    claimInstructions: 'Apply through Stripe Atlas and the credits will be automatically applied.',
    totalClaims: 892,
  },
  {
    id: '4',
    title: 'HubSpot for Startups',
    description: 'Get 90% off HubSpot software in year one, 50% off in year two, and 25% off ongoing. Access the full HubSpot CRM platform including marketing, sales, and customer service tools.',
    shortDescription: 'Up to 90% off HubSpot CRM platform',
    partner: {
      name: 'HubSpot',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HubSpot_Logo.svg/512px-HubSpot_Logo.svg.png',
      website: 'https://hubspot.com',
    },
    category: 'marketing',
    discount: '90% Off Year 1',
    originalPrice: '$800/mo',
    isLocked: true,
    eligibilityRules: [
      'Must be affiliated with an approved accelerator, incubator, or VC',
      'Raised under $2M in funding',
      'New HubSpot customers only',
    ],
    claimInstructions: 'Apply through HubSpot for Startups program with verification documents.',
    totalClaims: 567,
  },
  {
    id: '5',
    title: 'Mixpanel Startup Program',
    description: 'Get $50,000 in Mixpanel credits for the first year. Mixpanel helps you understand how users interact with your product through powerful, self-serve analytics.',
    shortDescription: '$50,000 in product analytics credits',
    partner: {
      name: 'Mixpanel',
      logo: 'https://cdn.worldvectorlogo.com/logos/mixpanel.svg',
      website: 'https://mixpanel.com',
    },
    category: 'analytics',
    discount: '$50,000 Credits',
    isLocked: true,
    eligibilityRules: [
      'Raised less than $8M in total funding',
      'Less than 5 years old',
      'Not currently a paying Mixpanel customer',
    ],
    claimInstructions: 'Apply through the Mixpanel Startup Program with company verification.',
    totalClaims: 234,
  },
  {
    id: '6',
    title: 'Figma for Startups',
    description: 'Get Figma Organization free for 2 years. Figma helps teams create, share, and test designs for websites, mobile apps, and more.',
    shortDescription: '2 years free of Figma Organization',
    partner: {
      name: 'Figma',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
      website: 'https://figma.com',
    },
    category: 'design',
    discount: '2 Years Free',
    originalPrice: '$45/editor/mo',
    isLocked: false,
    eligibilityRules: [
      'Series A or earlier stage',
      'Less than 50 employees',
      'New Figma customers only',
    ],
    claimInstructions: 'Apply through Figma for Startups and verify your company details.',
    totalClaims: 1678,
  },
  {
    id: '7',
    title: 'GitHub Enterprise',
    description: 'Get 20 seats of GitHub Enterprise free for the first year. GitHub Enterprise provides advanced security, compliance, and administrative features for your development teams.',
    shortDescription: '20 seats of GitHub Enterprise free for 1 year',
    partner: {
      name: 'GitHub',
      logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      website: 'https://github.com',
    },
    category: 'developer-tools',
    discount: '1 Year Free',
    originalPrice: '$21/user/mo',
    isLocked: false,
    eligibilityRules: [
      'Affiliated with a GitHub for Startups partner',
      'Series A or earlier',
      'New GitHub Enterprise customers',
    ],
    claimInstructions: 'Apply through GitHub for Startups program portal.',
    totalClaims: 445,
  },
  {
    id: '8',
    title: 'Slack Pro',
    description: 'Get 25% off Slack Pro for the first year. Slack brings all your team communication together, giving everyone a shared workspace for real-time messaging, file sharing, and powerful integrations.',
    shortDescription: '25% off Slack Pro for your entire team',
    partner: {
      name: 'Slack',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
      website: 'https://slack.com',
    },
    category: 'communication',
    discount: '25% Off',
    originalPrice: '$8.75/user/mo',
    isLocked: false,
    eligibilityRules: [
      'Less than 50 employees',
      'New Slack paid customers only',
    ],
    claimInstructions: 'Use promo code STARTUPS25 at checkout.',
    totalClaims: 2341,
  },
  {
    id: '9',
    title: 'Google Cloud for Startups',
    description: 'Access up to $200,000 in Google Cloud credits over 2 years. Build on the same infrastructure that powers Google, with access to AI/ML tools, data analytics, and more.',
    shortDescription: 'Up to $200,000 in Google Cloud credits',
    partner: {
      name: 'Google Cloud',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',
      website: 'https://cloud.google.com',
    },
    category: 'cloud',
    discount: '$200,000 Credits',
    isLocked: true,
    eligibilityRules: [
      'Affiliated with a partner VC, accelerator, or incubator',
      'Raised Series A or earlier funding',
      'New Google Cloud customers',
      'Not currently on a Google Cloud contract',
    ],
    claimInstructions: 'Apply through Google for Startups Cloud Program with verification.',
    totalClaims: 987,
    maxClaims: 2000,
  },
  {
    id: '10',
    title: 'Intercom Early Stage',
    description: 'Get 95% off Intercom for the first year. Intercom is the complete AI-first customer service solution that gives instant answers to customers, maximizes support team efficiency, and helps agents.'
,
    shortDescription: '95% off Intercom customer messaging platform',
    partner: {
      name: 'Intercom',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Intercom_%28company%29_logo.svg',
      website: 'https://intercom.com',
    },
    category: 'communication',
    discount: '95% Off Year 1',
    originalPrice: '$74/mo',
    isLocked: true,
    eligibilityRules: [
      'Raised less than $1M in funding',
      'Less than 5 employees',
      'New Intercom customers only',
    ],
    claimInstructions: 'Apply through Intercom Early Stage program with company verification.',
    totalClaims: 123,
  },
  {
    id: '11',
    title: 'MongoDB Atlas',
    description: 'Get $500 in MongoDB Atlas credits. MongoDB Atlas is a fully-managed cloud database service that handles all the complexity of deploying, managing, and healing your deployments.',
    shortDescription: '$500 in MongoDB Atlas cloud database credits',
    partner: {
      name: 'MongoDB',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg',
      website: 'https://mongodb.com',
    },
    category: 'developer-tools',
    discount: '$500 Credits',
    isLocked: false,
    eligibilityRules: [
      'New MongoDB Atlas users',
      'Startup with less than $5M in funding',
    ],
    claimInstructions: 'Sign up for MongoDB Atlas and apply the startup credit code.',
    totalClaims: 789,
  },
  {
    id: '12',
    title: 'Amplitude Startup Scholarship',
    description: 'Get $100,000 in Amplitude credits for the first year. Amplitude is the leading digital analytics platform that helps companies understand user behavior.',
    shortDescription: '$100,000 in product analytics credits',
    partner: {
      name: 'Amplitude',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Amplitude_logo.svg',
      website: 'https://amplitude.com',
    },
    category: 'analytics',
    discount: '$100,000 Credits',
    isLocked: true,
    eligibilityRules: [
      'Raised less than $5M in total funding',
      'Affiliated with a partner accelerator or VC',
      'New Amplitude customers',
    ],
    claimInstructions: 'Apply through the Amplitude Startup Scholarship program.',
    totalClaims: 156,
  },
];

export const getDealById = (id: string): Deal | undefined => {
  return mockDeals.find(deal => deal.id === id);
};

export const filterDeals = (deals: Deal[], search: string, category: string, accessLevel: string): Deal[] => {
  return deals.filter(deal => {
    const matchesSearch = search === '' || 
      deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.description.toLowerCase().includes(search.toLowerCase()) ||
      deal.partner.name.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = category === 'all' || deal.category === category;
    
    const matchesAccess = accessLevel === 'all' ||
      (accessLevel === 'locked' && deal.isLocked) ||
      (accessLevel === 'unlocked' && !deal.isLocked);
    
    return matchesSearch && matchesCategory && matchesAccess;
  });
};

import type { LandingPageData } from './schemas/defaultLandingPage.schema';

export const exampleLandingData: LandingPageData = {
  hero: {
    title: 'Streamlined Communication for Iterating Fast',
    subtitle: 'Acme is an installable, self-hosted team chat system designed for modern teams that move fast and build great products.',
    backgroundImage: '', // Optional: URL to a background image
    ctaButtons: [
      {
        text: 'Request Demo',
        variant: 'secondary',
        url: '#demo'
      },
      {
        text: 'Get Started for Free',
        variant: 'primary',
        url: '#signup'
      }
    ]
  },
  
  features: {
    title: 'Powerful Features',
    subtitle: 'Everything you need to collaborate effectively',
    items: [
      {
        title: 'Real-time Messaging',
        description: 'Chat with your team instantly with our lightning-fast messaging system.',
        icon: 'fas fa-comment-dots'
      },
      {
        title: 'File Sharing',
        description: 'Share documents, images, and files of any type with your team members.',
        icon: 'fas fa-file-upload'
      },
      {
        title: 'Video Calls',
        description: 'Host high-quality video calls with screen sharing capabilities.',
        icon: 'fas fa-video'
      },
      {
        title: 'Task Management',
        description: 'Create, assign, and track tasks without leaving the conversation.',
        icon: 'fas fa-tasks'
      },
      {
        title: 'Integrations',
        description: 'Connect with your favorite tools like GitHub, Jira, and more.',
        icon: 'fas fa-plug'
      },
      {
        title: 'End-to-End Encryption',
        description: 'Your conversations are private and secure with enterprise-grade encryption.',
        icon: 'fas fa-lock'
      }
    ]
  },
  
  testimonials: {
    title: 'Trusted by Teams Worldwide',
    items: [
      {
        name: 'Alex Johnson',
        role: 'CTO at TechCorp',
        content: 'Acme has transformed how our remote team collaborates. The interface is intuitive and the features are exactly what we needed.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5
      },
      {
        name: 'Maria Garcia',
        role: 'Product Manager at InnovateCo',
        content: 'The task management features have been a game-changer for our product team. Highly recommended!',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5
      },
      {
        name: 'James Wilson',
        role: 'Lead Developer at DevHouse',
        content: 'The API is well-documented and the platform is incredibly stable. Our developers love it!',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        rating: 4
      }
    ]
  },
  
  finalCta: {
    title: 'Ready to transform your team communication?',
    description: 'Join thousands of teams that are already using Acme to work better together.',
    primaryButton: {
      text: 'Start Free Trial',
      variant: 'primary',
      url: '#signup'
    },
    secondaryButton: {
      text: 'Contact Sales',
      variant: 'outline',
      url: '#contact'
    }
  },
  
  theme: {
    primaryColor: '#4f46e5',
    secondaryColor: '#7c3aed',
    textColor: '#1f2937',
    backgroundColor: '#ffffff'
  }
};

import { Code, Users, Lightbulb, Rocket } from 'lucide-react';

export const features = [
  {
    id: 1,
    category: "For Students",
    title: "Accelerate your tech career while on campus.",
    description: "Join a community of passionate developers and designers. We bridge the gap between classroom theory and industry reality.",
    image: "/images/coding.jpg", 
    link: "/services", // <--- ADD THIS (Points to Services Page)
    points: [
      "Access exclusive coding bootcamps (Flutter, React, Python).",
      "Get paired with senior student mentors for project guidance.",
      "Participate in hackathons with real-world prizes."
    ],
    isReversed: false 
  },
  {
    id: 2,
    category: "For Partners & Sponsors", 
    title: "Connect with the next generation of tech talent.",
    description: "We partner with top tech companies to provide students with internships, talks, and exposure.",
    image: "/images/handshake.jpg",
    link: "/contact", // <--- ADD THIS (Points to Contact Page)
    points: [
      "Host workshops and tech talks at Daystar University.",
      "Recruit top talent directly from our project showcases.",
      "Sponsor hackathons and brand your company on campus."
    ],
    isReversed: true 
  }
];
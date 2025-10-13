// content/erp21.ts
export type ERP21Content = {
  about: {
    headline: string;
    body: string[];
    industries: string[];
    since: string;
    momLicence: string;
    erpVariants: string[];
  };
  services: string[];
  offices: {
    current: { country: string; address: string }[];
    comingSoon: string[];
  };
  vision: string[];
  mission: string[];
  peopleValues: string[];
  motto: { main: string; subtitle: string };
  keyStats: { label: string; value: string }[];
  seo: { title: string; description: string };
  leadership: {
    ceo: {
      name: string;
      title: string;
      highlight: string;
      bio: string[];
      quote: string;
      photo: {
        src: string;
        alt: string;
        width: number;
        height: number;
      };
    };
  };
};

const erp21: ERP21Content = {
  about: {
    headline: "About ERP21",
    body: [
      "Operating since 1999, ERP21 is a recruitment and consultancy partner specializing in SAP and adjacent enterprise solutions.",
      "We deliver contract outsourcing, permanent placement, employee hosting, and full project management delivery.",
      "Our recruiters are also ERP practitioners—so candidates and clients get practical, field-tested guidance.",
      "We provide SAP consultants for project implementation, training, and ongoing support.",
      "Since 2013, we have expanded into IT hardware/software, deskside support, desk administration, and creative media services."
    ],
    industries: ["Oil & Gas", "Aerospace", "Defence", "Logistics", "Public Sector"],
    since: "Operating since 1999",
    momLicence: "MOM Licence No. 16C7929",
    erpVariants: ["ERPi (backend systems)", "ERPii (extended ERP solutions)"]
  },
  services: [
    "SAP consultants recruitment (contract & permanent)",
    "Consulting & Implementation",
    "Training & Education",
    "IT Practitioners",
    "Testing & Integration",
    "Offshore Development",
    "AI-skilled practitioners"
  ],
  offices: {
    current: [
      { country: "Singapore", address: "1 Eastwood Drive, Singapore 486528" },
      { country: "Malaysia (Selangor)", address: "35-1, Jalan Suria Puchong 4, Pusat Perniagaan Suria Puchong, 47110 Puchong" },
      { country: "Malaysia (Melaka)", address: "74 Jalan Padi Mahsuri 2, Taman Noorbar, Bukit Serindit, Melaka 75400" }
    ],
    comingSoon: ["Indonesia", "Vietnam", "India"]
  },
  vision: [
    "Shape the future where individuals' aspirations can be fulfilled.",
    "Create new opportunities for consultants, partners, and customers.",
    "Be an honest, reliable, strategic SAP partner."
  ],
  mission: [
    "Be the preferred source of contract opportunities for SAP practitioners in SEA.",
    "Provide training and development opportunities for SAP professionals.",
    "Continuously upskill in industry solutions: Oil & Gas, Aerospace, Defence, Mining, Healthcare, Public Sector.",
    "Expand into AI, Machine Learning, Analytics, Application Support, BPR, and Cloud Computing."
  ],
  peopleValues: [
    "Professionalism",
    "Responsibility & integrity",
    "Innovation",
    "Dedication",
    "Honesty",
    "Source of knowledge"
  ],
  motto: {
    main: "…giving you tomorrow today…",
    subtitle: "ERP21 — Enterprise Resource Planning for the 21st Century"
  },
  keyStats: [
    { label: "Years in industry", value: "26" },
    { label: "Candidates placed", value: "1,800+" },
    { label: "Projects completed", value: "~23" },
    { label: "Total personnel strength", value: "100+" }
  ],
  seo: {
    title: "ERP21 — SAP Recruitment & Consultancy in SEA (Since 1999)",
    description:
      "ERP21 provides SAP recruitment (contract & permanent), project delivery, training, ODC, and AI-skilled practitioners across Oil & Gas, Aerospace, Defence, Mining, Healthcare, and Public Sector."
  },
  leadership: {
    ceo: {
      name: "Moh Alkaff",
      title: "Founder & CEO, ERP21",
      highlight: "First SAP-Asia employee to have worked in the SAP field.",
      bio: [
        "With 26+ years guiding SAP programs across Oil & Gas, Aerospace, Defence, Mining, and the Public Sector, Moh blends practitioner expertise with pragmatic leadership.",
        "He built ERP21's recruiter-practitioner model—ensuring every engagement is evaluated by people who have shipped real enterprise systems.",
        "Moh mentors SAP consultants across Southeast Asia, advocates continuous upskilling, and expands ERP21's footprint into AI, analytics, and cloud."
      ],
      quote: "Recruitment should be led by practitioners—because delivery demands it.",
      photo: {
        src: "/images/alkaffHeadshot.png",
        alt: "Portrait of Moh Alkaff, Founder & CEO of ERP21",
        width: 758,
        height: 758
      }
    }
  }
};

export default erp21;
// To add an episode, copy one object below, give it the next id, and fill it in.
// Leave audio as "" until the mp3 is in the audio folder.
const episodes = [
  {
    id: 1,
    title: "Free STEM programs you've never heard of",
    host: "Harini",
    minutes: 7,
    topic: "Opportunity",
    notes: [
      "Summer camps and weekend workshops that cost nothing to join.",
      "How to find STEM clubs and competitions at your own school.",
      "Why you don't need to be a \"math person\" to sign up."
    ],
    resourceCategories: ["STEM"],
    audio: "audio/episode-1.mp3"
  },
  {
    id: 2,
    title: "Freshman year: what I wish I knew",
    host: "Student panel",
    minutes: 8,
    topic: "Opportunity",
    notes: [
      "Older students share what surprised them most in ninth grade.",
      "Your school counselor is for more than just schedule changes.",
      "Asking for help early is easier than catching up later."
    ],
    resourceCategories: ["At school", "Tutoring"],
    audio: ""
  },
  {
    id: 3,
    title: "Scholarships start before senior year",
    host: "Harini",
    minutes: 6,
    topic: "Opportunity",
    notes: [
      "Some scholarships are open to freshmen and sophomores.",
      "Local awards often get fewer applicants than national ones.",
      "Start a simple list of your activities now to save time later."
    ],
    resourceCategories: ["Scholarships & jobs"],
    audio: ""
  },
  {
    id: 4,
    title: "Stress, grades and getting some sleep",
    host: "Student reporter",
    minutes: 7,
    topic: "Wellbeing",
    notes: [
      "Students talk honestly about stress during test season.",
      "Small sleep habits that actually helped them.",
      "When stress feels like too much, talk to a trusted adult."
    ],
    resourceCategories: ["Mental health", "At school"],
    audio: ""
  },
  {
    id: 5,
    title: "Free tutoring: where it actually is",
    host: "Harini",
    minutes: 5,
    topic: "Opportunity",
    notes: [
      "Free tutoring at school, at the library, and online.",
      "How to ask a teacher for extra help without feeling awkward.",
      "Online practice you can do at your own pace."
    ],
    resourceCategories: ["Tutoring"],
    audio: ""
  },
  {
    id: 6,
    title: "Feeling alone at a big school",
    host: "Student reporter",
    minutes: 8,
    topic: "Wellbeing",
    notes: [
      "Lots of students feel lonely, even in a crowded hallway.",
      "Clubs and activities are an easy way to meet people.",
      "Your school counselor can help you find a place to fit in."
    ],
    resourceCategories: ["Mental health", "At school"],
    audio: ""
  },
  {
    id: 7,
    title: "Bullying: what you can do",
    host: "Student panel",
    minutes: 7,
    topic: "Wellbeing",
    notes: [
      "What bullying can look like, in person and online.",
      "How to report it and who you can tell at school.",
      "How to support a friend who is being bullied."
    ],
    resourceCategories: ["Mental health", "At school"],
    audio: ""
  },
  {
    id: 8,
    title: "Jobs, volunteering and your first resume",
    host: "Harini",
    minutes: 6,
    topic: "Opportunity",
    notes: [
      "Places nearby that hire or take volunteers under 18.",
      "Volunteer hours count as real experience on a resume.",
      "A simple one-page resume you can start today."
    ],
    resourceCategories: ["Scholarships & jobs"],
    audio: ""
  }
];

// Items marked [confirm] need to be checked with the school counselor.
const resources = [
  {
    title: "988 Suicide & Crisis Lifeline",
    category: "Mental health",
    description: "Free, private support from a trained counselor any time, day or night.",
    howToGetIt: "Call or text 988, or chat at 988lifeline.org."
  },
  {
    title: "Crisis Text Line",
    category: "Mental health",
    description: "Free support by text message with a trained volunteer, 24/7.",
    howToGetIt: "Text HOME to 741741."
  },
  {
    title: "School counselor",
    category: "At school",
    description: "Help with stress, friendships, bullying, classes, and plans after high school.",
    howToGetIt: "Stop by the counseling office or ask a teacher to help you set up a time. [confirm office location and hours]"
  },
  {
    title: "Khan Academy",
    category: "Tutoring",
    description: "Free online lessons and practice for math, science, SAT prep, and more.",
    howToGetIt: "Sign up free at khanacademy.org. You can use a school Chromebook."
  },
  {
    title: "Iredell County Public Library",
    category: "Tutoring",
    description: "Free homework help, study rooms, computers, and teen programs. [confirm current programs]",
    howToGetIt: "Get a free library card at any branch in Iredell County. [confirm branches and hours]"
  },
  {
    title: "School STEM clubs",
    category: "STEM",
    description: "Robotics, science, coding, and math clubs that meet after school. [confirm club list]",
    howToGetIt: "Ask your science or math teacher, or check the school club list. [confirm]"
  },
  {
    title: "Local scholarship board",
    category: "Scholarships & jobs",
    description: "A list of local scholarships, some open to students before senior year. [confirm]",
    howToGetIt: "Ask the counseling office where the scholarship list is posted. [confirm]"
  },
  {
    title: "Volunteer opportunities",
    category: "Scholarships & jobs",
    description: "Local places that welcome teen volunteers, which is great for your resume. [confirm]",
    howToGetIt: "Ask your counselor or check with local nonprofits in Mooresville. [confirm]"
  }
];

const categories = ["All", "Mental health", "At school", "Tutoring", "STEM", "Scholarships & jobs"];

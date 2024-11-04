export const chats = [
    {
      id: 1,
      participants: [
        { userId: 'user001', name: 'User' },
        { userId: 'ai001', name: 'MindCare AI' },
      ],
      messages: [
        {
          messageId: 'm1',
          senderId: 'user001',
          text: 'I’ve been feeling really anxious lately.',
          timestamp: '2024-11-03T08:45:00Z',
        },
        {
          messageId: 'm2',
          senderId: 'ai001',
          text: 'I’m here to listen. Can you tell me a bit more about what’s causing the anxiety?',
          timestamp: '2024-11-03T08:46:00Z',
        },
        {
          messageId: 'm3',
          senderId: 'user001',
          text: 'It’s mostly work-related stress. I feel like there’s so much to handle.',
          timestamp: '2024-11-03T08:47:00Z',
        },
      ],
    },
    {
      id: 2,
      participants: [
        { userId: 'user001', name: 'User' },
        { userId: 'ai001', name: 'MindCare AI' },
      ],
      messages: [
        {
          messageId: 'm1',
          senderId: 'user001',
          text: 'I want to work on better sleep habits.',
          timestamp: '2024-11-02T21:00:00Z',
        },
        {
          messageId: 'm2',
          senderId: 'ai001',
          text: 'Good sleep is essential! Would you like some tips or routines to help with that?',
          timestamp: '2024-11-02T21:01:00Z',
        },
        {
          messageId: 'm3',
          senderId: 'user001',
          text: 'Yes, that would be really helpful.',
          timestamp: '2024-11-02T21:02:00Z',
        },
      ],
    },
    {
      id: 3,
      participants: [
        { userId: 'user001', name: 'User' },
        { userId: 'ai001', name: 'MindCare AI' },
      ],
      messages: [
        {
          messageId: 'm1',
          senderId: 'user001',
          text: 'How can I manage stress better?',
          timestamp: '2024-11-01T15:20:00Z',
        },
        {
          messageId: 'm2',
          senderId: 'ai001',
          text: 'Managing stress can be tough. Taking small breaks and practicing mindfulness can be helpful. Do you want to try some breathing exercises?',
          timestamp: '2024-11-01T15:21:00Z',
        },
        {
          messageId: 'm3',
          senderId: 'user001',
          text: 'Yes, I think that would be a good start.',
          timestamp: '2024-11-01T15:22:00Z',
        },
      ],
    },
  ];

export const moods = [
  { label: '😊 Happy', value: 'happy' },
  { label: '😔 Sad', value: 'sad' },
  { label: '😠 Angry', value: 'angry' },
  { label: '😨 Anxious', value: 'anxious' },
  { label: '😴 Tired', value: 'tired' },
  { label: '😟 Stressed', value: 'stressed' },
];
  
export const questions = [
  {
    id: 1,
    title: "Understanding Yourself",
    question: "How do you typically cope with stress, and what strategies have you found to be effective?"
  },
  {
    id: 2,
    title: "Emotional Check-In",
    question: "What emotions have you experienced most frequently in the past week, and how have they affected your daily life?"
  },
  {
    id: 3,
    title: "Support Systems",
    question: "Who do you turn to for support during difficult times, and how do they help you?"
  },
  {
    id: 4,
    title: "Mindfulness Practices",
    question: "What mindfulness or relaxation techniques do you practice, and how do they impact your mental health?"
  },
  {
    id: 5,
    title: "Personal Growth",
    question: "What personal goals do you have that focus on improving your mental health and well-being?"
  },
];

export const tabs = [
  { id: 1, title: 'Mood Tracker', icon: 'happy', navigation: 'Mood' },
  { id: 2, title: 'Meditation', icon: 'leaf', navigation: 'Mood' },
  { id: 3, title: 'Relationships', icon: 'heart', navigation: 'Mood' },
  { id: 4, title: 'Students', icon: 'book', navigation: 'Mood' },
  { id: 5, title: 'View All', icon: 'arrow-forward-outline', navigation: 'Mood' },
];

export const moodLog = [
  { 
    uid: "user001", 
    mood: "tired", 
    note: "", 
    timestamp: "2024-11-04T13:24:18.174Z" 
  },
  { 
    uid: "user001", 
    mood: "happy", 
    note: "Note", 
    timestamp: "2024-11-04T13:23:53.103Z" 
  },
  { 
    uid: "user002", 
    mood: "anxious", 
    note: "Feeling nervous about exams.", 
    timestamp: "2024-11-04T10:00:00.000Z" 
  },
  { 
    uid: "user003", 
    mood: "relaxed", 
    note: "Enjoyed a peaceful morning walk.", 
    timestamp: "2024-11-03T07:45:00.000Z" 
  },
  { 
    uid: "user001", 
    mood: "excited", 
    note: "Looking forward to the concert tonight!", 
    timestamp: "2024-11-02T18:30:00.000Z" 
  }
];
'use client';

import { useEffect, useMemo, useState } from 'react';
import Script from 'next/script';

const subjectsData = {
  7: ['Mathematics', 'General Science', 'English', 'Social Studies', 'Amharic', 'IT'],
  8: ['Mathematics', 'General Science', 'English', 'Social Studies', 'Amharic', 'IT'],
  9: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Geography'],
  10: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Geography'],
  11: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Geography', 'History', 'Economics'],
  12: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Geography', 'History', 'Economics'],
};

const subjectIcons = {
  Mathematics: '📐',
  Physics: '⚡',
  Chemistry: '🧪',
  Biology: '🧬',
  English: '📖',
  Geography: '🌍',
  History: '🏛️',
  Economics: '💰',
  'General Science': '🔬',
  'Social Studies': '👥',
  Amharic: 'አ',
  IT: '💻',
};

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#exams', label: 'Exam Prep' },
  { href: '#teachers', label: 'Teachers' },
];

const gradeButtons = [7, 8, 9, 10, 11, 12];

const featureList = [
  { icon: 'fas fa-check-circle', label: 'Ethiopian Curriculum' },
  { icon: 'fas fa-chalkboard', label: 'Live Classes' },
  { icon: 'fas fa-download', label: 'Offline Access' },
  { icon: 'fas fa-robot', label: 'AI-Powered Prep' },
  { icon: 'fas fa-mobile-alt', label: 'Low Data Mode' },
  { icon: 'fas fa-language', label: 'Amharic & English' },
];

const pricingCards = [
  {
    title: 'Monthly Plan',
    price: '499',
    unit: '/month',
    description: 'Perfect for exam preparation',
    highlights: [
      'All subjects for your grade',
      'Live classes (2x per subject/week)',
      'Recorded lessons library (500+ videos)',
      'Unit quizzes & assignments',
    ],
    buttonText: 'Start 3-Day Free Trial',
    style: 'glass-card',
  },
  {
    title: 'Term Plan',
    price: '1,299',
    unit: '/3 months',
    description: 'Best value for full semester',
    highlights: [
      'Everything in Monthly',
      'Full exam prep module (Grade 10/12)',
      'Past national exams (2005-2017 EC)',
      'AI-powered mock tests with grading',
      'Weekly progress reports',
    ],
    buttonText: 'Start 3-Day Free Trial',
    style: 'gradient-bg text-white',
    popular: true,
  },
  {
    title: 'Yearly Plan',
    price: '4,499',
    unit: '/year',
    description: 'Complete academic year access',
    highlights: [
      'Everything in Term Plan',
      'Save 30% compared to monthly',
      '1-on-1 tutoring sessions (2 per month)',
      'Certificate of completion',
      'Offline downloads for all lessons',
    ],
    buttonText: 'Start 3-Day Free Trial',
    style: 'glass-card',
  },
];

const teachers = [
  {
    name: 'Dr. Azeb Mekonnen',
    title: 'Mathematics Expert (PhD)',
    description: '15+ years teaching Grade 12 | Former national exam reviewer',
    icon: 'fas fa-user-graduate',
    rating: '4.9 (234 reviews)',
  },
  {
    name: 'Mr. Tekle Berhan',
    title: 'Physics Specialist (MSc)',
    description: 'National exam setter (2018-2022) | 20+ years experience',
    icon: 'fas fa-flask',
    rating: '4.8 (187 reviews)',
  },
  {
    name: 'Ms. Helen Tesfaye',
    title: 'English & Literature (MA)',
    description: 'Cambridge-certified | IELTS trainer | 12+ years',
    icon: 'fas fa-language',
    rating: '4.9 (156 reviews)',
  },
];

const stats = [
  { label: 'Active Students', target: 5847 },
  { label: 'Exam Pass Rate (%)', target: 98 },
  { label: 'Expert Teachers', target: 52 },
  { label: 'Video Lessons', target: 586 },
];

const getAIResponse = (question) => {
  const q = question.toLowerCase();

  if (q.includes('math') || q.includes('mathematics')) {
    return '📐 Mathematics is a key subject in the Ethiopian curriculum. Topics include Algebra, Geometry, Calculus, and Statistics. Would you like me to explain a specific topic?';
  }
  if (q.includes('exam') || q.includes('national exam')) {
    return '📝 For national exam preparation (Grade 10 & 12), we offer past papers (2005-2017 EC), AI-generated mock tests, and video solutions. Would you like to start a practice exam?';
  }
  if (q.includes('grade')) {
    return '🎓 We cover Grades 7-12 following the Ethiopian New Curriculum. Which grade are you interested in? I can tell you about the subjects available.';
  }
  if (q.includes('price') || q.includes('cost') || q.includes('payment')) {
    return '💰 Our plans: Monthly (499 ETB), Term (1,299 ETB/3 months), Yearly (4,499 ETB). We accept Telebirr and Chapa. Start with a 3-day free trial!';
  }
  if (q.includes('teacher') || q.includes('instructor')) {
    return '👨‍🏫 We have 50+ expert teachers including PhD holders and national exam setters. All are experienced with the Ethiopian curriculum.';
  }
  if (q.includes('amharic')) {
    return 'እንኳን ደህና መጡ! በአማርኛ እንዲሁም በእንግሊዝኛ መማር ይችላሉ። ማንኛውም ጥያቄ ካለዎት ለመጠየቅ አያመንቱ።';
  }
  return 'Thank you for your question! At Ethio Scholars, we provide complete Ethiopian curriculum (Grades 7-12), live classes, exam prep, and AI-powered learning. Is there a specific subject or topic you\'d like help with?';
};

export default function HomePage() {
  const [activeGrade, setActiveGrade] = useState(7);
  const [subjects, setSubjects] = useState(subjectsData[7]);
  const [modalOpen, setModalOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      from: 'bot',
      text: '👋 Selam! I\'m MegaW, your AI learning assistant. Ask me anything about:\n• Ethiopian curriculum (Grades 7-12)\n• National exam preparation\n• Subjects and topics\n• Study tips and resources',
    },
  ]);
  const [toasts, setToasts] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [counterValues, setCounterValues] = useState(stats.map(() => 0));

  useEffect(() => {
    setSubjects(subjectsData[activeGrade]);
  }, [activeGrade]);

  useEffect(() => {
    const welcomeId = window.setTimeout(() => {
      addToast('👋 Welcome to Ethio Scholars! Chat with MegaW AI for help.');
    }, 450);
    return () => window.clearTimeout(welcomeId);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const duration = 60;
    let frame = 0;
    const targets = stats.map((item) => item.target);

    const animate = () => {
      frame += 1;
      setCounterValues((prev) =>
        prev.map((value, index) =>
          Math.min(targets[index], Math.ceil((targets[index] * frame) / duration))
        )
      );
      if (frame <= duration) {
        window.requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  const addToast = (message) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleGradeClick = (grade) => {
    setActiveGrade(grade);
    addToast(`📚 Showing Grade ${grade} curriculum`);
  };

  const openModal = (name) => {
    setModalOpen(name);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(null);
    document.body.style.overflow = 'auto';
  };

  const switchModal = (name) => {
    setModalOpen(name);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    addToast('✅ Login successful! Redirecting to dashboard...');
    closeModal();
  };

  const handleSignup = (event) => {
    event.preventDefault();
    addToast('🎉 Free trial activated for 3 days!');
    closeModal();
  };

  const startExam = () => {
    addToast('🚀 Starting practice exam. Good luck!');
    closeModal();
  };

  const playDemoVideo = () => {
    addToast('🎬 Demo video preview. Full lessons available after signup!');
  };

  const toggleChatbot = () => {
    setChatOpen((current) => !current);
  };

  const sendMessage = () => {
    const message = chatInput.trim();
    if (!message) return;

    const nextMessages = [
      ...chatMessages,
      { from: 'user', text: message },
      { from: 'typing', text: '' },
    ];
    setChatMessages(nextMessages);
    setChatInput('');

    window.setTimeout(() => {
      setChatMessages((current) =>
        current
          .filter((item) => item.from !== 'typing')
          .concat({ from: 'bot', text: getAIResponse(message) })
      );
    }, 900);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAOSReady = () => {
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({ duration: 800, once: true });
    }
  };

  const subjectCards = useMemo(
    () =>
      subjects.map((subject) => (
        <div
          key={subject}
          className="glass-card rounded-xl p-6 card-hover cursor-pointer shadow-md"
          onClick={() => openModal('signup')}
        >
          <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-4 shadow-md float-element">
            <span className="text-white text-2xl">{subjectIcons[subject] || '📚'}</span>
          </div>
          <h3 className="text-xl font-bold mb-2">{subject}</h3>
          <p className="text-gray-600 text-sm mb-3">Complete {subject} curriculum for Grade {activeGrade}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ethio-green"><i className="fas fa-video mr-1"></i> 40+ lessons</span>
            <span className="text-yellow-600"><i className="fas fa-question-circle mr-1"></i> 10 quizzes</span>
            <span className="text-orange-600"><i className="fas fa-mobile-alt mr-1"></i> Low-data</span>
          </div>
        </div>
      )),
    [subjects, activeGrade]
  );

  return (
    <main>
      <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="lazyOnload" onLoad={handleAOSReady} />

      <div className="orb" style={{ width: 300, height: 300, background: '#1E824C', top: -100, left: -100 }} />
      <div className="orb" style={{ width: 200, height: 200, background: '#FAD201', bottom: -50, right: -50 }} />
      <div className="orb" style={{ width: 250, height: 250, background: '#EF2B2B', top: '50%', right: -100 }} />

      <nav className="glass-card sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => scrollToSection('home')}>
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 float-element">
                <span className="text-white font-bold text-xl">ኢሶአ</span>
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-ethio-green to-ethio-gold bg-clip-text text-transparent">
                  Ethio Scholars
                </span>
                <span className="text-xs text-gray-500 block -mt-1">Online Academy</span>
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-gray-700 hover:text-ethio-green transition font-medium relative group">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ethio-green transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex space-x-3">
              <button onClick={() => openModal('login')} className="px-5 py-2 text-ethio-green border-2 border-ethio-green rounded-lg hover:bg-green-50 transition font-semibold btn-glow">
                <i className="fas fa-sign-in-alt mr-2"></i>Login
              </button>
              <button onClick={() => openModal('signup')} className="px-5 py-2 gradient-bg text-white rounded-lg hover:shadow-lg transition font-semibold btn-glow">
                <i className="fas fa-user-plus mr-2"></i>Free Trial
              </button>
            </div>

            <button
              id="mobileMenuBtn"
              className="md:hidden text-gray-600 text-2xl hover:text-ethio-green transition"
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              <i className="fas fa-bars" />
            </button>
          </div>

          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden pb-4 border-t mt-2`}>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href.replace('#', ''))}
                className="block w-full text-left py-3 text-gray-700 hover:text-ethio-green hover:bg-green-50 px-2 rounded transition"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" data-aos-duration="1000">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6 glow">
              <i className="fas fa-graduation-cap text-ethio-green mr-2" />
              <span className="text-ethio-green text-sm font-semibold">✨ Ethiopian New Curriculum ✨</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Master Grades <span className="gradient-text">7–12</span> Online
            </h1>
            <p className="text-xl text-gray-600 mt-4 mb-8 leading-relaxed">
              Live classes, recorded lessons, and AI-powered exam preparation — all aligned with the Ethiopian National Curriculum. Learn in Amharic & English.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => openModal('signup')} className="px-8 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105 btn-glow">
                <i className="fas fa-play mr-2" /> Start Learning Now
              </button>
              <button onClick={() => scrollToSection('curriculum')} className="px-8 py-3 border-2 border-ethio-green text-ethio-green rounded-lg font-semibold hover:bg-green-50 transition transform hover:scale-105">
                <i className="fas fa-book mr-2" /> View Curriculum
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-500">
              <span className="flex items-center"><i className="fas fa-users text-ethio-green mr-2 text-lg" /> 5,000+ students</span>
              <span className="flex items-center"><i className="fas fa-chalkboard-teacher text-ethio-green mr-2 text-lg" /> 50+ expert teachers</span>
              <span className="flex items-center"><i className="fas fa-trophy text-ethio-green mr-2 text-lg" /> 98% exam pass rate</span>
              <span className="flex items-center"><i className="fas fa-video text-ethio-green mr-2 text-lg" /> 500+ lessons</span>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-duration="1000" className="float-element">
            <div className="gradient-bg rounded-2xl p-8 shadow-2xl">
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-500 ml-2">Live Class: Grade 12 Mathematics</span>
                  <span className="text-xs bg-green-100 text-ethio-green px-2 py-1 rounded-full ml-auto animate-pulse">🔴 LIVE</span>
                </div>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative group cursor-pointer" onClick={playDemoVideo}>
                  <div className="text-center text-white">
                    <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <i className="fas fa-play text-2xl ml-1" />
                    </div>
                    <p className="text-sm">Click to preview demo lesson</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-ethio-green font-semibold"><i className="fas fa-circle text-red-500 text-xs mr-1 animate-pulse" /> 124 students watching</span>
                  <span className="text-gray-500"><i className="fas fa-user-graduate mr-1" /> Teacher: Mr. Bekele</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-bg py-4 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-white text-sm md:text-base font-medium">
            {featureList.map((feature) => (
              <span key={feature.label} className="flex items-center">
                <i className={`${feature.icon} mr-2`} /> {feature.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section id="curriculum" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete <span className="gradient-text">Ethiopian Curriculum</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From lower secondary to university entrance preparation — fully aligned with the Ministry of Education standards
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up">
            {gradeButtons.map((grade) => (
              <button
                key={grade}
                onClick={() => handleGradeClick(grade)}
                className={`grade-btn px-6 py-3 rounded-full bg-white shadow-md hover:shadow-lg transition font-semibold ${activeGrade === grade ? 'active' : ''}`}
              >
                <i className="fas fa-star mr-1" /> Grade {grade}
              </button>
            ))}
          </div>

          <div id="subjectsGrid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectCards}
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <button onClick={() => openModal('signup')} className="px-8 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105">
              <i className="fas fa-lock-open mr-2" /> Unlock All Subjects with Free Trial
            </button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 gradient-bg text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Ethio Scholars Works</h2>
            <p className="text-xl opacity-90">Simple, effective, and designed for Ethiopian students</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Sign Up', description: 'Register with your phone number via Telebirr in 30 seconds' },
              { title: 'Choose Grade', description: 'Select your grade (7-12) and stream (Natural/Social for 11-12)' },
              { title: 'Learn', description: 'Attend live classes or watch recordings anytime, anywhere' },
              { title: 'Excel', description: 'Pass national exams with AI-powered preparation and analytics' },
            ].map((item, index) => (
              <div key={item.title} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-ethio-green text-3xl font-bold shadow-xl transform hover:scale-110 transition-all duration-300">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="opacity-90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="exams" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full mb-4">
                <i className="fas fa-star text-red-800 mr-2" />
                <span className="text-red-800 text-sm font-semibold">🎯 Grade 8 Ministry & 12 National Exam Preparation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pass Your <span className="gradient-text">National Exams</span> with Confidence
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Access past exams (2005-2017 EC), AI-generated practice tests, and video solutions from top Ethiopian teachers who have helped thousands of students succeed.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '20+ years of past national exams with answer keys',
                  'AI-generated mock exams with instant grading and feedback',
                  'Video solutions for every question by expert teachers',
                  'Performance analytics & personalized weak area detection',
                  'Time-bound practice tests simulating real exam conditions',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3"><i className="fas fa-check-circle text-ethio-green text-xl" /> {item}</li>
                ))}
              </ul>
              <button onClick={() => openModal('examPrep')} className="px-8 py-3 bg-ethio-red text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-lg transform hover:scale-105">
                <i className="fas fa-chalkboard mr-2" /> Start Exam Prep Now
              </button>
            </div>
            <div data-aos="fade-left">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-xl">
                <div className="glass-card rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl">Sample Exam Question</h3>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Grade 12 - 2016 EC</span>
                  </div>
                  <p className="text-gray-700 mb-4 font-medium">
                    Mathematics: If f(x) = 2x² - 3x + 5, what is f'(2)?
                  </p>
                  <div className="space-y-2 mb-4">
                    {['A) 2', 'B) 4', 'C) 5 ✓ Correct', 'D) 7'].map((option) => (
                      <div key={option} className={`p-3 rounded-lg transition ${option.includes('Correct') ? 'bg-green-100 border-l-4 border-ethio-green' : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'}`}>
                        {option}
                      </div>
                    ))}
                  </div>
                  <button className="text-ethio-green font-semibold hover:underline flex items-center gap-2">
                    <i className="fas fa-play-circle" /> Watch Video Solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Affordable <span className="gradient-text">Plans</span> for Every Student</h2>
            <p className="text-xl text-gray-600">Start with a 3-day free trial — no credit card required, cancel anytime</p>
            <div className="inline-flex items-center gap-2 mt-4 bg-green-100 px-4 py-2 rounded-full">
              <i className="fas fa-mobile-alt text-ethio-green" />
              <span className="text-sm">Pay with Telebirr or Chapa</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingCards.map((plan) => (
              <div key={plan.title} className={`${plan.style} rounded-2xl p-8 shadow-lg card-hover relative ${plan.popular ? 'transform scale-105' : ''}`} data-aos="fade-up">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-ethio-red text-white px-5 py-1 rounded-full text-sm font-semibold shadow-lg">
                    ⭐ Most Popular ⭐
                  </div>
                )}
                <i className={`fas ${plan.title === 'Term Plan' ? 'fa-gem' : plan.title === 'Yearly Plan' ? 'fa-crown' : 'fa-calendar-alt'} text-5xl ${plan.popular ? 'mb-4' : 'text-ethio-green mb-4'}`} />
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className={`mb-4 ${plan.popular ? 'opacity-90' : 'text-gray-500'}`}>{plan.description}</p>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? '' : 'text-ethio-green'}`}>{plan.price}</span>
                  <span className={`${plan.popular ? 'opacity-90' : 'text-gray-500'}`}> ETB</span>
                  <span className="text-sm text-gray-500"> {plan.unit}</span>
                  {plan.popular && <div className="text-sm opacity-75 mt-1">(Save 15% vs monthly)</div>}
                  {plan.title === 'Yearly Plan' && <div className="text-sm text-ethio-green mt-1">(Save 25% vs monthly)</div>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2"><i className={`fas ${item.startsWith('Save') ? 'fa-check' : 'fa-check'} ${plan.popular ? '' : 'text-ethio-green'}`} /> {item}</li>
                  ))}
                </ul>
                <button onClick={() => openModal('signup')} className={`w-full py-3 rounded-lg font-semibold transition ${plan.popular ? 'bg-white text-ethio-green hover:bg-gray-100' : 'gradient-bg text-white hover:shadow-lg'}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn from <span className="gradient-text">Ethiopia's Best Teachers</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced educators who understand the Ethiopian curriculum and have proven track records of student success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <div key={teacher.name} className="text-center card-hover glass-card rounded-2xl p-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="w-36 h-36 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center text-white text-5xl shadow-xl float-element">
                  <i className={teacher.icon} />
                </div>
                <h3 className="font-bold text-2xl mb-1">{teacher.name}</h3>
                <p className="text-ethio-green font-semibold mb-2">{teacher.title}</p>
                <p className="text-gray-500 text-sm mb-3">{teacher.description}</p>
                <div className="flex justify-center gap-2">
                  <span className="text-xs bg-green-100 text-ethio-green px-2 py-1 rounded">⭐ {teacher.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-bg py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((item, index) => (
              <div key={item.label} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-5xl font-bold mb-2">{counterValues[index]}</div>
                <div className="text-lg">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ኢሶአ</span>
                </div>
                <div>
                  <span className="font-bold text-lg">Ethio Scholars</span>
                  <p className="text-xs text-gray-400">Online Academy</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering Ethiopian students with quality online education since 2024.
              </p>
              <div className="flex space-x-4 mt-4">
                {['facebook', 'telegram', 'youtube', 'instagram'].map((network) => (
                  <a key={network} href="#" className="text-gray-400 hover:text-green-400 text-2xl transition">
                    <i className={`fab fa-${network}`} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {['About Us', 'Our Curriculum', 'Pricing Plans', 'Become a Teacher'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-green-400 transition">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {['FAQs', 'Technical Support', 'Payment Methods', 'Privacy Policy'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-green-400 transition">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><i className="fas fa-phone mr-2 w-5" /> +251-911-123456</li>
                <li><i className="fas fa-envelope mr-2 w-5" /> info@ethioscholars.com</li>
                <li><i className="fas fa-map-marker-alt mr-2 w-5" /> Addis Ababa, Ethiopia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Ethio Scholars Online Academy. All rights reserved.</p>
            <p className="mt-1">Proudly Ethiopian — Aligned with the Ethiopian New Curriculum (Grades 7-12)</p>
          </div>
        </div>
      </footer>

      <div className="chatbot-container">
        <div className="chatbot-toggle" onClick={toggleChatbot}>
          <i className="fas fa-robot text-white text-2xl" />
        </div>
        <div className={`chatbot-window ${chatOpen ? 'open' : ''}`} id="chatbotWindow">
          <div className="chatbot-header">
            <div className="flex items-center gap-2">
              <i className="fas fa-robot text-xl" />
              <span className="font-bold">MegaW AI Assistant</span>
            </div>
            <button onClick={toggleChatbot} className="text-white hover:text-gray-200">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="chatbot-messages" id="chatMessages">
            {chatMessages.map((message, index) =>
              message.from === 'typing' ? (
                <div key={`${message.from}-${index}`} className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              ) : (
                <div key={`${message.from}-${index}`} className={`message ${message.from === 'user' ? 'user' : 'bot'}`}>
                  {message.text}
                </div>
              )
            )}
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              id="chatInput"
              className="chatbot-input"
              placeholder="Type your question..."
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') sendMessage();
              }}
            />
            <button className="chatbot-send" onClick={sendMessage}>
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed bottom-24 right-6 z-50 transition ${showScrollTop ? 'opacity-100' : 'opacity-0'}`} id="scrollTopBtn">
        <button onClick={scrollToTop} className="gradient-bg text-white p-3 rounded-full shadow-lg hover:shadow-xl transition">
          <i className="fas fa-arrow-up" />
        </button>
      </div>

      <div className={`modal ${modalOpen === 'login' ? 'open' : ''}`} onClick={(event) => event.target === event.currentTarget && closeModal()}>
        <div className="modal-content">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
            <button onClick={closeModal} className="text-gray-500 text-3xl hover:text-gray-700">&times;</button>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Phone Number</label>
              <input type="tel" id="loginPhone" placeholder="09xxxxxxxx" className="w-full p-3 border rounded-lg focus:outline-none focus:border-ethio-green" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">OTP Code</label>
              <input type="text" id="loginOTP" placeholder="Enter 6-digit code" className="w-full p-3 border rounded-lg focus:outline-none focus:border-ethio-green" required />
            </div>
            <button type="submit" className="w-full gradient-bg text-white p-3 rounded-lg font-semibold hover:shadow-lg transition">
              <i className="fas fa-sign-in-alt mr-2" /> Login with Telebirr
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            Don&apos;t have an account?{' '}
            <button onClick={() => switchModal('signup')} className="text-ethio-green font-semibold hover:underline">
              Sign up for free
            </button>
          </p>
        </div>
      </div>

      <div className={`modal ${modalOpen === 'signup' ? 'open' : ''}`} onClick={(event) => event.target === event.currentTarget && closeModal()}>
        <div className="modal-content">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Start Free Trial</h2>
            <button onClick={closeModal} className="text-gray-500 text-3xl hover:text-gray-700">&times;</button>
          </div>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
              <input type="text" id="signupName" className="w-full p-3 border rounded-lg focus:outline-none focus:border-ethio-green" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Phone Number</label>
              <input type="tel" id="signupPhone" placeholder="09xxxxxxxx" className="w-full p-3 border rounded-lg focus:outline-none focus:border-ethio-green" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Grade</label>
              <select id="signupGrade" className="w-full p-3 border rounded-lg focus:outline-none focus:border-ethio-green">
                {['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11 (Natural)', 'Grade 11 (Social)', 'Grade 12 (Natural)', 'Grade 12 (Social)'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full gradient-bg text-white p-3 rounded-lg font-semibold hover:shadow-lg transition">
              <i className="fas fa-gift mr-2" /> Start 3-Day Free Trial
            </button>
          </form>
        </div>
      </div>

      <div className={`modal ${modalOpen === 'examPrep' ? 'open' : ''}`} onClick={(event) => event.target === event.currentTarget && closeModal()}>
        <div className="modal-content">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">National Exam Preparation</h2>
            <button onClick={closeModal} className="text-gray-500 text-3xl hover:text-gray-700">&times;</button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">Select Grade</label>
            <select id="examGrade" className="w-full p-3 border rounded-lg">
              <option>Grade 10 National Exam</option>
              <option>Grade 12 National Exam</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">Select Subject</label>
            <select id="examSubject" className="w-full p-3 border rounded-lg">
              {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Geography'].map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <button onClick={startExam} className="w-full gradient-bg text-white p-3 rounded-lg font-semibold hover:shadow-lg transition">
            <i className="fas fa-play mr-2" /> Start Practice Exam
          </button>
        </div>
      </div>

      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.message}
        </div>
      ))}
    </main>
  );
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year?: string;
  summary: string;
  description: string;
  role?: string;
  tools: string[];
  coverImage?: string;
  coverAlt?: string;
  coverWidth?: number;
  coverHeight?: number;
  coverLabel?: string;
  stage?: string;
  gallery?: { src: string; alt: string; width?: number; height?: number; caption?: string }[];
  videoUrl?: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
}

// Project descriptions and embedded links from CV_ZISAN (1).pdf.
// Screenshots and the FRIDAY site link were supplied separately by the owner.
export const projects: Project[] = [
  {
    id: 'friday-university-reminder-bot',
    title: 'FRIDAY — University Reminder Bot',
    coverLabel: 'FRIDAY\nREMINDERS',
    coverImage: '/assets/projects/friday-reminder/Fr7.png',
    coverAlt: 'FRIDAY academic web dashboard with the next class, enrolled courses, deadlines, and Discord alerts',
    coverWidth: 1916,
    coverHeight: 1038,
    category: 'Automation',
    summary: 'A Discord academic assistant and web dashboard for class schedules, deadlines, and university reminders.',
    description: 'Developed a university reminder bot to help students track academic events, class schedules, quizzes, assignment deadlines, and midterm and final examinations.\n\nImplemented Discord-based reminders and user identification to deliver relevant academic notifications. An automated workflow organizes academic deadlines and event information to support student planning and reduce missed deadlines.\n\nThe companion web portal uses one-time Discord passkeys and presents the next upcoming class, academic deadlines, course information, and a weekly timetable. Discord commands also provide faculty consultation hours and a form for adding academic tasks.',
    tools: ['Python', 'Discord bot development', 'Automation'],
    sourceUrl: 'https://github.com/zihadzafarzisan/friday-reminder-bot',
    liveUrl: 'https://friday.alwaysdata.net',
    gallery: [
      { src: '/assets/projects/friday-reminder/Fr1.jpg', alt: 'FRIDAY Discord schedule response and web dashboard sign-in instructions', width: 1280, height: 880, caption: 'Discord schedule & web sign-in' },
      { src: '/assets/projects/friday-reminder/Fr2.jpg', alt: 'FRIDAY slash commands for consultation hours, upcoming classes, academic tasks, and dashboard access', width: 660, height: 596, caption: 'Discord slash commands' },
      { src: '/assets/projects/friday-reminder/Fr3.jpg', alt: 'FRIDAY class-start notification showing the course, room, faculty, and class time', width: 592, height: 312, caption: 'Upcoming class alert' },
      { src: '/assets/projects/friday-reminder/Fr4.jpg', alt: 'FRIDAY form for adding an academic deadline or task', width: 682, height: 898, caption: 'Add an academic deadline' },
      { src: '/assets/projects/friday-reminder/Fr5.jpg', alt: 'FRIDAY faculty consultation hours response in Discord', width: 685, height: 428, caption: 'Faculty consultation hours' },
      { src: '/assets/projects/friday-reminder/Fr6.png', alt: 'FRIDAY academic portal sign-in using a one-time Discord passkey', width: 1917, height: 1030, caption: 'Web portal sign-in' },
      { src: '/assets/projects/friday-reminder/Fr8.png', alt: 'FRIDAY weekly timetable with class and lab slots, rooms, and faculty', width: 1917, height: 1027, caption: 'Weekly academic timetable' },
    ],
    featured: true,
  },
  {
    id: 'friday-crypto-trading-bot',
    title: 'FRIDAY — Crypto Trading Bot',
    coverLabel: 'FRIDAY\nRESEARCH',
    coverImage: '/assets/projects/friday-trading/FT5.png',
    coverAlt: 'FRIDAY Futures Signal Bot testnet terminal showing a market chart, portfolio overview, positions, and engine health',
    coverWidth: 1907,
    coverHeight: 1037,
    category: 'Quantitative research',
    stage: 'Research & validation',
    summary: 'A cryptocurrency research system for strategy backtesting, realistic trading costs, and out-of-sample validation.',
    description: 'Developed a quantitative research system focused on BTCUSDT, ETHUSDT, SOLUSDT, and HYPEUSDT perpetual futures, with a structured workflow for strategy development, backtesting, and out-of-sample validation.\n\nResearched strategies involving volume displacement, volatility compression, market conditions, and adaptive trade management. Included fees, slippage, and funding assumptions, with evaluation using profit factor, net return, and maximum drawdown.\n\nEstablished a research workflow incorporating automated testing, robustness analysis, Monte Carlo evaluation, and paper-trading preparation.',
    tools: ['Python', 'Quantitative research', 'Algorithmic trading', 'Risk management'],
    sourceUrl: 'https://github.com/zihadzafarzisan/Ai-Trading-Bot',
    gallery: [
      { src: '/assets/projects/friday-trading/FT1.jpg', alt: 'FRIDAY Discord position-close notification with strategy, realized P&L, fees, and holding duration', width: 1280, height: 732, caption: 'Discord position-close notification' },
      { src: '/assets/projects/friday-trading/FT2.jpg', alt: 'FRIDAY Discord notification for a closed tendency EMA/RSI strategy position', width: 1280, height: 746, caption: 'EMA/RSI strategy notification' },
      { src: '/assets/projects/friday-trading/FT3.jpg', alt: 'FRIDAY Discord timeout-close notification for an ETHUSDT strategy position', width: 1280, height: 747, caption: 'Timeout-close notification' },
      { src: '/assets/projects/friday-trading/FT4.png', alt: 'FRIDAY trading workspace with Futures Signal Bot and Arbitrage Bot selection cards', width: 1435, height: 1031, caption: 'Trading bot workspace' },
    ],
    featured: true,
  },
  {
    id: 'personal-command-center-student-os',
    title: 'Personal Command Center / Student OS',
    coverLabel: 'STUDENT\nOS',
    category: 'Web application',
    stage: 'Concept & exploration',
    summary: 'Exploring a unified student dashboard for schedules, academic deadlines, course information, and personal productivity.',
    description: 'Explored a centralized student platform for university schedules, academic deadlines, announcements, course information, and personal productivity workflows.\n\nDesigned the product concept around bringing fragmented student resources into one interface. Investigated integration approaches involving university portals, Google authentication, web technologies, and cloud-based services.',
    tools: ['Web application', 'Dashboard design', 'Workflow automation'],
    featured: true,
  },
  {
    id: 'movie-ticket-purchasing-bot',
    title: 'Movie Ticket Purchasing Bot',
    coverLabel: 'TICKET\nASSISTANT',
    category: 'Automation',
    summary: 'An automated movie-ticket workflow for discovering movies, checking showtimes, and navigating bookings.',
    description: 'Developed an automated movie ticket purchasing bot to streamline movie discovery, showtime checking, and booking workflow execution.\n\nExplored automation techniques to reduce manual interaction with ticket booking platforms. Focused on a structured workflow with potential for error handling, availability monitoring, and integration with ticket booking services.',
    tools: ['Automation', 'Web scraping', 'Booking workflow'],
    sourceUrl: 'https://github.com/zihadzafarzisan/ticket-booking-assistant',
  },
];

export type Service = {
  id: string;
  name: string;
  description: string;
  status: 'Available' | 'Taken' | 'Rejected' | 'Accepted' | 'In Progress' | 'Done';
  price: number;
};

export const services: Service[] = [
  { id: 'srv-001', name: 'Cloud Infrastructure Setup', description: 'Comprehensive setup of your cloud environment on AWS, Azure, or GCP.', status: 'Available', price: 2500 },
  { id: 'srv-002', name: 'Performance Auditing', description: 'In-depth analysis of your application performance with actionable recommendations.', status: 'Available', price: 1200 },
  { id: 'srv-003', name: 'CI/CD Pipeline Implementation', description: 'Automate your build, test, and deployment process.', status: 'Taken', price: 1800 },
  { id: 'srv-004', name: 'Database Optimization', description: 'Improve your database queries and schema for better performance.', status: 'Accepted', price: 950 },
  { id: 'srv-005', name: 'Security Hardening', description: 'Full system security audit and hardening.', status: 'In Progress', price: 3200 },
  { id: 'srv-006', name: 'Emergency Support', description: '24/7 on-call support for critical issues.', status: 'Done', price: 500 },
];

export const overviewMetrics = {
  activeUsers: { value: '1,250', change: '+15.2%' },
  usage: { value: '85%', change: '+5.0%' },
  errorRate: { value: '1.2%', change: '-0.5%' },
  newServices: { value: '12', change: '+3' },
};

export const performanceData = [
  { time: '12:00 AM', responseTime: 120, cpuUsage: 25 },
  { time: '02:00 AM', responseTime: 130, cpuUsage: 30 },
  { time: '04:00 AM', responseTime: 110, cpuUsage: 28 },
  { time: '06:00 AM', responseTime: 150, cpuUsage: 40 },
  { time: '08:00 AM', responseTime: 200, cpuUsage: 60 },
  { time: '10:00 AM', responseTime: 180, cpuUsage: 55 },
  { time: '12:00 PM', responseTime: 220, cpuUsage: 70 },
  { time: '02:00 PM', responseTime: 210, cpuUsage: 68 },
  { time: '04:00 PM', responseTime: 230, cpuUsage: 75 },
  { time: '06:00 PM', responseTime: 200, cpuUsage: 65 },
  { time: '08:00 PM', responseTime: 180, cpuUsage: 58 },
  { time: '10:00 PM', responseTime: 160, cpuUsage: 50 },
];

export const configuration = {
  featureFlags: [
    { id: 'ff-01', name: 'Enable Beta Dashboard', enabled: true },
    { id: 'ff-02', name: 'Enable AI Log Summaries', enabled: true },
    { id: 'ff-03', name: 'Use Canary Deployments', enabled: false },
  ],
  apiKeys: [
    { id: 'ak-01', name: 'Stripe API Key', value: 'sk_test_************************' },
    { id: 'ak-02', name: 'SendGrid API Key', value: 'SG.********************************' },
  ],
};

export const alerts: {id: string; title: string; description: string; severity: 'Critical' | 'High' | 'Medium'; timestamp: string }[] = [
  { id: 'al-01', title: 'High CPU Usage', description: 'CPU usage on server-prod-01 is at 95%.', severity: 'Critical', timestamp: '2 mins ago' },
  { id: 'al-02', title: '5xx Error Rate Spike', description: 'API gateway is returning an elevated number of 503 errors.', severity: 'High', timestamp: '15 mins ago' },
  { id: 'al-03', title: 'Low Disk Space', description: 'Disk space on db-main-01 is below 10%.', severity: 'Medium', timestamp: '1 hour ago' },
];

export const userFeedback = [
  { id: 'fb-01', user: 'Alice Johnson', avatar: 'https://picsum.photos/40/40?random=1', feedback: "The new performance chart is amazing! It helped me spot a memory leak immediately.", timestamp: '3 hours ago' },
  { id: 'fb-02', user: 'Bob Williams', avatar: 'https://picsum.photos/40/40?random=2', feedback: "Could you add an option to export logs? That would be super helpful.", timestamp: '1 day ago' },
  { id: 'fb-03', user: 'Charlie Brown', avatar: 'https://picsum.photos/40/40?random=3', feedback: "The log analysis tool saved me hours of debugging. Incredible feature!", timestamp: '2 days ago' },
  { id: 'fb-04', user: 'Diana Prince', avatar: 'https://picsum.photos/40/40?random=4', feedback: "The UI is so clean and intuitive. Great job!", timestamp: '2 days ago' },
];

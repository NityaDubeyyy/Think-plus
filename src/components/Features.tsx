import { motion } from 'motion/react';
import { Video, FileText, Trophy, TrendingUp, Users, Clock } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export function Features() {
  const features = [
    {
      icon: Video,
      title: 'Video Lectures',
      description: 'High-quality recorded lectures accessible 24/7 for flexible learning'
    },
    {
      icon: FileText,
      title: 'Study Materials',
      description: 'Comprehensive notes, practice questions, and reference materials'
    },
    {
      icon: Trophy,
      title: 'Weekly Tests',
      description: 'Regular assessments to track your progress and identify weak areas'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Real-time analytics and performance insights to optimize learning'
    },
    {
      icon: Users,
      title: 'Doubt Clearing',
      description: 'Interactive sessions with faculty to resolve your queries instantly'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Learn at your own pace with lifetime access to course content'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 dark:text-white mb-4">Why Choose Think Plus?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Comprehensive features designed for your success</p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div 
                className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-500/20 dark:hover:border-blue-500/40"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <feature.icon className="w-7 h-7 text-blue-600 dark:text-blue-500" />
                </motion.div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
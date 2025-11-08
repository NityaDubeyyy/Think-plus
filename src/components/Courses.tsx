import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Users, BookOpen, Star } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface CoursesProps {
  onEnroll: (course: any) => void;
}

export function Courses({ onEnroll }: CoursesProps) {
  const courses = [
    {
      id: 1,
      title: 'CAT Preparation Course',
      description: 'Complete preparation for Common Admission Test with expert guidance and comprehensive study material.',
      price: 24999,
      duration: '12 months',
      students: 2500,
      lectures: 150,
      rating: 4.8,
      features: ['Video Lectures', 'Mock Tests', 'Study Material', 'Doubt Clearing']
    },
    {
      id: 2,
      title: 'IPMAT Mastery Program',
      description: 'Intensive preparation for IIM Indore IPMAT with focus on quantitative aptitude and verbal ability.',
      price: 19999,
      duration: '10 months',
      students: 1800,
      lectures: 120,
      rating: 4.7,
      features: ['Live Classes', 'Practice Tests', 'Personal Mentor', 'Study Notes']
    },
    {
      id: 3,
      title: 'CLAT Complete Course',
      description: 'Comprehensive CLAT preparation covering all sections with detailed analysis and practice.',
      price: 22999,
      duration: '12 months',
      students: 2200,
      lectures: 140,
      rating: 4.9,
      features: ['Video Lessons', 'Weekly Tests', 'Legal Reasoning', 'GK Updates']
    },
    {
      id: 4,
      title: 'CAT + IPMAT Combo',
      description: 'Get the best of both worlds with our comprehensive combo package at a special price.',
      price: 39999,
      duration: '12 months',
      students: 1500,
      lectures: 200,
      rating: 4.8,
      features: ['All CAT Content', 'All IPMAT Content', 'Extra Mock Tests', 'Priority Support']
    },
    {
      id: 5,
      title: 'MBA Entrance Foundation',
      description: 'Foundation course for MBA aspirants covering basics of quantitative, verbal, and logical reasoning.',
      price: 14999,
      duration: '6 months',
      students: 3000,
      lectures: 80,
      rating: 4.6,
      features: ['Beginner Friendly', 'Concept Building', 'Practice Sets', 'Progress Reports']
    },
    {
      id: 6,
      title: 'Advanced Problem Solving',
      description: 'Advanced level problem-solving techniques for CAT, IPMAT, and other competitive exams.',
      price: 17999,
      duration: '8 months',
      students: 1200,
      lectures: 100,
      rating: 4.9,
      features: ['Advanced Topics', 'Tricks & Tips', 'Time Management', 'Strategy Sessions']
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 dark:text-white mb-4">Our Courses</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Choose the perfect course to start your journey</p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {courses.map((course) => (
            <StaggerItem key={course.id}>
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Card className="group flex flex-col h-full hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {course.duration}
                      </Badge>
                      <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating}</span>
                      </motion.div>
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <div className="space-y-3 mb-4">
                      <motion.div 
                        className="flex items-center gap-2 text-sm text-gray-600"
                        whileHover={{ x: 5 }}
                      >
                        <Clock className="w-4 h-4" />
                        <span>{course.lectures} Lectures</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 text-sm text-gray-600"
                        whileHover={{ x: 5 }}
                      >
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()} Students</span>
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-center gap-2 text-sm text-gray-600"
                          whileHover={{ x: 5 }}
                        >
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex items-center justify-between border-t dark:border-gray-800 pt-4">
                    <div>
                      <span className="text-2xl text-gray-900 dark:text-white">₹{course.price.toLocaleString()}</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/50"
                        onClick={() => onEnroll(course)}
                      >
                        Enroll Now
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Trophy, TrendingUp, Clock, Target, BookOpen, Award } from 'lucide-react';

export function ProgressDashboard() {
  const stats = [
    {
      title: 'Overall Progress',
      value: '68%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Tests Completed',
      value: '24/40',
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Study Hours',
      value: '142 hrs',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Avg. Score',
      value: '82%',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const subjectProgress = [
    { subject: 'Quantitative Aptitude', progress: 75, color: 'bg-blue-600' },
    { subject: 'Verbal Ability', progress: 68, color: 'bg-green-600' },
    { subject: 'Logical Reasoning', progress: 62, color: 'bg-purple-600' },
    { subject: 'Data Interpretation', progress: 70, color: 'bg-orange-600' }
  ];

  const recentActivities = [
    {
      type: 'test',
      title: 'Completed Weekly Test #13',
      score: 85,
      date: '2 hours ago'
    },
    {
      type: 'video',
      title: 'Watched: Number Systems Lecture',
      date: '5 hours ago'
    },
    {
      type: 'test',
      title: 'Completed Mock Test #5',
      score: 78,
      date: '1 day ago'
    },
    {
      type: 'achievement',
      title: 'Earned "Consistent Learner" Badge',
      date: '2 days ago'
    },
    {
      type: 'video',
      title: 'Watched: Reading Comprehension',
      date: '3 days ago'
    }
  ];

  const achievements = [
    { title: '7 Day Streak', icon: '🔥', earned: true },
    { title: 'First Test', icon: '🎯', earned: true },
    { title: 'Top Scorer', icon: '🏆', earned: true },
    { title: 'Speed Master', icon: '⚡', earned: false },
    { title: '30 Day Streak', icon: '🌟', earned: false },
    { title: 'Perfect Score', icon: '💯', earned: false }
  ];

  const upcomingMilestones = [
    { title: 'Complete 30 Tests', current: 24, target: 30, progress: 80 },
    { title: 'Watch 100 Lectures', current: 68, target: 100, progress: 68 },
    { title: 'Achieve 90% Average', current: 82, target: 90, progress: 91 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 dark:text-white mb-2">My Progress</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Track your learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-3xl text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 ${stat.bgColor} dark:opacity-80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subject Progress */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Subject-wise Progress</CardTitle>
                <CardDescription>Your performance across different subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {subjectProgress.map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">{subject.subject}</span>
                      <span className="text-sm text-gray-900">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-4 pb-4 border-b last:border-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.type === 'test' ? 'bg-blue-100' :
                        activity.type === 'video' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'test' && <Trophy className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'video' && <BookOpen className="w-5 h-5 text-green-600" />}
                        {activity.type === 'achievement' && <Award className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">{activity.date}</p>
                          {activity.score && (
                            <Badge variant="outline" className="text-xs">
                              Score: {activity.score}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Milestones */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Upcoming Milestones</CardTitle>
                <CardDescription>Goals you're close to achieving</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {upcomingMilestones.map((milestone, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">{milestone.title}</span>
                      <span className="text-sm text-gray-600">
                        {milestone.current}/{milestone.target}
                      </span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievements */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        achievement.earned
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-gray-200 bg-gray-50 opacity-50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <p className="text-xs text-gray-700">{achievement.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Streak */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Study Streak</CardTitle>
                <CardDescription>Keep up the momentum!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl">🔥</div>
                  <div>
                    <p className="text-4xl text-gray-900 dark:text-white">7 Days</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current Streak</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-900">
                      You're on fire! Keep studying daily to maintain your streak.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Insight */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Performance Insight</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-900">
                    <strong>Strength:</strong> Quantitative Aptitude
                  </p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-900">
                    <strong>Focus Area:</strong> Logical Reasoning
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Tip:</strong> Practice more time-based tests
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

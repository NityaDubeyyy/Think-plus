import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, FileQuestion, Trophy, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

export function TestSection() {
  const [activeTest, setActiveTest] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const tests = [
    {
      id: 1,
      title: 'Weekly Test #12 - Quantitative Aptitude',
      subject: 'Mathematics',
      questions: 30,
      duration: '60 mins',
      marks: 100,
      status: 'completed',
      score: 85,
      date: '2025-11-05'
    },
    {
      id: 2,
      title: 'Weekly Test #13 - Verbal Ability',
      subject: 'English',
      questions: 25,
      duration: '45 mins',
      marks: 100,
      status: 'completed',
      score: 78,
      date: '2025-11-06'
    },
    {
      id: 3,
      title: 'Weekly Test #14 - Logical Reasoning',
      subject: 'Logic',
      questions: 30,
      duration: '60 mins',
      marks: 100,
      status: 'available',
      date: '2025-11-07'
    },
    {
      id: 4,
      title: 'Mock Test - Full Length CAT',
      subject: 'All Subjects',
      questions: 66,
      duration: '180 mins',
      marks: 300,
      status: 'available',
      date: '2025-11-08'
    },
    {
      id: 5,
      title: 'Weekly Test #15 - Data Interpretation',
      subject: 'Mathematics',
      questions: 20,
      duration: '40 mins',
      marks: 100,
      status: 'upcoming',
      date: '2025-11-10'
    }
  ];

  const sampleQuestions = [
    {
      id: 1,
      question: 'If a train travels at 60 km/h for 2 hours, how far does it travel?',
      options: ['100 km', '110 km', '120 km', '130 km'],
      correct: 2
    },
    {
      id: 2,
      question: 'What is the value of x in the equation: 2x + 5 = 15?',
      options: ['3', '5', '7', '10'],
      correct: 1
    },
    {
      id: 3,
      question: 'A rectangle has length 8 cm and width 6 cm. What is its perimeter?',
      options: ['24 cm', '26 cm', '28 cm', '30 cm'],
      correct: 2
    },
    {
      id: 4,
      question: 'If 25% of a number is 50, what is the number?',
      options: ['150', '175', '200', '225'],
      correct: 2
    },
    {
      id: 5,
      question: 'What is the average of 12, 18, 24, and 30?',
      options: ['18', '21', '24', '27'],
      correct: 1
    }
  ];

  const handleStartTest = (test: any) => {
    setActiveTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct.toString()) {
        correct++;
      }
    });
    return (correct / sampleQuestions.length) * 100;
  };

  if (activeTest && !showResults) {
    const question = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>{activeTest.title}</CardTitle>
                <Badge className="bg-blue-600">
                  <Clock className="w-4 h-4 mr-1" />
                  45:23
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg mb-4">{question.question}</h3>
                <RadioGroup
                  value={answers[currentQuestion]}
                  onValueChange={(value) => handleAnswer(currentQuestion, value)}
                >
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                {currentQuestion === sampleQuestions.length - 1 ? (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    Submit Test
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(Math.min(sampleQuestions.length - 1, currentQuestion + 1))}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-3xl">Test Completed!</CardTitle>
              <CardDescription>Here are your results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-5xl text-gray-900">{score.toFixed(0)}%</p>
                <p className="text-gray-600">Your Score</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl text-gray-900">
                    {Object.entries(answers).filter(([idx, ans]) => ans === sampleQuestions[parseInt(idx)].correct.toString()).length}
                  </p>
                  <p className="text-sm text-gray-600">Correct</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl text-gray-900">
                    {Object.entries(answers).filter(([idx, ans]) => ans !== sampleQuestions[parseInt(idx)].correct.toString()).length}
                  </p>
                  <p className="text-sm text-gray-600">Incorrect</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl text-gray-900">
                    {sampleQuestions.length - Object.keys(answers).length}
                  </p>
                  <p className="text-sm text-gray-600">Unanswered</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg">Answer Review</h3>
                {sampleQuestions.map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.correct.toString();
                  return (
                    <div key={idx} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="mb-2">{q.question}</p>
                          <p className="text-sm text-gray-600">
                            Your answer: {userAnswer ? q.options[parseInt(userAnswer)] : 'Not answered'}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-700 mt-1">
                              Correct answer: {q.options[q.correct]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={() => {
                  setActiveTest(null);
                  setShowResults(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Back to Tests
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 dark:text-white mb-2">Tests & Quizzes</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Practice and evaluate your preparation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    className={
                      test.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : test.status === 'available'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {test.status}
                  </Badge>
                  {test.status === 'completed' && (
                    <div className="flex items-center gap-1 text-green-600">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">{test.score}%</span>
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{test.title}</CardTitle>
                <CardDescription>{test.subject}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileQuestion className="w-4 h-4" />
                    <span>{test.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Max Marks: {test.marks}
                </div>
                {test.status === 'available' && (
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 transition-all hover:scale-105 hover:shadow-lg"
                    onClick={() => handleStartTest(test)}
                  >
                    Start Test
                  </Button>
                )}
                {test.status === 'completed' && (
                  <Button variant="outline" className="w-full">
                    View Results
                  </Button>
                )}
                {test.status === 'upcoming' && (
                  <Button variant="outline" className="w-full" disabled>
                    Available on {test.date}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

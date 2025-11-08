import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, Download, FileText, Video, BookOpen, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

export function StudyMaterials() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const videoLectures = [
    {
      id: 1,
      title: 'Quantitative Aptitude - Number Systems',
      instructor: 'Prof. Rajesh Kumar',
      duration: '45 mins',
      category: 'Quantitative',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400',
      views: 1250,
      completed: true
    },
    {
      id: 2,
      title: 'Verbal Ability - Reading Comprehension',
      instructor: 'Dr. Priya Sharma',
      duration: '38 mins',
      category: 'Verbal',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
      views: 980,
      completed: true
    },
    {
      id: 3,
      title: 'Logical Reasoning - Puzzles & Seating',
      instructor: 'Prof. Anil Mehta',
      duration: '52 mins',
      category: 'Logical',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      views: 1100,
      completed: false
    },
    {
      id: 4,
      title: 'Data Interpretation - Tables & Charts',
      instructor: 'Prof. Rajesh Kumar',
      duration: '42 mins',
      category: 'Quantitative',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      views: 890,
      completed: false
    },
    {
      id: 5,
      title: 'Verbal Ability - Para Jumbles',
      instructor: 'Dr. Priya Sharma',
      duration: '35 mins',
      category: 'Verbal',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
      views: 760,
      completed: false
    },
    {
      id: 6,
      title: 'Quantitative Aptitude - Geometry Basics',
      instructor: 'Prof. Anil Mehta',
      duration: '48 mins',
      category: 'Quantitative',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      views: 1050,
      completed: false
    }
  ];

  const studyNotes = [
    {
      id: 1,
      title: 'Complete Quantitative Aptitude Notes',
      subject: 'Mathematics',
      pages: 150,
      size: '12 MB',
      downloads: 2500
    },
    {
      id: 2,
      title: 'Verbal Ability Comprehensive Guide',
      subject: 'English',
      pages: 120,
      size: '8 MB',
      downloads: 2200
    },
    {
      id: 3,
      title: 'Logical Reasoning Practice Sets',
      subject: 'Logic',
      pages: 80,
      size: '6 MB',
      downloads: 1900
    },
    {
      id: 4,
      title: 'Data Interpretation Shortcuts',
      subject: 'Mathematics',
      pages: 60,
      size: '4 MB',
      downloads: 1800
    },
    {
      id: 5,
      title: 'GK & Current Affairs - Monthly',
      subject: 'General Knowledge',
      pages: 40,
      size: '3 MB',
      downloads: 3000
    },
    {
      id: 6,
      title: 'Previous Year Papers Collection',
      subject: 'All Subjects',
      pages: 200,
      size: '15 MB',
      downloads: 2800
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 dark:text-white mb-2">Study Materials</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Access your course videos, notes, and resources</p>
        </div>

        <Tabs defaultValue="videos" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video Lectures
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Study Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            {selectedVideo ? (
              <div className="space-y-6">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedVideo(null)}
                  className="mb-4"
                >
                  ← Back to all videos
                </Button>
                
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Play className="w-20 h-20 text-white mx-auto" />
                      <p className="text-white">Video Player</p>
                      <p className="text-gray-400 text-sm">Playing: {selectedVideo.title}</p>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{selectedVideo.title}</CardTitle>
                    <CardDescription>Instructor: {selectedVideo.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedVideo.duration}
                      </span>
                      <span>{selectedVideo.views} views</span>
                      <Badge variant="outline">{selectedVideo.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoLectures.map((video) => (
                  <Card 
                    key={video.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-black/70">{video.duration}</Badge>
                      </div>
                      {video.completed && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-green-600">Completed</Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">{video.title}</CardTitle>
                      <CardDescription>{video.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{video.views} views</span>
                        <Badge variant="outline">{video.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyNotes.map((note) => (
                <Card key={note.id} className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{note.title}</CardTitle>
                          <CardDescription>{note.subject}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{note.pages} pages</p>
                        <p>{note.size}</p>
                        <p>{note.downloads.toLocaleString()} downloads</p>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 transition-all hover:scale-105 hover:shadow-lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

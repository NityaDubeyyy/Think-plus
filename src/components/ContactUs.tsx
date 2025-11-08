import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollReveal } from './ScrollReveal';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 dark:text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">We're here to help and answer any questions you might have</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <ScrollReveal direction="left" className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <div>
                      <h4 className="text-sm text-gray-900 mb-1">Address</h4>
                      <p className="text-sm text-gray-600">
                        123 Education Street, Learning District<br />
                        Mumbai, Maharashtra 400001
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Phone className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <div>
                      <h4 className="text-sm text-gray-900 mb-1">Phone</h4>
                      <p className="text-sm text-gray-600">
                        +91-XXXX-XXXXXX<br />
                        +91-YYYY-YYYYYY
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Mail className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <div>
                      <h4 className="text-sm text-gray-900 mb-1">Email</h4>
                      <p className="text-sm text-gray-600">
                        info@thinkplus.edu<br />
                        support@thinkplus.edu
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Clock className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <div>
                      <h4 className="text-sm text-gray-900 mb-1">Working Hours</h4>
                      <p className="text-sm text-gray-600">
                        Monday - Saturday<br />
                        9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visit Our Office</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"
                      alt="Office"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </ScrollReveal>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91-XXXXX-XXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Course Inquiry"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 transition-all hover:scale-[1.02] hover:shadow-lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Camera, Mail, Phone, MapPin, Calendar, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91-98765-43210',
      location: 'Mumbai, India',
      dateOfBirth: '1999-05-15',
      avatar: '',
      bio: 'Aspiring MBA student preparing for CAT 2026'
    };
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleAvatarChange = () => {
    // In a real app, this would open a file picker
    toast.info('Avatar upload feature - coming soon!');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-900 transition-colors">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">My Profile</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            View and edit your personal information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-blue-100 dark:border-blue-900 transition-transform group-hover:scale-105">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleAvatarChange}
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all hover:scale-110 shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-xl text-gray-900 dark:text-white">{profile.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{profile.email}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="mt-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover:scale-105"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <UserIcon className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={!isEditing}
                className="disabled:opacity-60 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={!isEditing}
                className="disabled:opacity-60 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                disabled={!isEditing}
                className="disabled:opacity-60 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleChange('location', e.target.value)}
                disabled={!isEditing}
                className="disabled:opacity-60 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                disabled={!isEditing}
                className="disabled:opacity-60 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-900 dark:text-white">Bio</Label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all focus:scale-[1.01]"
            />
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all hover:scale-[1.02]"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-[1.02]"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { useTheme } from '../lib/ThemeContext';
import { Moon, Sun, Bell, Lock, Palette, Globe, Volume2, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Settings({ open, onOpenChange }: SettingsProps) {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    soundEffects: true,
    autoplay: false,
    videoQuality: 'HD',
    language: 'English',
    fontSize: 16,
    animations: true,
    dataUsage: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Setting updated');
  };

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-white dark:bg-gray-900 transition-colors">
        <SheetHeader>
          <SheetTitle className="text-gray-900 dark:text-white">Settings</SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-400">
            Customize your learning experience
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="appearance" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appearance" className="text-xs">Appearance</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
            <TabsTrigger value="preferences" className="text-xs">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6 mt-6">
            {/* Theme Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'light' ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-500" />
                  )}
                  <div>
                    <Label className="text-gray-900 dark:text-white">Theme</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </p>
                  </div>
                </div>
                <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-900 dark:text-white">Font Size</Label>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{settings.fontSize}px</span>
                </div>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, fontSize: value }))}
                  min={12}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-purple-500" />
                  <div>
                    <Label className="text-gray-900 dark:text-white">Animations</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enable smooth transitions</p>
                  </div>
                </div>
                <Switch
                  checked={settings.animations}
                  onCheckedChange={() => handleToggle('animations')}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                  <div>
                    <Label className="text-gray-900 dark:text-white">Push Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive app notifications</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={() => handleToggle('notifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-green-500" />
                  <div>
                    <Label className="text-gray-900 dark:text-white">Email Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get updates via email</p>
                  </div>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-orange-500" />
                  <div>
                    <Label className="text-gray-900 dark:text-white">Sound Effects</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Play notification sounds</p>
                  </div>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={() => handleToggle('soundEffects')}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-purple-500" />
                  <div>
                    <Label className="text-gray-900 dark:text-white">Autoplay Videos</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Auto-play next lecture</p>
                  </div>
                </div>
                <Switch
                  checked={settings.autoplay}
                  onCheckedChange={() => handleToggle('autoplay')}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-white">Video Quality</Label>
                <select
                  value={settings.videoQuality}
                  onChange={(e) => setSettings(prev => ({ ...prev, videoQuality: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SD">SD (480p)</option>
                  <option value="HD">HD (720p)</option>
                  <option value="Full HD">Full HD (1080p)</option>
                  <option value="Auto">Auto</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-white">Language</Label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-green-500" />
                  <div>
                    <Label className="text-gray-900 dark:text-white">Low Data Mode</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Reduce data usage</p>
                  </div>
                </div>
                <Switch
                  checked={settings.dataUsage}
                  onCheckedChange={() => handleToggle('dataUsage')}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 space-y-3">
          <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 transition-all hover:scale-[1.02]">
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

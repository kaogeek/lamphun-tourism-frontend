
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Search, Trash, Edit, Image } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Mock data
const attractions = [
  {
    id: 1,
    name: {
      th: 'วัดพระธาตุหริภุญชัย',
      en: 'Wat Phra That Hariphunchai',
      cn: '哈里奔猜佛寺',
      jp: 'ワット・プラタート・ハリプンチャイ'
    },
    category: 'temple',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: {
      th: 'อุทยานแห่งชาติดอยขุนตาล',
      en: 'Doi Khun Tan National Park',
      cn: '堆昆丹国家公园',
      jp: 'ドイ・クンタン国立公園'
    },
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: {
      th: 'พิพิธภัณฑ์เมืองลำพูน',
      en: 'Lamphun Museum',
      cn: '南奔博物馆',
      jp: 'ランプーン博物館'
    },
    category: 'museum',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80'
  }
];

const events = [
  {
    id: 1,
    name: {
      th: 'เทศกาลลำไย',
      en: 'Longan Festival',
      cn: '龙眼节',
      jp: 'ロンガンフェスティバル'
    },
    date: '2025-08-15',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: {
      th: 'ประเพณีสรงน้ำพระธาตุหริภุญชัย',
      en: 'Haripunchai Bathing Ceremony',
      cn: '哈里奔猜浴佛仪式',
      jp: 'ハリプンチャイ水掛け祭り'
    },
    date: '2025-05-10',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80'
  }
];

const Admin: React.FC = () => {
  const { language } = useLanguage();
  const [attractionsData, setAttractionsData] = useState(attractions);
  const [eventsData, setEventsData] = useState(events);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form states
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filtered data
  const filteredAttractions = attractionsData.filter(attraction => 
    attraction.name[language as keyof typeof attraction.name]
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  
  const filteredEvents = eventsData.filter(event => 
    event.name[language as keyof typeof event.name]
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  
  // Mock handlers
  const handleDelete = (id: number, type: 'attraction' | 'event') => {
    if (type === 'attraction') {
      setAttractionsData(prev => prev.filter(item => item.id !== id));
    } else {
      setEventsData(prev => prev.filter(item => item.id !== id));
    }
  };
  
  return (
    <>
      <Navbar />
      
      <div className="container mt-32 mb-16">
        <h1 className="text-3xl font-bold mb-8">Content Management System</h1>
        
        <Tabs defaultValue="attractions">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          {/* Attractions Tab */}
          <TabsContent value="attractions">
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search attractions..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Attraction
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-4 py-3 text-left">Image</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Category</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttractions.map((attraction) => (
                      <tr key={attraction.id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100">
                            <img 
                              src={attraction.image} 
                              alt={attraction.name[language as keyof typeof attraction.name]}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {attraction.name[language as keyof typeof attraction.name]}
                        </td>
                        <td className="px-4 py-3">
                          <span className="capitalize">{attraction.category}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-destructive" 
                            onClick={() => handleDelete(attraction.id, 'attraction')}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredAttractions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No attractions found
                </div>
              )}
            </div>
            
            {/* Add/Edit Attraction Form */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">Add New Attraction</h2>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Name fields for each language */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Name (Thai)</label>
                        <Input placeholder="Enter name in Thai" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Name (English)</label>
                        <Input placeholder="Enter name in English" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Name (Chinese)</label>
                        <Input placeholder="Enter name in Chinese" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Name (Japanese)</label>
                        <Input placeholder="Enter name in Japanese" />
                      </div>
                      
                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select className="w-full h-10 px-3 border border-input rounded-md bg-background">
                          <option value="temple">Temple</option>
                          <option value="nature">Nature</option>
                          <option value="museum">Museum</option>
                          <option value="craft">Craft</option>
                          <option value="shopping">Shopping</option>
                        </select>
                      </div>
                      
                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <Input placeholder="Enter location" />
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Description fields for each language */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Description (Thai)</label>
                        <Textarea placeholder="Enter description in Thai" className="min-h-32" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Description (English)</label>
                        <Textarea placeholder="Enter description in English" className="min-h-32" />
                      </div>
                      
                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Images</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Image className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            Drag and drop images here, or click to select files
                          </p>
                          <Button variant="secondary" size="sm" className="mt-2">
                            Upload Images
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 space-x-3">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Attraction</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Events Tab */}
          <TabsContent value="events">
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search events..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Event
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-4 py-3 text-left">Image</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100">
                            <img 
                              src={event.image} 
                              alt={event.name[language as keyof typeof event.name]}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {event.name[language as keyof typeof event.name]}
                        </td>
                        <td className="px-4 py-3">
                          {format(new Date(event.date), 'MMM d, yyyy')}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-destructive" 
                            onClick={() => handleDelete(event.id, 'event')}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No events found
                </div>
              )}
            </div>
            
            {/* Add/Edit Event Form */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">Add New Event</h2>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Name fields for each language */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Name (Thai)</label>
                        <Input placeholder="Enter name in Thai" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Name (English)</label>
                        <Input placeholder="Enter name in English" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Name (Chinese)</label>
                        <Input placeholder="Enter name in Chinese" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Name (Japanese)</label>
                        <Input placeholder="Enter name in Japanese" />
                      </div>
                      
                      {/* Date Picker */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Event Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                              className="pointer-events-auto border"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <Input placeholder="Enter event location" />
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Description fields for each language */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Description (Thai)</label>
                        <Textarea placeholder="Enter description in Thai" className="min-h-32" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Description (English)</label>
                        <Textarea placeholder="Enter description in English" className="min-h-32" />
                      </div>
                      
                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Event Image</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Image className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            Drag and drop image here, or click to select file
                          </p>
                          <Button variant="secondary" size="sm" className="mt-2">
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 space-x-3">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Event</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </>
  );
};

export default Admin;

'use client';
import { useState } from 'react';
import { Video, MessageSquare, FileText } from 'lucide-react';

export default function Stream() {
  const [announcement, setAnnouncement] = useState('');

  const handleAnnouncement = async () => {
    if (!announcement.trim()) return;
    
    try {
      // TODO: Implement announcement posting to database
      console.log('Posting announcement:', announcement);
      setAnnouncement('');
    } catch (error) {
      console.error('Error posting announcement:', error);
    }
  };

  return (
    <main className="ml-64 pt-1 min-h-screen bg-gray-50 flex-1 max-w-full">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Top Widgets */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Google Meet Card */}
          <div className="bg-white rounded-lg shadow p-6 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Video className="h-6 w-6 text-blue-600" />
                <span className="ml-2 font-medium">Google Meet</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Join
              </button>
            </div>
          </div>

          {/* Announcement Box */}
          <div className="bg-white rounded-lg shadow p-6 w-full">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="Announce something to your class"
                className="w-full bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAnnouncement}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Post Stream */}
        <div className="space-y-6 w-full">
          {/* Example Post */}
          <div className="bg-white rounded-lg shadow w-full">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-lg">Critique Paper</h3>
                  <p className="text-gray-500 text-sm">Posted: April 2, 2025</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Assignment</span>
              </div>
              <p className="mt-4 text-gray-600">Write a critique paper about...</p>
            </div>
          </div>

          {/* Example Post with Attachment */}
          <div className="bg-white rounded-lg shadow w-full">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-lg">Software critique</h3>
                  <p className="text-gray-500 text-sm">Posted: March 12, 2025</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Assignment</span>
              </div>
              <div className="mt-4 flex items-center space-x-2 bg-gray-50 p-3 rounded">
                <FileText className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">software_critique.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

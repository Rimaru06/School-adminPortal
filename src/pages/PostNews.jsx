import React, { useState } from 'react';
import axios from 'axios';
import { Newspaper } from 'lucide-react';

const PostNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/news`, { title, content }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('News posted successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
      setMessage('Failed to post news. Please try again.');
    }
  };

  return (
    <div className="pt-16 flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="w-full max-w-lg px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-6 text-white">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                <Newspaper className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Post News</h2>
            <p className="text-center text-white/80 mt-1">
              Share the latest updates with your audience
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {message && (
              <div
                className={`mb-4 p-3 ${
                  message.includes('successfully')
                    ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                    : 'bg-red-50 border-l-4 border-red-500 text-red-700'
                } text-sm rounded`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter news title"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter news content"
                  rows="5"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Post News
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNews;
import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText } from 'lucide-react';

const UploadMandatoryDocument = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/mandatory/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Document uploaded successfully!');
      setTitle('');
      setFile(null);
    } catch (err) {
      console.error('Upload document error:', err);
      setMessage('Upload failed. Please try again.');
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
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Upload Mandatory Document</h2>
            <p className="text-center text-white/80 mt-1">
              Drag and drop a document or use the upload button below
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
                  placeholder="Enter document title"
                  required
                />
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <p className="text-gray-500 mb-2">
                  Drag and drop a Mandatory Document here, or click to select a file
                </p>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  {file ? file.name : 'Choose File'}
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMandatoryDocument;
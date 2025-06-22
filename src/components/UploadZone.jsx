import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import SubjectUpload from './SubjectUpload';

const UploadZone = ({ className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const fileInputRef = useRef(null);
  const { addDocument } = useApp();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'text/rtf'
      ];
      return validTypes.includes(file.type) && file.size <= 25 * 1024 * 1024; // 25MB limit
    });

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      setShowSubjectModal(true);
    }
  };

  const handleUploadWithSubjects = (uploadData) => {
    uploadData.files.forEach(fileData => {
      const document = {
        name: fileData.file.name,
        size: `${(fileData.file.size / 1024 / 1024).toFixed(1)} MB`,
        type: fileData.file.name.split('.').pop().toLowerCase(),
        uploadDate: 'Just now',
        Subjects: uploadData.Subjects
      };
      addDocument(document);
    });
    
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 backdrop-blur-sm ${
          isDragOver
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm ${
            isDragOver ? 'bg-indigo-100/70 dark:bg-indigo-900/70' : 'bg-gray-100/70 dark:bg-gray-700/70'
          }`}>
            <Upload className={`w-8 h-8 ${
              isDragOver ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'
            }`} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Drag & Drop or Click to Upload
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              PDF, DOCX, TXT (max 25MB)
            </p>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.rtf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Try Demo Button */}
      <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105">
        <span>🚀</span>
        <span>Try Demo</span>
      </button>

      {/* Subject Upload Modal */}
      <SubjectUpload
        isOpen={showSubjectModal}
        onClose={() => {
          setShowSubjectModal(false);
          setSelectedFiles([]);
        }}
        onUpload={handleUploadWithSubjects}
      />
    </div>
  );
};

export default UploadZone;
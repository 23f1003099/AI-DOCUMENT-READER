import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import SubjectUpload from './SubjectUpload';

const UploadZone = ({ className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [fileInputType, setFileInputType] = useState('');
  const [linkInput, setLinkInput] = useState('');
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
        'text/rtf',
      ];
      return validTypes.includes(file.type) && file.size <= 25 * 1024 * 1024;
    });

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      setFileInputType('file');
      setShowSubjectModal(true);
    }
  };

  const handleLinkSubmit = () => {
    const trimmed = linkInput.trim();
    const isValid = /^https?:\/\/.+/i.test(trimmed);

    if (isValid) {
      setSelectedFiles([{ name: trimmed }]);
      setFileInputType('link');
      setShowSubjectModal(true);
    } else {
      alert('Please enter a valid URL.');
    }
  };

  const handleUploadWithSubjects = (uploadData) => {
    if (fileInputType === 'file') {
      uploadData.files.forEach(fileData => {
        const document = {
          name: fileData.file.name,
          size: `${(fileData.file.size / 1024 / 1024).toFixed(1)} MB`,
          type: fileData.file.name.split('.').pop().toLowerCase(),
          uploadDate: 'Just now',
          Subjects: uploadData.Subjects,
        };
        addDocument(document);
      });
    } else if (fileInputType === 'link') {
      const document = {
        name: selectedFiles[0].name,
        size: '—',
        type: 'link',
        uploadDate: 'Just now',
        Subjects: uploadData.Subjects,
      };
      addDocument(document);
    }

    setSelectedFiles([]);
    setLinkInput('');
    setShowSubjectModal(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 
          ${isDragOver
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
            : 'border-zinc-300 dark:border-zinc-600 hover:border-emerald-400 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100/60 dark:hover:bg-zinc-700/50'
          }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all 
            ${isDragOver 
              ? 'bg-emerald-100/70 dark:bg-emerald-800/60' 
              : 'bg-zinc-100 dark:bg-zinc-700/60'
            }`}>
            <Upload className={`w-8 h-8 transition-colors 
              ${isDragOver 
                ? 'text-emerald-600 dark:text-emerald-300' 
                : 'text-zinc-500 dark:text-zinc-400'
              }`} />
          </div>

          <div>
            <p className="text-base font-semibold text-zinc-800 dark:text-white">
              Drag & Drop or Click to Upload
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
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

      {/* Link Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
          <LinkIcon className="w-4 h-4" />
          <span>Or paste a website or YouTube link</span>
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="https://youtube.com/..."
            className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleLinkSubmit}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow transition-all"
          >
            Add
          </button>
        </div>
      </div>

      {/* Demo Button */}
      <button className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105">
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
        files={fileInputType === 'file' ? selectedFiles.map(file => ({ file })) : []}
      />
    </div>
  );
};

export default UploadZone;

import React, { useState } from 'react';
import { X, Upload, FileText, Plus, Trash2, Edit3, Check } from 'lucide-react';

const SubjectUpload = ({ isOpen, onClose, onUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState('');

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Auto-generate Subject suggestions
    newFiles.forEach(file => {
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      addSubject(`Subject: ${baseName}`);
    });
  };

  const addSubject = (name = '') => {
    const newSubject = {
      id: Date.now() + Math.random(),
      name: name || `Subject ${Subjects.length + 1}`,
      pages: [1, 2, 3] // Default page range
    };
    setSubjects(prev => [...prev, newSubject]);
  };

  const updateSubject = (id, newName) => {
    setSubjects(prev => prev.map(ch => 
      ch.id === id ? { ...ch, name: newName } : ch
    ));
    setEditingSubject(null);
    setNewSubjectName('');
  };

  const deleteSubject = (id) => {
    setSubjects(prev => prev.filter(ch => ch.id !== id));
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0 || Subjects.length === 0) {
      alert('Please upload files and add Subjects');
      return;
    }

    const uploadData = {
      files: uploadedFiles,
      Subjects: Subjects
    };

    onUpload(uploadData);
    onClose();
    
    // Reset state
    setUploadedFiles([]);
    setSubjects([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/20 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-gray-700/20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload & Organize</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Upload documents and organize them into Subjects</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {/* File Upload Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Upload Documents</h3>
            
            {/* Upload Zone */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  PDF, DOC, DOCX, TXT (max 25MB each)
                </p>
              </label>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded Files</h4>
                {uploadedFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subject Organization */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Organize Subjects</h3>
              <button
                onClick={() => addSubject()}
                className="flex items-center space-x-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subject</span>
              </button>
            </div>

            {/* Subjects List */}
            <div className="space-y-2">
              {Subjects.map(Subject => (
                <div key={Subject.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {editingSubject === Subject.id ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                        className="flex-1 px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
                        placeholder="Subject name"
                        autoFocus
                      />
                      <button
                        onClick={() => updateSubject(Subject.id, newSubjectName)}
                        className="p-1 text-green-600 hover:text-green-700"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {Subject.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setEditingSubject(Subject.id);
                            setNewSubjectName(Subject.name);
                          }}
                          className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteSubject(Subject.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {Subjects.length === 0 && (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <p className="text-sm">No Subjects added yet</p>
                <p className="text-xs mt-1">Add Subjects to organize your document content</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/20 dark:border-gray-700/20">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploadedFiles.length === 0 || Subjects.length === 0}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-300 disabled:cursor-not-allowed"
          >
            Upload & Organize
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectUpload;
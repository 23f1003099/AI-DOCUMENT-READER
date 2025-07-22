// /components/DocumentPreviewPanel.jsx
import React from 'react';
import {
  FileText,
  Maximize2,
  Minimize2
} from 'lucide-react';

const DocumentPreviewPanel = ({
  previewCollapsed,
  setPreviewCollapsed,
  documentPreview,
  documents,
  documentSubjects,
  selectedDocument,
  selectedSubject,
  setSelectedDocument,
  setSelectedSubject,
  setHighlightedPage,
  highlightedPage
}) => {
  return (
    <div className={`fixed top-20 right-4 ${previewCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 z-40`}>
      <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            {!previewCollapsed && (
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Documents</h3>
              </div>
            )}
            <button
              onClick={() => setPreviewCollapsed(!previewCollapsed)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {previewCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {!previewCollapsed && (
          <>
            {documentPreview && (
              <div className="p-4 border-b border-white/20 dark:border-gray-700/20">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 mb-3">
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {documentPreview.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Page {documentPreview.currentPage} of {documentPreview.totalPages}
                    </div>
                    {highlightedPage && (
                      <div className="mt-2 px-2 py-1 bg-yellow-200 dark:bg-yellow-800 rounded text-xs text-yellow-800 dark:text-yellow-200">
                        Referenced in AI response
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="max-h-96 overflow-y-auto p-4">
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">{doc.name}</h4>
                    <div className="space-y-1">
                      {(documentSubjects[doc.name] || []).map((Subject) => (
                        <button
                          key={Subject.id}
                          onClick={() => {
                            setSelectedDocument(doc.name);
                            setSelectedSubject(Subject.id);
                            setHighlightedPage(Subject.pages[0]);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                            selectedDocument === doc.name && selectedSubject === Subject.id
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                              : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-600/50'
                          }`}
                        >
                          <div className="font-medium">{Subject.title}</div>
                          <div className={`text-xs ${
                            selectedDocument === doc.name && selectedSubject === Subject.id
                              ? 'text-white/70'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            Pages {Subject.pages.join(', ')}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentPreviewPanel;
import React from 'react';
import styles from './SnippetList.module.css';
import { Loader2, Code, FileText } from 'lucide-react';

// 1. Accept the new 'onSnippetClick' prop
function SnippetList({ snippets, isLoading, onSnippetClick }) {

  return (
    <main className={styles.snippetList}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader2 className={styles.spinner} size={24} />
          <span>Loading Snippets...</span>
        </div>
      ) : (
        <div className={styles.grid}>
          {snippets.length > 0 ? (
            snippets.map((snippet) => (
              // 2. Add the onClick handler to the card
              <div 
                key={snippet._id} 
                className={styles.snippetCard}
                onClick={() => onSnippetClick(snippet)}
              >
                <div className={styles.cardHeader}>
                  <Code size={18} className={styles.cardIcon} />
                  <h3 className={styles.cardTitle}>{snippet.title}</h3>
                </div>
                <p className={styles.cardDescription}>{snippet.description}</p>
                <div className={styles.cardLanguage}>{snippet.language}</div>
                <div className={styles.cardTags}>
                  {snippet.tags.map((tag) => (
                    <span key={tag._id} className={styles.tag}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noSnippets}>
              <FileText size={48} />
              <h3>No snippets yet</h3>
              <p>Click "New Snippet" to get started.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default SnippetList;
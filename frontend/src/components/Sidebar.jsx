import React from 'react';
import styles from './Sidebar.module.css';
import { Tag, Loader2 } from 'lucide-react';

// This is now a "dumb" component. It just displays the data it's given.
function Sidebar({ tags, isLoading }) {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <h3 className={styles.title}>Tags</h3>
        {isLoading ? (
          <div className={styles.loader}>
            <Loader2 className={styles.spinner} size={20} />
            <span>Loading Tags...</span>
          </div>
        ) : (
          <ul className={styles.tagList}>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <li key={tag._id} className={styles.tagItem}>
                  <Tag size={14} />
                  <span>{tag.name}</span>
                </li>
              ))
            ) : (
              <li className={styles.noTags}>No tags created yet.</li>
            )}
          </ul>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
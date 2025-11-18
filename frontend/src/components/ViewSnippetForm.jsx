import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import styles from './NewSnippetForm.module.css'; // We can reuse the same styles!
import FormInput from './FormInput';
import FormButton from './FormButton';
import { FileText, Type, Tag, Code, Edit, Trash } from 'lucide-react';

function ViewSnippetForm({ snippet, onDataRefresh, onClose }) {
  // 'isEditing' controls if we see the form or just text
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields, pre-filled with the snippet's data
  const [title, setTitle] = useState(snippet.title);
  const [content, setContent] = useState(snippet.content);
  const [language, setLanguage] = useState(snippet.language);
  const [description, setDescription] = useState(snippet.description || '');
  // Convert the array of tag *objects* back into a comma-separated *string*
  const [tags, setTags] = useState(snippet.tags.map(t => t.name).join(', '));

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    try {
      const updatedSnippet = {
        title,
        content,
        language,
        description,
        tags: tagsArray,
      };

      // This is our API call to UPDATE the snippet
      await axios.put(`/api/snippets/${snippet._id}`, updatedSnippet);

      toast.success('Snippet updated successfully!');
      onDataRefresh(); // Refresh the dashboard
      onClose(); // Close the modal

    } catch (err) {
      console.error('Failed to update snippet', err);
      toast.error(err.response?.data?.message || 'Failed to update snippet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    // Show a confirmation popup
    if (!window.confirm('Are you sure you want to delete this snippet?')) {
      return;
    }

    setIsLoading(true);
    try {
      // This is our API call to DELETE the snippet
      await axios.delete(`/api/snippets/${snippet._id}`);
      toast.success('Snippet deleted successfully.');
      onDataRefresh(); // Refresh the dashboard
      onClose(); // Close the modal
    } catch (err) {
      console.error('Failed to delete snippet', err);
      toast.error(err.response?.data?.message || 'Failed to delete snippet.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing) {
    // --- THIS IS THE "VIEW" MODE ---
    return (
      <div className={styles.viewMode}>
        <h3 className={styles.viewTitle}>{snippet.title}</h3>
        <p className={styles.viewLabel}>Language: <span>{snippet.language}</span></p>
        <p className={styles.viewLabel}>Description: <span>{snippet.description || 'N/A'}</span></p>
        <p className={styles.viewLabel}>Tags:</p>
        <div className={styles.viewTags}>
          {snippet.tags.map(tag => (
            <span key={tag._id} className={styles.viewTag}>{tag.name}</span>
          ))}
        </div>
        <p className={styles.viewLabel}>Content:</p>
        {/* We use <pre> to format the code correctly */}
        <pre className={styles.viewContent}>{snippet.content}</pre>
        
        <div className={styles.buttonGroup}>
          <FormButton onClick={() => setIsEditing(true)}>
            <Edit size={16} /> Edit
          </FormButton>
          <FormButton onClick={handleDelete} isLoading={isLoading} className={styles.deleteButton}>
            <Trash size={16} /> Delete
          </FormButton>
        </div>
      </div>
    );
  }

  // --- THIS IS THE "EDIT" MODE ---
  // We just reuse the NewSnippetForm markup!
  return (
    <form onSubmit={handleUpdate} className={styles.form}>
      <FormInput
        id="snippet-title"
        label="Title"
        type="text"
        icon={FileText}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="snippet-content" className={styles.label}>Code / Content</label>
      <textarea
        id="snippet-content"
        className={styles.textarea}
        rows="10"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className={styles.grid}>
        <FormInput
          id="snippet-language"
          label="Language"
          type="text"
          icon={Code}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <FormInput
          id="snippet-tags"
          label="Tags (comma-separated)"
          type="text"
          icon={Tag}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <FormInput
        id="snippet-description"
        label="Description (Optional)"
        type="text"
        icon={Type}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={styles.buttonWrapper}>
        <FormButton type="submit" isLoading={isLoading}>
          Save Changes
        </FormButton>
      </div>
    </form>
  );
}

export default ViewSnippetForm;
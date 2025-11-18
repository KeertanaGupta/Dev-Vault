import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import styles from './NewSnippetForm.module.css';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { FileText, Type, Tag, Code } from 'lucide-react';

// This component will receive a prop 'onSnippetCreated'
// to tell the dashboard to refresh its list.
function NewSnippetForm({ onSnippetCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(''); // We'll take tags as a comma-separated string
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth) {
      toast.error('You must be logged in to create a snippet.');
      return;
    }

    setIsLoading(true);

    // Convert the comma-separated string into an array
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    try {
      const newSnippet = {
        title,
        content,
        language,
        description,
        tags: tagsArray,
      };

      // This is our API call to CREATE the snippet
      const response = await axios.post('/api/snippets', newSnippet);

      toast.success('Snippet created successfully!');
      onSnippetCreated(); // This tells the dashboard to refresh and close the modal

    } catch (err) {
      console.error('Failed to create snippet', err);
      toast.error(err.response?.data?.message || 'Failed to create snippet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FormInput
        id="snippet-title"
        label="Title"
        type="text"
        placeholder="e.g., React Fetch Function"
        icon={FileText}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="snippet-content" className={styles.label}>
        Code / Content
      </label>
      <textarea
        id="snippet-content"
        className={styles.textarea}
        rows="10"
        placeholder="Paste your code snippet here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <div className={styles.grid}>
        <FormInput
          id="snippet-language"
          label="Language"
          type="text"
          placeholder="e.g., javascript"
          icon={Code}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <FormInput
          id="snippet-tags"
          label="Tags (comma-separated)"
          type="text"
          placeholder="e.g., react, api, fetch"
          icon={Tag}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <FormInput
        id="snippet-description"
        label="Description (Optional)"
        type="text"
        placeholder="What does this snippet do?"
        icon={Type}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <div className={styles.buttonWrapper}>
        <FormButton type="submit" isLoading={isLoading}>
          Create Snippet
        </FormButton>
      </div>
    </form>
  );
}

export default NewSnippetForm;
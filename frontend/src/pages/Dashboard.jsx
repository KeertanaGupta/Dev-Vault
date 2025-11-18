import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from './Dashboard.module.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SnippetList from '../components/SnippetList';
import Modal from '../components/Modal';
import ViewSnippetForm from '../components/ViewSnippetForm';

function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoadingSnippets, setIsLoadingSnippets] = useState(true);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const { auth } = useAuth();
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  // This is your data-fetching function (it's perfect)
  const refreshData = useCallback(async () => {
    setIsLoadingSnippets(true);
    setIsLoadingTags(true);
    try {
      const [snippetRes, tagRes] = await Promise.all([
        axios.get('/api/snippets'),
        axios.get('/api/tags'),
      ]);
      setSnippets(snippetRes.data);
      setTags(tagRes.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setIsLoadingSnippets(false);
      setIsLoadingTags(false);
    }
  }, []);

  // This is your "fetch on load" hook (it's perfect)
  useEffect(() => {
    if (auth) {
      refreshData();
    }
  }, [auth, refreshData]);

  //
  // --- THIS IS THE NEW "REAL-TIME" LISTENER ---
  //
  useEffect(() => {
    // Check if the Chrome runtime and messaging API are available
    if (window.chrome && chrome.runtime && chrome.runtime.onMessage) {
      
      // Create the listener function
      const messageListener = (message, sender, sendResponse) => {
        // If we get the "REFRESH_DATA" message from our extension...
        if (message.type === "REFRESH_DATA") {
          console.log("Refresh message received from extension!");
          // ...run our refreshData function!
          refreshData();
        }
      };

      // Add the listener
      chrome.runtime.onMessage.addListener(messageListener);

      // Clean up the listener when the component unmounts
      return () => {
        chrome.runtime.onMessage.removeListener(messageListener);
      };
    }
  }, [refreshData]); // Re-run if refreshData function changes

  // ... (all your other click handlers are perfect) ...
  const handleSnippetClick = (snippet) => {
    setSelectedSnippet(snippet);
  };

  const handleCloseModal = () => {
    setSelectedSnippet(null);
  };

  // ... (your return JSX is perfect) ...
  return (
    <div className={styles.dashboard}>
      <Header onDataRefresh={refreshData} />
      
      <div className={styles.mainContent}>
        <Sidebar tags={tags} isLoading={isLoadingTags} />
        <SnippetList 
          snippets={snippets} 
          isLoading={isLoadingSnippets}
          onSnippetClick={handleSnippetClick} 
        />
      </div>

      <Modal 
        isOpen={!!selectedSnippet} 
        onClose={handleCloseModal}
        title="Snippet Details"
      >
        {selectedSnippet && (
          <ViewSnippetForm 
            snippet={selectedSnippet}
            onDataRefresh={refreshData}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}

export default Dashboard;
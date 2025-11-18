import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { LogOut, Plus } from 'lucide-react';
import styles from './Header.module.css';
import Modal from './Modal';
import NewSnippetForm from './NewSnippetForm';

// 1. Accept 'onDataRefresh' as the new prop
function Header({ onDataRefresh }) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout');
      setAuth(null);
      navigate('/auth');
      toast.success('Logged out successfully');
    } catch (err) {
      console.error('Logout failed', err);
      toast.error('Logout failed. Please try again.');
    }
  };

  // 2. This function is called by the form on success
  const handleSnippetCreated = () => {
    setIsModalOpen(false); // Close the modal
    onDataRefresh();        // Call the single refresh function
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Dev Vault</span>
        </div>
        <div className={styles.userInfo}>
          <button 
            className={styles.newSnippetButton} 
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            <span>New Snippet</span>
          </button>
          
          <span className={styles.welcome}>Welcome, {auth?.name}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create New Snippet"
      >
        <NewSnippetForm onSnippetCreated={handleSnippetCreated} />
      </Modal>
    </>
  );
}

export default Header;
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profileData, setProfileData] = useState({
    username: 'Player',
    email: 'player@metameet.com',
    userId: 'MM' + Math.random().toString(36).substring(2, 11).toUpperCase(),
    avatarUrl: '',
    bio: 'Exploring the MetaMeet universe!',
    joinedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempBio, setTempBio] = useState(profileData.bio);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      // Clear user data
      localStorage.removeItem('token');
      alert('Account deleted successfully');
      navigate('/');
    } else {
      alert('Please type DELETE to confirm');
    }
  };

  const copyUserId = () => {
    navigator.clipboard.writeText(profileData.userId);
    alert('User ID copied to clipboard!');
  };

  const saveBio = () => {
    setProfileData({ ...profileData, bio: tempBio });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="pixel-grid"></div>
      
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="profile-content">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <span className="back-arrow">←</span> Back to Dashboard
        </button>

        <div className="profile-header">
          <h1 className="profile-title glitch" data-text="USER PROFILE">USER PROFILE</h1>
        </div>

        <div className="profile-grid">
          {/* Avatar Section */}
          <div className="profile-card avatar-card">
            <h2 className="card-title">
              <span className="title-bracket">[</span>
              AVATAR
              <span className="title-bracket">]</span>
            </h2>
            
            <div className="avatar-section">
              <div className="avatar-preview">
                {profileData.avatarUrl ? (
                  <img src={profileData.avatarUrl} alt="Profile" className="avatar-image" />
                ) : (
                  <div className="avatar-placeholder">
                    <span className="placeholder-icon">👤</span>
                  </div>
                )}
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              <button 
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="btn-icon">📷</span>
                Upload Picture
              </button>
              
              <p className="upload-hint">Max size: 5MB • JPG, PNG, GIF</p>
            </div>
          </div>

          {/* User Info Section */}
          <div className="profile-card info-card">
            <h2 className="card-title">
              <span className="title-bracket">[</span>
              USER INFO
              <span className="title-bracket">]</span>
            </h2>
            
            <div className="info-grid">
              <div className="info-item">
                <label className="info-label">Username</label>
                <div className="info-value">{profileData.username}</div>
              </div>
              
              <div className="info-item">
                <label className="info-label">Email</label>
                <div className="info-value">{profileData.email}</div>
              </div>
              
              <div className="info-item">
                <label className="info-label">User ID</label>
                <div className="info-value user-id">
                  <span className="id-text">{profileData.userId}</span>
                  <button className="copy-btn" onClick={copyUserId} title="Copy User ID">
                    📋
                  </button>
                </div>
              </div>
              
              <div className="info-item">
                <label className="info-label">Member Since</label>
                <div className="info-value">{profileData.joinedDate}</div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="profile-card bio-card">
            <h2 className="card-title">
              <span className="title-bracket">[</span>
              BIO
              <span className="title-bracket">]</span>
            </h2>
            
            {isEditing ? (
              <div className="bio-edit">
                <textarea
                  className="bio-textarea"
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  maxLength={200}
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
                <div className="bio-actions">
                  <button className="save-btn" onClick={saveBio}>
                    💾 Save
                  </button>
                  <button className="cancel-btn" onClick={() => {
                    setTempBio(profileData.bio);
                    setIsEditing(false);
                  }}>
                    ✕ Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bio-display">
                <p className="bio-text">{profileData.bio}</p>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Bio
                </button>
              </div>
            )}
          </div>

          {/* Privacy Section */}
          <div className="profile-card privacy-card">
            <h2 className="card-title">
              <span className="title-bracket">[</span>
              PRIVACY
              <span className="title-bracket">]</span>
            </h2>
            
            <div className="privacy-options">
              <div className="privacy-item">
                <label className="privacy-label">
                  <input type="checkbox" defaultChecked />
                  <span>Show profile to others</span>
                </label>
              </div>
              <div className="privacy-item">
                <label className="privacy-label">
                  <input type="checkbox" defaultChecked />
                  <span>Allow friend requests</span>
                </label>
              </div>
              <div className="privacy-item">
                <label className="privacy-label">
                  <input type="checkbox" />
                  <span>Private spaces only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="profile-card danger-card">
            <h2 className="card-title danger-title">
              <span className="title-bracket">[</span>
              DANGER ZONE
              <span className="title-bracket">]</span>
            </h2>
            
            <div className="danger-content">
              <p className="danger-warning">
                ⚠️ These actions are permanent and cannot be undone
              </p>
              
              <button 
                className="danger-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                🗑️ Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDeleteModal(false)}>✕</button>
            
            <div className="modal-header">
              <h2 className="modal-title">⚠️ DELETE ACCOUNT</h2>
              <p className="modal-subtitle">This action cannot be undone!</p>
            </div>

            <div className="modal-body">
              <p className="delete-warning">
                Deleting your account will:
              </p>
              <ul className="delete-list">
                <li>Permanently remove all your data</li>
                <li>Delete all your created spaces</li>
                <li>Remove you from all friend lists</li>
                <li>Cannot be recovered</li>
              </ul>
              
              <div className="confirm-input-group">
                <label className="confirm-label">
                  Type <strong>DELETE</strong> to confirm:
                </label>
                <input
                  type="text"
                  className="confirm-input"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-cancel" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-delete"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="corner-ui top-left">
        <div className="ui-bracket"></div>
      </div>
      <div className="corner-ui top-right">
        <div className="ui-bracket"></div>
      </div>
      <div className="corner-ui bottom-left">
        <div className="ui-bracket"></div>
      </div>
      <div className="corner-ui bottom-right">
        <div className="ui-bracket"></div>
      </div>
    </div>
  );
};

export default Profile;

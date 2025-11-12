import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

interface Space {
  id: string;
  name: string;
  thumbnail: string;
  lastVisited?: string;
  userCount: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'visited' | 'created'>('visited');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [newSpaceDescription, setNewSpaceDescription] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [spaces, setSpaces] = useState<Space[]>([
    {
      id: '1',
      name: 'Campus Hangout',
      thumbnail: '/space1.png',
      lastVisited: 'today',
      userCount: 5
    }
  ]);

  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpaceClick = () => {
    navigate('/arena');
  };

  const handleCreateSpace = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setNewSpaceName('');
    setNewSpaceDescription('');
  };

  const handleSubmitSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpaceName.trim()) {
      alert('Please enter a space name');
      return;
    }

    const newSpace: Space = {
      id: String(spaces.length + 1),
      name: newSpaceName,
      thumbnail: '/new-space.png',
      lastVisited: 'just now',
      userCount: 0
    };

    setSpaces([newSpace, ...spaces]);
    handleCloseModal();
  };

  const handleDeleteSpace = (spaceId: string) => {
    setSpaces(spaces.filter(space => space.id !== spaceId));
    setOpenMenuId(null);
  };

  const toggleMenu = (spaceId: string) => {
    setOpenMenuId(openMenuId === spaceId ? null : spaceId);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId) {
        setOpenMenuId(null);
      }
      if (showProfileDropdown) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuId, showProfileDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="pixel-grid"></div>
      
      <div className="floating-particles">
        {[...Array(10)].map((_, i) => (
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

      <nav className="dashboard-nav">
        <div className="nav-left">
          <div className="logo-section">
            <div className="logo-icon">🎮</div>
            <span className="logo-text">MetaMeet</span>
          </div>
          
          <div className="nav-links">
            <button className="nav-link active">
              <span className="nav-icon">🏠</span>
              My Spaces
            </button>
          </div>
        </div>

        <div className="nav-right">
          <div className="user-profile-container">
            <div 
              className="user-profile"
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileDropdown(!showProfileDropdown);
              }}
            >
              <div className="user-avatar">👤</div>
              <span className="user-name">Player</span>
              <span className="dropdown-arrow">{showProfileDropdown ? '▲' : '▼'}</span>
            </div>

            {showProfileDropdown && (
              <div className="profile-dropdown">
                <button className="profile-menu-item" onClick={() => navigate('/profile')}>
                  <span className="menu-item-icon">👤</span>
                  Profile
                </button>
                <button className="profile-menu-item" onClick={() => navigate('/settings')}>
                  <span className="menu-item-icon">⚙️</span>
                  Settings
                </button>
                <div className="dropdown-divider"></div>
                <button className="profile-menu-item logout-item" onClick={handleLogout}>
                  <span className="menu-item-icon">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>

          <button className="create-space-btn" onClick={handleCreateSpace}>
            <span className="plus-icon">+</span>
            Create Space
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="content-wrapper">
          <div className="tabs-section">
            <button
              className={`tab-button ${activeTab === 'visited' ? 'active' : ''}`}
              onClick={() => setActiveTab('visited')}
            >
              Last Visited
            </button>
            <button
              className={`tab-button ${activeTab === 'created' ? 'active' : ''}`}
              onClick={() => setActiveTab('created')}
            >
              Created Spaces
            </button>

            <div className="search-section">
              <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="spaces-grid">
            {filteredSpaces.map((space) => (
              <div
                key={space.id}
                className="space-card"
                onClick={handleSpaceClick}
              >
                <div className="space-thumbnail">
                  <div className="thumbnail-placeholder">
                    <div className="room-preview">
                      <div className="room-element room-floor"></div>
                      <div className="room-element room-wall"></div>
                      <div className="room-element room-furniture"></div>
                      <div className="room-element room-pond"></div>
                    </div>
                  </div>
                  
                  <div className="user-count-badge">
                    <span className="user-icon">👥</span>
                    {space.userCount}
                  </div>
                </div>

                <div className="space-info">
                  <h3 className="space-name">{space.name}</h3>
                </div>

                <div className="space-menu">
                  <button 
                    className="space-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(space.id);
                    }}
                  >
                    ⋮
                  </button>
                  
                  {openMenuId === space.id && (
                    <div className="space-menu-dropdown">
                      <button 
                        className="menu-item delete-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSpace(space.id);
                        }}
                      >
                        <span className="menu-icon">🗑️</span>
                        Delete Space
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="space-card create-new-card" onClick={handleCreateSpace}>
              <div className="create-new-content">
                <div className="create-new-icon">+</div>
                <span className="create-new-text">Create New Space</span>
              </div>
            </div>
          </div>
        </div>
      </main>

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

      {showCreateModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="modal-header">
              <h2 className="modal-title glitch" data-text="CREATE SPACE">CREATE SPACE</h2>
              <p className="modal-subtitle">Design your virtual meeting room</p>
            </div>

            <form className="space-form" onSubmit={handleSubmitSpace}>
              <div className="form-group">
                <label htmlFor="spaceName" className="form-label">
                  <span className="label-bracket">[</span>
                  SPACE NAME
                  <span className="label-bracket">]</span>
                </label>
                <input
                  type="text"
                  id="spaceName"
                  value={newSpaceName}
                  onChange={(e) => setNewSpaceName(e.target.value)}
                  className="form-input"
                  placeholder="e.g., Team Hangout, Study Room"
                  required
                  maxLength={50}
                />
                <div className="input-line"></div>
              </div>

              <div className="form-group">
                <label htmlFor="spaceDescription" className="form-label">
                  <span className="label-bracket">[</span>
                  DESCRIPTION
                  <span className="label-bracket">]</span>
                  <span className="optional-label">(optional)</span>
                </label>
                <textarea
                  id="spaceDescription"
                  value={newSpaceDescription}
                  onChange={(e) => setNewSpaceDescription(e.target.value)}
                  className="form-textarea"
                  placeholder="Describe what this space is for..."
                  rows={4}
                  maxLength={200}
                />
                <div className="input-line"></div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-create">
                  <span className="btn-icon">+</span>
                  Create Space
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

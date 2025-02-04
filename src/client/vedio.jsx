import React from 'react';
import './stylevedio.css';

const VideoListPage = () => {
  const videos = [
    {
      id: 1,
      title: 'Les bases de la conduite',
      duration: '15:30',
      videoId: 'iTHyDzlJeTg',
    },
    {
      id: 2,
      title: 'Le créneau parfait',
      duration: '12:45',
      videoId: 'MhWnUBuz4v4',
    },
    {
      id: 3,
      title: 'Conduite en ville',
      duration: '18:20',
      videoId: 'mbD01_YVn3E',
    },
    {
      id: 4,
      title: 'Conduite en ville',
      duration: '18:20',
      videoId: 'Vb87tW59mFk',
    },
    {
      id: 5,
      title: 'Conduite en ville',
      duration: '18:20',
      videoId: 'r9qgWB4imEI',
    },
    {
      id: 6,
      title: 'Conduite en ville',
      duration: '18:20',
      videoId: 'xhfdlETaAAA',
    },
  ];

  return (
    <div className="video-list-container">
      <h1 className="video-list-title">Cours de conduite en ligne</h1>
      
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
              <div className="video-thumbnail">
                <img src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} alt={video.title} />
                <div className="play-overlay">
                  <i className="fas fa-play"></i>
                </div>
                <span className="video-duration">{video.duration}</span>
              </div>
            </a>
            <h3 className="video-title">{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoListPage;

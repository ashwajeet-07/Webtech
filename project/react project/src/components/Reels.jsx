import { useState } from 'react';

function Reels() {
  const [reelTitle, setReelTitle] = useState('');
  const [reels, setReels] = useState([]);

  const handleAddReel = (e) => {
    e.preventDefault();
    if (!reelTitle) return;

    setReels([...reels, { id: Date.now(), title: reelTitle }]);
    setReelTitle('');
  };

  return (
    <div className="card">
      <h3>My Reels</h3>
      <form onSubmit={handleAddReel} className="inline-form">
        <input 
          type="text" 
          value={reelTitle} 
          onChange={(e) => setReelTitle(e.target.value)} 
          placeholder="Enter reel title or link"
        />
        <button type="submit" className="btn-add">Add Reel</button>
      </form>

      <ul className="simple-list">
        {reels.map((reel) => (
          <li key={reel.id}>{reel.title}</li>
        ))}
        {reels.length === 0 && <li>No reels added yet.</li>}
      </ul>
    </div>
  );
}

export default Reels;

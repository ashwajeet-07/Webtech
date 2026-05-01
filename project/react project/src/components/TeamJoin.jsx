import { useState } from 'react';

function TeamJoin() {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('Photographer');
  const [applicants, setApplicants] = useState([]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!name) return;

    const newApplicant = {
      id: Date.now(),
      name,
      skill
    };

    setApplicants([...applicants, newApplicant]);
    setName('');
  };

  return (
    <div className="card">
      <h3>Join My Team</h3>
      <form onSubmit={handleJoin}>
        <div className="form-group">
          <label>Your Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label>Your Skill:</label>
          <select value={skill} onChange={(e) => setSkill(e.target.value)}>
            <option value="Photographer">Photographer</option>
            <option value="Editor">Editor</option>
            <option value="Videographer">Videographer</option>
          </select>
        </div>
        <button type="submit" className="btn-add">Apply Now</button>
      </form>

      <h4>Applicants:</h4>
      <ul className="simple-list">
        {applicants.map((app) => (
          <li key={app.id}>
            <strong>{app.name}</strong> - {app.skill}
          </li>
        ))}
        {applicants.length === 0 && <li>No applicants yet.</li>}
      </ul>
    </div>
  );
}

export default TeamJoin;

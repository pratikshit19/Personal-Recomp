import React, { useState, useEffect } from 'react';
import { workoutDays, meals, routineMorning, routineEvening, tips, timelineSteps } from './data/appData';

function App() {
  const [activeTab, setActiveTab] = useState('workout');
  const [activeWeek, setActiveWeek] = useState(1);
  const [routineType, setRoutineType] = useState('morning');
  const [weekChecks, setWeekChecks] = useState(() => {
    const saved = localStorage.getItem('recomp_weekChecks');
    return saved ? JSON.parse(saved) : {};
  });
  const [progressLogs, setProgressLogs] = useState(() => {
    const saved = localStorage.getItem('recomp_progressLogs');
    return saved ? JSON.parse(saved) : {};
  });
  const [openDays, setOpenDays] = useState({});
  const [openMeals, setOpenMeals] = useState({});

  useEffect(() => {
    localStorage.setItem('recomp_weekChecks', JSON.stringify(weekChecks));
  }, [weekChecks]);

  useEffect(() => {
    localStorage.setItem('recomp_progressLogs', JSON.stringify(progressLogs));
  }, [progressLogs]);

  const updateLog = (field, value) => {
    setProgressLogs(prev => ({
      ...prev,
      [activeWeek]: {
        ...prev[activeWeek],
        [field]: value
      }
    }));
  };

  const toggleCheck = (week, day, e) => {
    e.stopPropagation();
    const key = `w${week}_${day}`;
    setWeekChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.keys(weekChecks).filter(k => k.startsWith(`w${activeWeek}_`) && weekChecks[k]).length;
  const progressPercent = (completedCount / 6) * 100;

  const renderWorkout = () => (
    <div className="panel active">
      <div className="progress-wrap">
        <div className="progress-label">
          <span>Weekly Progress</span>
          <span>{completedCount} / 6 sessions</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="week-nav">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(w => (
          <button 
            key={w} 
            className={`week-btn ${activeWeek === w ? 'active' : ''}`}
            onClick={() => setActiveWeek(w)}
          >
            Week {w}
          </button>
        ))}
      </div>

      <div className="day-grid">
        {workoutDays.map((day, idx) => (
          <div key={idx} className="day-card">
            <div className="day-header" onClick={() => setOpenDays(prev => ({...prev, [idx]: !prev[idx]}))}>
              <div className="day-label">
                <div className="day-name">{day.name}</div>
                <div className={`day-type type-${day.typeClass}`}>{day.type}</div>
              </div>
              {!day.isRest && (
                <div 
                  className={`checkbox ${weekChecks[`w${activeWeek}_${day.name}`] ? 'checked' : ''}`}
                  onClick={(e) => toggleCheck(activeWeek, day.name, e)}
                ></div>
              )}
            </div>
            {openDays[idx] && (
              <div className="day-body">
                <ul className="exercise-list">
                  {day.exercises.map((ex, i) => (
                    <li key={i} className="exercise-item">
                      <span className="ex-name">{ex.name}</span>
                      <span className="ex-sets">{ex.sets}</span>
                    </li>
                  ))}
                </ul>
                {day.cardio && <div className="cardio-note">{day.cardio}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderRoutine = () => {
    const data = routineType === 'morning' ? routineMorning : routineEvening;
    return (
      <div className="panel active">
        <div className="sub-tabs">
          <button 
            className={`sub-tab ${routineType === 'morning' ? 'active' : ''}`}
            onClick={() => setRoutineType('morning')}
          >
            Morning Gym
          </button>
          <button 
            className={`sub-tab ${routineType === 'evening' ? 'active' : ''}`}
            onClick={() => setRoutineType('evening')}
          >
            Evening Gym
          </button>
        </div>
        <div className="timeline">
          {data.map((item, i) => (
            <div key={i} className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-week">{item.time}</div>
              <div className="tl-title">{item.icon} {item.activity}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMeals = () => (
    <div className="panel active">
      {meals.map((m, i) => (
        <div key={i} className="meal-day">
          <div className="meal-day-header" onClick={() => setOpenMeals(prev => ({...prev, [i]: !prev[i]}))}>
            <div className="meal-day-name">{m.day}</div>
            <div className="meal-day-kcal"><span>{m.kcal}</span></div>
          </div>
          {openMeals[i] && (
            <div className="meal-day-body">
              {m.meals.map((row, j) => (
                <div key={j} className="meal-row">
                  <div className="meal-time">{row.time}</div>
                  <div className="meal-info">
                    <div className="meal-food">{row.food}</div>
                    <div className="meal-macros">{row.macros}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderTimeline = () => (
    <div className="panel active">
      <div className="timeline">
        {timelineSteps.map((s, i) => (
          <div key={i} className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-week">{s.week}</div>
            <div className="tl-title">{s.title}</div>
            <div className="tl-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProgress = () => {
    const currentLog = progressLogs[activeWeek] || { weight: '', waist: '' };
    return (
      <div className="panel active">
        <div className="progress-card">
          <div className="card-header">
            <h3>Week {activeWeek} Sunday Log</h3>
            <p>Log your stats every Sunday morning (empty stomach)</p>
          </div>
          <div className="input-grid">
            <div className="input-group">
              <label>Weight (kg)</label>
              <input 
                type="number" 
                placeholder="00.0"
                value={currentLog.weight} 
                onChange={(e) => updateLog('weight', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Waist (cm)</label>
              <input 
                type="number" 
                placeholder="00"
                value={currentLog.waist} 
                onChange={(e) => updateLog('waist', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="history-section">
          <h3>Transformation History</h3>
          <div className="history-list">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(w => {
              const log = progressLogs[w];
              if (!log || (!log.weight && !log.waist)) return null;
              return (
                <div key={w} className="history-item">
                  <div className="hist-week">W{w}</div>
                  <div className="hist-data">
                    <span>{log.weight || '--'} kg</span>
                    <span>{log.waist || '--'} cm</span>
                  </div>
                  {w > 1 && progressLogs[w-1] && (
                    <div className="hist-change">
                      {log.weight && progressLogs[w-1].weight && (
                        <span className={log.weight < progressLogs[w-1].weight ? 'loss' : 'gain'}>
                          {(log.weight - progressLogs[w-1].weight).toFixed(1)} kg
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderTips = () => (
    <div className="panel active">
      <div className="tips-grid">
        {tips.map((t, i) => (
          <div key={i} className="tip-card">
            <div className="tip-icon">{t.icon}</div>
            <div className="tip-title">{t.title}</div>
            <div className="tip-text">{t.text}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <header>
        <div className="header-tag">📍 Personalized Routine: 5:50 AM Wake Up | {routineType === 'morning' ? 'Morning Gym' : 'Evening Gym'}</div>
        <h1>30–60 DAY<span>BELLY FAT DESTROYER</span></h1>
        <div className="header-stats">
          <div className="stat"><strong>5–6x</strong>Weekly Sessions</div>
          <div className="stat"><strong>2,050</strong>Daily Kcal Target</div>
          <div className="stat"><strong>160g</strong>Daily Protein</div>
          <div className="stat"><strong>PPL×2</strong>Training Split</div>
        </div>
      </header>

      <div className="tabs">
        <button className={`tab ${activeTab === 'workout' ? 'active' : ''}`} onClick={() => setActiveTab('workout')}>Workout Tracker</button>
        <button className={`tab ${activeTab === 'routine' ? 'active' : ''}`} onClick={() => setActiveTab('routine')}>Daily Schedule</button>
        <button className={`tab ${activeTab === 'meals' ? 'active' : ''}`} onClick={() => setActiveTab('meals')}>Meal Plan</button>
        <button className={`tab ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>Timeline</button>
        <button className={`tab ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>Progress Log</button>
        <button className={`tab ${activeTab === 'tips' ? 'active' : ''}`} onClick={() => setActiveTab('tips')}>Key Rules</button>
      </div>

      <div className="content">
        {activeTab === 'workout' && renderWorkout()}
        {activeTab === 'routine' && renderRoutine()}
        {activeTab === 'meals' && renderMeals()}
        {activeTab === 'timeline' && renderTimeline()}
        {activeTab === 'progress' && renderProgress()}
        {activeTab === 'tips' && renderTips()}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { workoutDays, mealsMorning, mealsEvening, routineMorning, routineEvening, tips, timelineSteps } from './data/appData';

function App() {
  const [activeTab, setActiveTab] = useState('workout');
  const [activeWeek, setActiveWeek] = useState(1);
  const [routineType, setRoutineType] = useState(() => {
    const saved = localStorage.getItem('recomp_routineType');
    return saved || 'morning';
  });
  const meals = routineType === 'morning' ? mealsMorning : mealsEvening;
  
  const [kcalTarget, setKcalTarget] = useState(() => {
    const saved = localStorage.getItem('recomp_kcalTarget');
    return saved ? parseInt(saved, 10) : 2050;
  });
  
  const [proteinTarget, setProteinTarget] = useState(() => {
    const saved = localStorage.getItem('recomp_proteinTarget');
    return saved ? parseInt(saved, 10) : 160;
  });

  const [weekChecks, setWeekChecks] = useState(() => {
    const saved = localStorage.getItem('recomp_weekChecks');
    return saved ? JSON.parse(saved) : {};
  });

  const [progressLogs, setProgressLogs] = useState(() => {
    const saved = localStorage.getItem('recomp_progressLogs');
    return saved ? JSON.parse(saved) : {};
  });

  const [exerciseChecks, setExerciseChecks] = useState(() => {
    const saved = localStorage.getItem('recomp_exerciseChecks');
    return saved ? JSON.parse(saved) : {};
  });

  const [morningSchedule, setMorningSchedule] = useState(() => {
    const saved = localStorage.getItem('recomp_morningSchedule');
    return saved ? JSON.parse(saved) : routineMorning;
  });

  const [eveningSchedule, setEveningSchedule] = useState(() => {
    const saved = localStorage.getItem('recomp_eveningSchedule');
    return saved ? JSON.parse(saved) : routineEvening;
  });

  const [openDays, setOpenDays] = useState({});
  const [openMeals, setOpenMeals] = useState({});
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [resetConfirm, setResetConfirm] = useState(false);
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);

  useEffect(() => {
    localStorage.setItem('recomp_routineType', routineType);
  }, [routineType]);

  useEffect(() => {
    localStorage.setItem('recomp_kcalTarget', kcalTarget);
  }, [kcalTarget]);

  useEffect(() => {
    localStorage.setItem('recomp_proteinTarget', proteinTarget);
  }, [proteinTarget]);

  useEffect(() => {
    localStorage.setItem('recomp_weekChecks', JSON.stringify(weekChecks));
  }, [weekChecks]);

  useEffect(() => {
    localStorage.setItem('recomp_progressLogs', JSON.stringify(progressLogs));
  }, [progressLogs]);

  useEffect(() => {
    localStorage.setItem('recomp_exerciseChecks', JSON.stringify(exerciseChecks));
  }, [exerciseChecks]);

  useEffect(() => {
    localStorage.setItem('recomp_morningSchedule', JSON.stringify(morningSchedule));
  }, [morningSchedule]);

  useEffect(() => {
    localStorage.setItem('recomp_eveningSchedule', JSON.stringify(eveningSchedule));
  }, [eveningSchedule]);

  const updateScheduleItem = (index, field, value) => {
    triggerSaveStatus();
    if (routineType === 'morning') {
      setMorningSchedule(prev => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        return next;
      });
    } else {
      setEveningSchedule(prev => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        return next;
      });
    }
  };

  const resetScheduleToDefault = () => {
    if (confirm("Reset current schedule timings to default?")) {
      triggerSaveStatus();
      if (routineType === 'morning') {
        setMorningSchedule(routineMorning);
      } else {
        setEveningSchedule(routineEvening);
      }
    }
  };

  const triggerSaveStatus = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('Saved');
    }, 600);
  };

  const updateLog = (field, value) => {
    triggerSaveStatus();
    setProgressLogs(prev => ({
      ...prev,
      [activeWeek]: {
        ...prev[activeWeek],
        [field]: value
      }
    }));
  };

  const toggleCheck = (week, dayName, e) => {
    e.stopPropagation();
    const key = `w${week}_${dayName}`;
    const nextVal = !weekChecks[key];
    
    setWeekChecks(prev => ({ ...prev, [key]: nextVal }));
    
    // Check/uncheck all exercises for this day
    const dayData = workoutDays.find(d => d.name === dayName);
    if (dayData && dayData.exercises) {
      setExerciseChecks(prev => {
        const nextChecks = { ...prev };
        dayData.exercises.forEach((ex, i) => {
          nextChecks[`w${week}_${dayName}_${i}`] = nextVal;
        });
        return nextChecks;
      });
    }
  };

  const toggleExerciseCheck = (week, dayName, exerciseIdx) => {
    const key = `w${week}_${dayName}_${exerciseIdx}`;
    const nextVal = !exerciseChecks[key];
    
    setExerciseChecks(prev => {
      const nextChecks = { ...prev, [key]: nextVal };
      
      // Update parent day state automatically if all exercises are checked
      const dayData = workoutDays.find(d => d.name === dayName);
      if (dayData && dayData.exercises) {
        const allChecked = dayData.exercises.every((ex, i) => nextChecks[`w${week}_${dayName}_${i}`]);
        setWeekChecks(weekPrev => ({
          ...weekPrev,
          [`w${week}_${dayName}`]: allChecked
        }));
      }
      
      return nextChecks;
    });
  };

  const getDayProgress = (week, day) => {
    if (day.isRest || !day.exercises || day.exercises.length === 0) return null;
    const completed = day.exercises.filter((ex, i) => exerciseChecks[`w${week}_${day.name}_${i}`]).length;
    return { completed, total: day.exercises.length };
  };

  const getWeekCompletionCount = (week) => {
    return Object.keys(weekChecks).filter(k => k.startsWith(`w${week}_`) && weekChecks[k]).length;
  };

  const completedCount = getWeekCompletionCount(activeWeek);
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map(w => {
          const compCount = getWeekCompletionCount(w);
          const isComplete = compCount >= 6;
          return (
            <button 
              key={w} 
              className={`week-btn ${activeWeek === w ? 'active' : ''} ${isComplete ? 'week-complete' : ''}`}
              onClick={() => setActiveWeek(w)}
            >
              Week {w} {isComplete && '✓'}
            </button>
          );
        })}
      </div>

      <div className="day-grid">
        {workoutDays.map((day, idx) => {
          const prog = getDayProgress(activeWeek, day);
          return (
            <div key={idx} className="day-card">
              <div className="day-header" onClick={() => setOpenDays(prev => ({...prev, [idx]: !prev[idx]}))}>
                <div className="day-label">
                  <div className="day-name">{day.name}</div>
                  <div className={`day-type type-${day.typeClass}`}>{day.type}</div>
                  {prog && (
                    <span className="day-prog-badge">{prog.completed} / {prog.total}</span>
                  )}
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
                    {day.exercises.map((ex, i) => {
                      const isExChecked = !!exerciseChecks[`w${activeWeek}_${day.name}_${i}`];
                      return (
                        <li 
                          key={i} 
                          className={`exercise-item clickable ${isExChecked ? 'checked' : ''}`}
                          onClick={() => toggleExerciseCheck(activeWeek, day.name, i)}
                        >
                          <div className="ex-details">
                            <span className="ex-checkbox"></span>
                            <span className="ex-name">{ex.name}</span>
                          </div>
                          <span className="ex-sets">{ex.sets}</span>
                        </li>
                      );
                    })}
                  </ul>
                  {day.cardio && <div className="cardio-note">{day.cardio}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderRoutine = () => {
    const data = routineType === 'morning' ? morningSchedule : eveningSchedule;
    return (
      <div className="panel active">
        <div className="sub-tabs-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          <div className="sub-tabs" style={{ marginBottom: 0 }}>
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
          <div className="schedule-actions-group" style={{ display: 'flex', gap: 8 }}>
            <button 
              className="action-btn" 
              onClick={() => setIsEditingSchedule(!isEditingSchedule)}
              style={{ padding: '6px 12px', fontSize: 12 }}
            >
              {isEditingSchedule ? '💾 Save Timings' : '⚙️ Edit Timings'}
            </button>
            {isEditingSchedule && (
              <button 
                className="action-btn outline-danger-btn" 
                onClick={resetScheduleToDefault}
                style={{ padding: '6px 12px', fontSize: 12 }}
              >
                Reset Default
              </button>
            )}
          </div>
        </div>

        <div className="timeline">
          {data.map((item, i) => (
            <div key={i} className="tl-item">
              <div className="tl-dot"></div>
              {isEditingSchedule ? (
                <div className="tl-edit-row" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', width: '100%', marginBottom: 12 }}>
                  <input 
                    type="text" 
                    value={item.time} 
                    className="tl-edit-input time-input"
                    onChange={(e) => updateScheduleItem(i, 'time', e.target.value)}
                    style={{ flex: '0 0 100px', minWidth: '80px' }}
                    placeholder="Time"
                  />
                  <input 
                    type="text" 
                    value={item.icon} 
                    className="tl-edit-input icon-input"
                    onChange={(e) => updateScheduleItem(i, 'icon', e.target.value)}
                    style={{ flex: '0 0 40px', textAlign: 'center' }}
                    placeholder="Icon"
                  />
                  <input 
                    type="text" 
                    value={item.activity} 
                    className="tl-edit-input activity-input"
                    onChange={(e) => updateScheduleItem(i, 'activity', e.target.value)}
                    style={{ flex: '1 1 200px' }}
                    placeholder="Activity"
                  />
                </div>
              ) : (
                <>
                  <div className="tl-week">{item.time}</div>
                  <div className="tl-title">{item.icon} {item.activity}</div>
                </>
              )}
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

  const getBaselineStats = () => {
    for (let w = 1; w <= 8; w++) {
      const log = progressLogs[w];
      if (log && (log.weight || log.waist)) {
        return {
          week: w,
          weight: parseFloat(log.weight) || null,
          waist: parseFloat(log.waist) || null
        };
      }
    }
    return null;
  };

  const getChartData = () => {
    const data = [];
    for (let w = 1; w <= 8; w++) {
      const log = progressLogs[w];
      if (log && (log.weight || log.waist)) {
        data.push({
          week: w,
          weight: parseFloat(log.weight) || null,
          waist: parseFloat(log.waist) || null
        });
      }
    }
    return data;
  };

  const handleExport = () => {
    const backupData = {
      routineType,
      kcalTarget,
      proteinTarget,
      weekChecks,
      exerciseChecks,
      progressLogs,
      morningSchedule,
      eveningSchedule
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recomp_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.weekChecks && imported.progressLogs) {
          if (imported.routineType) setRoutineType(imported.routineType);
          if (imported.kcalTarget) setKcalTarget(imported.kcalTarget);
          if (imported.proteinTarget) setProteinTarget(imported.proteinTarget);
          if (imported.morningSchedule) setMorningSchedule(imported.morningSchedule);
          if (imported.eveningSchedule) setEveningSchedule(imported.eveningSchedule);
          
          setWeekChecks(imported.weekChecks);
          setProgressLogs(imported.progressLogs);
          setExerciseChecks(imported.exerciseChecks || {});
          
          triggerSaveStatus();
          alert('Data imported successfully!');
        } else {
          alert('Invalid backup file structure.');
        }
      } catch (err) {
        alert('Failed to parse backup file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleResetChallenge = () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      return;
    }
    
    localStorage.removeItem('recomp_weekChecks');
    localStorage.removeItem('recomp_progressLogs');
    localStorage.removeItem('recomp_exerciseChecks');
    localStorage.removeItem('recomp_routineType');
    localStorage.removeItem('recomp_kcalTarget');
    localStorage.removeItem('recomp_proteinTarget');
    localStorage.removeItem('recomp_morningSchedule');
    localStorage.removeItem('recomp_eveningSchedule');
    
    setWeekChecks({});
    setProgressLogs({});
    setExerciseChecks({});
    setRoutineType('morning');
    setKcalTarget(2050);
    setProteinTarget(160);
    setMorningSchedule(routineMorning);
    setEveningSchedule(routineEvening);
    setResetConfirm(false);
    
    alert('All progress logs, checked exercises, custom schedules, and settings have been completely reset.');
  };

  const renderTrendChart = () => {
    const data = getChartData();
    if (data.length < 2) return null;
    
    const weights = data.map(d => d.weight).filter(w => w !== null);
    const waists = data.map(d => d.waist).filter(w => w !== null);
    
    const minWeight = weights.length ? Math.min(...weights) - 1 : 0;
    const maxWeight = weights.length ? Math.max(...weights) + 1 : 100;
    const minWaist = waists.length ? Math.min(...waists) - 1 : 0;
    const maxWaist = waists.length ? Math.max(...waists) + 1 : 100;
    
    const width = 500;
    const height = 150;
    const padding = 30;
    
    const getX = (week) => padding + ((week - 1) / 7) * (width - 2 * padding);
    
    const getWeightY = (val) => {
      if (val === null || maxWeight === minWeight) return height / 2;
      return height - padding - ((val - minWeight) / (maxWeight - minWeight)) * (height - 2 * padding);
    };
    
    const getWaistY = (val) => {
      if (val === null || maxWaist === minWaist) return height / 2;
      return height - padding - ((val - minWaist) / (maxWaist - minWaist)) * (height - 2 * padding);
    };
    
    let weightPath = '';
    let waistPath = '';
    
    // Sort chronologically and build paths
    const sorted = [...data].sort((a,b) => a.week - b.week);
    sorted.forEach((d, idx) => {
      const x = getX(d.week);
      if (d.weight !== null) {
        const y = getWeightY(d.weight);
        weightPath += `${weightPath === '' ? 'M' : 'L'} ${x} ${y} `;
      }
      if (d.waist !== null) {
        const y = getWaistY(d.waist);
        waistPath += `${waistPath === '' ? 'M' : 'L'} ${x} ${y} `;
      }
    });
    
    return (
      <div className="chart-card">
        <h3>Recomp Trends</h3>
        <p style={{ marginBottom: 12 }}>Weight (<span style={{ color: 'var(--green)' }}>● green</span>) vs Waist (<span style={{ color: 'var(--accent)' }}>● yellow</span>) trends</p>
        <div className="chart-container">
          <svg viewBox={`0 0 ${width} ${height}`} className="trend-svg" width="100%" height="100%">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(w => {
              const x = getX(w);
              return (
                <g key={w}>
                  <line 
                    x1={x} 
                    y1={padding} 
                    x2={x} 
                    y2={height - padding} 
                    stroke="var(--border)" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                  />
                  <text 
                    x={x} 
                    y={height - 8} 
                    fill="var(--muted)" 
                    fontSize="10" 
                    textAnchor="middle"
                  >
                    W{w}
                  </text>
                </g>
              );
            })}
            
            {weightPath && (
              <path 
                d={weightPath} 
                fill="none" 
                stroke="var(--green)" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            )}
            {waistPath && (
              <path 
                d={waistPath} 
                fill="none" 
                stroke="var(--accent)" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            )}
            
            {sorted.map((d, idx) => {
              const x = getX(d.week);
              return (
                <g key={idx}>
                  {d.weight !== null && (
                    <circle 
                      cx={x} 
                      cy={getWeightY(d.weight)} 
                      r="4" 
                      fill="var(--green)" 
                      stroke="var(--bg)" 
                      strokeWidth="1.5"
                    />
                  )}
                  {d.waist !== null && (
                    <circle 
                      cx={x} 
                      cy={getWaistY(d.waist)} 
                      r="4" 
                      fill="var(--accent)" 
                      stroke="var(--bg)" 
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  const renderProgress = () => {
    const currentLog = progressLogs[activeWeek] || { weight: '', waist: '' };
    const baseline = getBaselineStats();
    const chartData = getChartData();
    const hasLogs = chartData.length > 0;
    
    return (
      <div className="panel active">
        <div className="progress-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h3>Week {activeWeek} Sunday Log</h3>
              <p>Log your stats every Sunday morning (empty stomach)</p>
            </div>
            <span className={`save-indicator ${saveStatus === 'Saving...' ? 'saving' : 'saved'}`}>
              {saveStatus === 'Saving...' ? '● Syncing...' : '✓ Auto-saved'}
            </span>
          </div>
          <div className="input-grid">
            <div className="input-group">
              <label>Weight (kg)</label>
              <input 
                type="number" 
                placeholder="00.0"
                step="0.1"
                value={currentLog.weight} 
                onChange={(e) => updateLog('weight', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Waist (cm)</label>
              <input 
                type="number" 
                placeholder="00"
                step="0.5"
                value={currentLog.waist} 
                onChange={(e) => updateLog('waist', e.target.value)}
              />
            </div>
          </div>
        </div>

        {renderTrendChart()}

        <div className="settings-card">
          <div className="card-header">
            <h3>Custom Recomp Targets</h3>
            <p>Customize your daily calorie and protein goals shown in the header</p>
          </div>
          <div className="input-grid">
            <div className="input-group">
              <label>Daily Calorie Target (kcal)</label>
              <input 
                type="number" 
                placeholder="2050"
                value={kcalTarget} 
                onChange={(e) => {
                  triggerSaveStatus();
                  setKcalTarget(e.target.value === '' ? '' : parseInt(e.target.value, 10));
                }}
              />
            </div>
            <div className="input-group">
              <label>Daily Protein Target (g)</label>
              <input 
                type="number" 
                placeholder="160"
                value={proteinTarget} 
                onChange={(e) => {
                  triggerSaveStatus();
                  setProteinTarget(e.target.value === '' ? '' : parseInt(e.target.value, 10));
                }}
              />
            </div>
          </div>
        </div>

        <div className="history-section">
          <h3>Transformation History</h3>
          {!hasLogs ? (
            <div className="empty-history">
              <div className="empty-icon">📊</div>
              <h4>No logged stats yet</h4>
              <p>Log your Sunday morning weight and waist above to track your progress and view your trend chart.</p>
            </div>
          ) : (
            <div className="history-list">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(w => {
                const log = progressLogs[w];
                if (!log || (!log.weight && !log.waist)) return null;
                
                const weightVal = parseFloat(log.weight);
                const waistVal = parseFloat(log.waist);
                
                let weightChangeFromPrev = null;
                if (w > 1 && progressLogs[w-1]) {
                  const prevWeight = parseFloat(progressLogs[w-1].weight);
                  if (!isNaN(weightVal) && !isNaN(prevWeight)) {
                    weightChangeFromPrev = weightVal - prevWeight;
                  }
                }
                
                let weightCumulative = null;
                let waistCumulative = null;
                if (baseline && baseline.week < w) {
                  if (!isNaN(weightVal) && baseline.weight !== null) {
                    weightCumulative = weightVal - baseline.weight;
                  }
                  if (!isNaN(waistVal) && baseline.waist !== null) {
                    waistCumulative = waistVal - baseline.waist;
                  }
                }
                
                return (
                  <div key={w} className="history-item">
                    <div className="hist-week">W{w}</div>
                    <div className="hist-data">
                      <div className="hist-data-row">
                        <strong>Weight:</strong> {!isNaN(weightVal) ? `${weightVal} kg` : '--'}
                        {weightChangeFromPrev !== null && (
                          <span className={`hist-badge ${weightChangeFromPrev < 0 ? 'loss' : weightChangeFromPrev > 0 ? 'gain' : 'neutral'}`}>
                            {weightChangeFromPrev < 0 ? '' : '+'}{weightChangeFromPrev.toFixed(1)} kg this week
                          </span>
                        )}
                        {weightCumulative !== null && (
                          <span className={`hist-badge-total ${weightCumulative < 0 ? 'loss' : weightCumulative > 0 ? 'gain' : 'neutral'}`}>
                            (Total: {weightCumulative < 0 ? '' : '+'}{weightCumulative.toFixed(1)} kg)
                          </span>
                        )}
                      </div>
                      <div className="hist-data-row">
                        <strong>Waist:</strong> {!isNaN(waistVal) ? `${waistVal} cm` : '--'}
                        {waistCumulative !== null && (
                          <span className={`hist-badge-total ${waistCumulative < 0 ? 'loss' : waistCumulative > 0 ? 'gain' : 'neutral'}`}>
                            (Total: {waistCumulative < 0 ? '' : '+'}{waistCumulative.toFixed(1)} cm)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="settings-card" style={{ marginTop: 32 }}>
          <div className="card-header">
            <h3>Backup & Data Portability</h3>
            <p>Export your tracking logs to a JSON file or restore from a backup</p>
          </div>
          <div className="btn-group">
            <button className="action-btn" onClick={handleExport}>
              📥 Export Backup
            </button>
            <label className="action-btn file-label">
              📤 Import Backup
              <input 
                type="file" 
                accept=".json" 
                onChange={handleImport} 
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div style={{ marginTop: 24, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            <p style={{ color: 'var(--accent2)', marginBottom: 12, fontWeight: 700, fontSize: 13 }}>Danger Zone</p>
            {resetConfirm ? (
              <div className="reset-confirm-box" style={{ background: 'rgba(255, 77, 46, 0.05)', border: '1px solid rgba(255, 77, 46, 0.2)', padding: 16, borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text)', display: 'block', marginBottom: 8 }}>Are you absolutely sure? This will delete all checks, targets, and weights.</span>
                <div className="btn-group" style={{ gap: 8 }}>
                  <button className="action-btn danger-btn" onClick={handleResetChallenge}>
                    Yes, Reset All
                  </button>
                  <button className="action-btn" onClick={() => setResetConfirm(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button className="action-btn outline-danger-btn" onClick={handleResetChallenge}>
                ⚠️ Reset All Tracker Data
              </button>
            )}
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
        <div className="header-tag-container">
          <span className="header-tag-label">📍 Personalized Routine: 5:50 AM Wake Up</span>
          <button 
            className="routine-header-toggle"
            onClick={() => setRoutineType(routineType === 'morning' ? 'evening' : 'morning')}
          >
            🔄 {routineType === 'morning' ? 'Morning Gym' : 'Evening Gym'}
          </button>
        </div>
        <h1>30–60 DAY<span>BELLY FAT DESTROYER</span></h1>
        <div className="header-stats">
          <div className="stat"><strong>5–6x</strong>Weekly Sessions</div>
          <div className="stat"><strong>{kcalTarget || 2050}</strong>Daily Kcal Target</div>
          <div className="stat"><strong>{proteinTarget || 160}g</strong>Daily Protein</div>
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

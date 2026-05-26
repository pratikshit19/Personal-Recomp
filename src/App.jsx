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

  const [completedSets, setCompletedSets] = useState(() => {
    const saved = localStorage.getItem('recomp_completedSets');
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

  // Gym Session Companion states (System clock-anchored for robust PWA background tracking)
  const [isSessionActive, setIsSessionActive] = useState(() => {
    const saved = localStorage.getItem('recomp_isSessionActive');
    return saved === 'true';
  });

  const [breakSeconds, setBreakSeconds] = useState(0);
  const [breakDuration, setBreakDuration] = useState(90);
  const [timerActiveDayIdx, setTimerActiveDayIdx] = useState(() => {
    const today = new Date().getDay();
    const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Map calendar days to workout days index
    return dayMap[today];
  });

  const [strictTimeTarget, setStrictTimeTarget] = useState(() => {
    const saved = localStorage.getItem('recomp_strictTimeTarget');
    return saved ? parseInt(saved, 10) : 50;
  });

  const [strictTimeRemaining, setStrictTimeRemaining] = useState(0);

  const [strictCurrentExIdx, setStrictCurrentExIdx] = useState(() => {
    const saved = localStorage.getItem('recomp_strictCurrentExIdx');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [strictCurrentSet, setStrictCurrentSet] = useState(() => {
    const saved = localStorage.getItem('recomp_strictCurrentSet');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [strictState, setStrictState] = useState(() => {
    const saved = localStorage.getItem('recomp_strictState');
    return saved || 'ready';
  });

  const [sessionStartTime, setSessionStartTime] = useState(() => {
    const saved = localStorage.getItem('recomp_sessionStartTime');
    return saved ? parseInt(saved, 10) : null;
  });

  const [breakEndTime, setBreakEndTime] = useState(() => {
    const saved = localStorage.getItem('recomp_breakEndTime');
    return saved ? parseInt(saved, 10) : null;
  });

  useEffect(() => {
    localStorage.setItem('recomp_isSessionActive', String(isSessionActive));
  }, [isSessionActive]);

  useEffect(() => {
    localStorage.setItem('recomp_strictCurrentExIdx', String(strictCurrentExIdx));
  }, [strictCurrentExIdx]);

  useEffect(() => {
    localStorage.setItem('recomp_strictCurrentSet', String(strictCurrentSet));
  }, [strictCurrentSet]);

  useEffect(() => {
    localStorage.setItem('recomp_strictState', strictState);
  }, [strictState]);

  useEffect(() => {
    if (sessionStartTime) {
      localStorage.setItem('recomp_sessionStartTime', String(sessionStartTime));
    } else {
      localStorage.removeItem('recomp_sessionStartTime');
    }
  }, [sessionStartTime]);

  useEffect(() => {
    if (breakEndTime) {
      localStorage.setItem('recomp_breakEndTime', String(breakEndTime));
    } else {
      localStorage.removeItem('recomp_breakEndTime');
    }
  }, [breakEndTime]);

  useEffect(() => {
    localStorage.setItem('recomp_strictTimeTarget', String(strictTimeTarget));
  }, [strictTimeTarget]);

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
    localStorage.setItem('recomp_completedSets', JSON.stringify(completedSets));
  }, [completedSets]);

  useEffect(() => {
    localStorage.setItem('recomp_morningSchedule', JSON.stringify(morningSchedule));
  }, [morningSchedule]);

  useEffect(() => {
    localStorage.setItem('recomp_eveningSchedule', JSON.stringify(eveningSchedule));
  }, [eveningSchedule]);



  // Optimal break timer countdown logic
  useEffect(() => {
    let interval = null;
    if (breakSeconds > 0) {
      interval = setInterval(() => {
        setBreakSeconds(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [breakSeconds]);

  // HTML5 Web Speech Synthesis API voice synthesizer (muted/disabled as requested)
  const speakNotification = (text) => {
    // Vocal notifications disabled
  };

  // Guided session timer synchronization loop (system clock based - pocket proof!)
  useEffect(() => {
    let interval = null;
    if (isSessionActive && (strictState === 'lifting' || strictState === 'resting')) {
      const syncClocks = () => {
        const now = Date.now();
        
        // 1. Overall workout timer calculation
        if (sessionStartTime) {
          const elapsed = Math.floor((now - sessionStartTime) / 1000);
          const remaining = Math.max(0, strictTimeTarget * 60 - elapsed);
          setStrictTimeRemaining(remaining);
          
          if (remaining <= 0) {
            setStrictState('timesup');
            setIsSessionActive(false);
            setSessionStartTime(null);
            setBreakEndTime(null);
            setBreakSeconds(0);
            return;
          }
        }

        // 2. Rest break timer calculation
        if (strictState === 'resting' && breakEndTime) {
          const breakRemaining = Math.max(0, Math.ceil((breakEndTime - now) / 1000));
          setBreakSeconds(breakRemaining);
        }
      };

      syncClocks();
      interval = setInterval(syncClocks, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, strictState, sessionStartTime, breakEndTime, strictTimeTarget]);

  // Guided session rest countdown transition logic
  useEffect(() => {
    if (isSessionActive && strictState === 'resting' && breakSeconds === 0) {
      const activeDayData = workoutDays[timerActiveDayIdx];
      if (activeDayData && activeDayData.exercises) {
        const ex = activeDayData.exercises[strictCurrentExIdx];
        const totalSets = parseSetsCount(ex.sets);

        if (strictCurrentSet < totalSets) {
          const nextSet = strictCurrentSet + 1;
          setStrictCurrentSet(nextSet);
          setStrictState('lifting');
          setBreakEndTime(null);
          speakNotification(`Rest is over! Resume your workout. Start Set ${nextSet}.`);
        } else {
          // Finished all sets for current exercise, transition to first set of next exercise
          const nextExIdx = strictCurrentExIdx + 1;
          if (nextExIdx < activeDayData.exercises.length) {
            setStrictCurrentExIdx(nextExIdx);
            setStrictCurrentSet(1);
            setStrictState('lifting');
            setBreakEndTime(null);
            speakNotification(`Rest is over! Resume your workout. First set of ${activeDayData.exercises[nextExIdx].name}.`);
          } else {
            // All exercises complete
            setStrictState('completed');
            setIsSessionActive(false);
            setSessionStartTime(null);
            setBreakEndTime(null);
            const timeTakenMins = Math.floor((strictTimeTarget * 60 - strictTimeRemaining) / 60);
            speakNotification(`Congratulations! You have completed your workout in ${timeTakenMins} minutes. Excellent job!`);
          }
        }
      }
    }
  }, [breakSeconds, strictState, isSessionActive]);

  const handleStrictSetDone = () => {
    const activeDayData = workoutDays[timerActiveDayIdx];
    if (!activeDayData || !activeDayData.exercises) return;

    const ex = activeDayData.exercises[strictCurrentExIdx];
    const totalSets = parseSetsCount(ex.sets);
    const key = `w${activeWeek}_${activeDayData.name}_${strictCurrentExIdx}`;

    // Log this set completed in global completedSets
    setCompletedSets(prev => ({ ...prev, [key]: strictCurrentSet }));

    if (strictCurrentSet < totalSets) {
      // Start rest countdown (absolute system timestamp anchored)
      const now = Date.now();
      const endTime = now + breakDuration * 1000;
      setBreakEndTime(endTime);
      setBreakSeconds(breakDuration);
      setStrictState('resting');
      speakNotification(`Set ${strictCurrentSet} complete. Rest for ${breakDuration} seconds.`);
    } else {
      // Final set finished! Mark this exercise complete in global checklist
      setExerciseChecks(prev => {
        const nextChecks = { ...prev, [key]: true };

        // Update parent day state automatically if all exercises are complete
        const allChecked = activeDayData.exercises.every((e, i) => {
          const exKey = `w${activeWeek}_${activeDayData.name}_${i}`;
          return exKey === key ? true : nextChecks[exKey];
        });

        setWeekChecks(weekPrev => ({
          ...weekPrev,
          [`w${activeWeek}_${activeDayData.name}`]: allChecked
        }));

        return nextChecks;
      });

      const nextExIdx = strictCurrentExIdx + 1;
      if (nextExIdx < activeDayData.exercises.length) {
        // Start rest transition break (absolute system timestamp anchored)
        const now = Date.now();
        const endTime = now + breakDuration * 1000;
        setBreakEndTime(endTime);
        setBreakSeconds(breakDuration);
        setStrictState('resting');
        speakNotification(`Exercise complete! Take a transition break. Next exercise is ${activeDayData.exercises[nextExIdx].name}.`);
      } else {
        // All exercises complete!
        setStrictState('completed');
        setIsSessionActive(false);
        setSessionStartTime(null);
        setBreakEndTime(null);
        const timeTakenMins = Math.floor((strictTimeTarget * 60 - strictTimeRemaining) / 60);
        speakNotification(`Congratulations! You have completed your workout in ${timeTakenMins} minutes. Excellent job!`);
      }
    }
  };

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

  const parseSetsCount = (setsStr) => {
    if (!setsStr) return 0;
    const match = setsStr.match(/^(\d+)/); // Match the first number
    const count = match ? parseInt(match[1], 10) : 3;
    return Math.min(3, count); // Capped at max 3 sets per exercise
  };

  const formatSetsDisplay = (setsStr) => {
    if (!setsStr) return '';
    const match = setsStr.match(/^(\d+)/);
    if (match) {
      const count = parseInt(match[1], 10);
      if (count > 3) {
        return setsStr.replace(/^(\d+)/, '3');
      }
    }
    return setsStr;
  };

  const handleSetClick = (dayName, exerciseIdx, setNum, totalSets) => {
    const key = `w${activeWeek}_${dayName}_${exerciseIdx}`;
    const previousDone = completedSets[key] || 0;

    let nextDone = setNum;
    if (previousDone === setNum) {
      nextDone = setNum - 1; // Decrement if they clicked the same highest set to undo
    }

    setCompletedSets(prev => ({ ...prev, [key]: nextDone }));

    // Auto-trigger break timer if they incremented completed sets
    if (nextDone > previousDone) {
      setBreakSeconds(breakDuration);
    }

    const isComplete = nextDone >= totalSets;
    setExerciseChecks(prev => {
      const nextChecks = { ...prev, [key]: isComplete };

      // Update parent day state automatically if all exercises are complete
      const dayData = workoutDays.find(d => d.name === dayName);
      if (dayData && dayData.exercises) {
        const allChecked = dayData.exercises.every((ex, i) => {
          const exKey = `w${activeWeek}_${dayName}_${i}`;
          const exTotal = parseSetsCount(ex.sets);
          const exDone = exKey === key ? nextDone : (completedSets[exKey] || 0);
          return exDone >= exTotal;
        });

        setWeekChecks(weekPrev => ({
          ...weekPrev,
          [`w${activeWeek}_${dayName}`]: allChecked
        }));
      }

      return nextChecks;
    });
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

      setCompletedSets(prev => {
        const nextSets = { ...prev };
        dayData.exercises.forEach((ex, i) => {
          const exKey = `w${week}_${dayName}_${i}`;
          const totalSets = parseSetsCount(ex.sets);
          nextSets[exKey] = nextVal ? totalSets : 0;
        });
        return nextSets;
      });
    }
  };

  const toggleExerciseCheck = (week, dayName, exerciseIdx) => {
    const key = `w${week}_${dayName}_${exerciseIdx}`;
    const dayData = workoutDays.find(d => d.name === dayName);
    if (!dayData) return;

    const ex = dayData.exercises[exerciseIdx];
    const totalSets = parseSetsCount(ex.sets);
    const wasChecked = !!exerciseChecks[key];
    const nextVal = !wasChecked;

    setCompletedSets(prev => ({
      ...prev,
      [key]: nextVal ? totalSets : 0
    }));

    setExerciseChecks(prev => {
      const nextChecks = { ...prev, [key]: nextVal };

      // Update parent day state automatically if all exercises are checked
      const allChecked = dayData.exercises.every((ex, i) => nextChecks[`w${week}_${dayName}_${i}`]);
      setWeekChecks(weekPrev => ({
        ...weekPrev,
        [`w${week}_${dayName}`]: allChecked
      }));

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

  const formatTime = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return [
      hrs > 0 ? String(hrs).padStart(2, '0') : null,
      String(mins).padStart(2, '0'),
      String(secs).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  const formatDurationMinSec = (totalSecs) => {
    if (totalSecs < 0) return '0s';
    const mins = Math.floor(totalSecs / 60);
    const secs = Math.round(totalSecs % 60);
    if (mins === 0) return `${secs}s`;
    if (secs === 0) return `${mins}m`;
    return `${mins}m ${secs}s`;
  };

  const getStrictPacingMetrics = () => {
    const activeDayData = workoutDays[timerActiveDayIdx];
    if (!activeDayData || activeDayData.isRest || !activeDayData.exercises) return null;

    const totalSets = activeDayData.exercises.reduce((sum, ex) => sum + parseSetsCount(ex.sets), 0);
    const totalBreaks = Math.max(0, totalSets - 1);
    const totalRestSeconds = totalBreaks * breakDuration;
    const totalSessionSeconds = strictTimeTarget * 60;
    const liftingSeconds = totalSessionSeconds - totalRestSeconds;
    const secondsPerSet = totalSets > 0 ? liftingSeconds / totalSets : 0;

    return {
      totalSets,
      totalBreaks,
      totalRestSeconds,
      liftingSeconds,
      secondsPerSet,
      exercises: activeDayData.exercises.map(ex => {
        const setsCount = parseSetsCount(ex.sets);
        const exBreaks = Math.max(0, setsCount - 1);
        const exTimeSeconds = (setsCount * secondsPerSet) + (exBreaks * breakDuration);
        return {
          name: ex.name,
          setsCount,
          timeSeconds: exTimeSeconds
        };
      })
    };
  };

  const renderWorkoutTimer = () => {
    const activeDayData = workoutDays[timerActiveDayIdx];
    const activeEx = activeDayData?.exercises?.[strictCurrentExIdx];
    const strictProgressExDone = strictState === 'completed' ? activeDayData?.exercises?.length : strictCurrentExIdx;

    return (
      <div className="timer-card-wrapper" style={{ marginBottom: 32 }}>
        <div className="timer-card strict-guided">
          <div className="timer-header">
            <h3>⏱️ Gym Session Companion</h3>
            {isSessionActive && <span className="session-status-pulse">● Session Active</span>}
          </div>

          {strictState === 'ready' ? (
            <div className="strict-ready-panel" style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
                Set your training window and select a workout. Once started, the timer locks in and guides you set-by-set, automatically pacing your lifting and resting periods.
              </p>
              <div className="strict-setup-row" style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
                <div className="input-group" style={{ flex: '0 0 130px', textAlign: 'left' }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)' }}>TARGET TIMELINE</label>
                  <select
                    value={strictTimeTarget}
                    onChange={(e) => setStrictTimeTarget(parseInt(e.target.value, 10))}
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '10px', color: 'var(--text)', borderRadius: '8px', fontSize: 13, cursor: 'pointer', width: '100%' }}
                  >
                    <option value={30}>30 minutes</option>
                    <option value={40}>40 minutes</option>
                    <option value={50}>50 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={75}>75 minutes</option>
                  </select>
                </div>
                <div className="input-group" style={{ flex: '0 0 130px', textAlign: 'left' }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)' }}>REST BREAK</label>
                  <select
                    value={breakDuration}
                    onChange={(e) => setBreakDuration(parseInt(e.target.value, 10))}
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '10px', color: 'var(--text)', borderRadius: '8px', fontSize: 13, cursor: 'pointer', width: '100%' }}
                  >
                    <option value={60}>60s</option>
                    <option value={90}>90s</option>
                    <option value={120}>120s</option>
                  </select>
                </div>
                <div className="input-group" style={{ flex: '0 0 170px', textAlign: 'left' }}>
                  <label style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)' }}>ACTIVE WORKOUT</label>
                  <select
                    value={timerActiveDayIdx}
                    onChange={(e) => setTimerActiveDayIdx(parseInt(e.target.value, 10))}
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '10px', color: 'var(--text)', borderRadius: '8px', fontSize: 13, cursor: 'pointer', width: '100%' }}
                  >
                    {workoutDays.map((d, idx) => (
                      <option key={idx} value={idx}>{d.name} ({d.type})</option>
                    ))}
                  </select>
                </div>
              </div>
              {(() => {
                if (activeDayData?.isRest) return null;
                const metrics = getStrictPacingMetrics();
                if (!metrics) return null;

                const isTighterThanAllowed = metrics.liftingSeconds < 0;

                if (isTighterThanAllowed) {
                  return (
                    <div className="strict-pacing-container" style={{ borderColor: 'var(--accent)', background: 'rgba(232, 255, 60, 0.04)', margin: '0 auto 24px', maxWidth: '480px' }}>
                      <div className="strict-pacing-title" style={{ color: 'var(--accent)' }}>
                        <span>⚠️ REST LIMIT EXCEEDED</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'left', lineHeight: 1.5 }}>
                        Your rest periods alone ({formatDurationMinSec(metrics.totalRestSeconds)}) exceed your target session duration ({strictTimeTarget}m). Select a longer workout window or shorten your rest duration above.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="strict-pacing-container" style={{ margin: '0 auto 24px', maxWidth: '480px' }}>
                    <div className="strict-pacing-title">
                      <span>📊 RECOMMENDED PACING BUDGET</span>
                      <span style={{ color: 'var(--green)' }}>✓ CALCULATED</span>
                    </div>

                    <div className="strict-pacing-summary">
                      <div className="pacing-stat-box">
                        <div className="pacing-stat-val">{formatDurationMinSec(metrics.liftingSeconds)}</div>
                        <div className="pacing-stat-lbl">Lifting Time</div>
                      </div>
                      <div className="pacing-stat-box" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                        <div className="pacing-stat-val">{formatDurationMinSec(metrics.totalRestSeconds)}</div>
                        <div className="pacing-stat-lbl">Rest Breaks</div>
                      </div>
                      <div className="pacing-stat-box">
                        <div className="pacing-stat-val">{formatDurationMinSec(metrics.secondsPerSet)}</div>
                        <div className="pacing-stat-lbl">Per Set Pace</div>
                      </div>
                    </div>

                    <div className="strict-pacing-breakdown" style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                      {metrics.exercises.map((ex, exIdx) => (
                        <div key={exIdx} className="pacing-ex-row">
                          <span className="pacing-ex-name" style={{ fontSize: 12 }}>
                            {exIdx + 1}. {ex.name} <span style={{ color: 'var(--muted)', fontSize: 11 }}>({ex.setsCount} sets)</span>
                          </span>
                          <span className="pacing-ex-time" style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>
                            {formatDurationMinSec(ex.timeSeconds)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              {activeDayData?.isRest ? (
                <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 13 }}>⚠️ Sunday is a rest day. Session companions require an active training day.</p>
              ) : (
                <button
                  className="timer-btn primary"
                  disabled={getStrictPacingMetrics()?.liftingSeconds < 0}
                  style={{ padding: '12px 28px', fontSize: 13, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', borderRadius: '10px', margin: '0 auto' }}
                  onClick={() => {
                    const now = Date.now();
                    setIsSessionActive(true);
                    setSessionStartTime(now);
                    setStrictTimeRemaining(strictTimeTarget * 60);
                    setStrictCurrentExIdx(0);
                    setStrictCurrentSet(1);
                    setStrictState('lifting');
                    setBreakEndTime(null);
                    setBreakSeconds(0);
                    speakNotification(`Guided session activated. ${strictTimeTarget} minute countdown locked. First movement, ${activeDayData.exercises[0].name}. Set 1. Let's work!`);
                  }}
                >
                  🚀 Start Workout Session
                </button>
              )}
            </div>
          ) : (
            <div className="strict-active-panel">
              <div className="timer-body-grid" style={{ marginBottom: 24 }}>
                {/* Countdown stopwatch */}
                <div className="stopwatch-section">
                  <div className="stopwatch-label" style={{ color: 'var(--accent)', letterSpacing: '1.5px' }}>TIME REMAINING</div>
                  <div className="stopwatch-display" style={{ fontSize: 44, color: 'var(--text)' }}>
                    {formatTime(strictTimeRemaining)}
                  </div>
                </div>

                {/* Rest countdown display */}
                <div className="break-section">
                  <div className="stopwatch-label" style={{ letterSpacing: '1.5px' }}>REST COUNTDOWN</div>
                  <div className={`break-countdown ${strictState === 'resting' ? 'active-break' : ''}`} style={{ fontSize: 44 }}>
                    {strictState === 'resting' ? `⏳ ${breakSeconds}s` : 'Lifting Set'}
                  </div>
                </div>
              </div>

              {/* Visual Overall Session Progress Bar */}
              {activeDayData?.exercises && (
                <div className="strict-progress-bar-wrap" style={{ margin: '0 0 24px', background: 'var(--surface)', padding: 14, borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                    <span>Workout Progress</span>
                    <span>{strictProgressExDone} / {activeDayData.exercises.length} Exercises Done</span>
                  </div>
                  <div className="progress-bar" style={{ height: 6 }}>
                    <div className="progress-fill" style={{ width: `${(strictProgressExDone / activeDayData.exercises.length) * 100}%`, background: 'var(--accent)', boxShadow: '0 0 8px rgba(232, 255, 60, 0.4)' }}></div>
                  </div>
                </div>
              )}

              {/* Guided Trainer Instructions */}
              {(strictState === 'lifting' || strictState === 'resting') && activeEx && (
                <div className="trainer-instruction-box" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border)', padding: 24, borderRadius: 12, textAlign: 'center', marginBottom: 24 }}>
                  <div className="trainer-step-ex-label" style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>
                    Movement {strictCurrentExIdx + 1} of {activeDayData.exercises.length}
                  </div>
                  <div className="trainer-step-ex-name" style={{ fontSize: 24, color: 'var(--text)', fontFamily: 'Bebas Neue', letterSpacing: 0.5, margin: '8px 0' }}>
                    {activeEx.name}
                  </div>
                  <div className="trainer-step-ex-sets" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, background: 'rgba(232, 255, 60, 0.06)', padding: '3px 10px', borderRadius: 20, display: 'inline-block' }}>
                    Pacing: {formatSetsDisplay(activeEx.sets)}
                  </div>

                  <div className="trainer-action-area" style={{ marginTop: 24 }}>
                    {strictState === 'lifting' ? (
                      <div>
                        <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          🔥 SET {strictCurrentSet} OF {parseSetsCount(activeEx.sets)} IN PROGRESS
                        </div>
                        <button
                          className="timer-btn primary"
                          style={{ width: '100%', maxWidth: '280px', margin: '0 auto', padding: '12px', fontWeight: 700, borderRadius: '8px', display: 'flex', justifyContent: 'center' }}
                          onClick={handleStrictSetDone}
                        >
                          ✅ Completed Set {strictCurrentSet}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          🧘 REST PERIOD ENFORCED
                        </div>
                        <button
                          className="timer-btn outline"
                          style={{ margin: '0 auto', fontSize: 12 }}
                          onClick={() => setBreakSeconds(0)}
                        >
                          ⏭️ Skip Rest Break
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {strictState === 'completed' && (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <span style={{ fontSize: 48 }}>🎉</span>
                  <h4 style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: 'var(--green)', margin: '12px 0 6px', letterSpacing: '0.5px' }}>Workout Smashed!</h4>
                  <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
                    Outstanding! You conquered all exercises within your workout pacing limits.
                  </p>
                  <button className="timer-btn" onClick={() => setStrictState('ready')} style={{ margin: '0 auto' }}>
                    Close Companion
                  </button>
                </div>
              )}

              {strictState === 'timesup' && (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <span style={{ fontSize: 48 }}>⏰</span>
                  <h4 style={{ fontFamily: 'Bebas Neue', fontSize: 26, color: 'var(--accent)', margin: '12px 0 6px', letterSpacing: '0.5px' }}>Time's Up!</h4>
                  <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
                    The workout session window expired before completion. Stay tighter on rest timings next time!
                  </p>
                  <button className="timer-btn" onClick={() => setStrictState('ready')} style={{ margin: '0 auto' }}>
                    Close Companion
                  </button>
                </div>
              )}

              {/* List of remaining exercises */}
              {activeDayData && (strictState === 'lifting' || strictState === 'resting') && (
                <div className="strict-list-preview" style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Guided Training Order</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {activeDayData.exercises.map((ex, idx) => {
                      const isPassed = idx < strictCurrentExIdx;
                      const isActive = idx === strictCurrentExIdx;
                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: 8,
                            background: isActive ? 'rgba(232, 255, 60, 0.04)' : 'transparent',
                            border: isActive ? '1px solid rgba(232, 255, 60, 0.15)' : '1px solid transparent',
                            opacity: isPassed ? 0.35 : 1
                          }}
                        >
                          <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 500, textDecoration: isPassed ? 'line-through' : 'none' }}>
                            {isActive ? '➡️ ' : ''}{ex.name}
                          </span>
                          <span style={{ fontSize: 11, color: isPassed ? 'var(--green)' : 'var(--muted)', fontWeight: isPassed || isActive ? 700 : 500 }}>
                            {isPassed ? '✓ Done' : isActive ? 'Active' : formatSetsDisplay(ex.sets)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWorkout = () => (
    <div className="panel active">
      {renderWorkoutTimer()}
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
              <div className="day-header" onClick={() => setOpenDays(prev => ({ ...prev, [idx]: !prev[idx] }))}>
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
                          <span className="ex-sets">{formatSetsDisplay(ex.sets)}</span>
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
          <div className="meal-day-header" onClick={() => setOpenMeals(prev => ({ ...prev, [i]: !prev[i] }))}>
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
      eveningSchedule,
      completedSets
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
          if (imported.completedSets) setCompletedSets(imported.completedSets);

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
    localStorage.removeItem('recomp_completedSets');

    setWeekChecks({});
    setProgressLogs({});
    setExerciseChecks({});
    setRoutineType('morning');
    setKcalTarget(2050);
    setProteinTarget(160);
    setMorningSchedule(routineMorning);
    setEveningSchedule(routineEvening);
    setCompletedSets({});
    setResetConfirm(false);

    alert('All progress logs, checked exercises, custom schedules, logged sets, and settings have been completely reset.');
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
    const sorted = [...data].sort((a, b) => a.week - b.week);
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
                if (w > 1 && progressLogs[w - 1]) {
                  const prevWeight = parseFloat(progressLogs[w - 1].weight);
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

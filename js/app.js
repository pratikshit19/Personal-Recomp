const days = [
    {
        name: "Monday", type: "Push", typeClass: "push",
        exercises: [
            { name: "Flat Bench Press", sets: "4x8" },
            { name: "Incline Dumbbell Press", sets: "3x10" },
            { name: "Overhead Press (BB)", sets: "4x8" },
            { name: "Lateral Raises", sets: "3x15" },
            { name: "Tricep Pushdown", sets: "3x12" },
            { name: "Cable Crunches", sets: "3x15" },
        ],
        cardio: "15-20 min incline treadmill walk after session"
    },
    {
        name: "Tuesday", type: "Pull", typeClass: "pull",
        exercises: [
            { name: "Deadlift", sets: "4x6" },
            { name: "Barbell Row", sets: "4x8" },
            { name: "Lat Pulldown", sets: "3x10" },
            { name: "Seated Cable Row", sets: "3x10" },
            { name: "Face Pulls", sets: "3x15" },
            { name: "Dumbbell Curl", sets: "3x12" },
            { name: "Hanging Leg Raises", sets: "3x15" },
        ],
        cardio: "15-20 min rowing machine after session"
    },
    {
        name: "Wednesday", type: "Legs", typeClass: "legs",
        exercises: [
            { name: "Barbell Squat", sets: "4x8" },
            { name: "Romanian Deadlift", sets: "4x10" },
            { name: "Leg Press", sets: "3x12" },
            { name: "Walking Lunges", sets: "3x12 each" },
            { name: "Leg Curl", sets: "3x12" },
            { name: "Plank", sets: "3x45 sec" },
        ],
        cardio: "15 min stairmaster after session"
    },
    {
        name: "Thursday", type: "Push", typeClass: "push",
        exercises: [
            { name: "Flat Bench Press", sets: "4x8 (+weight)" },
            { name: "Incline Dumbbell Press", sets: "3x10" },
            { name: "Overhead Press (DB)", sets: "4x8" },
            { name: "Lateral Raises", sets: "3x15" },
            { name: "Tricep Dips", sets: "3x12" },
            { name: "Ab Wheel Rollout", sets: "3x12" },
        ],
        cardio: "15-20 min incline treadmill walk after session"
    },
    {
        name: "Friday", type: "Pull", typeClass: "pull",
        exercises: [
            { name: "Rack Pull / Deadlift", sets: "4x6 (+weight)" },
            { name: "Dumbbell Row", sets: "4x10" },
            { name: "Pull-Ups", sets: "3xmax" },
            { name: "Cable Pullover", sets: "3x12" },
            { name: "Reverse Curls", sets: "3x12" },
            { name: "Hanging Knee Raises", sets: "3x15" },
        ],
        cardio: "20 min rowing machine after session"
    },
    {
        name: "Saturday", type: "Legs", typeClass: "legs",
        exercises: [
            { name: "Front Squat or Hack Squat", sets: "4x10" },
            { name: "Romanian Deadlift", sets: "4x10" },
            { name: "Bulgarian Split Squat", sets: "3x10 each" },
            { name: "Leg Extension", sets: "3x15" },
            { name: "Calf Raises", sets: "4x15" },
            { name: "Plank + Side Plank", sets: "3x45 sec" },
        ],
        cardio: "30 min steady state cardio (light - active recovery)"
    },
    {
        name: "Sunday", type: "Rest", typeClass: "rest",
        exercises: [],
        cardio: null,
        isRest: true
    }
];

const meals = [
    {
        day: "Breakfast - Same Every Day",
        kcal: "~450-480 kcal",
        meals: [
            { time: "Option A", food: "4 whole eggs bhurji (onion, tomato, green chilli, haldi, salt) + 2 whole wheat rotis", macros: "~38g protein | 40g carbs | 18g fat" },
            { time: "Option B", food: "Oats daliya with milk (1 cup oats + 250ml low fat milk + banana slices)", macros: "~20g protein | 60g carbs | 8g fat | add whey if using this" },
            { time: "Always", food: "Black chai (no sugar) or black coffee - drink 500ml water first thing", macros: "0 kcal" },
        ]
    },
    {
        day: "Mid-Morning Snack - Same Every Day",
        kcal: "~200-250 kcal",
        meals: [
            { time: "Best Pick", food: "1 scoop whey protein in water + 1 banana or 1 apple", macros: "~28g protein | 28g carbs | 2g fat" },
            { time: "No Whey?", food: "100g paneer (raw or lightly tawa-tossed with spices) + 1 fruit", macros: "~20g protein | 20g carbs | 10g fat" },
            { time: "Note", food: "This is 1-1.5 hrs before lunch. Don't skip it.", macros: "" },
        ]
    },
    {
        day: "Lunch - Meal Prep Sun & Wed",
        kcal: "~600-650 kcal",
        meals: [
            { time: "Protein", food: "200g chicken breast - boil in bulk with salt, haldi, jeera. Shred or slice. Use in curry, rice bowl, or wrap all week.", macros: "~46g protein" },
            { time: "Carbs", food: "1.5 cups cooked white rice or 2 rotis (rice digests better post-morning workout)", macros: "~55-60g carbs" },
            { time: "Veggie/Dal", food: "1 katori dal (moong/masoor/chana dal) OR sabzi (aloo gobi, palak, bhindi - minimal oil). Cook bulk.", macros: "~10-15g protein | 20g carbs" },
            { time: "Side", food: "Kachumber salad - cucumber, tomato, onion, lemon, salt. Takes 2 min, eat daily.", macros: "~2g protein | 8g carbs | 0 fat" },
        ]
    },
    {
        day: "Pre-Workout (1 hr before gym)",
        kcal: "~150-200 kcal",
        meals: [
            { time: "Best Pick", food: "1 banana + black coffee (no sugar)", macros: "~1g protein | 27g carbs | 0 fat - fast energy" },
            { time: "Alt Pick", food: "2 Marie biscuits + chai (no sugar) - simple, works fine", macros: "~2g protein | 24g carbs | 3g fat" },
            { time: "Skip if", food: "You train first thing in morning - have only coffee and train fasted, eat breakfast after", macros: "" },
        ]
    },
    {
        day: "Post-Workout (within 30 min of gym)",
        kcal: "~250-300 kcal",
        meals: [
            { time: "Must Have", food: "1 scoop whey protein in 300ml water or low fat milk", macros: "~25-35g protein | 5-15g carbs | 2g fat" },
            { time: "No Whey?", food: "4 egg whites omelette (quick tawa) + 1 roti", macros: "~20g protein | 20g carbs | 2g fat" },
            { time: "Add-on", food: "1 banana or handful of chivda (plain, no fried stuff)", macros: "~25g carbs - refuels glycogen fast" },
        ]
    },
    {
        day: "Dinner - Meal Prep with Lunch",
        kcal: "~500-550 kcal",
        meals: [
            { time: "Protein", food: "200g chicken curry (simple - tomato onion masala, minimal oil) OR 150g paneer bhurji OR 2 boiled eggs + dal", macros: "~40-46g protein" },
            { time: "Carbs", food: "1 cup rice or 1-2 rotis. Keep carbs slightly lower at dinner than lunch.", macros: "~35-45g carbs" },
            { time: "Veggie", food: "Palak, lauki, tinda, turai - low cal sabzis. Cook 2-3 days worth at once.", macros: "~5g protein | 10g carbs" },
            { time: "Tip", food: "Finish dinner 2 hrs before sleep. No midnight snacking.", macros: "" },
        ]
    },
    {
        day: "Weekly Meal Prep Checklist",
        kcal: "Prep once, eat all week",
        meals: [
            { time: "Boil", food: "600-700g chicken breast in one go. Store in fridge. Use for 3 days lunch + dinner.", macros: "Lasts 3-4 days refrigerated" },
            { time: "Cook", food: "Big pot of dal (moong or masoor). Divide into daily katoris.", macros: "Lasts 3-4 days" },
            { time: "Cook", food: "2-3 sabzis in bulk. Rotate through the week.", macros: "Lasts 3-4 days" },
            { time: "Boil", food: "6-8 eggs. Keep in fridge for quick snacks or post-workout.", macros: "Lasts 5-6 days" },
            { time: "Stock", food: "Bananas, apples, cucumbers, tomatoes, onions - your daily staples.", macros: "No prep needed" },
        ]
    }
];

const tips = [
    { icon: "😴", title: "Sleep 7-8 Hours", text: "Cortisol (stress hormone) directly causes belly fat storage. Poor sleep = slow fat loss. Non-negotiable." },
    { icon: "🥩", title: "Hit 160g Protein Daily", text: "Protein preserves muscle during a deficit and keeps you full. Aim for a palm-sized protein source at every meal." },
    { icon: "💧", title: "Drink 3-4L Water", text: "Hydration boosts metabolism, reduces bloating, and helps with hunger signals. Start every morning with 500ml before anything else." },
    { icon: "📈", title: "Progressive Overload", text: "Add weight or reps every 1-2 weeks. Your body only changes when challenged. Track your lifts - even in a phone note." },
    { icon: "🚫", title: "Cut Liquid Calories", text: "No sodas, juices, or alcohol. These alone can account for 300-500 hidden calories daily with zero satiety." },
    { icon: "⏰", title: "Eat on a Schedule", text: "Same meal times daily regulates cortisol and hunger hormones. Random eating patterns make fat loss harder." },
    { icon: "🔥", title: "Don't Skip Cardio Finisher", text: "15-20 min incline walk or rowing after lifting hits fasted-like fat burning state when glycogen is low." },
    { icon: "📸", title: "Track Progress Right", text: "Take waist measurements + photos every 2 weeks. Scale weight fluctuates daily - measurements tell the real story." },
];

// App State
let currentWeek = 1;
let weekChecks = JSON.parse(localStorage.getItem('recomp_progress')) || {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDays(currentWeek);
    renderMeals();
    renderTips();
    
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(reg => {
                console.log('SW registered:', reg);
            }).catch(err => {
                console.log('SW registration failed:', err);
            });
        });
    }
});

function renderDays(week) {
    const grid = document.getElementById('dayGrid');
    if (!grid) return;
    grid.innerHTML = '';
    if (!weekChecks[week]) weekChecks[week] = {};

    days.forEach((day, i) => {
        const checked = weekChecks[week][i] || false;
        const card = document.createElement('div');
        card.className = 'day-card';

        let exerciseHTML = day.isRest
            ? `<p style="color:var(--muted);font-size:13px;padding:16px 0">Complete rest. No gym. Walk, stretch, foam roll. Let your body rebuild. 💤</p>`
            : `<ul class="exercise-list">
                ${day.exercises.map(ex => `
                    <li class="exercise-item">
                        <span class="ex-name">${ex.name}</span>
                        <span class="ex-sets">${ex.sets}</span>
                    </li>
                `).join('')}
            </ul>
            ${day.cardio ? `<div class="cardio-note">Cardio Finisher: ${day.cardio}</div>` : ''}`;

        card.innerHTML = `
            <div class="day-header" onclick="toggleElement(this)">
                <div class="day-label">
                    <span class="day-name">${day.name}</span>
                    <span class="day-type type-${day.typeClass}">${day.type}</span>
                </div>
                <div style="display:flex;align-items:center;gap:16px">
                    ${!day.isRest ? `<div class="checkbox ${checked ? 'checked' : ''}" onclick="toggleCheck(event, ${i})"></div>` : ''}
                    <span class="chevron">▼</span>
                </div>
            </div>
            <div class="day-body">
                ${exerciseHTML}
            </div>
        `;
        grid.appendChild(card);
    });
    updateProgress(week);
}

function toggleElement(header) {
    const body = header.nextElementSibling;
    const chevron = header.querySelector('.chevron');
    const isOpen = body.classList.contains('open');
    
    // Close others if needed (optional)
    // document.querySelectorAll('.day-body.open, .meal-day-body.open').forEach(el => el.classList.remove('open'));
    
    body.classList.toggle('open');
    chevron.classList.toggle('open');
}

function toggleCheck(e, idx) {
    e.stopPropagation();
    if (!weekChecks[currentWeek]) weekChecks[currentWeek] = {};
    weekChecks[currentWeek][idx] = !weekChecks[currentWeek][idx];
    
    // Save to localStorage
    localStorage.setItem('recomp_progress', JSON.stringify(weekChecks));
    
    const checkbox = e.target;
    checkbox.classList.toggle('checked');
    updateProgress(currentWeek);
}

function updateProgress(week) {
    const checks = weekChecks[week] || {};
    const done = Object.values(checks).filter(Boolean).length;
    const total = 6; // Sunday is rest
    const pct = Math.min((done / total) * 100, 100);
    
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = `${done} / ${total} sessions`;
}

function setWeek(w, btn) {
    currentWeek = w;
    document.querySelectorAll('.week-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDays(w);
}

function renderMeals() {
    const grid = document.getElementById('mealGrid');
    if (!grid) return;
    grid.innerHTML = '';
    meals.forEach((day, i) => {
        const d = document.createElement('div');
        d.className = 'meal-day';
        d.innerHTML = `
            <div class="meal-day-header" onclick="toggleElement(this)">
                <span class="meal-day-name">${day.day}</span>
                <span class="meal-day-kcal">Target: <span>${day.kcal}</span></span>
                <span class="chevron" style="margin-left:10px">▼</span>
            </div>
            <div class="meal-day-body ${i === 0 ? 'open' : ''}">
                ${day.meals.map(m => `
                    <div class="meal-row">
                        <span class="meal-time">${m.time}</span>
                        <div>
                            <div class="meal-food">${m.food}</div>
                            <div class="meal-macros">${m.macros}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        grid.appendChild(d);
    });
}

function renderTips() {
    const grid = document.getElementById('tipsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    tips.forEach(t => {
        const c = document.createElement('div');
        c.className = 'tip-card';
        c.innerHTML = `
            <div class="tip-icon">${t.icon}</div>
            <div class="tip-title">${t.title}</div>
            <div class="tip-text">${t.text}</div>
        `;
        grid.appendChild(c);
    });
}

window.showTab = function(id, event) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    document.getElementById(id).classList.add('active');
    if (event) {
        event.target.classList.add('active');
    } else {
        // Fallback for initial load or manual calls
        const tab = Array.from(document.querySelectorAll('.tab')).find(t => t.textContent.toLowerCase().includes(id));
        if (tab) tab.classList.add('active');
    }
};

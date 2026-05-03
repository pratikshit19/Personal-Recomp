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
        day: "☕ 5:50 AM — Pre-Workout (Fast Energy)",
        kcal: "~100 kcal",
        meals: [
            { time: "Option A", food: "Black Coffee + 1 Small Banana", macros: "Quick carbs for energy" },
            { time: "Option B", food: "Black Coffee + 2 Dates", macros: "Fast glycogen replenishment" },
        ]
    },
    {
        day: "🍳 7:20 AM — Post-Gym Breakfast (At Home)",
        kcal: "~500 kcal",
        meals: [
            { time: "Protein", food: "4 whole eggs bhurji or 100g Paneer + 2 whole wheat rotis", macros: "~35g protein" },
            { time: "Carbs", food: "Oats with milk and a few nuts", macros: "~45g carbs" },
            { time: "Tip", food: "Eat this immediately after your shower to refuel fast.", macros: "" },
        ]
    },
    {
        day: "🥤 11:00 AM — Mid-Morning Snack (at Office)",
        kcal: "~200 kcal",
        meals: [
            { time: "Best Pick", food: "1 Scoop Whey Protein + 1 Apple or Handful of roasted chana", macros: "~28g protein" },
            { time: "Alt Pick", food: "Greek Yogurt (unflavoured) + few almonds", macros: "~15g protein" },
        ]
    },
    {
        day: "🥗 1:30 PM — Office Lunch (High Protein)",
        kcal: "~600 kcal",
        meals: [
            { time: "Protein", food: "200g Chicken Breast (Meal Prepped) or 1.5 katori Dal", macros: "~40g protein" },
            { time: "Carbs", food: "1.5 cups Cooked Rice or 2 Rotis", macros: "~55g carbs" },
            { time: "Veggie", food: "Seasonal Sabzi (minimal oil) + Large Salad", macros: "Crucial for digestion" },
        ]
    },
    {
        day: "🌙 8:30 PM — Dinner (Directly After Office)",
        kcal: "~500 kcal",
        meals: [
            { time: "Protein", food: "200g Chicken Curry or 150g Paneer Bhurji", macros: "~40g protein" },
            { time: "Carbs", food: "1 Roti or 0.5 cup Rice (Keep it lower at night)", macros: "~25g carbs" },
            { time: "Veggie", food: "Mixed Veg or Lauki Sabzi", macros: "Light on the stomach" },
        ]
    },
    {
        day: "🛒 Weekly Prep (For your Office Routine)",
        kcal: "Efficiency is Key",
        meals: [
            { time: "Batch 1", food: "Boil 1kg Chicken on Sunday night. Divide into 150-200g portions.", macros: "Covers all lunches" },
            { time: "Batch 2", food: "Prep salad jars (Cucumber, Tomato, Onion) for 3 days.", macros: "No morning rush" },
            { time: "Quick", food: "Keep Whey & Nuts at your office desk.", macros: "Safety net for busy days" },
        ]
    }
];

const routineMorning = [
    { time: "05:50 AM", activity: "Wake Up + Pre-Workout Coffee", icon: "⏰" },
    { time: "06:00 AM", activity: "Gym Session (PPL Split)", icon: "🏋️‍♂️" },
    { time: "07:15 AM", activity: "Home: Shower & Post-Workout Meal", icon: "🍱" },
    { time: "07:45 AM", activity: "Leave for Office (2-hour commute)", icon: "🚗" },
    { time: "11:00 AM", activity: "Snack: Whey + Fruit", icon: "🥤" },
    { time: "01:30 PM", activity: "Meal 2: Lunch", icon: "🥗" },
    { time: "06:30 PM", activity: "Leave Office", icon: "🏢" },
    { time: "08:30 PM", activity: "Reach Home + Dinner", icon: "🏠" },
    { time: "10:30 PM", activity: "Sleep (7.5 Hours)", icon: "😴" },
];

const routineEvening = [
    { time: "05:50 AM", activity: "Wake Up + Coffee", icon: "⏰" },
    { time: "06:20 AM", activity: "Leave for Office (Early start)", icon: "🚗" },
    { time: "08:30 AM", activity: "Reach Office + Breakfast", icon: "🍳" },
    { time: "11:00 AM", activity: "Snack: Fruit/Nuts", icon: "🍎" },
    { time: "01:30 PM", activity: "Meal 2: Lunch", icon: "🥗" },
    { time: "06:30 PM", activity: "Leave Office", icon: "🏢" },
    { time: "08:30 PM", activity: "Gym Session (PPL Split)", icon: "🏋️‍♂️" },
    { time: "09:45 PM", activity: "Post-Workout Dinner", icon: "🍱" },
    { time: "11:30 PM", activity: "Sleep (Shorter cycle)", icon: "😴" },
];

const tips = [
    { icon: "😴", title: "Sleep is Priority", text: "Since you wake at 5:50 AM, you MUST be in bed by 10:30 PM. Recovery happens during sleep, not in the gym." },
    { icon: "🚗", title: "Commute = Recovery", text: "Use your 2-hour commute to stay hydrated. Drink at least 1L of water during your drive/ride." },
    { icon: "🥩", title: "160g Protein Goal", text: "Hitting protein at 11 AM and 1:30 PM is crucial to prevent muscle loss during your long office hours." },
    { icon: "📈", title: "Progressive Overload", text: "Track your lifts in a phone note. Try to add 1kg or 1 rep every single week." },
    { icon: "🚫", title: "No Liquid Calories", text: "Avoid office tea/coffee with sugar. Stick to black coffee or green tea." },
    { icon: "📸", title: "Waist Measurements", text: "Take photos and waist measurements every Sunday. The scale lies, the mirror doesn't." },
];

// App State
let currentWeek = 1;
let weekChecks = JSON.parse(localStorage.getItem('recomp_progress')) || {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDays(currentWeek);
    renderMeals();
    renderTips();
    renderRoutine('morning');
    
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

let currentRoutine = 'morning';
function renderRoutine(type) {
    const grid = document.getElementById('routineGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const data = type === 'morning' ? routineMorning : routineEvening;
    
    data.forEach(item => {
        const d = document.createElement('div');
        d.className = 'tl-item';
        d.innerHTML = `
            <div class="tl-dot"></div>
            <div class="tl-week">${item.time}</div>
            <div class="tl-title">${item.icon} ${item.activity}</div>
        `;
        grid.appendChild(d);
    });
}

window.setRoutine = function(type, event) {
    currentRoutine = type;
    document.querySelectorAll('.sub-tab').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderRoutine(type);
};

window.showTab = function(id, event) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    document.getElementById(id).classList.add('active');
    if (event) {
        event.target.classList.add('active');
    } else {
        const tab = Array.from(document.querySelectorAll('.tab')).find(t => t.textContent.toLowerCase().includes(id));
        if (tab) tab.classList.add('active');
    }
};

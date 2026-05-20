export const workoutDays = [
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

export const mealsMorning = [
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

export const mealsEvening = [
    {
        day: "⏰ 05:50 AM — Wake Up & Morning Kickstart",
        kcal: "~100 kcal",
        meals: [
            { time: "Option A", food: "Green Tea or Black Coffee + 5 Almonds", macros: "Metabolism booster" },
            { time: "Option B", food: "Warm Lemon Water + 2 Walnuts", macros: "Healthy fats to start the day" },
        ]
    },
    {
        day: "🍳 08:30 AM — Office Breakfast (Refuel after Commute)",
        kcal: "~500 kcal",
        meals: [
            { time: "Protein", food: "4 egg whites scramble + 2 slices whole wheat toast", macros: "~30g protein" },
            { time: "Carbs", food: "1 katori Oats/Muesli with skimmed milk & 1/2 apple", macros: "~45g carbs" },
            { time: "Tip", food: "Keep it light to maintain focus at the start of your workday.", macros: "" },
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
        day: "🥗 01:30 PM — Office Lunch (High Protein & Fiber)",
        kcal: "~600 kcal",
        meals: [
            { time: "Protein", food: "200g Grilled Chicken Breast or 150g Low-fat Paneer curry", macros: "~40g protein" },
            { time: "Carbs", food: "1.5 cups Brown Rice or 2 Multigrain Rotis", macros: "~55g carbs" },
            { time: "Veggie", food: "Stir-fried Broccoli, Peppers + Large Cucumber Salad", macros: "Satiety & gut health" },
        ]
    },
    {
        day: "🍌 06:00 PM — Pre-Workout Fuel (Leaving Office)",
        kcal: "~150 kcal",
        meals: [
            { time: "Option A", food: "Black Coffee + 1 Medium Banana", macros: "Perfect pre-workout pump carbs" },
            { time: "Option B", food: "2 Dates + black coffee", macros: "Quick glycogen boost for evening lift" },
        ]
    },
    {
        day: "🍱 09:45 PM — Post-Workout Dinner (Muscle Repair & Recomp)",
        kcal: "~500 kcal",
        meals: [
            { time: "Protein", food: "200g Baked Fish/Chicken or 150g Paneer Bhurji", macros: "~42g protein" },
            { time: "Carbs", food: "1 Roti or 0.5 cup Quinoa (Lower carbs before bed)", macros: "~20g carbs" },
            { time: "Veggie", food: "Steamed Asparagus, Zucchini, or sautéed spinach", macros: "Super low-calorie volume" },
        ]
    },
    {
        day: "🛒 Weekly Prep (For Evening Gym-goers)",
        kcal: "Efficiency is Key",
        meals: [
            { time: "Batch 1", food: "Grill chicken/paneer on Sundays & Wednesdays to keep it fresh.", macros: "Covers dinner" },
            { time: "Batch 2", food: "Keep pre-workout fruit/banana & black coffee mix at your desk.", macros: "No gym rush" },
            { time: "Quick", food: "Prepare your gym bag the night before so you leave the office straight to the gym.", macros: "Consistency locked in" },
        ]
    }
];

export const routineMorning = [
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

export const routineEvening = [
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

export const tips = [
    { icon: "⚖️", title: "Calorie Deficit is King", text: "You must stick to your 2,050 kcal target. Track every splash of cooking oil, handful of nuts, and bite of food. Untracked calories are the #1 reason fat loss stalls." },
    { icon: "🚶‍♂️", title: "10,000 Steps Daily (NEAT)", text: "The gym burns calories, but your step count keeps your metabolism alive. Take active 10-min walks during office calls, use the stairs, or pace during your 2-hour commute." },
    { icon: "🥩", title: "160g Protein Non-Negotiable", text: "Protein has a high Thermic Effect (burns 20-30% of its calories just to digest) and keeps you full. Most importantly, it preserves your muscle so you lose PURE fat." },
    { icon: "😴", title: "7.5+ Hours Sleep", text: "If you sleep under 6 hours, your body produces more Cortisol (stores belly fat) and Ghrelin (cravings skyrocket). Sleep is where fat loss and recovery actually happen." },
    { icon: "🚫", title: "Zero Liquid Calories", text: "Absolutely no sugary office tea, coffee, fruit juices, or sodas. They trigger massive insulin spikes which shuts down your body's ability to burn fat instantly." },
    { icon: "💧", title: "4 Liters of Water", text: "Dehydration is often mistaken for hunger. Drink 1L during your 2-hour commute and keep a bottle at your desk. Proper hydration increases calorie burn and flushes toxins." },
    { icon: "📏", title: "Track Waist, Not Just Weight", text: "Scale weight fluctuates with water, salt, and bowel movements. Measure your waist at navel level every Sunday. If the waist shrinks but weight is same, you are building muscle." },
    { icon: "🍳", title: "90/10 Rule for Consistency", text: "90% of your meals must come from single-ingredient, clean sources (chicken, eggs, paneer, veggies, whole grains). Save 10% for flexible dieting so you don't binge." }
];

export const timelineSteps = [
    { week: "Week 1–2", title: "The Adjustment Phase", desc: "Your body adapts to the new volume. Expect soreness, some fatigue. Water weight drops 1–2 kg. Bloating reduces noticeably. Stick to the plan even if the scale doesn't move much — internal changes are happening." },
    { week: "Week 3–4", title: "First Visible Changes", desc: "Waist definition begins appearing. Clothes feel slightly looser. Energy improves. Scale drops 1–1.5 kg of actual fat. Strength in lifts starts climbing — this is recomposition working." },
    { week: "Week 5–6", title: "Momentum Builds", desc: "Belly visibly flatter. Muscle tone emerging in chest, shoulders, arms. People start noticing. This is the phase where most people quit — don't. You're 70% there." },
    { week: "Week 7–8", title: "Transformation Complete", desc: "3–5 cm off waist. 2–3 kg fat lost, muscle gained. Significantly leaner physique. Lower belly pouch reduced. Build on this — you now have momentum and habits locked in." }
];

import type { Route } from "./+types/ui/Home";
import { StatsCard } from "~/components/ui/StatsCard";
import { Flame, Dumbbell, Apple, TrendingUp, Calendar, Award } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - AdaptFitness" },
    { name: "description", content: "Track your fitness journey" },
  ];
}

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back, John! 👋</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Here's your fitness overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Calories Burned"
          value="1,847"
          subtitle="of 2,200 goal"
          icon={<Flame size={24} />}
          trend={{ value: "12%", isPositive: true }}
        />
        
        <StatsCard
          title="Workouts This Week"
          value="4"
          subtitle="of 5 goal"
          icon={<Dumbbell size={24} />}
          trend={{ value: "1", isPositive: true }}
        />
        
        <StatsCard
          title="Calories Consumed"
          value="1,650"
          subtitle="of 2,000 goal"
          icon={<Apple size={24} />}
          trend={{ value: "8%", isPositive: false }}
        />
        
        <StatsCard
          title="Current Streak"
          value="12 days"
          subtitle="Personal best!"
          icon={<TrendingUp size={24} />}
        />
        
        <StatsCard
          title="Weekly Goal"
          value="80%"
          subtitle="Complete"
          icon={<Calendar size={24} />}
          trend={{ value: "15%", isPositive: true }}
        />
        
        <StatsCard
          title="Achievements"
          value="23"
          subtitle="Total earned"
          icon={<Award size={24} />}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
            <Dumbbell className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2" size={32} />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Log Workout</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Record your exercise session</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
            <Apple className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2" size={32} />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Log Meal</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your nutrition</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
            <TrendingUp className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2" size={32} />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">View Progress</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">See your achievements</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { type: "workout", title: "Morning Run", time: "2 hours ago", calories: "342 cal" },
            { type: "meal", title: "Chicken Salad", time: "4 hours ago", calories: "450 cal" },
            { type: "workout", title: "Strength Training", time: "Yesterday", calories: "285 cal" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === "workout" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-green-100 dark:bg-green-900/30"
                }`}>
                  {activity.type === "workout" ? (
                    <Dumbbell className="text-blue-600 dark:text-blue-400" size={20} />
                  ) : (
                    <Apple className="text-green-600 dark:text-green-400" size={20} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{activity.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{activity.calories}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
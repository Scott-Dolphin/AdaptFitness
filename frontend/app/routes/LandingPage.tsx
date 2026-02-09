import { Link } from 'react-router';
import { Activity, Calculator, Book, Scan, Dumbbell, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function LandingPage() {
    const features = [
        {
            icon: Calculator,
            title: 'Calorie Calculator',
            description: 'Calculate your daily calorie intake based on your BMI, activity level, and fitness goals.',
        },
        {
            icon: Book,
            title: 'Nutrition Log',
            description: 'Track your daily meals and monitor your macronutrient intake with ease.',
        },
        {
            icon: Scan,
            title: 'Barcode Scanner',
            description: 'Quickly scan food barcodes to instantly add nutritional information to your log.',
        },
        {
            icon: Dumbbell,
            title: 'Fitness Log',
            description: 'Record your workouts, sets, reps, and track your progress over time.',
        },
        {
            icon: TrendingUp,
            title: 'Workout Recommendations',
            description: 'Get personalized workout suggestions based on your goals and fitness level.',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <Activity className="size-8 text-emerald-600" />
                            <span className="text-xl font-semibold">FitTrack</span>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/login">
                                <Button variant="ghost">Log In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button>Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl font-bold text-slate-900 mb-6">
                                Your Complete Fitness & Nutrition Companion
                            </h1>
                            <p className="text-xl text-slate-600 mb-8">
                                Track your calories, log your meals, monitor your workouts, and achieve your fitness goals with FitTrack.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/signup">
                                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1606170750739-460f27c2d30d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3MDMzNDE5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Fitness workout"
                                className="rounded-2xl shadow-2xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-xl text-slate-600">
                            Powerful features to help you reach your fitness goals
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="size-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="size-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-slate-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1670164747721-d3500ef757a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG51dHJpdGlvbnxlbnwxfHx8fDE3NzAyNjg1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Healthy nutrition"
                                className="rounded-2xl shadow-2xl w-full"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                Track Nutrition Effortlessly
                            </h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 size-8 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Set Your Goals</h3>
                                        <p className="text-slate-600">Enter your information and fitness objectives</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 size-8 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Log Your Meals</h3>
                                        <p className="text-slate-600">Scan barcodes or manually add your food intake</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 size-8 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Track Progress</h3>
                                        <p className="text-slate-600">Monitor your progress and adjust as needed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to Transform Your Fitness Journey?
                    </h2>
                    <p className="text-xl mb-8 text-emerald-50">
                        Join thousands of users who are achieving their fitness goals with FitTrack
                    </p>
                    <Link to="/signup">
                        <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-slate-50">
                            Start Your Free Trial
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="size-6" />
                                <span className="font-semibold">FitTrack</span>
                            </div>
                            <p className="text-slate-400">Your complete fitness and nutrition companion</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white">Privacy</a></li>
                                <li><a href="#" className="hover:text-white">Terms</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
                        <p>&copy; 2026 FitTrack. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

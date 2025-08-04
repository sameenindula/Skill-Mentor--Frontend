import { MentorCard } from "@/components/MentorCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/config/env";
import { MentorClass } from "@/lib/types";
import { ArrowRight, BookOpen, Award, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Layers,
  Calendar,
  Sparkles,
} from "lucide-react";

// ✅ Type-safe props for FeatureCard
type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <Icon className="h-12 w-12 text-indigo-600 mb-4" />
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </Card>
);

export default function HomePage() {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const [mentorClasses, setMentorClasses] = useState<MentorClass[]>([]);
  const userRole = user?.publicMetadata?.role;

  useEffect(() => {
    async function fetchMentorClasses() {
      try {
        const response = await fetch(`${BACKEND_URL}/academic/classroom`);
        if (!response.ok) throw new Error("Failed to fetch mentor classes");
        const data = await response.json();
        setMentorClasses(data);
      } catch (error) {
        console.error("Error fetching mentor classes:", error);
      }
    }

    fetchMentorClasses();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  const features = [
    {
      icon: Layers,
      title: "Expert Mentors",
      description: "Learn from industry professionals with real-world experience.",
    },
    {
      icon: Calendar,
      title: "Flexible Sessions",
      description: "Book 1-on-1 calls at a time that fits your schedule.",
    },
    {
      icon: Sparkles,
      title: "Personalized Guidance",
      description: "Get tailored advice and actionable feedback on your goals.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 py-24 md:py-32">
        <div className="container mx-auto px-6 text-center z-10 relative">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Accelerate Your Career with a <br className="hidden md:inline" /> Personalized Mentor
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12">
            Unlock your full potential with expert-led mentorship on everything
            from technical skills to interview preparation.
          </p>

          {isSignedIn ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="text-lg font-semibold h-12 px-8 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition transform hover:scale-105"
                >
                  Go to Dashboard <ArrowRight size={20} />
                </Button>
              </Link>
              {userRole === "ADMIN" && (
                <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
                  <Link to="/add-classroom">
                    <Button
                      size="lg"
                      className="text-lg font-semibold h-12 px-8 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-lg transition"
                    >
                      Add Classroom <BookOpen size={20} />
                    </Button>
                  </Link>
                  <Link to="/add-mentor">
                    <Button
                      size="lg"
                      className="text-lg font-semibold h-12 px-8 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white shadow-lg transition"
                    >
                      Add Mentor <Award size={20} />
                    </Button>
                  </Link>
                  <Link to="/session-management">
                    <Button
                      size="lg"
                      className="text-lg font-semibold h-12 px-8 flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white shadow-lg transition"
                    >
                      Session Management <Zap size={20} />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button
                size="lg"
                className="text-lg font-semibold h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition transform hover:scale-105"
              >
                Find Your Mentor Now
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Feature Cards Section */}
      <div className="relative -mt-16 z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Mentor Cards Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Schedule a <span className="text-indigo-600">1-on-1 Call</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse our curated list of expert mentors and book a session to
              get started on your learning journey.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mentorClasses.length === 0 ? (
              <div className="text-center col-span-full py-10">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  No mentor classes available right now.
                </p>
                <p className="text-sm mt-2 text-gray-400 dark:text-gray-500">
                  Please check back later!
                </p>
              </div>
            ) : (
              mentorClasses.map((mentorClass) => (
                <MentorCard
                  key={mentorClass.class_room_id}
                  mentorClass={mentorClass}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import { MentorCard } from "@/components/MentorCard";
import { Link } from "react-router-dom"; // Updated to "react-router-dom"
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/config/env";
import { MentorClass } from "@/lib/types";
import {
  ArrowRight,
  Star,
  Users,
  BookOpen,
  Award,
  Zap,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  const { isSignedIn } = useAuth();
  const [mentorClasses, setMentorClasses] = useState<MentorClass[]>([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Find your <span className="text-indigo-600">SkillMentor</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8">
          Empower your career with personalized mentorship for AWS Developer,
          Interview Prep, and more.
        </p>

        {isSignedIn ? (
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg flex gap-2 items-center">
                Go to Dashboard <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/add-classroom">
              <Button size="lg" className="text-lg flex gap-2 items-center">
                Add ClassRoom <BookOpen size={18} />
              </Button>
            </Link>
            <Link to="/add-mentor">
              <Button size="lg" className="text-lg flex gap-2 items-center">
                Add Mentor <Award size={18} />
              </Button>
            </Link>
            <Link to="/session-management">
              <Button size="lg" className="text-lg flex gap-2 items-center">
                Session Management <Zap size={18} />
              </Button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <Button size="lg" className="text-lg">
              Sign up to see all tutors
            </Button>
          </Link>
        )}
      </section>

      {/* Mentor Cards Section */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Schedule a <span className="text-indigo-600">1-on-1 Call</span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mentorClasses.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No mentor classes available right now.
            </p>
          ) : (
            mentorClasses.map((mentorClass) => (
              <MentorCard
                key={mentorClass.class_room_id}
                mentorClass={mentorClass}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

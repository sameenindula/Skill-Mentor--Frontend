import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Globe, 
  TrendingUp, 
  BookOpen, 
  Star,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Zap
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6" variant="secondary">
              About SkillMentor
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Empowering Careers Through
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Expert Mentorship
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We believe that everyone deserves access to world-class mentorship. Our platform connects 
              ambitious professionals with industry experts who are passionate about sharing their knowledge 
              and accelerating career growth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To democratize access to expert knowledge by creating meaningful connections between 
                experienced professionals and ambitious learners worldwide.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We envision a world where career advancement is accessible to everyone, regardless of 
                their background or location. Through personalized mentorship, we help individuals 
                unlock their full potential and achieve their professional dreams.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/mentors">
                  <Button size="lg">
                    Meet Our Mentors
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-6 rounded-lg border bg-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">500+ Expert Mentors</h3>
                  <p className="text-sm text-muted-foreground">
                    Industry professionals from top companies
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Global Reach</h3>
                  <p className="text-sm text-muted-foreground">
                    Mentors available across 50+ countries
                  </p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="p-6 rounded-lg border bg-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">10,000+ Success Stories</h3>
                  <p className="text-sm text-muted-foreground">
                    Career transformations and promotions
                  </p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Certified Experts</h3>
                  <p className="text-sm text-muted-foreground">
                    Verified credentials and experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at SkillMentor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Passion for Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in the transformative power of knowledge sharing and are passionate about 
                  connecting learners with experts who love what they do.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Personalized Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every learner is unique. We provide personalized mentorship experiences tailored to 
                  individual goals, learning styles, and career aspirations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Innovation & Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We continuously innovate our platform to provide the best possible learning experience 
                  and maintain the highest standards of quality in everything we do.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">The Beginning</h3>
                    <p className="text-muted-foreground">
                      Founded in 2023, SkillMentor was born from a simple observation: many talented 
                      professionals struggled to advance their careers due to lack of guidance.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">The Solution</h3>
                    <p className="text-muted-foreground">
                      We created a platform that connects experienced professionals with ambitious learners, 
                      making expert mentorship accessible to everyone.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">The Impact</h3>
                    <p className="text-muted-foreground">
                      Today, we've helped thousands of professionals accelerate their careers and achieve 
                      their dreams through personalized mentorship.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-6 rounded-lg border bg-card">
                    <div className="text-3xl font-bold text-primary mb-2">2023</div>
                    <div className="text-sm text-muted-foreground">Platform Launch</div>
                  </div>
                  <div className="p-6 rounded-lg border bg-card">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Expert Mentors</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="p-6 rounded-lg border bg-card">
                    <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                    <div className="text-sm text-muted-foreground">Success Stories</div>
                  </div>
                  <div className="p-6 rounded-lg border bg-card">
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind SkillMentor's mission to democratize expert knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">S</span>
                </div>
                <CardTitle>Sarah Johnson</CardTitle>
                <p className="text-sm text-muted-foreground">CEO & Founder</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Former tech executive with 15+ years experience in education technology and 
                  a passion for democratizing access to expert knowledge.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">M</span>
                </div>
                <CardTitle>Michael Chen</CardTitle>
                <p className="text-sm text-muted-foreground">CTO</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Engineering leader with expertise in building scalable platforms and 
                  creating seamless user experiences for learning communities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">E</span>
                </div>
                <CardTitle>Emma Rodriguez</CardTitle>
                <p className="text-sm text-muted-foreground">Head of Community</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Community builder with a background in education and a deep understanding 
                  of what makes mentorship relationships successful.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're looking to advance your career or share your expertise, 
            we'd love to have you as part of our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mentors">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Find Your Mentor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
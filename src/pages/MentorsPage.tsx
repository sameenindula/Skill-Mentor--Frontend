import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BACKEND_URL } from "@/config/env";
import { useAuth } from "@clerk/clerk-react";
import { Search, Star, MapPin, Phone, Mail, GraduationCap, DollarSign } from "lucide-react";

interface Mentor {
  mentor_id: number;
  clerk_mentor_id: string;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  title: string;
  session_fee: number;
  profession: string;
  subject: string;
  phone_number: string;
  qualification: string;
  mentor_image: string;
  class_room_id: number;
}

export default function MentorsPage() {
  const { getToken } = useAuth();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "fee" | "experience">("name");

  // Fetch all mentors
  useEffect(() => {
    async function fetchMentors() {
      try {
        const token = await getToken({ template: "skillmentor-auth-frontend" });
        if (!token) {
          throw new Error("Authentication token not available");
        }

        const response = await fetch(`${BACKEND_URL}/academic/mentor`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }

        const data = await response.json();
        setMentors(data);
        setFilteredMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMentors();
  }, [getToken]);

  // Filter and sort mentors
  useEffect(() => {
    let filtered = mentors.filter(mentor => {
      const matchesSearch = 
        mentor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProfession = selectedProfession === "" || mentor.profession.includes(selectedProfession);
      
      return matchesSearch && matchesProfession;
    });

    // Sort mentors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
        case "fee":
          return a.session_fee - b.session_fee;
        case "experience":
          const aExp = parseInt(a.qualification.match(/\d+/)?.[0] || "0");
          const bExp = parseInt(b.qualification.match(/\d+/)?.[0] || "0");
          return bExp - aExp;
        default:
          return 0;
      }
    });

    setFilteredMentors(filtered);
  }, [mentors, searchTerm, selectedProfession, sortBy]);

  const getProfessions = () => {
    const professions = mentors.map(m => m.profession);
    return [...new Set(professions)];
  };

  const formatFee = (fee: number) => {
    return `$${(fee / 100).toFixed(2)}`;
  };

  const getExperienceYears = (qualification: string) => {
    const match = qualification.match(/\d+/);
    return match ? match[0] : "0";
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading mentors...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Our Expert Mentors
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with industry professionals and certified experts who are passionate about sharing their knowledge and helping you succeed.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search mentors by name, profession, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="flex h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Professions</option>
            {getProfessions().map((profession) => (
              <option key={profession} value={profession}>
                {profession}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "fee" | "experience")}
            className="flex h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="name">Sort by Name</option>
            <option value="fee">Sort by Fee (Low to High)</option>
            <option value="experience">Sort by Experience</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredMentors.length} of {mentors.length} mentors
          </p>
          <Badge className="bg-blue-100 text-blue-700">
            {mentors.length} Total Mentors
          </Badge>
        </div>
      </div>

      {/* Mentors Grid */}
      {filteredMentors.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.mentor_id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                  {mentor.mentor_image ? (
                    <img
                      src={mentor.mentor_image}
                      alt={`${mentor.first_name} ${mentor.last_name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                      <div className="text-4xl font-bold text-primary/60">
                        {mentor.first_name.charAt(0)}{mentor.last_name.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 text-white">
                    {formatFee(mentor.session_fee)}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-1">
                      {mentor.title} {mentor.first_name} {mentor.last_name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {mentor.profession}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">5.0</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {mentor.subject}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{mentor.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{mentor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{mentor.phone_number}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {getExperienceYears(mentor.qualification)} years exp.
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {mentor.qualification}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-mint-600">
                    <DollarSign className="h-3 w-3" />
                    {formatFee(mentor.session_fee)}
                  </div>
                </div>

                <Button className="w-full mt-4">
                  Book Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 
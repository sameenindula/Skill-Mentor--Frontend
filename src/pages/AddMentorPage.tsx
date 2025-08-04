import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BACKEND_URL } from "@/config/env";
import { useAuth, useUser } from "@clerk/clerk-react";
import { ClassRoom } from "@/lib/types";

export default function AddMentorPage() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [classrooms, setClassrooms] = useState<ClassRoom[]>([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    title: "",
    session_fee: 0,
    profession: "",
    subject: "",
    phone_number: "",
    qualification: "",
    mentor_image: "",
    class_room_id: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingClassrooms, setIsLoadingClassrooms] = useState(true);

  // Fetch classrooms for dropdown
  useEffect(() => {
    async function fetchClassrooms() {
      try {
        const response = await fetch(`${BACKEND_URL}/academic/classroom`);
        if (!response.ok) {
          throw new Error("Failed to fetch classrooms");
        }
        const data = await response.json();
        setClassrooms(data);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
        alert("Failed to load classrooms. Please try again.");
      } finally {
        setIsLoadingClassrooms(false);
      }
    }

    fetchClassrooms();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "session_fee" ? parseFloat(value) || 0.0 : 
               name === "class_room_id" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("=== ADD MENTOR REQUEST DEBUG ===");
      console.log("1. Getting authentication token...");
      
      const token = await getToken({ template: "skillmentor-auth-frontend" });
      if (!token) {
        throw new Error("Authentication token not available");
      }

      console.log("2. Token obtained successfully");
      console.log("3. Token template used: skillmentor-auth-frontend");

      // Get the current user's clerk ID
      const clerk_mentor_id = user?.id;
      if (!clerk_mentor_id) {
        throw new Error("User ID not available");
      }

      console.log("4. User ID:", clerk_mentor_id);
      console.log("5. User email:", user?.primaryEmailAddress?.emailAddress);
      console.log("6. User metadata:", user?.publicMetadata);

      // First, try to register the user (like DashboardPage does)
      console.log("7. Attempting to register user first...");
      const userPayload = {
        clerk_student_id: clerk_mentor_id,
        first_name: user?.firstName || formData.first_name,
        last_name: user?.lastName || formData.last_name,
        email: user?.primaryEmailAddress?.emailAddress || formData.email,
        phone_number: formData.phone_number || "-",
        address: formData.address || "-",
        age: 20,
      };

      try {
        const userResponse = await fetch(`${BACKEND_URL}/academic/student`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(userPayload)
        });

        console.log("8. User registration status:", userResponse.status);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("9. User registered successfully:", userData);
        } else {
          console.log("9. User registration failed or user already exists");
        }
      } catch (error) {
        console.log("9. User registration error (this might be normal):", error);
      }

      // Prepare the data with correct data types as specified
      const mentorPayload = {
        clerk_mentor_id: clerk_mentor_id.toString(), // string
        first_name: formData.first_name.trim(), // string
        last_name: formData.last_name, // string
        address: formData.address, // string
        email: formData.email, // string
        title: formData.title, // string
        session_fee: parseFloat(formData.session_fee.toString()) || 0.0, // float
        profession: formData.profession, // string
        subject: formData.subject, // string
        phone_number: formData.phone_number, // string
        qualification: formData.qualification, // string
        mentor_image: formData.mentor_image, // string
        class_room_id: parseInt(formData.class_room_id.toString()) || 0 // integer
      };

      console.log("10. Preparing mentor payload...");
      console.log("11. Form data:", formData);
      console.log("12. Final mentor payload:", mentorPayload);
      console.log("13. Request URL:", `${BACKEND_URL}/academic/mentor`);
      console.log("14. Request method: POST");
      console.log("15. Request headers:", {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      console.log("16. Request body:", JSON.stringify(mentorPayload, null, 2));

      console.log("17. Making API request...");
      const response = await fetch(`${BACKEND_URL}/academic/mentor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(mentorPayload)
      });

      console.log("18. Response received");
      console.log("19. Response status:", response.status);
      console.log("20. Response status text:", response.statusText);
      console.log("21. Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        console.log("22. Request failed");
        console.log("23. Error status:", response.status);
        
        const errorText = await response.text();
        console.log("24. Error response body:", errorText);
        
        if (response.status === 403) {
          console.log("25. 403 Forbidden - Admin privileges required");
          throw new Error("Access denied. Admin privileges required.");
        }
        
        console.log("26. Other error occurred");
        throw new Error("Failed to create mentor");
      }

      console.log("27. Request successful!");
      const responseData = await response.json();
      console.log("28. Success response:", responseData);

      // Redirect to home page after successful creation
      navigate("/");
    } catch (error) {
      console.error("Error creating mentor:", error);
      alert(error instanceof Error ? error.message : "Failed to create mentor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Add New Mentor (Admin Only)</CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Note: You must have admin privileges to add mentors. If you're getting a 403 error, 
            please ensure you have been registered as an admin user in the system.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Mr., Ms., Dr., etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session_fee">Session Fee (float)</Label>
                <Input
                  id="session_fee"
                  name="session_fee"
                  type="number"
                  step="0.01"
                  value={formData.session_fee}
                  onChange={handleInputChange}
                  placeholder="52.00"
                  min="0"
                  required
                />
                <p className="text-xs text-muted-foreground">Note: Enter the fee as a decimal (e.g., 52.00 for $52.00)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  name="profession"
                  type="text"
                  value={formData.profession}
                  onChange={handleInputChange}
                  placeholder="Data Engineer at Google"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  name="qualification"
                  type="text"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="Tutor since 2022"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="class_room_id">Classroom</Label>
                <select
                  id="class_room_id"
                  name="class_room_id"
                  value={formData.class_room_id}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  disabled={isLoadingClassrooms}
                >
                  <option value="">Select a classroom</option>
                  {classrooms.map((classroom) => (
                    <option key={classroom.class_room_id} value={classroom.class_room_id}>
                      {classroom.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="1457 Lakeview Drive, San Jose, CA 95134, US"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mentor_image">Mentor Image URL</Label>
              <Input
                id="mentor_image"
                name="mentor_image"
                type="url"
                value={formData.mentor_image}
                onChange={handleInputChange}
                placeholder="https://skillmentor-frontend.vercel.app/assets/mentor-6-DZ4icgC8.webp"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject/Description</Label>
              <textarea
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Hello! I'm a certified Azure Data Engineer with 8+ years of experience in data architecture and engineering. I specialize in modern data warehousing, big data solutions, and lakehouse architectures on Azure."
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || isLoadingClassrooms}
                className="flex-1"
              >
                {isLoading ? "Creating..." : "Create Mentor"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BACKEND_URL } from "@/config/env";
import { useAuth } from "@clerk/clerk-react";

export default function AddClassroomPage() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    enrolled_student_count: 0,
    class_image: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "enrolled_student_count" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = await getToken({ template: "skillmentor-auth-frontend" });
      if (!token) {
        throw new Error("Authentication token not available");
      }

      const response = await fetch(`${BACKEND_URL}/academic/classroom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Access denied. Admin privileges required.");
        }
        throw new Error("Failed to create classroom");
      }

      // Redirect to home page after successful creation
      navigate("/");
    } catch (error) {
      console.error("Error creating classroom:", error);
      alert(error instanceof Error ? error.message : "Failed to create classroom. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Add New Classroom (Admin Only)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Classroom Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter classroom title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrolled_student_count">Enrolled Student Count</Label>
              <Input
                id="enrolled_student_count"
                name="enrolled_student_count"
                type="number"
                value={formData.enrolled_student_count}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class_image">Class Image URL</Label>
              <Input
                id="class_image"
                name="class_image"
                type="url"
                value={formData.class_image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.webp"
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
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Creating..." : "Create Classroom"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
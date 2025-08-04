import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BACKEND_URL } from "@/config/env";
import { useAuth } from "@clerk/clerk-react";
import { FullSession, SessionStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default function SessionManagementPage() {
  const { getToken } = useAuth();
  const [sessions, setSessions] = useState<FullSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingSessionId, setUpdatingSessionId] = useState<number | null>(null);

  // Fetch all sessions
  useEffect(() => {
    async function fetchSessions() {
      try {
        const token = await getToken({ template: "skillmentor-auth-frontend" });
        if (!token) {
          throw new Error("Authentication token not available");
        }

        const response = await fetch(`${BACKEND_URL}/academic/session`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("Access denied. Admin privileges required.");
          }
          throw new Error("Failed to fetch sessions");
        }

        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        alert(error instanceof Error ? error.message : "Failed to fetch sessions");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSessions();
  }, [getToken]);

  const handleStatusUpdate = async (sessionId: number, newStatus: SessionStatus) => {
    setUpdatingSessionId(sessionId);
    
    try {
      const token = await getToken({ template: "skillmentor-auth-frontend" });
      if (!token) {
        throw new Error("Authentication token not available");
      }

      const response = await fetch(`${BACKEND_URL}/academic/session/${sessionId}?sessionStatus=${newStatus}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Access denied. Admin privileges required.");
        }
        throw new Error("Failed to update session status");
      }

      // Update the session in the local state
      setSessions(prevSessions => 
        prevSessions.map(session => 
          session.session_id === sessionId 
            ? { ...session, session_status: newStatus }
            : session
        )
      );

      alert(`Session status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating session status:", error);
      alert(error instanceof Error ? error.message : "Failed to update session status");
    } finally {
      setUpdatingSessionId(null);
    }
  };

  const getStatusBadgeColor = (status: SessionStatus) => {
    switch (status) {
      case SessionStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case SessionStatus.ACCEPTED:
        return "bg-blue-100 text-blue-800";
      case SessionStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center">
          <div className="text-lg">Loading sessions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Session Management (Admin Only)</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No sessions found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sessions.map((session) => (
                <Card key={session.session_id} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Student Information */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">Student Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> {session.student.first_name} {session.student.last_name}</p>
                        <p><span className="font-medium">ID:</span> {session.student.student_id}</p>
                        <p><span className="font-medium">Email:</span> {session.student.email}</p>
                      </div>
                    </div>

                    {/* Mentor Information */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">Mentor Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Name:</span> {session.mentor.first_name} {session.mentor.last_name}</p>
                        <p><span className="font-medium">ID:</span> {session.mentor.mentor_id}</p>
                        <p><span className="font-medium">Email:</span> {session.mentor.email}</p>
                      </div>
                    </div>

                    {/* Session Information */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">Session Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Session ID:</span> {session.session_id}</p>
                        <p><span className="font-medium">Topic:</span> {session.topic}</p>
                        <p><span className="font-medium">Start Time:</span> {formatDateTime(session.start_time)}</p>
                        <p><span className="font-medium">End Time:</span> {formatDateTime(session.end_time)}</p>
                        <p><span className="font-medium">Session Fee:</span> ${(session.mentor.session_fee / 100).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Status:</span>
                      <Badge className={getStatusBadgeColor(session.session_status)}>
                        {session.session_status}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      {session.session_status === SessionStatus.PENDING && (
                        <>
                          <Button
                            onClick={() => handleStatusUpdate(session.session_id, SessionStatus.ACCEPTED)}
                            disabled={updatingSessionId === session.session_id}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {updatingSessionId === session.session_id ? "Updating..." : "Accept"}
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(session.session_id, SessionStatus.COMPLETED)}
                            disabled={updatingSessionId === session.session_id}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {updatingSessionId === session.session_id ? "Updating..." : "Complete"}
                          </Button>
                        </>
                      )}
                      {session.session_status === SessionStatus.ACCEPTED && (
                        <Button
                          onClick={() => handleStatusUpdate(session.session_id, SessionStatus.COMPLETED)}
                          disabled={updatingSessionId === session.session_id}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {updatingSessionId === session.session_id ? "Updating..." : "Complete"}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
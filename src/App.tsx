import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import PaymentPage from "@/pages/PaymentPage";
import AddClassroomPage from "@/pages/AddClassroomPage";
import SessionManagementPage from "@/pages/SessionManagementPage";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import AboutPage from "@/pages/AboutPage";
import AddMentorPage from "@/pages/AddMentorPage";
import MentorsPage from "@/pages/MentorsPage";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <DashboardPage />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/add-classroom"
            element={
              <>
                <SignedIn>
                  <AddClassroomPage />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/add-mentor"
            element={
              <>
                <SignedIn>
                 <AddMentorPage />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />
          
          <Route
            path="/mentors"
            element={
              <>
                <SignedIn>
                 
                </SignedIn>
                <MentorsPage />
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />

          <Route
            path="/session-management"
            element={
              <>
                <SignedIn>
                  <SessionManagementPage />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/payment/:sessionId"
            element={
              <>
                <SignedIn>
                  <PaymentPage />
                </SignedIn>
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              </>
            }
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Connect from "@/pages/Connect";
import ConnectHub from "@/pages/ConnectHub";
import LearnIndex from "@/routes/learn/index";
import LearnGuidePage from "@/routes/learn/[slug]";
import SolarNavigatorPage from "@/routes/solar-navigator";
import SolarNavigator from "@/pages/SolarNavigator";
import PlanHub from "@/pages/PlanHub";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import RequestHelp from "@/pages/RequestHelp";
import SignIn from "@/pages/SignIn";
import Register from "@/pages/Register";
import MyAccount from "@/pages/MyAccount";
import Dashboard from "@/pages/Dashboard";
import ProfilePage from "@/pages/ProfilePage";
import AccountCreate from "@/pages/AccountCreate";
import Safety from "@/pages/Safety";
import CommunityGuidelines from "@/pages/CommunityGuidelines";
import SolarSpinner from "@/components/ui/SolarSpinner";
import PageTransition from "@/app/PageTransition";

const SolarConfigurator = React.lazy(() => import("@/pages/SolarConfigurator"));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          }
        />
        <Route
          path="/connect"
          element={
            <PageTransition>
              <ConnectHub />
            </PageTransition>
          }
        />
        <Route
          path="/connect/helpers"
          element={
            <PageTransition>
              <Connect />
            </PageTransition>
          }
        />
        <Route
          path="/learn"
          element={
            <PageTransition>
              <LearnIndex />
            </PageTransition>
          }
        />
        <Route
          path="/learn/:slug"
          element={
            <PageTransition>
              <LearnGuidePage />
            </PageTransition>
          }
        />
        <Route
          path="/plan"
          element={
            <PageTransition>
              <PlanHub />
            </PageTransition>
          }
        />
        <Route
          path="/solar-navigator"
          element={
            <PageTransition>
              <SolarNavigatorPage />
            </PageTransition>
          }
        />
        <Route
          path="/plan/navigator"
          element={
            <PageTransition>
              <SolarNavigator />
            </PageTransition>
          }
        />
        <Route
          path="/configurator"
          element={
            <PageTransition>
              <Suspense
                fallback={
                  <div className="flex min-h-[600px] items-center justify-center">
                    <SolarSpinner message="Loading 3D Builder..." size="lg" />
                  </div>
                }
              >
                <SolarConfigurator />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <Projects />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <PageTransition>
              <ProjectDetail />
            </PageTransition>
          }
        />
        <Route
          path="/request"
          element={
            <PageTransition>
              <RequestHelp />
            </PageTransition>
          }
        />
        <Route
          path="/request-help"
          element={
            <PageTransition>
              <RequestHelp />
            </PageTransition>
          }
        />
        <Route
          path="/sign-in"
          element={
            <PageTransition>
              <SignIn />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path="/my-account"
          element={
            <PageTransition>
              <MyAccount />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PageTransition>
              <ProfilePage />
            </PageTransition>
          }
        />
        <Route
          path="/account/create"
          element={
            <PageTransition>
              <AccountCreate />
            </PageTransition>
          }
        />
        <Route
          path="/safety"
          element={
            <PageTransition>
              <Safety />
            </PageTransition>
          }
        />
        <Route
          path="/community-guidelines"
          element={
            <PageTransition>
              <CommunityGuidelines />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;


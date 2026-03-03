import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import SectionContainer from "../components/ui/section-container";
import ProjectWorkspace from "../components/ui/project-workspace";
import AnimatedButton from "../components/ui/animated-button";

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen px-6 py-12 text-slate-900 dark:text-white">
        <SectionContainer className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-200">Projects</p>
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <AnimatedButton onClick={() => navigate("/projects")} variant="outline">
            Back to projects
          </AnimatedButton>
        </SectionContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 text-slate-900 dark:text-white">
      <SectionContainer className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
          <ProjectWorkspace project={project} />
        </motion.div>
      </SectionContainer>
    </div>
  );
};

export default ProjectDetailPage;

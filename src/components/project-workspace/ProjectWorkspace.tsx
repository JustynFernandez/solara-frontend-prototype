import React from "react";
import ProjectWorkspaceContainer from "./ProjectWorkspaceContainer";
import type { ProjectWorkspaceProps } from "./types";

const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ project }) => <ProjectWorkspaceContainer project={project} />;

export default ProjectWorkspace;


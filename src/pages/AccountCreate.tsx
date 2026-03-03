import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { skillOptions } from "../data/mockData";
import AnimatedButton from "../components/ui/animated-button";
import SectionContainer from "../components/ui/section-container";
import { useAuth } from "../context/auth-context";
import { useEcoMode } from "../hooks/useEcoMode";
import { motion } from "framer-motion";
import SketchNote from "../components/ui/SketchNote";

const roles = ["Helper", "Seeker"];

const AccountCreate = () => {
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("Helper");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const { ecoModeEnabled } = useEcoMode();

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile({ roles: [selectedRole], skills: selectedSkills, photo });
    navigate("/my-account");
  };

  return (
    <div className="relative min-h-screen overflow-hidden py-12 text-slate-900 dark:text-slate-50">
      <SectionContainer className="relative space-y-8">
        <header className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,123,255,0.1),transparent_40%)]" />
          <div className="relative space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Create your profile</p>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Tell Solara how you want to participate.</h1>
            <p className="text-lg text-slate-700 dark:text-slate-200">
              Choose your role, pick your skills/resources, and add a profile photo (mock only). We'll keep this in-memory for now.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-solara-gold" />
                Guided by Solara
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-solara-blue" />
                Adaptive form effects {ecoModeEnabled ? "tuned for eco mode" : "in hyper motion"}
              </span>
            </div>
          </div>
        </header>

        <motion.form
          onSubmit={handleSave}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-6 rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#050a16]/85"
        >
          <Tabs defaultValue="role">
            <TabsList className="flex gap-2 rounded-full border border-white/70 bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-white/10">
              <TabsTrigger
                value="role"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition data-[state=active]:bg-white data-[state=active]:shadow-md dark:text-slate-200 dark:data-[state=active]:bg-solara-blue/20 dark:data-[state=active]:text-white"
              >
                Role
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition data-[state=active]:bg-white data-[state=active]:shadow-md dark:text-slate-200 dark:data-[state=active]:bg-solara-blue/20 dark:data-[state=active]:text-white"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="photo"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition data-[state=active]:bg-white data-[state=active]:shadow-md dark:text-slate-200 dark:data-[state=active]:bg-solara-blue/20 dark:data-[state=active]:text-white"
              >
                Photo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="role" className="mt-4 space-y-3">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Choose your role</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {roles.map((role) => {
                  const active = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      aria-pressed={active}
                      className={`flex flex-col gap-2 rounded-2xl border px-4 py-3 text-left shadow-sm transition ${
                        active
                          ? "border-solara-blue/50 bg-solara-blue/10 shadow-md animate-bloom dark:border-solara-blue/40 dark:bg-solara-blue/20"
                          : "border-white/70 bg-white/80 hover:border-solara-blue/30 hover:shadow dark:border-white/10 dark:bg-white/10 dark:hover:border-solara-blue/30"
                      }`}
                    >
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{role}</span>
                      <span className="text-xs text-slate-600 dark:text-slate-300">
                        {role === "Helper" ? "Offer skills, tools, and guidance." : "Seek help for installs, maintenance, and learning."}
                      </span>
                    </button>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-4 space-y-3">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Select your skills/resources</p>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        active
                          ? "bg-button-primary text-white shadow-sm animate-bloom"
                          : "border border-white/50 bg-white/80 text-slate-700 hover:border-solara-blue/30 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:border-solara-gold/30"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="photo" className="mt-4 space-y-3">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Profile photo</p>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="text-sm text-slate-700 dark:text-slate-300 file:mr-3 file:rounded-full file:border file:border-white/50 file:bg-white/80 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-solara-navy hover:file:bg-solara-blue/10 dark:file:border-white/10 dark:file:bg-white/10 dark:file:text-white"
                />
                {photo && <img src={photo} alt="Preview" className="h-14 w-14 rounded-xl object-cover shadow-sm ring-2 ring-solara-blue/30" />}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap items-center gap-3">
            <SketchNote text="Almost there" tone="gold" className="hidden sm:inline-flex" />
            <AnimatedButton type="submit">Save and continue</AnimatedButton>
            <AnimatedButton
              type="button"
              variant="outline"
              onClick={() => navigate("/my-account")}
            >
              Skip for now
            </AnimatedButton>
          </div>
        </motion.form>
      </SectionContainer>
    </div>
  );
};

export default AccountCreate;


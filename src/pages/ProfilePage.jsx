import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { helpers, mockUser } from "../data/mockData";
import SkillIcon, { skillDetails } from "../components/shared/SkillIcon";
import TooltipCard from "../components/shared/TooltipCard";
import AnimatedButton from "../components/ui/animated-button";

const statCard = (label, value) => (
  <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
    <p className="text-xs uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">{label}</p>
    <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
  </div>
);

const ProfilePage = () => {
  const { id } = useParams();
  const profile = helpers.find((helper) => helper.id === id) || mockUser;

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 text-slate-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto max-w-6xl space-y-8"
      >
        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="pointer-events-none absolute inset-[-8px] rounded-3xl bg-gradient-to-br from-solara-blue/25 to-solara-sky/20 blur-lg" />
                <img src={profile.photo} alt={profile.name} className="relative h-24 w-24 rounded-3xl object-cover ring-2 ring-solara-blue/40" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">Helper profile</p>
                <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white">{profile.name}</h1>
                <p className="text-slate-600 dark:text-slate-300">{profile.location}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.roles?.map((role) => (
                    <span key={role} className="rounded-full border border-solara-blue/30 bg-solara-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-solara-navy dark:border-solara-blue/40 dark:bg-solara-blue/20 dark:text-white">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <AnimatedButton href="/request-help" className="px-4 py-2">
                Request help
              </AnimatedButton>
              <AnimatedButton href="/connect" variant="outline" className="px-4 py-2">
                Connect
              </AnimatedButton>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">About</h2>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{profile.bio}</p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Skills & resources</h2>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Hover to learn</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {profile.skills?.map((skill) => (
                  <div key={skill} className="relative group">
                    <SkillIcon name={skill} className="h-12 w-12" />
                    <TooltipCard title={skill} description={skillDetails[skill] || "Shared knowledge"} />
                  </div>
                ))}
              </div>
              {profile.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">At a glance</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {statCard("Rating", profile.rating?.toFixed(1) ?? "4.8")}
                {statCard("Availability", profile.availability || "Flexible")}
                {statCard("Joined", profile.joinedAt || "2024")}
                {statCard("Activity", profile.activityScore ? `${profile.activityScore}%` : "90%")}
              </div>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Next steps</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <li className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-3 py-2 dark:border-white/10 dark:bg-white/5">
                  <span>Send a request</span>
                  <Link to="/request-help" className="text-sm font-semibold text-solara-navy hover:text-solara-blue dark:text-indigo-200 dark:hover:text-white">
                    Open
                  </Link>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-3 py-2 dark:border-white/10 dark:bg-white/5">
                  <span>Return to helpers</span>
                  <Link to="/connect" className="text-sm font-semibold text-solara-navy hover:text-solara-blue dark:text-indigo-200 dark:hover:text-white">
                    Browse
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RoleSelector from "../components/auth/RoleSelector";
import { useAuth } from "../context/auth-context";
import { locations, skillOptions } from "../data/mockData";
import SkillIcon from "../components/shared/SkillIcon";

const MyAccount = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(user || {});

  if (!user) {
    return (
      <div className="min-h-screen px-6 py-12 text-slate-900 dark:text-white">
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white/85 p-8 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">You are signed out</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Sign in to view your profile, listings, and saved helpers.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link to="/sign-in" className="rounded-full bg-button-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg">
              Sign In
            </Link>
            <Link to="/register" className="rounded-full border border-white/70 bg-white/80 px-5 py-2.5 text-sm font-semibold text-solara-navy shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-white">
              Create account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const toggleSkill = (skill) => {
    const exists = draft.skills?.includes(skill);
    const next = exists ? draft.skills.filter((s) => s !== skill) : [...(draft.skills || []), skill];
    setDraft((prev) => ({ ...prev, skills: next }));
  };

  const saveProfile = (event) => {
    event.preventDefault();
    updateProfile(draft);
    setEditing(false);
  };

  return (
    <div className="relative min-h-screen px-6 py-12 text-slate-900 dark:text-white">
      <div className="relative mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">My account</p>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Welcome back, {user.name}</h1>
            <p className="text-slate-600 dark:text-slate-300">Role: {user.roles?.join(", ")}</p>
          </div>
          <button
            type="button"
            onClick={() => setEditing((value) => !value)}
            className="rounded-full bg-button-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
          >
            {editing ? "Cancel" : "Edit profile"}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 md:grid-cols-[1.2fr,1fr]"
        >
          <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-4">
              <img src={user.photo} alt={user.name} className="h-20 w-20 rounded-2xl object-cover shadow-sm" />
              <div>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{user.location}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {user.roles?.map((role) => (
                    <span key={role} className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-700 dark:text-slate-200">{user.bio}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {user.skills?.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                  <SkillIcon name={skill} className="h-8 w-8" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Account actions</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-center justify-between rounded-xl border border-white/50 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <span>View your listings</span>
                <Link to="/connect" className="text-sm font-semibold text-solara-navy hover:text-solara-blue dark:text-indigo-200 dark:hover:text-white">
                  Open
                </Link>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-white/50 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <span>Request new help</span>
                <Link to="/request" className="text-sm font-semibold text-solara-navy hover:text-solara-blue dark:text-indigo-200 dark:hover:text-white">
                  Request
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        {editing && (
          <motion.form
            onSubmit={saveProfile}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5 rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                Name
                <input
                  type="text"
                  value={draft.name || ""}
                  onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm backdrop-blur focus:border-solara-blue focus:outline-none dark:border-white/10 dark:bg-white/10 dark:text-white"
                />
              </label>
              <label className="space-y-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                Location
                <select
                  value={draft.location || "London"}
                  onChange={(event) => setDraft((prev) => ({ ...prev, location: event.target.value }))}
                  className="w-full rounded-xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm backdrop-blur focus:border-solara-blue focus:outline-none dark:border-white/10 dark:bg-white/10 dark:text-white"
                >
                  {locations.filter((city) => city !== "Any").map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="space-y-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
              Bio
              <textarea
                rows="3"
                value={draft.bio || ""}
                onChange={(event) => setDraft((prev) => ({ ...prev, bio: event.target.value }))}
                className="w-full rounded-xl border border-white/50 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm backdrop-blur focus:border-solara-blue focus:outline-none dark:border-white/10 dark:bg-white/10 dark:text-white"
              />
            </label>

            <RoleSelector value={draft.roles || []} onChange={(roles) => setDraft((prev) => ({ ...prev, roles }))} />

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => {
                  const active = draft.skills?.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        active ? "bg-button-primary text-white shadow-md" : "border border-white/50 bg-white/80 text-slate-700 shadow-sm hover:border-solara-blue/30 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:border-solara-gold/30"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-button-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg">
              Save changes
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default MyAccount;

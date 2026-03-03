import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import RoleSelector from "../components/auth/RoleSelector";
import SketchNote from "../components/ui/SketchNote";
import { useAuth } from "../context/auth-context";
import { locations, skillOptions } from "../data/mockData";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    location: "London",
    bio: "",
    roles: ["Helper"],
    skills: [],
    photo: "",
  });
  const [status, setStatus] = useState("");

  const toggleSkill = (skill) => {
    const exists = form.skills.includes(skill);
    const next = exists ? form.skills.filter((s) => s !== skill) : [...form.skills, skill];
    setForm((prev) => ({ ...prev, skills: next }));
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(form);
    setStatus("Account created (mock). Continue to set up your profile...");
    setTimeout(() => navigate("/account/create"), 700);
  };

  return (
    <AuthForm
      title="Create your Solara profile"
      subtitle="Choose a role, add skills, and share a quick bio. This flow is mock-only - data stays in-memory."
      cta="Register"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-white/60 transition-all duration-200 placeholder:text-slate-400 focus:border-solara-blue focus:ring-solara-blue/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:placeholder:text-slate-400 dark:focus:border-solara-gold dark:focus:ring-solara-gold/50"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="location">
            Location
          </label>
          <select
            id="location"
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
            className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-white/60 transition-all duration-200 focus:border-solara-blue focus:ring-solara-blue/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:focus:border-solara-gold dark:focus:ring-solara-gold/50"
          >
            {locations.filter((city) => city !== "Any").map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="bio">
          Short bio
        </label>
        <textarea
          id="bio"
          rows="3"
          value={form.bio}
          onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
          className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-white/60 transition-all duration-200 placeholder:text-slate-400 focus:border-solara-blue focus:ring-solara-blue/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:placeholder:text-slate-400 dark:focus:border-solara-gold dark:focus:ring-solara-gold/50"
          placeholder="Share how you help or what you need."
        />
      </div>

      <RoleSelector value={form.roles} onChange={(roles) => setForm((prev) => ({ ...prev, roles }))} />

      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Skills and tools</p>
        <div className="flex flex-wrap gap-2">
          {skillOptions.map((skill) => {
            const active = form.skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? "bg-button-primary text-white shadow-sm"
                    : "border border-white/50 bg-white/80 text-slate-700 hover:border-solara-blue/30 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:border-solara-gold/30"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="photo">
          Profile picture (preview only)
        </label>
        <div className="flex items-center gap-3">
          <input id="photo" type="file" accept="image/*" onChange={handlePhoto} className="text-sm text-slate-700 dark:text-slate-300" />
          {form.photo && <img src={form.photo} alt="Preview" className="h-14 w-14 rounded-xl object-cover shadow-sm" />}
        </div>
      </div>

      {status && (
        <div className="rounded-xl border border-solara-blue/20 bg-solara-blue/10 px-4 py-3 text-sm font-semibold text-solara-navy dark:border-solara-gold/20 dark:bg-solara-gold/10 dark:text-solara-gold">
          {status}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <SketchNote text="Make it yours" tone="blue" className="hidden sm:inline-flex" />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-button-primary bg-[length:220%_220%] px-5 py-3 text-sm font-semibold text-white shadow-solara-soft transition hover:scale-[1.02] hover:shadow-glow hover:bg-[position:100%_50%] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
        >
          Create account
        </button>
      </div>
    </AuthForm>
  );
};

export default Register;

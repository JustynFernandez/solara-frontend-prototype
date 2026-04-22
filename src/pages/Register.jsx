import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/auth-context";
import { locations, skillOptions } from "../data/mockData";

const fieldClassName =
  "w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm text-[var(--solara-text-strong)] outline-none transition placeholder:text-[var(--solara-text-muted)] focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]";

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

  const toggleRole = (role) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter((item) => item !== role) : [...prev.roles, role],
    }));
  };

  const toggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((item) => item !== skill) : [...prev.skills, skill],
    }));
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
      eyebrow="Create account"
      title="Create your Solara profile"
      subtitle="Choose your role, add skills, and share a short bio. This flow stays mock-only and in-memory, but it should still feel curated."
      cta="Register"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--solara-text-strong)]" htmlFor="name">
            Name
          </label>
          <p className="text-sm leading-6 text-[var(--solara-text-muted)]">This is the name that will appear on your profile card and requests.</p>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className={fieldClassName}
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--solara-text-strong)]" htmlFor="location">
            Location
          </label>
          <p className="text-sm leading-6 text-[var(--solara-text-muted)]">Used to shape helper discovery and nearby project suggestions.</p>
          <select
            id="location"
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
            className={fieldClassName}
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
        <label className="text-sm font-semibold text-[var(--solara-text-strong)]" htmlFor="bio">
          Short bio
        </label>
        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">Keep it short and practical. What do you help with, or what do you need?</p>
        <textarea
          id="bio"
          rows="3"
          value={form.bio}
          onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
          className={fieldClassName}
          placeholder="Share how you help or what you need."
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Role</p>
        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">Pick one or both so Solara can frame how you participate.</p>
        <div className="flex flex-wrap gap-2">
          {["Helper", "Seeker"].map((role) => {
            const active = form.roles.includes(role);
            return (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                    : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)] hover:border-[var(--solara-accent-soft)]"
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Skills and tools</p>
        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">These tags shape matching, not just decoration, so choose the ones that feel accurate.</p>
        <div className="flex flex-wrap gap-2">
          {skillOptions.map((skill) => {
            const active = form.skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                    : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-muted)] hover:border-[var(--solara-accent-soft)] hover:text-[var(--solara-text-strong)]"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--solara-text-strong)]" htmlFor="photo">
          Profile picture (preview only)
        </label>
        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">A simple image is enough. It helps the profile feel complete in the mock flow.</p>
        <div className="flex flex-wrap items-center gap-3">
          <input id="photo" type="file" accept="image/*" onChange={handlePhoto} className="text-sm text-[var(--solara-text-muted)] file:mr-3 file:rounded-full file:border file:border-[var(--solara-rule)] file:bg-[var(--solara-surface-2)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[var(--solara-text-strong)]" />
          {form.photo ? <img src={form.photo} alt="Preview" className="h-12 w-12 rounded-[1rem] object-cover border border-[var(--solara-rule)]" /> : null}
        </div>
      </div>

      {status ? (
        <div role="status" aria-live="polite" className="rounded-[1rem] border border-[var(--solara-accent-soft)] bg-[var(--solara-accent-soft)]/50 px-4 py-3 text-sm font-semibold text-[var(--solara-text-strong)]">
          {status}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button type="submit" className="solara-inline-action solara-inline-action--strong min-w-[10rem]">
          Create account
        </button>
        <Link to="/sign-in" className="solara-inline-action solara-inline-action--default">
          Sign in instead
        </Link>
      </div>
    </AuthForm>
  );
};

export default Register;

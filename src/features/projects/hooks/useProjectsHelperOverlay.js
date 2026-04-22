import { useEffect, useMemo, useState } from "react";
import { helpers } from "@/data/helpers";
import { useSavedHelpersStore } from "@/store/useSavedHelpersStore";

const defaultFilters = {
  search: "",
  level: "all",
  availability: "all",
  support: "all",
  minRating: 0,
};

export const useProjectsHelperOverlay = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [profile, setProfile] = useState(null);
  const savedHelpers = useSavedHelpersStore((state) => state.savedHelpers);
  const toggleSavedHelper = useSavedHelpersStore((state) => state.toggleSavedHelper);

  const featuredHelpers = useMemo(() => {
    const verifiedAvailable = helpers.filter((helper) => helper.verified && helper.availabilityStatus !== "unavailable");
    const verifiedFallback = helpers.filter((helper) => helper.verified);
    const source = verifiedAvailable.length > 0 ? verifiedAvailable : verifiedFallback;
    return source.slice(0, 4);
  }, []);

  const skillPool = useMemo(() => {
    const all = helpers.flatMap((helper) => helper.skills);
    return Array.from(new Set(all)).slice(0, 12);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (overlayOpen) {
      root.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      root.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [overlayOpen]);

  const filteredHelpers = useMemo(() => {
    const list = helpers.filter((helper) => {
      const matchSearch =
        filters.search.trim().length === 0 ||
        helper.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        helper.skills.some((skill) => skill.toLowerCase().includes(filters.search.toLowerCase()));
      const matchLevel = filters.level === "all" || helper.level === filters.level;
      const matchAvail = filters.availability === "all" || helper.availabilityStatus === filters.availability;
      const matchSupport = filters.support === "all" || helper.supportTypes.includes(filters.support);
      const matchRating = helper.rating >= filters.minRating;
      const matchSkill = selectedSkill === "all" || helper.skills.map((skill) => skill.toLowerCase()).includes(selectedSkill.toLowerCase());
      return matchSearch && matchLevel && matchAvail && matchSupport && matchRating && matchSkill;
    });
    if (sortBy === "rating") return [...list].sort((left, right) => right.rating - left.rating);
    if (sortBy === "projects") return [...list].sort((left, right) => right.completedProjectsCount - left.completedProjectsCount);
    if (sortBy === "response") return [...list].sort((left, right) => left.responseTimeLabel.localeCompare(right.responseTimeLabel));
    return list;
  }, [filters, selectedSkill, sortBy]);

  return {
    featuredHelpers,
    overlayOpen,
    setOverlayOpen,
    filters,
    setFilters,
    selectedSkill,
    setSelectedSkill,
    sortBy,
    setSortBy,
    profile,
    setProfile,
    savedHelpers,
    toggleSavedHelper,
    skillPool,
    filteredHelpers,
  };
};

import { guides } from "../data/learnContent";
// Map simple project cues to guide slugs.
export const recommendGuidesForProject = (project) => {
    const slugs = [];
    const add = (slug) => {
        if (!slugs.includes(slug) && guides.find((g) => g.slug === slug))
            slugs.push(slug);
    };
    if (project.ownershipStatus === "renter" || project.ownershipStatus === "unknown")
        add("navigator-warmup");
    if (project.roofAccessConfidence === "low" || project.roofAccessConfidence === "none")
        add("rooftop-safety-basics");
    if (project.shadingConfidence === "unknown" || project.shadingConfidence === "heavy")
        add("navigator-warmup");
    if (project.batteryInterest === "yes")
        add("backup-basics");
    if (project.supportPreference === "certified")
        add("workspace-playbook");
    // Fallback to tag matching
    project.tags.forEach((tag) => {
        const match = guides.find((g) => g.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())));
        if (match)
            add(match.slug);
    });
    add("maintenance-basics");
    return slugs.slice(0, 3);
};
export const guideBySlug = (slug) => guides.find((g) => g.slug === slug);

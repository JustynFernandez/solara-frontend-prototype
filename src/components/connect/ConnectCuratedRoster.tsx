import React from "react";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Helper } from "@/data/helpers";
import HelperAvatar from "./HelperAvatar";

type Props = {
  helpers: Helper[];
};

const levelLabel: Record<Helper["level"], string> = {
  community: "Community volunteer",
  trained: "Trained volunteer",
  certified: "Certified installer",
};

const getSpecialtyLine = (helper: Helper) => helper.skills.slice(0, 2).join(" / ");

const ConnectCuratedRoster: React.FC<Props> = ({ helpers }) => {
  const [lead, ...supporting] = helpers;

  if (!lead) return null;

  return (
    <section className="solara-connect-roster">
      <article className="solara-connect-roster__lead">
        <p className="solara-connect-roster__cardlabel">Lead availability</p>
        <div className="solara-connect-roster__lead-top">
          <HelperAvatar name={lead.name} src={lead.avatar} className="solara-connect-roster__lead-avatar" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="solara-connect-roster__name">{lead.name}</h3>
              {lead.verified ? <ShieldCheck className="h-3.5 w-3.5 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
            </div>
            <p className="solara-connect-roster__level">{levelLabel[lead.level]}</p>
          </div>
        </div>

        <div className="solara-connect-roster__details">
          <p>{lead.coarseLocationLabel}</p>
          <p>{lead.responseTimeLabel}</p>
          <p>{getSpecialtyLine(lead)}</p>
        </div>

        <div className="space-y-3">
          <p className="solara-connect-roster__specialty">{getSpecialtyLine(lead)}</p>
          <Link to={`/connect/helpers?helperId=${lead.id}`} className="solara-inline-action solara-inline-action--strong">
            View helper
          </Link>
        </div>
      </article>

      <div className="solara-connect-roster__supporting">
        {supporting.map((helper) => (
          <article key={helper.id} className="solara-connect-roster__supporting-row">
            <div className="solara-connect-roster__supporting-identity">
              <HelperAvatar name={helper.name} src={helper.avatar} className="solara-connect-roster__supporting-avatar" />
              <div className="solara-connect-roster__supporting-copy">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="solara-connect-roster__name">{helper.name}</p>
                  {helper.verified ? <ShieldCheck className="h-3 w-3 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
                </div>
                <p className="solara-connect-roster__level">{levelLabel[helper.level]}</p>
              </div>
            </div>

            <div className="solara-connect-roster__supporting-proof">
              <p>{helper.coarseLocationLabel}</p>
              <p>{helper.responseTimeLabel}</p>
              <p>{helper.skills[0]}</p>
            </div>

            <Link to={`/connect/helpers?helperId=${helper.id}`} className="solara-inline-action solara-inline-action--default solara-connect-roster__supporting-action">
              View helper
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ConnectCuratedRoster;

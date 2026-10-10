import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { RoadmapView, type RoadmapYearData } from "@/components/RoadmapView";
import { roadmapYears, roadmapForYear, type GameRecord } from "@/content/registry";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Roadmap",
  description:
    "The Lucky Riot Games multi-year release roadmap. Explore upcoming slots and video poker titles by year and quarter. Launch periods are provisional targets.",
  path: "/roadmap",
});

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function statusFor(r: GameRecord): { label: string; tone: "concept" | "dev" | "candidate" | "live" } {
  if (r.developmentStatus === "released") return { label: "Released", tone: "live" };
  if (r.playable && r.publicVisibility === "published") return { label: "Playable Development", tone: "dev" };
  if (r.developmentStatus === "ready" || r.developmentStatus === "certification") return { label: "Coming Soon", tone: "candidate" };
  if (r.developmentStatus === "concept") return { label: "Planned", tone: "concept" };
  return { label: "In Development", tone: "dev" };
}

/** Build the serializable roadmap data from the authoritative registry. */
function buildYears(): RoadmapYearData[] {
  return roadmapYears().map((year) => ({
    year,
    quarters: roadmapForYear(year).map((g) => ({
      quarter: g.quarter,
      entries: g.games.map((r) => {
        const s = statusFor(r);
        return {
          id: r.id,
          slug: r.slug,
          title: r.title,
          theme: r.theme,
          gameType: r.gameType,
          monthLabel: `${MONTHS[r.targetReleaseMonth - 1]} ${year}`,
          statusLabel: s.label,
          statusTone: s.tone,
          // Existing games have bespoke pages; planned games have the generic
          // detail route. Both resolve under /games/<slug>/.
          hasPage: true,
        };
      }),
    })),
  }));
}

export default function RoadmapPage() {
  const years = buildYears();

  return (
    <Section aria-labelledby="roadmap-heading">
      <Reveal>
        <SectionHeading
          id="roadmap-heading"
          eyebrow="Release Pipeline"
          title="The Lucky Riot Roadmap"
          intro="A multi-year pipeline of original slots and video poker. Launch periods are provisional roadmap targets, not confirmed release dates — and no title is advertised as released until it genuinely is."
        />
      </Reveal>
      <div className="mt-10">
        {years.length > 0 ? (
          <RoadmapView years={years} />
        ) : (
          <p className="rounded-xl2 border border-dashed border-riot-border bg-riot-surface/50 p-10 text-center text-riot-text-muted">
            The roadmap will appear here as titles are scheduled.
          </p>
        )}
      </div>
    </Section>
  );
}

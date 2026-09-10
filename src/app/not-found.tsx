import { ButtonLink } from "@/components/Button";
import { Mascot } from "@/components/brand/Mascot";

export default function NotFound() {
  return (
    <section className="surface-gradient">
      <div className="container-page flex min-h-[72vh] flex-col items-center justify-center py-20 text-center">
        <Mascot variant="character" size={220} alt="Lucky, the Lucky Riot mascot" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-lucky-gold">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.75rem)] uppercase text-riot-white">
          Looks Like Lucky Caused Some Trouble
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-riot-text">
          This page isn&apos;t where you left it. It may have moved, or perhaps it never existed.
          Let&apos;s get you back to the action.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/games/" size="lg" variant="secondary">
            Meet the Games
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

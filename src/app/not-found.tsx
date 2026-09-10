import { ButtonLink } from "@/components/Button";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="surface-gradient">
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <Logo showWordmark={false} className="h-16 w-16 text-riot-white" />
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-lucky-gold">
          Error 404
        </p>
        <h1 className="mt-4 text-display-lg font-extrabold text-riot-white">
          This page didn&apos;t make the cut.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-riot-text">
          The page you were looking for isn&apos;t here. It may have moved, or perhaps it never
          existed. Let&apos;s get you back to the action.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/games/" size="lg" variant="secondary">
            Explore Our Games
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

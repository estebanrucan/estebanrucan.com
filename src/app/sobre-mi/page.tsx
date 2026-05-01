import { Footer } from "@/components/site/footer";
import { ProfileVisual } from "@/components/site/profile-visual";
import { AccentHeading, SectionKicker } from "@/components/site/section-heading";
import { about, principles, profile } from "@/content/site";

export const metadata = {
  title: "Sobre mí",
};

export default function AboutPage() {
  return (
    <main className="page page--about">
      <section className="about-hero shell">
        <div className="about-copy">
          <AccentHeading accent="IA">{about.headline}</AccentHeading>
          <div className="about-paragraphs">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="about-profile">
          <ProfileVisual variant="card" showCaption={false} />
          <div className="about-card-caption">
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
            <small>{profile.location}</small>
          </div>
        </div>
      </section>

      <section id="como-pienso" className="principles shell">
        <div className="section-rule-heading">
          <SectionKicker>Cómo pienso</SectionKicker>
          <span aria-hidden="true" />
        </div>
        <div className="principles-grid">
          {principles.map((principle) => (
            <article className="principle-card" key={principle.number}>
              <span>{principle.number}</span>
              <p>
                {principle.title}
                <br />
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-band shell">
        <span aria-hidden="true">“</span>
        <blockquote>{about.quote}</blockquote>
      </section>

      <Footer className="shell" />
    </main>
  );
}

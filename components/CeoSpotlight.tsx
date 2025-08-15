import Image from "next/image";
import erp21 from "../content/erp21";

export default function CeoSpotlight() {
  const c = erp21.leadership.ceo;
  return (
    <section aria-labelledby="ceo-spotlight" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 items-stretch">
          {/* Photo */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
              <Image
                src={c.photo.src}
                alt={c.photo.alt}
                width={c.photo.width}
                height={c.photo.height}
                className="h-full w-full object-cover"
                priority={false}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 480px"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 flex">
            <div className="my-auto">
              <h2 id="ceo-spotlight" className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Leadership Spotlight
              </h2>
              <p className="mt-2 text-lg font-medium">{c.name}</p>
              <p className="text-sm text-neutral-600">{c.title}</p>
              <p className="mt-3 inline-flex items-center rounded-full bg-neutral-900 text-white text-xs sm:text-sm px-3 py-1">
                {c.highlight}
              </p>

              <div className="mt-6 space-y-3 text-neutral-800 leading-relaxed">
                {c.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <figure className="mt-6 border-l-4 pl-4 text-neutral-700 italic">
                "{c.quote}"
              </figure>

              {/* Credentials / Licence */}
              <div className="mt-6 text-sm text-neutral-600">
                <span className="font-medium">MOM Licence:</span> {erp21.about.momLicence}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

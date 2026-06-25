const communityLinks = [
  {
    id: "free-channel",
    icon: "📡",
    title: "Join Free Channel",
    subtitle: "Official link · previews & drops",
    href: "https://t.me/+FZv49DSqQ_lmODcx",
  },
  {
    id: "chatroom",
    icon: "💬",
    title: "Official Chatroom",
    subtitle: "Active now · talk to members",
    href: "https://t.me/+KsCdMv3mCSVlY2Vh",
  },
  {
    id: "admin",
    icon: "🛡️",
    title: "Contact Admin",
    subtitle: "Support & manual orders",
    href: "https://t.me/savslayr",
  },
];

export const ActionLinks = () => {
  return (
    <section className="mt-6 space-y-4 md:mt-7 md:space-y-5">

      {/* HEADER (unchanged except spacing normalization) */}
      <div className="px-1 text-center md:text-left">
        <h3 className="text-[30px] font-extrabold tracking-tight text-white md:text-[42px]">
          Join The Community
        </h3>
        <p className="mt-2 text-sm text-green-200/85 md:text-base">
          Free channel, live chatroom & direct admin support
        </p>
      </div>

      {/* LINKS GRID (FIXED SHAPE SYSTEM) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">

        {communityLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="
              group relative
              flex flex-col justify-between
              text-center md:text-left
              rounded-2xl
              border border-green-400/45
              bg-[linear-gradient(180deg,rgba(2,15,9,0.96)_0%,rgba(2,9,6,0.98)_100%)]
              p-5
              min-h-[220px]
              transition-all duration-300
              hover:-translate-y-1
              hover:border-green-300/70
              hover:shadow-[0_0_28px_rgba(34,197,94,0.18)]
            "
          >
            {/* ICON (standardized size so cards don’t stretch differently) */}
            <span className="mx-auto md:mx-0 flex h-12 w-12 items-center justify-center rounded-2xl border border-green-300/35 bg-green-500/10 text-2xl shadow-[0_0_18px_rgba(34,197,94,0.18)]">
              {link.icon}
            </span>

            {/* TEXT BLOCK */}
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-[20px] md:text-[24px] font-bold text-white leading-tight">
                {link.title}
              </span>

              <span className="text-xs md:text-sm text-green-100/70">
                {link.subtitle}
              </span>
            </div>

            {/* ARROW (kept but visually balanced now) */}
            <span
              aria-hidden="true"
              className="
                mt-4
                text-[22px]
                font-light
                text-green-200/75
                transition-transform
                group-hover:translate-x-1
              "
            >
              →
            </span>

            {/* glow background (unchanged effect, just sits cleaner now) */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(74,222,128,0.14),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.10),transparent_60%)]" />
          </a>
        ))}
      </div>
    </section>
  );
};

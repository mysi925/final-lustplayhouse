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
    <section className="mt-6 space-y-3 md:mt-7 md:space-y-4 font-sans">
      
      {/* HEADER */}
      <div className="px-1 text-center md:text-left">
        <h3 className="text-[30px] font-extrabold tracking-tight text-white md:text-[42px] md:leading-[1.02]">
          Join The Community
        </h3>

        <p className="mt-2 text-sm text-red-200/70 md:text-base">
          Free channel, live chatroom & direct admin support
        </p>
      </div>

      {/* LINKS */}
      <div className="space-y-3 md:space-y-4">
        {communityLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="
              group relative flex items-center gap-4 overflow-hidden
              rounded-[26px]
              border border-red-500/30
              bg-[linear-gradient(180deg,rgba(10,0,0,0.92)_0%,rgba(5,0,0,0.98)_100%)]
              px-4 py-4 md:px-6 md:py-5
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-red-400/70
              hover:shadow-[0_0_25px_rgba(255,0,0,0.18)]
            "
          >
            {/* ICON */}
            <span className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl
              border border-red-400/30
              bg-red-500/10
              text-2xl
              shadow-[0_0_18px_rgba(255,0,0,0.15)]
            ">
              {link.icon}
            </span>

            {/* TEXT */}
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-[27px] font-bold leading-none text-white md:text-[39px]">
                {link.title}
              </span>

              <span className="mt-1 block text-xs text-red-100/60 md:text-sm">
                {link.subtitle}
              </span>
            </span>

            {/* ARROW */}
            <span
              aria-hidden="true"
              className="
                text-[28px] font-light leading-none text-red-200/70
                transition-transform duration-300
                group-hover:translate-x-1 group-hover:text-red-100
                md:text-[34px]
              "
            >
              →
            </span>

            {/* BACKGROUND GLOW (RED INSTEAD OF GREEN) */}
            <span className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_12%_20%,rgba(255,0,0,0.12)_0%,rgba(0,0,0,0)_50%),radial-gradient(circle_at_88%_100%,rgba(180,0,0,0.10)_0%,rgba(0,0,0,0)_50%)]" />
          </a>
        ))}
      </div>
    </section>
  );
};

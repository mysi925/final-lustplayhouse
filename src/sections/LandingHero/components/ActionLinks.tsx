const communityLinks = [
  {
    id: "free-channel",
    icon: "📡",
    title: "Join Free Channel",
    subtitle: "Official link · previews & drops",
    href: "https://t.me/",
  },
  {
    id: "chatroom",
    icon: "💬",
    title: "Official Chatroom",
    subtitle: "Active now · talk to members",
    href: "https://t.me/",
  },
  {
    id: "admin",
    icon: "🛡️",
    title: "Contact Admin",
    subtitle: "Support & manual orders",
    href: "https://t.me/",
  },
];

export const ActionLinks = () => {
  return (
    <section className="mt-6 space-y-3 md:mt-7 md:space-y-4">
      <div className="px-1 text-center md:text-left">
        <h3 className="text-[30px] font-extrabold tracking-tight text-white md:text-[42px] md:leading-[1.02]">
          Join The Community
        </h3>
        <p className="mt-2 text-sm text-green-200/85 md:text-base">
          Free channel, live chatroom & direct admin support
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {communityLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center gap-4 overflow-hidden rounded-[30px] border border-green-400/45 bg-[linear-gradient(180deg,rgba(2,15,9,0.96)_0%,rgba(2,9,6,0.98)_100%)] px-4 py-4 shadow-[0_0_0_1px_rgba(34,197,94,0.12)_inset,0_0_24px_rgba(34,197,94,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300/75 hover:shadow-[0_0_0_1px_rgba(134,239,172,0.32)_inset,0_0_34px_rgba(74,222,128,0.26)] md:px-6 md:py-5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-green-300/35 bg-green-500/10 text-2xl shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              {link.icon}
            </span>

            <span className="min-w-0 flex-1 text-left">
              <span className="block text-[27px] font-bold leading-none text-white md:text-[39px] md:leading-none">
                {link.title}
              </span>
              <span className="mt-1 block text-xs text-green-100/70 md:text-sm">
                {link.subtitle}
              </span>
            </span>

            <span
              aria-hidden="true"
              className="text-[28px] font-light leading-none text-green-200/75 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-green-100 md:text-[34px]"
            >
              →
            </span>

            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(74,222,128,0.2)_0%,rgba(0,0,0,0)_46%),radial-gradient(circle_at_88%_100%,rgba(16,185,129,0.16)_0%,rgba(0,0,0,0)_46%)] opacity-80"></span>
          </a>
        ))}
      </div>
    </section>
  );
};

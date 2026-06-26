export const FaqSection = () => {
  return (
    <section className="text-center md:text-left font-sans">

      <h2 className="text-xl md:text-[26px] font-extrabold tracking-tight text-white mb-6">
        Frequently Asked Questions
      </h2>

      {/* ================= ITEM ================= */}
      <article className="border border-red-500/15 bg-black/60 rounded-xl overflow-hidden mb-3">

        <button className="flex items-center justify-between w-full p-4 md:p-5 bg-transparent">
          <span className="text-[10px] md:text-[13px] font-bold uppercase tracking-wide text-gray-200">
            How long does it take to gain access?
          </span>

          <img
            src="https://c.animaapp.com/mqt2uy69MQEOY8/assets/icon-15.svg"
            alt="Icon"
            className="w-4 h-4 opacity-60"
          />
        </button>

        <div className="bg-black/40 overflow-hidden max-h-0">
          <div className="p-4 md:p-5 text-sm text-gray-400 leading-relaxed">
            After purchase, you will be instructed to message our Administrator{" "}
            <span className="text-red-400 font-semibold">
              doctorbtcxxx
            </span>{" "}
            on Telegram. You will receive a unique access token granting entry
            to all premium channels including exclusive content vault access.
          </div>
        </div>
      </article>

      {/* ================= ITEM ================= */}
      <article className="border border-red-500/15 bg-black/60 rounded-xl overflow-hidden mb-3">

        <button className="flex items-center justify-between w-full p-4 md:p-5">
          <span className="text-[10px] md:text-[13px] font-bold uppercase tracking-wide text-gray-200">
            What payment methods do you accept?
          </span>

          <img
            src="https://c.animaapp.com/mqt2uy69MQEOY8/assets/icon-15.svg"
            alt="Icon"
            className="w-4 h-4 opacity-60"
          />
        </button>

        <div className="bg-black/40 overflow-hidden max-h-0">
          <div className="p-4 md:p-5 text-sm text-gray-400 leading-relaxed">
            We accept PayPal and Cryptocurrency. You can also use card-based
            checkout systems like Gumroad for secure access purchases.
          </div>
        </div>
      </article>

      {/* ================= ITEM ================= */}
      <article className="border border-red-500/15 bg-black/60 rounded-xl overflow-hidden mb-3">

        <button className="flex items-center justify-between w-full p-4 md:p-5">
          <span className="text-[10px] md:text-[13px] font-bold uppercase tracking-wide text-gray-200">
            When can I cancel my subscription?
          </span>

          <img
            src="https://c.animaapp.com/mqt2uy69MQEOY8/assets/icon-15.svg"
            alt="Icon"
            className="w-4 h-4 opacity-60"
          />
        </button>

        <div className="bg-black/40 overflow-hidden max-h-0">
          <div className="p-4 md:p-5 text-sm text-gray-400 leading-relaxed">
            You can cancel anytime. Manage your subscription through your
            payment provider or by contacting support directly.
          </div>
        </div>
      </article>

      {/* ================= ITEM ================= */}
      <article className="border border-red-500/15 bg-black/60 rounded-xl overflow-hidden">

        <button className="flex items-center justify-between w-full p-4 md:p-5">
          <span className="text-[10px] md:text-[13px] font-bold uppercase tracking-wide text-gray-200">
            How often is new content added?
          </span>

          <img
            src="https://c.animaapp.com/mqt2uy69MQEOY8/assets/icon-15.svg"
            alt="Icon"
            className="w-4 h-4 opacity-60"
          />
        </button>

        <div className="bg-black/40 overflow-hidden max-h-0">
          <div className="p-4 md:p-5 text-sm text-gray-400 leading-relaxed">
            New content is added weekly. Our system is continuously updated
            with fresh uploads and community contributions.
          </div>
        </div>
      </article>

    </section>
  );
};

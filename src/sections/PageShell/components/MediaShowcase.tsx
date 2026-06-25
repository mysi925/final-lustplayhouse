export const MediaShowcase = () => {
  return (
    <div className="box-border caret-transparent text-[13.3333px] leading-5 outline-[3px] break-words relative text-center no-underline my-[23.3333px] md:text-[17.3333px] md:leading-[26px] md:my-[34.6667px]">
      <div className="aspect-[1.77778_/_1] bg-black border border-rose-500/30 shadow-[0_0_35px_rgba(244,63,94,0.18)] box-border caret-transparent inline-block text-[13.3333px] leading-5 max-w-full outline-[3px] break-words relative no-underline align-top w-[430px] overflow-hidden rounded-2xl md:text-[17.3333px] md:leading-[26px] md:w-[559px]">
        <img
          src="https://c.animaapp.com/mqt2uy69MQEOY8/img/uploaded-asset-1782366350240-0.jpeg"
          alt="Interface Preview"
          className="box-border caret-transparent text-[13.3333px] h-full leading-5 max-w-full object-cover outline-[3px] break-words absolute no-underline w-full inset-0 md:text-[17.3333px] md:leading-[26px]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-rose-200 text-[10px] font-bold uppercase tracking-[1px] md:text-[12px]">
            Futuristic visual layer
          </p>
          <p className="text-gray-300 text-[10px] md:text-[12px]">
            No clickable controls, just guided interface context.
          </p>
        </div>
      </div>
    </div>
  );
};

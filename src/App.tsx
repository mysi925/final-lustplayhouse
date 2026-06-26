import { PageShell } from "@/sections/PageShell";

export const App = () => {
  return (
    <body className="accent-auto bg-zinc-950 box-border caret-transparent text-white flex text-[13.3333px] not-italic normal-nums font-normal justify-center tracking-[normal] leading-5 list-outside list-disc min-h-[1000px] min-w-80 outline-[3px] break-words overflow-x-hidden overflow-y-auto pointer-events-auto text-start no-underline indent-[0px] normal-case visible border-separate font-plus_jakarta_sans md:text-[17.3333px] md:leading-[26px] before:accent-auto before:bg-[url(data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20preserveAspectRatio%3D%22none%22%3E%20%3Cstyle%3E%20path%20%7B%20stroke%3A%20rgba%28245,230,230,0.212)] before:bg-center before:bg-no-repeat before:bg-cover before:box-border before:caret-transparent before:text-white before:block before:text-[13.3333px] before:not-italic before:normal-nums before:font-normal before:h-[1000px] before:tracking-[normal] before:leading-5 before:list-outside before:list-disc before:outline-[3px] before:break-words before:pointer-events-none before:fixed before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-[375px] before:z-0 before:border-separate before:left-0 before:top-0 before:font-plus_jakarta_sans before:md:text-[17.3333px] before:md:leading-[26px] before:md:w-[1280px]">
      <PageShell />
    </body>
  );
};
import Checkout from "./pages/Checkout";

<Route path="/checkout" element={<Checkout />} />

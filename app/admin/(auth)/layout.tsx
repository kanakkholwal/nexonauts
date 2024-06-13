export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen h-full w-full flex flex-col justify-center items-center">
      <div className="rounded-3xl bg-white dark:bg-slate-800 flex justify-around items-center shadow-lg ">
        <div
          className="w-full lg:w-[35rem] border-2 border-white rounded-3xl dark:border-transparent"
          data-aos="fade-left"
        >
          <div className="relative" id="hero">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
            >
              <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
              <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
          </div>
          <div className="py-8 px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

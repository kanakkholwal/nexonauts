export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen h-full w-full flex flex-col justify-center items-center">
            <div className="relative" id="hero">
                <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
                </div>
            </div>
            {children}
        </div>
    )
}

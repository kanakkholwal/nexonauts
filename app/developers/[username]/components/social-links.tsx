
export default function SocialLinks({ socials}: { socials: Record<string, string>}) {

    return (<>
        <div className="flex flex-row items-center justify-start gap-2">
            {Object.entries(socials).map(([key, value]) => (
                <a href={value} target="_blank" rel="noopener noreferrer" className="flex item-center justify-center flex-col gap-1 p-2 rounded-md bg-slate-100 hover:bg-primary  text-slate-500 hover:text-slate-600 transition-colors duration-200">{key}</a>
            ))}
        </div>
    </>)

}

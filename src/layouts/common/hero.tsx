import Link from "next/link"


export default function Hero({title,path}:{
    title:string,
    path:{
        name:string,
        path:string
    }[]
}) {
    return (<section className="relative z-10 mt-20 lg:mt-15 xl:mt-20 pb-18 bg-slate-100">

	<div className="text-center px-4 py-20">
		<h1 className="font-extrabold text-4xl  mb-3">{title}</h1>
		<ul className="flex items-center justify-center gap-2 text-slate-600">
			<li className="font-medium"><Link href="/">Home</Link></li>
			{path.map((item,index)=>{
                return (<li className="font-medium" key={index}>/{" "}{item.name}</li>)
            })}
		</ul>
	</div>
</section>
)
}
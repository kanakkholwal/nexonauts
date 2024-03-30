import MeshSvg from "./mesh.svg"

export default function Mesh() {

    return (<div className="flex absolute data-rf-layer rounded-[inherit] flex-row h-[65%] top-[-30%] left-[-20%] right-[-24%]">
    <div className="flex flex-row relative overflow-hidden h-full w-full origin-center opacity-50 blur-[120px]">
        <img alt="mesh" fetchPriority="high" decoding="async" data-nimg="fill"
            style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'fill', objectPosition: 'center', color: 'transparent' }}
            src={MeshSvg} />
    </div>
</div>
)
}
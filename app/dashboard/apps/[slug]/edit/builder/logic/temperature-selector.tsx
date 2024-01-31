export {}
// import { SliderProps } from "@radix-ui/react-slider"
// import * as React from "react"

// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { FaTemperatureEmpty } from "react-icons/fa6"
// import { AppConfigType } from "src/types/app"
// import { useBuilderContext } from "../../common/context/builder-context"
// interface TemperatureSelectorProps {
//   defaultValue: SliderProps["defaultValue"]
// }

// export function TemperatureSelector({
//   defaultValue,
// }: TemperatureSelectorProps) {
//   const [value, setValue] = React.useState(defaultValue)
//   const { builderData, updateBuilderData } = useBuilderContext();

//   return (
//     <div className="grid gap-2 pt-2">
//       <HoverCard openDelay={200}>
//         <HoverCardTrigger asChild>
//           <div className="grid gap-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <Label htmlFor="temperature">
//                   <FaTemperatureEmpty className="h-4 w-4 mr-2 shrink-0 inline-block" />
//                   Temperature

//                 </Label>

//                 <p className="text-sm text-muted-foreground">
//                   Creativity allowed in the responses.
//                 </p>

//               </div>
//               <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
//                 {value}
//               </span>
//             </div>
//             <Slider
//               id="temperature"
//               max={1}
//               defaultValue={value}
//               step={0.1}
//               onValueChange={value => {
//                 setValue(value);
//                 let config = {
//                   ...builderData.config,
//                   hyperparameters: {
//                     ...builderData?.config?.hyperparameters,
//                     "temperature": value[0]
//                   }
//                 } as AppConfigType
//                 updateBuilderData({
//                   ...builderData,
//                   config
//                 });
//               }}
//               className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
//               aria-label="Temperature"
//             />
//           </div>
//         </HoverCardTrigger>
//         <HoverCardContent
//           align="start"
//           className="w-[260px] text-sm"
//           side="left"
//         >
//           Controls randomness: lowering results in less random completions. As
//           the temperature approaches zero, the model will become deterministic
//           and repetitive.
//         </HoverCardContent>
//       </HoverCard>
//     </div>
//   )
// }

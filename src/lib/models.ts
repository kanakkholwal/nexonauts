export const types = [
    "Google AI",
    "GPT-3",
    // "Codex",
    "GPT-4",
] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
    id: string
    name: string
    description: string
    strengths?: string
    type: Type
}
export const availableModels = {
    google_ai: [
        "text-bison-001",
    ],
    openai: [
        "davinci",
        "curie",
        "babbage",
        "ada",
        "gpt-3.5-turbo-instruct"
    ]
} as const
export const models: Model<ModelType>[] = [
    {
        id: "c305f976-8e38-42b1-9fb7-d21b2e34f0sad",
        name: "gpt-3.5-turbo-instruct",
        description:
            "It's the latest addition to the GPT-3 series, combining the strengths of its predecessors with enhanced performance and versatility.",
        type: "GPT-4",
        strengths:
            "Enhanced Performance, Language Understanding, Creative Generation, Intent Recognition",
    },
    {
        id: "c305f976-8e38-42b1-9fb7-d21b2e3fg4f0sad",
        name: "text-bison-001",
        description:
            "Pathways Language Model (PaLM): A 540-billion parameter, dense decoder Transformer model from Google AI, using Pathways system, achieves state-of-the-art few-shot performance on various language tasks, pushing the limits of model scale and efficiency.    ",
        type: "Google AI",
        strengths:
            "Word completion, code completion, question answering, summarization, sentiment analysis",
    },

    {
        id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
        name: "davinci",
        description:
            "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.",
        type: "GPT-3",
        strengths:
            "Complex intent, cause and effect, creative generation, search, summarization for audience",
    },
    {
        id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
        name: "curie",
        description: "Very capable, but faster and lower cost than Davinci.",
        type: "GPT-3",
        strengths:
            "Language translation, complex classification, sentiment, summarization",
    },
    {
        id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
        name: "babbage",
        description: "Capable of straightforward tasks, very fast, and lower cost.",
        type: "GPT-3",
        strengths: "Moderate classification, semantic search",
    },
    {
        id: "be638fb1-973b-4471-a49c-290325085802",
        name: "ada",
        description:
            "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
        type: "GPT-3",
        strengths:
            "Parsing text, simple classification, address correction, keywords",
    },

]
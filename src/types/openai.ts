interface TextCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: TextCompletionChoice[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }
  
  interface TextCompletionChoice {
    text: string;
    index: number;
    logprobs: null;
    finish_reason: string;
  }

  export type{TextCompletionResponse}
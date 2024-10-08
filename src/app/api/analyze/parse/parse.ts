import OpenAI from "openai";
import { defaultPrompt } from "../../../common/openapi-prompt";

function schema() {
  return {
    type: "object",
    properties: {
      personalData: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          address: {
            type: "string",
          },
        },
        required: ["email"],
      },
      skills: {
        type: "array",
        items: {
          type: "string",
        },
      },
      workExperience: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            companyName: {
              type: "string",
            },
            description: {
              type: "string",
            },
            staringDate: {
              type: "string",
            },
            endDate: {
              type: "string",
            },
          },
        },
      },
      Education: {
        type: "array",
        items: {
          type: "object",
          properties: {
            credentialName: {
              type: "string",
            },
            startingDate: {
              type: "string",
            },
            endDate: {
              type: "string",
            },
            institute: {
              type: "string",
            },
          },
        },
      },
    },
  };
}

const client = new OpenAI();
export function parseCv(content: string, prompt = defaultPrompt()) {
  const newPrompt = {
    ...prompt,
  };
  newPrompt.messages.push({
    role: "user",
    content: content,
  });

  return client.chat.completions.create(newPrompt);
}

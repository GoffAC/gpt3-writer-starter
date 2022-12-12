import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "";
const basePromptSuffix =
  "\n\n  Using the info above, write a concise statement of the problem the company is addressing and how it will solve that problem. Write in a short, exciting way, similar to how apple writes, with a headline and a short paragraph";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
  console.log(process.env.OPENAI_API_KEY);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffix}`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;

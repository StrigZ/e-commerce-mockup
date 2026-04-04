import GigaChat from 'gigachat';
import { Agent } from 'node:https';
import { Item } from './types.ts';
import { getGenerateDescriptionPrompt, getImproveDescriptionPrompt, getMarketPricePrompt } from './prompts.ts';



const httpsAgent = new Agent({ rejectUnauthorized: false });

class AIApiClient {
    private gigaClient: GigaChat;

    private constructor(gigaClient: GigaChat) {
        this.gigaClient = gigaClient;
    }

    static async create(): Promise<AIApiClient> {
        const gigaClient = new GigaChat({
            credentials: process.env.API_AUTH_KEY,
            model: 'GigaChat-2',
            scope: 'GIGACHAT_API_PERS',
            httpsAgent,
        });
        await gigaClient.updateToken();
        return new AIApiClient(gigaClient);
    }

    private async getAnswer(message: string): Promise<string> {
        const res = await this.gigaClient.chat({
            messages: [{ role: 'user', content: message }],
        });
        return res.choices[0].message.content;
    }

    public async getDescription(item:Item): Promise<string> {
      if (item.description) {
      // improve description
         return this.getAnswer(getImproveDescriptionPrompt(item));
      } 
      // generate description    
       return this.getAnswer(getGenerateDescriptionPrompt(item));
    }

   
    public async getMarketPrice(item:Item): Promise<string> {
         return this.getAnswer(getMarketPricePrompt(item));
    }
}

export const aiApiClient = await AIApiClient.create();
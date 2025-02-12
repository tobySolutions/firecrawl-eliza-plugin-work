import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateFirecrawlConfig } from "../environment";
import { getCrawlDataExamples } from "../examples";
import { createFirecrawlService } from "../services";
import { extractUrl } from "../utils";

export const getCrawlDataAction: Action = {
    name: "FIRECRAWL_GET_CRAWL_DATA",
    similes: ["FETCH CRAWL DATA", "GET CRAWL DATA", "CRAWL DATA"],
    description: "Fetch crawl data using the Firecrawl API",
    validate: async (runtime: IAgentRuntime) => {
        await validateFirecrawlConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateFirecrawlConfig(runtime);
        const firecrawlService = createFirecrawlService(
            config.FIRECRAWL_API_KEY
        );

        console.log(message.content.text);
        try {
            const messageText = message.content.text || "";
            const { url } = extractUrl(messageText);

            if (!url) {
                callback({
                    text: "No URL found in the message content.",
                });
                return false;
            }

            elizaLogger.info(`Found URL: ${url}`);
            const crawlData = await firecrawlService.getCrawlData(url);
            elizaLogger.success(`Successfully fectched crawl data`);
            if (callback) {
                callback({
                    text: `View crawled data at: ${crawlData?.url}`,
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in the Firecrawl plugin", error);
            callback({
                text: `Error fetching crawl data: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getCrawlDataExamples as ActionExample[][],
} as Action;

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
import { getScrapedDataExamples } from "../examples";
import { createFirecrawlService } from "../services";
import { extractUrl } from "../utils";

export const getScrapeDataAction: Action = {
    name: "FIRECRAWL_GET_SCRAPED_DATA",
    similes: ["FETCH SCRAPED DATA", "GET SCRAPED DATA", "SCRAPE DATA", "SCRAPE URL", "SCRAPE WEBSITE"],
    description: "Fetch scraped data using the Firecrawl API",
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
            const scrapeData = (await firecrawlService.getScrapeData(url));
            console.log("Final scrapeData: ", scrapeData);
            elizaLogger.success(`Successfully fectched crawl data`);

            // Format the response data
            const formattedResponse = {
                text: "Here's what I found:",
                content: {
                    markdown: scrapeData?.data?.markdown || 'No content available',
                    metadata: {
                        title: scrapeData?.data?.title?.trim() || 'No title available',
                        description: scrapeData?.data?.metadata?.description || 'No description available',
                        url: scrapeData?.data?.metadata?.url || url,
                        language: scrapeData?.data?.metadata?.language || 'not specified',
                        statusCode: scrapeData?.data?.metadata?.statusCode || 'unknown',
                        ogImage: scrapeData?.data?.metadata?.ogImage || null,
                        ogTitle: scrapeData?.data?.metadata?.ogTitle || null,
                        ogDescription: scrapeData?.data?.metadata?.ogDescription || null
                    }
                }
            };

            if (callback) {
                elizaLogger.info('response: ', scrapeData);
                callback({
                    text: `Scraped data: ${JSON.stringify(formattedResponse.content)}`,
                    content: formattedResponse.content
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in the Firecrawl plugin", error);
            callback({
                text: `Error fetching scrape data: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getScrapedDataExamples as ActionExample[][],
} as Action;

import { ActionExample } from "@elizaos/core";

export const getScrapedDataExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you scrape the content from https://example.com?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll scrape the content from that website for you.",
                action: "FIRECRAWL_GET_SCRAPED_DATA",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Get the data from www.example.com/page",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll scrape the data from that webpage for you.",
                action: "FIRECRAWL_GET_SCRAPED_DATA",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I need to scrape some website data.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I can help you scrape website data. Please share the URL you'd like me to process.",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "example.com/products",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll scrape that webpage and get the data for you.",
                action: "FIRECRAWL_GET_SCRAPED_DATA",
            },
        },
    ],
];

export const getCrawlDataExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you fetch the content from https://example.com",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch the content from that website for you.",
                action: "FIRECRAWL_GET_CRAWL_DATA",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Get data from www.example.com",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll get the data from that website for you.",
                action: "FIRECRAWL_GET_CRAWL_DATA",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I need information from example.com/page",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll crawl that webpage and get the information for you.",
                action: "FIRECRAWL_GET_CRAWL_DATA",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to analyze a website.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Which website would you like me to analyze? Please provide the URL.",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "https://example.com",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll analyze that website for you.",
                action: "FIRECRAWL_GET_CRAWL_DATA",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I need to crawl some data.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I can help you crawl website data. Please share the URL you'd like me to analyze.",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "www.example.com",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll crawl that website and get the data for you.",
                action: "FIRECRAWL_GET_CRAWL_DATA",
            },
        },
    ],
];


import pathlib
import random

from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings

from scrapy.spiders.shutterstock import ShutterSpider


class RandomUserAgent:

    _user_agents: []

    with open(f"{pathlib.Path(__file__).parent.resolve()}/scrape/user-agents.txt", "r") as f:
        _user_agents = f.read().splitlines()

    @staticmethod
    def get():
        return RandomUserAgent._user_agents[random.randint(0, len(RandomUserAgent._user_agents) - 1)]


def random_user_agent(
        browser_type: str,
        playwright_request,
        scrapy_headers,
) -> dict:
    return {
        "User-Agent": RandomUserAgent.get()
    }


if __name__ == "__main__":
    settings = Settings(values={
        'AUTOTHROTTLE_ENABLED': True,
        'AUTOTHROTTLE_TARGET_CONCURRENCY': .5,
        'DOWNLOAD_DELAY': 1,
        'CONCURRENT_REQUESTS': 1,
        'TWISTED_REACTOR': "twisted.internet.asyncioreactor.AsyncioSelectorReactor",
        'DOWNLOAD_HANDLERS': {
            "http": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
            "https": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
        },
        'PLAYWRIGHT_MAX_CONTEXTS': 1,
        'PLAYWRIGHT_MAX_PAGES_PER_CONTEXT': 1,
        'PLAYWRIGHT_BROWSER_TYPE': 'chromium',
        'PLAYWRIGHT_LAUNCH_OPTIONS': {
            "headless": False,
            "timeout": 20 * 1000,  # 20 seconds
        },
        'PLAYWRIGHT_PROCESS_REQUEST_HEADERS': random_user_agent,
        'PLAYWRIGHT_CONTEXTS': {
            "persistent": {
                "user_data_dir": "/tmp/cityscout/scrape",  # will be a persistent context
            },
        }
    })

    process = CrawlerProcess(settings=settings)
    process.crawl(ShutterSpider)
    process.start()

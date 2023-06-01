import scrapy


class ShutterSpider(scrapy.Spider):
    name = 'photospider'

    shutter_url = 'https://www.shutterstock.com/search/portland-oregon-city?channel=nooffset&image_type=photo&orientation=horizontal'

    def start_requests(self):
        yield scrapy.Request(url=self.shutter_url,
                             callback=self.parse_shutter,
                             meta={
                                 'page': 1,
                                 "playwright": True,
                             })

    def parse_shutter(self, response):
        print(response)
        for title in response.css('img[class^="mui-"], img[class*="-thumbnail"]'):
            yield {'src': title.attrib('src').get()}

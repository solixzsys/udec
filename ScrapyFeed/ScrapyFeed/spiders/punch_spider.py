import scrapy
from ScrapyFeed.items import PunchItem
from datetime import datetime
import re

class ScrapePunch(scrapy.Spider):
    name='punch'
    # allowed_domains=['punchng.com']
    start_urls=[
        'http://punchng.com'
    ]

    def parse(self, response):
        item=PunchItem()
        for i in response.css('.row>ul>li>a::attr("href")').extract():
            # item['title']=i.css('a::attr("title")').extract()
            # link=i.css('a::attr("href")').extract()
            
            yield  scrapy.Request(i,callback=self.parse_detail)



    def parse_detail(self,response):
        item=PunchItem()
        # print('---------------'+response.url)
        item['name']='punch'
        item['title']=response.css('div.row.post_featured_image a::attr("title")').extract()[0]
        item['link']=response.css('div.row.post_featured_image a::attr("href")').extract()[0]
        item['image']=response.css('div.row.post_featured_image a>div.b-lazy::attr("data-src")').extract()[0]
       
        item['story']=response.css('div.entry-content').extract()[0]
        temp=item['story']
        sub=re.sub(r'<script>.*</script>',' ',temp)
        sub=re.sub(r'<style>.*</style>',' ',sub)
        item['story']=sub
        item['publish_on']=response.css('span.posted-on a time::text').extract()[0]
        item['scrap_on']=datetime.now()
        yield item

                    



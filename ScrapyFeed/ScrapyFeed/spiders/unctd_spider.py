import scrapy
from ScrapyFeed.items import PunchItem
from datetime import datetime
import re

class ScrapePunch(scrapy.Spider):
    name='unctad'
    # allowed_domains=['http://unctad.org']
    start_urls=[
        'http://unctad.org'
    ]

    def parse(self, response):
        # .col-sm-6.col-md-12>div>a
  
        for i in response.css('.col-sm-6.col-md-12>div>a::attr("href")').extract():
            # item['title']=i.css('a::attr("title")').extract()
            link=response.urljoin(i)
            # print('Scraping .................'+link)

            yield  scrapy.Request(link,callback=self.parse_detail2)



    def parse_detail2(self,response):
        # print('Parsing .................'+response.url)
        item=PunchItem()
        item['name']='unctad'
        item['title']=response.css('.page-title-newsdetails::text').extract()[0]
        item['link']=response.url
        item['image']=response.urljoin(response.css('.img-responsive.center-block::attr("src")').extract()[0])
       
        temp=response.css('.text p').extract()
        t1=""
        for t in temp:
            t1=t1+t
            
        item['story']=t1
       
        item['publish_on']=response.css('.newsdetails-date::text').extract()[0]
        item['scrap_on']=datetime.now()
        print('Title______________'+item['title'])
        yield item

                    



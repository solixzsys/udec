# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class ScrapyfeedItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass


class PunchItem(scrapy.Item):
    name=scrapy.Field()
    title=scrapy.Field()
    link=scrapy.Field()
    image=scrapy.Field()
    publish_on=scrapy.Field()
    scrap_on=scrapy.Field()
    #description=scrapy.Field()
    story=scrapy.Field()
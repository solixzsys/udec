import feedparser
import json
import django
import os
import sys
os.environ['DJANGO_SETTINGS_MODULE']='yourvoice.settings'
sys.path.append(os.path.dirname(os.getcwd()))
django.setup()
from app.models import MyFeed
class Item:
    def __init__(self):
        self.title=""
        self.description=""
        self.url=""
        self.date=""
        self.domain=""

class FeedObject:
    def __init__(self):
        self.items=[]
        self.title=""
        self.description=""
        self.source=""
        self.domain=""
        self.date=""
        self.sources=[
            # {
            # 'url':'http://rss.cnn.com/rss/money_news_international.rss',
            # 'name':'cnn',
            # 'domain':'business',
            # },
            {
            'url':'http://punchng.com/feed/',
            'name':'punch',
            'domain':'society',
            },
        ]


    def getfeed(self):
       
        item=Item()
        i=0
        for source in self.sources:
            myfeed=feedparser.parse(source['url'])
            for f in myfeed.entries:
                # item.title=f.title
                # item.description=f.summary
                # item.date=f.published
                # item.source=source['name']
                # item.domain=source['domain']
                # print()    
                MyFeed.objects.create(title=f.title,description=f.summary.split('<img')[0],source=source['name'],domain=source['domain'])          
                print('created............... '+item.title)  

       





if __name__=='__main__':
    print('start parsing.......................................')
    fp=FeedObject()
    fp.getfeed()                
    




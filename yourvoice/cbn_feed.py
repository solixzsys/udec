import feedparser
import json
import django
import os
import sys
os.environ['DJANGO_SETTINGS_MODULE']='yourvoice.settings'
sys.path.append(os.path.dirname(os.getcwd()))
django.setup()
from app.models import MyFeed






if __name__=='__main__':
    print('start parsing.......................................')
    feed=feedparser.parse('http://www.cbn.gov.ng/RSS/createrssfromdb.asp')
    # print(feed)
    for entry in feed.entries:
        # print(entry.published)  
        MyFeed.objects.create(title=entry.title,description=entry.summary,source='cbn',domain='economy')          
        print('***')                  
    




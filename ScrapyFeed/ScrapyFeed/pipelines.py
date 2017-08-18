# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import django,os,sys,re
sys.path.append(os.path.dirname(os.getcwd()))
os.environ['DJANGO_SETTINGS_MODULE']='yourvoice.settings'

django.setup()
from app.models import ScrapyFeed

class ScrapyfeedPipeline(object):
    def process_item(self, item, spider):
        return item



class PunchPipeline(object):
    def process_item(self, item, spider):
        title=item['title']
        link=item['link']
        publish=item['publish_on']
        image=item['image']
        name=item['name']
        scrap_on=item['scrap_on']
        temp=item['story']
        sub=re.sub(r'<script>.*</script>',' ',temp)
        sub=re.sub(r'<style>.*</style>',' ',sub)
        
        story=sub
        


        ScrapyFeed.objects.create(
            name=name,
            title=title,
            link=link,
            image=image,
            publish_on=publish,
            scrap_on=scrap_on,
            story=story

        )
        print('Feed Created .........................')

        # with open('punch.txt','a') as f:
        #     f.write(title+'--------------'+link+'----------------'+publish+'-------------'+image+'\n')

        # return item
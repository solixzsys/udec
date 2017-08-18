import feedparser
import json
import django
import os
import sys
import csv
os.environ['DJANGO_SETTINGS_MODULE']='yourvoice.settings'
sys.path.append(os.path.dirname(os.getcwd()))
django.setup()
from app.models import MyFeed

      
          
       





if __name__=='__main__':
    f=open('app_myfeed.csv');
    file=csv.DictReader(f)
    for line in file:
        print(line)
       
        title=line['title']
        description=line['description']
        source=line['source']
        domain=line['domain']
        
        # MyFeed.objects.create(title=title,description=description,source=source,domain=domain,date=date)
    # file.close()
            

        
        




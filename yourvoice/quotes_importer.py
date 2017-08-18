import feedparser
import json
import django
import os
import sys
os.environ['DJANGO_SETTINGS_MODULE']='yourvoice.settings'
sys.path.append(os.path.dirname(os.getcwd()))
django.setup()
from app.models import Quotes

      
          
       





if __name__=='__main__':
    file=open('app_quotes.csv');
    for line in file.readlines():
        # print(line)
        x=line.split('","')
        quote=x[1]
        author=x[2]
        Quotes.objects.create(quote=quote,author=author)
    file.close()
            

        
        




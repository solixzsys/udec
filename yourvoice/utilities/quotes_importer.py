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
    for line in file.readline():
        x=line.split('\",\"')
        quote=x[1]
        author=x[2]
        print(author)
        
        




from django import template
from extended_flatpages.models import CMSFlatPage
register=template.Library()

def flatpage_desc(id):
    
    extra=CMSFlatPage.objects.get(pk=id)
    
    
    return extra.description

register.simple_tag(flatpage_desc)    


def flatpage_key(id):
    extra=CMSFlatPage.objects.get(pk=id)
    

    return extra.keywords

register.simple_tag(flatpage_key)    

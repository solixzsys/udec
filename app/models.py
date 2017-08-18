from django.db import models
import hashlib
from datetime import datetime
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import  RichTextUploadingField
# Create your models here.
from django.db.models.signals import pre_save
from django.db.models.signals import pre_init
from django.db.models.signals import post_init
from django.db.models.signals import post_save
from django.db.models.signals import post_delete
from django.dispatch import receiver
import random
import string
from django.contrib.auth.models import User
from extended_flatpages.models import CMSFlatPage
from datetime import datetime



from django.db import models
from django.contrib.auth.models import User


class ScrapyFeed(models.Model):
    name=models.CharField(max_length=30, blank=True)
    title=models.CharField(max_length=300, blank=True)
    link=models.CharField(max_length=30, blank=True)
    image=models.CharField(max_length=30, blank=True)
    publish_on=models.CharField(max_length=30, blank=True)
    scrap_on=models.CharField(max_length=30, blank=True)
    # story=models.TextField()
    story=RichTextUploadingField(blank=True)

    def __str__(self):
        return self.title



class NigeriaState(models.Model):
    name=models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.name
class LG(models.Model):
    name=models.CharField(max_length=30, blank=True)
    state=models.ForeignKey(NigeriaState,blank=True)

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)    
    firstname=models.CharField(max_length=30,blank=True)
    lastname=models.CharField(max_length=30,blank=True)
    phone_number=models.CharField(max_length=30,blank=True)
    birth_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=30, blank=True)
    state_of_origin=models.ForeignKey(NigeriaState,blank=True,null=True)
    local_government=models.ForeignKey(LG,blank=True,null=True)
    bio = models.TextField(max_length=500, blank=True)
    



@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    











class StoryFlatPage(CMSFlatPage):
    DOMAIN=(
        ('ECONOMY','Economy'),
        ('POLITICS','Politics'),
        ('SOCIAL','Social'),

    )
    STATE=(
        ('DRAFT','DRAFT'),        
        ('UNPUBLISH','UNPUBLISH'),
        ('PUBLISH','PUBLISH'),
        ('COMPLETE','COMPLETE'),
        ('END-OF-LIFE','END-OF-LIFE'),
    )

    story_is_hero=models.BooleanField(default=False)
    story_hero_image=models.FileField(upload_to='passport/%Y/%m/%d',blank=True)
    story_content=RichTextUploadingField('Content',blank=True,null=True)
    story_domain=models.CharField(max_length=20,choices=DOMAIN)
    story_status=models.CharField(max_length=20,choices=STATE,default="DRAFT")
    story_date=models.DateField(default= datetime.now())
    story_creator=models.ForeignKey(User,blank=True,null=True)
    story_rank=models.IntegerField(default=0)

    class Meta:
        verbose_name='ARTICLE'
        verbose_name_plural='ARTICLES'

    def save(self, *args, **kwargs):
        self.url='/'+ str(self.story_date)+'/'+self.title.replace(' ','-')+'/'+str(self.pk)
        return super(StoryFlatPage,self).save(*args, **kwargs)



class SurveyTag(models.Model):
    
    DOMAIN=(
        ('ECONOMY','Economy'),
        ('POLITICS','Politics'),
        ('SOCIAL','Social'),

    )
    STATE=(
        ('DRAFT','DRAFT'),        
        ('UNPUBLISH','UNPUBLISH'),
        ('PUBLISH','PUBLISH'),
        ('COMPLETE','COMPLETE'),
        ('END-OF-LIFE','END-OF-LIFE'),

    )

    surveytag_title=models.CharField(max_length=100,default="")
    surveytag_description=RichTextField()
    surveytag_tag=models.CharField(max_length=100,default="")
    surveytag_date=models.DateField()
    surveytag_owner=models.ForeignKey(User,default="")
    surveytag_domain=models.CharField(max_length=20,choices=DOMAIN)
    surveytag_status=models.CharField(max_length=20,choices=STATE,default="DRAFT")
    survey_image=models.FileField(upload_to='passport/%Y/%m/%d',blank=True)

    class Meta:
        verbose_name='SURVEY'
        verbose_name_plural='SURVEYS'

    def __str__(self):
        return self.surveytag_title

        
    def save(self, *args, **kwargs):
        self.surveytag_tag=str(''.join([random.choice(string.ascii_letters+string.digits) for n in range(32)]))
        return super(SurveyTag,self).save(*args, **kwargs)



class PollOption(models.Model):
    # polloption_question=models.ForeignKey(Poll,default="")
    polloption_text=models.TextField()
    polloption_questioncode=models.CharField(max_length=50,default="")
    polloption_code=models.CharField(max_length=200,default="")
    polloption_score=models.IntegerField(default=0)
    polloption_questiontitle=models.CharField(max_length=50,default="")
    def __str__(self):
        return self.polloption_text

    def save(self, *args, **kwargs):
        
        if(self.polloption_code==""):
            self.polloption_code=str(''.join([random.choice(string.ascii_letters+string.digits) for n in range(32)]))
        # self.polloption_questioncode=self.polloption_question.poll_code
        return super(PollOption,self).save(*args, **kwargs)

        


class Poll(models.Model):
    DOMAIN=(
        ('ECONOMY','Economy'),
        ('POLITICS','Politics'),
        ('SOCIAL','Social'),

    )
    STATE=(
        ('PUBLISH','PUBLISH'),
        ('UNPUBLISH','UNPUBLISH'),

    )

    poll_code=models.CharField(max_length=200)
    poll_title=models.CharField(max_length=200,help_text="Short description that identify the question",default="Leave Empty")
    poll_question=RichTextField()
    poll_domain=models.CharField(max_length=20,choices=DOMAIN)
    poll_date=models.DateField()
    poll_state=models.CharField(max_length=20,choices=STATE,default="UNPUBLISH")
    poll_author=models.ForeignKey(User,default=None)
    poll_surveytag=models.ForeignKey(SurveyTag,default=None,blank=True)
    # poll_options=models.ManyToManyField(PollOption,default="")

    class Meta:
        verbose_name='POLL'
        verbose_name_plural='POLLS'

    def __str__(self):
        return self.poll_question

    def save(self, *args, **kwargs):
        # surveytitle=SurveyTag.objects.get(surveytag_title=self.poll_surveytag)
        # self.poll_title=surveytitle.surveytag_title
        self.poll_title=self.poll_surveytag.surveytag_title
        self.poll_domain=self.poll_surveytag.surveytag_domain
        return super(Poll,self).save(*args, **kwargs)
            


# @receiver(pre_save,sender=Poll)
# def myhandler(sender,instance,**kwargs):
#     # print("Saving Object ................................................" + str(kwargs))
#     question=instance.poll_question
#     hash_object=hashlib.md5(question.encode())
#     instance.poll_code=str(hash_object.hexdigest())
#     # return super(Poll,self).save(*args, **kwargs)

@receiver(post_save,sender=Poll)
def myhandler3(sender,instance,**kwargs):
    print('poll post save .................................')
    objtag=instance.poll_surveytag
    PollOption.objects.filter(polloption_questioncode=instance.poll_code).update(polloption_questiontitle=objtag.surveytag_title)   


@receiver(post_delete,sender=Poll)
def myhandler2(sender,instance,**kwargs):       
    print("Deleted Object ................................................" + str(instance)) 
    obj_code=instance.poll_code
    PollOption.objects.filter(polloption_questioncode=obj_code).delete()   




class UserPollOption(models.Model):
    user=models.ForeignKey(User,default=None,blank=True)
    option=models.ForeignKey(PollOption,default=None,blank=True)
    ipaddress=models.CharField(max_length=50,default="",blank=True,null=True)
    date=models.DateField(auto_now=True)
    optionquestion=models.TextField(default="")
    optiontitle=models.TextField(default="")

    def save(self,*args,**kwargs):
        ques=Poll.objects.get(poll_code=self.option.polloption_questioncode)
        self.optionquestion=ques.poll_question
        self.optiontitle=self.option.polloption_questiontitle
        return super(UserPollOption,self).save(*args,**kwargs)


class Quotes(models.Model):
    quote=models.TextField()
    author=models.CharField(max_length=20)
    domain=models.CharField(max_length=20,default="")

    def __str__(self):
        return self.quote

class MyFeed(models.Model):
    title=models.TextField()
    description=models.TextField()
    source=models.CharField(max_length=20)
    domain=models.CharField(max_length=20)
    date=models.DateField(auto_now=True)

    def __str__(self):
        return self.title


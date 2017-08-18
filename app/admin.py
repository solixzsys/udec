from django.contrib import admin
from app.models import Poll,PollOption,SurveyTag,StoryFlatPage,UserPollOption,Quotes,MyFeed,LG,NigeriaState,ScrapyFeed
from django import forms
from django.http import JsonResponse,HttpResponse,HttpResponseRedirect
from django.shortcuts import render,redirect
from ckeditor.fields import RichTextField
from django.core import serializers
# Register your models here.
import random
import string
import hashlib
from django.contrib.flatpages.admin import FlatPageAdmin,FlatpageForm,FlatPage
from ckeditor.widgets import CKEditorWidget
from extended_flatpages.models import CMSFlatPage
from extended_flatpages.admin import CustomFlatpageForm,CustomFlatPageAdmin
from django.contrib.flatpages.models import FlatPage

admin.site.register(FlatPage) 

admin.site.register(NigeriaState) 

class ScrapyFeedAdmin(admin.ModelAdmin):
    list_display = ('title','name')
    list_filter=('name',)
    search_fields=['title','story',]

admin.site.register(ScrapyFeed,ScrapyFeedAdmin) 

class LGAdmin(admin.ModelAdmin):
    list_display=('name','state')
    list_filter=('state',)
admin.site.register(LG,LGAdmin) 

class MyFeedAdmin(admin.ModelAdmin):
    list_display=('title','description','source','domain','date')
    
    # search_fields=['quote']
admin.site.register(MyFeed,MyFeedAdmin)

class QuotesAdmin(admin.ModelAdmin):
    list_display=('quote','author')
    exclude=('domain',)
    search_fields=['quote']
admin.site.register(Quotes,QuotesAdmin)

class UserPollOptionAdmin(admin.ModelAdmin):
    list_display=('option','user','date','optiontitle','optionquestion','ipaddress')
admin.site.register(UserPollOption,UserPollOptionAdmin)

class StoryFlatPageForm(forms.ModelForm):
    

   
    class Meta:
        model = StoryFlatPage
        fields='__all__'
        widgets={
            'content': CKEditorWidget()
        }

class StoryFlatPageAdmin(admin.ModelAdmin):
    form=StoryFlatPageForm
    list_display=( 'title','story_domain','url','story_is_hero','story_date','story_rank')
    list_filter=('story_domain','story_rank','story_date')
    search_field=['title','story_content',]


    fieldsets=(
                    (None,{
                        'fields':(('story_domain', 'title','story_date','story_rank'),'story_content','story_status', 'sites')
                    }),
                    ('Options',{
                        'classes': ('collapse',),
                        'fields': (('story_is_hero', 'story_hero_image'),  'description','enable_comments', 'registration_required', 'template_name')
                    }),
             )
    # fildsets = (
    #    (None,
    #     {
    #         'fields': 
    #             ('url','story_domain', 'title','story_is_hero','story_status', 'content', 'sites','story_hero_image',  'description')
    #     }
    #     ),
    #    (
    #        'Advanced options',
    #         {
    #             'classes': ('collapse',), 'fields': ('enable_comments', 'registration_required', 'template_name')
    #             }
    #             ),
    # )


admin.site.unregister(CMSFlatPage)
admin.site.register(StoryFlatPage,StoryFlatPageAdmin)


class SurveyTagAdmin(admin.ModelAdmin):
    list_display=('surveytag_title','surveytag_tag','surveytag_owner','surveytag_domain','surveytag_status')
    actions=['show_chart']
    def show_chart(self,request,queryset):
        
        id=queryset[0].pk
       
        return HttpResponseRedirect('/adminchart/?pk='+str(id))



    show_chart.short_description="Chart Summary"


admin.site.register(SurveyTag,SurveyTagAdmin)
class CkFlatPageForm(FlatpageForm):
    
    class Meta:
        model=FlatPage
        fields='__all__'
        widgets={
            'content': CKEditorWidget()
        }


class CkFlatPageAdmin(FlatPageAdmin):
    form=CkFlatPageForm

admin.site.unregister(FlatPage)
admin.site.register(FlatPage,CkFlatPageAdmin)       

class PollForm(forms.ModelForm):
    Option1=forms.CharField(max_length=200,required=False)
    Option2=forms.CharField(max_length=200,required=False)
    Option3=forms.CharField(max_length=200,required=False)
    Option4=forms.CharField(max_length=200,required=False)
    class Meta:
        model=Poll
        fields='__all__'



class PollAdmin(admin.ModelAdmin):
    form=PollForm
    list_display=('poll_title','poll_date','poll_domain','poll_state','poll_author','poll_surveytag','poll_code',)
    exclude=('poll_code',)
    list_filter=('poll_title','poll_domain','poll_state','poll_date','poll_author')
    search_fields=['poll_title','poll_question']

    # fieldsets=(
    #     (None,{
    #         'fields':(('poll_title','poll_domain','poll_date'),'poll_question')
    #     }),
    #     ('Options',{
    #         'classes': ('collapse',),
    #         'fields':('Option1','Option2','Option3','Option4')
    #     }),
    # )


    def get_form(self, request, obj=None, **kwargs):
       
        # self.fieldsets=tuple(self.fieldsets[0])
        
        # print('Inside get_form............... obj'+str(tuple(self.fieldsets[0])))
        if obj is None:
            kwargs['form'] = PollForm

            self.fieldsets=(
                    (None,{
                        'fields':(('poll_state','poll_date','poll_surveytag'),'poll_question')
                    }),
                    ('Options',{
                        'classes': ('collapse',),
                        'fields':('Option1','Option2','Option3','Option4')
                    }),
             )

        else:
            
            self.fieldsets=(
                    (None,{
                        'fields':(('poll_state','poll_date'),'poll_question')
                    }),
                    
            )
                 
        return super(PollAdmin, self).get_form(request, obj, **kwargs)


    def save_model(self, request, obj, form, change,**kwargs):
        print('change......................... '+str(change))
        if (change==False):
            print('inside change................................')
            question=obj.poll_question
            title=obj.poll_title
            hash_object=hashlib.md5(question.encode())
            code=str(hash_object.hexdigest())
            obj.poll_code=code

            code=obj.poll_code   
            title=obj.poll_title 
            option1=form.cleaned_data.get('Option1',None)
            option2=form.cleaned_data.get('Option2',None)
            option3=form.cleaned_data.get('Option3',None)
            option4=form.cleaned_data.get('Option4',None)

            obj.poll_author=request.user    
            
            if(option1 != ""):
                PollOption.objects.create(polloption_text=option1,polloption_questioncode=code,polloption_questiontitle=title, polloption_code=str(''.join([random.choice(string.ascii_letters+string.digits) for n in range(32)]))+code)
            if(option2 !=""):
                PollOption.objects.create(polloption_text=option2,polloption_questioncode=code,polloption_questiontitle=title, polloption_code=str(''.join([random.choice(string.ascii_letters+string.digits) for n in range(32)]))+code)
            if(option3 !="")   : 
                PollOption.objects.create(polloption_text=option3,polloption_questioncode=code,polloption_questiontitle=title, polloption_code=str(''.join([random.choice(string.ascii_letters+string.digits) for n in range(32)]))+code)
            if(option4 !=""):
                PollOption.objects.create(polloption_text=option4,polloption_questioncode=code,polloption_questiontitle=title, polloption_code=str(''.join([random.choice(string.ascii_letters+string.digits) for n in range(32)]))+code)
        return super().save_model(request, obj, form, change)


    def delete_model(self,request,obj):
        print(str(obj) +' is deleted.........................')
    def change_view(self,request,object_id,extra_context=None):
        print('inside change_view ................................')
        self.exclude=('Option1','Option2','Option3','Option4',)
        return super(PollAdmin,self).change_view(request,object_id,extra_context=None)
            
    def get_fields(self,request,obj):
        print('Getting fields ................................')
        fields=super(PollAdmin,self).get_fields(request,obj)
        if obj:
            fields.remove('Option1')
            fields.remove('Option2')
            fields.remove('Option3')
            fields.remove('Option4')    
        return fields




admin.site.register(Poll,PollAdmin)

class PollOptionAdmin(admin.ModelAdmin):
    list_display=('polloption_text','polloption_score','polloption_questiontitle','polloption_questioncode','polloption_code','polloption_questiontext')
    exclude=('polloption_questioncode','polloption_code','polloption_score')
    list_filter=('polloption_questiontitle','polloption_questioncode',)
    search_fields=['polloption_questiontitle']

    def polloption_questiontext(self,obj):
        return Poll.objects.get(poll_code=obj.polloption_questioncode).poll_question

    def save_model(self, request, obj, form, change,**kwargs):
        print('change PollOption......................... '+str(change))
        if (change==False):
            print('yyyyyyyy===========  '+obj.polloption_questioncode)
            

admin.site.register(PollOption,PollOptionAdmin)    


# from django.contrib.sites.models import Site
# admin.site.unregister(Site)

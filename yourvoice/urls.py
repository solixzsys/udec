"""yourvoice URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from app.views import *
from django.conf.urls import include
from yourvoice import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns = [
    
    url(r'^$', index,name='home'),
    url(r'^index/$', index,name='index'),
    
    
    url(r'^result/politics$', result_politics),
    url(r'^result/economy$', result_economy),
    url(r'^result/$', result),
    url(r'^result_detail', result_detail),
    url(r'^test$', test),
    url(r'^adminchart/(?P<id>)$', adminchart),
    url(r'^jsonpoll$', jsonpoll),
    url(r'^pollcount$', pollcount),
    url(r'^jsonpolloption$', jsonoption),
    url(r'^surveycount$',surveycount),
    url(r'^dynamictemp$',dynamictemp),
    url(r'^incrementscore$',incrementscore),
    url(r'^getquotes$',getQuotes),
    url(r'^getsurvey$',getsurvey),
    url(r'^getfeed$',getfeed),
    url(r'^getpolls$',getpolls),
    # url(r'^mypolls/all$',mypolls),
    url(r'^opinion/all$',mypolls),
    url(r'^about/$', about,name='about'),
    url(r'^team/$', ourteam,name='ourteam'),
    url(r'^services/$', services,name='services'),
    url(r'^pages/',include('django.contrib.flatpages.urls')),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^signup/$', signup, name='signup'),
    url(r'^updateprofile/$', update_profile, name='updateprofile'),
    url(r'^loadstate/$', loadstate, name='loadstate'),
    url(r'^getlg/$', getlg, name='getlg'),
    # url(r'^login/$', auth_views.login, name='login'),
    url(r'^login/$', mylogin, name='login'),
    # url(r'^logout/$', auth_views.logout, name='logout'),
    url(r'^logout/$', mylogout, name='logout'),
    url(r'^oauth/', include('social_django.urls', namespace='social')), 
    url(r'^admin/', admin.site.urls),
]
if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
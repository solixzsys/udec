from django import forms
from django.contrib.auth.models import User
from app.models import Profile
# from django.forms.extras.widgets import SelectDateWidget
# from django.contrib.admin.widgets import AdminDateWidget


class LoginForm(forms.Form):
    username=forms.CharField(max_length=200)
    password=forms.CharField(widget=forms.PasswordInput())

class UserForm(forms.ModelForm):
    confirm_password=forms.CharField(widget=forms.PasswordInput())

    # def clean(self):
        
    #     cleaned_data=super(UserForm,self).clean()
    #     password=cleaned_data.get('password')
    #     confirm_password=cleaned_data.get('confirm_password')
    #     username=cleaned_data.get('email')

    #     if password != confirm_password :
    #         # print('inside clean+++++++++++++++++++++++++++')
    #         raise forms.ValidationError('password and confirm_password does not match !!!')

    def clean_confirm_password(self):
        
        # cleaned_data=super(UserForm,self).clean()
        password=self.cleaned_data.get('password')
        confirm_password=self.cleaned_data.get('confirm_password')
        

        if password != confirm_password :
            # print('inside clean+++++++++++++++++++++++++++')
            raise forms.ValidationError('password and confirm_password MUST match !!!')          

    def __init__(self,*args,**kwargs):
        super(UserForm,self).__init__(*args,**kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update(
                {
                    'class':'form-control',
                     'placeholder':str(field).replace('_',' ')
                }
            )

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email','password','confirm_password')

class ProfileForm(forms.ModelForm):
    # birth_date=forms.DateField(widget=AdminDateWidget())
    def __init__(self,*args,**kwargs):
        super(ProfileForm,self).__init__(*args,**kwargs)
        # self.fields['birth_date']=forms.DateField(widget=AdminDateWidget())
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update(
                {
                    'class':'form-control'
                    # 'placeholder':field
                }
            )

    class Meta:
        model = Profile
        fields = ('phone_number','birth_date','location','state_of_origin','local_government')
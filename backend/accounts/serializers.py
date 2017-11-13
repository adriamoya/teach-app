from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model

from rest_framework.serializers import (
    CharField,
    EmailField,
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError
    )
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


User = get_user_model()


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
        ]


class UserCreateSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    email = EmailField(label='Email Address', write_only=True)
    email2 = EmailField(label='Confirm Email', write_only=True)
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'email2',
            'password',
            'token',
            
        ]
        extra_kwargs = {"password":
                            {"write_only": True}
                            }

    def validate(self, data):
        return data

    def validate_email(self, value):
        data = self.get_initial()
        email1 = data.get("email2")
        email2 = value
        if email1 != email2:
            raise ValidationError("Emails must match.")
        user_qs = User.objects.filter(email=email2)
        if user_qs.exists():
            raise ValidationError("This user has already registered.")
        return value

    def validate_email2(self, value):
        data = self.get_initial()
        email1 = data.get("email")
        email2 = value
        if email1 != email2:
            raise ValidationError("Emails must match.")
        return value

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
                username = username,
                email = email
            )
        user_obj.set_password(password)
        # user_obj.active = False
        # send email activation
        user_obj.save()
        payload = jwt_payload_handler(user_obj)
        token = jwt_encode_handler(payload) # token = CharField(allow_blank=True, read_only=True)
        validated_data['token'] = token
        return validated_data



class UserLoginSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    username = CharField()
    #email = EmailField(label='Email Address')
    class Meta:
        model = User
        fields = [
            'username',
            # 'email',
            'password',
            'token',
            
        ]
        extra_kwargs = {"password":
                            {"write_only": True}
                            }

    # def validate(self, data):
    #     # only validate the username
    #     username = data['username']
    #     password = data['password']
    #     # check username against user model (2 separate querysets)
    #     user_qs = User.objects.filter(username=username)
    #     if user_qs.exists() and user_qs.count() == 1:
    #         user_obj = user_qs.first() # User.objetcs.get(id=1) ...
    #         data['username'] = user_obj.username
    #         # data['email'] = user_obj.email
    #         payload = jwt_payload_handler(user_obj)
    #         token = jwt_encode_handler(payload) # token = CharField(allow_blank=True, read_only=True)
    #         data['token'] = token
    #         return data
    #     raise ValidationError("Invalid Credentials")


    def validate(self, data):
        # only validate the username
        username = data['username']
        password = data['password']
        # check username against user model (2 separate querysets)
        user_a = User.objects.filter(username__iexact=username)
        user_b = User.objects.filter(email__iexact=username)
        # here we join both querysets (pipeline in django)
        user_qs = (user_a | user_b).distinct()
        if user_qs.exists() and user_qs.count() == 1:
            user_obj = user_qs.first() # User.objetcs.get(id=1) ...
            # check the password against the user
            # check the raw password against the hashed password in DB
            # WE DONT WANT TO STORE THE RAW PASSWORD ANYWHERE
            password_passes = user_obj.check_password(password)
            if not user_obj.is_active:
                raise ValidationError("This user is inactive.")
            # HTTPS
            if password_passes:
                # here we should do something with the token
                data['username'] = user_obj.username
                # data['email'] = user_obj.email
                payload = jwt_payload_handler(user_obj)
                token = jwt_encode_handler(payload) # token = CharField(allow_blank=True, read_only=True)
                data['token'] = token
                return data
        raise ValidationError("Invalid Credentials")
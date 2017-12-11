# Backend

## Connecting the backend (Django) & Frontend (Angular)

### Backend

After building with Django a few Apps in order to set up a first version of the DRF API, we need to configure the urls so that there is a catch-all url that will handle the Angular app. This url needs to go at the very end of the url_pattern list.

```python
from django.views.generic.base import TemplateView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/$', api_root),
    ...
    url(r'^.*', TemplateView.as_view(template_name='ang_home.html'), name='home'), #catch-all url, rendered in ang_home.html
]
```
Now we need to define 2 directories inside our source directory `backend`: `/templates/` and `/static/`.

Within the templates folder we will save the html templates that will include the corresponding html/js/css compiled files from Angular. Instead of compiling all Angular files within the `frontend` directory (which are anyway compiled there too), we will make a copy of them to the `/static/` directory (within the `backend`).

In order to do so, run the following command from the `frontend` directory (so that any change made in the Angular app is propagated to the `backend` right away).

```shell
ng build --prod --output-path ../backend/static/ang --watch --output-hashing none
```
Now Angular is watching any change made in the `Frontend`, compiling all its files and propagating them into the `backend` (specifically to `/backend/static/ang/`).

In the `settings.py` we have to include these directories.

```python
# /backend/teach/settings.py
...

TEMPLATES = [
    {
    	...
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        ...
    },
]

...

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
```

In order to test if Django has properly integrated the Angular app we can adapt the `ang_home.html` within `/backend/templates/`. We will do so by copying the `index.html` content (html file already compiled in `/backend/static/ang/`).

```html
# /backend/templates/ang_home.html

{% load static %}


<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Frontend</title>
	<base href="/">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<link href="styles.bundle.css" rel="stylesheet"/>
</head>
<body>
	<app-root>Loading...</app-root>
	<script type="text/javascript" src="{% static 'ang/inline.bundle.js' %}"></script>
	<script type="text/javascript" src="{% static 'ang/polyfills.bundle.js' %}"></script>
	<script type="text/javascript" src="{% static 'ang/main.bundle.js' %}"></script>
</body>
</html>

```

Now open another terminal, go to the Django project root (`/backend/`) and run:

```shell
python manage.py runserver
```

Django is handling the Angular app through `ang_home.html`, which is connected to the static files within `/backend/static/ang`.

## Frontend

We can now continue designing the Angular app from the `frontend` directory, connect it to the Django API, etc.


# Installing PostgreSQL in Linux

Use this [link](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04)


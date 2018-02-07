from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic.base import TemplateView


import settings
from .views import api_root

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/$', api_root),
    url(r'^api/users/', include("accounts.urls", namespace='users-api')),
    url(r'^api/alumnes/', include("alumnes.urls", namespace='alumnes-api')),
    url(r'^api/assignatures/', include("assignatures.urls", namespace='assignatures-api')),
    url(r'^api/classes/', include("classes.urls", namespace='classes-api')),
    url(r'^api/cursos/', include("cursos.urls", namespace='cursos-api')),
    url(r'^api/dimensions/', include("dimensions.urls", namespace='dimensions-api')),
    url(r'^api/professors/', include("professors.urls", namespace='professors-api')),
    url(r'^api/proves/', include("proves.urls", namespace='proves-api')),
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^.*', TemplateView.as_view(template_name='ang_home.html'), name='home'), #catch-all url
]


if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
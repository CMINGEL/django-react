from django.urls import path
from .views import VistasBasadasClases


urlpatterns = [
    path('companies/',VistasBasadasClases.as_view(), name='companies_list'),
    path('companies/<int:id>',VistasBasadasClases.as_view(), name='compani')

]
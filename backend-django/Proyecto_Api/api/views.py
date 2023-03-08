from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Company
from django.http.response import JsonResponse, HttpResponse
import json 
# Vistas basada en clases

class VistasBasadasClases(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    @method_decorator(csrf_exempt)
    def get(self, request, id=0):
        if (id > 0):
            companies = list(Company.objects.filter(id=id).values())
            if len(companies)> 0:
                company=companies[0]
                datos={'message':'Success','company':company}
            else:
                datos={'message':'Companies not found'}
            return JsonResponse(datos)
        else:
            companies = list(Company.objects.values())
            if len(companies)>0:
                datos= {'message':'success', 'companies':companies}
            else: 
                datos={'message':'Companies not found'}
        return JsonResponse(datos)

    def post(self, request):
        print(request.body)
        
        jsonData=json.loads(request.body)  # me entrega un dict
        
        Company.objects.create(name=jsonData['name'], website=jsonData['website'],foundation=jsonData['foundation'])
        datos={'message':'Success'}
        return JsonResponse(datos)
    
    def put(self, request,id=0):
        jsonData=json.loads(request.body)
        companies = list(Company.objects.filter(id=id).values())
        if len(companies)> 0:
            company=Company.objects.get(id=id)
            company.name=jsonData['name']
            company.website=jsonData['website']
            company.foundation=jsonData['foundation']
            company.save()
            datos={'message':'Success'}
        else:
            datos={'message':'Companies not found'}
        return JsonResponse(datos)

    
    def delete(self,request,id=0):
        companies = list(Company.objects.filter(id=id).values())
        if len(companies)> 0:
            company=Company.objects.get(id=id)
            company.delete()
            datos={'message':'Delete Success'}
        else:
            datos={'message':'Companies not found'}
        return JsonResponse(datos)







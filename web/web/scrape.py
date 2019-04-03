import json
import requests
from search.models import Search
from search.serializers import SearchSerializer
from django.contrib.auth.models import User
from result.models import Result
from .consumers import SearchConsumer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.core import serializers
from django.utils import timezone


categories = {
    'Antiques': 20081,
    'Art': 550,
    'Baby': 2984,
    'Books': 267,
    'Business & Industrial': 12576,
    'Cameras & Photo': 625,
    'Cell Phones & Accessories': 15032,
    'Clothing Shoes & Accessories': 11450,
    'Coins & Paper Money': 20081,
    'Collectibles': 1,
    'Computers/Tablets & Networking': 58058,
    'Consumer Electronics': 293,
    'Crafts': 14339,
    'Dolls & Bears': 237,
    'DVDs & Movies': 11232,
    'eBay Motors': 6000,
    'Entertainment Memorabilia': 45100,
    'Gift Cards & Coupons': 20081,
    'Health & Beauty': 26395,
    'Home & Garden': 11700,
    'Jewelry & Watches': 281,
    'Music': 11233,
    'Musical Instruments & Gear': 619,
    'Pet Supplies': 1281,
    'Pottery & Glass': 870,
    'Real Estate': 20081,
    'Specialty Services': 316,
    'Sporting Goods': 888,
    'Sports Mem, Cards & Fan Shop': 64482,
    'Stamps': 20081,
    'Tickets': 1305, 
    'Toys & Hobbies': 220,
    'Travel': 3252,
    'Video Games': 1249,
    'Everything Else': 99,
}
sites = {
    'USA': 'EBAY-US',
    'Canada': 'EBAY-ENCA',
    'UK': 'EBAY-GB',
    'Australia': 'EBAY-AU',
    'Austria': 'EBAY-AT',
    'Belgium': 'EBAY-FRBE',
    'France': 'EBAY-FR',
    'Germany': 'EBAY-DE',
    'Italy': 'EBAY-IT',
    'Netherlands': 'EBAY-NL',
    'Spain': 'EBAY-ES',
    'Switzerland': 'EBAY-CH',
    'Ireland': 'EBAY-IE'
}

def find(job):
    try:
        categoryJoined = ''
        categ = job['category'].split(', ')
        for item in categ:
            categoryJoined += "categoryId=" + str(categories[item]) + "&"
        url = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=CumarYus-Upwork-PRD-a60b1f533-f6fd3074&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&GLOBAL-ID="+sites[job['site']]+ "&" + categoryJoined + "keywords="+job['keyword']+"&outputSelector=SellerInfo&descriptionSearch=true&itemFilter(0).name=MinPrice&itemFilter(0).value="+str(job['minPrice'])+"&itemFilter(1).name=MaxPrice&itemFilter(1).value="+str(job['maxPrice'])+"&itemFilter(2).name=HideDuplicateItems&itemFilter(2).value=true"
        r = requests.get(url)
        sendPost(r.json(),job['id'], job['user'])
    except ConnectionError as e:
        print(e)

def sendPost(results, id, user_id):
    for result in results['findItemsAdvancedResponse'][0]["searchResult"][0]["item"]:
        if 'galleryURL' in result:
            search = Search.objects.get(pk=id)
            user = User.objects.get(pk=user_id)
            print('---', search)
            s = Result(id=result['itemId'][0], title= result['title'][0], price= '(' + result['sellingStatus'][0]['currentPrice'][0]['@currencyId'] + ') ' + result['sellingStatus'][0]['currentPrice'][0]['__value__'], seller= result['sellerInfo'][0]['sellerUserName'][0], url= result['viewItemURL'][0], img= result['galleryURL'][0], search=search, user=user)
            s.save()
            #requests.post("http://localhost:8000/api/result/", headers={'Authorization': token},
            #data={'title': result['title'][0], 'price': '(' + result['sellingStatus'][0]['currentPrice'][0]['@currencyId'] + ') ' + result['sellingStatus'][0]['currentPrice'][0]['__value__'], 'seller': result['sellerInfo'][0]['sellerUserName'][0], 'url': result['viewItemURL'][0], 'img': result['galleryURL'][0], 'search': id})
        
def findV2(job, check):
    try:
        categoryJoined = ''
        categ = job['category'].split(', ')
        for item in categ:
            categoryJoined += "categoryId=" + str(categories[item]) + "&"
        url = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=CumarYus-Upwork-PRD-a60b1f533-f6fd3074&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&GLOBAL-ID="+sites[job['site']]+  "&" + categoryJoined +"keywords="+job['keyword']+"&outputSelector=SellerInfo&descriptionSearch=true&itemFilter(0).name=MinPrice&itemFilter(0).value="+str(job['minPrice'])+"&itemFilter(1).name=MaxPrice&itemFilter(1).value="+str(job['maxPrice'])+"&itemFilter(2).name=HideDuplicateItems&itemFilter(2).value=true"
        r = requests.get(url)
        sendPostV2(r.json(),job['id'], job['user'], check)
    except ConnectionError as e:
        print(e)

def sendPostV2(results, id, user_id, check):
    for result in results['findItemsAdvancedResponse'][0]["searchResult"][0]["item"]:
        if not any(d.id == int(result['itemId'][0]) for d in check):
            if 'galleryURL' in result:
                search = Search.objects.get(pk=id)
                user = User.objects.get(pk=user_id)
                print('---', search, timezone.now())
                s = Result(id=result['itemId'][0], title= result['title'][0], price= '(' + result['sellingStatus'][0]['currentPrice'][0]['@currencyId'] + ') ' + result['sellingStatus'][0]['currentPrice'][0]['__value__'], seller= result['sellerInfo'][0]['sellerUserName'][0], url= result['viewItemURL'][0], img= result['galleryURL'][0], search=search, user=user, created_at=timezone.now())
                s.save()
                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)(
                    "gossip", {
                        "type": "user.gossip",
                        "event": "New User",
                        "username": user.username,
                        'title': result['title'][0],
                        'price': '(' + result['sellingStatus'][0]['currentPrice'][0]['@currencyId'] + ')' + result['sellingStatus'][0]['currentPrice'][0]['__value__'],
                        'url': result['viewItemURL'][0],
                        'search': search.id
                    }
                 )
               
                
               

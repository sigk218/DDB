import requests
import json
import time

check = []

APIKEY = "Your Api Key"

def findPlaces(loc=None,radius=1500, pagetoken = None):
  lat, lng = loc
  url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=animal&location={lat},{lng}&radius={radius}&key={APIKEY}{pagetoken}".format(lat = lat, lng = lng, radius = radius, APIKEY = APIKEY, pagetoken = "&pagetoken="+pagetoken if pagetoken else "")
  response = requests.get(url)
  res = json.loads(response.text)
  with open('vet.txt', mode='a', encoding='utf-8') as file:
    for result in res["results"]:
      if result["place_id"] not in check:
        print('추가')
        check.append(result["place_id"])
        temp = [
          result["place_id"],
          result["name"],
          str(result["geometry"]["location"]["lat"]), 
          str(result["geometry"]["location"]["lng"]),
          str(result.get("rating",0)),
          str(result.get("user_ratings_total",0)),
          result["formatted_address"]
        ]
        temptxt = ','.join(temp)+'\n'
        file.write(temptxt)
      else:
        print('겹침')
  pagetoken = res.get("next_page_token",None)
  return pagetoken


start = [37.461, 126.817]
end = [37.666, 127.214]


loc = [start[0], start[1]]
pagetoken = None
inning = round((end[0] - start[0])//0.003 + 1)
while True:
  loc[1] += 0.003
  if loc[1] > end[1]:
    loc[1] = start[1]
    loc[0] += 0.003
  if loc[0] > end[0]:
    break 
  while True:
      pagetoken = findPlaces(loc=[str(loc[0]), str(loc[1])], pagetoken=pagetoken)
      if not pagetoken:
          break
      time.sleep(5)

'''
textsearch 요청 결과
     {
        "business_status" : "OPERATIONAL",
        "formatted_address" : "대한민국 서울특별시 용산구 이태원동 21-1",
        "geometry" : {
           "location" : {
              "lat" : 37.5310395,
              "lng" : 126.9958021
           },
           "viewport" : {
              "northeast" : {
                 "lat" : 37.53238932989272,
                 "lng" : 126.9971519298927
              },
              "southwest" : {
                 "lat" : 37.52968967010728,
                 "lng" : 126.9944522701073
              }
           }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
        "id" : "795556c9ac907b22d820ffd77cb85480a9124aab",
        "name" : "청화동물병원",
        "photos" : [
           {
              "height" : 2988,
              "html_attributions" : [
                 "\u003ca href=\"https://maps.google.com/maps/contrib/100769476930697368749\"\u003eA Google User\u003c/a\u003e"
              ],
              "photo_reference" : "CmRaAAAAmBdhWL7Lqb1SzzfAHqcwylfkJ1slaeA7F1Hdw8v5U8Showmi7nG7QGIAJ0ItbZXj9Dr78Z-uAevgIh8XDUM8KoVs9WGUzDomj-KWxz1ZSkx6D6DJyHnMKqECGmzDV8N0EhDTxI4MM_1S7veNYsme58AqGhSSKbnBDhil_K7wjEYnvFKPzkHbBQ",
              "width" : 5312
           }
        ],
        "place_id" : "ChIJwWTtPzWifDURyewqMmXDeTI",
        "plus_code" : {
           "compound_code" : "GXJW+C8 서울특별시",
           "global_code" : "8Q98GXJW+C8"
        },
        "rating" : 4.1,
        "reference" : "ChIJwWTtPzWifDURyewqMmXDeTI",
        "types" : [ "veterinary_care", "point_of_interest", "establishment" ],
        "user_ratings_total" : 38
     },
'''

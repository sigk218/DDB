# README

## 서울의 모든 동물 병원 데이터 요청하기

- [Text Search requests](https://developers.google.com/places/web-service/search)
  - url : https://maps.googleapis.com/maps/api/place/textsearch/json?parameters
  - parameters
    - query :  "pizza in New York"
    - key
    - region : The region code, specified as a [ccTLD](https://en.wikipedia.org/wiki/CcTLD) (country code top-level domain) two-character value, kr
    - location:  *latitude*,*longitude*
    - radius: Defines the distance (in meters) within which to bias place results. The maximum allowed radius is 50 000 meters
    - pagetoken: Returns up to 20 results from a previously run search. Setting a `pagetoken` parameter will execute a search with the same parameters used previously
    - type : Restricts the results to places matching the specified type. Only one type. (veterinary_care, hospital)
  - example
    - https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&location=42.3675294,-71.186966&radius=10000&key=YOUR_API_KEY
    - https://maps.googleapis.com/maps/api/place/textsearch/json?query=animal+hospital&location=37.519185,126.982293&radius=10000&key=YOUR_API_KEY

- vet.txt
  - 대략 서울의 남서쪽에서 북동쪽까지 1500m 간격으로 text search request api를 통해 수집한 동물병원 리스트





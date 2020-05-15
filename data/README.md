# README

## 서울의 모든 동물 병원 데이터 수집하기

### 서울의 모든 동물 병원 리스트
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
  
- 약 40만원 정도 청구됨

  

### 서울 동물 병원 디테일
- [Place Details] (https://developers.google.com/places/web-service/details)
  - url : https://maps.googleapis.com/maps/api/place/details/json?parameters
  - parameters
    - key
    - place_id
    - fields
      - basic : permanently_closed, photo, 
      - contact : formatted_phone_number, opening_hours, website
      - atmosphere : price_level, rating, review
      - [필드 종류에 따른 과금] (https://developers.google.com/places/web-service/usage-and-billing)

- 파일과 필드들

  | 파일이름   | 필드                                                         | 비고                                                         |
  | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | detail.txt | place_id, name, location, full address, phone, mon, tue, wed, thu, fri, sat, sun, website, rating | address component는 [종류가 너무 많아](https://developers.google.com/maps/documentation/geocoding/intro#Types) 처리에 어려움이 있어 생략 |
  | photo.txt  | place_id, image, height, width                               | photo는 [다른 api](https://developers.google.com/places/web-service/photos)를 통해 다시 요청해야함 |
  | review.txt | place_id, language, rating, text, time                       | time은 혹시 필요할까 넣어두었음                              |

  




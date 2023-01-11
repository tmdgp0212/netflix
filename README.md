# 넷플릭스🎬

데모사이트 : [DEMO](https://tmdgp0212.github.io/netflix/)

## 🧡프로젝트 안내

react로 netflix를 클론하며 api를 다루는 방법에대해 연습해 보았습니다

작업기간 : 2022.10.18 ~ 2022.10.24 (총 7일)

작업인원 : 1인 

사용언어 : `react`

작업내용 : 리액트에서 컴포넌트를 분리하고 페이지를 이동하며 데이터를 주고 받는 방식과 , 
데이터를 불러와 API를 다루는 방식을 배워 볼 수 있었던 영화검색 페이지 입니다.

## 🧡페이지 소개

### 💛메인 영화 페이지

![main](https://user-images.githubusercontent.com/112364408/211720241-f61456da-103b-448a-9f20-cedc76780a03.png)

가장 먼저 보여지는 메인화면 입니다. 현재 가장 높은 순위의 영화가 메인화면에 노출되며  
제목과 줄거리정보가 보여집니다.


![list](https://user-images.githubusercontent.com/112364408/211720495-780ed6c2-e762-49e1-ba3b-484da13ce5dc.png)

메인화면 아래로 나타나는 영화리스트 입니다.  
현재 상영중인 영화, 높은 평점순의 영화, 개봉예정작의 순서로 영화를 배치하였으며, 각 영화목록은 버튼을 통해 좌우로 슬라이드가 가능합니다

![hover](https://user-images.githubusercontent.com/112364408/211720961-2dbf8675-c617-485c-a7b9-402cf990fc1b.png)

영화 포스터에 마우스를 올리면 해당 영화의 간단한 정보와 버튼들이 나타납니다. 클릭하면 세부정보 페이지로 이동합니다

### 💛상세정보창

![detail](https://user-images.githubusercontent.com/112364408/211721208-7427255a-351c-4381-8093-ae4c5cc1fbea.png)

영화를 클릭하면 나타나는 디테일창입니다.  
영화의 상세정보가 포스터 아래로 출력이 되고, 영화정보 아래로 비슷한 장르의 또 다른 영화들을 추천합니다.

### 💛TV프로그램 페이지 

![tv](https://user-images.githubusercontent.com/112364408/211721457-51863220-2b43-49b6-8773-8c42fa600017.png)

상단의 TV프로그램 버튼을 클릭해 페이지의 이동이 가능합니다

![tvmain](https://user-images.githubusercontent.com/112364408/211721465-406aab7c-3262-4f15-81e6-faaf75d96671.png)
![tvlist](https://user-images.githubusercontent.com/112364408/211721686-7dc1a372-4fcb-499c-b402-8003e8ed8317.png)

TV프로그램페이지를 클릭하면 마찬가지로 가장 높은 순위의 영화가 메인화면에 노출되며 , 아래로 다양한 TV프로그램의 리스트가 나타납니다

### 💛상세정보창

![detail](https://user-images.githubusercontent.com/112364408/211721945-04ac7169-43f9-42d4-91a5-c5128e0ee3d0.png)

영화페이지와 마찬가지로 포스터를 클릭하면 상세정보가 나타납니다.  
영화페이지의 상세정보창과 달리 상세정보 아래로 지난에피소드의 정보가 노출됩니다.

### 💛검색페이지

![search](https://user-images.githubusercontent.com/112364408/211722131-df79b2a6-e055-4b4e-9ff1-d5011a902691.png)
![searchmain](https://user-images.githubusercontent.com/112364408/211722220-d29cb562-6177-413d-b487-9140f496bc4b.png)

상단의 버튼을 통해 검색페이지로 이동합니다

![searchlist](https://user-images.githubusercontent.com/112364408/211722324-5015d5d0-cdd3-40c1-b8a8-459f99dd5c90.png)

영화와 TV프로그램으로 나누어 검색결과가 노출됩니다

### 💛언제,어디서나 검색가능!

![search](https://user-images.githubusercontent.com/112364408/211722712-061ffb50-3a8c-43e7-869e-d9d7050ab500.png)

어느 페이지, 어느 위치에있든 상단에 노출되어있는 헤더의 검색아이콘을 통해서도 검색이 가능합니다!


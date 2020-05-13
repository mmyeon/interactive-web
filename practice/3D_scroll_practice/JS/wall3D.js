// 전역변수를 피하기 위해 즉시실행함수 사용하기
(function () {
  const houseElem = document.querySelector(".house");
  // 중복되는 부분이라 따로 빼기
  // let maxScrollValue = document.body.offsetHeight - this.window.innerHeight;
  const barElem = document.querySelector(".progress-bar");
  const stageElem = document.querySelector(".stage");
  const mousePos = {
    x: 0,
    y: 0,
  };
  let maxScrollValue;

  // 윈도우 창사이즈가 바뀌면 maxScrollValue가 갱신하도록 세팅함.
  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - this.window.innerHeight;
  }

  window.addEventListener("scroll", function () {
    //  전체 문서에서 스크롤 된 비율 구하기
    // console.log(pageYOffset / maxScrollValue);

    // 전체 문서 높이 - 현재 윈도우 창의 높이 = 스크롤 범위
    // console.log(document.body.offsetHeight - this.window.innerHeight);
    // 스크롤되는 양
    // console.log(this.pageYOffset);
    // console.log(maxScrollValue);

    // maxScrollValue가 0 ~ 1 로 너무 작은 값이라 1000을 곱함 ( 0 ~ 1000 으로 세팅)
    // 하우스자체가 default로 -490이니까 여기에도 적용. 적용하지 않으면 스트롤시작시 바로 0부터 시작해 다음 벽면이 화면에 가득참.
    // 스크롤 범위를 1000에서 950으로 줄여서 마지막에 스크롤이 덜 되게 설정. 그 비율만큼 스크롤 되는 양이 줄도록

    // 스크롤 퍼센티지
    const scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 980 - 490;
    houseElem.style.transform = "translateZ( " + zMove + "vw)";

    // progress bar
    barElem.style.width = scrollPer * 100 + "%";
  });

  window.addEventListener("mousemove", function (e) {
    // 마우스 현재 위치 얻어오기
    // console.log(e.clientX, e.clientY);

    // 가운데가 원점, x축도 -1 ~ 1까지, y축도 -1 ~ 1까지
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    // console.log(mousePos);
    // 현재 왼쪽 상단이 0,0이므로 화면의 중심으로 0,0으로 가져오기. 가운데가 원점이 되도록
    // rotateX는 x축을 기준으로 회전시키면 마우스포지션 Y의 영향을 받음
    // 움직임 폭이 좁아서 움직임 폭을 키우기 위해 5씩 곱해줌
    stageElem.style.transform =
      "rotateX( " + mousePos.y * 5 + "deg) rotateY( " + mousePos.x * 5 + "deg)";
  });

  // 윈도우 객체에 리사이즈 이벤트 걸어줌
  window.addEventListener("resize", resizeHandler);
  resizeHandler();

  // 스테이지를 클릭하면 캐릭터가 생기도록 설정
  stageElem.addEventListener("click", function (e) {
    // 클릭한 위치를 비율로 바꾸기 (전체가 100%라고 생각)
    // e.clientX / window.innerWidth;
    // console.log((e.clientX / window.innerWidth) * 100);
    // 객체로 넣는 이유는 여러 속성을 넣기 위해
    new Character({
      xPos: (e.clientX / window.innerWidth) * 100,
    });
  });
})();

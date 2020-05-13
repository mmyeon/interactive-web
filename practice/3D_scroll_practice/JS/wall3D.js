// 전역변수를 피하기 위해 즉시실행함수 사용하기
(function () {
  const houseElem = document.querySelector(".house");
  // 중복되는 부분이라 따로 빼기
  // let maxScrollValue = document.body.offsetHeight - this.window.innerHeight;
  const barElem = document.querySelector(".progress-bar");
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

  // 윈도우 객체에 리사이즈 이벤트 걸어줌
  window.addEventListener("resize", resizeHandler);
  resizeHandler();
})();

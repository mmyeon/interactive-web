// 생성자 함수 만들기
function Character(info) {
  // 캐릭터 생성자를 통해 만들어낼 인스턴스 객체의 속성으로 쓰겠다(mainElem 자체를)
  this.mainElem = document.createElement("div");
  this.mainElem.classList.add("character");
  this.mainElem.innerHTML =
    "" +
    '<div class="character-face-con character-head">' +
    '<div class="character-face character-head-face face-front"></div>' +
    '<div class="character-face character-head-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-torso">' +
    '<div class="character-face character-torso-face face-front"></div>' +
    '<div class="character-face character-torso-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-arm character-arm-right">' +
    '<div class="character-face character-arm-face face-front"></div>' +
    '<div class="character-face character-arm-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-arm character-arm-left">' +
    '<div class="character-face character-arm-face face-front"></div>' +
    '<div class="character-face character-arm-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-leg character-leg-right">' +
    '<div class="character-face character-leg-face face-front"></div>' +
    '<div class="character-face character-leg-face face-back"></div>' +
    "</div>" +
    '<div class="character-face-con character-leg character-leg-left">' +
    '<div class="character-face character-leg-face face-front"></div>' +
    '<div class="character-face character-leg-face face-back"></div>' +
    "</div>";

  //   조립해서 스테이지의 하위 요소(자식)로 들어가야 됨
  document.querySelector(".stage").appendChild(this.mainElem);

  //   매개변수로 전달된 객체 잘 받아오는지 확인
  //  info 정보를 담은 객체
  //   console.log(info);
  //    캐릭터의 left값으로 클릭된 위치를 넣음
  this.mainElem.style.left = info.xPos + "%";
  // 스크롤 중인지 아닌지 체크하는 상태
  this.scrollState = false;
  // 바로 이전(마지막) 스크롤 위치
  this.lastScrollTop = 0;
  // xPos를 객체의 속성으로도 등록해줌. 접근할 수 있도록.
  this.xPos = info.xPos;
  // this.speed = 0.3;
  // 캐릭터 개별 속도 가지기
  this.speed = info.speed;
  // console.log(info.speed);
  // 움직임 방향 알려주는 속성 추가
  this.direction;
  // 좌우 이동 중인지 아닌지 판별
  this.runningState = false;
  // requestAnimationFrame 아이디 저장할 속성만들기
  // 계속 활용하기 위해서 속성으로 저장해두는 것
  this.rafId;
  this.init();
  //   생성자로 생성한 인스턴스 객체가 공통으로 사용하는 속성은 프로토타입 객체에 만든다.
}

// 원래 존재하는 프로토타입에 메서드 추가.
// Character.prototype.xxxxx = function () {

// };

// 프로토타입객체를 빈 객체로 재정의하려고 하기 떄문에 원래 갖고 있던 constructor 속상을 다시 만들어줘야함.
Character.prototype = {
  constructor: Character,
  // 메서드 추가, 캐릭터 만들어지는 순간에 실행되어야 함
  init: function () {
    // 여기서 this는 캐릭터 객체를 가리킴
    // console.log(this);
    const self = this;
    // 이벤트핸들러에서 this는 이벤트리스너를 실행한 객체. window
    window.addEventListener("scroll", function () {
      // 스크롤되는 동안은 self.scrollState의 셋타임아웃 함수를 취소함. 스크롤 중에서는 실행하지 않도록.
      // 스크롤이 멈추면 clearTImeout함수가 실행이 안되니까 self.scrollState에 값이 들어가게 됨
      this.clearTimeout(self.scrollState);
      // this.clearTimeout(self.scrollState);
      // console.log(this);
      // 우리가 원하는 this는 캐릭터생성자로 생성해낸 인스턴스 객체

      // 조건문에서 값을 가지고 있으면 true, 없으면 false
      if (!self.scrollState) {
        self.mainElem.classList.add("running");
        // console.log("running 클래스 붙었음");
      }

      // 0.5초 뒤에 함수 실행, setTimeout은 숫자를 리턴함
      self.scrollState = setTimeout(function () {
        // 스크롤을 멈춘 상태
        self.scrollState = false;
        self.mainElem.classList.remove("running");
      }, 500);

      // console.log(self.scrollState);

      // 현재 스크롤 위치 가져오기
      // 이전 스크롤 위치와 현재 스크롤 위치를 비교
      // console.log("self.lastScrollTop: ", self.lastScrollTop);
      // console.log("pageYOffset:", pageYOffset);

      if (self.lastScrollTop > this.pageYOffset) {
        // 이전 스크롤 위치가 크다면 : 스크롤 올림
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        //  현재 스크롤 위치가 크다면: 스크롤 내림
        self.mainElem.setAttribute("data-direction", "forward");
      }
      self.lastScrollTop = this.pageYOffset;
    });

    // 키 누른 한번만 실행
    window.addEventListener("keydown", function (e) {
      if (self.runningState) return;

      // 키다운이벤트가 얼마나 발생하는지 체크
      // 애니메이션이 자연스러우려면 최소 24 ~ 30프레임이 되어야 하는데
      // 키다운은 초당 10프레임이기에 움직임이 버벅이고 끊기고 부자연스러운 것
      // 키다운이 아닌 requestAnimationFrame 활용해야함
      // console.log("키다운");
      // self.lastScrollLeft = this.pageXOffset;
      // console.log(pageXoffset);
      // console.log(self.lastScrollLeft);
      // 키보드의 키마다 고유의 값이 있음.
      // console.log(e.keyCode);
      if (e.keyCode == 37) {
        // 왼쪽
        self.direction = "left";
        self.mainElem.setAttribute("data-direction", "left");
        // 걷는 움직임 추가
        self.mainElem.classList.add("running");
        self.run(self);
        self.runningState = true;
      } else if (e.keyCode == 39) {
        // 오른쪽
        self.direction = "right";
        self.mainElem.setAttribute("data-direction", "right");
        // 걷는 움직임 추가
        self.mainElem.classList.add("running");
        self.run(self);
        self.runningState = true;
      }
    });

    window.addEventListener("keyup", function (e) {
      self.mainElem.classList.remove("running");
      this.cancelAnimationFrame(self.rafId);
      // console.log(self.runningState);
      self.runningState = false;
    });
  },

  // 캐릭터 위치 갱신
  run: function (self) {
    // 벽 뚫기 전의 위치 찾기
    // console.log(self.xPos);

    // 캐릭터가 이동하도록 설정
    if (self.direction == "left") {
      self.xPos -= self.speed;
    } else if (self.direction == "right") {
      self.xPos += self.speed;
    }

    if (self.xPos < 2) {
      self.xPos = 2;
    }
    if (self.xPos > 88) {
      self.xPos = 88;
    }

    // self 오류나서 확인하기위해 찍어봄
    // requestAnimaionFrame으로 컨텍스트(실행되는 문맥)이 바뀌어서 this가 변경됨
    // console.log(self);
    // 바뀐 속성 값을 CSS 스타일에도 적용
    self.mainElem.style.left = self.xPos + "%";

    // 반복시키기.
    self.rafId = requestAnimationFrame(function () {
      self.run(self);
    });
  },
};

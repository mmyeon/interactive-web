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
  //   console.log(info);
  //    캐릭터의 left값으로 클릭된 위치를 넣음
  this.mainElem.style.left = info.xPos + "%";
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
      // console.log(this);
      // 우리가 원하는 this는 캐릭터생성자로 생성해낸 인스턴스 객체
      self.mainElem.classList.add("running");
    });
  },
};

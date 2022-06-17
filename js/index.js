
//   轮播图

async function fun() {
  let res = await axios({
    method: 'get',
    url: 'http://localhost:3005/books',
  }).then(data => {
    console.log(data);
    lunbo(data)
    // search(data)
  })
}
fun()

////首页轮播图
function lunbo(data) {
  $('.swiper-wrapper').empty()
  for (let item in data.data.data) {
    let a = data.data.data
    // console.log(a);
    let ren = $(`
          <div class="swiper-slide">
          <img src="${a[item].coverImg}" alt="" calss="tuimg">
          </div>
        `)
    $('.swiper-slide').append($('.tuimg'))
    $('.swiper-wrapper').append(ren)
    // console.log(data.data.data[item].coverImg);
  }

  let swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: true,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

// 排行榜
async function fn() {
  let res1 = await axios({
    method: 'get',
    url: 'http://localhost:3005/books',
    params: {
      _start: 0,
      _limit: 5
    }
  }).then(data => {
    console.log(data);
    paihang(data)
  })
}
fn()
function paihang(data) {
  let b = data.data.data
  for (let item in b) {
    // console.log(b[item].coverImg);
    let imgls = $(`
      <img src="${b[item].coverImg}" alt="">
      `)
    //  console.log( $('.booksbox>ul li').eq(item));
    $('.booksbox>ul li').eq(item).append(imgls)
  }

}


async function mohu() {
  let r = await axios({
    mathod: 'get',
    url: 'http://localhost:3005/books',
    params: {
      name_like: "西游记"
    }
  }).then(data => {
    console.log(data);
    search(data)
  })
}
mohu()
// 搜索书名
function search(data) {
  console.log(data);
  $('#inp').on('focus', function () {
    let d = data.data.data
    console.log(d);
    $('.icon').on('click', function () {
      $('#tishi').css('display', 'block')
      for (let key in d) {
        console.log($('#inp').val());
        $('#tishi').text(d[key].name + '作者：' + d[key].author)
      }
      $('tishi').on('click', function () {
        // <a href=''></a>
      }
      )
    })

  })
}











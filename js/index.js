
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
          <a href="./detail/detail.html?id=${data.data.data[item].id}">
          <img src="${a[item].coverImg}" alt="" calss="tuimg">
          </a>
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
    <a href="./detail/detail.html?id=${data.data.data[item].id}">
      <img src="${b[item].coverImg}" alt="">
      </a>
      `)
      $('img').on('click',function(){
        // console.log(123);
        $('#inp').html(data.data.data[item].name)
      })
  
    $('.booksbox>ul li').eq(item).append(imgls)

  }
}
// 搜索书名
function search() {
    $('.icon').on('click', function () {
      $('#tishi').css('display', 'block')
      async function mohu(val) {
        let r = await axios({
          mathod: 'get',
          url: 'http://localhost:3005/books',
          params: {
            name_like: val
          }
        }).then(data => {
          console.log(data);
          $('#tishi').text(data.data.data[0].name + '作者：' + data.data.data[0].author)
          $('.inp a').attr('href',`./detail/detail.html?id=${data.data.data[0].id}`)


        })
      }
      mohu($('#inp').val())
     
    })

  
}
search()
$('#booksanimation').click('on',function(){
   window.location.href='http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/table/table.html'
})








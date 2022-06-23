// var currUrl = decodeURIComponent(location.href.split('#')[0]);
//  console.log(currUrl);
//  currUrl.split()
// 获取id
console.log(location.href);
console.log(location.search);
let params = location.search.substr(1)
console.log(params);
var arr = params.split('=')
console.log(arr[1]);
// 渲染详情页面的数据

async function detail() {
  let rr = await axios({
    method: 'get',
    url: 'http://localhost:3005/books',
    params: {
      id: arr[1]
    }
  }).then(data => {
    console.log(data)
    $('.left').html(
      `<img src="${data.data.data[0].coverImg}" alt="">`
    )
    $('#inp').val(data.data.data[0].name)
    let name = data.data.data[0].name
    $('#shuming').append(name)
    let author = data.data.data[0].author
    $('#author').append(author)
    let jianjie = data.data.data[0].desc
    $('#jianjie').append(jianjie)
    //  星星评分
    let pingfen = data.data.data[0].rate
    function pf(pingfen) {
      layui.use('rate', function () {
        var rate = layui.rate;
        console.log(rate);
        //渲染
        var ins1 = rate.render({
          elem: '#test1',//绑定元素
          length: 10,
          value: data.data.data[0].rate,
          half: true,
          readonly: true,
        });
      });
    }
    pf(pingfen)
    $('#pingfen').append(pingfen)

  })
}

detail()


// 点击书籍input 框显示书名
function show() {
  async function mohu(val) {
    try {
      let res = await axios({
        method: 'get',
        url: 'http://localhost:3005/books',
        params: {
          name_like: val
        }
      }).then(data => {
        console.log(data.data.data[0].name);
        console.log($('.inp'));
       console.log($('.inp').val(`${data.data.data[0].name}`));
        $('.inp').val(`${data.data.data[0].name.value}`)
      })
    }
    catch (error) {
      console.log(error);
    }
  }
  mohu($('.inp').val())
}
show()

// 搜索框搜索
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
        console.log($('#tishi'));
        console.log(data);
        $('#tishi').click('on', function () {
            window.location.href=`http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/detail/detail.html?name=${data.data.data[0].name}`
            
  
        })

      })
    }
    mohu($('#inp').val())

  })

}
search()
$('#booksanimation').click('on', function () {
  window.location.href = 'http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/table/table.html'
})
$('.rank').click('on',function(){
  window.location.href="http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/table/paihang.html"
})

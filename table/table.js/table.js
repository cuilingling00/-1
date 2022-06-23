function re() {
    async function a() {
        try {
            let q = await axios({
                method: 'get',
                url: 'http://localhost:3005/books',

            }).then(data => {
                console.log(data);
            })
        } catch (error) {
            console.log(error);
        }
    }
    fun()
}
// input 框输入信息
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
                    console.log(data);
                    $('.inp a').attr('href', `http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/detail/detail.html?id=${data.data.data[0].id}`)
                    // window.location.assign('http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/detail/detail.html?id=' +data.data.data[0].id)
                })

            })
        }
        mohu($('#inp').val())

    })

}
search()

function fun() {
    (async function () {
        try {
            const {
                data: guanlidata
            } = await axios.get('http://localhost:3005/books?_page=1&_limit=50&_sort=id&_order=asc')

            function guanliBook() {
                console.log(guanlidata.data);

                layui.use('table', function () {
                    var table = layui.table;
                    table.render({ // height: 315,
                        elem: '#test',
                        // height:512,
                        autoSort: false,

                        toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                        ,
                        defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                            title: '提示',
                            layEvent: 'LAYTABLE_TIPS',
                            icon: 'layui-icon-tips'
                        }],
                        title: '用户数据表',
                        cols: [
                            [{
                                type: 'checkbox',
                                fixed: 'left'
                            }, {
                                field: 'name',
                                title: '书名',
                                width: 150,

                                fixed: 'left',
                                unresize: true,
                                sort: true
                            }, {
                                field: 'coverImg',
                                title: '封面图',
                                width: 150,
                                edit: 'text',
                                templet: function (d) {
                                    return `<img src="${d.coverImg}" alt="">`
                                }
                            }, {
                                field: 'author',
                                title: '作者',
                                width: 120,
                                edit: 'text'
                            }, {
                                field: 'desc',
                                title: ' 简介'
                            }, {
                                field: 'rate',
                                title: '评分',
                                width: 270,
                                sort: true,
                                templet: function (d) {
                                    let i = d.LAY_INDEX
                                    layui.use('rate', function () {
                                        var rate = layui.rate;
                                        //渲染
                                        let obj = {}
                                        var ins1 = rate.render({
                                            elem: '.bookXing' + i //绑定元素
                                            ,
                                            length: 10,
                                            half: true,
                                            value: d.rate,
                                            readonly: true
                                        });
                                    });
                                    i++
                                    return `<div class = "bookXing${i}"></div>`
                                }
                            }, {
                                fixed: 'right',
                                title: '操作',
                                toolbar: '#barDemo',
                                width: 200
                            }]
                        ],
                        page: false,
                        data: guanlidata.data,
                        limit: 5,
                        limits: [5, 10, 15, 50],

                    });
                    //头工具栏事件
                    table.on('toolbar(test)', function (obj) {
                        var checkStatus = table.checkStatus(obj.config.id);
                        switch (obj.event) {
                            case 'getCheckData':
                                var data = checkStatus.data;
                                layer.alert(JSON.stringify(data));
                                break;
                            case 'getCheckLength':
                                var data = checkStatus.data;
                                layer.msg('选中了：' + data.length + ' 个');
                                break;
                            case 'isAll':
                                layer.msg(checkStatus.isAll ? '全选' : '未全选');
                                break;

                            //自定义头工具栏右侧图标 - 提示
                            case 'LAYTABLE_TIPS':
                                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                                break;
                        };
                    });

                    //行工具事件
                    table.on('tool(test)', function (obj) {
                        var data = obj.data;
                        console.log(data)
                        if (obj.event === 'del') {
                            layer.confirm(`确定要删除${data.name}这本书吗？`, function (index) {
                                axios.delete("http://localhost:3005/books/" + data.id).then(data => {
                                    console.log(data);
                                })
                                obj.del();
                                layer.msg('删除成功');
                                layer.close(index);
                            });

                        } else if (obj.event === 'edit') {
                            //                 let content = `<div class="add">
                            //      <form action="">
                            //     <div class="form-group">
                            //     <label for="booksname">
                            //         *书名：<input type="text" placeholder="请输入书名" id="booksname" value=${data.name}>
                            //     </label>
                            //     <div>
                            //     <div class="form-group">
                            //     <label for="booksimage">
                            //         *封面图：<input type="text" placeholder="请输入封面图" id="booksimage" value=${data.coverImg}>
                            //     </label>
                            //     </div>
                            //     <div class="form-group">
                            //     <label for="booksauthor">
                            //         *作者：<input type="text" placeholder="请输入作者" id="booksauthor" value=${data.author}>
                            //     </label>
                            //     </div>
                            //     <div class="form-group">
                            //     <label for="rank">
                            //         评分：<input type="text" placeholder="请输入评分" id="rank" value=${data.rate}>
                            //     </label>
                            //     </div>
                            //     <div class="form-group">
                            //     <label for="booksdesc">
                            //         *简介：<textarea  class ="jianjie" placeholder="请输入简介" id="booksdesc">
                            //     </label>
                            //     </div>
                            // </form>
                            // </div>
                            // `
                            layer.open({
                                title: '编辑',
                                area: ['800px', '350px']
                                , content:
                                    `<form class="form-horizontal">
                    <div class="form-group">
                        <label for="inputname" class="col-sm-2 control-label">*书名</label>
                        <div class="col-sm-10">
                            <input type='text' class="form-control" id="inputname" placeholder="请输入书名"  value=${data.name}>
    
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputmage" class="col-sm-2 control-label">*封面图</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputmage" placeholder="请输入封面图" value=${data.coverImg}>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputauthor" class="col-sm-2 control-label">*作者</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputauthor" placeholder="请输入作者" value=${data.author}>
                        </div>
                    </div>
                    <div class="form-group">
                    <label for="inputPassword3" class="col-sm-2 control-label">*评分</label>
                    <div class="col-sm-10">
                        <div id="cont"></div> 
                        
                    </div>
                </div>
                    <div class="form-group">
                        <label for="inputPassword3" class="col-sm-2 control-label">*简介</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" rows="3" text=${data.desc}></textarea>
                        </div>
                    </div>
                    
                </form>`,
                                btn: ['取消', '确定']
                            })


                            $('textarea').text(data.desc)
                            // 编辑模态框功能
                            let star1;
                            $('.layui-layer-btn1').click(function () {
                                axios({
                                    method: "put",
                                    url: "http://localhost:3005/books/" + data.id,
                                    data: {
                                        name: `《${$('#inputname').val()}》`,
                                        author: $('#inputauthor').val(),
                                        desc: $('textarea').val(),
                                        rate: star1,
                                        coverImg: $('#inputmage').val(),
                                    },

                                }).then(data => {
                                    console.log(data.data);
                                    console.log(data.rate);
                                    re()
                                })


                            })
                            layui.use('rate', function () {
                                var rate = layui.rate;
                                console.log(rate);
                                //渲染
                                var ins1 = rate.render({
                                    elem: '#cont',//绑定元素
                                    length: 10,
                                    value: data.rate,
                                    half: true,
                                    choose: function (value) {
                                        console.log(value);
                                        star1 = value;
                                    }
                                });
                            });

                        }

                        else if (obj.event === 'detail') {
                            // window.location = "./bookContent.html";
                            window.location.assign('http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/detail/detail.html?id=' + data.id);
                        }
                    });
                });
                // 窗口变化是重新加载
                $(window).resize(function () {
                    // setBanner();
                    window.location.reload()
                })


            }
            guanliBook()

        } catch (error) {
            console.log(error);
        }

    })()

}
fun()
// let star = 0;
// 新增书籍
console.log($('#add'));
$('#add').click('on', function () {
    layer.open({
        title: '新增',
        area: ['800px', '350px']
        , content:
            `<form class="form-horizontal">
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">*书名</label>
                    <div class="col-sm-10">
                        <input type='text' class="form-control" id="inputEmail3" placeholder="请输入书名">

                    </div>
                </div>
                <div class="form-group">
                    <label for="inputcover" class="col-sm-2 control-label">*封面图</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputcover" placeholder="请输入封面图">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputauthor" class="col-sm-2 control-label">*作者</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputauthor" placeholder="请输入作者">
                    </div>
                </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">*评分</label>
                <div class="col-sm-10">
                    <div id="con"></div>
                </div>
            </div>
                <div class="form-group">
                    <label for="inputPassword3" class="col-sm-2 control-label">*简介</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                </div>
            </form>`,
        btn: ['取消', '确定'],

    })
    // 新增书籍
    $('.layui-layer-btn1').click('on', function () {
        let a = `《${$('#inputEmail3').val()}》`;
        console.log(a);
        let b = $('#inputauthor').val();
        let c = $('textarea').val();
        let d = $('#inputcover').val();
        if (a && b && c && d && star) {
            async function add1(star) {
                try {
                    let re = await axios({
                        method: 'post',
                        url: 'http://localhost:3005/books',
                        data: {
                            name: a,
                            author: b,
                            desc: c,
                            coverImg: d,
                            rate: star,
                        }
                    }).then(data => {
                        console.log(data);
                    })
                } catch (error) {
                    console.log(error);
                }
            }

            add1(star)
            fun()
        }
    })
    layui.use('rate', function () {
        var rate = layui.rate;
        console.log(rate);
        //渲染
        var ins1 = rate.render({
            elem: '#con',//绑定元素
            length: 10,
            // value: 0,
            half: true,
            choose: function (value) {
                star = value
            }
        });

    });

})
// 分页功能的实现

async function fen() {
    try {
        let { data: layDataPage } = await axios.get('http://localhost:3005/books?')
        console.log(layDataPage.data.length);
        // 顶层作用域 - 初始化分页条件
        let page = 1;
        let limit = 5;
        let sort = '';
        let order = 'asc';

        layui.use('table', function () {
            let table = layui.table;
            //监听分页
            function fenye() {
                layui.use(['laypage', 'layer'], function () {
                    var laypage = layui.laypage
                        , layer = layui.layer;

                    //不显示首页尾页
                    laypage.render({
                        elem: 'ele'
                        , count: layDataPage.data.length//获取后台数据
                        , first: false//上一页
                        , last: false//下一页
                        , limit: 5//每页个数
                        , limits: [5, 10, 20]
                        , layout: ['count', 'limit', 'prev', 'page', 'next']//选择每页的条数

                        , jump: async function (obj) {
                            console.log(obj.limit, obj.curr)
                            page = obj.curr;
                            limit = obj.limit
                            let { data: layData } = await
                                axios.get(`http://localhost:3005/books?_page=${page}&_limit=${limit}`)

                            // 放大图片
                            $('.layui-table-cell').on('click', 'img', function () {
                                // console.log($(this).attr('src'));
                                layer.open({
                                    type: 1
                                    , title: false //不显示标题栏
                                    , closeBtn: false
                                    // ,time:5000
                                    , anim: 3
                                    , shadeClose: true
                                    , area: 'auto'
                                    , shade: 0.5
                                    , id: 'LAY_layuipro' //设定一个id，防止重复弹出
                                    // , btn: ['火速围观', '残忍拒绝']
                                    , btnAlign: 'c'
                                    , moveType: 1 //拖拽模式，0或者1
                                    , content: `<div style="padding:10px 5px 10px 5px ; width: 300px; "><img style="width:100%" " src="${$(this).attr('src')}" alt=""></div>`
                                });
                            })

                            table.on('sort(test)', async function (obj) { //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                                console.log(obj.field); //当前排序的字段名
                                // console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
                                // console.log(this); //当前排序的 th 对象

                                // 修改顶级作用域中的值
                                sort = obj.field;
                                if (obj.field == 'name') {
                                    sort = 'id'
                                }
                                order = obj.type
                                // 重新渲染分页数据
                                const { data: { data: layData } } = await axios.get(`http://localhost:3005/books?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);


                                table.reload('test', {
                                    data: layData,
                                    initSort: obj, //记录初始排序，如果不设的话，将无法标记表头的排序状态。
                                    where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                                        field: obj.field, //排序字段
                                        order: obj.type //排序方式
                                    }
                                });

                            })
                                   

                            console.log(layData.data);
                         
                            table.render({
                                elem: '#test'
                                , autoSort: false
                                , toolbar: true
                                , title: '用户数据表'
                                , height: 690//总行高
                                , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                                , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                                    title: '提示'
                                    , layEvent: 'LAYTABLE_TIPS'
                                    , icon: 'layui-icon-tips'
                                }]


                                , cols: [[
                                    { type: 'checkbox', fixed: 'left' },
                                    { field: 'name', width: 120, title: '书名', sort: true, }
                                    , {
                                        //图片
                                        field: 'coverImg', title: '封面图', width: 120,
                                           
                                        templet: function (d) {
                                            return `<img src=" ${d.coverImg}" alt="">`
                                        }
                                    }
                                    , { field: 'author', width: 80, title: '作者', }
                                    , { field: 'desc', title: '简介', minWidth: 150, }
                                    , {
                                        field: 'rate', title: '评分', sort: true,
                                        templet: function (d) {
                                            let index = d.LAY_INDEX;
                                            layui.use('rate', function () {
                                                // console.log(d.rate);
                                                var rate = layui.rate;
                                                //渲染
                                                let obj = {}
                                                var ins1 = rate.render({
                                                    elem: '.bookXing' + index  //绑定元素
                                                    , length: 10//长度
                                                    , text: true//开启分数显示
                                                    , half: true//开启半星
                                                    , value: d.rate//初始值
                                                    , readonly: true//禁止修改
                                                });
                                            });
                                            index++;
                                            return `<div class = "bookXing${index}"></div>`
                                        }
                                    }
                                    , { field: 'experience', width: 180, title: '操作', toolbar: '#barDemo' }

                                ]]
                                , response: {
                                    statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
                                }
                                , data: layData.data
                            });




                        }
                    });
                })
            }
            fenye()
            $('.demoTable .layui-btn').on('click', function () {
                var type = $(this).data('type');
                active[type] ? active[type].call(this) : '';
            });
        });
    } catch (error) {
        console.log(error);
    }
}
fen()



// 导出表格

Excel()
/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}
// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}
function Excel() {
    $('#export').click(async function () {
        let books = [['书名', '作者', '封面图', '简介', '评分']];
        try {
            let { data } = await axios.get("http://localhost:3005/books");
            console.log(data);
            data.data.forEach(function (item, idx) {
                let arr = [item.name, item.author, item.coverImg, item.desc, item.rate]
                books.push(arr);
            })
        } catch (error) {
            console.log(error);
        }
        let sheet = XLSX.utils.aoa_to_sheet(books);
        openDownloadDialog(sheet2blob(sheet), '三味书屋.xlsx');
    })
}
// 打印pdf
console.log($('.layui-table-box'));

$('#print').click(function () {
    //给自创建元素
    $('.layui-table-box').attr('id', 'printTable')
    printJS(
        {
            // pdf或图像的url，html元素的id或json数据的对象
            printable: 'printTable',
            // 设置打印类型 pdf，html，image，json和raw-html
            type: 'html',
            css: './layui-v2.6.13/layui/css/layui.css',
        }
    )
})
// 返回顶部按钮
$(window).scroll(function () {
    if ($(document).scrollTop() < 0) {
        $(".top").hide();
    }
    if ($(document).scrollTop() > $(window).height()) {
        $(".top").show();
        $(".top").click(function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
});



$('#booksanimation').click('on', function () {
    window.location.href = 'http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/table/table.html'
})


$('.paihang').click('on', function () {
    window.location.href = 'http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/table/paihang.html'
})











(async function () {
    try {
        const {
            data: guanlidata
        } = await axios.get('http://localhost:3005/books?_page=1&_limit=12&_sort=id&_order=asc')

        function guanliBook() {
            console.log(guanlidata.data);
            for (let item in guanlidata.data) {
                console.log(item);
                console.log(guanlidata.data[item]);
                console.log($('.layui-layer-input'));


                // let res=`<tr>
                //     <td>${guanlidata.data[item].name}</td>
                //     <td><img src="${guanlidata.data[item].coverImg}" alt=""></td>
                //     <td>${guanlidata.data[item].author}</td>
                //     <td>${guanlidata.data[item].desc}</td>
                //     <td>${guanlidata.data[item].id}</td>
                //     <td><i class="iconfont icon-xiangqing">详情</i>
                //     <i class="iconfont icon-bianji">编辑</i>
                //     <i class="iconfont icon-shanchu_o">删除</i>
                //     </td>
                //     </tr>`
                //  $('table').append($(res))
            }

            layui.use('table', function () {
                var table = layui.table;
                table.render({ // height: 315,
                    elem: '#test',
                    // height:512,

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
                    page: true,
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
                        layer.confirm('真的删除行么', function (index) {
                            axios.delete("http://localhost:3005/books/" + data.id).then(data => {
                                console.log(data);
                            })
                            obj.del();
                            layer.msg('删除成功');
                            layer.close(index);
                        });

                    } else if (obj.event === 'edit') {
                        let content = `<div class="add">
             <form action="">
            <div class="form-group">
            <label for="booksname">
                *书名：<input type="text" placeholder="请输入书名" id="booksname" value=${data.name}>
            </label>
            <div>
            <div class="form-group">
            <label for="booksimage">
                *封面图：<input type="text" placeholder="请输入封面图" id="booksimage" value=${data.coverImg}>
            </label>
            </div>
            <div class="form-group">
            <label for="booksauthor">
                *作者：<input type="text" placeholder="请输入作者" id="booksauthor" value=${data.author}>
            </label>
            </div>
            <div class="form-group">
            <label for="rank">
                评分：<input type="text" placeholder="请输入评分" id="rank" value=${data.rate}>
            </label>
            </div>
            <div class="form-group">
            <label for="booksdesc">
                *简介：<input type="text" placeholder="请输入简介" id="booksdesc" value=${data.desc}>
            </label>
            </div>
        </form>
        </div>`
        layer.alert(content)
                    } else if (obj.event === 'detail') {
                        // window.location = "./bookContent.html";
                        window.location.assign('http://127.0.0.1:5500/js%E4%BB%A3%E7%A0%81/code/zuoye/ES6/code/%E4%B8%89%E5%91%B3%E4%B9%A6%E5%B1%8B%E9%A1%B9%E7%9B%AE/detail/detail.html?id=' + data.id);
                    }
                });
            });
            //窗口变化是重新加载
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



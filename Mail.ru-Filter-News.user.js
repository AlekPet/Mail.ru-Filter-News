// ==UserScript==
// @name            Mail.ru Filter News
// @name:ru         Mail.ru Фильтр новостей
// @namespace       https://github.com/AlekPet/
// @version         0.1
// @description     Highlight or hide news
// @description:ru  Подсветка или скрытие новостей
// @author          AlekPet 2021
// @license         MIT; https://raw.githubusercontent.com/AlekPet/Mail.ru-Filter-News/master/LICENSE
// @icon         data:image/svg+xml,%3Csvg viewBox%3D%220 0 95 32%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 xmlns%3Aserif%3D%22http%3A%2F%2Fwww.serif.com%2F%22 fill-rule%3D%22evenodd%22 clip-rule%3D%22evenodd%22 stroke-linejoin%3D%22round%22 stroke-miterlimit%3D%221.414%22%3E%3Cpath serif%3Aid%3D%2232_%40mail_w%22 fill%3D%22none%22 d%3D%22M0 0h95v32H0z%22%2F%3E%3CclipPath id%3D%22a%22%3E%3Cpath d%3D%22M0 0h95v32H0z%22%2F%3E%3C%2FclipPath%3E%3Cg clip-path%3D%22url(%23a)%22%3E%3Cpath fill%3D%22%23005ff9%22 d%3D%22M91.063 2.96h3.033v20.593h-3.033zM87.785 23.553h-3.033V8.96h3.033v14.593zM86.269 2.449a2.048 2.048 0 1 1-.001 4.095 2.048 2.048 0 0 1 .001-4.095zM81.475 23.553h-2.982v-1.596c-1.068 1.21-2.95 1.97-4.72 1.97a7.674 7.674 0 0 1-7.671-7.671 7.675 7.675 0 0 1 7.671-7.671c1.77 0 3.553.667 4.72 1.846V8.96h2.982v14.593zM73.87 11.651c2.61 0 4.664 1.868 4.664 4.605 0 2.738-2.054 4.622-4.664 4.622-2.611 0-4.595-2.011-4.595-4.622 0-2.61 1.984-4.605 4.595-4.605zM43.841 23.553H40.86V8.96h2.981v1.019c.662-.622 1.903-1.391 3.625-1.394 2.115 0 3.692.89 4.773 2.322 1.182-1.417 3.13-2.322 5.116-2.322 3.725 0 6.264 2.516 6.264 6.436v8.532h-2.981v-8.532a3.458 3.458 0 0 0-3.454-3.454 3.457 3.457 0 0 0-3.454 3.454v8.532h-2.981v-8.532a3.458 3.458 0 0 0-3.454-3.454 3.457 3.457 0 0 0-3.454 3.454v8.532z%22%2F%3E%3Cpath d%3D%22M20.813 16A4.818 4.818 0 0 1 16 20.813 4.818 4.818 0 0 1 11.187 16 4.818 4.818 0 0 1 16 11.187 4.818 4.818 0 0 1 20.813 16M16 0C7.178 0 0 7.178 0 16s7.178 16 16 16c3.232 0 6.349-.962 9.013-2.783l.046-.032-2.156-2.506-.036.024A12.672 12.672 0 0 1 16 28.72C8.986 28.72 3.28 23.014 3.28 16S8.986 3.28 16 3.28 28.72 8.986 28.72 16c0 .909-.101 1.829-.3 2.734-.402 1.651-1.558 2.157-2.426 2.09-.873-.071-1.894-.693-1.901-2.215V16c0-4.463-3.63-8.093-8.093-8.093S7.907 11.537 7.907 16s3.63 8.093 8.093 8.093a8.03 8.03 0 0 0 5.734-2.389 5.198 5.198 0 0 0 3.997 2.389 5.399 5.399 0 0 0 3.678-1.078c.959-.728 1.675-1.781 2.071-3.046.063-.204.179-.672.18-.675l.003-.017C31.896 18.262 32 17.25 32 16c0-8.822-7.178-16-16-16%22 fill%3D%22%23ff9e00%22 fill-rule%3D%22nonzero%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E
// @match        http*://mail.ru
// @updateURL    https://raw.githubusercontent.com/AlekPet/Mail.ru-Filter-News/master/Mail.ru-Filter-News.user.js
// @downloadURL  https://raw.githubusercontent.com/AlekPet/Mail.ru-Filter-News/master/Mail.ru-Filter-News.user.js
// @run-at document-end
// @grant GM_addStyle
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle("\
.filter_item_box{opacity: 0;height: 0;transition: transform 5s, height 3s, opacity 1s;-webkit-transform:transform 5s, height 3s, opacity 1s;overflow: hidden;}\
.filter_item_box_show{opacity: 1;height: auto;}\
.filter_item_box > div {transform: translateX(100vw);-webkit-transform: translateX(100vw);}\
.filter_item_box.filter_item_box_show > div {transform: translateX(0);-webkit-transform: translateX(0);}\
\
.filter_class{display: inline-block;padding: 2px;user-select:none;cursor:pointer;margin: 8px 6px 3px 6px;font-family: monospace;transition: 0.5s all;box-shadow:0 2px 2px silver;border: 3px solid;text-align: center;}\
.filter_class:hover{transform: scale(1.1);}\
\
.filter_item{font-size: 10px;border-radius: 4px;line-height:1;}\
.filter_item:hover{background-color: #40ffa087;}\
\
.add_filter_item{border-width:1px;border-radius: 100%;font-size: 14px;width: 15px;height: 15px;line-height: 0.5;}\
.add_filter_item:hover{background-color: #005ff9a1;color:#fff;}\
\
.filter_item_hide_legend:after {content: 'H';color: red;position: absolute;display: inline-block;margin-top: -11px;padding: 2px;border: 1px solid;background: #ffffffc7;}\
.filter_item_hide{display:none;}\
\
.tabs__filter_button{position: relative;display: -webkit-inline-flex;display: inline-flex;height: 27px;background: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03Ni40MjgsMjguOTg4Qzc1LjQ2NSwzMy4wMjQsNjMuODU1LDQ1LjE4Niw1Ni41LDUyLjU3OVY3NC4zNmwtMTIsNi45MjhWNTIuNTc5ICBjLTcuMzU2LTcuMzk0LTE4Ljk2NS0xOS41NTUtMTkuOTI4LTIzLjU5MUMyNC41MjksMjguODI1LDI0LjUsMjguNjYyLDI0LjUsMjguNWMwLTMuODY2LDEyLjE5My04LDI2LThjMTMuODA3LDAsMjYsNC4xMzQsMjYsOCAgQzc2LjUsMjguNjYyLDc2LjQ3MSwyOC44MjUsNzYuNDI4LDI4Ljk4OHogTTUwLjUsMjMuNWMtMTIuMTUsMC0yMywyLjc5MS0yMyw1YzIsNSwyMCwyNCwyMCwyNHYyNGMyLTEsNC0yLDYtM3YtMjFjMCwwLDE4LTE5LDIwLTI0ICBDNzMuNSwyNi4yOTEsNjIuNjUsMjMuNSw1MC41LDIzLjV6IE02Mi41LDM5LjVjLTUuMzYzLDUuOTUtMTEuOTMsMTMtMTEuOTMsMTNzLTYuODYxLTcuMTk4LTEyLjA3LTEzICBDNDUuOTE3LDM5LjU4NSw1NS40MDcsMzkuNjEzLDYyLjUsMzkuNXoiPjwvcGF0aD48L3N2Zz4=);width: 27px;background-size: 27px;top: 5px;}\
.tabs__filter_button:after{\content: '';mix-blend-mode: screen;background: #000000;position: absolute;width: 100%;height: 100%;}\
.tabs__filter_button:hover:after, .tabs__filter_button.activefilter:after{background: #005ff9;}\
\
.tabs__filter_button_info {position: absolute;z-index:1;color: white;background: #005ff994;padding: 3px;left: 80%;top: -5px;border-radius: 3px;user-select: none;font-size: 10px;line-height: 1;box-shadow: 2px 2px 3px #c0c0c0eb;}\
");

    var ObjMailNews = {
        filter_list: []
    }

    function LS_save(){
        var _tmp = JSON.stringify(ObjMailNews)

        if(_tmp){
            GM_setValue('ObjMailNews', _tmp)
        }
    }

    function LS_load(){
        var _tmp = GM_getValue('ObjMailNews')

        ObjMailNews = _tmp ? JSON.parse(_tmp) : ObjMailNews
        log(ObjMailNews)
    }

    function log(text){
        console.log(text)
    }

    function rndcolor(type){
        return type ? 'rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+', 1.0)':'#'+Math.floor(Math.random()*16777215).toString(16)
    }

    function isColor(strColor){
        var op = new Option().style;
        op.color = strColor;
        return op.color !== '';
    }

    function addClassName(el,cls){
        var all_class = el.className.split(' ')
        all_class.push(cls)
        return all_class.join(' ')
    }

    var NewsDown = function(){

        var self = this

        this.decorateStyle = function(el, num){
            var itemObj = ObjMailNews.filter_list[num]//el.dataset.myp ? JSON.parse(el.dataset.myp) : null

            if(itemObj && Object.keys(itemObj).length){
                if(itemObj.hide){
                    if(!el.classList.contains('filter_item_hide')) el.classList.add('filter_item_hide')
                    return;
                }

                if(itemObj.highlight){
                    var color = itemObj.highlight ? itemObj.highlight : rndcolor(),
                        highlight = "background:"+ color +';'

                    el.setAttribute("style", highlight)
                }
            }
        }

        this.findNews = function(mut, obs){
            var news = document.querySelectorAll(".tabs-content__item"),
                itemObj = ObjMailNews.filter_list,
                fElements = news.forEach(function(el){

                    var t_content = el.textContent.toLowerCase()

                    // Restore element
                    if(el.hasAttribute('style')) el.removeAttribute('style')
                    if(el.classList.contains('flter_item_hide')) el.classList.remove('flter_item_hide')
                    //

                    for(var z in itemObj){
                        if(t_content.includes(itemObj[z].title.toLowerCase())){
                            self.decorateStyle(el, z)
                        }
                    }
                })
            }

        this.addItem = function(event){
            var target = event.target
            var change = prompt('Введите значение: ')
            if(change && !/^\s*$/i.test(change)){
                var color = prompt('Введите значение цвета (пусто случ. цвет, каждый раз):\n #000000 or rgba(255,0,0,1.0) or rgb(0,255,0)', 'random'),
                    hide = prompt('Скрывать в новостной ленте?\n0 - нет\n1 - да','0')

                ObjMailNews.filter_list.push({
                    title: change,
                    highlight: isColor(color) ? color : rndcolor(),
                    hide: hide !== '1' ? 0 : 1
                })

                this.listUpd()
                this.findNews()
                LS_save();
            }
        }

        this.clickItem = function(num, event){
            var target = event.target,
                itemObj = ObjMailNews.filter_list[num],
                change = prompt('Введите значение: \ndel - удалить фильтр', itemObj.title)

            if(change && !/^\s*$/i.test(change)){
                if(change !== 'del'){
                    var color = prompt('Введите значение цвета (пусто случ. цвет):\n #000000 or rgba(255,0,0,1.0) or rgb(0,255,0)', itemObj.highlight),
                        hide = prompt('Скрывать в новостной ленте?\n0 - нет\n1 - да', itemObj.hide)

                    itemObj.title = change
                    itemObj.highlight = isColor(color) ? color : rndcolor()
                    itemObj.hide = hide == null ? itemObj.hide : hide !== '1' ? 0 : 1

                } else {
                    ObjMailNews.filter_list.splice(num, 1)
                }

                this.listUpd()
                this.findNews()
                LS_save()
            }
        }

        this.listUpd = function(){
            this.divBox.innerHTML = ''

            for(var z in ObjMailNews.filter_list){
                var itemObj = ObjMailNews.filter_list[z],
                    d = document.createElement("div")

                d.className = 'filter_class filter_item'
                d.textContent = itemObj.title
                d.title = 'Фильтр: '+d.textContent + (itemObj.hide?' (скрыть)':'')
                d.setAttribute("style", 'border-color:'+itemObj.highlight)

                if(itemObj.hasOwnProperty('hide') && itemObj.hide){
                    d.classList.add("filter_item_hide_legend")
                }

                d.addEventListener('click', this.clickItem.bind(this, z))

                this.divBox.appendChild(d)
            }

            var addButton = document.createElement("div")
            addButton.className = 'filter_class add_filter_item'
            addButton.textContent = '+'
            addButton.title = 'Добавить фильтр'
            addButton.addEventListener('click', this.addItem.bind(this))
            this.divBox.appendChild(addButton)

            this.filter_button_info.textContent = ObjMailNews.filter_list.length
            this.filter_button.title = 'Фильтр (Элементов: '+this.filter_button_info.textContent+')'
        }

        this.showhide = function(){
            if(!this.divBox.classList.contains('filter_item_box_show')){
                this.divBox.classList.add('filter_item_box_show')
                this.filter_button.classList.add('activefilter')
            } else {
                this.divBox.classList.remove('filter_item_box_show')
                this.filter_button.classList.remove('activefilter')
            }
            //this.divBox.style.display = this.divBox.style.display == 'block' ? 'none' : 'block'
        }

        this.init = function(){
            LS_load()

            var config = {
                attributes: true,
                attributeFilter:["data-show-pixel"],
                //childList: true,
                //subtree: true
            },
                tabs = document.querySelector(".tabs")

            this.divBox = document.createElement("div")
            this.divBox.classList.add('filter_item_box')

            this.filter_button = document.createElement("a")
            this.filter_button.href = '#'
            this.filter_button.title = 'Фильтр'
            this.filter_button.classList.add('tabs__filter_button')

            this.filter_button_info = document.createElement("div")
            this.filter_button_info.textContent = '...'
            this.filter_button_info.classList.add('tabs__filter_button_info')

            this.filter_button.appendChild(this.filter_button_info)

            this.listUpd()

            tabs.appendChild(this.filter_button)
            tabs.nextElementSibling.parentNode.insertBefore(this.divBox,tabs.nextElementSibling)

            this.filter_button.addEventListener('click', this.showhide.bind(this))

            this.findNews()

            this.observer = new MutationObserver(this.findNews);
            this.observer.observe(document.querySelector(".tabs-content_atlas"), config);
        }
    }

    new NewsDown().init()
})();

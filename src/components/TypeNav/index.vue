<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle';

export default {
  name: 'TypeNav',
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    // 通知 Vuex 发请求，获取数据，存储于仓库当中（这里个人觉得没必要用 Vuex，请求回来直接放到组件实例身上就可以了）
    // 但是在这里发起请求其实也不太好，因为每次从 Home 跳到 Search，或 Search 跳回 Home 都会发一次请求。请求太多服务器压力很大
    // 所以我们把发请求这个行为放到根组件 APP 的 mounted 身上，这样请求只会发起一次，然后 TypeNav 组件通过 Vuex 来读取数据
    // （这样这里使用 Vuex 就合理了）
    // this.$store.dispatch('categoryList');

    // 如果不是 Home 路由组件，将 typeNav 组件进行隐藏
    if (this.$route.path != '/home') {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList(state) {
        return state.Home.categoryList;
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据 currentIndex 属性（下面这样写，是因为要使用节流）
    changIndex: throttle(function (index) {
      // index：鼠标移上某一个一级分类的元素的索引值
      this.currentIndex = index;
    }, 50),
    // 一级分类鼠标移出的事件回调
    leaveIndex() {
      if (this.$route.path != '/home') {
        this.show = false;
      }
      this.currentIndex = -1;
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航 + 事件委派
      let element = event.target;
      // 在每个元素对象身上有一个 dataset 属性，是一个对象。里面保存着元素身上的以 data- 开头的自定义属性与属性值
      // 例如，一个元素身上有一个自定义属性 data-abc="123"，那么这个元素的 dataset 对象中就有一个属性 abc，值为 123
      // 注意：每一个自定义属性的属性名都是小写的英文字母组成，你在标准中自定义属性名为 data-Adc，会被自动转为 data-adc
      // console.log(element.dataset);
      // 我们在每个 a 标签身上都加上一个自定义属性 data-categoryname。这样事件触发时，判断触发的元素身上有没有该属性就知道是不是 a
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理路由跳转的参数
        let location = {
          name: 'search',
        };
        let query = {
          categoryName: categoryname,
        };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        // 判断：如果路由跳转的时候，带有 params 参数，也要捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }

    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }

    // 定义动画时间、速率（进入的过程）
    .sort-enter-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }
  }
}
</style>
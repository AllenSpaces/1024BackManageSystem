<script lang="ts" setup>

</script>


<template>
    <div class="home">
        <div class="home-content">
        <div class="home-content-left">
            <h1>欢迎使用1024后台管理系统</h1>
            <p>这是一个基于Vue3、TypeScript、Vite、Pinia、Element-Plus等技术栈的后台管理系统。</p>
        </div>
        <div class="home-content-right">
        </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    background-color: rgba(37, 37, 37, 0.49);
    border-radius: 8px;

    .home-content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .home-content-left {
            h1 {
                font-size: 2rem;
                font-weight: bold;
                color: #333;
            }

            p {
                font-size: 1.2rem;
                color: #666;
            }
        }

        .home-content-right {
            // 可以添加右侧内容
        }
    }
}
</style>
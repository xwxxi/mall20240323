// state 是 store 的数据 (data)，getters 是 store 的计算属性 (computed)，而 actions 则是方法 (methods)。

// 在 Setup Store 中：
// ref() 就是 state 属性
// computed() 就是 getters
// function() 就是 actions

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const defaultSize = ref(16);

  const getBigSize = computed(() => {
    return defaultSize.value + 10;
  });

  const changeSize = (size: any) => {
    defaultSize.value = size;
  };
  return {
    defaultSize,
    getBigSize,
    changeSize,
  };
});

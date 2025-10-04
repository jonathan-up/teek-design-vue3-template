import { UserService, type LoginParams, type User } from "@/common/api/user";
import { ref } from "vue";
import { defineStore } from "pinia";
import { resetRouter } from "@/router";
import { useLayoutStore } from "./layout";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const accessToken = ref("");

    const userInfo = ref<User>({});
    const roles = ref<string[]>([]);
    const searchHistory = ref<RouterConfig[]>([]);

    // 锁屏状态
    const isLock = ref(false);
    // 锁屏密码
    const lockPassword = ref("");

    const login = async (loginParams: LoginParams) => {
      console.log(loginParams);
      return await UserService.login(loginParams).then(res => {
        accessToken.value = res.result.token;
        return res.result;
      });
    };

    const getUserInfo = async () => {
      // 模拟获取用户信息
      return await UserService.getUserInfo().then(res => {
        // setRoles(res.data.roles);
        setUserInfo(res.result);
        setRoles([]);
        return res.result;
      });
    };

    /**
     * 设置锁屏状态
     * @param status 锁屏状态
     */
    const setLockStatus = (status: boolean) => {
      isLock.value = status;
    };

    /**
     * 设置锁屏密码
     * @param password 锁屏密码
     */
    const setLockPassword = (password: string) => {
      lockPassword.value = password;
    };

    const logout = async () => {
      // 重置锁屏状态
      isLock.value = false;
      // 清空锁屏密码
      lockPassword.value = "";
      userInfo.value = {};
      clearPermission();

      const layoutStore = useLayoutStore();
      layoutStore.removeAllTabs();
      layoutStore.setKeepAliveName();
      resetRouter();
    };

    const clearPermission = () => {
      setToken("");
      setRoles([]);
    };

    const setToken = (newAccessToken: string) => {
      accessToken.value = newAccessToken;
    };

    const setUserInfo = (userInfoParam: User) => {
      userInfo.value = userInfoParam;
    };

    const setRoles = (rolesParam: string[]) => (roles.value = rolesParam);

    const setSearchHistory = (searchHistoryParam: RouterConfig[]) => (searchHistory.value = searchHistoryParam);

    return {
      lockPassword,
      accessToken,
      userInfo,
      roles,
      searchHistory,
      isLock,

      login,
      logout,
      getUserInfo,
      clearPermission,
      setUserInfo,
      setToken,
      setRoles,
      setSearchHistory,
      setLockStatus,
      setLockPassword,
    };
  },
  {
    persist: {
      pick: ["accessToken", "searchHistory", "isLock", "lockPassword"],
    },
  }
);

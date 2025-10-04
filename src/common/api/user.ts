import { http } from "@/common/http";

export interface LoginParams {
  username: string;
  password: string;
  verifyCode?: string;
}

export interface User {
  id?: Number;
  username?: string;
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface LoginResponse {
  data: User;
  token: string;
}

export const UserService = {
  // 登录
  login(params: LoginParams) {
    return http.post<httpNs.Response<LoginResponse>>("/op/api/auth/login", params);
  },

  // 获取用户信息
  getUserInfo() {
    return http.get<httpNs.Response<User>>("/op/api/auth/getUserInfo");
  },
};

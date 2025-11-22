"use client";
import { useAppDispatch } from "@/store/hooks";
import { login, register } from "@/store/slice/auth.slice";
import {
  LoginInput,
  LoginResponse,
  RegisterUserInput,
  RegisterUserResponse,
} from "@/types/gql";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  isRegister: boolean;
};

type FormValues = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const LoginForm = ({ isRegister }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();

  const handleRegisterLogin = async (values: FormValues) => {
    if (isRegister) {
      const res = await dispatch(register(values as RegisterUserInput));
      const payload: any = (res as any)?.payload;
      const data: RegisterUserResponse = payload?.data?.registerUser;
      if (data.status) {
        router.push("/login");
      }
    } else {
      const res = await dispatch(login(values));
      const payload: any = (res as any)?.payload;
      const data: LoginResponse = payload?.data?.login;
      if (data.status) {
        router.push("/");
      }
    }
  };

  const handleSetPage = () => {
    if (isRegister) {
      router.push("/login");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className={`${isRegister ? "h-[600px]" : "h-[400px]"} md:w-[500px] ${isRegister ? "md:h-[500px]" : "md:h-[350px]"} rounded-3xl p-6 shadow-lg bg-white/80  backdrop-blur-sm md:grid grid-cols-1 grid-rows-2 md:grid-cols-2  md:grid-rows-1`}>
      <div className=" md:flex md:justify-center md:items-center">
        <Form form={form} layout="vertical" onFinish={handleRegisterLogin}>
          {isRegister && (
            <Form.Item
              name="username"
              label="User Name"
              rules={[{ required: true, message: "Please input user name" }]}
            >
              <Input type="text" />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input  email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input  password" }]}
          >
            <Input type="password" />
          </Form.Item>
          {isRegister && (
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please input confirm password" },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          )}
          <Form.Item>
            <Button className="w-full" htmlType="submit" type="primary">
              {isRegister ? "Register" : "Login"}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button className="w-full" onClick={() => handleSetPage()}>
              {isRegister ? "Login" : "Register"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className=" md:flex md:justify-center md:items-center">
        <span className=" text-2xl font-semibold text-black">
          CONCERT TICKET
        </span>
      </div>
    </div>
  );
};

export default LoginForm;

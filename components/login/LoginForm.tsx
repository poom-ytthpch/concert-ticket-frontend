"use client";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slice/auth.slice";
import { LoginInput, LoginResponse } from "@/types/gql";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleLogin = async (values: LoginInput) => {
    const res = await dispatch(login(values));
    const payload: any = (res as any)?.payload;
    const data: LoginResponse = payload?.data?.login;
    if (data.status) {
      router.push("/");
    }
  };

  return (
    <div className="h-[350px] md:w-[500px] md:h-[400px] rounded-3xl p-6 shadow-lg bg-white/80  backdrop-blur-sm md:grid grid-cols-1 grid-rows-2 md:grid-cols-2  md:grid-rows-1">
      <div className=" md:flex md:justify-center md:items-center">
        <Form form={form} layout="vertical" onFinish={handleLogin}>
          <Form.Item name="email" label="Email" className="">
            <Input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button className="w-full" htmlType="submit" type="primary">
              Login
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

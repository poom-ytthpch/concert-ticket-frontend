"use client";
import { Button, Form, Input } from "antd";

const LoginForm = () => {
  const [form] = Form.useForm();

  return (
    <div className="h-[350px] md:w-[500px] md:h-[400px] rounded-3xl p-6 shadow-lg bg-white/80  backdrop-blur-sm md:grid grid-cols-1 grid-rows-2 md:grid-cols-2  md:grid-rows-1">
      <div className=" md:flex md:justify-center md:items-center">
        <Form form={form} layout="vertical">
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

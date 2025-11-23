"use client";
import { CreateConcertInput, CreateConcertResponse } from "@/types/gql";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SaveOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createConcert, getConcerts } from "@/store/slice/concert.slice";
import { useRouter } from "next/navigation";

type Props = {
  handleSetTabs: (key: string) => void;
};

const CreateConcertForm = ({ handleSetTabs }: Props) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<CreateConcertInput>();
  const user = useAppSelector((state) => state.auth.user);

  const handleCreate = async (values: CreateConcertInput) => {
    const res = await dispatch(
      createConcert({ ...values, totalSeats: Number(values.totalSeats) })
    );
    const payload: any = (res as any)?.payload;
    const data: CreateConcertResponse = payload?.data?.createConcert;
    if (data?.status) {
      await form.resetFields();
      await handleSetTabs("1");
      if (user) {
        dispatch(getConcerts({ isAdmin: user.isAdmin, take: 10, skip: 0 }));
      }
    }
  };

  return (
    <div className="flex flex-col w-full rounded p-6 shadow-lg bg-white/80  border-gray-200 gap-4">
      <div className=" text-2xl font-semibold text-blue-500  ">Create</div>
      <div className="border-b border-gray-200 "></div>

      <Form form={form} layout="vertical" onFinish={handleCreate}>
        <div className={`flex gap-4 flex-col md:flex-row`}>
          <Form.Item
            name="name"
            label="Concert Name"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input concert name" }]}
          >
            <Input placeholder="Please input concert name" />
          </Form.Item>
          <Form.Item
            name="totalSeats"
            label="Total of seat"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input total seat" }]}
          >
            <Input type="number" placeholder="Please input total seat" />
          </Form.Item>
        </div>
        <Form.Item
          name="description"
          label="Description"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Please input description" }]}
        >
          <TextArea rows={4} placeholder="Please input description" />
        </Form.Item>

        <div className="flex justify-end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <SaveOutlined />
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CreateConcertForm;

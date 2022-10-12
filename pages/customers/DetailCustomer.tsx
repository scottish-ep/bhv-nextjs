import React from "react";
import ReactDOM from "react-dom";
import { Table, Switch, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Radio } from "antd";
import Select from "../../components/Select/Select";
import Icon from "../../components/Icon/Icon";
import TitlePage from "../../components/TitlePage/Titlepage";
import TextArea from "../../components/TextArea/TextArea";
import styles from "../../styles/DetailCustomer.module.css";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
interface DataType {
  id: string | number;
}
const DetailsCustomer = () => {
  const resources: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Nguồn KH",
      value: "Nguồn KH",
    },
    {
      label: "App BHV",
      value: "App BHV",
    },
    {
      label: "Tại CH",
      value: "Tại CH",
    },
    {
      label: "Facebook",
      value: "Facebook",
    },
    {
      label: "Livestream Facebook",
      value: "Livestream Facebook",
    },
    {
      label: "Livestream App",
      value: "Livestream App",
    },
    {
      label: "Zalo",
      value: "Zalo",
    },
  ];

  const data = [
    {
      id: "123456",
      created: "19/09/2022 - 13:05",
      name: "LD Mart Bưởi Da xanh",
      price: "75.000 đ",
      status: "Đã gửi hàng",
    },
    {
      id: "123456",
      created: "19/09/2022 - 13:05",
      name: "LD Mart Bưởi Da xanh",
      price: "75.000 đ",
      status: "Đã gửi hàng",
    },
    {
      id: "123456",
      created: "19/09/2022 - 13:05",
      name: "LD Mart Bưởi Da xanh",
      price: "75.000 đ",
      status: "Đã gửi hàng",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã đơn hàng",
      width: 150,
      key: "id",
      fixed: "left",
      align: "center",
      render: (_, record) => <div color="#384ADC">123456</div>,
    },
    {
      title: "Thời gian tạo",
      width: 150,
      dataIndex: "time",
      key: "time",
      fixed: "left",
      align: "center",
      render: (_, record) => <div>19/09/2022 - 13:05</div>,
    },
    {
      title: "Sản phẩm",
      width: 246,
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (_, record) => <div>LD Mart Bưởi Da xanh</div>,
    },
    {
      title: "Giá trị đơn hàng",
      width: 200,
      dataIndex: "level",
      key: "level",
      align: "center",
      render: (_, record) => <div>75.000 đ</div>,
    },
    {
      title: "Trạng thái",
      width: 160,
      dataIndex: "order",
      key: "order",
      align: "center",
      render: (_, record) => <div color="#384ADC">Đã gửi hàng</div>,
    },
  ];

  const tags = [
    {
      label: "Khách khó tính",
      value: "Khách khó tính",
    },
    {
      label: "Gọi không nghe máy",
      value: "Gọi không nghe máy",
    },
    {
      label: "Đang chờ cọc",
      value: "Đang chờ cọc",
    },
    {
      label: "Gọi không nghe máy",
      value: "Gọi không nghe máy",
    },
  ];

  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-start mb-[32px]">
        <TitlePage href="#" title="Khách hàng" />
      </div>
      <div className="flex justify-spacebetween ">
        <div className="flex flex-col mr-[16px]">
          <div className={styles.table}>
            <div className="flex justify-between mb-[15px]">
              <div></div>
              <div className="flex gap-[8px] ">
                <Button
                  variant="danger-outlined"
                  width={113}
                  icon={<Icon icon="trash" size={24} color="#EF4444" />}
                >
                  Xoá KH
                </Button>
                <Button variant="secondary" width={113}>
                  LƯU (F12)
                </Button>
              </div>
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Họ và tên *</div>
              <Input width={296} placeholder="Nhập tên nhân viên" />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Số điện thoại *</div>
              <Input
                type="phone-number"
                width={296}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Giới tính</div>
              <div style={{ width: 296 }}>
                <Radio.Group>
                  <div className="mr-[95px]">
                    <Radio value="Nam">Nam</Radio>
                  </div>
                  <Radio value="Nữ">Nữ</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Sinh nhật</div>
              <DatePicker width={296} placeholder="Ngày/tháng/năm" />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Email</div>
              <Input type="email" width={296} placeholder="Nhập email" />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Chọn nguồn</div>
              <Select
                placeholder="Chọn nguồn"
                style={{ width: 296 }}
                options={resources}
              />
            </div>
          </div>
          <div className="w-full bg-white mb-[8px] mr-16 px-[12px] py-[22px]">
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <Button
                width={140}
                variant="purple-filled"
                text="Khách hàng xấu"
              ></Button>
              <Button
                variant="danger"
                width={326}
                icon={<Icon icon="danger-1" size={24} color="#EF4444" />}
              >
                <span></span>
                Khách hàng bị chặn online
              </Button>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">Người tạo</div>
              <div className="flex items-center justify-left w-[241px] max-w-[241px]">
                <div className="text-medium font-medium max-w-max">
                  Lê Văn C
                </div>
                <div className="text-medium font-normal">
                  (12/08/2022 - 21:23)
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">Người tạo</div>
              <div className="flex justify-between items-center w-[241px] max-w-[241px]">
                <div className="text-medium font-medium max-w-max">Vàng</div>
                <div className="text-sm font-normal">(3.500 điểm)</div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">
                Tổng tiền hàng đã mua
              </div>
              <div className={styles.row_left}>1.356.000 đ</div>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">Tổng số đơn hàng</div>
              <div className={styles.row_left}>12</div>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">Đã in</div>
              <div className={styles.row_left}>10</div>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">Đã nhận</div>
              <div className={styles.row_left}>8</div>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">Đã hoàn</div>
              <div className={styles.row_left}>2</div>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">Hoàn 1 phần</div>
              <div className={styles.row_left}>2</div>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">Tiền nợ khách</div>
              <div className={styles.row_left}>120.000 đ</div>
            </div>
          </div>
          <div className="mb-[4px] bg-[##FFFFFF]">
            <div className="text-[#4B4B59] font-semibold mb-[6px]">
              <span className="ml-[8px]">Thẻ</span>
            </div>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              defaultValue={["gold", "cyan"]}
              style={{ width: "100%" }}
              options={tags}
            />
          </div>
          <div className={styles.table}>
            <div>
              <div className="flex justify-between mb-[12px]">
                <div className="text-medium font-medium ">
                  Chặn khách hàng này?
                </div>
                <Switch className="button-switch" />
              </div>
              <TextArea>Nhập ghi chú</TextArea>
            </div>
          </div>
          <div className={styles.table}>
            <div>
              <div className="flex justify-between">
                <div className="text-medium font-medium mb-[12px]">
                  Chặn khách hàng này?
                </div>
                <Switch className="button-switch" />
              </div>
              <TextArea>Nhập ghi chú</TextArea>
            </div>
          </div>
          <div className={styles.table}>
            <div className="text-medium font-medium mb-[12px]">
              Địa chỉ nhận hàng
            </div>
            <div className={styles.address}>
              <div className="flex justify-between w-[40%]">
                <div className="text-medium font-medium">Tran Huyen</div>
                <div>|</div>
                <div className="text-medium font-medium">0987.987.456</div>
              </div>
              <div>123 Nguyễn Đình Chiểu, P1, Q. Tân Phú, TP.HCM</div>
            </div>
            <div className={styles.address}>
              <div className="flex justify-between w-[40%]">
                <div className="text-medium font-medium">Tran Huyen</div>
                <div>|</div>
                <div className="text-medium font-medium">0987.987.456</div>
              </div>
              <div>123 Nguyễn Đình Chiểu, P1, Q. Tân Phú, TP.HCM</div>
            </div>
            <div className={styles.address}>
              <div className="flex justify-between w-[40%]">
                <div className="text-medium font-medium">Tran Huyen</div>
                <div>|</div>
                <div className="text-medium font-medium">0987.987.456</div>
              </div>
              <div>123 Nguyễn Đình Chiểu, P1, Q. Tân Phú, TP.HCM</div>
            </div>
          </div>
        </div>
        <div className="w-8/12">
          <Table columns={columns} dataSource={data}></Table>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<DetailsCustomer />, document.getElementById("root"));

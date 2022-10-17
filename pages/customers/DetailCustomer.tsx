import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Table, Switch, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import DatePicker from '../../components/DatePicker/DatePicker';
import { Radio } from 'antd';
import Select from '../../components/Select/Select';
import Icon from '../../components/Icon/Icon';
import TitlePage from '../../components/TitlePage/Titlepage';
import { Popover } from 'antd';
import TextArea from '../../components/TextArea/TextArea';
import styles from '../../styles/DetailCustomer.module.css';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import defaultAvatar from '../../assets/default-avatar.svg';
import Image from 'next/image';
import ModalUnblockCustomer from './ModalAddCustomer/ModalUnblockCustomer';
import ModalUnreportCustomer from './ModalAddCustomer/ModalUnreportCustomer';
import ModalAddress from './ModalAddCustomer/ModalAddress';
import { isEmpty } from 'lodash';
interface DataType {
  id: string | number;
  img: string;
  created: string;
  name: string;
  status: string;
  price: number;
  href: string;
}
const DetailsCustomer = (props: DataType) => {
  const { id, img, href } = props;
  let [checkedReport, setCheckedReport] = useState(false);
  let [checkedBlock, setCheckedBlock] = useState(false);
  const address = [
    {
      id: '1',
      name: 'Tran Huyen',
      phone: '0987.987.456',
      address: '123 Nguyễn Đình Chiểu, P1, Q. Tân Phú, TP.HCM',
    },
    {
      id: '3',
      name: 'Tran Huyen',
      phone: '0987.987.456',
      address: '123 Nguyễn Đình Chiểu, P1, Q. Tân Phú, TP.HCM',
    },
    {
      id: '4',
      name: 'Tran Huyen',
      phone: '0987.987.456',
      address: '123 Nguyễn Đình Chiểu, P1, Q. Tân Phú, TP.HCM',
    },
  ];
  const [itemList, setItemList] = useState([...address]);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });
  const [isShowUnreport, setIsShowUnreport] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowAddress, setIsShowAddress] = useState(false);
  const [isShowUnblock, setIsShowUnblock] = useState(false);
  const handleDelete = (id: string) => {
    setItemList((prevItemList) =>
      prevItemList.filter((product) => product.id !== id)
    );
  };
  const resources: {
    label: string;
    value: string;
  }[] = [
    {
      label: 'Nguồn KH',
      value: 'Nguồn KH',
    },
    {
      label: 'App BHV',
      value: 'App BHV',
    },
    {
      label: 'Tại CH',
      value: 'Tại CH',
    },
    {
      label: 'Facebook',
      value: 'Facebook',
    },
    {
      label: 'Livestream Facebook',
      value: 'Livestream Facebook',
    },
    {
      label: 'Livestream App',
      value: 'Livestream App',
    },
    {
      label: 'Zalo',
      value: 'Zalo',
    },
  ];

  const data = [
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
    {
      id: '123456',
      created: '19/09/2022 - 13:05',
      name: 'LD Mart Bưởi Da xanh',
      price: 75000,
      status: 'Đã gửi hàng',
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã đơn hàng',
      width: 150,
      key: 'id',
      fixed: 'left',
      align: 'center',
      render: (_, record) => (
        <div
          className="cursor-pointer text-[#384ADC] font-medium text-medium"
          onClick={() => (window.location.href = '/products/DetailProduct')}
        >
          {record.id}
        </div>
      ),
    },
    {
      title: 'Thời gian tạo',
      width: 190,
      dataIndex: 'time',
      key: 'time',
      fixed: 'left',
      align: 'center',
      render: (_, record) => (
        <div className="font-medium text-medium">{record.created}</div>
      ),
    },
    {
      title: 'Sản phẩm',
      width: 246,
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      render: (_, record) => (
        <div className="font-medium text-medium">{record.name}</div>
      ),
    },
    {
      title: 'Giá trị đơn hàng',
      width: 200,
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      render: (_, record) => (
        <div className="font-medium text-medium">{record.price} đ</div>
      ),
    },
    {
      title: 'Trạng thái',
      width: 160,
      dataIndex: 'order',
      key: 'order',
      align: 'center',
      render: (_, record) => (
        <div className="text-[#8B5CF6] font-medium text-medium">
          {record.status}
        </div>
      ),
    },
  ];
  const content = (
    <div className="w-[148px] flex flex-col detail-customer">
      <div
        className="w-full flex justify-start mb-[8px] cursor-pointer"
        onClick={() => {
          setIsEdit(true);
          setIsShowAddress(true);
        }}
      >
        <Icon icon="edit-2" size={24} />
        <p className="text-medium font-medium ml-[5px]">Chỉnh sửa</p>
      </div>
      <div className="cursor-pointer w-full flex justify-start" >
        <Icon icon="trash" size={24} />
        <p className="text-medium font-medium ml-[5px] text-[#EF4444]">
          Xoá địa chỉ
        </p>
      </div>
    </div>
  );
  const tags = [
    {
      id: '1',
      label: 'Khách khó tính',
      value: 'Khách khó tính',
    },
    {
      id: '2',
      label: 'Gọi không nghe máy',
      value: 'Gọi không nghe máy',
    },
    { id: '3', label: 'Đang chờ cọc', value: 'Đang chờ cọc' },
    {
      id: '4',
      label: 'Gọi không nghe máy',
      value: 'Gọi không nghe máy',
    },
  ];

  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose, id } = props;
    const [itemList, setItemList] = useState([{ id: '10', value: 'Nhom 1' }]);
    const [name, setName] = useState('');
    const onNameChange = (event) => {
      setName(event.target.value);
    };
    const handleAdd = (e) => {
      setItemList((current) => [
        ...current,
        { id: Math.floor(Math.random() * 10000000).toString(), value: value },
      ]);
    };
    const handleClear = () => {
      setName('');
    };
    // const handleDelete = (id: string) => {
    //   setItemList((prevItemList) =>
    //     prevItemList.filter((product) => product.id !== id)
    //   );
    // };
    const addInput = (e) => {
      handleAdd(e);
      handleClear();
    };

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
  const data1 = {
    img: '',
    name: 'Nguyễn Văn A',
    phone: '0363.216.213',
    birthday: '1/1/2020',
    email: 'a@gmail.com',
    source: 'Facebook',
  };

  return (
    <div className="w-full">
      <div className="flex items-start mb-[32px]">
        <TitlePage href="#" title="Khách hàng" />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col mr-[16px]  w-[472px]">
          <div className={styles.table}>
            <div className="flex justify-between mb-[15px]">
              <div className="relative w-[72px] h-[72px]">
                <Image src={data1.img || defaultAvatar} layout="fill" />
              </div>
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
              <Input width={296} value={data1.name} />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Số điện thoại *</div>
              <Input type="phone-number" width={296} value={data1.phone} />
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
                defaultValue={data1.source}
                options={resources}
              />
            </div>
          </div>
          <div className="w-full bg-white mb-[8px] mr-16 px-[12px] py-[22px]">
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="w-[115px] rounded-lg bg-[#8B5CF6] h-[45px] text-[#FFF] flex justify-center items-center font-medium text-medium">
                Khách hàng xấu
              </div>
              <div className="w-[326px] rounded-lg bg-[#EF4444] h-[45px] text-[#FFF] flex justify-center items-center font-medium text-medium">
                <Icon icon="danger-1" size={16} className="mr-[5px]" />
                Khách hàng bị chặn online
              </div>
            </div>
            <div className="flex items-center justify-between mb-[12px] mb-[31px]">
              <div className="text-medium font-medium">Người tạo</div>
              <div className="flex items-center justify-left w-[241px] max-w-[241px]">
                <div className="text-medium font-medium max-w-max mr-[5px]  ">
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
                <div className="text-medium font-semibold max-w-max text-[#EAB308]">
                  Vàng
                </div>
                <div className="text-medium font-semibold">(3.500 điểm)</div>
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
            <div className="flex items-center justify-between ">
              <div className="text-medium font-medium mb-[17px]">
                Tiền nợ khách
              </div>
              <div className="flex flex-col justify-start">
                <div className={styles.row_left}>120.000 đ</div>
                <p
                  className="cursor-pointer text-medium font-medium text-[#384ADC]"
                  onClick={() =>
                    (window.location.href = '/debts/Modall/ModalDebtDetail')
                  }
                >
                  Xem chi tiết
                </p>
              </div>
            </div>
          </div>
          <div className="mb-[4px] bg-[#FFFFFF]">
            <div className="text-[#4B4B59] font-semibold mb-[6px]">
              <span className="ml-[8px]">Thẻ</span>
            </div>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              defaultValue={['gold', 'cyan']}
              style={{ width: '100%' }}
              options={tags}
            />
          </div>
          <div className={styles.table}>
            <div>
              <div className="flex justify-between mb-[12px]">
                <div className="text-medium font-medium ">
                  Chặn khách hàng này?
                </div>
                <Switch
                  className="button-switch"
                  checked={checkedBlock}
                  onChange={() => {
                    setCheckedBlock((checkedBlock) => !checkedBlock);
                    checkedBlock && setIsShowUnblock(true);
                  }}
                />
              </div>
              <TextArea>Nhập ghi chú</TextArea>
            </div>
          </div>
          <div className={styles.table}>
            <div>
              <div className="flex justify-between">
                <div className="text-medium font-medium mb-[12px]">
                  Báo xấu khách hàng này?
                </div>
                <Switch
                  className="button-switch"
                  checked={checkedReport}
                  onChange={() => {
                    setCheckedReport((checkedReport) => !checkedReport);
                    checkedReport && setIsShowUnreport(true);
                  }}
                />
              </div>
              <TextArea>Nhập ghi chú</TextArea>
            </div>
          </div>
          <div className={styles.table}>
            <div className="flex justify-between w-full">
              <p className="text-medium font-medium mb-[12px]">
                Địa chỉ nhận hàng
              </p>
              <p
                className="text-medium font-medium text-[#384ADC] cursor-pointer"
                onClick={() => {
                  setIsEdit(false);
                  setIsShowAddress(true);
                }}
              >
                Thêm mới
              </p>
            </div>

            {Array.isArray(itemList) &&
              itemList.map((item) => (
                <div className={styles.address} >
                  <div className="flex w-full justify-between">
                    <div className="flex justify-between w-[40%]">
                      <div className="text-medium font-medium">{item.name}</div>
                      <div>|</div>
                      <div className="text-medium font-medium">
                        {item.phone}
                      </div>
                    </div>
                    <div>
                      <Popover
                        placement="bottomLeft"
                        content={content}
                        className="detail-customer"
                        trigger="hover"
                        overlayStyle={{
                          width: '160px',
                          padding: '0px',
                        }}
                      >
                        <Button width={24} height={24} className="p-0">
                          <Icon icon="three-dots" color="black" size={24} />
                        </Button>
                      </Popover>
                    </div>
                  </div>
                  <div>{item.address}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-8/12">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              defaultPageSize: 6,
              showSizeChanger: true,
              pageSizeOptions: [6, 20, 50, 100],
            }}
          ></Table>
        </div>
        <ModalUnblockCustomer
          title="Thông báo"
          isVisible={isShowUnblock}
          onClose={() => {
            setCheckedBlock(true);
            setIsShowUnblock(false);
          }}
          onOpen={() => {
            setCheckedBlock(false);
            setIsShowUnblock(false);
          }}
        />
        <ModalUnreportCustomer
          title="Thông báo"
          isVisible={isShowUnreport}
          onClose={() => {
            setIsShowUnreport(false);
          }}
          onOpen={() => {
            setCheckedReport(false);
            setIsShowUnreport(false);
          }}
        />
        <ModalAddress
          title="Địa chỉ nhận hàng"
          isEdit={isEdit}
          isVisible={isShowAddress}
          onClose={() => setIsShowAddress(false)}
          onOpen={() => setIsShowAddress(false)}
        />
      </div>
    </div>
  );
};

export default DetailsCustomer;
// ReactDOM.render(<DetailsCustomer />, document.getElementById("root"));

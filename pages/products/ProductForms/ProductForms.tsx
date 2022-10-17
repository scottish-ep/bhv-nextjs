import { format } from 'date-fns';
import React, { useState } from 'react';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import Input from '../../../components/Input/Input';
import ModalConfirm from '../../../components/Modal/ModalConfirm/ModalConfirm';
import { Popover } from 'antd';
import Select from '../../../components/Select/Select';
import TextArea from '../../../components/TextArea';
import DatePicker from '../../../components/DatePicker/DatePicker';
import TitlePage from '../../../components/TitlePage/Titlepage';
import Upload from '../../../components/Upload/Upload';
import { productTypeList, productAttributes } from '../../../const/constant';
import type { ColumnsType } from 'antd/es/table';
import styles from '../../../styles/DetailCustomer.module.css';
import type {
  ProductAttributeProps,
  ProductDetailProps,
} from '../product.type';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Checkbox, Switch, Tag } from 'antd';
import CheckboxList from '../../../components/CheckboxList/CheckboxList';
import classNames from 'classnames';
import { Table } from 'antd';
interface ProductFormProps {
  detail?: any;
  type_attr_list?: ProductAttributeProps[];
}

const ProductForms: React.FC<ProductFormProps> = ({
  detail,
  type_attr_list = [],
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isOnApp, setIsOnApp] = useState(false);
  const data = [
    {
      id: '1',
      attribute: 'Màu sắc',
      typeAttribute: [
        {
          label: 'TRANG',
          value: 'TRANG',
        },
        {
          label: 'TRANG',
          value: 'TRANG',
        },
      ],
    },
    {
      id: '2',
      attribute: 'Màu sắc',
      typeAttribute: [
        {
          label: 'TRANG1',
          value: 'TRANG',
        },
        {
          label: 'TRANG1',
          value: 'TRANG1',
        },
      ],
    },
  ];
  const [typeAttributeList, setTypeAttributeList] = useState([...data]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDeleteProduct = (id: string) => {
    setTypeAttributeList((prevTypeAttributeList) =>
      prevTypeAttributeList.filter((product) => product.id !== id)
    );
  };

  const handleChange = (value: string) => {
    const list = checkboxSettings.map((item) => {
      if (item.value === 'App') {
        setIsOnApp(true);
      }
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleConfirmDelete = () => {
    console.log('delete');
    setIsShowModalConfirm(false);
  };

  const tags = [
    {
      label: 'Tất cả kho',
      value: 'Tất cả kho',
    },
    {
      label: 'Tổng kho Linh Dương',
      value: 'Tổng kho Linh Dương',
    },
    {
      label: 'Siêu thị tiện ích Linh Dương',
      value: 'Siêu thị tiện ích Linh Dương',
    },
    {
      label: 'LD Mart',
      value: 'LD Mart',
    },
  ];

  const content = (
    <div className="flex flex-col w-full">
      <div className="text-medium font-medium mb-[4px]">Mã</div>
      <Input className="rounded-lg" placeholder="nhập" />
      <div className="text-medium font-medium mb-[4px]">Thuộc tính</div>
      <Input className="rounded-lg" placeholder="nhập" />
      <div className="flex justify-between w-full">
        <Button
          variant="outlined"
          className="mt-[32px]"
          text="Huỷ bỏ"
          width={134}
          height={45}
        />
        <div className="mt-[32px] bg-[#384ADC] text-[#fff] w-[134px] h-[45px] rounded-lg flex justify-center items-center cursor-pointer">
          Thêm mới
        </div>
      </div>
    </div>
  );

  const content1 = (
    <div className="flex flex-col w-full">
      <div className="flex justify-between w-full items-center mb-[8px]">
        <div className="text-medium font-medium mb-[4px]">Giá nhập</div>
        <Input
          width={154}
          className="rounded-lg"
          placeholder="Nhập"
          suffix={<p className="text-medium font-normal text-[#DADADD]">đ</p>}
        />
      </div>
      <div className="flex justify-between w-full items-center mb-[8px]">
        <div className="text-medium font-medium mb-[4px]">Giá bán</div>
        <Input
          width={154}
          className="rounded-lg"
          placeholder="Nhập"
          suffix={<p className="text-medium font-normal text-[#DADADD]">đ</p>}
        />
      </div>
      <div className="flex justify-between w-full items-center ">
        <div className="text-medium font-medium mb-[4px]">Trọng lượng SP</div>
        <Input
          width={154}
          className="rounded-lg"
          placeholder="Nhập"
          suffix={<p className="text-medium font-normal text-[#DADADD]">kg</p>}
        />
      </div>
      <div className="mt-[16px] bg-[#384ADC] text-[#fff] w-[297px] h-[39px] rounded-lg flex justify-center items-center cursor-pointer">
        Đồng bộ
      </div>
    </div>
  );

  const content2 = (
    <div className="flex flex-col w-full">
      <div className="text-medium font-medium mb-[8px]">Chọn kho chuyển</div>
      <Select
        className="rounded-lg mb-[8px]
        mb-[8px]"
        defaultValue={tags[0]}
        options={tags}
      />
      <div className="text-medium font-medium mb-[8px]">Chọn kho nhập</div>
      <Select
        className="rounded-lg mb-[8px]
        mb-[8px]"
        defaultValue={tags[0]}
        options={tags}
      />
      <div className="mt-[16px] bg-[#384ADC] text-[#fff] w-full h-[39px] rounded-lg flex justify-center items-center cursor-pointer">
        Đồng bộ
      </div>
    </div>
  );

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

  const data2 = [
    {
      show: true,
      sku: '555501S',
      inputNum: 55.0,
      saleNum: 150.0,
      type: 'Trắng - S',
      weight: 1,
      negative: true,
    },
  ];
  const columns: ColumnsType<ProductAttributeProps> = [
    {
      title: 'Thuộc tính',
      width: 148,
      dataIndex: 'attribute',
      align: 'center',
      render: (_, record) => (
        <div className="flex justify-left w-48">
          <div
            className="mr-[20px] cursor-pointer"
            onClick={() => handleDeleteProduct(record.id)}
          >
            <Icon icon="cancel" size={24} />
          </div>
          <span className="text-sm text-[#4B4B59] font-medium pd-[9px]">
            {record.attribute}
          </span>
        </div>
      ),
    },
    {
      title: 'Kiểu thuộc tính',
      width: 551,
      dataIndex: 'typeAttribute',
      align: 'left',
      render: (_, record) => (
        <span className="w-full flex items-center justify-between text-sm text-[#4B4B59] font-medium pd-[9px]">
          <span className="w-11/12">
            <Select
              mode="multiple"
              showArrow
              defaultValue={['TRẮNG', 'ĐEN']}
              style={{ width: '100%' }}
              options={record.typeAttribute}
            />
          </span>
          <Popover
            placement="bottomRight"
            content={content}
            title="Thêm kiểu thuộc tính mới"
            trigger="click"
            overlayStyle={{
              width: '309px',
            }}
          >
            <Button width={24} height={24} className="p-0">
              <Icon icon="add-square-1" size={24} />
            </Button>
          </Popover>
        </span>
      ),
    },
  ];

  const columns2: ColumnsType<ProductDetailProps> = [
    {
      title: 'Hiện',
      width: 82,
      key: 'id',
      dataIndex: 'show',
      fixed: 'left',
      align: 'center',
      render: (_, record) => {
        return (
          <Switch
            checked={true}
            className="button-switch"
            defaultChecked={
              record.show ? (record.show === 1 ? true : false) : false
            }
            onChange={() => console.log('check')}
          />
        );
      },
    },
    {
      title: 'Mã SKU',
      width: 145,
      dataIndex: 'sku',
      align: 'center',
      render: (_, record) => {
        return (
          <div className="text-medium font-medium text-[#4B4B59]">
            {record.sku}
          </div>
        );
      },
    },
    {
      title: 'Giá nhập',
      width: 145,
      dataIndex: 'sku',
      align: 'center',
      render: (_, record) => {
        return (
          <div
            className="flex justify-between items-center px-[12px] py-[7px] rounded-lg"
            style={{ border: '1px solid #DADADD' }}
          >
            <div className="text-medium font-medium text-[#4B4B59]">
              {record.inputNum}
            </div>
            <span>đ</span>
          </div>
        );
      },
    },
    {
      title: 'Giá bán',
      width: 145,
      dataIndex: 'sku',
      align: 'center',
      render: (_, record) => {
        return (
          <div
            className="flex justify-between items-center px-[12px] py-[7px] rounded-lg"
            style={{ border: '1px solid #DADADD' }}
          >
            <div className="text-medium font-medium text-[#4B4B59]">
              {record.saleNum}
            </div>
            <span>đ</span>
          </div>
        );
      },
    },
    {
      title: 'Mẫu mã',
      width: 500,
      dataIndex: 'sku',
      align: 'center',
      render: (_, record) => {
        return (
          <div
            className="flex justify-center items-center px-[12px] py-[7px] rounded-lg"
            style={{ border: '1px solid #DADADD' }}
          >
            <div className="text-medium font-medium text-[#4B4B59]">
              {record.type}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Trọng lượng SP',
      width: 180,
      dataIndex: 'weight',
      align: 'center',
      render: (_, record) => {
        return (
          <div
            className="flex items-center justify-between px-[12px] py-[7px] rounded-lg"
            style={{ border: '1px solid #DADADD' }}
          >
            <div className="text-medium font-medium text-[#4B4B59]">
              {record.weight}
            </div>
            <span>kg</span>
          </div>
        );
      },
    },
    {
      title: 'Bán âm',
      width: 80,
      dataIndex: 'negative',
      align: 'center',
      render: (_, record) => {
        return <Checkbox />;
      },
    },
    {
      title: '',
      width: 20,
      align: 'center',
      render: (_, record) => {
        return (
          <div className="cursor-pointer">
            <Icon icon="cancel" size={24} />
          </div>
        );
      },
    },
  ];

  const checkboxSettings = [
    {
      label: 'Tại quầy',
      value: 'Tại quầy',
    },
    {
      label: 'Online',
      value: 'Online',
    },
    {
      label: 'App',
      value: 'App',
    },
  ];
  // const checkboxSettings: {
  //   label: string;
  //   value: string;
  // }[] = [
  //   {
  //     label: 'Tại quầy',
  //     value: 'Tại quầy',
  //   },
  //   {
  //     label: 'Online',
  //     value: 'Online',
  //   },
  //   {
  //     label: 'App',
  //     value: 'App',
  //   },
  // ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between mb-5">
        <TitlePage
          href="/warehouse/export-commands"
          title={detail ? 'Chi tiết sản phẩm' : 'Tạo sản phẩm'}
        />
        <div className="flex gap-x-2">
          <Button
            variant="danger-outlined"
            width={153}
            icon={<Icon icon="trash" size={24} color="#EF4444" />}
            onClick={() => setIsShowModalConfirm(true)}
          >
            Xoá sản phẩm
          </Button>
          <Button
            variant="secondary"
            width={148}
            style={{ fontWeight: 'bold' }}
          >
            LƯU (F12)
          </Button>
        </div>
      </div>
      {/* Info */}

      <div className="flex gap-x-3">
        <div
          className="flex flex-col justify-between gap-[4px]"
          style={{ minWidth: 516 }}
        >
          <div className="w-full bg-white rounded p-3">
            <div className={styles.row}>
              <div className="text-medium font-medium">Mã sản phẩm *</div>
              <Input
                width={285}
                placeholder="Nhập mã sản phẩm"
                value={detail?.id}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Tên sản phẩm *</div>
              <Input
                width={285}
                placeholder="Nhập tên sản phẩm"
                value={detail?.name}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Danh mục *</div>
              <Select
                width={285}
                placeholder="Chọn danh mục sản phẩm"
                options={productTypeList}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Ngày sản xuất</div>
              <DatePicker
                width={285}
                placeholder="ngày/tháng/năm"
                // value={detail?.createdAt}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Ngày hết hạn</div>
              <DatePicker
                width={285}
                placeholder="ngày/tháng/năm"
                // value={detail?.expireDate}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Kho thao tác</div>
              <Select
                style={{ width: 285 }}
                mode="multiple"
                showArrow
                tagRender={tagRender}
                options={tags}
                maxTagCount="responsive"
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium mb-[30px]">Kênh bán</div>
              <div style={{ width: 285 }}>
                <CheckboxList
                  options={checkboxSettings}
                  onChange={() => handleChange(checkboxSettings.value)}
                />
                <div className="flex items-center gap-[5px] ml-[25px] mt-[15px]">
                  <Switch />
                  <span>Đồng giá trên tất cả kênh bán</span>
                </div>
              </div>
            </div>
            <div className="mb-[16px]">
              <div className="text-medium font-medium mb-[12px]">
                Hình ảnh sản phẩm
              </div>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={() => console.log('check')}
              />
            </div>
            <div className="mb-[16px]">
              <div className="text-medium font-medium mb-[12px]">
                Mô tả/Nội dung
              </div>
              <TextArea placeholder="Nhập nội dung" />
            </div>
          </div>
          <div className="w-full bg-white rounded p-3">
            <div className="flex justify-start mb-[24px]">
              <Switch />
              <span className="ml-[8px] text-medium font-medium">
                Tính tiền theo cân nặng
              </span>
            </div>
            <div className={styles.row}>
              <div>
                <Checkbox className="text-medium font-medium">
                  Thông báo khi hết hàng
                </Checkbox>
              </div>
              <Input width={285} placeholder="Số lượng: Nhập" />
            </div>
            <div className={styles.row}>
              <Checkbox className="text-medium font-medium">
                Bán âm (vẫn bán khi hết hàng)
              </Checkbox>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-[4px] w-[795px]">
          <div className="w-full flex gap-[16px] bg-white rounded p-3 mb-[12px]">
            <div className="w-1/2">
              <div className="mb-[16px]">
                <div className="text-medium font-medium mb-[4px]">
                  Thời điểm tạo
                </div>
                <div className="text-medium font-medium">
                  {detail?.createAt ? detail?.createAt : '20/09/2022'}
                </div>
              </div>
              <Input label="Nguồn hàng" placeholder="nhập" />
            </div>
            <div className="w-1/2">
              <TextArea
                label="Ghi chú"
                placeholder="Nhập nội dung"
                className="!h-[110px]"
              />
            </div>
          </div>
          <div className="p-[12px] bg-white rounded h-[554px]">
            <div className={styles.row}>
              <div className="text-[#384ADC] font-semibold text-medium">
                Danh sách thuộc tính
              </div>
              <div className="w-1/2 flex justify-end items-center">
                <div className="text-medium font-medium mr-[24px]">
                  Thêm thuộc tính
                </div>
                <Select
                  style={{ width: 175 }}
                  placeholder="Chọn"
                  options={productAttributes}
                />
              </div>
            </div>
            <Table
              columns={columns}
              rowSelection={rowSelection}
              dataSource={
                typeAttributeList.length ? [...typeAttributeList] : []
              }
            />
          </div>
          <div className="w-full flex justify-end mt-[16px]">
            <Button
              variant="secondary"
              text="Tạo mẫu mã"
              width={155}
              height={44}
            />
          </div>
        </div>
      </div>
      {/* Filter */}
      <div className="flex gap-x-2 mt-4 mb-3 w-[795px]">
        <Popover
          placement="bottomRight"
          content={content1}
          trigger="click"
          overlayStyle={{ width: '354px' }}
          className="relative"
        >
          <Button width={195} height={45} className="p-0">
            <div className="w-[200px] flex justify-between p-[10px] items-center">
              <div className="flex justify-left">
                <Icon icon="repeat" size={24} className="mr-[10px]" />
                Đồng bộ
              </div>
              <Icon icon="arrow-down-1" size={14} />
            </div>
          </Button>
        </Popover>
        <Popover
          placement="bottomRight"
          content={content2}
          trigger="click"
          overlayStyle={{ width: '354px' }}
          className="relative"
        >
          <Button width={195} height={45} className="p-0">
            <div className="w-[200px] flex justify-between p-[10px] items-center">
              <div className="flex justify-left">
                <Icon icon="arrow-swap" size={24} className="mr-[10px]" />
                Chuyển kho nhanh
              </div>
              <Icon icon="arrow-down-1" size={14} />
            </div>
          </Button>
        </Popover>
        <Button
          variant="outlined"
          text="Thêm sản phẩm mặc định"
          icon={<Icon icon="add-1" size={24} />}
        ></Button>
      </div>
      <div className="w-full">
        <Table
          // rowKey={(record)⇒ record.sku}
          rowSelection={rowSelection}
          columns={columns2}
          dataSource={data2}
          pagination={false}
        />
      </div>
      <div className="w-full flex justify-left mt-[20px] items-center">
        <div className="mr-[14px]">
          <Icon icon="add-1" color="#384ADC" size={24} />
        </div>
        <p className="text-medium text-[#384ADC] font-medium">Thêm mới</p>
      </div>
      <ModalConfirm
        titleBody="Xoá thông tin khách hàng?"
        content={
          <div className="text-center">
            Mọi dữ liệu của sản phẩm này <br />
            sẽ bị xoá khỏi hệ thống
          </div>
        }
        onOpen={handleConfirmDelete}
        onClose={() => setIsShowModalConfirm(false)}
        isVisible={isShowModalConfirm}
      />
    </div>
  );
};

export default ProductForms;

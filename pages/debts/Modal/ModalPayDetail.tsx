import Select from '../../../components/Select/Select';
import Input from '../../../components/Input/Input';
import TextArea from '../../../components/TextArea';
import React, { useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../../components/Button/Button';
import { StatusColorEnum, StatusEnum, StatusList } from '../../../types';
import Modal from '../../../components/Modal/Modal/Modal';
import { Radio } from 'antd';
import DatePicker from '../../../components/DatePicker/DatePicker';
import Icon from '../../../components/Icon/Icon';
import Upload from '../../../components/Upload/Upload';
import {UploadProps} from '../../../components/Upload/Upload'
interface ModalPayDetailProps {
  isVisible: boolean;
  isEdit: boolean;
  title?: string;
  iconClose?: ReactNode;
  onClose?: (event?: any) => void;
  onOpen?: (event?: any) => void;
  content?: string | ReactNode;
  titleBody?: string;
  time?: string;
  deal?: string;
  method?: string;
  status?: StatusEnum;
  id?: string;
}

const ModalPayDetail = (props: ModalPayDetailProps) => {
  const {
    isVisible,
    isEdit,
    title,
    iconClose = 'Đóng',
    onClose,
    onOpen,
    content,
    titleBody,
    time,
    deal,
    method,
    status,
    id,
  } = props;

  // const [fileList, setFileList] = useState(images);

  // const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   onChange;
  // };

  const pay = {
    deal: 'Tiền điện tháng 9',
    code: 'C001',
    type: 'Phiếu chi',
    date: '16:36 - 21/09/2022',
    name: [
      {
        label: 'Nguyễn Văn A',
        value: 'Nguyễn Văn A',
      },
      {
        label: 'Nguyễn Văn B',
        value: 'Nguyễn Văn B',
      },
    ],
    store: [
      {
        label: 'Tổng kho Linh Dương',
        value: 'Tổng kho Linh Dương',
      },
      {
        label: 'Tổng kho Linh Dương2',
        value: 'Tổng kho Linh Dương2',
      },
    ],
    receiver: 'Anh Ước',
    phone: '0922.562.888',
    money: '150.000',
    method: [
      {
        label: 'Chuyển khoản',
        value: 'Chuyển khoản',
      },
      {
        label: 'Chuyển khoản1',
        value: 'Chuyển khoản1',
      },
    ],
    status: 'Chờ duyệt',
  };

  return (
    <Modal
      isCenterModal
      title={'Chi tiết hoá đơn thu chi'}
      isVisible={isVisible}
      onClose={onClose}
      onOpen={onOpen}
      iconClose={iconClose}
      width={658}
      footer={false}
      className="p-[16px] modal-pay-detail"
    >
      <div>
        <div className="w-full">
          <div className="w-full flex flex-col p-[12px] bg-white rounded-lg">
            <div className="flex justify-between mb-[12px] items-center mb-[24px]">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Tên Giao dịch
              </p>
              {isEdit ? (
                <Input width={420} placeholder="Nhập nội dung" />
              ) : (
                <Input width={420} value={pay.deal} />
              )}
            </div>
            <div className="flex justify-between mb-[12px] items-center mb-[24px]">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Mã giao dịch
              </p>
              {isEdit ? (
                <div className="w-[420px] flex justify-end">--</div>
              ) : (
                <div className="w-[420px] text-medium font-medium">
                  {pay.code}
                </div>
              )}
            </div>
            <div className="flex justify-between mb-[12px] items-center mb-[24px]">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Loại hoá đơn
              </p>
              <Radio.Group className="w-[420px]">
                <div className="mr-[95px]">
                  <Radio
                    value="Phiếu thu"
                    onClick={() => (isEdit ? true : false)}
                    className="text-[#384ADC] text-medium font-semibold"
                  >
                    Phiếu thu
                  </Radio>
                </div>
                <Radio
                  value="Phiếu chi"
                  onClick={() => (isEdit ? true : false)}
                  className="text-[#EF4444] text-medium font-semibold"
                >
                  Phiếu chi
                </Radio>
              </Radio.Group>
            </div>
            <div className="flex justify-start mb-[12px] items-center mb-[24px]">
              <p className="text-medium font-medium text-[#2E2D3D] mr-[90px]">
                Ngày tạo
              </p>
              {isEdit ? (
                <DatePicker width={420} />
              ) : (
                <div className="w-[150px] text-medium font-medium">
                  {pay.date}
                </div>
              )}
            </div>
            <div className="flex justify-between mb-[12px] items-center mb-[24px] items-center">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Nhân viên xử lý
              </p>
              {isEdit ? (
                <Select width={420} placeholder="--" options={pay.name} />
              ) : (
                // <div className="w-[440px] flex justify-between  p-[10px] items-center">
                //   Nguyễn Văn A
                //   <Icon icon="arrow-down-1" size={14} />
                // </div>
                <Select width={420} value={pay.name[0]} />
              )}
            </div>
            <div className="flex justify-between mb-[12px] items-center mb-[24px] items-center">
              <p className="text-medium font-medium text-[#2E2D3D]">Chọn kho</p>
              {isEdit ? (
                <Select width={420} placeholder="--" options={pay.store} />
              ) : (
                <Select width={420} value={pay.store[0]} />
              )}
            </div>
          </div>
          <div className="mt-[12px] flex flex-col w-full bg-white rounded-lg p-[12px]">
            <div className="flex justify-between mb-[12px] items-center mb-[24px]">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Người nhận
              </p>
              {isEdit ? (
                <Input width={420} placeholder="Nhập họ tên" />
              ) : (
                <Input width={420} value={pay.receiver} />
              )}
            </div>
            <div className="flex justify-between mb-[12px] items-center mb-[24px]">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Số điện thoại
              </p>
              {isEdit ? (
                <Input width={420} placeholder="Nhập SĐT" />
              ) : (
                <Input width={420} value={pay.phone} />
              )}
            </div>
            <div className="flex justify-between mb-[12px] items-center mb-[24px]">
              <p className="text-medium font-medium text-[#2E2D3D]">Số tiền</p>
              {isEdit ? (
                <Input width={420} placeholder="Nhập giá trị" suffix="đ" />
              ) : (
                <Input width={420} value={pay.money} suffix="đ" />
              )}
            </div>
            <div className="flex justify-between mb-[12px] items-center mb-[24px] items-center">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Hình thức
              </p>
              {isEdit ? (
                <Select width={420} defaultValue="Chọn" options={pay.method} />
              ) : (
                <Select width={420} value={pay.method[0]} />
              )}
            </div>
          </div>
          <div className="mt-[12px] w-full flex flex-col bg-white p-[12px] rounded-lg">
            <div className="w-full flex flex-col p-[12px]">
              <div className="flex w-full">
                <div className="text-medium font-medium w-[60%] mr-[12px] ">
                  <p className="mb-[8px]">Ghi chú</p>
                  <TextArea
                    className="bg-slate-100 !h-[104px]"
                    placeholder="Nhập ghi chú"
                  />
                </div>
                <div className="mb-[16px] w-[250px]">
                  {isEdit ? (
                    <div className="flex justify-between w-full">
                      <div className="text-medium font-medium mb-[12px]">
                        Hình ảnh
                      </div>
                      <div className='w-[100px] flex cursor-pointer'>
                        <Icon icon="add-1" size={24} color="#384ADC" />
                        <p className="ml-[8px] font-medium text-medium text-[#384ADC]">
                          Thêm mới
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-medium font-medium mb-[12px]">
                      Hình ảnh
                    </div>
                  )}

                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={[]}
                    onChange={() => console.log('check')}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white mt-[12px] rounded-lg p-[12px]">
            <div className="flex justify-between items-center">
              <p className="text-medium font-medium text-[#2E2D3D]">
                Trạng thái
              </p>
              <Radio.Group className="w-[440px]">
                <div className="mr-[60px] text-medium font-medium">
                  <Radio
                    value="Chờ duyệt"
                    onClick={() => (isEdit ? true : false)}
                  >
                    Chờ duyệt
                  </Radio>
                </div>
                <div className="mr-[60px] text-medium font-medium">
                  <Radio
                    value="Đã duyệt"
                    onClick={() => (isEdit ? true : false)}
                  >
                    Đã duyệt
                  </Radio>
                </div>
                <Radio
                  className="text-medium font-medium"
                  value="Đã nhận"
                  onClick={() => (isEdit ? true : false)}
                >
                  Đã nhận
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="w-full flex justify-between mt-[32px]">
            <Button variant="outlined" width={190} height={44} text="HUỶ BỎ" />
            <Button
              variant="outlined"
              width={190}
              icon={<Icon icon="printer" size={24} />}
            >
              IN (Enter)
            </Button>
            <Button
              variant="secondary"
              width={190}
              height={44}
              text="LƯU (F12)"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPayDetail;

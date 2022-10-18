import { Checkbox } from 'antd';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../components/Button/Button';
import DatePicker from '../../components/DatePicker/DatePicker';
import Icon from '../../components/Icon/Icon';
import Select from '../../components/Select/Select';
import TitlePage from '../../components/TitlePage/Titlepage';
import { listDayCompare } from '../../const/constant';
import classNames from 'classnames';

import styles from '../../styles/Report.module.css';
import ReportPieChart from './ReportChart/PieChart/ReportPieChart';
import LineChart from './ReportChart/LineChart/ReportLineChart';

const ReportIncome = () => {
  const [isCompare, setIsCompare] = useState(false);

  const data = [
    { name: 'Tại quầy', value: 653326000 },
    { name: 'Onine', value: 225549000 },
    { name: 'Trên app', value: 136500000 },
  ];

  const warehouseData = [
    {
      label: 'Tổng kho Linh Dương',
      value: 'Tổng kho Linh Dương',
      totalPrice: '21.000.000 đ',
    },
    {
      label: 'Cửa hàng LD Mart',
      value: 'Cửa hàng LD Mart',
      totalPrice: '21.000.000 đ',
    },
    {
      label: 'Siêu thị tiện ích LD',
      value: 'Siêu thị tiện ích LD',
      totalPrice: '21.000.000 đ',
    },
  ];

  const dataLineChart = [
    {
      name: '28',
      a: 700,
      b: 600,
      c: 500,
    },
    {
      name: '29',
      a: 1000,
      b: 600,
      c: 500,
    },
    {
      name: '28',
      a: 900,
      b: 600,
      c: 400,
    },
    {
      name: '30',
      a: 700,
      b: 600,
      c: 500,
    },
    {
      name: '01',
      a: 300,
      b: 500,
      c: 500,
    },
    {
      name: '02',
      a: 700,
      b: 900,
      c: 500,
    },
    {
      name: '03',
      a: 1000,
      b: 600,
      c: 500,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Báo cáo doanh thu" />
        <div className="flex items-center gap-[24px]">
          <Button
            variant="outlined"
            width={109}
            icon={<Icon icon="export" size={24} />}
          >
            Xuất file
          </Button>
          <div className="flex items-center">
            <div className="text-medium font-semibold mr-[8px]">
              Hiển thị theo thời gian
            </div>
            <DatePicker width={306} />
          </div>
          <div className="flex items-center gap-[8px]">
            <Checkbox
              onChange={() => setIsCompare(!isCompare)}
              className="font-semibold text-medium text-[#0F172A] opacity-50"
            >
              So sánh với
            </Checkbox>
            <Select
              defaultValue={listDayCompare[0]}
              style={{ width: 235 }}
              options={listDayCompare}
              disabled={!isCompare}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-[12px] mb-[12px]">
        <div className="w-1/2 gap-[12px] flex flex-col">
          <div className={classNames(styles.div_container, 'h-1/2')}>
            <div className={styles.row}>
              <div className="text-big text-[#384ADC] font-semibold">
                Tổng doanh thu
              </div>
              <div className={classNames(styles.row, 'w-1/2 gap-[24px]')}>
                <div className="text-[#384ADC] text-2xl font-bold">
                  1.521.000.000 đ
                </div>
                <div className="flex items-center">
                  <Icon icon="up" color="#10B981" />
                  <div className={classNames(styles.percent, styles.increase)}>
                    13.5%
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className="font-semibold">Lợi nhuận</div>
              <div className={classNames(styles.row, 'w-1/2 gap-[24px]')}>
                <div className="text-[#10B981] text-2xl font-bold">
                  1.513.000.000 đ
                </div>
                <div className="flex items-center">
                  <Icon icon="down" color="#EF4444" />
                  <div className={classNames(styles.percent, styles.reduce)}>
                    13.5%
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className="font-semibold">Tiền khuyến mãi</div>
              <div className={classNames(styles.row, 'w-1/2 gap-[24px]')}>
                <div className="text-[#F97316] text-big font-bold">
                  93.000.000 đ
                </div>
                <div className="flex items-center">
                  <Icon icon="down" color="#EF4444" />
                  <div className={classNames(styles.percent, styles.reduce)}>
                    13.5%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classNames(styles.div_container, 'h-1/2')}>
            <div className={styles.row}>
              <div className="text-big text-[#384ADC] font-semibold">
                Phương thức thanh toán
              </div>
              <Icon icon="export" />
            </div>
            <div className={styles.row}>
              <div className="font-semibold">Lợi nhuận</div>
              <div className="font-semibold text-base">1.513.000.000 đ</div>
              {/* <div className="flex items-center">
                  <span className="cursor-pointer">
                    <Icon icon="down" color="#EF4444" />
                  </span>
                  <div className={classNames(styles.percent, styles.reduce)}>
                    13.5%
                  </div>
                </div> */}
            </div>
            <div className={styles.row}>
              <div className="font-semibold">Tiền khuyến mãi</div>
              <div className="font-semibold text-base">93.000.000 đ</div>
            </div>
          </div>
        </div>
        <ReportPieChart title="Doanh thu theo kênh bán" data={data} />
      </div>
      <div className={classNames(styles.div_container, 'mb-[12px]')}>
        <div className={styles.row}>
          <div className="text-big text-[#384ADC] font-semibold">
            Doanh thu theo đơn hàng
          </div>
          <span className="cursor-pointer">
            <Icon icon="export" />
          </span>
        </div>
        <div className="flex gap-[16px] justify-between">
          <div
            className={classNames(styles.total_wrapper, styles.green, 'w-1/3')}
          >
            <Icon icon="checked-approved" size={36} />
            <div className="text-big font-semibold text-[#10B981] text-center">
              TỔNG GIÁ TRỊ CÁC ĐƠN HÀNG <br />
              THÀNH CÔNG
            </div>
            <div className="font-bold text-big">637.473.415 đ</div>
          </div>
          <div
            className={classNames(styles.total_wrapper, styles.orange, 'w-1/3')}
          >
            <Icon icon="back-square" size={36} />
            <div className="text-big font-semibold text-[#F97316] text-center">
              TỔNG GIÁ TRỊ CỦA CÁC ĐƠN <br />
              CHUYỂN HOÀN
            </div>
            <div className="font-bold text-big">637.473.415 đ</div>
          </div>
          <div
            className={classNames(styles.total_wrapper, styles.red, 'w-1/3')}
          >
            <Icon icon="close-circle-1" size={36} />
            <div className="text-big font-semibold text-[#EF4444] text-center">
              TỔNG GIÁ TRỊ CỦA CÁC ĐƠN <br />
              ĐÃ HUỶ
            </div>
            <div className="font-bold text-big">637.473.415 đ</div>
          </div>
        </div>
      </div>
      <LineChart
        title="Doanh thu theo kho"
        dataLineChart={dataLineChart}
        data={warehouseData}
        unit="triệu đồng"
      />
    </div>
  );
};

export default ReportIncome;
// ReactDOM.render(<ReportIncome />, document.getElementById("root"));

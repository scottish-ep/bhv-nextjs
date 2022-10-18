import React from 'react';
import classNames from 'classnames';

import styles from '../../../../styles/Report.module.css';
import Icon from '../../../../components/Icon/Icon';
import PieChart from '../../../../components/Chart/PieChart';
import TitlePage from '../../../../components/TitlePage/Titlepage';
import Select from '../../../../components/Select/Select';
import LineChart from '../../../../components/Chart/LineChart';

interface LineChartProps {
  data: any[];
  dataLineChart: any[];
  title?: string;
  statusOrder?: any[];
  unit?: string;
}

const ReportLineChart = (props: LineChartProps) => {
  const { title, data, dataLineChart, statusOrder, unit, ...rest } = props;

  const renderWareHouse = (data: any[]) => {
    return data.map((item, index) => {
      return (
        <div
          className={classNames(styles.total_wrapper, styles.gray)}
          style={{ width: 205 }}
          key={index}
        >
          <span className='w-[52px] h-[3px] bg-slate-400'></span>
          <div className="font-semibold">{item.label}</div>
          <div className="flex items-center gap-[12px]">
            <div className="font-semibold">{item.totalPrice}</div>
            <div className="flex items-center">
              <Icon icon="up" color="#10B981" />
              <div
                className={classNames(
                  styles.percent,
                  styles.increase,
                  'ml-[4px]'
                )}
              >
                13.5%
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.div_container}>
      <div className="flex items-center justify-between mb-[24px] flex-wrap">
        <div className="text-[#384ADC] font-semibold text-big">{title}</div>
        <div className="flex items-center gap-[24px]">
          <div className="flex items-center">
            <div className="mr-[12px] font-medium">Chọn kho</div>
            <Select options={data} defaultValue={data[0]} style={{ width: 248 }} />
          </div>
          {statusOrder && (
            <div className="flex items-center">
              <div className="mr-[12px] font-medium">Trạng thái đơn hàng</div>
              <Select options={statusOrder} style={{ width: 248 }} />
            </div>
          )}
          <span className="cursor-pointer">
            <Icon icon="export" />
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-[20px] mb-[24px]">
        {renderWareHouse(data)}
      </div>
      <LineChart data={dataLineChart} width="100%" />
      <div className="flex justify-end text-medium font-medium text-[#909098] opacity-50 w-[1300px]">
        Đơn vị: {unit}
      </div>
    </div>
  );
};

export default ReportLineChart;

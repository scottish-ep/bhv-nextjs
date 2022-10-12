import Select from "../../../components/Select/Select";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/Textarea/Textarea";
import React, { useEffect, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import Button from "../../../components/Button/Button"
import { StatusColorEnum, StatusEnum, StatusList } from "../../../types";
import Modal from "../../../components/Modal/Modal/Modal";
import { Table } from "antd";
import Icon from "../../../components/Icon/Icon";
import { ColumnsType } from "antd/es/table";
import { listDebtDetail } from "../../../const/constant";

interface ModalAddDebtProps {
  isVisible: boolean;
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

const ModalAddDebt = (props: ModalAddDebtProps) => {
    const {isVisible, title, iconClose= "Đóng", onClose, onOpen, content, titleBody, time, deal, method, status, id} = props;

		const [listDebt, setListDebt] = useState<ModalAddDebtProps[]>([
			...listDebtDetail,
		]);

		const employeeList = [
			{
				label: "Nguyễn Văn A",
				value: "Nguyễn Văn A"
			},
			{
				label: "Nguyễn Văn B",
				value: "Nguyễn Văn B"
			},
		]

		const columns: ColumnsType<ModalAddDebtProps> = [
			{
				title: "Thời gian",
				width: 150,
				dataIndex: "time",
				key: "dataIndex",
				fixed: "left",
				align: "center",
				render: (_, record) => (
					<span className="text-medium text-[#2E2D3D] font-medium">
						{record.time}
					</span>
				),
			},
			{
				title: "Giao dịch",
				width: 110,
				dataIndex: "deal",
				key: "dataIndex",
				align: "left",
				render: (_, record) => (
					<span className="text-medium text-[#2E2D3D] font-medium">
						{record.deal}
					</span>
				),
			},
			{
				title: "Hình thức",
				width: 136,
				dataIndex: "method",
				key: "dataIndex",
				align: "center",
				render: (_, record) => (
					<span className="text-medium text-[#2E2D3D] font-medium">
						{record.method}
					</span>
				),
			},
			{
				title: "Nội dung",
				width: 250,
				dataIndex: "content",
				key: "dataIndex",
				align: "left",
				render: (_, record) => (
					<span className="text-medium text-[#2E2D3D] font-medium">
						{record.content}
					</span>
				),
			},
			{
				title: "Trạng thái",
				width: 136,
				dataIndex: "status",
				key: "dataIndex",
				align: "left",
				render: (_, record) => (
					<span className={`font-semibold text-[${StatusColorEnum[record.status]}]`}>
						{StatusList.find((status) => status.value === record.status)?.name}
					</span>
				),
			},
		]

    return (
			<Modal
					isCenterModal
					title={title}
					isVisible={isVisible}
					onClose={onClose}
					onOpen={onOpen}
					iconClose={iconClose}
					width={836}
					footer={false}
					className="p-[16px] "
				>
        <div>
					<div className="w-full">
						<Input
							className="flex-1"
							prefix={<Icon icon="search" color="#FF970D" size={24} />}
							placeholder="Tìm ID / Tên, mã KH / Số điện thoại"
						/>
					</div>
					<div className="w-full flex justify-between">
						<div className="w-[48%] flex flex-col p-[12px]">
							<div className="flex justify-between mb-[16px]">
								<p className="text-medium font-medium text-[#2E2D3D]">Mã công nợ</p>
								<p className="text-medium font-medium text-[#2E2D3D]">BHV0021</p>
							</div>
							<div className="flex justify-between mb-[16px]">
								<p className="text-medium font-medium text-[#2E2D3D]">Mã công nợ</p>
								<p className="text-medium font-medium text-[#2E2D3D]">BHV0021</p>
							</div>
							<div className="mb-[16px]">
								<p className="text-medium font-medium text-[#2E2D3D] mb-[8px]">Mã công nợ</p>
								<Select 
									className="w-[100%]"
									placeholder="Nguyễn Văn A"
									options = {employeeList}
								/>
							</div>
						</div>
						<div className="w-[48%] flex flex-col p-[12px]">
							<div className="flex justify-between mb-[16px]">
								<p className="text-medium font-medium text-[#2E2D3D]">Họ và tên khách hàng</p>
								<p className="text-medium font-medium text-[#2E2D3D]">--</p>
							</div>
							<div className="flex justify-between mb-[16px]">
								<p className="text-medium font-medium text-[#2E2D3D]">Mã KH</p>
								<p className="text-medium font-medium text-[#2E2D3D]">--</p>
							</div>
							<div className="mb-[16px] flex justify-between">
								<p className="text-medium font-medium text-[#2E2D3D]">Số điện thoại</p>
								<p className="text-medium font-medium text-[#2E2D3D]">--</p>
							</div>
							<div className="mb-[16px] flex justify-between">
								<p className="text-medium font-medium text-[#2E2D3D]">Tiền công nợ hiện tại</p>
								<p className="text-medium font-medium text-[#2E2D3D]">0 đ</p>
							</div>
						</div>
					</div>
					<div className="w-full">
						<Table columns={columns} dataSource={listDebt}/>
					</div>
					<div className="mb-[24px] w-[409px] flex justify-between items-center">
						<p className="mr-[24px] text-medium font-medium text-[#2E2D3D]">Số tiền công nợ</p>
						<Input width={267} placeholder="0 đ"/>
					</div>
					<div className="flex w-full">
						<div className="text-medium font-medium w-[60%] mr-[12px] mb-[8px]">
								<p className="mb-[8px]">Ghi chú</p>
								<TextArea className="bg-slate-100 !h-[104px]" placeholder="Công nợ theo đơn hoàn"/>
						</div>
						<p className="text-meium font-medium w-[30%] mb-[8px]">Hình ảnh</p>
					</div>
					<div className="w-full flex justify-end mt-[32px]">
						<Button variant="outlined" className="mr-[12px]" width={246} height={44} text="HUỶ BỎ"/>
						<Button variant="secondary"  width={246} height={44} text="XÁC NHẬN"/>
					</div>
				</div>
				</Modal>
    )
}

export default ModalAddDebt;
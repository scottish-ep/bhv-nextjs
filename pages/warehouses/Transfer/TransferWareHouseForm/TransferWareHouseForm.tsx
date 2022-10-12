import { format } from "date-fns";
import React from "react";
import Button from "../../../../components/Button/Button";
import Icon from "../../../../components/Icon/Icon";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/Select/Select";
import TextArea from "../../../../components/TextArea";
import TitlePage from "../../../../components/TitlePage/Titlepage";
import { employeeProcess, warehouses } from "../../../../const/constant";
import { IWareHousesDetail } from "../../warehouse.type";
import TransferWareHouseFormTable from "./TransferWareHouseFormTable";

interface TransferWareHouseFormProps {
  detail?: IWareHousesDetail;
}

const TransferWareHouseForm: React.FC<TransferWareHouseFormProps> = ({
  detail,
}) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between mb-5">
        <TitlePage
          href="/warehouse/transfer-commands"
          title={detail ? "Chi tiết phiếu chuyển kho" : "Tạo phiếu chuyển kho"}
        />
        <div className="flex gap-x-2">
          <div className="flex items-center">
            <div className="font-medium mr-[12px] text-medium">Trạng thái</div>
            <Select
              placeholder="Chọn trạng thái"
              style={{ width: 162 }}
              options={warehouses}
            />
          </div>
          <Button
            variant="outlined"
            width={121}
            icon={<Icon icon="printer" size={24} />}
          >
            IN (Enter)
          </Button>
          <Button
            variant="secondary"
            width={148}
            style={{ fontWeight: "bold" }}
          >
            LƯU (F12)
          </Button>
        </div>
      </div>
      {/* Info */}
      <div className="flex gap-x-3">
        <div className="flex flex-col justify-between gap-y-4 bg-white flex-1 p-3 rounded">
          <div className="flex items-center justify-between">
            <span className="text-medium font-medium text-[#2E2D3D]">
              Mã chuyển kho:
            </span>
            <span className="text-medium font-medium text-[#2E2D3D]">
              {detail?.export_code || "-"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-medium font-medium text-[#2E2D3D]">
              Thời điểm tạo:
            </span>
            <span className="text-medium font-medium text-[#2E2D3D]">
              {detail ? format(detail.createdAt, "dd/MM/yyyy") : "-"}
            </span>
          </div>
          <Select
            label="Nhân viên xử lý"
            placeholder="Chọn nhân viên xử lý"
            options={employeeProcess}
          />
          <TextArea
            label="Ghi chú"
            className="!h-[179px]"
            placeholder="Nhập ghi chú"
            defaultValue={detail?.note}
          />
        </div>
        <div className="flex flex-col justify-between gap-y-4 bg-white flex-1 p-3 rounded">
          <Select
            label="Chọn kho chuyển"
            placeholder="Chọn kho chuyển"
            options={warehouses}
          />
          <div className="flex flex-col justify-between gap-y-1 p-2 bg-[#F5F5F6] border border-[#DADADD] rounded h-[82px]">
            <div className="flex gap-x-3">
              <span className="text-[#1D1C2D] text-medium font-semibold">
                {detail?.export_name || "--"}
              </span>
              <span className="border border-[#DADADD]"></span>
              <span className="text-[#1D1C2D] text-medium font-semibold">
                {detail?.phone_number || "--"}
              </span>
            </div>
            <p className="text-[#4B4B59] text-medium">
              {detail?.export_address || "--"}
            </p>
          </div>
          <Select
            label="Chọn kho nhập"
            placeholder="Chọn kho nhập"
            options={warehouses}
          />
          <div className="flex flex-col justify-between gap-y-1 p-2 bg-[#F5F5F6] border border-[#DADADD] rounded h-[82px]">
            <div className="flex gap-x-3">
              <span className="text-[#1D1C2D] text-medium font-semibold">
                {detail?.export_name || "--"}
              </span>
              <span className="border border-[#DADADD]"></span>
              <span className="text-[#1D1C2D] text-medium font-semibold">
                {detail?.phone_number || "--"}
              </span>
            </div>
            <p className="text-[#4B4B59] text-medium">
              {detail?.export_address || "--"}
            </p>
          </div>
        </div>
      </div>
      {/* Filter */}
      <div className="flex gap-x-2 mt-4 mb-3">
        <Input
          className="flex-1"
          prefix={<Icon icon="search" color="#FF970D" size={24} />}
          placeholder="Nhập mã sản phẩm / tên sản phẩm"
        />
        <Button
          variant="neural_200"
          width={196}
          icon={<Icon icon="barcode" size={24} />}
        >
          Quét mã vạch (F1)
        </Button>
      </div>
      {/* Table */}
      <TransferWareHouseFormTable product_list={detail?.product_list} />
    </div>
  );
};

export default TransferWareHouseForm;

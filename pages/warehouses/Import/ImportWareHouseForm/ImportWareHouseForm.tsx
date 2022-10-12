import { format } from "date-fns";
import React from "react";
import Button from "../../../../components/Button/Button";
import Icon from "../../../../components/Icon/Icon";
import Input from "../../../../components/Input/Input";
import Select from "../../../../components/Select/Select";
import TextArea from "../../../../components/TextArea";
import TitlePage from "../../../../components/TitlePage/Titlepage";
import {
  employeeProcess,
  priceShippingList,
  shippingUnitList,
  supplierList,
  warehouses,
} from "../../../../const/constant";
import { IWareHousesDetail } from "../../warehouse.type";
import ImportWareHouseFormTable from "./ImportWareHouseFormTable";

interface ImportWareHouseFormProps {
  detail?: IWareHousesDetail;
}

const ImportWareHouseForm: React.FC<ImportWareHouseFormProps> = ({
  detail,
}) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between mb-5">
        <TitlePage
          href="/warehouse/import-commands"
          title={detail ? "Chi tiết phiếu nhập kho" : "Tạo phiếu nhập kho"}
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
              Mã nhập kho:
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
            className="!h-[112px]"
            placeholder="Nhập ghi chú"
            defaultValue={detail?.note}
          />
        </div>
        <div className="flex flex-col justify-between gap-y-4 bg-white flex-1 p-3 rounded">
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
          <div className="grid grid-cols-2 gap-x-3">
            <Select
              label="Đơn vị vận chuyển"
              placeholder="Chọn đơn vị vận chuyển"
              options={shippingUnitList}
            />
            <Select
              label="Phí vận chuyển"
              placeholder="Chọn phí vận chuyển"
              options={priceShippingList}
            />
          </div>
          <Select
            label="Nhà cung cấp"
            placeholder="Chọn nhà cung cấp"
            options={supplierList}
          />
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
      <ImportWareHouseFormTable product_list={detail?.product_list} />
    </div>
  );
};

export default ImportWareHouseForm;

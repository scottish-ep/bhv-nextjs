import classNames from 'classnames';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Icon from '../../../../components/Icon/Icon';
import Input from '../../../../components/Input/Input';
import Select from '../../../../components/Select/Select';
import TitlePage from '../../../../components/TitlePage/Titlepage';
import { filterCommentList } from '../../../../const/constant';
import { ILivestreamAppDetail } from '../livestream-app.type';
import CommentTable from './CommentTable';
import ProductTable from './ProductTable';

interface LivestreamAppFormProps {
  detail?: ILivestreamAppDetail;
}

const LivestreamAppForm: React.FC<LivestreamAppFormProps> = ({ detail }) => {
  const [isInfo, setIsInfo] = useState(true);
  const [productList, setProductList] = useState([
    ...(detail?.productList || []),
  ]);
  const [commentList, setCommentList] = useState([
    ...(detail?.commentList || []),
  ]);

  useEffect(() => {
    const element = document.getElementById('loading__animation');
    if (element) {
      element.remove();
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-5 flex-wrap gap-2">
        <TitlePage
          href="/livestream/app"
          title={detail ? 'Chi tiết livestream' : 'Tạo livestream'}
          description="Bán hàng Livestream / Livestream trên App"
        />
        <div className="flex gap-2 flex-wrap">
          {!detail && (
            <React.Fragment>
              {/* <Button
                variant="danger-outlined"
                width={118}
                icon={<Icon icon="trash" size={24} />}
              >
                Xoá
              </Button> */}
              <Button
                variant="secondary"
                width={166}
                style={{ fontWeight: 'bold' }}
              >
                Lưu (F12)
              </Button>
              <Button
                variant="primary"
                width={229}
                style={{ fontWeight: 'bold' }}
              >
                Bắt đầu Livestream
              </Button>
            </React.Fragment>
          )}
          <Button
            variant="no-outlined"
            width={62}
            color="white"
            icon={<Icon icon="question" size={16} />}
          >
            Hỗ trợ
          </Button>
        </div>
      </div>

      {detail && (
        <div className="flex justify-between mb-3 items-center">
          <div className="flex gap-x-9 h-max">
            <span
              className={classNames(
                'text-medium font-semibold text-[#909098] cursor-pointer',
                {
                  'border-b-2 border-b-[#FF970D] text-[#FF970D]': isInfo,
                }
              )}
              onClick={() => setIsInfo(true)}
            >
              Thông tin
            </span>
            <span
              className={classNames(
                'text-medium font-semibold text-[#909098] cursor-pointer',
                {
                  'border-b-2 border-b-[#FF970D] text-[#FF970D]': !isInfo,
                }
              )}
              onClick={() => setIsInfo(false)}
            >
              Tất cả bình luận ({commentList.length})
            </span>
          </div>

          {!isInfo && (
            <div className="flex gap-x-2">
              <div className="flex items-center">
                <div className="font-medium mr-[12px] text-medium">
                  Lọc theo:
                </div>
                <Select
                  defaultValue=""
                  style={{ width: 220 }}
                  options={filterCommentList}
                />
              </div>
              <Button
                variant="outlined"
                width={113}
                icon={<Icon icon="export" size={24} />}
              >
                Xuất file
              </Button>
            </div>
          )}
        </div>
      )}

      {isInfo ? (
        <React.Fragment>
          {detail ? (
            <div className="flex flex-wrap  justify-between rounded px-3 py-4 bg-white">
              <div className="flex flex-col flex-1 flex-y-2 justify-between">
                <span className="text-medium font-medium text-[#4B4B59]">
                  Tên livestream
                </span>
                <span className="font-medium text-[#2E2D3D] text-[16px]">
                  {detail.name}
                </span>
              </div>
              <div className="flex flex-col flex-y-2 justify-between w-[286px]">
                <span className="text-medium font-medium text-[#4B4B59]">
                  Thời gian diễn ra
                </span>
                <span className="font-medium text-[#2E2D3D] text-medium">
                  {format(detail.createdAt, 'HH:mm - dd/MM/yyyy')}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-3 bg-white rounded px-3 py-4">
              <div className="text-medium font-medium text-[#1D1C2D]">
                Tên livestream
              </div>
              <Input placeholder="-Nhập-" />
            </div>
          )}

          <ProductTable
            detail={detail}
            productList={productList}
            setProductList={setProductList}
          />
        </React.Fragment>
      ) : (
        <CommentTable commentList={commentList} />
      )}
    </div>
  );
};

export default LivestreamAppForm;

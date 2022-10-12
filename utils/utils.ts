import get from "lodash/get";
import moment from "moment";
import React, { Fragment } from "react";

export const isArray = (items: any) => {
  return Array.isArray(items) && items.length > 0;
};

export const formatCustomers = (rawCustomers: any) =>
  isArray(rawCustomers)
    ? rawCustomers.map((item: any) => ({
        key: item?.id,
        address: item?.address,
        age: item?.age,
        ageId: item?.age_id,
        avatar: item?.avatar,
        birthday: item?.birthday,
        cityId: item?.cityId,
        classId: item?.classId,
        companyId: item?.companyId || 1,
        createdAt: item?.created_at,
        customerLvImg: item?.customerLvImg,
        customerLvName: item?.customerLvName,
        customerId: item?.customerId,
        customerLevelId: item?.customer_level_id,
        deletedAt: item?.deleted_at,
        districtId: item?.district_id,
        email: item?.email,
        facebookUser: item?.facebook_user,
        facebookUserId: item?.facebook_user_id,
        id: item?.id,
        isBlock: item?.is_block,
        isTakenBy: item?.is_taken_by,
        lastDate: item?.last_date,
        name: item?.name,
        note: item?.note,
        orderCancelCount: item?.orderCancelCount,
        orderTotalCount: item?.orderTotalCount,
        phoneNumber: item?.phone_number,
        points: item?.points,
        sex: item?.sex,
        sourceId: item?.source_id,
        statusTag: item?.status_tag,
        successCost: item?.success_cost,
        tags: item?.tags || [],
        typeId: item?.type_id,
        lastUpdated: item?.last_updated,
        user: item.user ? formatUser(item?.user) : {},
      }))
    : [];

export const formatUser = (user: any) => ({
  avatar: user.avatar,
  createdAt: user.created_at,
  customerId: user.customer_id,
  deletedAt: user.deleted_at,
  email: user.email,
  id: user.id,
  name: user.name,
  otp: user.otp,
  phone: user.phone,
  updatedAt: user.updated_at,
  verifiedAt: user.verified_at,
});

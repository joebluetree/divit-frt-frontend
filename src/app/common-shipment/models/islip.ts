import { iPage } from "ngx-jrt-controls";

//Name : Alen Cherian
//Date : 22/04/2025
//Command : Create the Messenger Slip Model.
//version : 1.0

export interface iSlip {
  cs_id: number;
  cs_mbl_id: number;
  cs_slno?: number;
  cs_refno?: string;
  cs_mode?: string;
  cs_date?: string;
  cs_ampm?: string;
  cs_to_id?: number;
  cs_to_code?:string;
  cs_to_name?: string;
  cs_to_tel?: string;
  cs_to_fax?: string;
  cs_from_id?: number;
  cs_from_name?: string;
  cs_is_drop?: string;
  cs_is_pick?: string;
  cs_is_receipt?: string;
  cs_is_check?: string;
  cs_check_det?: string;
  cs_is_bl?: string;
  cs_bl_det?: string;
  cs_is_oth?: string;
  cs_oth_det?: string;
  cs_deliver_to_id?: number;
  cs_deliver_to_code?: string;
  cs_deliver_to_name?: string;
  cs_deliver_to_add1?: string;
  cs_deliver_to_add2?: string;
  cs_deliver_to_add3?: string;
  cs_deliver_to_tel?: string;
  cs_deliver_to_attn?: string;
  cs_remark?: string;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iSlip_Search {
  cs_refno: string;
  cs_from_date: string;
  cs_to_date: string;
  parent_type: string;
  mbl_id: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iSlipModel {
  selected_row_id: number;
  records: iSlip[],
  errorMessage: string,
  searchRecord: iSlip_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};
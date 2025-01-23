import { iPage } from "ngx-jrt-controls";

export interface iWiretransd {
  wtid_id: number,
  wtid_wtim_id: number,
  wtid_benef_id: number,
  wtid_benef_name: string;
  wtid_benef_ref: string;
  wtid_bank_id: number,
  wtid_bank_name: string;
  wtid_trns_amt: number,
  wtid_order: number,

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iWiretransm {
  wtim_id: number;
  wtim_slno: number;
  wtim_refno: string;
  wtim_to_name: string;
  wtim_cust_id: number;
  wtim_cust_code: string;
  wtim_cust_name: string;
  wtim_cust_fax: string;
  wtim_cust_tel: string;
  wtim_acc_no: string;
  wtim_req_type: string;
  wtim_from_name: string;
  wtim_date: string;
  wtim_sender_ref: number;
  wtim_your_ref: string;
  wtim_is_urgent: string;
  wtim_is_review: string;
  wtim_is_comment: string;
  wtim_is_reply: string;
  wtim_is_recycle: string;
  wtim_remarks: string;
  wtim_details: iWiretransd[];

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iWiretransm_Search {
  wtim_refno: string;
  wtim_from_date: string;
  wtim_to_date: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iWiretransModel {
  selected_row_id: number;
  records: iWiretransm[],
  errorMessage: string,
  searchRecord: iWiretransm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


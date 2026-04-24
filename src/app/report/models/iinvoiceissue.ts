import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 14/03/2026
//Remark : all data variable used in Report Invoice Issue
//version : v1 - 14/03/2026

export interface iInvoiceIssue {
  inv_id: number;
  inv_mbl_id: number;
  inv_mbl_refno: string;
  inv_ref_date: string;
  inv_cust_name: string;
  inv_liner_name: string;
  inv_pol_name: string;
  inv_pol_etd: string;
  inv_pod_name: string;
  inv_pod_eta: string;
  inv_mbl_no: string;
  inv_houseno: string;
  inv_amount: string;
  inv_mode: string;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iInvoiceIssue_Search {
  inv_date_type: string;
  inv_from_date: string;
  inv_to_date: string;
  inv_mode: string;
  inv_type: string;
  inv_parent_name: string;
  inv_cust_name: string;

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iInvoiceIssueModel {
  selected_row_id: number;
  records: iInvoiceIssue[],
  errorMessage: string,
  searchRecord: iInvoiceIssue_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


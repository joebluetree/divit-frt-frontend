import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 10/02/2026
//Remark : all data variable used in Master Profit Report Volume
//version : v1 - 10/02/2026

export interface iMasterProfit {
  mbl_id: number;
  mbl_hbl_id: number;
  mbl_cfno: number;
  mbl_mode: string;
  mbl_refno: string;
  mbl_ref_date: string;
  mbl_mbl_no: string;
  mbl_agent_id: number;
  mbl_agent_name: string;
  mbl_handled_id: number;
  mbl_handled_name: string;
  mbl_pol_id: number;
  mbl_pol_name: string;
  mbl_pol_etd: string;
  mbl_pod_id: number;
  mbl_pod_name: string;
  mbl_pod_eta: string;
  mbl_shipper_id: number;
  mbl_shipper_name: string;
  mbl_consignee_id: number;
  mbl_consignee_name: string;
  mbl_shipterm_id: number;
  mbl_shipterm_name: string;
  mbl_house_count: number;
  mbl_master_count: number;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iMasterProfit_Search {
  mbl_from_date: string;
  mbl_to_date: string;
  mbl_format: string;
  mbl_mode: string;
  mbl_salesman_name: string;
  mbl_agent_name: string;
  mbl_parent_name: string;
  mbl_customer_name: string;
  mbl_report_type: string;
  mbl_profit_criteria: string;
  mbl_profit_val: number;
  mbl_profit_met: string;
  mbl_loss_approved : string;

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iMasterProfitModel {
  selected_row_id: number;
  records: iMasterProfit[],
  errorMessage: string,
  searchRecord: iMasterProfit_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


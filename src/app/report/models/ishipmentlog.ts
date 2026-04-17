import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 19/03/2026
//Remark : all data variable used in Report Shipment Log
//version : v1 - 19/03/2026

export interface iShipmentLog {
  mbl_id: number;
  mbl_mbl_id: number;
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

export interface iShipmentLog_Search {
  mbl_date_type: string;
  mbl_from_date: string;
  mbl_to_date: string;
  mbl_mode: string;
  mbl_is_master: string;
  mbl_is_house: string;
  mbl_stages: string;
  mbl_shipper_name: string;
  mbl_consignee_name: string;
  mbl_agent_name: string;
  mbl_handled_name: string;
  mbl_user_role: string;
  rec_created_name: string;
  mbl_incoterm: string;
  mbl_sort_order: string;
  mbl_list_format: string;
  mbl_eta_within:number
  mbl_pending_ams: string;

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iShipmentLogModel {
  selected_row_id: number;
  records: iShipmentLog[],
  errorMessage: string,
  searchRecord: iShipmentLog_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 26/12/2025
//Remark : all data variable used in Report Operation for searching
//version : v1 - 26/12/2025

export interface iOpHandle {
  ophandle_id: number;
  ophandle_hbl_id: number;
  ophandle_cfno: number;
  ophandle_mode: string;
  ophandle_refno: string;
  ophandle_ref_date: string;
  ophandle_mbl_no: string;
  ophandle_agent_id: number;
  ophandle_agent_name: string;
  ophandle_handled_id: number;
  ophandle_handled_name: string;
  ophandle_pol_id: number;
  ophandle_pol_name: string;
  ophandle_pol_etd: string;
  ophandle_pod_id: number;
  ophandle_pod_name: string;
  ophandle_pod_eta: string;
  ophandle_shipper_id: number;
  ophandle_shipper_name: string;
  ophandle_consignee_id: number;
  ophandle_consignee_name: string;
  ophandle_shipterm_id: number;
  ophandle_shipterm_name: string;
  ophandle_house_count: number;
  ophandle_master_count: number;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iOpHandle_Search {
  ophandle_handled_by: string;
  ophandle_group: string;
  ophandle_type: string;
  ophandle_from_date: string;
  ophandle_to_date: string;

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iOpHandleModel {
  selected_row_id: number;
  records: iOpHandle[],
  errorMessage: string,
  searchRecord: iOpHandle_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


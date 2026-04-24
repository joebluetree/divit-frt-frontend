import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 27/01/2025
//Remark : all data variable used in Report Agent Shipment
//version : v1 - 27/01/2025

export interface iAgentShipment {
  hbl_id: number;
  hbl_mbl_id: number;
  hbl_cfno: number;
  hbl_mode: string;
  hbl_refno: string;
  hbl_ref_date: string;
  hbl_hbl_no: string;
  hbl_agent_id: number;
  hbl_agent_name: string;
  hbl_handled_id: number;
  hbl_handled_name: string;
  hbl_pol_id: number;
  hbl_pol_name: string;
  hbl_pol_etd: string;
  hbl_pod_id: number;
  hbl_pod_name: string;
  hbl_pod_eta: string;
  hbl_shipper_id: number;
  hbl_shipper_name: string;
  hbl_consignee_id: number;
  hbl_consignee_name: string;
  hbl_shipterm_id: number;
  hbl_shipterm_name: string;
  hbl_house_count: number;
  hbl_master_count: number;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iAgentShipment_Search {
  hbl_from_date: string;
  hbl_to_date: string;
  hbl_mode: string;
  hbl_parent_name: string;
  hbl_agent_name: string;
  hbl_shipper_name: string;
  hbl_consignee_name: string;

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iAgentShipmentModel {
  selected_row_id: number;
  records: iAgentShipment[],
  errorMessage: string,
  searchRecord: iAgentShipment_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


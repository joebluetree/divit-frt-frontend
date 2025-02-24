import { iPage } from "ngx-jrt-controls";

    //Name : Alen Cherian
    //Date : 24/02/2025
    //Command :  Create angular frontend model for Air Export.


export interface iAirexport {
  mbl_id: number;
  mbl_cfno: number;
  mbl_refno?: string;
  mbl_ref_date?: string;
  mbl_shipment_stage_id?: number;
  mbl_shipment_stage_name?: string;
  mbl_mode?: string;
  mbl_no?: string;
  mbl_agent_id?: number;
  mbl_agent_name?: string;
  mbl_frt_status_name?: string;
  mbl_pol_id?: number;
  mbl_pol_name?: string;
  mbl_pol_etd?: string;
  mbl_pod_id?: number;
  mbl_pod_name?: string;
  mbl_pod_eta?: string;
  mbl_country_id?: number;
  mbl_country_name?: string;
  mbl_liner_id?: number;
  mbl_liner_name?: string;
  mbl_by_carrier1?: string;
  mbl_by_carrier2?: string;
  mbl_by_carrier3?: string;
  mbl_to_port1?: string;
  mbl_to_port2?: string;
  mbl_to_port3?: string;
  mbl_currency_id?: number;
  mbl_currency_code?: string;
  mbl_handled_id?: number;
  mbl_handled_name?: string;
  mbl_salesman_id?: number;
  mbl_salesman_name?: string;
  mbl_mawb_weight?: number;
  mbl_mawb_chwt?: number;
  mbl_3rdparty?: string;
  mbl_direct?: string;
  mbl_vessel_name?: string;
  mbl_voyage?: string;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iAirExport_Search {
  mbl_refno: string;
  mbl_from_date: string;
  mbl_to_date: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iAirExportModel {
  selected_row_id: number;
  records: iAirexport[],
  errorMessage: string,
  searchRecord: iAirExport_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


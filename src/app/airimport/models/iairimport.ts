import { iPage } from "ngx-jrt-controls";
import { iAirimporth } from "./iairimporth";

//Name : Alen Cherian
//Date : 29/03/2025
//Command :  Create angular frontend model for Air Import.


export interface iAirimport {
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

  mbl_handled_id?: number;
  mbl_handled_name?: string;
  mbl_salesman_id?: number;
  mbl_salesman_name?: string;
  mbl_mawb_weight?: number;
  mbl_mawb_chwt?: number;
  mbl_vessel_name?: string;

  mbl_cargo_loc_id?: number;
  mbl_cargo_loc_code?: string;
  mbl_cargo_loc_name?: string;
  mbl_cargo_loc_add1?: string;
  mbl_cargo_loc_add2?: string;
  mbl_cargo_loc_add3?: string;
  mbl_cargo_loc_add4?: string;
  mbl_incoterm_id?: number;
  mbl_incoterm?: string;

  mbl_stage_changed_date?: string;
  mbl_an_sent_dt?: string;
  air_import: iAirimporth[]

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iAirImport_Search {
  mbl_refno: string;
  mbl_from_date: string;
  mbl_to_date: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iAirImportModel {
  selected_row_id: number;
  records: iAirimport[],
  errorMessage: string,
  searchRecord: iAirImport_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


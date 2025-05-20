import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 29/03/2025
//Remark : all data variable used in sea-import component is exported as separte interface according to its purpose (editing,search) 
//version : v1 - 29-03-2025

export interface iSea_impHouse {
  hbl_id: number
  hbl_mbl_id: number
  hbl_houseno: string;
  hbl_shipper_name: string;
  hbl_consignee_name: string;
  hbl_client_cat: string;
  hbl_client_type: string;
  hbl_packages: number;
  hbl_handled_name: string;
  hbl_telex_released_id: number;
  hbl_telex_released_code: string;
  hbl_telex_released_name: string;
  hbl_frt_status_name: string;
  hbl_ship_term_name: string;
  rec_created_by: string;
  rec_created_date: string;
}

export interface iContainer {
  cntr_id: number,
  cntr_hbl_id: number,
  cntr_mbl_id: number,
  cntr_catg: string,
  cntr_no: string,
  cntr_type_id: number,
  cntr_type_name: string,
  cntr_sealno: string,
  cntr_pieces: number,
  cntr_packages_unit_id: number,
  cntr_packages_unit_name: string,
  cntr_packages: number,
  cntr_cbm: number,
  cntr_weight_uom: string,
  cntr_weight: number,
  cntr_pick_date: string;
  cntr_return_date: string;
  cntr_lfd: string;
  cntr_discharge_date: string;
  cntr_order: number,

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;

}

export interface iSea_importm {
  mbl_id: number;
  mbl_cfno: number;
  mbl_mode: string;
  mbl_refno: string;
  mbl_ref_date: string;
  mbl_shipment_stage_id: number;
  mbl_shipment_stage_name: string;
  mbl_no: string;
  mbl_agent_id: number;
  mbl_agent_name: string;
  mbl_liner_id: number;
  mbl_liner_name: string;
  mbl_coloader_id: number;
  mbl_coloader_name: string;
  mbl_handled_id: number;
  mbl_handled_name: string;
  mbl_salesman_id: number;
  mbl_salesman_name: string;
  mbl_frt_status_name: string;
  mbl_ship_term_id: number;
  mbl_ship_term_name: string;
  mbl_cntr_type: string;
  mbl_incoterm_id: number;
  mbl_incoterm_name: string;
  mbl_pol_id: number;
  mbl_pol_name: string;
  mbl_pol_etd: string;
  mbl_pod_id: number;
  mbl_pod_name: string;
  mbl_pod_eta: string;
  mbl_place_delivery: string;
  mbl_pofd_eta: string;
  mbl_country_id: number;
  mbl_country_name: string;
  mbl_vessel_id: number;
  mbl_vessel_code: string;
  mbl_vessel_name: string;
  mbl_voyage: string;
  mbl_status_id: number;
  mbl_status_name: string;
  mbl_is_sea_waybill: string;
  mbl_ombl_sent_on: string;
  mbl_ombl_sent_ampm: string;
  mbl_of_sent_on: string;
  mbl_cargo_loc_id: number;
  mbl_cargo_loc_code: string;
  mbl_cargo_loc_name: string;
  mbl_cargo_loc_add1: string;
  mbl_cargo_loc_add2: string;
  mbl_cargo_loc_add3: string;
  mbl_cargo_loc_add4: string;
  mbl_devan_loc_id: number;
  mbl_devan_loc_code: string;
  mbl_devan_loc_name: string;
  mbl_devan_loc_add1: string;
  mbl_devan_loc_add2: string;
  mbl_devan_loc_add3: string;
  mbl_devan_loc_add4: string;
  
  master_cntr: iContainer[];
  master_house: iSea_impHouse[];

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iSea_importm_Search {
  mbl_refno: string;
  mbl_from_date: string;
  mbl_to_date: string;
  mbl_agent_name: string;
  mbl_pol_name: string;
  mbl_pod_name: string;

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iSea_importmModel {
  selected_row_id: number;
  records: iSea_importm[],
  errorMessage: string,
  searchRecord: iSea_importm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


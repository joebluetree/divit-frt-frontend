import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 24/02/2025
//Remark : all data variable used in qtnm-lcl component is exported as separte interface according to its purpose (editing,search) 
//version : v1 - 24-02-2025

export interface iSea_expHouse {
  hbl_id: number
  hbl_mbl_id: number
  hbl_houseno: string;
  hbl_shipper_name: string;
  hbl_consignee_name: string;
  hbl_pcs: number;
  hbl_handled_name: string;
  hbl_frt_status_name: string;
  rec_created_by: string;
  hbl_issued_date: string;
}

export interface iContainer {
  cntr_id: number,
  cntr_hbl_id: number,
  cntr_catg: string,
  cntr_no: string,
  cntr_type_id: number,
  cntr_type_name: string,
  cntr_sealno: string,
  cntr_pieces: number,
  cntr_packages_unit_id: number,
  cntr_packages_unit_name: string,
  // cntr_packages: number,
  // cntr_teu: number,
  cntr_cbm: number,
  // cntr_weight_uom: string,
  cntr_weight: number,
  cntr_order: number,

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;

}

export interface iSea_exportm {
  mbl_id: number;
  mbl_cfno: number;
  mbl_refno: string;
  mbl_ref_date: string;
  mbl_shipment_stage_id: number;
  mbl_shipment_stage_name: string;
  mbl_no: string;
  mbl_sub_houseno: string;
  mbl_liner_bookingno: string;
  mbl_agent_id: number;
  mbl_agent_name: string;
  mbl_liner_id: number;
  mbl_liner_name: string;
  mbl_handled_id: number;
  mbl_handled_name: string;
  mbl_salesman_id: number;
  mbl_salesman_name: string;
  mbl_frt_status_name: string;
  mbl_ship_term_id: number;
  mbl_ship_term_name: string;
  mbl_cntr_type: string;
  mbl_direct: string;
  mbl_place_delivery: string;
  mbl_pol_id: number;
  mbl_pol_name: string;
  mbl_pol_etd: string;
  mbl_pod_id: number;
  mbl_pod_name: string;
  mbl_pod_eta: string;
  mbl_pofd_id: number;
  mbl_pofd_name: string;
  mbl_pofd_eta: string;
  mbl_country_id: number;
  mbl_country_name: string;
  mbl_vessel_id: number;
  mbl_vessel_code: string;
  mbl_vessel_name: string;
  mbl_voyage: string;
  mbl_book_slno: number;
  
  master_cntr: iContainer[];
  master_house: iSea_expHouse[];

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iSea_exportm_Search {
  mbl_refno: string;
  mbl_from_date: string;
  mbl_to_date: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iSea_exportmModel {
  selected_row_id: number;
  records: iSea_exportm[],
  errorMessage: string,
  searchRecord: iSea_exportm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


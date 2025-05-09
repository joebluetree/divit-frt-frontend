import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 07/05/2025
//Remark : all data variable used in Other-opertaion component is exported as separte interface according to its purpose (editing,search) 
//version : v1 - 07/05/2025

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

export interface iOtherOp {
  oth_id: number;
  oth_hbl_id: number;
  oth_parent_id: number;
  oth_cfno: number;
  oth_refno: string;
  oth_ref_date: string;
  oth_shipment_stage_id: number;
  oth_shipment_stage_name: string;
  oth_mbl_no: string;
  oth_agent_id: number;
  oth_agent_name: string;
  oth_liner_id: number;
  oth_liner_name: string;
  oth_handled_id: number;
  oth_handled_name: string;
  oth_salesman_id: number;
  oth_salesman_name: string;
  oth_mbl_frt_status: string;
  oth_pol_id: number;
  oth_pol_name: string;
  oth_pol_etd: string;
  oth_pod_id: number;
  oth_pod_name: string;
  oth_pod_eta: string;
  oth_place_delivery: string;
  oth_country_id: number;
  oth_country_name: string;
  oth_vessel_id: number;
  oth_vessel_code: string;
  oth_vessel_name: string;
  oth_voyage: string;
  oth_hbl_no: string;
  oth_shipper_id: number;
  oth_shipper_code: string;
  oth_shipper_name: string;
  oth_shipper_add1: string;
  oth_shipper_add2: string;
  oth_shipper_add3: string;
  oth_shipper_add4: string;
  oth_consignee_id: number;
  oth_consignee_code: string;
  oth_consignee_name: string;
  oth_consignee_add1: string;
  oth_consignee_add2: string;
  oth_consignee_add3: string;
  oth_consignee_add4: string;
  oth_bltype: string;
  oth_hbl_frt_status: string;
  oth_commodity: string;
  oth_isf_no: string;
  oth_packages: number;
  oth_cbm: number;
  oth_weight: number;
  oth_lbs: number;
  oth_cft: number;
  oth_chwt: number;
  oth_chwt_lbs: number;
  oth_location_id: number;
  oth_location_code: string;
  oth_location_name: string;
  oth_location_add1: string;
  oth_location_add2: string;
  oth_location_add3: string;
  oth_location_add4: string;
  oth_is_pl: string;
  oth_is_ci: string;
  oth_is_carr_an: string;
  oth_custom_reles_status: string;
  oth_is_delivery: string;
  oth_lfd_date: string;
  oth_it_no: string;
  oth_it_date: string;
  oth_it_port: string;
    
  otherop_cntr: iContainer[];
  otherop_house: iOtherOp;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iOtherOp_Search {
  oth_refno: string;
  oth_from_date: string;
  oth_to_date: string;

  rec_company_id: number;
  rec_branch_id: number;
}

export interface iOtherOpModel {
  selected_row_id: number;
  records: iOtherOp[],
  errorMessage: string,
  searchRecord: iOtherOp_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 01/04/2025
//Remark : all data variable used in sea-importh component is exported as separte interface according to its purpose (editing,search) 
//version : v1 - 24-02-2025

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
  cntr_cbm: number,
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

export interface iSea_importH {
  hbl_id: number;
  hbl_mbl_id: number;
  hbl_mbl_refno: string;
  hbl_cfno: number;
  hbl_houseno: string;
  hbl_shipment_stage_id: number;
  hbl_shipment_stage_name: string;
  hbl_bltype: string;
  hbl_mode: string;
  hbl_shipper_id: number;
  hbl_shipper_code: string;
  hbl_shipper_name: string;
  hbl_shipper_add1: string;
  hbl_shipper_add2: string;
  hbl_shipper_add3: string;
  hbl_shipper_add4: string;
  hbl_shipper_add5: string;
  hbl_consignee_id: number;
  hbl_consignee_code: string;
  hbl_consignee_name: string;
  hbl_consignee_add1: string;
  hbl_consignee_add2: string;
  hbl_consignee_add3: string;
  hbl_consignee_add4: string;
  hbl_consignee_add5: string;
  hbl_location_id: number;
  hbl_location_code: string;
  hbl_location_name: string;
  hbl_location_add1: string;
  hbl_location_add2: string;
  hbl_location_add3: string;
  hbl_location_add4: string;
  hbl_location_add5: string;
  hbl_notify_id: number;
  hbl_notify_code: string;
  hbl_notify_name: string;
  hbl_notify_add1: string;
  hbl_notify_add2: string;
  hbl_notify_add3: string;
  hbl_notify_add4: string;
  hbl_notify_add5: string;
  hbl_careof_id: number;
  hbl_careof_name: string;
  hbl_agent_id: number;
  hbl_agent_name: string;
  hbl_cha_id: number;
  hbl_cha_code: string;
  hbl_cha_name: string;
  hbl_cha_attn: string;
  hbl_cha_tel: string;
  hbl_cha_fax: string;
  hbl_place_final: string;

  // hbl_consigned_to1: string;
  // hbl_consigned_to2: string;
  // hbl_consigned_to3: string;
  // hbl_consigned_to4: string;
  // hbl_consigned_to5: string;
  hbl_place_delivery: string;
  hbl_pld_eta: string;
  hbl_plf_eta: string;
  hbl_it_no: string;
  hbl_is_itshipment: string;
  hbl_it_port: string;
  hbl_it_date: string;
  hbl_packages: number;
  hbl_uom_id: number;
  hbl_uom_name: string;
  hbl_cbm: number;
  hbl_weight: number;
  hbl_lbs: number;
  hbl_cft: number;
  hbl_pcs: number;
  hbl_commodity: string;
  hbl_frt_status_name: string;
  hbl_ship_term_id: number;
  hbl_ship_term_name: string;
  hbl_incoterm_id: number;
  hbl_incoterm_name: string;
  hbl_pono: string;
  hbl_invoiceno: string;
  hbl_ams_fileno: string;
  hbl_sub_house: string;
  hbl_isf_no: string;
  hbl_telex_released_id: number;
  hbl_telex_released_name: string;
  hbl_mov_dad: string;
  hbl_bl_req: string;
  hbl_book_slno: string;
  hbl_is_pl: string;
  hbl_is_ci: string;
  hbl_is_carr_an: string;
  hbl_custom_reles_status: string;
  hbl_custom_clear_date: string;
  hbl_is_delivery: string;
  hbl_paid_status_id: number;
  hbl_paid_status_name: string;
  hbl_paid_remarks: string;
  hbl_bl_status: string;
  hbl_cargo_release_status: string;

  hbl_salesman_id: number;
  hbl_salesman_name: string;
  hbl_handled_id: number;
  hbl_handled_name: string;
  hbl_remark1: string;
  hbl_remark2: string;
  hbl_remark3: string;
  hbl_lfd_date: string;
  hbl_go_date: string;
  hbl_pickup_date: string;
  hbl_empty_ret_date: string;
  hbl_delivery_date: string;
  hbl_isf_attached: string;
  rec_memo_count: number;
  rec_memo_attached: string;
  rec_telex_count: number;
  rec_telex_attached: string;

  desc_parent_id: number;


  marks1: iCargo_desc[];
  marks2: iCargo_desc[];
  marks3: iCargo_desc[];
  marks4: iCargo_desc[];
  marks5: iCargo_desc[];
  marks6: iCargo_desc[];
  marks7: iCargo_desc[];
  marks8: iCargo_desc[];
  marks9: iCargo_desc[];
  marks10: iCargo_desc[];
  marks11: iCargo_desc[];
  marks12: iCargo_desc[];
  marks13: iCargo_desc[];
  marks14: iCargo_desc[];
  marks15: iCargo_desc[];
  marks16: iCargo_desc[];
  marks17: iCargo_desc[];

  house_cntr: iContainer[];

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}
export interface iCargo_desc {
  desc_id: number;
  desc_ctr: number;
  desc_mark: string;
  desc_package: string;
  desc_description: string;
}

export interface iSea_importH_Search {
  hbl_date_type: string;
  hbl_from_date: string;
  hbl_to_date: string;
  hbl_mbl_refno: string;
  rec_created_by: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iSea_importHModel {
  selected_row_id: number;
  records: iSea_importH[],
  errorMessage: string,
  searchRecord: iSea_importH_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


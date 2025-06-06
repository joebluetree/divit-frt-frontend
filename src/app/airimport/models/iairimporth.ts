import { iPage } from "ngx-jrt-controls";

//Name : Alen Cherian
//Date : 31/03/2025
//Command :  Create angular frontend model for Air Import House.

export type data_house = { mode: string, record: iAirimporth, index: number };

export interface iAirimporth {
  hbl_id: number;
  hbl_cfno: number;
  hbl_houseno?: string;
  hbl_mbl_id: number;
  hbl_mbl_refno?: string;
  hbl_shipment_stage_id?: number;
  hbl_shipment_stage_name?: string;
  hbl_date?: string;
  hbl_mode?: string;
  hbl_shipper_id?: number;
  hbl_shipper_code?: string;
  hbl_shipper_name?: string;
  hbl_shipper_add1?: string;
  hbl_shipper_add2?: string;
  hbl_shipper_add3?: string;
  hbl_shipper_add4?: string;
  hbl_shipper_add5?: string;

  hbl_consignee_id?: number;
  hbl_consignee_code?: string;
  hbl_consignee_name?: string;
  hbl_consignee_add1?: string;
  hbl_consignee_add2?: string;
  hbl_consignee_add3?: string;
  hbl_consignee_add4?: string;
  hbl_consignee_add5?: string;
  hbl_agent_id?: number;
  hbl_agent_name?: string;
  hbl_cha_id?: number;
  hbl_cha_code?: string;
  hbl_cha_name?: string;
  hbl_cha_attn?: string;
  hbl_cha_tel?: string;
  hbl_cha_fax?: string;
  hbl_location_id?: number;
  hbl_location_code?: string;
  hbl_location_name?: string;
  hbl_location_add1?: string;
  hbl_location_add2?: string;
  hbl_location_add3?: string;
  hbl_location_add4?: string;
  
  hbl_it_no?: string;
  hbl_it_date?: string;
  hbl_it_port?: string;
  hbl_it_pcs?: number;
  hbl_it_wt?: number;
  hbl_it_no2?: string;
  hbl_it_date2?: string;
  hbl_it_port2?: string;
  hbl_it_pcs2?: number;
  hbl_it_wt2?: number;
  hbl_it_no3?: string;
  hbl_it_date3?: string;
  hbl_it_port3?: string;
  hbl_it_pcs3?: number;
  hbl_it_wt3?: number;
  hbl_bltype?:string;
  
  hbl_place_final?: string;
  hbl_plf_eta?: string;
  hbl_frt_status_name?: string;
  hbl_uom_id?: number;
  hbl_uom_name?: string;
  hbl_packages?: number;
  hbl_weight?: number;
  hbl_lbs?: number;
  hbl_chwt_lbs?: number;
  hbl_chwt?: number;
  hbl_commodity?: string;
  hbl_handled_id?: number;
  hbl_handled_name?: string;
  hbl_salesman_id?: number;
  hbl_salesman_name?: string;
  hbl_remark1?: string;
  hbl_remark2?: string;
  hbl_remark3?: string;
  hbl_lfd_date?: string;
  
  hbl_pickup_date?: string;
  hbl_careof_id?: number;
  hbl_careof_name?: string;
  hbl_pono?: string;
  hbl_paid_status_id?: number;
  hbl_paid_status_name?: string;
  hbl_cargo_release_status?: string;
  hbl_is_itshipment?: string;
  hbl_book_slno?: string;
  hbl_is_pl?: string;
  hbl_is_ci?: string;
  hbl_is_carr_an?: string;
  hbl_custom_reles_status?: string;
  hbl_is_delivery?: string;
  hbl_paid_remarks?: string;
  hbl_delivery_date?: string;
  hbl_incoterm_id?: number;
  hbl_incoterm?: string;
  hbl_invoiceno?: string;
  rec_memo_count?: number;
  rec_memo_attached:string;
  
  marks1: Cargo_desc;
  marks2: Cargo_desc;
  marks3: Cargo_desc;
  marks4: Cargo_desc;
  marks5: Cargo_desc;
  marks6: Cargo_desc;
  marks7: Cargo_desc;
  marks8: Cargo_desc;
  marks9: Cargo_desc;
  marks10: Cargo_desc;
  marks11: Cargo_desc;
  marks12: Cargo_desc;
  marks13: Cargo_desc;
  marks14: Cargo_desc;
  marks15: Cargo_desc;
  marks16: Cargo_desc;
  marks17: Cargo_desc;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface Cargo_desc {
  desc_id: number;
  desc_parent_id: number;
  desc_parent_type: string;
  desc_ctr?: number;

  desc_mark?: string;
  desc_description?: string;
}

export interface iAirImporth_Search {
  hbl_houseno: string;
  hbl_from_date: string;
  hbl_to_date: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iAirImporthModel {
  selected_row_id: number;
  records: iAirimporth[],
  errorMessage: string,
  searchRecord: iAirImporth_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


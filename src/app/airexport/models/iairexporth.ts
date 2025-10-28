import { iPage } from "ngx-jrt-controls";

//Name : Alen Cherian
//Date : 27/02/2025
//Command :  Create angular frontend model for Air Export House.

export type data_house = { mode: string, record: iAirexporth, index: number };

export interface iAirexporth {
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
  hbl_notify_name?: string;
  hbl_notify_add1?: string;
  hbl_notify_add2?: string;
  hbl_notify_add3?: string;

  hbl_exp_ref1?: string;
  hbl_exp_ref2?: string;
  hbl_exp_ref3?: string;
  hbl_agent_name?: string;
  hbl_agent_city?: string;
  hbl_place_delivery?: string;
  hbl_iata?: string;
  hbl_accno?: string;
  hbl_frt_status_name?: string;
  hbl_oc_status?: string;
  hbl_carriage_value?: string;
  hbl_customs_value?: string;
  hbl_ins_amt?: string;
  hbl_aesno?: string;
  hbl_lcno?: string;

  hbl_bltype?: string;
  hbl_handled_id?: number;
  hbl_handled_name?: string;
  hbl_salesman_id?: number;
  hbl_salesman_name?: string;
  hbl_goods_nature?: string;
  hbl_commodity?: string;
  hbl_format_id?: number;
  hbl_format_name?: string;
  hbl_rout1?: string;
  hbl_rout2?: string;
  hbl_rout3?: string;
  hbl_pol_name?: string;
  hbl_pod_name?: string;
  hbl_asarranged_consignee?: string;
  hbl_asarranged_shipper?: string;

  hbl_packages?: number;
  hbl_weight?: number;
  hbl_weight_unit?: string;
  hbl_class?: string;
  hbl_comm?: string;
  hbl_chwt?: number;
  hbl_rate?: number;
  hbl_total?: number;


  hbl_charges1: string;
  hbl_toagent1: string;
  hbl_rate1: number;
  hbl_total1: number;
  hbl_printsc1: string;
  hbl_printsc2: string;

  hbl_charges2: string;
  hbl_toagent2: string;
  hbl_rate2: number;
  hbl_total2: number;
  hbl_printsc3: string;
  hbl_printsc4: string;

  hbl_charges3: string;
  hbl_toagent3: string;
  hbl_rate3: number;
  hbl_total3: number;
  hbl_printsc5: string;
  hbl_printsc6: string;

  hbl_charges4: string;
  hbl_toagent4: string;
  hbl_rate4: number;
  hbl_total4: number;
  hbl_printsc7: string;
  hbl_printsc8: string;

  hbl_charges5: string;
  hbl_toagent5: string;
  hbl_rate5: number;
  hbl_total5: number;
  hbl_printsc9: string;
  hbl_printsc10: string;

  hbl_charges1_carrier?: string;
  hbl_tocarrier1?: string;
  hbl_carrate1?: number;
  hbl_cartotal1?: number;
  hbl_carprintsc1?: string;
  hbl_carprintsc2?: string;

  hbl_charges2_carrier?: string;
  hbl_tocarrier2?: string;
  hbl_carrate2?: number;
  hbl_cartotal2?: number;
  hbl_carprintsc3?: string;
  hbl_carprintsc4?: string;

  hbl_charges3_carrier: string;
  hbl_tocarrier3?: string;
  hbl_carrate3?: number;
  hbl_cartotal3?: number;
  hbl_carprintsc5?: string;
  hbl_carprintsc6?: string;

  hbl_remark1?: string;
  hbl_remark2?: string;
  hbl_remark3?: string;
  hbl_by1?: string;
  hbl_by1_carrier?: string;
  hbl_by2?: string;
  hbl_by2_carrier?: string;
  hbl_issued_date?: string;
  hbl_delivery_date?: string;
  hbl_issued_by?: string;
  hbl_print?: string;

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

export interface iAirExporth_Search {
  hbl_from_date: string;
  hbl_to_date: string;
  hbl_mbl_refno: string;
  hbl_houseno: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iAirExporthModel {
  selected_row_id: number;
  records: iAirexporth[],
  errorMessage: string,
  searchRecord: iAirExporth_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


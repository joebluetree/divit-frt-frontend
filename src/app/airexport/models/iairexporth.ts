import { iPage } from "ngx-jrt-controls";

//Name : Alen Cherian
//Date : 27/02/2025
//Command :  Create angular frontend model for Air Export House.

export type data_house = { mode: string, record: iAirexporth, index: number };

export interface iAirexporth {
  hbl_id: number;
  hbl_cfno:number;
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

  hbl_consignee_id?: number;
  hbl_consigned_code?: string;
  hbl_consigned_to1?: string;
  hbl_consigned_to2?: string;
  hbl_consigned_to3?: string;
  hbl_consigned_to4?: string;
  hbl_consigned_to5?: string;
  hbl_consigned_to6?: string;
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
  hbl_weight?:number;
  hbl_weight_unit?: string;
  hbl_class?: string;
  hbl_comm?: string;
  hbl_chwt?: number;
  hbl_rate?: number;
  hbl_total?: number;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}


export interface iAirExporth_Search {
  hbl_houseno: string;
  hbl_from_date: string;
  hbl_to_date: string;
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


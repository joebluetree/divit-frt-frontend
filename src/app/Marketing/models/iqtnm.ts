import { iPage } from "ngx-jrt-controls";

export type data_fcl = { mode: string, record: iQtnd_fcl, index: number };

export interface iQtnd_fcl {
  qtnd_id: number;
  qtnd_qtnm_id: number;
  qtnd_pol_id: number;
  qtnd_pol_code: string;
  qtnd_pol_name: string;
  qtnd_pod_id: number;
  qtnd_pod_code: string;
  qtnd_pod_name: string;
  qtnd_carrier_id: number;
  qtnd_carrier_code: string;
  qtnd_carrier_name: string;
  qtnd_trans_time: string;
  qtnd_routing: string;
  qtnd_cntr_type: string;
  qtnd_etd: string;
  qtnd_cutoff: string;
  qtnd_of: number;
  qtnd_pss: number;
  qtnd_baf: number;
  qtnd_isps: number;
  qtnd_haulage: number;
  qtnd_ifs: number;
  qtnd_tot_amt: number;
  qtnd_order: number;

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iQtnm {
  qtnm_id: number;
  qtnm_cfno: number;
  qtnm_type: string;
  qtnm_no: string;
  qtnm_to_id: number;
  qtnm_to_code: string;
  qtnm_to_name: string;
  qtnm_to_addr1: string;
  qtnm_to_addr2: string;
  qtnm_to_addr3: string;
  qtnm_to_addr4: string;
  qtnm_date: string;
  qtnm_quot_by: string;
  qtnm_valid_date: string;
  qtnm_salesman_id: number;
  qtnm_salesman_name: string;
  qtnm_move_type: string;
  qtnm_commodity: string;
  qtnm_package: string;
  qtnm_kgs: number;
  qtnm_lbs: number;
  qtnm_cbm: number;
  qtnm_cft: number;
  qtnm_por_id: number;
  qtnm_por_name: string;
  qtnm_pol_id: number;
  qtnm_pol_name: string;
  qtnm_pod_id: number;
  qtnm_pod_name: string;
  qtnm_pld_name: string;
  qtnm_plfd_name: string;
  qtnm_trans_time: string;
  qtnm_routing: string;
  qtnm_amt: number;
  qtnm_fcl: iQtnd_fcl[];

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iQtnm_Search {
  qtnm_no: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iQtnmModel {
  selected_row_id: number;
  records: iQtnm[],
  errorMessage: string,
  searchRecord: iQtnm_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


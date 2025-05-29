import { iPage } from "ngx-jrt-controls";

//Name : Sourav V
//Created Date : 04/01/2025
//Remark : all data variable used in qtnm-lcl component is exported as separte interface according to its purpose (editing,search) 

export interface iQtnd_lcl {
  qtnd_id: number,
  qtnd_qtnm_id: number,
  qtnd_acc_id: number,
  qtnd_acc_code: string,
  qtnd_acc_name: string,
  qtnd_amt: number,
  qtnd_per: string,
  qtnd_order: number,

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;

}

export interface iQtnm_lcl {
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
  qtnm_por_code: string;
  qtnm_por_name: string;
  qtnm_pol_id: number;
  qtnm_pol_code: string;
  qtnm_pol_name: string;
  qtnm_pod_id: number;
  qtnm_pod_code: string;
  qtnm_pod_name: string;
  qtnm_pld_name: string;
  qtnm_plfd_name: string;
  qtnm_trans_time: string;
  qtnm_routing: string;
  qtnm_amt: number;
  rec_files_count?: number;
  rec_files_attached?: string;
  qtnd_lcl: iQtnd_lcl[];

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iQtnm_lcl_Search {
  qtnm_type: string;
  qtnm_no: string;
  qtnm_to_id: number;
  qtnm_to_name: string;
  qtnm_pld_name: string;
  qtnm_from_date: string;
  qtnm_to_date: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iQtnm_lclModel {
  selected_row_id: number;
  records: iQtnm_lcl[],
  errorMessage: string,
  searchRecord: iQtnm_lcl_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


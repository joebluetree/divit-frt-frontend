import { iPage } from "ngx-jrt-controls";
import { iGenRemarkm } from "../../shared/models/igenremarkm";

//Name : Sourav V
//Created Date : 03/01/2025
//Remark : all data variable used in qtnm-air component is exported as separte interface according to its purpose (editing,search)

export type data_qtnmair  = { mode : string,  record : iQtnd_air , index : number  };

export interface iQtnd_air {
  qtnd_id: number,
  qtnd_qtnm_id: number,
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
  qtnd_etd: string;
  qtnd_min: string;
  qtnd_45k: string;
  qtnd_100k: string;
  qtnd_300k: string;
  qtnd_500k: string;
  qtnd_1000k: string;
  qtnd_fsc: string,
  qtnd_war: string,
  qtnd_sfc: string,
  qtnd_hac: string,
  qtnd_order: number,

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;

}

export interface iQtnm_air {
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
  qtnm_cur_id: number;
  qtnm_cur_code: string;
  qtnm_exrate: number;
  rec_files_count?: number;
  rec_files_attached?: string;
  qtnd_air: iQtnd_air[];
  remk_remarks: iGenRemarkm[];

  rec_version: number;
  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iQtnm_air_Search {
  qtnm_search: string;
  qtnm_type: string;
  qtnm_no: string;
  qtnm_to_name: string;
  qtnm_from_date: string;
  qtnm_to_date: string;
  rec_company_id: number;
  rec_branch_id: number;
}

export interface iQtnm_airModel {
  selected_row_id: number;
  records: iQtnm_air[],
  errorMessage: string,
  searchRecord: iQtnm_air_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


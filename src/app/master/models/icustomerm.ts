import { iPage } from "ngx-jrt-controls";

export interface iContactm {
  cont_id: number,
  cont_parent_id: number,
  cont_title: string,
  cont_name: string,
  cont_group_id: number,
  cont_group_name: string,
  cont_designation: string,
  cont_email: string,
  cont_tel: string,
  cont_mobile: string,
  cont_remarks: string,

  cont_country_id: number;
  cont_country_code: string;
  cont_country_name: string;

  rec_version: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;

}

export interface iCustomerm {
  cust_id: number;
  cust_type: string;
  cust_code: string;
  cust_short_name: string;
  cust_name: string;
  cust_official_name: string;
  cust_address1: string;
  cust_address2: string;
  cust_address3: string;
  cust_city: string;
  cust_state_id: number;
  cust_state_name: string;
  cust_country_id: number;
  cust_country_name: string;
  cust_zip_code: string;
  cust_title: string;
  cust_contact: string;
  cust_designation: string;
  cust_tel: string;
  cust_fax: string;
  cust_mobile: string;
  cust_web: string;
  cust_email: string;
  cust_refer_by: string;
  cust_salesman_id: number;
  cust_salesman_name: string;
  cust_handled_id: number;
  cust_handled_name: string; 
  cust_location: string;

  cust_row_type: string;
  cust_is_parent: string;
  cust_parent_id: number;
  cust_parent_name: string;
  cust_credit_limit: number;
  cust_est_dt: string;

  cust_is_shipper: string;
  cust_is_consignee: string;
  cust_is_importer: string;
  cust_is_exporter: string;
  cust_is_cha: string;
  cust_is_forwarder: string;
  cust_is_oagent: string;
  cust_is_acarrier: string;
  cust_is_scarrier: string;
  cust_is_trucker: string;
  cust_is_warehouse: string;
  cust_is_sterminal: string;
  cust_is_aterminal: string;
  cust_is_shipvendor: string;
  cust_is_gvendor: string;
  cust_is_employee: string;
  cust_is_contract: string;
  cust_is_miscell: string;
  cust_is_tbd: string;
  cust_is_bank: string;

  cust_nomination: string;
  cust_priority: string;
  cust_criteria: string;
  cust_min_profit: number;
  cust_firm_code: string;
  cust_einirsno: string;
  cust_days: number;
  cust_is_splacc: string;
  cust_is_actual_vendor: string;
  cust_is_blackacc: string;
  cust_splacc_memo: string;
  cust_is_ctpat: string;
  cust_ctpat_no: string;
  cust_marketing_mail: string;
  
  cust_chb_id: number;
  cust_chb_code: string;
  cust_chb_name: string;
  cust_chb_address1: string;
  cust_chb_address2: string;
  cust_chb_address3: string;
  cust_chb_group: string;
  cust_chb_contact: string;
  cust_chb_tel: string;
  cust_chb_fax: string;
  cust_chb_email: string;
  cust_poa_customs_yn: string;
  cust_poa_isf_yn: string;
  cust_brokers: string;
  cust_bond_yn: string;
  cust_punch_from: string;
  cust_bond_no: string;
  cust_bond_expdt: string;
  cust_branch: string;
  cust_protected: string;
  cust_cur_code: string;

  cust_contacts: iContactm[];
  rec_version: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iCustomer_Search {
  cust_row_type: string;
  cust_name: string;
  rec_company_id: number;
}

export interface iCustomerModel {
  selected_row_id: number;
  records: iCustomerm[],
  errorMessage: string,
  searchRecord: iCustomer_Search,
  pageRecord: iPage,
  sort_column: string;
  sort_order: string;
};


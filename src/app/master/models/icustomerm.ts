import { iPage } from "ngx-jrt-controls";

export interface iContactm {
  cont_id: number,
  cont_parent_id: number,
  cont_title: string,
  cont_name: string,
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
  cust_display_name: string;
  cust_address1: string;
  cust_address2: string;
  cust_address3: string;
  cust_row_type: string;
  cust_is_parent: string;
  cust_parent_id: number;
  cust_parent_name: string;
  cust_credit_limit: number;
  cust_est_dt: string;
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


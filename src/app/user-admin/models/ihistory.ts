import { iPage } from "ngx-jrt-controls";

export interface iHistory {
    log_id: number;
    log_date: string;
    log_user_code: string;
    log_table: string;
    log_table_row_id: number;
    log_column: string;
    log_desc: string;
    log_refno: string;
    log_old_value: string;
    log_new_value: string;
    log_status: string;

    rec_version: number;
    rec_company_id: number;
    rec_branch_id: number;
    rec_order: number;
}
export interface iHistory_Search {
    log_table: string;
    log_from_date: string;
    log_to_date: string;
    rec_company_id: number;
    rec_branch_id: number;
}



export interface iHistoryModel {
    selected_row_id: number;
    records: iHistory[],
    errorMessage: string,
    searchRecord: iHistory_Search,
    pageRecord: iPage,
    sort_column: string;
    sort_order: string;
};


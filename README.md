CREATE TABLE rpt_file_trk (
    rpt_id VARCHAR(255) NOT NULL,
    rqst_cust_id NUMERIC(10) NOT NULL,
    endpnt_id VARCHAR(7) NOT NULL,
    flie_stat_cd VARCHAR(11) NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    file_frmt_cd VARCHAR(3) NOT NULL,
    prcss_type_cd VARCHAR(6) NOT NULL,
    rpt_seq_id NUMERIC REFERENCES rpt_trk(rpt_seq_id),
    appl_gnrtrpt_sw VARCHAR(1),
    rpt_type_cd VARCHAR(3),
    rpt_sum_txt BYTEA,
    crte_dttm TIMESTAMP NOT NULL
);

CREATE TABLE rpt_trk (
    rpt_seq_id NUMERIC NOT NULL,
    prcss_type_cd VARCHAR(6) NOT NULL,
    prcss_stat_cd VARCHAR(11),
    resp_rpt_stat_cd VARCHAR(11),
    mc_unq_fl_nam VARCHAR(44) NOT NULL,
    cust_fl_nam VARCHAR(50),
    send_cust_id NUMERIC,
    tot_rec_cnt NUMERIC,
    acpt_rec_cnt NUMERIC,
    rej_rec_cnt NUMERIC,
    crte_dttm TIMESTAMP NOT NULL,
    lst_updt_dttm TIMESTAMP
);

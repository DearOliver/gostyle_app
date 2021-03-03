//Database configuration data

function db_config(){
    return {
        "PGHOST" : "172.16.18.15",
        "PGUSER" : "epsiwis",
        "PGDATABASE" : "gostyle",
        "PGPASSWORD" : "EpsiWis2018!",
        "PGPORT" : 5432
    };
};

//Variable export

module.exports = { db_config };
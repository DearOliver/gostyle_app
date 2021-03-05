const Coupon = class coupon {
    constructor()
    {

    }
    constructor(id, label, code, start_date, end_date)
    {
        this.id = id;
        this.label = label;
        this.code = code;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}

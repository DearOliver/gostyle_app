import React from 'react';
import renderer from 'react-test-renderer';
import Coupon_Card from "../components/Coupon_Card";

const coupon = {
    id: "AF9B0B0C-B374-C672-AE0B-5165B7F8249B",
    label: "Sed dictum. Proin eget odio. Aliquam",
    code: "GWG28JKI4MQ",
    start_date: "1990-03-29 05:12:07.000000",
    end_date: "2003-05-03 22:26:06.000000",
    id_type: 2,
    color: "#4355d4"
};

describe('<Coupon_Card />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Coupon_Card coupon={coupon}/>).toJSON();
        expect(tree.children.length).toBe(1);
    });
});
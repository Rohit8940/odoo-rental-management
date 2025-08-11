import React, { useState } from "react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    saveCard: false,
    coupon: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handlePayNow = () => {
    alert(`Payment of ₹4030 via ${paymentMethod} initiated!`);
  };

  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <h3>
          Review Order &gt; Delivery &gt; <span style={{ color: "red" }}>Payment</span>
        </h3>
        <h2 style={{ color: "red" }}>Confirm Order</h2>

        <p>Choose a payment method</p>
        <div style={styles.paymentOptions}>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit Card
          </label>
          {paymentMethod === "credit" && (
            <>
              <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Name on Card"
                value={form.name}
                onChange={handleChange}
              />
              <input
                style={styles.input}
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={form.cardNumber}
                onChange={handleChange}
              />
              <div style={styles.row}>
                <input
                  style={styles.inputSmall}
                  type="text"
                  name="expiry"
                  placeholder="Expiration Date"
                  value={form.expiry}
                  onChange={handleChange}
                />
                <input
                  style={styles.inputSmall}
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={form.cvv}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="debit"
              checked={paymentMethod === "debit"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI Pay
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal
          </label>
        </div>

        <label>
          <input
            type="checkbox"
            name="saveCard"
            checked={form.saveCard}
            onChange={handleChange}
          />
          Save my card details
        </label>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        <h3>Order Summary</h3>
        <p>2 Items - ₹4000</p>
        <p>Delivery Charge: -</p>
        <p>Sub Total: ₹4000</p>
        <p>Taxes: ₹30</p>
        <h4>Total: ₹4030</h4>

        <div>
          <input
            style={styles.input}
            type="text"
            name="coupon"
            placeholder="Coupon Code"
            value={form.coupon}
            onChange={handleChange}
          />
          <button style={styles.applyButton}>Apply</button>
        </div>

        <button style={styles.payButton} onClick={handlePayNow}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  },
  leftSection: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  paymentOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    width: "100%",
    marginBottom: "8px"
  },
  inputSmall: {
    padding: "8px",
    fontSize: "14px",
    width: "48%"
  },
  row: {
    display: "flex",
    justifyContent: "space-between"
  },
  rightSection: {
    flex: 1,
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fafafa"
  },
  applyButton: {
    padding: "8px 12px",
    marginLeft: "5px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  payButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "pink",
    color: "black",
    border: "none",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default PaymentPage;

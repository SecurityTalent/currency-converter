import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      // same currency হলে fetch দরকার নেই
      if (fromCur === toCur) {
        setConverted(amount);
        return;
      }

      try {
        setIsLoading(true);

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();

        setConverted(data.rates[toCur]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    convert();
  }, [amount, fromCur, toCur]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />

      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="BDT">BDT</option>
        <option value="GBP">GBP</option>
      </select>

      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="BDT">BDT</option>
        <option value="GBP">GBP</option>
      </select>

      <p>
        {isLoading ? "Loading..." : `${converted} ${toCur}`}
      </p>
    </div>
  );
}
